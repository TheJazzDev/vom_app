import { IconSymbol } from '@/src/components/Icons';
import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import * as Clipboard from 'expo-clipboard';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Alert,
  Animated,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

interface ContactMethodProps {
  icon: string;
  title: string;
  subtitle: string;
  value: string;
  type: 'phone' | 'email' | 'location';
  gradient: [string, string];
}

const ContactMethod: React.FC<ContactMethodProps> = ({
  icon,
  title,
  subtitle,
  value,
  type,
  gradient,
}) => {
  const theme = useTheme();
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    if (type === 'phone') {
      Linking.openURL(`tel:${value}`).catch(() =>
        Alert.alert('Error', 'Unable to make phone call'),
      );
    } else if (type === 'email') {
      Linking.openURL(`mailto:${value}`).catch(() =>
        Alert.alert('Error', 'Unable to open email app'),
      );
    } else if (type === 'location') {
      const encodedAddress = encodeURIComponent(value);
      Linking.openURL(`https://maps.google.com/?q=${encodedAddress}`).catch(
        () => Alert.alert('Error', 'Unable to open maps'),
      );
    }
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
    >
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          marginBottom: 16,
        }}
      >
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 20,
            padding: 1,
          }}
        >
          <View
            className="rounded-[19px] p-5"
            style={{ backgroundColor: theme.card }}
          >
            <View className="flex-row items-center">
              <LinearGradient
                colors={gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16,
                }}
              >
                <IconSymbol name={icon as any} size={28} color="white" />
              </LinearGradient>

              <View className="flex-1">
                <Text
                  variant="h5"
                  className="font-bold mb-1"
                  style={{ color: theme.heading }}
                >
                  {title}
                </Text>
                <Text variant="caption" style={{ color: theme.muted }}>
                  {subtitle}
                </Text>
              </View>

              <IconSymbol name="chevron.right" size={20} color={theme.muted} />
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
};

interface SocialMediaLinkProps {
  platform: string;
  icon: string;
  url: string;
  gradient: [string, string];
  handle: string;
}

const SocialMediaLink: React.FC<SocialMediaLinkProps> = ({
  platform,
  icon,
  url,
  gradient,
  handle,
}) => {
  const theme = useTheme();
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    Linking.openURL(url).catch(() =>
      Alert.alert('Error', `Unable to open ${platform}`),
    );
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      className="mb-3"
    >
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
        }}
      >
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 16,
            padding: 1,
          }}
        >
          <View
            className="rounded-[15px] p-4"
            style={{ backgroundColor: theme.card }}
          >
            <View className="flex-row items-center">
              <LinearGradient
                colors={gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                }}
              >
                <IconSymbol name={icon as any} size={24} color="white" />
              </LinearGradient>

              <View className="flex-1">
                <Text
                  variant="body"
                  className="font-bold mb-1"
                  style={{ color: theme.heading }}
                >
                  {platform}
                </Text>
                <Text variant="caption" style={{ color: theme.muted }}>
                  {handle}
                </Text>
              </View>

              <IconSymbol
                name="arrow.up.forward"
                size={18}
                color={theme.muted}
              />
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
};

interface BankAccountCardProps {
  title: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  description: string;
  icon: string;
  gradient: [string, string];
}

