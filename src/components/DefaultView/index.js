import React from 'react';
import { View, StyleSheet, Platform, StatusBar, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, useKeyboardAnimation } from 'react-native-keyboard-controller';
import { scaleSize } from '@utils/ScreenUtil';

const DefaultView = ({
    children,
    style = {},
    margin = 0,
    padding = 0,
    statusBarColor = '#fff',
    backgroundColor = '#fff',
    barStyle = 'dark-content',
    keyboardAvoiding = false,
    useSafeAreaView = false,
}) => {
    const Wrapper = keyboardAvoiding ? KeyboardAvoidingView : View;
    const SafeArea = useSafeAreaView ? SafeAreaView : View;

    const { height } = useKeyboardAnimation();
    // 获取安全区域
    const insets = useSafeAreaInsets();
    var topSet = insets.top;
    if (Platform.OS === 'ios') {
        topSet = topSet + 30;
    } else {
        topSet = topSet + 60;
    }
    // 筛选子组件
    const contentChildren = React.Children.toArray(children).filter(
        child => child?.props?.position !== 'bottom',
    );
    const bottomChildren = React.Children.toArray(children).filter(
        child => child?.props?.position === 'bottom',
    );
    return (
        <SafeArea style={[styles.safeArea, { backgroundColor: backgroundColor }]}>
            <StatusBar
                backgroundColor={statusBarColor}
                barStyle={barStyle}
                translucent={Platform.OS === 'android'}
            />

            <Wrapper
                style={[styles.container, { margin, padding, backgroundColor }, style]}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={topSet}
            >
                <View style={styles.content}>{contentChildren}</View>

                {bottomChildren.length > 0 && (
                    <View style={[styles.bottomContainer, { paddingBottom: insets.bottom }]}>
                        {bottomChildren}
                    </View>
                )}
            </Wrapper>
        </SafeArea>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    content: {
        flex: 1, // 页面内容占满
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: scaleSize(6),
    },
});

export default DefaultView;
