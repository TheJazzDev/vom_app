import DepartmentCard from '@/src/components/Directory/Department/DepartmentCard';
import { IconSymbol } from '@/src/components/Icons';
import { Card, Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { dispatch, useDirectorySlice } from '@/src/store';
import { fetchAllDepartmentsThunk } from '@/src/store/thunks/directory';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';

export default function DirectoryDepartments() {
  const theme = useTheme();

  const { allDepartments, isFetchingAllDepartment } = useDirectorySlice();

  useEffect(() => {
    dispatch(fetchAllDepartmentsThunk());
  }, []);

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      {/* Header */}
      <View className="px-4 pt-2 pb-2">
        <Text
          variant="h2"
          className="font-bold mb-1"
          style={{ color: theme.heading }}
        >
          Church Departments
        </Text>
        <Text variant="body" style={{ color: theme.muted }}>
          Various ministries serving God and building his kingdom
        </Text>

        {/* Stats */}
        <View className="flex-row mt-4 gap-2">
          <Card variant="gradient-soft" className="flex-1">
            <Text
              variant="h3"
              className="font-bold"
              style={{ color: theme.primary }}
            >
              {allDepartments.length}
            </Text>
            <Text variant="caption" style={{ color: theme.muted }}>
              Departments
            </Text>
          </Card>
          <Card variant="gradient-soft" className="flex-1">
            <Text
              variant="h3"
              className="font-bold"
              style={{ color: theme.primary }}
            >
              {allDepartments.reduce(
                (total, dept) => total + dept.memberCount,
                0,
              )}
            </Text>
            <Text variant="caption" style={{ color: theme.muted }}>
              Total Members
            </Text>
          </Card>
        </View>
      </View>

      {/* Departments List */}
      <FlatList
        data={allDepartments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DepartmentCard department={item} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        ListEmptyComponent={
          isFetchingAllDepartment ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="#2563EB" />
            </View>
          ) : (
            <View className="mx-auto mt-6">
              <Text variant="h4">No band members</Text>
            </View>
          )
        }
      />

      {/* Join Department CTA */}
      <View className="mx-4 mb-4">
        <LinearGradient
          colors={[theme.primary, theme.secondary || theme.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
        >
          <View className="flex-row items-center gap-4">
            <View className="bg-white/20 p-3 rounded-full">
              <IconSymbol name="person.badge.plus" size={24} color="white" />
            </View>
            <View className="flex-1">
              <Text variant="h5" className="text-white font-bold">
                Want to Join a Department?
              </Text>
              <Text
                variant="subtitle2"
                className="text-white/90 dark:text-white/80"
              >
                Contact any department head or speak to a pastor
              </Text>
            </View>
            <IconSymbol
              name="arrow.right.circle.fill"
              size={24}
              color="white"
            />
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}
