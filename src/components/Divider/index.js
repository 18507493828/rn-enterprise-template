import { COLORS } from '@common/CommonStyle';
import { scaleSize } from '@utils/ScreenUtil';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Divider = ({
    color = COLORS.lineColor, // 默认颜色
    height = scaleSize(0.5), // 设置为更细的高度（0.5 像素）
    width = '100%', // 默认宽度
    style = {}, // 外部传入的样式
    dashed = false, // 是否为虚线
}) => {
    return (
        <View
            style={[
                styles.divider,
                { backgroundColor: color, height, width },
                dashed && styles.dashed, // 如果是虚线，应用虚线样式
                style, // 允许外部自定义额外的样式
            ]}
        />
    );
};

const styles = StyleSheet.create({
    divider: {
        width: '100%',
    },
    dashed: {
        borderStyle: 'dashed', // 设置为虚线
        borderWidth: scaleSize(0.5), // 设置虚线宽度为0.5，使其细化
    },
});

export default Divider;
