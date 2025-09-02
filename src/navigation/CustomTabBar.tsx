import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Platform} from 'react-native';
import {LocalSvg} from 'react-native-svg';
import {View as UiLibView} from 'react-native-ui-lib';
import {TabsHomeRoutes} from '@/types/tabRoutes';

import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {colorsLight} from '@/theme/colorsLight';
import {useSelector} from 'react-redux';
import {selectTabBar} from '@/slices/tabBarSlice';
import {
  ExploreTabBarIcon,
  LogoHeartIcon,
  MessagesTabBarIcon,
  UserCircleIcon,
} from '@/assets/svg';

export function CustomTabBar({
  state,
  descriptors,
  navigation,
}: {
  state: any;
  descriptors: any;
  navigation: any;
}) {
  const {show} = useSelector(selectTabBar);
  const translateY = useSharedValue(show ? 100 : 0);

  translateY.value = withTiming(show ? 100 : 0, {
    duration: 320,
    easing: Easing.out(Easing.ease),
  });

  const getIcon = (key: string) => {
    switch (key) {
      case TabsHomeRoutes.MATCH:
        return <LogoHeartIcon width={24} height={24} />;
      case TabsHomeRoutes.EXPLORER:
        return <ExploreTabBarIcon />;
      case TabsHomeRoutes.MESSAGES:
        return <MessagesTabBarIcon />;
      case TabsHomeRoutes.PROFILE:
        return <UserCircleIcon />;
      default:
        return <UserCircleIcon />;
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.item}
            key={index}>
            {getIcon(route?.name)}
            {isFocused ? (
              <LocalSvg asset={require('../assets/svg/dot.svg')} />
            ) : (
              <UiLibView height={6} />
            )}
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: colorsLight.WHITE,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 32 : 16,
    elevation: 3,
    borderRadius: 34,
    shadowColor: '#00000',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    flexDirection: 'row',
    height: 68,
    width: '95%',
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
