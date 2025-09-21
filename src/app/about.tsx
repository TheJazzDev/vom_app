import { Spacer, Text, View } from '@/src/components';
import React from 'react';
import { Text as RNText } from 'react-native';
import Animated, {
  BounceIn,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
} from 'react-native-reanimated';

const AnimatedView = Animated.createAnimatedComponent(View);

interface PillarCardProps {
  icon: string;
  title: string;
  description: string;
  colorClass: string;
  iconBg: string;
  delay?: number;
}

const PillarCard: React.FC<PillarCardProps> = ({
  icon,
  title,
  description,
  colorClass,
  iconBg,
  delay = 0,
}) => (
  <AnimatedView
    entering={FadeInUp.delay(delay).duration(600)}
    className="relative overflow-hidden"
  >
    <View
      className={`${colorClass} rounded-3xl p-4 mb-6 shadow-xl border-2 border-white/30 dark:border-white/20`}
    >
      {/* Background Pattern - Now visible in both modes */}
      <View className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 dark:bg-white/10 rounded-full" />
      <View className="absolute -bottom-2 -left-2 w-16 h-16 bg-white/15 dark:bg-white/5 rounded-full" />

      <View className="items-center mb-6">
        <View
          className={`w-20 h-20 rounded-2xl ${iconBg} items-center justify-center mb-4 shadow-lg border border-white/20`}
        >
          <Text className="text-3xl">{icon}</Text>
        </View>
        <Text
          variant="h4"
          className="text-center font-bold text-white mb-2 drop-shadow-sm"
        >
          {title}
        </Text>
      </View>

      <Text
        variant="body"
        className="text-center leading-7 text-white/95 dark:text-white/90 font-medium drop-shadow-sm"
      >
        {description}
      </Text>

      {/* Enhanced shine effect */}
      <View className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </View>
  </AnimatedView>
);

const SectionHeader: React.FC<{
  icon: string;
  title: string;
  subtitle?: string;
  iconBg: string;
  delay?: number;
}> = ({ icon, title, subtitle, iconBg, delay = 0 }) => (
  <AnimatedView
    entering={FadeInDown.delay(delay).duration(500)}
    className="items-center mb-8"
  >
    <View
      className={`w-16 h-16 ${iconBg} rounded-2xl items-center justify-center mb-4 shadow-lg border border-gray-200 dark:border-gray-600`}
    >
      <Text className="text-2xl">{icon}</Text>
    </View>
    <Text
      variant="h2"
      className="font-black text-gray-900 dark:text-white mb-2"
    >
      {title}
    </Text>
    {subtitle && (
      <Text
        variant="body"
        className="text-center text-gray-600 dark:text-gray-400 font-medium"
      >
        {subtitle}
      </Text>
    )}
  </AnimatedView>
);

