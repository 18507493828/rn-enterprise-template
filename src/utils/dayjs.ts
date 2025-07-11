import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isBetween from 'dayjs/plugin/isBetween';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(relativeTime);
dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(weekOfYear);
dayjs.locale('en');

export const formatTimeDifference = (create: any): string => {
    const before = dayjs.tz(create, 'Asia/Shanghai').valueOf();
    const after = dayjs().valueOf();
    return dayjs(before).from(after);
};

//格式化时间
export const timeWithFomatterHHmmss = (date: any) => {
    return (date && dayjs(date).format('YYYY-MM-DD HH:mm:ss')) || '';
};

//格式化时间
export const timeWithFomatter = (date: any) => {
    return (date && dayjs(date).format('YYYY-MM-DD')) || '';
};

//时间字符串转日期
export const strFormatterWithDate = (str: string) => {
    return (str && dayjs(str).toDate()) || '';
};

//比较开始时间和结束时间大小
export const comPareTime = (
    startTime: string | number | Date | dayjs.Dayjs | null | undefined,
    endTime: string | number | Date | dayjs.Dayjs | null | undefined,
) => {
    return dayjs(startTime).isBefore(dayjs(endTime)) || startTime == endTime;
};

/** 从北京时间转到当前时区 */
export const changeTimeZone = (time: string) => {
    const bjDate = dayjs.tz(time || dayjs(), 'Asia/Shanghai').valueOf();
    return dayjs(bjDate).format('DD/MM/YYYY HH:mm:ss');
};

// 获取特定年份和月份的天数，并生成日期数组
export function getDaysInMonth(year: number, month: string) {
    const daysInMonth = dayjs(`${year}-${month}`).daysInMonth();
    const daysArray = [];

    for (let day = 1; day <= daysInMonth; day++) {
        daysArray.push(day);
    }

    return daysArray;
}

const countryTimezones = {
    'Africa/Lagos': 1,
    'Africa/Accra': 2,
    'Africa/Nairobi': 3,
};
export const countryByTimeZone = () => {
    try {
        const timeZone = dayjs.tz.guess();
        let country = countryTimezones['Africa/Lagos'];

        for (const [c, tz] of Object.entries(countryTimezones)) {
            if (c === timeZone) {
                country = tz;
                break;
            }
        }
        return country;
    } catch (error) {
        console.error('Error determining country by time zone:', error);
        return countryTimezones['Africa/Lagos'];
    }
};

export default dayjs;
