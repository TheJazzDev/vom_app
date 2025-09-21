import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Text, useColorScheme, View } from 'react-native';

const { width, height } = Dimensions.get('window');

interface ComingSoonConfig {
  title: string;
  icon: string;
  iconColor: string;
  subtitle: string;
  description: string;
  scriptureText?: string;
  scriptureReference?: string;
  primaryColor: string;
  secondaryColor: string;
}

interface ComingSoonProps {
  config: ComingSoonConfig;
}

const comingSoonConfigs: Record<string, ComingSoonConfig> = {
  bibleStudy: {
    title: 'BIBLE STUDY',
    icon: '✝',
    iconColor: '#FFD700',
    subtitle: 'Interactive Study Sessions',
    description:
      "Dive deeper into God's Word with interactive study sessions and discussions",
    scriptureText: 'Study to show yourself approved unto God',
    scriptureReference: '2 Timothy 2:15',
    primaryColor: '#8B4513',
    secondaryColor: '#FFD700',
  },
  prayerRequest: {
    title: 'PRAYER REQUESTS',
    icon: '🙏',
    iconColor: '#87CEEB',
    subtitle: 'Church Prayer Support',
    description:
      'Submit and share prayer requests with our loving church for spiritual support',
    scriptureText: 'Pray for one another',
    scriptureReference: 'James 5:16',
    primaryColor: '#4682B4',
    secondaryColor: '#87CEEB',
  },
  recentSermons: {
    title: 'RECENT SERMONS',
    icon: '📖',
    iconColor: '#98FB98',
    subtitle: 'Messages of Hope',
    description:
      'Access recent sermons and messages to strengthen your faith and spiritual growth',
    scriptureText: 'Faith comes by hearing',
    scriptureReference: 'Romans 10:17',
    primaryColor: '#228B22',
    secondaryColor: '#98FB98',
  },
  testimonies: {
    title: 'TESTIMONIES',
    icon: '🌟',
    iconColor: '#DDA0DD',
    subtitle: 'Stories of Faith',
    description:
      "Share and read inspiring testimonies of God's goodness and faithfulness in our lives",
    scriptureText: 'Let the redeemed of the Lord tell their story',
    scriptureReference: 'Psalm 107:2',
    primaryColor: '#9370DB',
    secondaryColor: '#DDA0DD',
  },
  events: {
    title: 'CHURCH EVENTS',
    icon: '📅',
    iconColor: '#FFB347',
    subtitle: 'Fellowship & Community',
    description:
      'Stay updated with upcoming church events, fellowship activities, and community gatherings',
    scriptureText: 'Let us not give up meeting together',
    scriptureReference: 'Hebrews 10:25',
    primaryColor: '#FF8C00',
    secondaryColor: '#FFB347',
  },
};

