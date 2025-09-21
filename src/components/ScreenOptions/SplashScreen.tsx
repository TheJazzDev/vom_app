import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

interface SplashScreenProps {
  onFinish?: () => void;
  duration?: number;
}

const { width } = Dimensions.get('window');

export default function SplashScreenComponent({
  onFinish,
  duration = 3000,
}: SplashScreenProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Animation values
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const backgroundOpacity = useRef(new Animated.Value(1)).current;

  // Logo source based on theme
  const logoSource = isDark
    ? require('@/src/assets/images/VOM_Dark_512x512.png')
    : require('@/src/assets/images/VOM_Light_512x512.png');

  // Background color based on theme
  const backgroundColor = isDark ? '#0D0D2B' : '#E5F2FF';

  useEffect(() => {
    const startAnimations = () => {
      // Logo entrance animation
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();

      // Exit animation after duration
      const exitTimer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(logoOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(backgroundOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start(() => {
          onFinish?.();
        });
      }, duration - 500);

      return () => clearTimeout(exitTimer);
    };

    const timer = setTimeout(startAnimations, 100);
    return () => clearTimeout(timer);
  }, [logoOpacity, logoScale, backgroundOpacity, duration, onFinish]);

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor, opacity: backgroundOpacity },
      ]}
    >
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundColor}
        translucent={false}
      />

      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        <Image source={logoSource} style={styles.logo} resizeMode="contain" />
      </Animated.View>

      {/* Optional: Add a subtle pulsing effect */}
      <Animated.View style={styles.pulseContainer}>
        <Animated.View
          style={[
            styles.pulse,
            {
              opacity: logoOpacity,
              backgroundColor: isDark
                ? 'rgba(255,255,255,0.1)'
                : 'rgba(0,0,0,0.1)',
            },
          ]}
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: Math.min(width * 0.6, 300),
    height: Math.min(width * 0.6, 300),
  },
  pulseContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulse: {
    width: Math.min(width * 0.8, 400),
    height: Math.min(width * 0.8, 400),
    borderRadius: Math.min(width * 0.4, 200),
    opacity: 0,
  },
});
