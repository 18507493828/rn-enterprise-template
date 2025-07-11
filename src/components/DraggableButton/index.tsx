import { Images } from '@assets/images';
import { COLORS, DEFAULT_CONTAINER_SPACE } from '@common/CommonStyle';
import TextInner from '@components/TextInner';
import { scaleSize } from '@utils/ScreenUtil';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, Image, Platform, ImageBackground } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedGestureHandler,
    withSpring,
} from 'react-native-reanimated';
import FirstGuideStorage from '@business/storage/FirstGuideStorage';
import RootNavigation from '@navigation/RootNavigation';

const BUTTON_SIZE = scaleSize(45); // 按钮的大小

interface Props {
    onClick: () => void;
    isShow: boolean; //是否显示
}

const DraggableButton = ({ onClick, isShow = false }: Props) => {
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false); //底部按钮显示或隐藏

    useEffect(() => {
        //检测是否首次使用APP
        checkFirstUseApp();
    }, []);

    // 按钮的初始位置（居中）
    const translateX = useSharedValue(
        SCREEN_WIDTH - DEFAULT_CONTAINER_SPACE - BUTTON_SIZE - scaleSize(60),
    );
    const translateY = useSharedValue(SCREEN_HEIGHT * 0.65);

    // 手势处理函数
    const onGestureEvent = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            // 记录按钮的初始位置
            ctx.startX = translateX.value;
            ctx.startY = translateY.value;
        },
        onActive: (event, ctx) => {
            // 更新按钮的位置
            translateX.value = ctx.startX + event.translationX;
            translateY.value = ctx.startY + event.translationY;
        },
        onEnd: () => {
            // 计算按钮的边界
            const minX = 0;
            const minY = 0;
            const maxX = SCREEN_WIDTH - BUTTON_SIZE;
            const maxY = SCREEN_HEIGHT - BUTTON_SIZE;

            // 确保按钮不会超出屏幕边界
            translateX.value = withSpring(Math.max(minX, Math.min(translateX.value, maxX)), {
                damping: 15,
                stiffness: 100,
            });
            translateY.value = withSpring(Math.max(minY, Math.min(translateY.value, maxY)), {
                damping: 15,
                stiffness: 100,
            });
        },
    });

    // 动画效果，点击按钮时控制菜单的显示/隐藏
    const toggleMenu = () => {
        setIsVisible(true);
        FirstGuideStorage.saveBottomGuide(true);
        RootNavigation.navigate('GuideScreen', {});
    };

    // 按钮的动画样式
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
        };
    });

    const checkFirstUseApp = async () => {
        const isFirstGuide = await FirstGuideStorage.getBottomGuide();
        setIsVisible(isFirstGuide);
    };

    return !isVisible ? (
        <GestureHandlerRootView style={styles.container}>
            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View style={[styles.bottomView, animatedStyle]} onTouchEnd={toggleMenu}>
                    <ImageBackground
                        resizeMode="contain"
                        style={styles.menuViewContainer}
                        source={Images.bottom_floating}
                    >
                        <TextInner style={styles.trading}>{t('guide_button_name')}</TextInner>
                    </ImageBackground>

                    <Animated.View
                        style={Platform.OS == 'android' ? styles.styleAndroid : styles.styleIos}
                    >
                        <Image source={Images.guide_icon} />
                    </Animated.View>
                </Animated.View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    ) : null;
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 999999,
    },
    button: {},
    menuView: {
        borderRadius: scaleSize(4),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: scaleSize(150),

        paddingVertical: scaleSize(5),
    },
    menuViewContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        // backgroundColor: 'red',
        width: scaleSize(121),
        height: scaleSize(40),
        // backgroundColor: 'red',
        // marginBottom: scaleSize(20),
    },
    bottomView: {
        right: DEFAULT_CONTAINER_SPACE,
        // justifyContent: 'center',
        alignItems: 'flex-end',
    },
    menu: {
        position: 'absolute',
        bottom: 80, // 菜单距离屏幕底部的初始位置
        backgroundColor: '#3498db',
        borderRadius: 10,
        width: 200,
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 5,
    },
    menuItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    menuItemText: {
        color: 'white',
        fontSize: 16,
    },
    buttonText: {
        color: 'white',
        fontSize: 30,
    },
    trading: {
        marginTop: -scaleSize(10),
        color: '#fff',
        fontSize: scaleSize(12),
    },
    styleAndroid: {
        marginTop: scaleSize(5),
        justifyContent: 'center',
        alignItems: 'center',
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        // right: scaleSize(16),
        borderRadius: BUTTON_SIZE / 2,
        backgroundColor: COLORS.link,
        shadowColor: COLORS.link, // 阴影颜色
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity: 0.8,
        elevation: 10, // 设置阴影的高度
    },
    styleIos: {
        marginTop: scaleSize(5),
        justifyContent: 'center',
        alignItems: 'center',
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        // right: scaleSize(16),
        borderRadius: BUTTON_SIZE / 2,
        backgroundColor: COLORS.link,
        shadowColor: COLORS.link, // 阴影颜色
        shadowOffset: { width: 0, height: 1 }, // 阴影偏移
        shadowOpacity: 0.8, // 阴影透明度
        shadowRadius: 6,
    },
});

export default DraggableButton;