const ComingSoon: React.FC<ComingSoonProps> = ({ config }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Animation references
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Floating animation for decorative elements
  const float1 = useRef(new Animated.Value(0)).current;
  const float2 = useRef(new Animated.Value(0)).current;
  const float3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Main entrance animation
    const entranceAnimation = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]);

    // Continuous pulse animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    );

    // Continuous rotation animation
    const rotationAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      }),
    );

    // Floating animations for decorative elements
    const floatingAnimation1 = Animated.loop(
      Animated.sequence([
        Animated.timing(float1, {
          toValue: -20,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(float1, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]),
    );

    const floatingAnimation2 = Animated.loop(
      Animated.sequence([
        Animated.timing(float2, {
          toValue: -15,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(float2, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ]),
    );

    const floatingAnimation3 = Animated.loop(
      Animated.sequence([
        Animated.timing(float3, {
          toValue: -25,
          duration: 3500,
          useNativeDriver: true,
        }),
        Animated.timing(float3, {
          toValue: 0,
          duration: 3500,
          useNativeDriver: true,
        }),
      ]),
    );

    // Start all animations
    entranceAnimation.start();
    pulseAnimation.start();
    rotationAnimation.start();
    floatingAnimation1.start();
    floatingAnimation2.start();
    floatingAnimation3.start();

    return () => {
      // Cleanup animations
      entranceAnimation.stop();
      pulseAnimation.stop();
      rotationAnimation.stop();
      floatingAnimation1.stop();
      floatingAnimation2.stop();
      floatingAnimation3.stop();
    };
  }, [
    fadeAnim,
    float1,
    float2,
    float3,
    pulseAnim,
    rotateAnim,
    scaleAnim,
    slideAnim,
  ]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Theme-based colors
  const backgroundColor = isDark ? '#0f0f23' : '#f8fafc';
  const textColor = isDark ? '#FFFFFF' : '#1a202c';
  const subtitleColor = isDark ? '#B8B8B8' : '#4a5568';
  const descriptionColor = isDark ? '#888888' : '#718096';
  const scriptureColor = isDark ? '#666666' : '#a0aec0';
  // const scriptureRefColor = isDark ? '#555555' : '#cbd5e0';

  return (
    <View
      style={{
        flex: 1,
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Enhanced gradient overlay */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: isDark ? 0.15 : 0.08,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
          }}
        >
          {/* Using multiple positioned views to create gradient effect */}
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '50%',
              backgroundColor: config.primaryColor,
              opacity: 0.1,
            }}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '100%',
              height: '50%',
              backgroundColor: config.secondaryColor,
              opacity: 0.1,
            }}
          />
        </View>
      </View>

      {/* Floating decorative elements */}
      <Animated.View
        style={{
          position: 'absolute',
          top: height * 0.15,
          left: width * 0.1,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: isDark
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.05)',
          transform: [{ translateY: float1 }],
        }}
      />

      <Animated.View
        style={{
          position: 'absolute',
          top: height * 0.25,
          right: width * 0.15,
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: isDark
            ? `${config.secondaryColor}25`
            : `${config.secondaryColor}40`,
          transform: [{ translateY: float2 }],
        }}
      />

      <Animated.View
        style={{
          position: 'absolute',
          bottom: height * 0.2,
          left: width * 0.2,
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: isDark
            ? `${config.primaryColor}25`
            : `${config.primaryColor}40`,
          transform: [{ translateY: float3 }],
        }}
      />

      {/* Main content container */}
      <Animated.View
        style={{
          alignItems: 'center',
          padding: 40,
          transform: [
            //   { opacity: fadeAnim },
            { scale: scaleAnim },
            { translateY: slideAnim },
          ],
        }}
      >
        {/* Icon with rotation */}
        <Animated.View
          style={{
            marginBottom: 30,
            transform: [{ rotate: spin }],
          }}
        >
          <View
            style={{
              width: 100,
              height: 120,
              backgroundColor: config.primaryColor,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: isDark ? 0.3 : 0.15,
              shadowRadius: 20,
              elevation: 10,
            }}
          >
            <Text
              style={{
                fontSize: 40,
                color: config.iconColor,
                fontWeight: 'bold',
              }}
            >
              {config.icon}
            </Text>
          </View>
        </Animated.View>

        {/* Pulsing main title */}
        <Animated.View
          style={{
            transform: [{ scale: pulseAnim }],
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 32,
              fontWeight: 'bold',
              color: textColor,
              textAlign: 'center',
              letterSpacing: 2,
              textShadowColor: isDark
                ? 'rgba(0, 0, 0, 0.5)'
                : 'rgba(0, 0, 0, 0.1)',
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 5,
            }}
          >
            {config.title}
          </Text>
        </Animated.View>

        {/* Subtitle */}
        <Text
          style={{
            fontSize: 16,
            color: config.primaryColor,
            textAlign: 'center',
            marginBottom: 15,
            letterSpacing: 1,
            fontWeight: '600',
          }}
        >
          {config.subtitle}
        </Text>

        {/* Coming Soon text */}
        <Text
          style={{
            fontSize: 18,
            color: subtitleColor,
            textAlign: 'center',
            marginBottom: 15,
            letterSpacing: 1,
          }}
        >
          Coming Soon
        </Text>

        {/* Description */}
        <Text
          style={{
            fontSize: 16,
            color: descriptionColor,
            textAlign: 'center',
            lineHeight: 24,
            maxWidth: 280,
          }}
        >
          {config.description}
        </Text>

        {/* Loading dots animation */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 40,
            alignItems: 'center',
          }}
        >
          <LoadingDot delay={0} color={config.secondaryColor} />
          <LoadingDot delay={200} color={config.secondaryColor} />
          <LoadingDot delay={400} color={config.secondaryColor} />
        </View>
      </Animated.View>

      {/* Bottom scripture text */}
      {config.scriptureText && (
        <View
          style={{
            position: 'absolute',
            bottom: 50,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: scriptureColor,
              fontStyle: 'italic',
              textAlign: 'center',
              paddingHorizontal: 20,
            }}
          >
            &quot;{config.scriptureText}&quot;
          </Text>
          {config.scriptureReference && (
            <Text
              style={{
                fontSize: 12,
                color: scriptureColor,
                marginTop: 5,
              }}
            >
              {config.scriptureReference}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

// Loading dot component for the animated dots
const LoadingDot = ({ delay = 0, color = '#FFD700' }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 600,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, [animatedValue, delay]);

  // const opacity = animatedValue.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [0.3, 1],
  // });

  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  return (
    <Animated.View
      style={{
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: color,
        marginHorizontal: 4,
        transform: [{ scale }],
      }}
    />
  );
};

export { ComingSoon, comingSoonConfigs };
