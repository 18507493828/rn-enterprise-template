import React, { useState, useImperativeHandle, useRef, useEffect, forwardRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
    BORDER_RADIUS,
    COLORS,
    COMMON_STYLES,
    DEFAULT_CONTAINER_SPACE,
    FONT_SIZES,
} from '@common/CommonStyle';
import TextInner from '@components/TextInner';
import { scaleSize } from '@utils/ScreenUtil';
import dayjs from 'dayjs';
import YearMonthDay from '@components/CalendarPicker/YearMonthDay';
import { useTranslation } from 'react-i18next';

interface Props {
    confirm: (arg0: string, arg1: number) => void;
    startDayStr: string;
    endDayStr: string;
}

const TimeSelectView = (
    { confirm, startDayStr = '', endDayStr = '' }: Props,
    ref: React.Ref<unknown> | undefined,
) => {
    const { t } = useTranslation();
    const [isClick, setIsClick] = useState(1); //1 开始时间 2结束时间
    const [startDay, setStartDay] = useState(startDayStr || '');
    const [endDay, setEndDay] = useState(endDayStr || '');

    const onChangeDate = (date: string, type: 'start' | 'end') => {
        confirm && confirm(date, isClick);
        type === 'start' ? setStartDay(date) : setEndDay(date);
    };

    useImperativeHandle(ref, () => ({
        Reset: () => {
            setStartDay('');
            setEndDay('');
            setIsClick(1);
        },
    }));

    const seleTime = isClick == 1 ? startDayStr : endDayStr;
    const month = dayjs(seleTime).format('MM');
    const day = dayjs(seleTime).format('DD');
    const year = dayjs(seleTime).format('YYYY');

    return (
        <View style={{ paddingHorizontal: DEFAULT_CONTAINER_SPACE }}>
            <TextInner style={styles.date}>{t('date')}</TextInner>
            <View style={[COMMON_STYLES.flexRow, styles.dateView]}>
                <View style={[COMMON_STYLES.flexBtwNoScale, { width: '100%' }]}>
                    <TouchableOpacity
                        style={[
                            styles.btnStyle,
                            {
                                borderColor: isClick == 1 ? COLORS.black : COLORS.lineColor,
                                borderWidth: 1,
                            },
                        ]}
                        onPress={() => {
                            setIsClick(1);
                        }}
                    >
                        <TextInner
                            style={{
                                fontSize: scaleSize(12),
                                color: startDay ? COLORS.black : COLORS.secondary,
                            }}
                        >
                            {startDay || t('date_select_startTime')}
                        </TextInner>
                    </TouchableOpacity>

                    <View style={styles.middleLine} />

                    <TouchableOpacity
                        style={[
                            styles.btnStyle,
                            {
                                borderColor: isClick == 2 ? COLORS.black : COLORS.lineColor,
                                borderWidth: 1,
                            },
                        ]}
                        onPress={() => {
                            setIsClick(2);
                        }}
                    >
                        <TextInner
                            style={{
                                fontSize: scaleSize(12),
                                color: endDay ? COLORS.black : COLORS.secondary,
                            }}
                        >
                            {endDay || t('date_select_end')}
                        </TextInner>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={COMMON_STYLES.center}>
                <YearMonthDay
                    yeaStr={seleTime ? year : ''}
                    monthStr={seleTime ? month : ''}
                    dayStr={seleTime ? day : ''}
                    type="start"
                    onChangeDate={(date, type) => {
                        onChangeDate(date, type);
                    }}
                    show={isClick == 1}
                />
                <YearMonthDay
                    type="end"
                    yeaStr={seleTime ? year : ''}
                    monthStr={seleTime ? month : ''}
                    dayStr={seleTime ? day : ''}
                    onChangeDate={(date, type) => {
                        onChangeDate(date, type);
                    }}
                    show={isClick == 2}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    textColor: {
        fontWeight: '600',
        color: COLORS.black,
        fontSize: FONT_SIZES.small,
    },
    date: {
        fontWeight: '600',
    },
    btnStyle: {
        borderRadius: BORDER_RADIUS.medium,
        width: '36%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: scaleSize(10),
        backgroundColor: COLORS.white,
        // borderColor:COLORS.black,
        paddingVertical: scaleSize(6),
    },
    buttonBottom: {
        width: '35%',
        // position:'absolute',
        bottom: scaleSize(10),
    },
    middleLine: {
        width: scaleSize(8),
        height: scaleSize(2),
        backgroundColor: COLORS.black,
    },
    dateView: {
        marginTop: scaleSize(10),
    },
    buttonBtm: {
        width: '35%',
        // position:'absolute',
        bottom: scaleSize(10),
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.lineColor,
    },
});

export default forwardRef(TimeSelectView);
