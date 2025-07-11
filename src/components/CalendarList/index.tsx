
import dayjs from 'dayjs';
import React, { memo, useState } from 'react';
import { Calendar, DateData } from 'react-native-calendars';

const RANGE = 24;

interface Props {
  initialDate?: string;
  display: 'none' | 'flex';
  close?: () => void;
  startDay?: string;
  endDay?: string;
  changeDate: (day: string | undefined, type: 'start' | 'end') => void
}

const CalendarListScreen = ({ initialDate = dayjs().format('YYYY-MM-DD'), display, startDay, endDay, changeDate }: Props) => {
  const [markedDates, setMarkedDates] = useState({});

  const onDayPress = (day: DateData) => {
    if (startDay && !endDay) {
      const date: any = {}
      for (let d = dayjs(startDay); d <= dayjs(day.dateString); d = d.add(1, 'day')) {
        const newDay = dayjs(d).format('YYYY-MM-DD').toString();
        date[newDay] = {
          marked: true,
          color: '#4E6CFF',
          textColor: 'white'
        };
        if (newDay === startDay) date[newDay].startingDay = true;
        if (newDay === day.dateString) date[newDay].endingDay = true;
      }

      setMarkedDates(date);
      changeDate(day.dateString, 'end');
      return;
    }

    changeDate(day.dateString, 'start');
    changeDate(undefined, 'end');
    setMarkedDates({
      [day.dateString]: {
        marked: true,
        color: '#4E6CFF',
        textColor: 'white',
        startingDay: true,
        endingDay: true
      }
    })
  }

  const minDate = (startDay && !endDay) ? startDay : '2023-01-01';

  return (
    <Calendar
      style={{ display }}
      headerStyle={{ display }}
      testID='calendarList'
      current={initialDate}
      pastScrollRange={RANGE}
      futureScrollRange={RANGE}
      onDayPress={onDayPress}
      markedDates={markedDates}
      scrollEnabled={true}
      markingType='period'
      theme={theme}
      horizontal={true}
      pagingEnabled={true}
      staticHeader={true}
      minDate={minDate}
      maxDate={new Date().toString()}
    />
  );
};

const theme = {
  stylesheet: {
    calendar: {
      header: {
        dayHeader: {
          fontWeight: '600',
          color: '#48BFE3'
        }
      }
    }
  },
  'stylesheet.day.basic': {
    today: {
      borderColor: '#48BFE3',
      borderWidth: 0.8
    },
    todayText: {
      color: '#5390D9',
      fontWeight: '800'
    }
  }
};

export default memo(CalendarListScreen);
