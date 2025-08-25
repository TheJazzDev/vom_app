// import React, { useEffect, useRef, useState } from 'react';
// import {
//   ActivityIndicator,
//   Animated,
//   Dimensions,
//   TouchableOpacity,
// } from 'react-native';
// import { Text } from './Text';
// import { View } from './View';

// const { width: screenWidth } = Dimensions.get('window');

// interface DailyVerse {
//   verse: string;
//   reference: string;
//   date: string;
// }

// interface DailyVerseScrollProps {
//   verse: string;
//   reference: string;
//   isLoading?: boolean;
//   onRefresh?: () => void;
//   scrollSpeed?: number;
//   pauseOnPress?: boolean;
//   className?: string;
// }

// const SimpleDailyVerseScroll: React.FC<DailyVerseScrollProps> = ({
//   verse,
//   reference,
//   isLoading = false,
//   onRefresh,
//   scrollSpeed = 50,
//   pauseOnPress = true,
//   className = '',
// }) => {
//   const [isPaused, setIsPaused] = useState<boolean>(false);
//   const [textWidth, setTextWidth] = useState<number>(0);
//   const scrollX = useRef(new Animated.Value(screenWidth)).current;
//   const animationRef = useRef<Animated.CompositeAnimation | null>(null);

//   useEffect(() => {
//     if (!isLoading && textWidth > 0 && !isPaused) {
//       startScrolling();
//     }

//     return () => {
//       if (animationRef.current) {
//         animationRef.current.stop();
//       }
//     };
//   }, [textWidth, isLoading, isPaused, verse, reference]);

//   const startScrolling = (): void => {
//     scrollX.setValue(screenWidth);

//     const totalDistance = screenWidth + textWidth;
//     const duration = (totalDistance / scrollSpeed) * 1000;

//     animationRef.current = Animated.timing(scrollX, {
//       toValue: -textWidth,
//       duration,
//       useNativeDriver: true,
//     });

//     animationRef.current.start(({ finished }) => {
//       if (finished && !isPaused) {
//         startScrolling();
//       }
//     });
//   };

//   const handlePress = (): void => {
//     if (pauseOnPress) {
//       setIsPaused(!isPaused);

//       if (!isPaused) {
//         animationRef.current?.stop();
//       } else {
//         startScrolling();
//       }
//     }
//   };

//   const onTextLayout = (event: any): void => {
//     const { width } = event.nativeEvent.layout;
//     setTextWidth(width);
//   };

//   if (isLoading) {
//     return (
//       <View
//         className='flex-row items-center py-1 px-2'>
//         <ActivityIndicator size='small' color='#0084ff' />
//         <Text className='text-sm'>
//           Loading today's verse...
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <View
//       className={`flex-row items-center bg-slate-800 py-1 px-2 ${className}`}>
//       <TouchableOpacity
//         className='flex-1'
//         onPress={handlePress}
//         activeOpacity={0.8}>
//         <View className='h-8 overflow-hidden'>
//           <Animated.View
//             className='absolute top-0 h-full justify-center'
//             style={{ transform: [{ translateX: scrollX }] }}>
//             <Text
//               className='text-base text-blue-500'
//               onLayout={onTextLayout}
//               numberOfLines={1}>
//               <Text className='font-normal'>{verse}</Text>
//               <Text className='font-semibold italic'> - {reference}</Text>
//             </Text>
//           </Animated.View>
//         </View>
//       </TouchableOpacity>

//       {onRefresh && (
//         <TouchableOpacity className='p-2 ml-2' onPress={onRefresh}>
//           <Text className='text-blue-500 text-lg font-bold'>↻</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// // Simple hook without AsyncStorage
// const useSimpleDailyVerse = () => {
//   const [currentVerse, setCurrentVerse] = useState<DailyVerse | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   const verses: Omit<DailyVerse, 'date'>[] = [
//     {
//       verse:
//         'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
//       reference: 'John 3:16',
//     },
//     {
//       verse:
//         'Trust in the LORD with all your heart and lean not on your own understanding.',
//       reference: 'Proverbs 3:5',
//     },
//     {
//       verse: 'I can do all this through him who gives me strength.',
//       reference: 'Philippians 4:13',
//     },
//     {
//       verse: 'The LORD your God is with you, the Mighty Warrior who saves.',
//       reference: 'Zephaniah 3:17',
//     },
//     {
//       verse: 'Cast all your anxiety on him because he cares for you.',
//       reference: '1 Peter 5:7',
//     },
//   ];

//   const getTodaysVerse = (): void => {
//     setIsLoading(true);

//     // Use current day to select verse
//     const today = new Date();
//     const dayOfYear = Math.floor(
//       (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
//         (1000 * 60 * 60 * 24)
//     );
//     const selectedVerse = verses[dayOfYear % verses.length];

//     // Simulate loading delay
//     setTimeout(() => {
//       setCurrentVerse({
//         ...selectedVerse,
//         date: today.toISOString().split('T')[0],
//       });
//       setIsLoading(false);
//     }, 1000);
//   };

//   useEffect(() => {
//     getTodaysVerse();
//   }, []);

//   return {
//     verse: currentVerse,
//     isLoading,
//     refresh: getTodaysVerse,
//   };
// };

// // Simple display component
// const SimpleDailyVerseDisplay: React.FC<{ className?: string }> = ({
//   className = '',
// }) => {
//   const { verse, isLoading, refresh } = useSimpleDailyVerse();

//   return (
//     <SimpleDailyVerseScroll
//       verse={verse?.verse || ''}
//       reference={verse?.reference || ''}
//       isLoading={isLoading}
//       onRefresh={refresh}
//       className={`bg-slate-800 rounded-lg mx-4 my-2 ${className}`}
//     />
//   );
// };

// export { SimpleDailyVerseDisplay, SimpleDailyVerseScroll, useSimpleDailyVerse };
