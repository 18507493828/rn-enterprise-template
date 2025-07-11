import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInner, Touchable } from '@components/index';
import { scaleSize } from '@utils/ScreenUtil';
import { FONT_SIZES } from '@common/CommonStyle';

const GridView = ({
    data = [], // 默认空数组
    renderItem = null, // 默认渲染逻辑
    onItemPress = () => {}, // 默认空函数
    numColumns = 3, // 默认每行3列
    containerStyle = {}, // 默认样式为空对象
    itemStyle = styles.defaultItem, // 默认样式为空对象
    gap = scaleSize(10), // 默认间距为10
    activeOpacity = 0.5,
}) => {
    const renderDefaultItem = item => (
        <View style={styles.defaultGridItem}>
            {item.icon && <Image source={item.icon} style={styles.icon} />}
            <TextInner
                style={styles.text}
                numberOfLines={2} // 限制最多两行
                ellipsizeMode="tail" // 超出文本显示省略号
            >
                {item.name}
            </TextInner>
        </View>
    );

    // 将数据按行分组
    const rows = [];
    for (let i = 0; i < data.length; i += numColumns) {
        rows.push(data.slice(i, i + numColumns));
    }

    return (
        <View style={[styles.container, containerStyle]}>
            {rows.map((row, rowIndex) => (
                <View
                    style={[styles.row, rowIndex < rows.length - 1 && { marginBottom: gap }]}
                    key={`row-${rowIndex}`}
                >
                    {row.map((item, colIndex) => (
                        <Touchable
                            style={[
                                styles.item,
                                itemStyle,
                                colIndex < numColumns - 1 && { marginRight: gap },
                            ]}
                            key={`item-${rowIndex}-${colIndex}`}
                            activeOpacity={activeOpacity}
                            onPress={() => onItemPress(item, rowIndex, colIndex)}
                        >
                            {renderItem
                                ? renderItem(item, rowIndex, colIndex)
                                : renderDefaultItem(item)}
                        </Touchable>
                    ))}

                    {/* 如果最后一行不足 numColumns，填充空白项 */}
                    {row.length < numColumns &&
                        Array.from({ length: numColumns - row.length }).map((_, index) => (
                            <View
                                style={[styles.item, { flex: 1 }]}
                                key={`placeholder-${rowIndex}-${index}`}
                            />
                        ))}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    row: {
        flexDirection: 'row',
    },
    item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    defaultItem: {
        paddingVertical: scaleSize(12),
        backgroundColor: '#F3F3F3',
        borderRadius: 8,
    },
    defaultGridItem: {
        paddingHorizontal: scaleSize(5),
        alignItems: 'center',
    },
    icon: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    text: {
        fontSize: FONT_SIZES.xSmall,
        color: '#333',
    },
});

export default GridView;
