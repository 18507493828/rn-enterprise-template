import CalendarPicker from '@components/CalendarPicker';
import dayjs from '@utils/dayjs';
import { useRef } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import React from 'react';
import { useDatePickerOptions } from '@components/CalendarPicker/useDatePickerOptions';
import { scaleSize } from '@utils/ScreenUtil';

type DateType = 'start' | 'end';
type YearMonthDayProps = {
    show: boolean;
    type: DateType;
    yeaStr?: string;
    monthStr?: string;
    dayStr?: string;
    onChangeDate: (date: string, type: DateType) => void;
};
const { width } = Dimensions.get('window');

const YearMonthDay = ({
    yeaStr,
    monthStr,
    dayStr,
    show,
    type,
    onChangeDate,
}: YearMonthDayProps) => {
    const {
        years,
        selectedYear,
        setSelectedYear,
        months,
        selectedMonth,
        setSelectedMonth,
        days,
        selectedDay,
        setSelectedDay,
    } = useDatePickerOptions();

    const selectDate = useRef({
        year: yeaStr || new Date().getFullYear(),
        month: monthStr || (new Date().getMonth() + 1).toString().padStart(2, '0'),
        day: dayStr || dayjs().date().toString().padStart(2, '0'),
    });

    const changeDate = (time: string | number, dateType: 'year' | 'month' | 'day') => {
        let date = '';
        switch (dateType) {
            case 'year':
                date = time + '-' + selectDate.current.month + '-' + selectDate.current.day;
                break;
            case 'month':
                date = selectDate.current.year + '-' + time + '-' + selectDate.current.day;
                break;
            case 'day':
                date = selectDate.current.year + '-' + selectDate.current.month + '-' + time;
                break;
        }
        onChangeDate(date, type);
    };

    return show ? (
        <View style={styles.container}>
            <CalendarPicker
                initialize={selectDate.current.year}
                data={years}
                onChange={time => {
                    changeDate(time, 'year');
                    selectDate.current.year = time;
                    setSelectedYear(time);
                }}
            />

            <CalendarPicker
                isVisible={Boolean(months.length)}
                initialize={monthStr}
                data={months}
                onChange={time => {
                    changeDate(time, 'month');
                    selectDate.current.month = time;
                    setSelectedMonth(time);
                }}
            />

            <CalendarPicker
                isVisible={Boolean(days.length)}
                initialize={dayStr}
                data={days}
                onChange={time => {
                    changeDate(time, 'day');
                    selectDate.current.day = time;
                    setSelectedDay(time);
                }}
            />
        </View>
    ) : null;
};

const styles = StyleSheet.create({
    container: {
        width,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: scaleSize(6),
    },
});

export default YearMonthDay;
