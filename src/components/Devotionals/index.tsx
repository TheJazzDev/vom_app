import React, { useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { View } from '../UI';
import EnglishWatchWord from './English';
import { VerseOfTheDay } from './VerseOfTheDay';
import YorubaWatchWord from './Yoruba';

export default function Devotionals() {
  const [parentWidth, setParentWidth] = useState<number>(0);

  const data = [
    <VerseOfTheDay key="verse" />,
    <YorubaWatchWord key="yoruba" />,
    <EnglishWatchWord key="english" />,
  ];

  return (
    <View
      className="mb-3"
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setParentWidth(width);
      }}
    >
      {parentWidth > 0 && (
        <Carousel
          loop
          autoPlay
          data={data}
          mode="parallax"
          height={150}
          width={parentWidth}
          autoPlayInterval={5000}
          scrollAnimationDuration={1200}
          renderItem={({ item }) => item}
        />
      )}
    </View>
  );
}
