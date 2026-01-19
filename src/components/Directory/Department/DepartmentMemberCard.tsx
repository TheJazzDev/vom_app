import { Badge, IconSymbol, Text, View } from '@/src/components';
import { TouchableOpacity } from 'react-native';
import UserAvatar from '../../UserAvatar';

interface DepartmentMemberCardProps {
  member: UserProfile;
  role: DepartmentRole;
  onPress: () => void;
}

const getRoleIcon = (role: DepartmentRole): any => {
  switch (role) {
    case 'Head':
      return 'crown';
    case 'Assistant':
      return 'star.circle';
    case 'Secretary':
      return 'doc.text';
    case 'Treasurer':
      return 'dollarsign.circle';
    default:
      return 'person.circle';
  }
};

const getRoleColor = (role: DepartmentRole): string => {
  switch (role) {
    case 'Head':
      return '#FFD700';
    case 'Assistant':
      return '#FF6B6B';
    case 'Secretary':
      return '#45B7D1';
    case 'Treasurer':
      return '#96CEB4';
    default:
      return '#95A5A6';
  }
};

export const DepartmentMemberCard: React.FC<DepartmentMemberCardProps> = ({
  member,
  role,
  onPress,
}) => {
  const isLeader = role !== 'Member';
  const roleIcon = getRoleIcon(role);
  const roleColor = getRoleColor(role);

  //   console.log(role)
  //   console.log(member.department[0].name)

  return (
    <TouchableOpacity
      onPress={onPress}
      className="mx-4 mb-3"
      activeOpacity={0.7}
    >
      <View
        className={`bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border ${
          isLeader
            ? 'border-purple-200 dark:border-purple-700 bg-gradient-to-r from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20'
            : 'border-gray-100 dark:border-gray-700'
        }`}
      >
        <View className="flex-row items-center">
          {/* Avatar */}
          <View className="relative">
            <View className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-full items-center justify-center">
              <UserAvatar
                avatar=""
                firstName={member.firstName}
                lastName={member.lastName}
              />
            </View>

            {/* Role Badge */}
            {isLeader && (
              <View
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full items-center justify-center border-2 border-white dark:border-gray-800"
                style={{ backgroundColor: roleColor }}
              >
                <IconSymbol name={roleIcon} size={12} color="white" />
              </View>
            )}
          </View>

          {/* Member Info */}
          <View className="flex-1 ml-4">
            <Text
              variant="h4"
              className="text-gray-900 dark:text-white font-semibold mb-1"
            >
              {member.firstName} {member.lastName}
            </Text>
            <Badge size="sm" variant="outline">
              {role}
            </Badge>
          </View>

          {/* Arrow */}
          <View className="ml-2">
            <IconSymbol
              name="chevron.right"
              size={16}
              color={isLeader ? roleColor : '#9CA3AF'}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
