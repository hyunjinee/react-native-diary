import React, {RefObject, useRef} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

interface WriteEditorProps {
  title: string;
  body: string;
  onChangeTitle: (title: string) => void;
  onChangeBody: (body: string) => void;
}

function WriteEditor({
  title,
  body,
  onChangeTitle,
  onChangeBody,
}: WriteEditorProps) {
  const bodyRef = useRef<TextInput | null>(null);

  return (
    <View style={styles.block}>
      <TextInput
        placeholder="제목을 입력하세요"
        onChangeText={onChangeTitle}
        value={title}
        returnKeyType="next"
        style={styles.titleInput}
        onSubmitEditing={() => {
          bodyRef.current?.focus();
        }}
      />
      <TextInput
        placeholder="당신의 오늘을 기록해보세요."
        style={styles.bodyInput}
        multiline
        onChangeText={onChangeBody}
        value={body}
        textAlignVertical="top"
        ref={bodyRef}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    padding: 16,
  },
  titleInput: {
    paddingVertical: 0,
    fontSize: 18,
    marginBottom: 16,
    color: '#263238',
    fontWeight: 'bold',
  },
  bodyInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    color: '#263238',
  },
});

export default WriteEditor;
