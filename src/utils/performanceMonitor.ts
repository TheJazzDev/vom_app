/**
 * Performance Monitoring Utilities
 *
 * Provides utilities for measuring and monitoring app performance
 */

// React import for HOC
import React from 'react';

interface PerformanceMetric {
  name: string;
  duration: number;
  timestamp: number;
  metadata?: Record<string, any>;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private timers: Map<string, number> = new Map();
  private maxMetrics = 100; // Keep last 100 metrics

  /**
   * Start a performance timer
   */
  startTimer(name: string, metadata?: Record<string, any>): void {
    const key = this.getTimerKey(name, metadata);
    this.timers.set(key, Date.now());

    if (__DEV__) {
      console.log(`[Performance] Started: ${name}`, metadata);
    }
  }

  /**
   * End a performance timer and record metric
   */
  endTimer(name: string, metadata?: Record<string, any>): number | null {
    const key = this.getTimerKey(name, metadata);
    const startTime = this.timers.get(key);

    if (!startTime) {
      if (__DEV__) {
        console.warn(`[Performance] Timer not found: ${name}`);
      }
      return null;
    }

    const duration = Date.now() - startTime;
    this.timers.delete(key);

    this.recordMetric({
      name,
      duration,
      timestamp: Date.now(),
      metadata,
    });

    if (__DEV__) {
      console.log(`[Performance] Completed: ${name} - ${duration}ms`, metadata);
    }

    return duration;
  }

  /**
   * Measure an async function
   */
  async measure<T>(
    name: string,
    fn: () => Promise<T>,
    metadata?: Record<string, any>,
  ): Promise<T> {
    this.startTimer(name, metadata);

    try {
      const result = await fn();
      this.endTimer(name, metadata);
      return result;
    } catch (error) {
      this.endTimer(name, { ...metadata, error: true });
      throw error;
    }
  }

  /**
   * Measure a sync function
   */
  measureSync<T>(name: string, fn: () => T, metadata?: Record<string, any>): T {
    this.startTimer(name, metadata);

    try {
      const result = fn();
      this.endTimer(name, metadata);
      return result;
    } catch (error) {
      this.endTimer(name, { ...metadata, error: true });
      throw error;
    }
  }

  /**
   * Record a custom metric
   */
  recordMetric(metric: PerformanceMetric): void {
    this.metrics.push(metric);

    // Keep only last N metrics
    if (this.metrics.length > this.maxMetrics) {
      this.metrics.shift();
    }
  }

  /**
   * Get all recorded metrics
   */
  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  /**
   * Get metrics by name
   */
  getMetricsByName(name: string): PerformanceMetric[] {
    return this.metrics.filter((m) => m.name === name);
  }

  /**
   * Get average duration for a metric
   */
  getAverageDuration(name: string): number {
    const metrics = this.getMetricsByName(name);

    if (metrics.length === 0) return 0;

    const total = metrics.reduce((sum, m) => sum + m.duration, 0);
    return total / metrics.length;
  }

  /**
   * Get slowest metric
   */
  getSlowestMetric(): PerformanceMetric | null {
    if (this.metrics.length === 0) return null;

    return this.metrics.reduce((slowest, current) =>
      current.duration > slowest.duration ? current : slowest,
    );
  }

  /**
   * Clear all metrics
   */
  clear(): void {
    this.metrics = [];
    this.timers.clear();
  }

  /**
   * Generate a performance report
   */
  generateReport(): string {
    if (this.metrics.length === 0) {
      return 'No performance metrics recorded';
    }

    const metricsByName = new Map<string, PerformanceMetric[]>();

    // Group metrics by name
    for (const metric of this.metrics) {
      const existing = metricsByName.get(metric.name) || [];
      existing.push(metric);
      metricsByName.set(metric.name, existing);
    }

    // Generate report
    let report = 'Performance Report\n';
    report += '='.repeat(50) + '\n\n';

    for (const [name, metrics] of metricsByName.entries()) {
      const durations = metrics.map((m) => m.duration);
      const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
      const min = Math.min(...durations);
      const max = Math.max(...durations);

      report += `${name}:\n`;
      report += `  Count: ${metrics.length}\n`;
      report += `  Average: ${avg.toFixed(2)}ms\n`;
      report += `  Min: ${min.toFixed(2)}ms\n`;
      report += `  Max: ${max.toFixed(2)}ms\n\n`;
    }

    return report;
  }

  private getTimerKey(name: string, metadata?: Record<string, any>): string {
    return metadata ? `${name}-${JSON.stringify(metadata)}` : name;
  }
}

// Singleton instance
const performanceMonitor = new PerformanceMonitor();

/**
 * Higher-order function to measure component render performance
 *
 * @example
 * ```tsx
 * const MeasuredComponent = withPerformanceMeasure(
 *   MyComponent,
 *   'MyComponent'
 * );
 * ```
 */
export function withPerformanceMeasure<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string,
): React.ComponentType<P> {
  const WrappedComponent = (props: P) => {
    React.useEffect(() => {
      performanceMonitor.startTimer(`${componentName}-mount`);

      return () => {
        performanceMonitor.endTimer(`${componentName}-mount`);
      };
    }, []);

    return React.createElement(Component, props);
  };

  WrappedComponent.displayName = `withPerformanceMeasure(${componentName})`;
  return WrappedComponent;
}

/**
 * Hook to measure render performance
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   useRenderPerformance('MyComponent');
 *   return <View>...</View>;
 * }
 * ```
 */
export function useRenderPerformance(componentName: string): void {
  React.useEffect(() => {
    performanceMonitor.recordMetric({
      name: `${componentName}-render`,
      duration: 0,
      timestamp: Date.now(),
    });
  });
}

export { performanceMonitor };
export default performanceMonitor;
