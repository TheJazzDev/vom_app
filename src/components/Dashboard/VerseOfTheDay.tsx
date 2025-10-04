import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { Text, View } from '../UI';

const VerseOfTheDay = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const verseText =
    'Trust in the LORD with all your heart and lean not on your own understanding.';

  useEffect(() => {
    const textWidth = verseText.length * 8;

    const scrollAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scrollX, {
          toValue: -textWidth,
          duration: verseText.length * 150,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scrollX, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    );

    scrollAnimation.start();
    return () => scrollAnimation.stop();
  }, []);

  return (
    <View style={{ overflow: 'hidden', height: 24, marginBottom: 8 }}>
      <Animated.View
        style={{
          flexDirection: 'row',
          transform: [{ translateX: scrollX }],
        }}
      >
        <Text
          variant="body"
          className="text-white leading-6"
          numberOfLines={1}
          style={{ paddingRight: 50 }}
        >
          {verseText}
        </Text>
      </Animated.View>
    </View>
  );
};

export default VerseOfTheDay;