const BankAccountCard: React.FC<BankAccountCardProps> = ({
  title,
  bankName,
  accountName,
  accountNumber,
  description,
  icon,
  gradient,
}) => {
  const theme = useTheme();
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (text: string, label: string) => {
    await Clipboard.setStringAsync(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);

    if (Platform.OS === 'android') {
      Alert.alert('Copied!', `${label} copied to clipboard`);
    }
  };

  return (
    <View className="mb-4">
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 24,
          padding: 20,
        }}
      >
        {/* Header */}
        <View className="flex-row items-center mb-4">
          <View
            className="w-12 h-12 rounded-full items-center justify-center mr-3"
            style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
          >
            <IconSymbol name={icon as any} size={24} color="white" />
          </View>
          <View className="flex-1">
            <Text variant="h4" className="text-white font-bold">
              {title}
            </Text>
            <Text variant="caption" className="text-white/80">
              {description}
            </Text>
          </View>
        </View>

        {/* Account Details */}
        <View
          className="rounded-2xl p-4 mb-3"
          style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}
        >
          {/* Bank Name */}
          <TouchableOpacity
            onPress={() => copyToClipboard(bankName, 'Bank Name')}
            className="mb-3"
          >
            <Text
              variant="caption"
              className="mb-1"
              style={{ color: theme.muted }}
            >
              Bank Name
            </Text>
            <View className="flex-row items-center justify-between">
              <Text
                variant="body"
                className="font-semibold"
                style={{ color: theme.heading }}
              >
                {bankName}
              </Text>
              {copied === 'Bank Name' ? (
                <IconSymbol
                  name="checkmark.circle.fill"
                  size={18}
                  color="#10B981"
                />
              ) : (
                <IconSymbol name="doc.on.doc" size={16} color={theme.muted} />
              )}
            </View>
          </TouchableOpacity>

          {/* Account Name */}
          <TouchableOpacity
            onPress={() => copyToClipboard(accountName, 'Account Name')}
            className="mb-3"
          >
            <Text
              variant="caption"
              className="mb-1"
              style={{ color: theme.muted }}
            >
              Account Name
            </Text>
            <View className="flex-row items-center justify-between">
              <Text
                variant="body"
                className="font-semibold flex-1"
                style={{ color: theme.heading }}
              >
                {accountName}
              </Text>
              {copied === 'Account Name' ? (
                <IconSymbol
                  name="checkmark.circle.fill"
                  size={18}
                  color="#10B981"
                />
              ) : (
                <IconSymbol name="doc.on.doc" size={16} color={theme.muted} />
              )}
            </View>
          </TouchableOpacity>

          {/* Account Number */}
          <TouchableOpacity
            onPress={() => copyToClipboard(accountNumber, 'Account Number')}
            className="rounded-xl p-4"
            style={{ backgroundColor: `${gradient[0]}10` }}
          >
            <Text
              variant="caption"
              className="mb-2 text-center"
              style={{ color: theme.muted }}
            >
              Account Number
            </Text>
            <View className="flex-row items-center justify-center">
              <Text
                variant="h3"
                className="font-bold font-mono tracking-wider mr-2"
                style={{ color: theme.heading }}
              >
                {accountNumber}
              </Text>
              {copied === 'Account Number' ? (
                <IconSymbol
                  name="checkmark.circle.fill"
                  size={20}
                  color="#10B981"
                />
              ) : (
                <IconSymbol name="doc.on.doc" size={18} color={theme.muted} />
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Tap to copy hint */}
        <Text variant="caption" className="text-white/70 text-center">
          Tap any field to copy
        </Text>
      </LinearGradient>
    </View>
  );
};

