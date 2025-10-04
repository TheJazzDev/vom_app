import { Card, Spacer, Text, View } from '@/src/components';
import React from 'react';
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
  variant: 'gradient-primary' | 'gradient-forest' | 'gradient-ocean';
  delay?: number;
}

const PillarCard: React.FC<PillarCardProps> = ({
  icon,
  title,
  description,
  variant,
  delay = 0,
}) => (
  <AnimatedView entering={FadeInUp.delay(delay).duration(600)} className="mb-6">
    <Card
      variant={variant}
      className="p-6 rounded-3xl border border-border dark:border-dark-border"
    >
      <View className="items-center mb-6">
        <View className="w-20 h-20 rounded-2xl bg-surface dark:bg-dark-surface items-center justify-center mb-2">
          <Text className="text-3xl">{icon}</Text>
        </View>
        <Text
          variant="h4"
          color="neutral"
          className="text-center font-bold mb-2"
        >
          {title}
        </Text>
      </View>

      <Text
        variant="body"
        color="neutral"
        className="text-center leading-7 font-medium"
      >
        {description}
      </Text>
    </Card>
  </AnimatedView>
);

const SectionHeader: React.FC<{
  icon: string;
  title: string;
  subtitle?: string;
  delay?: number;
}> = ({ icon, title, subtitle, delay = 0 }) => (
  <AnimatedView
    entering={FadeInDown.delay(delay).duration(500)}
    className="items-center mb-8"
  >
    <View className="w-16 h-16 bg-surface dark:bg-dark-surface rounded-2xl items-center justify-center mb-4 border border-border dark:border-dark-border">
      <Text className="text-2xl">{icon}</Text>
    </View>
    <Text variant="h2" color="heading" className="font-black mb-2">
      {title}
    </Text>
    {subtitle && (
      <Text variant="body" color="muted" className="text-center font-medium">
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
      variant: 'gradient-primary' as const,
    },
    {
      icon: '📖',
      title: 'Word of God',
      description:
        'The Holy Scripture is our foundation and guide, illuminating our path and transforming our hearts through divine wisdom and truth.',
      variant: 'gradient-forest' as const,
    },
    {
      icon: '🎵',
      title: 'Praises',
      description:
        "We lift our voices in joyful worship and thanksgiving, celebrating God's goodness and magnifying His holy name through music and song.",
      variant: 'gradient-ocean' as const,
    },
  ];

  return (
    <View gradient scrollable paddingHorizontal={14}>
      <Spacer height={16} />
      <AnimatedView entering={FadeInUp.duration(800)} className="mb-16">
        <Card variant="gradient-brand" borderRadius={60} className="p-8">
          <AnimatedView
            entering={BounceIn.delay(300).duration(1000)}
            className="items-center mb-8"
          >
            <View className="w-32 h-32 bg-surface dark:bg-dark-surface rounded-full justify-center items-center">
              <Text className="text-6xl">✝️</Text>
            </View>
          </AnimatedView>

          <AnimatedView
            entering={FadeInUp.delay(600).duration(600)}
            className="items-center mb-8"
          >
            <Text
              variant="h2"
              color="neutral"
              className="text-center font-black mb-3 leading-tight"
            >
              CHERUBIM & SERAPHIM MOVEMENT CHURCH
            </Text>
            <Text variant="h4" color="neutral" className="mb-2">
              (AYO NI O)
            </Text>
            <View className="bg-surface dark:bg-dark-surface rounded-full px-6 py-2 mb-2 border border-border">
              <Text variant="h5" color="neutral" className="font-semibold">
                SURULERE DISTRICT
              </Text>
            </View>
            <Text variant="h6" color="neutral" className="font-medium mb-2">
              Evangelical Revival Ministry
            </Text>
            <Text variant="h5" color="neutral" className="font-bold italic">
              VALLEY OF MERCY
            </Text>
          </AnimatedView>

          <AnimatedView
            entering={FadeInUp.delay(800).duration(600)}
            className="items-center"
          >
            <View className="bg-surface dark:bg-dark-surface px-6 py-3 rounded-full border border-border">
              <Text variant="body" color="neutral" className="font-bold">
                ✨ Founded March 2022 ✨
              </Text>
            </View>
          </AnimatedView>
        </Card>
      </AnimatedView>

      {/* Mission Section */}
      <View className="mb-12">
        <SectionHeader icon="🎯" title="Our Mission" delay={100} />

        <AnimatedView entering={FadeInLeft.delay(300).duration(600)}>
          <Card
            variant="elevated"
            className="bg-card dark:bg-dark-card rounded-3xl p-8 border border-border dark:border-dark-border"
          >
            <View className="absolute top-0 left-0 right-0 h-1 bg-brand dark:bg-dark-brand rounded-t-3xl" />
            <Text
              variant="h5"
              color="body"
              className="text-center leading-8 font-medium"
            >
              To spread the Gospel of Jesus Christ through the power of the Holy
              Spirit, nurturing believers in their spiritual growth while
              demonstrating God&apos;s love through compassionate service to our
              community and beyond.
            </Text>
          </Card>
        </AnimatedView>
      </View>

      {/* Vision Section */}
      <View className="mb-12">
        <SectionHeader icon="👁️" title="Our Vision" delay={200} />

        <AnimatedView
          entering={FadeInRight.delay(400).duration(600)}
          className="mx-4"
        >
          <Card
            variant="elevated"
            className="bg-card dark:bg-dark-card rounded-3xl p-8 border border-border dark:border-dark-border"
          >
            <View className="absolute top-0 left-0 right-0 h-1 bg-secondary dark:bg-dark-secondary rounded-t-3xl" />
            <Text
              variant="h5"
              color="body"
              className="text-center leading-8 font-medium"
            >
              Our vision is to be a transforming presence across
              communities—locally, nationally, and globally—where lives are
              renewed by the Gospel. We aim to raise disciples who are firmly
              rooted in faith, shaped by Scripture, and equipped to serve and
              lead with love, bringing lasting spiritual and social
              transformation to their families, workplaces, and nations.
            </Text>
          </Card>
        </AnimatedView>
      </View>

      {/* Pillars Section */}
      <View className="mb-12 mx-4">
        <SectionHeader
          icon="🏛️"
          title="Foundation Pillars"
          subtitle="Three pillars that hold and guide us"
          delay={300}
        />

        {pillars.map((pillar, index) => (
          <PillarCard
            key={index}
            icon={pillar.icon}
            title={pillar.title}
            description={pillar.description}
            variant={pillar.variant}
            delay={500 + index * 200}
          />
        ))}
      </View>

      {/* Welcome Message */}
      <AnimatedView
        entering={FadeInUp.delay(1100).duration(600)}
        className="mx-4 mb-8"
      >
        <Card
          variant="gradient-secondary"
          className="rounded-3xl p-8 border border-border dark:border-dark-border"
        >
          <View className="items-center mb-6">
            <Text variant="h3" color="neutral" className="font-black mb-2">
              Welcome Home 🏠
            </Text>
            <View className="w-16 h-px bg-surface dark:bg-dark-surface" />
          </View>

          <Text
            variant="h5"
            color="neutral"
            className="text-center leading-8 mb-6 font-medium"
          >
            Whether you&apos;re seeking spiritual growth, community fellowship, or
            simply curious about faith, you&apos;ll find a warm welcome here. Our
            doors and hearts are open to all who desire to experience God&apos;s love
            and grace.
          </Text>

          <View className="items-center">
            <View className="bg-surface dark:bg-dark-surface rounded-2xl px-6 py-4 border border-border dark:border-dark-border">
              <Text
                variant="h6"
                color="heading"
                className="italic font-semibold text-center"
              >
                &quot;Come as you are, grow as you journey, serve as you&apos;re called&quot;
              </Text>
            </View>
          </View>
        </Card>
      </AnimatedView>

      <Spacer height={12} />
    </View>
  );
};

export default AboutUs;
