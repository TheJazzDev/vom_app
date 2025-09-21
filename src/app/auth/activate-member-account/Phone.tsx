import { Button, Card, Text, View } from '@/src/components';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Linking, TouchableOpacity } from 'react-native';

const Phone = ({ handleBackToSearch }: { handleBackToSearch: () => void }) => {
  const router = useRouter();
  const phoneNumber = '09032073321';
  const internationalPhone = '+2349032073321';

  const handleCall = async () => {
    try {
      const phoneUrl = `tel:${phoneNumber}`;
      const canOpen = await Linking.canOpenURL(phoneUrl);

      if (canOpen) {
        await Linking.openURL(phoneUrl);
      } else {
        Alert.alert(
          'Unable to make call',
          'Your device cannot make phone calls',
          [{ text: 'OK' }],
        );
      }
    } catch (error) {
      console.error('Error making call:', error);
      Alert.alert('Call failed', 'Unable to initiate phone call', [
        { text: 'OK' },
      ]);
    }
  };

  const handleWhatsApp = async () => {
    try {
      const message = encodeURIComponent(
        'Hello, I need help adding my email address to my VOM member profile for account activation.',
      );
      const whatsappUrl = `whatsapp://send?phone=${internationalPhone}&text=${message}`;
      const whatsappWebUrl = `https://wa.me/${internationalPhone}?text=${message}`;

      const canOpenApp = await Linking.canOpenURL(whatsappUrl);

      if (canOpenApp) {
        await Linking.openURL(whatsappUrl);
      } else {
        const canOpenWeb = await Linking.canOpenURL(whatsappWebUrl);
        if (canOpenWeb) {
          await Linking.openURL(whatsappWebUrl);
        } else {
          Alert.alert(
            'WhatsApp not available',
            'WhatsApp is not installed on your device',
            [{ text: 'OK' }],
          );
        }
      }
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
      Alert.alert('WhatsApp failed', 'Unable to open WhatsApp', [
        { text: 'OK' },
      ]);
    }
  };

  return (
    <View>
      <Card className="mb-6 items-center border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800">
        <Text className="text-6xl mb-4">📱❌</Text>
        <Text
          variant="h4"
          className="font-bold mb-3 text-yellow-800 dark:text-yellow-200 text-center"
        >
          Phone Activation Currently Unavailable
        </Text>
        <Text className="text-yellow-700 dark:text-yellow-300 text-center leading-relaxed">
          Phone activation is currently unavailable. To activate your account,
          please use email instead.
        </Text>
      </Card>

      <Card variant="outlined" className="mb-6">
        <Text variant="h5" className="font-bold mb-4 text-center">
          Contact VOM IT Department
        </Text>

        {/* Call Button */}
        <TouchableOpacity
          onPress={handleCall}
          className="flex-row items-center gap-3 px-4 py-3 mb-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
          activeOpacity={0.7}
        >
          <Text className="text-white text-xl">📞</Text>
          <Text className="font-semibold flex-1 text-blue-800 dark:text-blue-200">
            Call
          </Text>
          <Text className="text-blue-500">›</Text>
        </TouchableOpacity>

        {/* WhatsApp Button */}
        <TouchableOpacity
          onPress={handleWhatsApp}
          className="flex-row items-center gap-3 px-4 py-3 mb-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
          activeOpacity={0.7}
        >
          <Text className="text-white text-xl">💬</Text>
          <Text className="flex-1 font-semibold text-green-800 dark:text-green-200">
            WhatsApp
          </Text>
          <Text className="text-green-500">›</Text>
        </TouchableOpacity>

        <Text className="text-sm text-gray-600 dark:text-gray-400 text-center">
          After your email has been added to your profile, you can return here
          to activate your account.
        </Text>
      </Card>

      {/* Action Buttons */}
      <Button
        onPress={handleBackToSearch}
        textVariant="h5"
        fullWidth
        className="mb-4"
      >
        Activate with Email Address
      </Button>

      <Button
        onPress={() => router.push('/auth')}
        variant="outline"
        textVariant="h5"
        fullWidth
        className="border-2 border-gray-300 dark:border-gray-600"
      >
        Back to Home
      </Button>
    </View>
  );
};

export default Phone;
