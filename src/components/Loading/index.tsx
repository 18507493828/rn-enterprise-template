import { COLORS } from '@common/CommonStyle';
import TextInner from '@components/TextInner';
import { scaleSize, SCREEN_HEIGHT, SCREEN_WIDTH } from '@utils/ScreenUtil';
import React, { useLayoutEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const Loading = ({
    loadingColor = '',
    backgroundColor = '',
    title = '',
    timeout = 10000,
    isVisible = false,
}) => {
    const [visible, setVisible] = useState(false);
    useLayoutEffect(() => {
        setVisible(isVisible);
    }, [isVisible]);
    setTimeout(() => {
        setVisible(false);
    }, timeout);

    return visible ? (
        <View style={styles.container}>
            <View
                style={[
                    styles.loadingView,
                    { backgroundColor: backgroundColor ? backgroundColor : COLORS.transparent },
                ]}
            >
                <ActivityIndicator color={loadingColor ? loadingColor : COLORS.primary} />
                {/* <Image source={Images.app_loading} /> */}
                {title && <TextInner style={styles.loadingText}>{title}</TextInner>}
            </View>
        </View>
    ) : null;
};

const styles = StyleSheet.create({
    loadingView: {
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: scaleSize(15),
        paddingHorizontal: scaleSize(10),
        borderRadius: 10,
    },
    loadingText: {
        textAlign: 'center',
        marginTop: scaleSize(5),
        color: 'white',
    },
    container: {
        position: 'absolute',
        backgroundColor: COLORS.transparent,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
});

export default Loading;
