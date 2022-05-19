import React, {useContext} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

import {useLog} from '../contexts/LogContext';

function FeedsScreen() {
  const {text, setText} = useLog();

  return (
    <View>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="텍스트를 입력하세요."
      />
      {/* <LogContext.Consumer>{value => <Text>{value}</Text>}</LogContext.Consumer> */}
    </View>
  );
}

const styles = StyleSheet.create({});
export default FeedsScreen;
