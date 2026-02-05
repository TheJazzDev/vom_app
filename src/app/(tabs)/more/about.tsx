import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Animated } from 'react-native';

const AboutUs = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView className="flex-1 bg-purple-50 dark:bg-gray-900">
      <View className="px-5 py-12">
        {/* Hero Section - Church Identity */}
        <Animated.View
          className="items-center mb-12"
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <View className="mb-6">
            <View className="w-24 h-24 rounded-full bg-purple-600 dark:bg-purple-500 items-center justify-center shadow-2xl">
              <Text className="text-5xl">✝️</Text>
            </View>
          </View>

          <Text className="text-4xl font-black text-gray-800 dark:text-white text-center mb-2">
            VALLEY OF MERCY
          </Text>
          <Text className="text-base font-medium text-gray-600 dark:text-gray-400 text-center mb-4">
            Cherubim & Seraphim Movement Church (Ayo Ni O)
          </Text>
          <View className="bg-white/50 dark:bg-gray-800/50 rounded-full px-5 py-2 border border-gray-200/30 dark:border-gray-700/30">
            <Text className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              Est. March 2022 • Surulere District
            </Text>
          </View>
        </Animated.View>

        {/* Mission & Vision Cards */}
        <View className="mb-12">
          <Animated.View
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 border-l-4 border-purple-600 dark:border-purple-500 shadow-lg"
            style={{ opacity: fadeAnim }}
          >
            <View className="flex-row items-center mb-4">
              <View className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl items-center justify-center mr-3">
                <Text className="text-2xl">🎯</Text>
              </View>
              <Text className="text-2xl font-bold text-gray-800 dark:text-white">
                Our Mission
              </Text>
            </View>
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-7">
              Spreading the Gospel through the Holy Spirit&apos;s power,
              nurturing believers in spiritual growth, and demonstrating
              God&apos;s love through compassionate community service.
            </Text>
          </Animated.View>

          <Animated.View
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-l-4 border-pink-600 dark:border-pink-500 shadow-lg"
            style={{ opacity: fadeAnim }}
          >
            <View className="flex-row items-center mb-4">
              <View className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl items-center justify-center mr-3">
                <Text className="text-2xl">👁️</Text>
              </View>
              <Text className="text-2xl font-bold text-gray-800 dark:text-white">
                Our Vision
              </Text>
            </View>
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-7">
              A transforming presence locally, nationally, and globally—raising
              disciples rooted in faith, shaped by Scripture, and equipped to
              lead with love.
            </Text>
          </Animated.View>
        </View>

        {/* Foundation Pillars */}
        <Animated.View className="mb-12" style={{ opacity: fadeAnim }}>
          <View className="items-center mb-8">
            <Text className="text-3xl font-black text-gray-800 dark:text-white mb-2">
              Our Foundation
            </Text>
            <Text className="text-base text-gray-600 dark:text-gray-400">
              Built on these spiritual pillars
            </Text>
          </View>

          <View className="space-y-4">
            <View className="bg-white dark:bg-gray-800 rounded-2xl p-5 flex-row items-center shadow-lg mb-4">
              <View className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-xl items-center justify-center mr-4">
                <Text className="text-3xl">🙏</Text>
              </View>
              <View className="flex-1">
                <Text className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                  Prayer
                </Text>
                <Text className="text-sm text-gray-600 dark:text-gray-400 leading-5">
                  Communing with God, seeking His guidance and strength
                </Text>
              </View>
            </View>

            <View className="bg-white dark:bg-gray-800 rounded-2xl p-5 flex-row items-center shadow-lg mb-4">
              <View className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl items-center justify-center mr-4">
                <Text className="text-3xl">📖</Text>
              </View>
              <View className="flex-1">
                <Text className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                  Word of God
                </Text>
                <Text className="text-sm text-gray-600 dark:text-gray-400 leading-5">
                  Scripture as our foundation, illuminating our path
                </Text>
              </View>
            </View>

            <View className="bg-white dark:bg-gray-800 rounded-2xl p-5 flex-row items-center shadow-lg">
              <View className="w-14 h-14 bg-pink-100 dark:bg-pink-900/30 rounded-xl items-center justify-center mr-4">
                <Text className="text-3xl">🎵</Text>
              </View>
              <View className="flex-1">
                <Text className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                  Praises
                </Text>
                <Text className="text-sm text-gray-600 dark:text-gray-400 leading-5">
                  Joyful worship celebrating God&apos;s goodness
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Welcome Message */}
        <Animated.View
          className="bg-purple-600 dark:bg-purple-700 rounded-3xl p-8 mb-8 shadow-2xl"
          style={{ opacity: fadeAnim }}
        >
          <View className="items-center mb-6">
            <View className="w-16 h-16 bg-white/90 dark:bg-gray-100/90 rounded-full items-center justify-center mb-4">
              <Text className="text-3xl">🏠</Text>
            </View>
            <Text className="text-3xl font-black text-white mb-3">
              You Belong Here
            </Text>
            <View className="w-20 h-1 bg-white/50 rounded-full" />
          </View>

          <Text className="text-base text-white text-center leading-7 mb-6 font-medium">
            Whether seeking spiritual growth, community fellowship, or simply
            curious about faith—you&apos;ll find a warm welcome. Our doors and
            hearts are open to all who desire God&apos;s love and grace.
          </Text>

          <View className="bg-white/20 rounded-2xl p-4 border border-white/30">
            <Text className="text-base text-white text-center italic font-semibold">
              &quot;Come as you are, grow as you journey, serve as you&apos;re
              called&quot;
            </Text>
          </View>
        </Animated.View>

        {/* Ministry Info */}
        <Animated.View
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg"
          style={{ opacity: fadeAnim }}
        >
          <Text className="text-xl font-bold text-gray-800 dark:text-white text-center mb-4">
            Evangelical Revival Ministry
          </Text>
          <View className="items-center">
            <View className="bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-2 mb-2">
              <Text className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Surulere District, Lagos
              </Text>
            </View>
            <Text className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Part of the Cherubim & Seraphim Movement Church (Ayo Ni O) family
            </Text>
          </View>
        </Animated.View>
      </View>
    </ScrollView>
  );
};

export default AboutUs;
