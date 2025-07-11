import React, { ReactNode } from 'react';
import {
    Image,
    ImageSourcePropType,
    ImageStyle,
    StyleSheet,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { TextInner, Icon } from '@components/index';
import { COMMON_STYLES } from '@common/CommonStyle';
import CommonMethods from '@utils/CommonMethods';

type Style = ViewStyle | TextStyle | ImageStyle;

interface Props {
    title?: string;
    onPress?: () => void;
    style?: Style;
    textStyle?: Style;
    icon?: string;
    text?: string;
    source?: ImageSourcePropType;
    iconSize?: number;
    iconColor?: string;
    url?: string;
    activeOpacity?: number;
    isVisible?: boolean; //是否显示
    iconStyle?: Style;
    children?: ReactNode;
    imageStyle?: ImageStyle;
    hitSlop?: any; //
    clickTimeOut?: number; //设置按钮防止重复点击时差（单位ms）
}

const ClickableItem = ({
    style,
    onPress,
    icon,
    source,
    text,
    url,
    iconSize = 24,
    iconColor = 'black',
    textStyle = {},
    iconStyle = {},
    imageStyle = {},
    children,
    isVisible = true,
    activeOpacity = 0.8,
    hitSlop = 20,
    clickTimeOut = 1000, //设置按钮防止重复点击时差（单位ms）
}: Props) => {
    return isVisible ? (
        <TouchableOpacity
            activeOpacity={activeOpacity}
            hitSlop={hitSlop}
            onPress={() => {
                //防止重复点击
                CommonMethods.noDoubleClick(() => {
                    onPress && onPress();
                }, clickTimeOut);
            }}
            style={[(styles.button, style)]}
        >
            {icon && (
                <Icon
                    name={icon}
                    size={iconSize}
                    color={iconColor}
                    style={[iconStyle]} // 默认marginRight，防止文本和图标粘在一起
                />
            )}
            <View style={COMMON_STYLES.flexRow}>
                {source && <Image source={source} style={[imageStyle]} />}
                {url && <Image source={{ uri: url }} style={[imageStyle]} />}
                {text && <TextInner style={textStyle}>{text}</TextInner>}
            </View>
            {children}
        </TouchableOpacity>
    ) : null;
};

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ClickableItem;
