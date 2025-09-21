import { Card } from '@/src/components/UI';
import React from 'react';
import { View } from 'react-native';
import { SkeletonBox } from '../../SkeletonBox';

export const ProgrammeListCardSkeleton = () => {
  return (
    <Card variant="outlined" className="p-4 mb-3">
      <View className="flex-row items-start justify-between mb-4">
        <View className="flex-1">
          <View className="flex-row items-center mb-2">
            <SkeletonBox width={12} height={12} borderRadius={6} />
            <View className="ml-2">
              <SkeletonBox width="60%" height={20} borderRadius={4} />
            </View>
          </View>
          <View className="flex-row items-center gap-4 my-2">
            <View className="flex-row items-center gap-2">
              <SkeletonBox width={14} height={14} borderRadius={7} />
              <SkeletonBox width={80} height={12} borderRadius={3} />
            </View>
            <View className="flex-row items-center gap-2">
              <SkeletonBox width={14} height={14} borderRadius={7} />
              <SkeletonBox width={60} height={12} borderRadius={3} />
            </View>
          </View>
          <SkeletonBox width="85%" height={18} borderRadius={4} />
          <View className="mt-1">
            <SkeletonBox width="70%" height={14} borderRadius={3} />
          </View>
        </View>
        <View className="ml-4">
          <SkeletonBox width={60} height={40} borderRadius={8} />
        </View>
      </View>
      <View className="flex-row gap-2">
        <View className="flex-1">
          <SkeletonBox width="100%" height={32} borderRadius={6} />
        </View>
        <SkeletonBox width={40} height={32} borderRadius={6} />
      </View>
    </Card>
  );
};
