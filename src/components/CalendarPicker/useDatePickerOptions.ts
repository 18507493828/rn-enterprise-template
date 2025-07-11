import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek'; // ISO 8601: 一周从周一开始
dayjs.extend(isoWeek);

/**
 * 获得日期配置
 * @param maxYearSpan 最大跨度年份长度
 * @returns
 */
export function getDateOptions(maxYearSpan = 1) {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDate = today.getDate();

    const startYear = currentYear - maxYearSpan;
    const totalYears = maxYearSpan + 1;

    const years = Array.from({ length: totalYears }, (_, i) => startYear + i);

    const getYear = () => {
        return currentMonth == 12 && dayjs().isoWeek() == 1 ? dayjs().year() + 1 : dayjs().year();
    };

    const yearsByWeeks = [getYear() - 1, getYear()];

    const padZero = (num: number): string => num.toString().padStart(2, '0');

    const getMonthsByYear = (year: number): string[] => {
        let months: number[];
        if (year === startYear) {
            months = Array.from({ length: 12 - currentMonth + 1 }, (_, i) => currentMonth + i);
        } else if (year === currentYear) {
            months = Array.from({ length: currentMonth }, (_, i) => i + 1);
        } else {
            months = Array.from({ length: 12 }, (_, i) => i + 1);
        }
        return months.map(padZero);
    };

    const getDaysByYearMonth = (year: number, month: number): string[] => {
        const isToday = year === currentYear && month === currentMonth;
        const daysInMonth = new Date(year, month, 0).getDate();
        const maxDay = isToday ? currentDate : daysInMonth;

        return Array.from({ length: maxDay }, (_, i) => padZero(i + 1));
    };

    const getWeeksByYear = (year: number): string[] => {
        const today = dayjs();
        const currentYear = getYear();

        const otherYearsWithWeeks = dayjs(`${year}-12-28`).isoWeek() == 1 ? 53 : 52; //dayjs 获取根据时间周为1时，表示为下一年的第一周了
        const endWeek = year === currentYear ? today.isoWeek() : otherYearsWithWeeks;

        const weeks: string[] = [];

        for (let i = 1; i <= endWeek; i++) {
            weeks.push(i.toString());
        }

        return weeks;
    };

    return {
        years,
        yearsByWeeks,
        getMonthsByYear,
        getDaysByYearMonth,
        getWeeksByYear,
    };
}

/**
 * 获得联动 年/月（周）/日
 * @returns
 */
export function useDatePickerOptions() {
    const dateOptions = getDateOptions();
    const [selectedYear, setSelectedYear] = useState(dateOptions.years.at(-1)!); // 默认选最新年
    const [selectedYearByWeek, setSelectedYearByWeek] = useState(dateOptions.yearsByWeeks.at(-1)!); // 默认选最新年
    const currentMonth = `${(dayjs().month() + 1).toString().padStart(2, '0')}`;
    const currentWeek = dayjs().isoWeek();

    const [months, setMonths] = useState<string[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);

    const [days, setDays] = useState<string[]>([]);
    const [selectedDay, setSelectedDay] = useState<string>('');

    const [weeks, setWeeks] = useState<string[]>([]);
    const [selectedWeek, setSelectedWeek] = useState<string>(`${currentWeek}`);

    // 年份变化 → 更新月份和周数
    useEffect(() => {
        // 月份联动
        const newMonths = dateOptions.getMonthsByYear(selectedYear);
        setMonths(newMonths);
        setSelectedMonth(prev => (newMonths.includes(prev) ? prev : newMonths[0]));

        // 周联动
        const newWeeks = dateOptions.getWeeksByYear(selectedYearByWeek);
        setWeeks(newWeeks);
        setSelectedWeek(prev => (newWeeks.includes(prev) ? prev : newWeeks[0]));
    }, [selectedYear, selectedYearByWeek]);

    // 月份变化 → 更新天数
    useEffect(() => {
        if (selectedMonth) {
            const monthNum = parseInt(selectedMonth, 10);
            const newDays = dateOptions.getDaysByYearMonth(selectedYear, monthNum);
            setDays(newDays);
            setSelectedDay(prev => (newDays.includes(prev) ? prev : newDays[0]));
        }
    }, [selectedYear, selectedMonth]);

    return {
        years: dateOptions.years.map(String),
        yearsByWeeks: dateOptions.yearsByWeeks.map(String),
        selectedYear: String(selectedYear),
        selectedWeekYear: String(selectedYearByWeek),
        setSelectedYear: (y: string) => setSelectedYear(parseInt(y, 10)),
        setSelectedWeekYear: (y: string) => setSelectedYearByWeek(parseInt(y, 10)),

        months,
        selectedMonth,
        setSelectedMonth,

        days,
        selectedDay,
        setSelectedDay,

        weeks,
        selectedWeek,
        setSelectedWeek,
    };
}
