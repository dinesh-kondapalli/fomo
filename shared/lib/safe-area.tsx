import type { ComponentProps } from 'react';
import { Platform, View } from 'react-native';
import {
  SafeAreaView as NativeSafeAreaView,
  useSafeAreaInsets as useNativeSafeAreaInsets,
} from 'react-native-safe-area-context';

const zeroInsets = { top: 0, right: 0, bottom: 0, left: 0 };

type SafeAreaViewProps = ComponentProps<typeof NativeSafeAreaView>;

export function SafeAreaView(props: SafeAreaViewProps) {
  if (Platform.OS === 'web') {
    const { edges: _edges, ...rest } = props;
    return <View {...rest} />;
  }

  return <NativeSafeAreaView {...props} />;
}

export function useSafeAreaInsets() {
  if (Platform.OS === 'web') {
    return zeroInsets;
  }

  return useNativeSafeAreaInsets();
}
