import { LinearGradient } from 'expo-linear-gradient';
import { Modal, Pressable } from 'react-native';

import { useTheme } from '@/src/hooks';
import { IconSymbol } from '../Icons';
import { IconSymbolName } from '../Icons/IconSymbol';
import { Text, View } from '../UI';

const NotPartOfBandModal = ({
  visible,
  onClose,
  bandName,
  bandIcon,
  bandGradient,
}: {
  visible: boolean;
  onClose: () => void;
  bandName: string;
  bandIcon: IconSymbolName;
  bandGradient: GradientColor;
}) => {
  const theme = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable className="flex-1" onPress={onClose}>
        <View className="flex-1 justify-center items-center bg-black/50 px-6">
          <View
            className="w-full max-w-sm rounded-2xl overflow-hidden"
            style={{ backgroundColor: theme.background }}
          >
            <LinearGradient
              colors={[theme.primary, theme.secondary || theme.primary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ paddingVertical: 16, alignItems: 'center' }}
            >
              <View className="bg-white/20 p-4 rounded-full mb-4">
                <IconSymbol name="lock" size={32} color="white" />
              </View>
              <Text variant="h3" className="text-white font-bold text-center">
                Access Restricted
              </Text>
            </LinearGradient>

            <View className="p-6">
              <View className="flex-row mx-auto gap-2">
                <IconSymbol name={bandIcon} size={24} color={bandGradient[0]} />
                <Text
                  variant="h4"
                  className="font-bold mb-2 text-center"
                  style={{ color: theme.heading }}
                >
                  {bandName}
                </Text>
              </View>
              <Text
                variant="body"
                className="text-center mb-4"
                style={{ color: theme.muted }}
              >
                You&apos;re not a member of this band. Only band members and
                administrators can view the member directory.
              </Text>

              <Pressable
                onPress={onClose}
                className="border rounded-lg py-3 px-4"
                style={{ borderColor: theme.border }}
              >
                <Text variant="button" className="text-center font-semibold">
                  Close
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default NotPartOfBandModal;