const AboutUs = () => {
  const pillars = [
    {
      icon: '🙏',
      title: 'Prayer',
      description:
        'Through fervent prayer, we commune with God, seeking His guidance, strength, and blessings in all aspects of our lives and ministry.',
      colorClass:
        'bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600',
      iconBg: 'bg-white/30 dark:bg-white/20 backdrop-blur-sm',
    },
    {
      icon: '📖',
      title: 'Word of God',
      description:
        'The Holy Scripture is our foundation and guide, illuminating our path and transforming our hearts through divine wisdom and truth.',
      colorClass:
        'bg-gradient-to-br from-emerald-600 to-emerald-700 dark:from-emerald-500 dark:to-emerald-600',
      iconBg: 'bg-white/30 dark:bg-white/20 backdrop-blur-sm',
    },
    {
      icon: '🎵',
      title: 'Praises',
      description:
        "We lift our voices in joyful worship and thanksgiving, celebrating God's goodness and magnifying His holy name through music and song.",
      colorClass:
        'bg-gradient-to-br from-amber-600 to-orange-600 dark:from-amber-500 dark:to-orange-500',
      iconBg: 'bg-white/30 dark:bg-white/20 backdrop-blur-sm',
    },
  ];

  return (
    <View gradient scrollable className="flex-1">
      <Spacer height={8} />

      {/* Hero Section - Now works in both light and dark mode */}
      <AnimatedView
        entering={FadeInUp.duration(800)}
        className="relative overflow-hidden"
      >
        <View className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 dark:from-blue-600 dark:via-purple-600 dark:to-blue-700 mx-4 rounded-3xl shadow-2xl border-2 border-blue-400/30 dark:border-white/20">
          {/* Enhanced Background Pattern - visible in both modes */}
          <View className="absolute inset-0">
            <View className="absolute top-10 right-10 w-32 h-32 bg-white/15 dark:bg-white/10 rounded-full" />
            <View className="absolute bottom-20 left-8 w-24 h-24 bg-white/10 dark:bg-white/5 rounded-full" />
            <View className="absolute top-1/2 left-1/2 w-40 h-40 bg-white/10 dark:bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          </View>

          <View className="relative z-10 px-4 py-8">
            {/* Church Logo/Cross */}
            <AnimatedView
              entering={BounceIn.delay(300).duration(1000)}
              className="items-center mb-8"
            >
              <View className="w-32 h-32 bg-white/25 dark:bg-white/20 backdrop-blur-sm rounded-full justify-center items-center shadow-2xl border-2 border-white/40 dark:border-white/30">
                <Text className="text-6xl drop-shadow-lg">✝️</Text>
              </View>
            </AnimatedView>

            <AnimatedView
              entering={FadeInUp.delay(600).duration(600)}
              className="items-center mb-8"
            >
              <Text
                variant="h2"
                className="text-center font-black mb-3 text-white leading-tight drop-shadow-lg"
              >
                CHERUBIM & SERAPHIM MOVEMENT CHURCH
              </Text>
              <Text
                variant="h4"
                className="text-white/95 dark:text-white/90 font-bold mb-2 drop-shadow-md"
              >
                (AYO NI O)
              </Text>
              <View className="bg-white/25 dark:bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-2 border border-white/30">
                <Text
                  variant="h5"
                  className="text-white font-semibold drop-shadow-sm"
                >
                  SURULERE DISTRICT
                </Text>
              </View>
              <Text
                variant="h6"
                className="text-white/90 dark:text-white/80 font-medium mb-2 drop-shadow-sm"
              >
                Evangelical Revival Ministry
              </Text>
              <RNText className="text-amber-200 dark:text-amber-300 font-bold text-lg italic drop-shadow-md">
                VALLEY OF MERCY
              </RNText>
            </AnimatedView>

            <AnimatedView
              entering={FadeInUp.delay(800).duration(600)}
              className="items-center"
            >
              <View className="bg-white/25 dark:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/40 dark:border-white/30">
                <Text
                  variant="body"
                  className="font-bold text-white drop-shadow-sm"
                >
                  ✨ Founded March 2022 ✨
                </Text>
              </View>
            </AnimatedView>
          </View>
        </View>
      </AnimatedView>

      <Spacer height={16} />

      <View className="px-4">
        {/* Mission Section - Enhanced contrast */}
        <View className="mb-12">
          <SectionHeader
            icon="🎯"
            title="Our Mission"
            iconBg="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50"
            delay={100}
          />

          <AnimatedView
            entering={FadeInLeft.delay(300).duration(600)}
            className="relative"
          >
            <View className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border-2 border-gray-200 dark:border-gray-700">
              <View className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-3xl" />
              <Text
                variant="h5"
                className="text-center leading-8 font-medium text-gray-800 dark:text-gray-200"
              >
                To spread the Gospel of Jesus Christ through the power of the
                Holy Spirit, nurturing believers in their spiritual growth while
                demonstrating God&apos;s love through compassionate service to
                our community and beyond.
              </Text>
            </View>
          </AnimatedView>
        </View>

        {/* Vision Section - Enhanced contrast */}
        <View className="mb-12">
          <SectionHeader
            icon="👁️"
            title="Our Vision"
            iconBg="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50"
            delay={200}
          />

          <AnimatedView
            entering={FadeInRight.delay(400).duration(600)}
            className="relative"
          >
            <View className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border-2 border-gray-200 dark:border-gray-700">
              <View className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-3xl" />
              <Text
                variant="h5"
                className="text-center leading-8 font-medium text-gray-800 dark:text-gray-200"
              >
                Our vision is to be a transforming presence across
                communities—locally, nationally, and globally—where lives are
                renewed by the Gospel. We aim to raise disciples who are firmly
                rooted in faith, shaped by Scripture, and equipped to serve and
                lead with love, bringing lasting spiritual and social
                transformation to their families, workplaces, and nations.
              </Text>
            </View>
          </AnimatedView>
        </View>

        {/* Pillars Section */}
        <View className="mb-12">
          <SectionHeader
            icon="🏛️"
            title="Foundation Pillars"
            subtitle="Three pillars that hold and guide us"
            iconBg="bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/50 dark:to-emerald-800/50"
            delay={300}
          />

          {pillars.map((pillar, index) => (
            <PillarCard
              key={index}
              icon={pillar.icon}
              title={pillar.title}
              description={pillar.description}
              colorClass={pillar.colorClass}
              iconBg={pillar.iconBg}
              delay={500 + index * 200}
            />
          ))}
        </View>

        {/* Welcome Message - Enhanced for light mode */}
        <AnimatedView
          entering={FadeInUp.delay(1100).duration(600)}
          className="mb-8"
        >
          <View className="relative overflow-hidden rounded-3xl">
            <View className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-500 dark:via-purple-600 dark:to-pink-600 p-8 shadow-2xl border-2 border-indigo-400/30 dark:border-white/20">
              {/* Enhanced Background Pattern */}
              <View className="absolute -top-4 -right-4 w-32 h-32 bg-white/15 dark:bg-white/10 rounded-full" />
              <View className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/15 dark:bg-white/10 rounded-full" />

              <View className="relative z-10">
                <View className="items-center mb-6">
                  <Text
                    variant="h3"
                    className="font-black text-white mb-2 drop-shadow-lg"
                  >
                    Welcome Home 🏠
                  </Text>
                  <View className="w-16 h-px bg-white/60 dark:bg-white/50" />
                </View>

                <Text
                  variant="h5"
                  className="text-center leading-8 mb-6 text-white/98 dark:text-white/95 font-medium drop-shadow-sm"
                >
                  Whether you&apos;re seeking spiritual growth, community
                  fellowship, or simply curious about faith, you&apos;ll find a
                  warm welcome here. Our doors and hearts are open to all who
                  desire to experience God&apos;s love and grace.
                </Text>

                <View className="items-center">
                  <View className="bg-white/25 dark:bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/40 dark:border-white/30">
                    <Text
                      variant="h6"
                      className="italic text-white font-semibold text-center drop-shadow-sm"
                    >
                      &quot;Come as you are, grow as you journey, serve as
                      you&apos;re called&quot;
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </AnimatedView>
      </View>

      <Spacer height={12} />
    </View>
  );
};

export default AboutUs;
