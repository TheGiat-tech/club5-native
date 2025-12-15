import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import HomeScreenImpl from '@/figma/screens/HomeScreen';
import { getRandomQuote } from '../data/inspirationQuotes';

export default function HomeScreen() {
  const [quote] = useState(() => getRandomQuote());
  const isFocused = useIsFocused();
  const progress = useSharedValue(isFocused ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(isFocused ? 1 : 0, {
      duration: 220,
      easing: Easing.out(Easing.cubic),
    });
  }, [isFocused, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      {
        translateX: (1 - progress.value) * 12,
      },
    ],
  }));

  return (
    <Animated.View style={[{ flex: 1 }, animatedStyle]}>
      <HomeScreenImpl quote={quote} />
    </Animated.View>
  );
}
