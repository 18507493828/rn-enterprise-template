import { View, StyleSheet, ScrollView, Animated, ViewStyle, TouchableOpacity } from 'react-native';
import { forwardRef, memo, useEffect, useRef } from 'react';
import React from 'react';

type DateSelectorProps = {
    data: string[] | number[];
    style?: ViewStyle;
    initialize?: any;
    isVisible?: boolean;
    visibleLength?: number; // 需要展示的数量(必须为单数)
    onChange: (value: any) => void;
};

const HEIGHT = 40;
/** 默认展示的数据数量 */
const VISIBLE_ITEMS = 5;

/** 自定义选择器 */
const CalendarPicker = (
    { data, style, initialize, visibleLength, onChange, isVisible = true }: DateSelectorProps,
    ref: any,
) => {
    let scrollY = useRef(new Animated.Value(0)).current;
    const visibleItems = useRef(visibleLength ?? VISIBLE_ITEMS).current;
    const middle_index = useRef(Math.floor(visibleItems / 2)).current;
    const scroRef = useRef<any>();

    let timeout: any;

    useEffect(() => {
        if (!initialize) return;
        // 如果传了初始值，初始化时定位到选中位置
        let index: number = data.findIndex(item => item == initialize);
        if (index < 0) {
            index = 0;
        }

        const y = index * HEIGHT;
        timeout = setTimeout(() => {
            scroRef?.current?.scrollTo({ y, animated: false });
        }, 1);

        return () => {
            clearTimeout(timeout);
        };
    }, [initialize, isVisible]);

    return isVisible ? (
        <View style={[{ height: HEIGHT * visibleItems + 10 }, styles.container, style]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                ref={scroRef}
                snapToInterval={HEIGHT}
                snapToAlignment="start"
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                    useNativeDriver: false,
                })}
                scrollEventThrottle={16}
                onMomentumScrollEnd={event => {
                    const selectedIndex = Math.round(event.nativeEvent.contentOffset.y / HEIGHT);
                    const selectedDate = data?.[selectedIndex];
                    selectedDate && onChange(selectedDate);
                }}
            >
                <TouchableOpacity activeOpacity={1}>
                    {/* 兼容最前端与最末端数据选择 */}
                    {['', '', ...data, '', '']?.map((date, index) => {
                        const inputRange = [
                            (index - middle_index - 2) * HEIGHT,
                            (index - middle_index - 1) * HEIGHT,
                            (index - middle_index) * HEIGHT,
                            (index - middle_index + 1) * HEIGHT,
                            (index - middle_index + 2) * HEIGHT,
                        ];

                        const fontSize = scrollY.interpolate({
                            inputRange,
                            outputRange: [14, 16, 18, 16, 14],
                            extrapolate: 'clamp',
                        });
                        const color = scrollY.interpolate({
                            inputRange,
                            outputRange: ['#878787', '#565656', '#000', '#565656', '#878787'],
                            extrapolate: 'clamp',
                        });
                        const opacity = scrollY.interpolate({
                            inputRange,
                            outputRange: [0.6, 0.8, 1, 0.8, 0.6],
                            extrapolate: 'clamp',
                        });
                        const rotateX = scrollY.interpolate({
                            inputRange,
                            outputRange: ['40deg', '30deg', '0deg', '30deg', '40deg'],
                            extrapolate: 'clamp',
                        });
                        return (
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => {
                                    onChange(date);
                                }}
                                style={styles.item}
                                key={index}
                            >
                                <Animated.Text
                                    style={{
                                        fontWeight: '500',
                                        fontSize,
                                        color,
                                        opacity,
                                        transform: [{ rotateX }],
                                    }}
                                >
                                    {date}
                                </Animated.Text>
                            </TouchableOpacity>
                        );
                    })}
                </TouchableOpacity>
            </ScrollView>
            <View pointerEvents="none" style={styles.line} />
        </View>
    ) : null;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 5,
        justifyContent: 'center',
    },
    item: {
        height: HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    line: {
        left: 0,
        right: 0,
        position: 'absolute',
        height: HEIGHT,
        borderTopColor: '#E7E7E7',
        borderTopWidth: 1,
        borderBottomColor: '#E7E7E7',
        borderBottomWidth: 1,
    },
});

export default memo(forwardRef(CalendarPicker));
