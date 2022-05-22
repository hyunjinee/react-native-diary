import React, {useContext, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StyleSheet, KeyboardAvoidingView, Platform, Alert} from 'react-native';

import {useLog} from '../contexts/LogContext';
import WriteHeader from '../components/WriteHeader';
import WriteEditor from '../components/WriteEditor';
import {RootStackNavigationProp, WriteScreenRouteProp} from './RootStack';

function WriteScreen() {
  const {params} = useRoute<WriteScreenRouteProp>();

  const log = params?.log;

  const [title, setTitle] = useState(log?.title ?? '');
  const [body, setBody] = useState(log?.body ?? '');
  const {onCreate, onModify, onRemove} = useLog();

  const navigation = useNavigation<RootStackNavigationProp>();

  const onSave = () => {
    if (log) {
      onModify({
        id: log.id,
        date: log.date,
        title,
        body,
      });
    } else {
      onCreate({title, body, date: new Date().toISOString()});
    }
    navigation.pop();
  };

  const onAskRemove = () => {
    if (!log?.id) {
      return;
    }

    Alert.alert(
      '삭제',
      '정말로 삭제하시겠어요?',
      [
        {text: '취소', style: 'cancel'},
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => {
            onRemove(log?.id);
            navigation.pop();
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <SafeAreaView style={styles.block}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <WriteHeader
          onSave={onSave}
          onAskRemove={onAskRemove}
          isEditing={!!log}
        />
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
