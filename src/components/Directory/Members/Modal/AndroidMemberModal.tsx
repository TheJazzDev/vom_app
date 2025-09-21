import { useTheme } from '@/src/hooks';
import React, { ReactNode } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
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
      style={styles.modal}
      onSwipeComplete={onClose}
      swipeDirection="down"
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.4}
      useNativeDriver
      onModalShow={() => StatusBar.setHidden(true, 'fade')}
      onModalHide={() => StatusBar.setHidden(false, 'fade')}
    >
      <View style={styles.container}>
        <View style={[styles.header, { backgroundColor: theme.brand }]}>
          <Text style={[styles.headerText, { color: theme.heading }]}>
            {firstName}&apos;s Details
          </Text>
        </View>
        <View style={styles.content}>{children}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: '98%',
    overflow: 'hidden',
  },
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flexGrow: 1,
  },
});
