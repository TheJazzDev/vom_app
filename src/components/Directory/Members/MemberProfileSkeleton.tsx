import React from 'react';
import { SkeletonBox } from '../../SkeletonBox';
import { View } from '../../UI';

const MemberProfileSkeleton = () => {
  return (
    <View gradient paddingHorizontal={16}>
      {/* Avatar Skeleton */}
      <View className="mx-auto mb-6">
        <SkeletonBox width={128} height={128} borderRadius={64} />
      </View>

      {/* Name Skeleton */}
      <View className="items-center mb-8">
        <SkeletonBox width="60%" height={24} borderRadius={4} />
      </View>

      {/* Roles Section */}
      <View className="mb-6">
        <View className="flex-row items-center gap-4 mb-3">
          <SkeletonBox width={20} height={20} borderRadius={4} />
          <SkeletonBox width={60} height={18} borderRadius={4} />
        </View>
        <View className="flex-row gap-2 flex-wrap">
          <SkeletonBox width={80} height={28} borderRadius={14} />
          <SkeletonBox width={120} height={28} borderRadius={14} />
          <SkeletonBox width={100} height={28} borderRadius={14} />
        </View>
      </View>

      {/* Bands Section */}
      <View className="mb-6">
        <View className="flex-row items-center gap-4 mb-3">
          <SkeletonBox width={20} height={20} borderRadius={4} />
          <SkeletonBox width={50} height={18} borderRadius={4} />
        </View>
        <View className="flex-row gap-2 flex-wrap">
          <SkeletonBox width={90} height={28} borderRadius={14} />
          <SkeletonBox width={110} height={28} borderRadius={14} />
        </View>
      </View>

      {/* Contact Info Section */}
      <View className="mb-8">
        <View className="flex-row items-center gap-4 mb-3">
          <SkeletonBox width={20} height={20} borderRadius={4} />
          <SkeletonBox width={140} height={18} borderRadius={4} />
        </View>
        <View className="space-y-3">
          <SkeletonBox width="100%" height={20} borderRadius={4} />
          <SkeletonBox width="85%" height={20} borderRadius={4} />
          <SkeletonBox width="90%" height={20} borderRadius={4} />
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-row gap-2">
        <SkeletonBox width="49%" height={48} borderRadius={8} />
        <SkeletonBox width="49%" height={48} borderRadius={8} />
      </View>
    </View>
  );
};

export default MemberProfileSkeleton;
