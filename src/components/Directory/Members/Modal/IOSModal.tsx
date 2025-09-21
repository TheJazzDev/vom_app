import { useTheme } from '@/src/hooks';
import React, { ReactNode } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

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
      <View style={[styles.header, { backgroundColor: theme.brand }]}>
        <Text style={[styles.headerText, { color: 'white' }]}>
          {firstName}&apos;s Details
        </Text>
      </View>
      {children}
    </Modal>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
});
