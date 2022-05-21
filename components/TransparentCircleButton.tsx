import React from 'react';
import {View, StyleSheet, Text, Pressable, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface TransparentCircleButtonProps {
  name: string;
  color: string;
  hasMarginRight?: boolean;
  onPress?: () => void;
}

function TransparentCircleButton({
  name,
  color,
  hasMarginRight,
  onPress,
}: TransparentCircleButtonProps) {
  return (
    <View
      style={[styles.iconButtonWrapper, hasMarginRight && styles.rightMargin]}>
      <Pressable
        onPress={onPress}
        android_ripple={{color: '#ededed'}}
        style={({pressed}) => [
          styles.iconButton,
          Platform.OS === 'ios' &&
            pressed && {
              backgroundColor: '#efefef',
            },
        ]}>
        <Icon name={name} size={24} color={color} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  iconButtonWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  rightMargin: {
    marginRight: 8,
  },
});

export default TransparentCircleButton;
