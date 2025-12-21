import { useTheme } from '@/src/hooks';
import React, { ReactNode } from 'react';
import { StatusBar, Text, View } from 'react-native';
import Modal from 'react-native-modal';

type Props = {
  visible: boolean;
  firstName: string;
  onClose: () => void;
  children: ReactNode;
};

export default function AndroidMemberModal({
  visible,
  onClose,
  children,
  firstName,
}: Props) {
  const theme = useTheme();

  return (
    <Modal
      isVisible={visible}
      className="m-0 justify-end"
      onSwipeComplete={onClose}
      swipeDirection="down"
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.4}
      useNativeDriver
      onModalShow={() => StatusBar.setHidden(true, 'fade')}
      onModalHide={() => StatusBar.setHidden(false, 'fade')}
    >
      <View className="rounded-t-[10px] h-[98%] overflow-hidden">
        <View
          className="h-[50px] justify-center items-center"
          style={{ backgroundColor: theme.brand }}
        >
          <Text className="text-lg font-semibold" style={{ color: theme.heading }}>
            {firstName}&apos;s Details
          </Text>
        </View>
        <View className="flex-1">{children}</View>
      </View>
    </Modal>
  );
}
