import { SkeletonBox } from '@/src/components/SkeletonBox';
import { Card, View } from '@/src/components/UI';

export const MemberCardSkeleton = () => {
  return (
    <Card variant="default" className="flex-row">
      <SkeletonBox width={48} height={48} borderRadius={24} />
      <View style={{ flex: 1, marginLeft: 16 }}>
        <SkeletonBox width="70%" height={18} borderRadius={4} />
        <View style={{ flexDirection: 'row', marginTop: 8, gap: 8 }}>
          <SkeletonBox width={60} height={14} borderRadius={12} />
          <SkeletonBox width={40} height={14} borderRadius={12} />
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <SkeletonBox width={8} height={8} borderRadius={4} />
          <SkeletonBox width={30} height={12} borderRadius={4} />
        </View>
      </View>
    </Card>
  );
};
