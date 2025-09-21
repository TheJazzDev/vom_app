import { useDirectorySlice } from '@/src/store';
import React from 'react';
import { Platform } from 'react-native';
import MemberProfileDetail from '../MemberProfileDetail';
import AndroidMemberModal from './AndroidMemberModal';
import IOSMemberModal from './IOSModal';

type MemberModalProps = {
  visible: boolean;
  onClose: () => void;
  memberId: string;
};

export default function MemberModal({
  visible,
  onClose,
  memberId,
}: MemberModalProps) {
  const { allMembers } = useDirectorySlice();

  const member = allMembers.find((member) => member.id === memberId);

  if (Platform.OS === 'ios') {
    return (
      <IOSMemberModal
        visible={visible}
        onClose={onClose}
        firstName={`${member?.title} ${member?.firstName}` || ''}
      >
        <MemberProfileDetail member={member!} />
      </IOSMemberModal>
    );
  }
  return (
    <AndroidMemberModal
      visible={visible}
      onClose={onClose}
      firstName={`${member?.title} ${member?.firstName}` || ''}
    >
      <MemberProfileDetail member={member!} />
    </AndroidMemberModal>
  );
}
