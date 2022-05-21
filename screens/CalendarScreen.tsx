import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Text, Animated, Button} from 'react-native';
import {useLog} from '../contexts/LogContext';

// function FadeInAndOut() {
//   const animation = useRef(new Animated.Value(1)).current;
//   const [hidden, setHidden] = useState(false);
//   useEffect(() => {
//     Animated.timing(animation, {
//       toValue: hidden ? 0 : 1,
//       useNativeDriver: true,
//     }).start();
//   }, [hidden, animation]);

//   return (
//     <View>
//       <Animated.View
//         style={[
//           styles.rectangle,
//           {
//             opacity: animation,
//           },
//         ]}
//       />
//       <Button title="Toggle" onPress={() => setHidden(!hidden)} />
//       {/* <Button
//         title="FadeIn"
//         onPress={() => {
//           Animated.timing(animation, {
//             toValue: 1,
//             useNativeDriver: true,
//           }).start();
//         }}
//       />
//       <Button
//         title="FadeOut"
//         onPress={() => {
//           Animated.timing(animation, {
//             toValue: 0,
//             useNativeDriver: true,
//           }).start();
//         }}
//       /> */}
//     </View>
//   );
// }

function SlideLeftAndRight() {
  const animation = useRef(new Animated.Value(0)).current;
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: enabled ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [enabled, animation]);

  return (
    <View>
      <Animated.View
        style={[
          styles.rectangle,
          {
            transform: [
              {
                translateX: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 150],
                }),
              },
            ],
            opacity: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
        ]}
      />
      <Button
        title="Toggle"
        onPress={() => {
          setEnabled(!enabled);
        }}
      />
    </View>
  );
}

function CalendarScreen() {
  const {logs} = useLog();
  return (
    <View style={styles.block}>
      <SlideLeftAndRight />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {},
  text: {
    padding: 16,
    fontSize: 24,
  },
  rectangle: {width: 100, height: 100, backgroundColor: 'black'},
});

export default CalendarScreen;
