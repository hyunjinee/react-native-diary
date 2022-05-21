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
  onScrolledToBottom?: (isBottom: boolean) => void;
}

function FeedList({logs, onScrolledToBottom}: FeedListProps) {
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!onScrolledToBottom) {
      return;
    }

    const {contentSize, layoutMeasurement, contentOffset} = e.nativeEvent;
    // console.log(contentSize, layoutMeasurement, contentOffset);
    const distanceFromBottom =
      contentSize.height - layoutMeasurement.height - contentOffset.y;

    if (
      distanceFromBottom < 72 &&
      contentSize.height > layoutMeasurement.height // 아이폰에서 컨텐츠가 적은데도 스크롤 할 수 있을 때 버튼 숨기는거 방지
    ) {
      // console.log('바닥가 가깝다.');
      onScrolledToBottom(true);
    } else {
      onScrolledToBottom(false);
      // console.log('바닥과 멀다');
    }
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
