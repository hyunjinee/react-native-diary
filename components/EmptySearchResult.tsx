import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const messages = {
  NOT_FOUND: '검색 결과가 없습니다.',
  EMPTY_KEYFOUND: '검색어를 입력하세요.',
};

interface EmptySearchResultProps {
  type: 'NOT_FOUND' | 'EMPTY_KEYFOUND';
}

function EmptySearchResult({type}: EmptySearchResultProps) {
  return (
    <View style={styles.block}>
      <Text style={styles.text}>{messages[type]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  text: {fontSize: 16, color: '#9e9e9e'},
});

export default EmptySearchResult;
