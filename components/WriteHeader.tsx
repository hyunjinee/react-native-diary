import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Pressable, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RootStackNavigationProp} from '../screens/RootStack';
import TransparentCircleButton from './TransparentCircleButton';

interface WriteHeaderProps {
  onSave: () => void;
}

function WriteHeader({onSave}: WriteHeaderProps) {
  const naviagtion = useNavigation<RootStackNavigationProp>();

  const onGoBack = () => {
    naviagtion.pop();
  };

  return (
    <View style={styles.block}>
      <TransparentCircleButton
        onPress={onGoBack}
        name="arrow-back"
        color="#424242"
      />

      <View style={styles.buttons}>
        <TransparentCircleButton
          name="delete-forever"
          color="#ef5350"
          hasMarginRight
        />
        <TransparentCircleButton
          name="check"
          color="#009688"
          onPress={onSave}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    // backgroundColor: 'red',
    height: 48,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default WriteHeader;
