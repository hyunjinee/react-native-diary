import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import FeedList from '../components/FeedList';
import FloatingWriteButton from '../components/FloatingWriteButton';

import {useLog} from '../contexts/LogContext';

function FeedsScreen() {
  const {logs} = useLog();
  // console.log(JSON.stringify(logs));

  return (
    <View style={styles.block}>
      <FeedList logs={logs} />
      <FloatingWriteButton />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  input: {
    padding: 16,
    backgroundColor: 'white',
  },
});

export default FeedsScreen;
