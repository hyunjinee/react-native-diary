import React, {useContext, useState} from 'react';
import {StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import WriteHeader from '../components/WriteHeader';
import WriteEditor from '../components/WriteEditor';
import {useLog} from '../contexts/LogContext';
import {RootStackNavigationProp} from './RootStack';

function WriteScreen() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const {onCreate} = useLog();

  const navigation = useNavigation<RootStackNavigationProp>();

  const onSave = () => {
    onCreate({title, body, date: new Date().toISOString()});
    navigation.pop();
  };

  return (
    <SafeAreaView style={styles.block}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <WriteHeader onSave={onSave} />
        <WriteEditor
          title={title}
          body={body}
          onChangeTitle={setTitle}
          onChangeBody={setBody}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoidingView: {
    flex: 1,
  },
});
export default WriteScreen;
