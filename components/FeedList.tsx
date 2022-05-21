import React from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';

import {Log} from '../contexts/LogContext';
import FeedListItem from './FeedListItem';

interface FeedListProps {
  logs: Log[];
}

function FeedList({logs}: FeedListProps) {
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {contentSize, layoutMeasurement, contentOffset} = e.nativeEvent;
    console.log(contentSize, layoutMeasurement, contentOffset);
  };
  return (
    <FlatList
      data={logs}
      style={styles.block}
      renderItem={({item}) => <FeedListItem log={item} />}
      keyExtractor={log => log.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onScroll={onScroll}
    />
  );
}

const styles = StyleSheet.create({
  block: {flex: 1},
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
    widht: '100%',
  },
});

export default FeedList;
