import React, {useState, useReducer} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {RootStackNavigationProp} from '../screens/RootStack';
import TransparentCircleButton from './TransparentCircleButton';

interface WriteHeaderProps {
  onSave: () => void;
  onAskRemove: () => void;
  isEditing: boolean;
  date: Date;
  onChangeDate: React.Dispatch<React.SetStateAction<Date>>;
}

const initialState = {mode: 'date', visible: false};

type State = {
  mode: 'date' | 'time';
  visible: boolean;
};

// type ModalAction =
//   | {type: 'open'; mode: 'date' | 'time'}
//   | {type: 'close'; payload?: Partial<State>};

function reducer(state: State, action: any) {
  switch (action.type) {
    case 'open':
      return {
        mode: action.mode,
        visible: true,
      };
    case 'close':
      return {
        ...state,
        visible: false,
      };
    default:
      throw new Error('Unhandled action type');
  }
}

function WriteHeader({
  onSave,
  onAskRemove,
  isEditing,
  date,
  onChangeDate,
}: WriteHeaderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const open = (mode: 'date' | 'time') => dispatch({type: 'open', mode});
  const close = () => dispatch({type: 'close'});
  const naviagtion = useNavigation<RootStackNavigationProp>();

  const onGoBack = () => {
    naviagtion.pop();
  };

  const onConfirm = (selectedDate: Date) => {
    close();
    onChangeDate(selectedDate);
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
      <View style={styles.center}>
        <Pressable onPress={() => open('date')}>
          <Text>{format(new Date(date), 'PPP', {locale: ko})}</Text>
        </Pressable>
        <View style={styles.separator} />
        <Pressable onPress={() => open('time')}>
          <Text>{format(new Date(date), 'p', {locale: ko})}</Text>
        </Pressable>
      </View>
      <DateTimePickerModal
        isVisible={state.visible}
        mode={state.mode}
        onConfirm={onConfirm}
        onCancel={close}
        date={date}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
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
  center: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
    flexDirection: 'row',
  },
  separator: {
    width: 8,
  },
});

export default WriteHeader;
