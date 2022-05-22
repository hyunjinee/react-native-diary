import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import FeedList from '../components/FeedList';
import {useLog} from '../contexts/LogContext';

import {useSearch} from '../contexts/SearchContext';

function SearchScreen() {
  const {keyword} = useSearch();
  const {logs} = useLog();

  const filtered =
    keyword === ''
      ? []
      : logs.filter(log =>
          [log.title, log.body].some(text => text.includes(keyword)),
        );

  return (
    <View style={styles.block}>
      <FeedList logs={filtered} />
    </View>
  );
}
const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});
export default SearchScreen;
