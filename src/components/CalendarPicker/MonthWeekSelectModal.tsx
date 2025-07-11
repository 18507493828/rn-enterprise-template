import ActionSheet from 'react-native-actions-sheet';
import React, { useState, useImperativeHandle, useRef, forwardRef } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import {
    COLORS,
    COMMON_STYLES,
    DEFAULT_BOTTOM_SPACE,
    DEFAULT_CONTAINER_SPACE,
    FONT_SIZES,
} from '@common/CommonStyle';
import { TextInner, Button, CalendarPicker } from '@components/index';
import { scaleSize, SCREEN_WIDTH } from '@utils/ScreenUtil';
import { useDatePickerOptions } from '@components/CalendarPicker/useDatePickerOptions';
import { useTranslation } from 'react-i18next';

interface Props {
    startDate?: string;
    endDate?: string;
    confirm?: (param: Record<string, any>) => void; //确定
    showWeek?: boolean;
}

const MonthWeekSelectModal = (
    { confirm, showWeek = false, startDate, endDate }: Props,
    ref: any,
) => {
    const { t } = useTranslation();
    const customSelectOtherRef = useRef<any>();
    const actionSheetRef = useRef<any>();
    const [startTime, setStartTime] = useState(startDate);

    const {
        years,
        yearsByWeeks,
        selectedWeekYear,
        setSelectedWeekYear,
        selectedYear,
        setSelectedYear,
        months,
        selectedMonth,
        setSelectedMonth,
        weeks,
        selectedWeek,
        setSelectedWeek,
    } = useDatePickerOptions();

    useImperativeHandle(ref, () => ({
        showVisible: (firstTime: string, secondTime: string) => {
            setStartTime(firstTime);
            showWeek ? setSelectedWeek(secondTime) : setSelectedMonth(secondTime);
            actionSheetRef?.current.show();
        },
    }));

    const ButtonBottom = () => (
        <View style={[COMMON_STYLES.center]}>
            <Button
                style={styles.buttonBottom}
                title={t('confirm')}
                onPress={() => {
                    const json = {
                        startTime,
                        endTime: showWeek ? selectedWeek : selectedMonth,
                    };
                    if (!startTime) {
                        return Alert.alert(t('date_select_year_alert'));
                    }
                    if (showWeek && !selectedWeek) {
                        return Alert.alert(t('date_select_week_alert'));
                    }
                    if (!showWeek && !selectedMonth) {
                        return Alert.alert(t('date_select_month_alert'));
                    }
                    confirm && confirm(json);
                    actionSheetRef?.current.hide();
                }}
            />
        </View>
    );

    return (
        <ActionSheet ref={actionSheetRef} gestureEnabled={false}>
            <View style={styles.container}>
                <View style={COMMON_STYLES.center}>
                    <TextInner style={styles.textColor}>
                        {showWeek ? t('select_week') : t('select_month')}
                    </TextInner>
                </View>
            </View>

            <View style={styles.dateContent}>
                <CalendarPicker
                    initialize={startDate}
                    data={showWeek ? yearsByWeeks : years}
                    onChange={time => {
                        setStartTime(time);
                        showWeek ? setSelectedWeekYear(time) : setSelectedYear(time);
                    }}
                />
                <CalendarPicker
                    ref={customSelectOtherRef}
                    initialize={endDate}
                    data={showWeek ? weeks : months}
                    onChange={time => {
                        showWeek ? setSelectedWeek(time) : setSelectedMonth(time);
                    }}
                />
            </View>
            {ButtonBottom()}
        </ActionSheet>
    );
};

const styles = StyleSheet.create({
    textColor: {
        marginBottom: scaleSize(10),
        fontWeight: '600',
        color: COLORS.black,
        fontSize: FONT_SIZES.small,
    },
    container: {
        paddingVertical: scaleSize(10),
        paddingHorizontal: DEFAULT_CONTAINER_SPACE,
    },
    buttonBottom: {
        width: SCREEN_WIDTH - DEFAULT_CONTAINER_SPACE * 2,
        bottom: DEFAULT_BOTTOM_SPACE,
    },
    buttonBtm: {
        width: '35%',
        bottom: scaleSize(10),
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.lineColor,
    },
    dateContent: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 6,
    },
});

export default forwardRef(MonthWeekSelectModal);
