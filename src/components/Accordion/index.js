import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import Touchable from '@components/Touchable';
import TextInner from '@components/TextInner';
import { scaleSize } from '@utils/ScreenUtil';

// 单个 AccordionItem 组件，每个项目内部调用自己的 Hook
export const AccordionItem = ({ section, isActive, onToggle, headerStyle }) => {
    // 动画共享值
    const heightValue = useSharedValue(0);
    const rotationValue = useSharedValue(0);
    // 用来存储内容的实际高度
    const contentHeightRef = useRef(0);

    // 当 isActive 改变时触发动画
    useEffect(() => {
        const targetHeight = isActive ? contentHeightRef.current : 0;

        // 使用 easing 函数和较短的动画时长
        heightValue.value = withTiming(targetHeight, {
            duration: 150,
            easing: Easing.out(Easing.cubic),
        });

        // arrow 旋转180
        rotationValue.value = withTiming(isActive ? 180 : 0, {
            duration: 150,
            easing: Easing.out(Easing.cubic),
        });
    }, [isActive]);

    const animatedHeightStyle = useAnimatedStyle(() => ({
        height: heightValue.value,
    }));

    const animatedRotationStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotationValue.value}deg` }],
    }));

    return (
        <View style={styles.itemContainer}>
            <Touchable onPress={onToggle} style={[styles.header, headerStyle]} activeOpacity={0.7}>
                {/* 渲染头部内容 */}
                {section.renderHeader ? (
                    section.renderHeader(section, isActive)
                ) : (
                    <TextInner style={styles.headerText}>{section.title}</TextInner>
                )}
                <TextInner
                    useAnimated
                    useIconFont
                    iconName="a-Upabove_line"
                    style={[animatedRotationStyle, styles.arrowIcon]}
                />
            </Touchable>

            {/* 隐藏视图用于测量内容高度 */}
            <View
                style={styles.hiddenContent}
                onLayout={event => {
                    const measuredHeight = event.nativeEvent.layout.height;
                    if (contentHeightRef.current !== measuredHeight) {
                        contentHeightRef.current = measuredHeight;
                        if (isActive) {
                            heightValue.value = measuredHeight;
                        }
                    }
                }}
            >
                {section.renderContent ? (
                    section.renderContent(section, isActive)
                ) : (
                    <TextInner style={styles.contentText}>{section.content}</TextInner>
                )}
            </View>

            {/* 实际显示的内容区域 */}
            <Animated.View style={[styles.animatedContent, animatedHeightStyle]}>
                {section.renderContent ? (
                    section.renderContent(section, isActive)
                ) : (
                    <TextInner style={styles.contentText}>{section.content}</TextInner>
                )}
            </Animated.View>
        </View>
    );
};

const Accordion = ({
    sections,
    activeSections,
    onChange,
    expandMultiple,
    touchableProps,
    renderHeader,
    renderContent,
    headerStyle,
    style,
}) => {
    const [expandedSections, setExpandedSections] = useState(activeSections || []);

    useEffect(() => {
        setExpandedSections(activeSections || []);
    }, [activeSections]);

    const toggleSection = index => {
        let updated = [...expandedSections];
        if (expandMultiple) {
            if (updated.includes(index)) {
                updated = updated.filter(i => i !== index);
            } else {
                updated.push(index);
            }
        } else {
            updated = updated.includes(index) ? [] : [index];
        }
        setExpandedSections(updated);
        onChange && onChange(updated);
    };

    return (
        <View style={[style]}>
            {sections &&
                sections.map((section, index) => {
                    const isActive = expandedSections.includes(index);

                    // 传递外部 renderHeader/renderContent（如果有）
                    const sectionProps = {
                        ...section,
                        renderHeader: renderHeader || section.renderHeader,
                        renderContent: renderContent || section.renderContent,
                    };
                    return (
                        <AccordionItem
                            key={index}
                            section={sectionProps}
                            isActive={isActive}
                            onToggle={() => toggleSection(index)}
                            headerStyle={headerStyle}
                        />
                    );
                })}
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        marginBottom: scaleSize(16),
        position: 'relative',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: scaleSize(12),
        paddingVertical: scaleSize(14),
        backgroundColor: '#F7F7F7',
        borderRadius: 4,
    },
    headerText: {
        fontSize: scaleSize(16),
    },
    hiddenContent: {
        position: 'absolute',
        top: 10000,
        left: 0,
        right: 0,
        opacity: 0,
    },
    animatedContent: {
        overflow: 'hidden',
        paddingHorizontal: scaleSize(10),
    },
    arrowIcon: {
        fontSize: scaleSize(16),
        color: '#A1A1A1',
    },
    contentText: {
        fontSize: scaleSize(14),
    },
});

export default Accordion;
