import { useTheme } from '@/src/hooks';
import React, { ReactNode } from 'react';
import { Modal, Text, View } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  firstName: string;
  children: ReactNode;
};

export default function IOSMemberModal({
  visible,
  onClose,
  children,
  firstName,
}: Props) {
  const theme = useTheme();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View
        className="h-[54px] items-center justify-center"
        style={{ backgroundColor: theme.brand, elevation: 2 }}
      >
        <Text className="text-lg font-semibold text-white">
          {firstName}&apos;s Details
        </Text>
      </View>
      {children}
    </Modal>
  );
}
