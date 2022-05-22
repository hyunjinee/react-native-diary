import React from 'react';
import {Calendar} from 'react-native-calendars';
import {StyleSheet} from 'react-native';

interface CalendarViewProps {
  markedDates: {[key: string]: {marked: boolean}};
  selectedDate: string;
  onSelectDate: React.Dispatch<React.SetStateAction<string>>;
}

function CalendarView({
  markedDates,
  selectedDate,
  onSelectDate,
}: CalendarViewProps) {
  // const markedDates = {
  //   '2022-05-22': {
  //     selected: true,
  //   },
  //   '2022-05-23': {
  //     marked: true,
  //   },
  // };

  const markedSelectedDate = {
    ...markedDates,
    [selectedDate]: {
      selected: true,
      marked: markedDates[selectedDate]?.marked,
    },
  };

  return (
    <Calendar
      style={styles.calendar}
      markedDates={markedSelectedDate}
      onDayPress={day => {
        onSelectDate(day.dateString);
      }}
      theme={{
        selectedDayBackgroundColor: '#009688',
        arrowColor: '#009688',
        dotColor: '#009688',
        todayTextColor: '#009688',
      }}
    />
  );
}

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
});

export default CalendarView;
