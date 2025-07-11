import React, { useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { scaleSize } from '@utils/ScreenUtil';
import { TextInner, Icon, InputField } from '@components/index';
import { COLORS, COMMON_STYLES } from '@common/CommonStyle';

interface Props {
    maxLength?: number;
    onChangeText: (text: string) => void;
    backgroundColor?: string;
    value?: string;
    isProhibitCN?: boolean;
    maximumCharacter?: number; //最大字符长度
    numberOfLines?: number; //行数
}

// TextareaItem 组件
const TextareaItem = ({
    maxLength = 250,
    isProhibitCN,
    onChangeText,
    numberOfLines = 4,
    backgroundColor = COLORS.secondaryBack,
    value = '',
}: Props) => {
    return (
        <View style={[styles.container]}>
            <InputField
                inputWrapperStyle={{ backgroundColor }}
                multiline
                isProhibitCN={isProhibitCN}
                maxLength={maxLength}
                isBorderWidth={false}
                numberOfLines={numberOfLines}
                value={value}
                showClearButton={false}
                inputStyle={styles.inputStyle}
                onChangeText={text => {
                    // setValue(text);
                    onChangeText && onChangeText(text);
                }}
            />
            <View style={[COMMON_STYLES.flexRow, styles.tipView]}>
                <TextInner
                    style={[
                        styles.textTip,
                        {
                            color: value.length > maxLength ? COLORS.danger : COLORS.secondary,
                        },
                    ]}
                >
                    {value.length}
                </TextInner>
                <TextInner style={styles.textTipNext}>/{maxLength}</TextInner>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: scaleSize(5),
    },
    inputStyle: {
        height: scaleSize(120),
        paddingVertical: scaleSize(5),
        textAlignVertical: 'top',
    },
    tipView: {
        position: 'absolute',
        right: 10,
        bottom: scaleSize(10),
    },
    textTip: {
        fontSize: scaleSize(12),
    },
    textTipNext: {
        fontSize: scaleSize(12),
        color: COLORS.secondary,
    },
});

export default TextareaItem;
