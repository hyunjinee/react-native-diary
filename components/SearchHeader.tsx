import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function SearchHeader() {
  const {width} = useWindowDimensions();

  return (
    <View style={[styles.block, {width: width - 32}]}>
      <TextInput
        placeholder="검색어를 입력하세요"
        autoFocus
        style={styles.input}
      />
      <Pressable
        style={({pressed}) => [styles.button, pressed && {opacity: 0.5}]}>
        <Icon name="cancel" size={20} color="#9e9e9e" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    color: 'black',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
  button: {
    marginLeft: 8,
  },
});

export default SearchHeader;
