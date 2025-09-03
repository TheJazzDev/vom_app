import { Spacer, Text, View } from '@/src/components';
import React from 'react';
import { Text as RNText } from 'react-native';

interface PillarCardProps {
  icon: string;
  title: string;
  description: string;
  colorClass: string;
}

const PillarCard: React.FC<PillarCardProps> = ({
  icon,
  title,
  description,
  colorClass,
}) => (
  <View className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-4 shadow-lg border-l-4 border-l-blue-500">
    <View className="items-center mb-4">
      <View
        className={`w-16 h-16 rounded-full ${colorClass} items-center justify-center mb-3`}
      >
        <Text className="text-2xl">{icon}</Text>
      </View>
      <Text variant="h4" className="text-center font-bold">
        {title}
      </Text>
    </View>
    <Text
      variant="body"
      className="text-center leading-6 text-gray-600 dark:text-gray-300"
    >
      {description}
    </Text>
  </View>
);

const AboutUs = () => {
  const pillars = [
    {
      icon: '🙏',
      title: 'Prayer',
      description:
        'Through fervent prayer, we commune with God, seeking His guidance, strength, and blessings in all aspects of our lives and ministry.',
      colorClass: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      icon: '📖',
      title: 'Word of God',
      description:
        'The Holy Scripture is our foundation and guide, illuminating our path and transforming our hearts through divine wisdom and truth.',
      colorClass: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      icon: '🎵',
      title: 'Praises',
      description:
        "We lift our voices in joyful worship and thanksgiving, celebrating God's goodness and magnifying His holy name through music and song.",
      colorClass: 'bg-yellow-100 dark:bg-yellow-900/30',
    },
  ];

  return (
    <View gradient scrollable className="flex-1">
      <Spacer height={12} />
      <View className="bg-white/80 dark:bg-gray-800 px-4 py-8 shadow-sm rounded-xl">
        {/* Church Logo/Cross */}
        <View className="items-center ">
          <View className="mb-6 w-24 h-24 bg-blue-600 rounded-full justify-center shadow-lg"></View>
        </View>

        <View className="items-center mb-4">
          <Text variant="h3" className="text-center font-bold mb-2 uppercase">
            Cherubim and Seraphim Movement Church (Ayo Ni o)
          </Text>
          <Text
            variant="h5"
            className="text-gray-600 dark:text-gray-400 font-semibold uppercase"
          >
            Surulere District
          </Text>
          <Text variant="h6" className="mt-1 font-medium uppercase">
            Evangelical Revival Ministry
          </Text>
          <RNText className="text-blue-600 dark:text-blue-400 mt-1 font-semibold italic uppercase">
            Valley of Mercy
          </RNText>
        </View>
        <View className="items-center">
          <View className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full">
            <Text variant="caption" className="font-semibold">
              Founded March 2022
            </Text>
          </View>
        </View>
      </View>

      <View className="px-2 py-8">
        {/* Mission Section */}
        <View className="mb-8">
          <View className="items-center mb-6">
            <View className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full items-center justify-center mb-3">
              <Text className="text-xl">🎯</Text>
            </View>
            <Text variant="h3" className="font-bold">
              Our Mission
            </Text>
          </View>
          <View className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <Text variant="body" className="text-center leading-7">
              To spread the Gospel of Jesus Christ through the power of the Holy
              Spirit, nurturing believers in their spiritual growth while
              demonstrating God&apos;s love through compassionate service to our
              community and beyond.
            </Text>
          </View>
        </View>

        {/* Vision Section */}
        <View className="mb-8">
          <View className="items-center mb-6">
            <View className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full items-center justify-center mb-3">
              <Text className="text-xl">👁️</Text>
            </View>
            <Text variant="h3" className="font-bold">
              Our Vision
            </Text>
          </View>
          <View className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <Text variant="body" className="text-center leading-7">
              To be a beacon of hope and transformation in Surulere and beyond,
              raising disciples who are rooted in faith, equipped in the Word,
              and empowered to impact their world for Christ&apos;s kingdom.
            </Text>
          </View>
        </View>

        {/* Pillars Section */}
        <View className="mb-8">
          <View className="items-center mb-6">
            <View className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full items-center justify-center mb-3">
              <Text className="text-xl">🏛️</Text>
            </View>
            <Text variant="h3" className="font-bold">
              Our Foundation Pillars
            </Text>
            <Text
              variant="body"
              className="text-center mt-2 text-gray-600 dark:text-gray-400"
            >
              Three pillars that hold and guide us
            </Text>
          </View>

          {pillars.map((pillar, index) => (
            <PillarCard
              key={index}
              icon={pillar.icon}
              title={pillar.title}
              description={pillar.description}
              colorClass={pillar.colorClass}
            />
          ))}
        </View>

        {/* Welcome Message */}
        <View className="mb-8">
          <View className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6">
            <View className="items-center mb-4">
              <Text
                variant="h4"
                className="font-bold text-blue-600 dark:text-blue-400"
              >
                Welcome to Our Family
              </Text>
            </View>
            <Text variant="body" className="text-center leading-7 mb-4">
              Whether you&apos;re seeking spiritual growth, community
              fellowship, or simply curious about faith, you&apos;ll find a warm
              welcome here. Our doors and hearts are open to all who desire to
              experience God&apos;s love and grace.
            </Text>
            <View className="items-center">
              <Text
                variant="caption"
                className="italic text-gray-600 dark:text-gray-400"
              >
                &quot;Come as you are, grow as you journey, serve as you&apos;re
                called&quot;
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AboutUs;
