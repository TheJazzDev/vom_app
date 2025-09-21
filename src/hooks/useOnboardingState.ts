import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const ONBOARDING_KEY = 'has_completed_onboarding';

export function useOnboardingState() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<
    boolean | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const value = await AsyncStorage.getItem(ONBOARDING_KEY);
      setHasCompletedOnboarding(value === 'true');
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      // Default to false if there's an error
      setHasCompletedOnboarding(false);
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = async (withTransition: boolean = true) => {
    try {
      if (withTransition) {
        setIsTransitioning(true);
        // Add a small delay for transition animation
        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
      setHasCompletedOnboarding(true);

      if (withTransition) {
        // Allow transition to complete
        setTimeout(() => setIsTransitioning(false), 800);
      }
    } catch (error) {
      console.error('Error saving onboarding completion:', error);
      setIsTransitioning(false);
    }
  };

  const resetOnboarding = async () => {
    try {
      await AsyncStorage.removeItem(ONBOARDING_KEY);
      setHasCompletedOnboarding(false);
      setIsTransitioning(false);
    } catch (error) {
      console.error('Error resetting onboarding:', error);
    }
  };

  return {
    hasCompletedOnboarding,
    isLoading,
    isTransitioning,
    completeOnboarding,
    resetOnboarding,
  };
}
