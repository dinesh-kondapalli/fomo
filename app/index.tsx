import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fonts } from '@/constants/theme';

export default function SplashScreen() {
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.88)).current;
  const rise = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 680,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 680,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(rise, {
        toValue: 0,
        duration: 680,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [fade, rise, scale]);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safe}>
        <View style={styles.spacer} />
        <Animated.View style={[styles.logoWrap, { opacity: fade, transform: [{ translateY: rise }, { scale }] }]}>
          <Text style={styles.symbol}>∞</Text>
        </Animated.View>
        <View style={styles.bottomArea}>
          <Text style={styles.brand}>fomo</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#06052A',
  },
  safe: {
    flex: 1,
  },
  spacer: {
    flex: 1,
  },
  logoWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbol: {
    color: '#CAD0E6',
    fontSize: 180,
    lineHeight: 186,
    fontFamily: fonts.headingSemi,
    letterSpacing: -5,
  },
  bottomArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  brand: {
    color: '#9DA6D4',
    fontSize: 14,
    fontFamily: fonts.body,
    letterSpacing: 2,
    textTransform: 'uppercase',
    opacity: 0.35,
  },
});
