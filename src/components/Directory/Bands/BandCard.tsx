import { useAuthSlice } from '@/src/store';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { IconSymbol } from '../../Icons';
import NotPartOfBandModal from '../../RouteProtection/NotPartOfBandModal';
import { Text, View } from '../../UI';

const BandCard = ({ band }: { band: Band }) => {
  const router = useRouter();
  const { currentUser } = useAuthSlice();
  const [showModal, setShowModal] = useState(false);

  const handlePress = () => {
    const isAdmin = ['admin', 'super_admin'].includes(currentUser!.role);
    const isMemberOfBand = currentUser?.bandKeys?.some((b) => b === band?.id);

    if (isAdmin || isMemberOfBand) {
      router.push(`/directory/bands/${band?.id}` as any);
    } else {
      setShowModal(true);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      className="mb-4 rounded-xl overflow-hidden"
      android_ripple={{ color: 'rgba(255,255,255,0.1)' }}
    >
      <LinearGradient
        colors={band?.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 10,
          position: 'relative',
        }}
      >
        {/* Background Icon */}
        <View
          style={{ position: 'absolute', top: -10, right: -10, opacity: 0.2 }}
        >
          <IconSymbol name={band?.icon1} size={100} color="white" />
        </View>

        <View style={{ position: 'relative', zIndex: 10 }}>
          {/* Header */}
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <View className="bg-white/20 p-2 rounded-full mr-3">
                <IconSymbol name={band?.icon1} size={20} color="white" />
              </View>
              <View>
                <Text
                  variant="h3"
                  className="text-white dark:text-white font-bold"
                >
                  {band?.name}
                </Text>
                <Text
                  variant="caption"
                  className="text-white/80 dark:text-white"
                >
                  {band?.memberCount} members
                </Text>
              </View>
            </View>
            <IconSymbol name="chevron.right" size={20} color="white" />
          </View>

          {/* Description */}
          <Text
            variant="body"
            className="text-white/90 dark:text-white/90 mb-4 leading-5"
          >
            {band?.description}
          </Text>

          {/* Leadership */}
          <View>
            <Text
              variant="caption"
              className="text-white/80 dark:text-white font-semibold mb-2 text-center"
            >
              LEADERSHIP
            </Text>
            <View className="flex-row items-center mx-auto gap-2">
              {/* <UserAvatar
                avatar={band?.leadership?.avatar}
                firstName="Asdf"
                lastName="sadf"
                variant="extralSmall"
              /> */}
              <View>
                <Text
                  variant="caption"
                  className="text-white/60 dark:text-white font-semibold text-center"
                >
                  {band.leadership.captain || 'N/A'}
                </Text>
                <Text
                  variant="caption"
                  className="text-white/60 dark:text-white/80 text-center"
                >
                  Captain
                </Text>
              </View>
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                {/* <UserAvatar
                avatar={band?.leadership?.avatar}
                firstName="Asdf"
                lastName="sadf"
                variant="extralSmall"
              /> */}
                <View>
                  <Text
                    variant="caption"
                    className="text-white/60 dark:text-white font-semibold text-center"
                  >
                    {band.leadership.viceCaptain || 'N/A'}
                  </Text>
                  <Text
                    variant="caption"
                    className="text-white/60 dark:text-white/80 text-center"
                  >
                    Vice Captain
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center">
                {/* <UserAvatar
                avatar={band?.leadership?.avatar}
                firstName="Asdf"
                lastName="sadf"
                variant="extralSmall"
              /> */}
                <View>
                  <Text
                    variant="caption"
                    className="text-white/60 dark:text-white font-semibold text-center"
                  >
                    {band.leadership.secretary || 'N/A'}
                  </Text>
                  <Text
                    variant="caption"
                    className="text-white/60 dark:text-white/80 text-center"
                  >
                    Secretary
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
      <NotPartOfBandModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        bandIcon={band?.icon1}
        bandName={band?.name}
        bandGradient={band?.gradient}
      />
    </Pressable>
  );
};

export default BandCard;
