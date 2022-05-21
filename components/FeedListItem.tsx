import React from 'react';
import {Platform, Pressable, StyleSheet, Text} from 'react-native';
import {Log} from '../contexts/LogContext';
import {format, formatDistanceToNow} from 'date-fns';
import {ko} from 'date-fns/locale';

function truncate(text: string) {
  // 정규식을 사용해 모든 줄 바꿈 문자 제거
  const replaced = text.replace('/\n/g', ' ');

  if (replaced.length <= 100) {
    return replaced;
  }

  return replaced.slice(0, 100).concat('...');
}

function formatDate(date: string) {
  const d = new Date(date);
  const now = Date.now();
  const diff = (now - d.getTime()) / 1000;

  if (diff < 60 * 1) {
    return '방금전';
  }
  if (diff < 60 * 60 * 24 * 3) {
    return formatDistanceToNow(d, {addSuffix: true, locale: ko});
  }

  return format(d, 'PPP EEE p', {locale: ko});
}

interface FeedListItemProps {
  log: Log;
}

function FeedListItem({log}: FeedListItemProps) {
  const {title, body, date} = log;

  return (
    <Pressable
      style={({pressed}) => [
        styles.block,
        Platform.OS === 'ios' && pressed && {backgroundColor: '#efefef'},
      ]}
      android_ripple={{color: '#ededed'}}>
      <Text style={styles.date}>{formatDate(date)}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{truncate(body)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  date: {
    fontSize: 12,
    color: '#546e7a',
    marginBottom: 24,
  },
  title: {
    color: '#37474f',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  body: {
    color: '#37474f',
    fontSize: 16,
    lineHeight: 21,
  },
});

export default FeedListItem;
