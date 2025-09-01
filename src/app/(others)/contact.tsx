import { Card, Spacer, Text, View } from '@/src/components';
import React from 'react';
import { Alert, Linking, TouchableOpacity } from 'react-native';

interface ContactCardProps {
  icon: string;
  title: string;
  details: string[];
  action?: () => void;
  actionText?: string;
}

const ContactCard: React.FC<ContactCardProps> = ({
  icon,
  title,
  details,
  action,
  actionText,
}) => (
  <View className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-4 shadow-sm">
    <View className="flex-row items-center mb-4">
      <View className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full items-center justify-center mr-4">
        <Text className="text-xl">{icon}</Text>
      </View>
      <Text variant="h4" className="font-bold flex-1">
        {title}
      </Text>
    </View>

    {details.map((detail, index) => (
      <Text
        key={index}
        variant="body"
        className="mb-2 text-gray-600 dark:text-gray-300"
      >
        {detail}
      </Text>
    ))}

    {action && actionText && (
      <TouchableOpacity
        onPress={action}
        className="bg-blue-600 dark:bg-blue-500 rounded-lg py-3 px-4 mt-3"
      >
        <Text className="text-white text-center font-semibold">
          {actionText}
        </Text>
      </TouchableOpacity>
    )}
  </View>
);

interface BankAccountCardProps {
  title: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  description?: string;
}

const BankAccountCard: React.FC<BankAccountCardProps> = ({
  title,
  bankName,
  accountName,
  accountNumber,
  description,
}) => {
  const copyToClipboard = (text: string, label: string) => {
    // In a real app, you'd use @react-native-clipboard/clipboard
    Alert.alert(
      'Account Details',
      `${label}: ${text}\n\nCopied!`,
      [{ text: 'OK' }],
    );
  };

  return (
    <View className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-4 shadow-sm border-l-4 border-l-green-500">
      <View className="flex-row items-center mb-3">
        <View className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full items-center justify-center mr-3">
          <Text className="text-lg">🏦</Text>
        </View>
        <Text
          variant="h5"
          className="font-bold text-green-600 dark:text-green-400"
        >
          {title}
        </Text>
      </View>

      {description && (
        <Text
          variant="caption"
          className="text-gray-500 dark:text-gray-400 mb-4 italic"
        >
          {description}
        </Text>
      )}

      <View className="space-y-3">
        <View>
          <Text
            variant="caption"
            className="text-gray-500 dark:text-gray-400 mb-1"
          >
            Bank Name
          </Text>
          <TouchableOpacity
            onPress={() => copyToClipboard(bankName, 'Bank Name')}
          >
            <Text variant="body" className="font-semibold">
              {bankName}
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text
            variant="caption"
            className="text-gray-500 dark:text-gray-400 mb-1"
          >
            Account Name
          </Text>
          <TouchableOpacity
            onPress={() => copyToClipboard(accountName, 'Account Name')}
          >
            <Text variant="body" className="font-semibold">
              {accountName}
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text
            variant="caption"
            className="text-gray-500 dark:text-gray-400 mb-1"
          >
            Account Number
          </Text>
          <TouchableOpacity
            onPress={() => copyToClipboard(accountNumber, 'Account Number')}
          >
            <View className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border-2 border-dashed border-gray-300 dark:border-gray-600">
              <Text
                variant="h4"
                className="font-mono font-bold text-center tracking-wider"
              >
                {accountNumber}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
        <Text
          variant="caption"
          className="text-center text-gray-500 dark:text-gray-400"
        >
          Tap on any detail to copy
        </Text>
      </View>
    </View>
  );
};

