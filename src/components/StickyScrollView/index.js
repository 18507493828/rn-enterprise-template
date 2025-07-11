import { COLORS } from '@common/CommonStyle';
import React, { useRef, useState } from 'react';
import {
    ScrollView,
    View,
    StyleSheet,
    RefreshControl,
    LayoutAnimation,
    UIManager,
    Platform,
} from 'react-native';

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * StickyScrollView
 * @param {React.ReactNode} children - ScrollView 的子组件
 * @param {boolean} refreshing - 是否处于刷新状态
 * @param {Function} onRefresh - 下拉刷新触发函数
 */
const StickyScrollView = ({ style, children, refreshing, onRefresh }) => {
    const [stickyContent, setStickyContent] = useState(null);
    const [stickyVisible, setStickyVisible] = useState(false);
    const stickyRef = useRef(null); // 保存吸顶区域的 ref
    const scrollRef = useRef(null);

    const handleScroll = event => {
        const scrollY = event.nativeEvent.contentOffset.y;

        if (stickyRef.current) {
            stickyRef.current.measure((x, y, width, height, pageX, pageY) => {
                const shouldStick = pageY <= 0; // 判断是否到达吸顶临界点
                if (shouldStick && !stickyVisible) {
                    LayoutAnimation.easeInEaseOut();
                    setStickyVisible(true);
                    setStickyContent(React.cloneElement(children, { isSticky: true }));
                } else if (!shouldStick && stickyVisible) {
                    LayoutAnimation.easeInEaseOut();
                    setStickyVisible(false);
                    setStickyContent(null);
                }
            });
        }
    };

    return (
        <View style={styles.container}>
            {/* 吸顶内容 */}
            {stickyVisible && <View style={styles.stickyHeader}>{stickyContent}</View>}

            {/* 可滚动内容 */}
            <ScrollView
                style={[style]}
                ref={scrollRef}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={COLORS.primary}
                    />
                }
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {React.Children.map(children, child => React.cloneElement(child, { stickyRef }))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    stickyHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default StickyScrollView;