export default function ContactUs() {
  const theme = useTheme();

  const churchAddress =
    '4, Jaf Street, off Powerline, behind NNPC Filling Stage, Lafenwa Itele Road, Ogun State';

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Hero Header */}
        <LinearGradient
          colors={['#6366F1', '#8B5CF6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            paddingHorizontal: 20,
            paddingTop: 40,
            paddingBottom: 60,
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
          }}
        >
          <View className="items-center">
            <View
              className="w-20 h-20 rounded-full items-center justify-center mb-4"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            >
              <IconSymbol
                name="heart.text.square.fill"
                size={40}
                color="white"
              />
            </View>

            <Text
              variant="h1"
              className="text-white font-bold text-center mb-2"
            >
              Get In Touch
            </Text>
            <Text variant="body" className="text-white/90 text-center max-w-xs">
              We&apos;re here to connect with you. Reach out anytime!
            </Text>
          </View>
        </LinearGradient>

        <View className="px-5 -mt-8">
          {/* Contact Methods */}
          <View className="mb-8">
            <View className="flex-row items-center mb-4">
              <View
                className="h-px flex-1"
                style={{ backgroundColor: theme.border }}
              />
              <Text
                variant="h5"
                className="font-bold mx-4"
                style={{ color: theme.heading }}
              >
                Contact Methods
              </Text>
              <View
                className="h-px flex-1"
                style={{ backgroundColor: theme.border }}
              />
            </View>

            <ContactMethod
              icon="phone.fill"
              title="Call Us - Prayer Line 1"
              subtitle="Available for prayer & counseling"
              value="08025137520"
              type="phone"
              gradient={['#10B981', '#059669']}
            />

            <ContactMethod
              icon="phone.fill"
              title="Call Us - Prayer Line 2"
              subtitle="Available for prayer & counseling"
              value="08161330142"
              type="phone"
              gradient={['#8B5CF6', '#7C3AED']}
            />

            <ContactMethod
              icon="envelope.fill"
              title="Email Us"
              subtitle="Send us your inquiries"
              value="csmcvalleyofmercy@gmail.com"
              type="email"
              gradient={['#3B82F6', '#2563EB']}
            />

            <ContactMethod
              icon="location.fill"
              title="Visit Our Church"
              subtitle="Open in Google Maps"
              value={churchAddress}
              type="location"
              gradient={['#EF4444', '#DC2626']}
            />
          </View>

          {/* Social Media Links */}
          <View className="mb-8">
            <View className="flex-row items-center mb-4">
              <View
                className="h-px flex-1"
                style={{ backgroundColor: theme.border }}
              />
              <Text
                variant="h5"
                className="font-bold mx-4"
                style={{ color: theme.heading }}
              >
                Follow Us
              </Text>
              <View
                className="h-px flex-1"
                style={{ backgroundColor: theme.border }}
              />
            </View>

            <SocialMediaLink
              platform="TikTok"
              icon="play.circle.fill"
              url="https://www.tiktok.com/@valleyofmercy01"
              handle="@valleyofmercy01"
              gradient={['#000000', '#69C9D0']}
            />

            <SocialMediaLink
              platform="Instagram"
              icon="camera.fill"
              url="https://www.instagram.com/csmc_vom?igsh=am5wMXVqb2UzcWdx&utm_source=qr"
              handle="@csmc_vom"
              gradient={['#833AB4', '#FD1D1D']}
            />

            <SocialMediaLink
              platform="Facebook"
              icon="person.3.fill"
              url="https://www.facebook.com/share/183xHZHbPm/?mibextid=wwXIfr"
              handle="Valley of Mercy"
              gradient={['#1877F2', '#0C63D4']}
            />
          </View>

          {/* Church Accounts */}
          <View className="mb-6">
            <View className="items-center mb-6">
              <View
                className="w-16 h-16 rounded-full items-center justify-center mb-3"
                style={{ backgroundColor: `${theme.primary}15` }}
              >
                <IconSymbol
                  name="creditcard.fill"
                  size={32}
                  color={theme.primary}
                />
              </View>
              <Text
                variant="h3"
                className="font-bold text-center"
                style={{ color: theme.heading }}
              >
                Church Accounts
              </Text>
              <Text
                variant="body"
                className="text-center mt-2"
                style={{ color: theme.muted }}
              >
                Support God&apos;s work through giving
              </Text>
            </View>

            <BankAccountCard
              title="General Donations"
              bankName="Zenith Bank"
              accountName="C&S Movt. Church Valley of Mercy"
              accountNumber="1229217563"
              description="Offerings & general support"
              icon="banknote"
              gradient={['#10B981', '#059669']}
            />

            <BankAccountCard
              title="Projects & Tithes"
              bankName="Zenith Bank"
              accountName="C&S Movt. Church Valley of Mercy (Project & Tithes)"
              accountNumber="1310028519"
              description="Building fund & tithes"
              icon="building.2.fill"
              gradient={['#F59E0B', '#D97706']}
            />
          </View>

          {/* Welcome Message */}
          <View
            className="rounded-2xl p-6"
            style={{
              backgroundColor: theme.card,
              borderWidth: 1,
              borderColor: theme.border,
            }}
          >
            <View className="items-center">
              <View
                className="w-14 h-14 rounded-full items-center justify-center mb-4"
                style={{ backgroundColor: `${theme.primary}15` }}
              >
                <IconSymbol name="sparkles" size={28} color={theme.primary} />
              </View>

              <Text
                variant="h4"
                className="font-bold mb-3 text-center"
                style={{ color: theme.heading }}
              >
                You&apos;re Always Welcome!
              </Text>

              <Text
                variant="body"
                className="text-center leading-6 mb-4"
                style={{ color: theme.text }}
              >
                Come as you are and experience God&apos;s love and grace in our
                community. We can&apos;t wait to worship with you!
              </Text>

              <View
                className="rounded-xl p-3"
                style={{ backgroundColor: `${theme.primary}08` }}
              >
                <Text
                  variant="caption"
                  className="italic text-center"
                  style={{ color: theme.primary }}
                >
                  &quot;The Lord bless you and keep you&quot; - Numbers 6:24
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
