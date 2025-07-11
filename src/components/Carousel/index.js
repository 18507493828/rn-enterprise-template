import React, { useRef } from 'react';
import { Dimensions, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import { interpolate, Extrapolation, useSharedValue } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

// 渲染单个轮播项的函数，支持点击事件和自定义样式
const renderItem =
    options =>
    ({ item, index }) => {
        const { rounded = false, style = {}, onItemPress } = options;
        return (
            <TouchableOpacity
                style={[styles.itemContainer, rounded && styles.rounded, style]} // 样式处理
                activeOpacity={0.8} // 点击时的透明度效果
                onPress={() => onItemPress?.(item, index)} // 如果提供了点击回调，则触发
            >
                {item.image_url ? (
                    <Image
                        source={{ uri: item.image_url }} // 支持字符串 URI 或本地图片资源
                        style={styles.image}
                        resizeMode="cover" // 图片覆盖填充模式
                    />
                ) : (
                    <View style={[styles.colorBox, { backgroundColor: item }]} /> // 如果不是图片，则渲染为颜色块
                )}
            </TouchableOpacity>
        );
    };

// CustomCarousel 组件
const CustomCarousel = props => {
    const {
        data = [], // 数据数组，可以是颜色值或图片链接
        pageWidth = width, // 每个页面的宽度
        pageHeight = width * 0.6, // 每个页面的高度
        rounded = true, // 是否启用圆角效果
        loop = true, // 是否开启循环模式
        dotStyle, // 分页指示器的样式
        activeDotStyle, // 当前分页指示器的样式
        paginationStyle, // 分页指示器容器的样式
        containerStyle, // 主容器的额外样式
        onPressPagination, // 点击分页指示器的回调函数
        onItemPress, // 点击轮播项的回调函数
    } = props;

    const progress = useSharedValue(0); // 动态共享值，用于分页进度
    const ref = useRef(null); // Carousel 的引用

    // 点击分页指示器的处理逻辑
    const handlePressPagination = index => {
        ref.current?.scrollTo({
            count: index - progress.value, // 计算当前进度与目标索引的差值
            animated: true, // 是否开启动画
        });
    };

    // 无数据不显示
    if (!data.length) {
        return null;
    }

    return (
        <View style={[containerStyle, { gap: 10 }]}>
            {/* 轮播图组件 */}
            <Carousel
                autoPlay={data.length > 1}
                autoPlayInterval={5000}
                ref={ref}
                width={pageWidth}
                height={pageHeight}
                data={data}
                renderItem={renderItem({ rounded, onItemPress })}
                loop={loop}
                onProgressChange={progress} // 分页进度监听
            />

            {/* 自定义分页组件 */}
            {data.length > 1 && (
                <Pagination.Custom
                    progress={progress}
                    data={data}
                    size={5}
                    dotStyle={dotStyle || styles.defaultDotStyle}
                    activeDotStyle={activeDotStyle || styles.defaultActiveDotStyle}
                    containerStyle={paginationStyle || styles.defaultPaginationStyle}
                    horizontal
                    onPress={onPressPagination || handlePressPagination}
                    customReanimatedStyle={(progress, index, length) => {
                        let val = Math.abs(progress - index);
                        if (index === 0 && progress > length - 1) {
                            val = Math.abs(progress - length);
                        }
                        return {
                            transform: [
                                {
                                    translateY: interpolate(
                                        val,
                                        [0, 1],
                                        [0, 0],
                                        Extrapolation.CLAMP,
                                    ),
                                },
                            ],
                        };
                    }}
                />
            )}
        </View>
    );
};

// 样式定义
const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rounded: {
        borderRadius: 10,
        overflow: 'hidden',
    },
    colorBox: {
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    defaultDotStyle: {
        borderRadius: 16,
        backgroundColor: '#B6B6B6',
    },
    defaultActiveDotStyle: {
        borderRadius: 3,
        width: 10,
        height: 5,
        backgroundColor: 'black',
    },
    defaultPaginationStyle: {
        gap: 10,
        marginBottom: 10,
        alignItems: 'center',
        height: 10,
    },
});

export default CustomCarousel;