const ContactUs = () => {
  const churchAddress =
    '4, Jaf Street, off Powerline, behind NNPC Filling Stage, Lafenwa Itele Road, Ogun State';

  const openMaps = () => {
    const encodedAddress = encodeURIComponent(churchAddress);
    const url = `https://maps.google.com/?q=${encodedAddress}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Unable to open maps application');
        }
      })
      .catch(() => {
        Alert.alert('Error', 'Unable to open maps application');
      });
  };

  const makePhoneCall = (phoneNumber: string) => {
    const url = `tel:${phoneNumber}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Unable to make phone call');
        }
      })
      .catch(() => {
        Alert.alert('Error', 'Unable to make phone call');
      });
  };

  const sendEmail = (email: string) => {
    const url = `mailto:${email}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Unable to open email application');
        }
      })
      .catch(() => {
        Alert.alert('Error', 'Unable to open email application');
      });
  };

  return (
    <View gradient scrollable>
      <Spacer height={12} />
      {/* Header */}
      <Card variant="gradient-soft" className="py-8 shadow-sm">
        <View className="items-center">
          <View className="w-16 h-16 bg-blue-600 rounded-full items-center justify-center mb-4 shadow-lg">
            <Text className="text-2xl text-white">📞</Text>
          </View>
          <Text variant="h2" className="font-bold text-center">
            Get In Touch
          </Text>
          <Text
            variant="body"
            className="text-center mt-2 text-gray-600 dark:text-gray-400"
          >
            We're here to connect with you
          </Text>
        </View>
      </Card>

      <View className="py-8">
        {/* Church Location */}
        <ContactCard
          icon="📍"
          title="Church Address"
          details={[
            '4, Jaf Street, off Powerline, Behind NNPC Filling Station, Lafenwa Itele Road, Ogun State',
          ]}
          action={openMaps}
          actionText="Open in Maps"
        />

        {/* Prayer & Counseling */}
        <View className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-4 shadow-sm">
          <View className="flex-row items-center mb-4">
            <View className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full items-center justify-center mr-4">
              <Text className="text-xl">🙏</Text>
            </View>
            <Text variant="h4" className="font-bold">
              Prayer & Counseling
            </Text>
          </View>

          <Text
            variant="body"
            className="mb-4 text-gray-600 dark:text-gray-300"
          >
            Need prayer support or spiritual counseling? Our pastors are
            available to help.
          </Text>

          <View>
            <TouchableOpacity
              onPress={() => makePhoneCall('08025137520')}
              className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800"
            >
              <View className="flex-row items-center">
                <Text className="text-lg mr-3">📱</Text>
                <View className="flex-1">
                  <Text variant="body" className="font-semibold">
                    08025137520
                  </Text>
                  <Text
                    variant="caption"
                    className="text-purple-600 dark:text-purple-400"
                  >
                    Tap to call
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <Spacer height={20} />
            <TouchableOpacity
              onPress={() => makePhoneCall('08161330142')}
              className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800"
            >
              <View className="flex-row items-center">
                <Text className="text-lg mr-3">📱</Text>
                <View className="flex-1">
                  <Text variant="body" className="font-semibold">
                    08161330142
                  </Text>
                  <Text
                    variant="caption"
                    className="text-purple-600 dark:text-purple-400"
                  >
                    Tap to call
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Email Contact */}
        <ContactCard
          icon="📧"
          title="Email Us"
          details={[
            'Send us your questions, prayer requests,',
            'or any other inquiries via email.',
          ]}
          action={() => sendEmail('info@csmcsurulere.org')}
          actionText="Send Email"
        />

        {/* Service Times */}
        <View className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 shadow-sm">
          <View className="flex-row items-center mb-4">
            <View className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full items-center justify-center mr-4">
              <Text className="text-xl">⏰</Text>
            </View>
            <Text variant="h4" className="font-bold">
              Service Times
            </Text>
          </View>

          <View className="space-y-4">
            <View className="flex-row justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
              <Text variant="body" className="font-semibold">
                Sunday Service
              </Text>
              <Text
                variant="body"
                className="text-orange-600 dark:text-orange-400"
              >
                9:00 AM
              </Text>
            </View>

            <View className="flex-row justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
              <Text variant="body" className="font-semibold">
                Mid-Week Service
              </Text>
              <Text
                variant="body"
                className="text-orange-600 dark:text-orange-400"
              >
                Wednesday 6:00 PM
              </Text>
            </View>

            <View className="flex-row justify-between items-center py-2">
              <Text variant="body" className="font-semibold">
                Vigil Service
              </Text>
              <Text
                variant="body"
                className="text-orange-600 dark:text-orange-400"
              >
                Friday 10:00 PM
              </Text>
            </View>
          </View>
        </View>

        {/* Banking Information Section */}
        <View className="mb-6">
          <View className="items-center mb-6">
            <View className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full items-center justify-center mb-3">
              <Text className="text-xl">💰</Text>
            </View>
            <Text variant="h3" className="font-bold text-center">
              Church Accounts
            </Text>
            <Text
              variant="body"
              className="text-center mt-2 text-gray-600 dark:text-gray-400"
            >
              For donations and church support
            </Text>
          </View>

          {/* Main Church Account */}
          <BankAccountCard
            title="General Donations"
            bankName="Zenith Bank"
            accountName="C&S Movt. Church Valley of Mercy"
            accountNumber="1229217563"
            description="For general church offerings, donations, and operational support"
          />

          {/* Projects & Tithes Account */}
          <BankAccountCard
            title="Projects & Tithes"
            bankName="Zenith Bank"
            accountName="C&S Movt. Church Valley of Mercy (Project & Tithes)"
            accountNumber="1310028519"
            description="For church development projects, building fund, and tithes"
          />
        </View>

        {/* Visit Us Message */}
        <View className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 mb-8">
          <View className="items-center">
            <Text
              variant="h4"
              className="font-bold text-blue-600 dark:text-blue-400 mb-3"
            >
              Visit Us Today!
            </Text>
            <Text variant="body" className="text-center leading-6 mb-4">
              You're always welcome to join our church family. Come as you are
              and experience God's love and grace in our community.
            </Text>
            <View className="items-center">
              <Text
                variant="caption"
                className="italic text-gray-600 dark:text-gray-400"
              >
                "The Lord bless you and keep you" - Numbers 6:24
              </Text>
            </View>
          </View>
        </View>

        {/* Bottom spacing */}
        <View className="h-8" />
      </View>
    </View>
  );
};

export default ContactUs;
