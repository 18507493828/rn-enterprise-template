import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { TextInner } from '@components/index';
import { scaleSize } from '@utils/ScreenUtil';
import { COLORS } from '@common/CommonStyle';

/**
 * HUD 组件
 * @param {Object} props
 * @param {string} props.title - 显示的标题文本
 * @param {boolean} props.loading - 是否显示加载动画
 * @param {React.Element} props.customComponent - 自定义 HUD 内容
 */
const HudView = ({
    backgroundColor,
    loadingColor,
    title = '',
    loading = true,
    customComponent,
}) => (
    <View style={styles.container}>
        <View
            style={[
                styles.hudContainer,
                { backgroundColor: backgroundColor ? backgroundColor : COLORS.transparent },
            ]}
        >
            {customComponent || (
                <>
                    {loading && (
                        <ActivityIndicator
                            style={styles.indicator}
                            color={loadingColor ? loadingColor : COLORS.primary}
                        />
                    )}
                    {title && <TextInner style={styles.title}>{title}</TextInner>}
                </>
            )}
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        backgroundColor: 'transparent',
    },
    hudContainer: {
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: scaleSize(30),
        borderRadius: scaleSize(6),
    },
    indicator: {
        marginRight: scaleSize(8),
    },
    title: {
        marginTop: scaleSize(2),
        fontSize: 16,
        color: '#FFFFFF',
    },
});

export default HudView;
