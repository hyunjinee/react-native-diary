import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Pressable, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RootStackNavigationProp} from '../screens/RootStack';

function WriteHeader() {
  const naviagtion = useNavigation<RootStackNavigationProp>();

  const onGoBack = () => {
    naviagtion.pop();
  };

  return (
    <View style={styles.block}>
      <View style={styles.iconButtonWrapper}>
        <Pressable
          style={styles.iconButton}
          onPress={onGoBack}
          android_ripple={{color: '#ededed'}}>
          <Icon name="arrow-back" size={24} color="#424242" />
        </Pressable>
      </View>
      <View style={styles.buttons}>
        <View style={[styles.iconButtonWrapper, styles.marginRight]}>
          <Pressable
            style={styles.iconButton}
            android_ripple={{color: '#ededed'}}>
            <Icon name="delete-forever" size={24} color="#ef5350" />
          </Pressable>
        </View>
        <View style={styles.iconButtonWrapper}>
          <Pressable
            style={styles.iconButton}
            android_ripple={{color: '#ededed'}}>
            <Icon name="check" size={24} color="#009688" />
          </Pressable>
        </View>
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
  iconButtonWrapper: {
    width: 32,
    height: 32,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginRight: {
    marginRight: 8,
  },
});

export default WriteHeader;
