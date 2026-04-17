import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { theme } from '@/constants/theme';

const iconColor = theme.colors.textMuted;
const activeColor = theme.colors.textPrimary;

export default function TabLayout() {
  return (
      <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        sceneStyle: { backgroundColor: theme.colors.background },
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabItem,
        tabBarIconStyle: styles.tabIcon,
        tabBarBackground: () => (
          <View style={StyleSheet.absoluteFillObject}>
            <BlurView intensity={30} tint="dark" style={styles.blurFill} />
            <View style={styles.glassTint} />
          </View>
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={focused ? activeColor : iconColor} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              <Ionicons name={focused ? 'search' : 'search-outline'} size={24} color={focused ? activeColor : iconColor} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              <MaterialCommunityIcons name="infinity" size={26} color={focused ? activeColor : iconColor} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              <Ionicons name={focused ? 'people' : 'people-outline'} size={24} color={focused ? activeColor : iconColor} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              <View style={[styles.profileIcon, focused && styles.profileIconActive]}>
                <FontAwesome6 name="infinity" size={14} color="#11162E" />
              </View>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 42,
    height: 62,
    paddingHorizontal: 8,
    paddingTop: 0,
    paddingBottom: 0,
    borderTopWidth: 0,
    borderWidth: 1,
    borderColor: 'rgba(180, 185, 205, 0.2)',
    borderRadius: 31,
    backgroundColor: 'rgba(8, 10, 18, 0.08)',
    overflow: 'hidden',
  },
  blurFill: {
    ...StyleSheet.absoluteFillObject,
  },
  glassTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(12, 14, 22, 0.2)',
  },
  tabItem: {
    margin: 0,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    marginTop: 5,
    marginBottom: -1,
  },
  iconWrap: {
    width: 46,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  iconWrapActive: {
    backgroundColor: 'rgba(210, 214, 229, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(216, 220, 238, 0.22)',
  },
  profileIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F38A4B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIconActive: {
    borderWidth: 1,
    borderColor: 'rgba(218, 223, 241, 0.22)',
    backgroundColor: '#F59359',
  },
});
