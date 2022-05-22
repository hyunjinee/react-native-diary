import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet} from 'react-native';
import {RootStackNavigationProp} from '../screens/RootStack';
import TransparentCircleButton from './TransparentCircleButton';

interface WriteHeaderProps {
  onSave: () => void;
  onAskRemove: () => void;
  isEditing: boolean;
}

function WriteHeader({onSave, onAskRemove, isEditing}: WriteHeaderProps) {
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
        {isEditing && (
          <TransparentCircleButton
            name="delete-forever"
            color="#ef5350"
            hasMarginRight
            onPress={onAskRemove}
          />
        )}
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
