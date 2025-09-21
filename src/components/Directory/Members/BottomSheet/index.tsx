import { BandBadge } from '@/src/components/Directory/Bands/BandBadge';
import Spacer from '@/src/components/Spacer';
import { Badge } from '@/src/components/UI/Badge';
import { Divider } from '@/src/components/UI/Divider';
import { Text } from '@/src/components/UI/Text';
import { View } from '@/src/components/UI/View';
import React, { useCallback, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  Platform,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import ActionButtons from './ActionButtons';
import ContactSection from './ContactSection';
import MemberDetails from './MemberDetails';
import ProfileSection from './ProfileSection';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const BOTTOM_SHEET_MAX_HEIGHT = SCREEN_HEIGHT * 0.8;

interface MemberBottomSheetProps {
  member: UserProfile | null;
  visible: boolean;
  onClose: () => void;
}

const MemberBottomSheet: React.FC<MemberBottomSheetProps> = ({
  member,
  visible,
  onClose,
}) => {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const isAnimatingRef = useRef(false);

  const handleClose = useCallback(() => {
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: SCREEN_HEIGHT,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      isAnimatingRef.current = false;
      onClose(); // Call parent's onClose after animation
    });
  }, [onClose, translateY, backdropOpacity]);

  React.useEffect(() => {
    if (visible && !isAnimatingRef.current) {
      isAnimatingRef.current = true;

      // Reset positions
      translateY.setValue(SCREEN_HEIGHT);
      backdropOpacity.setValue(0);

      // Animate in (sheet up + backdrop fade in)
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: SCREEN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
          useNativeDriver: true,
          tension: 30,
          friction: 9,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        isAnimatingRef.current = false;
      });
    } else if (!visible && isAnimatingRef.current === false) {
      handleClose();
    }

    // Cleanup function to stop animations on unmount
    return () => {
      if (isAnimatingRef.current) {
        translateY.stopAnimation();
        backdropOpacity.stopAnimation();
        isAnimatingRef.current = false;
      }
    };
  }, [visible, backdropOpacity, handleClose, translateY]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => false,
    onMoveShouldSetPanResponder: (_, gestureState) => {
      const isVertical =
        Math.abs(gestureState.dy) > 10 &&
        Math.abs(gestureState.dx) < Math.abs(gestureState.dy);

      // Only take control if scrolling is at the top and not currently animating
      return isVertical && gestureState.dy > 0 && !isAnimatingRef.current;
    },
    onPanResponderMove: (_, gestureState) => {
      if (!isAnimatingRef.current) {
        const newTranslateY = Math.max(
          SCREEN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
          Math.min(
            SCREEN_HEIGHT,
            SCREEN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT + gestureState.dy,
          ),
        );
        translateY.setValue(newTranslateY);

        // Update backdrop opacity based on position
        const progress = Math.max(
          0,
          Math.min(
            1,
            (SCREEN_HEIGHT - newTranslateY) / BOTTOM_SHEET_MAX_HEIGHT,
          ),
        );
        backdropOpacity.setValue(progress);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (isAnimatingRef.current) return;

      const { dy, vy } = gestureState;

      if (dy > 150 || (vy > 0.5 && dy > 50)) {
        handleClose();
      } else {
        isAnimatingRef.current = true;
        Animated.parallel([
          Animated.spring(translateY, {
            toValue: SCREEN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
            useNativeDriver: true,
            tension: 50,
            friction: 8,
          }),
          Animated.timing(backdropOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => {
          isAnimatingRef.current = false;
        });
      }
    },
  });

  if (!member) return null;

  return (
    <Modal
      transparent
      visible={visible}
      statusBarTranslucent
      animationType="none"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.6)',
            opacity: backdropOpacity,
          }}
        />
      </TouchableWithoutFeedback>

      {/* Bottom Sheet */}
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: SCREEN_HEIGHT,
          transform: [{ translateY }],
        }}
        className="bg-white dark:bg-gray-900 rounded-t-3xl shadow-2xl"
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          onPress={handleClose}
          className="items-center pt-3 pb-2"
          activeOpacity={0.7}
        >
          <View className="w-24 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </TouchableOpacity>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 20 }}
          scrollEventThrottle={16}
        >
          <ProfileSection member={member} />

          {/* Positions & Roles - Fixed missing margin value */}
          <View className="mb-4">
            <Text variant="h4" className="mb-1 font-bold">
              Positions & Roles
            </Text>
            {member.position && member.position.length > 0 ? (
              <Text
                variant="body"
                className="text-blue-600 dark:text-blue-400 font-semibold"
              >
                {Array.isArray(member.position)
                  ? member.position.join(', ')
                  : member.position}
              </Text>
            ) : (
              <Text variant="body" className="text-gray-500 dark:text-gray-400">
                -
              </Text>
            )}
          </View>

          <Divider spacing={10} />

          {member.department && member.department.length > 0 && (
            <>
              <View className="mb-4">
                <Text variant="h4" className="mb-2 font-bold">
                  Department
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {member.department.map((dept, index) => (
                    <Badge key={`dept-${index}`}>{dept}</Badge>
                  ))}
                </View>
              </View>
              <Divider spacing={16} />
            </>
          )}

          {/* Bands & Groups */}
          {member.band && member.band.length > 0 && (
            <>
              <View className="mb-4">
                <Text variant="h4" className="mb-2 font-bold">
                  Bands
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {member.band.map((band, index) => (
                    <BandBadge key={`band-${index}`} band={band} />
                  ))}
                </View>
              </View>
              <Divider spacing={16} />
            </>
          )}

          <MemberDetails member={member} />
          <ContactSection member={member} />
          <ActionButtons />

          {/* Improved spacer with better safe area handling */}
          <Spacer
            height={Platform.select({
              ios: 200,
              android: 150,
              default: 150,
            })}
          />
        </ScrollView>
      </Animated.View>
    </Modal>
  );
};

export default MemberBottomSheet;
