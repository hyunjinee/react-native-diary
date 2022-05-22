import React, {useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {format} from 'date-fns';

import CalendarView from '../components/CalendarView';
import {useLog} from '../contexts/LogContext';
import FeedList from '../components/FeedList';

function CalendarScreen() {
  const {logs} = useLog();
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  );

  const markedDates = useMemo(
    () =>
      logs.reduce((acc, current) => {
        const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
        acc[formattedDate] = {marked: true};
        return acc;
      }, {} as {[key: string]: {marked: boolean}}),
    [logs],
  );

  const filteredLogs = logs.filter(
    log => format(new Date(log.date), 'yyyy-MM-dd') === selectedDate,
  );

  return (
    <FeedList
      logs={filteredLogs}
      ListHeaderComponent={
        <CalendarView
          markedDates={markedDates}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      }
    />
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

// function SlideLeftAndRight() {
//   const animation = useRef(new Animated.Value(0)).current;
//   const [enabled, setEnabled] = useState(false);

//   useEffect(() => {
//     Animated.timing(animation, {
//       toValue: enabled ? 1 : 0,
//       useNativeDriver: true,
//     }).start();
//   }, [enabled, animation]);

//   return (
//     <View>
//       <Animated.View
//         style={[
//           styles.rectangle,
//           {
//             transform: [
//               {
//                 translateX: animation.interpolate({
//                   inputRange: [0, 1],
//                   outputRange: [0, 150],
//                 }),
//               },
//             ],
//             opacity: animation.interpolate({
//               inputRange: [0, 1],
//               outputRange: [1, 0],
//             }),
//           },
//         ]}
//       />
//       <Button
//         title="Toggle"
//         onPress={() => {
//           setEnabled(!enabled);
//         }}
//       />
//     </View>
//   );
// }
