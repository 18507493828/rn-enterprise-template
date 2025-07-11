import { COLORS, COMMON_STYLES } from '@common/CommonStyle';
import { Button } from '@components/index';
import { scaleSize } from '@utils/ScreenUtil';
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
    onLeftClick?: () => void;
    onRightClick?: () => void;
    style?: any;
    isVisible?: boolean;
    firstTitle?: string;
    secondTitle?: string;
    firstBackColor?: string;
    secondBackColor?: string;
    firstTextColor?: string;
    secondTextColor?: string;
}
const ButtonBottom = ({
    onLeftClick = () => {},
    onRightClick = () => {},
    style,
    isVisible = true,
    firstTitle,
    secondTitle,
    firstBackColor = '#fff',
    secondBackColor,
    firstTextColor = '#000',
    secondTextColor,
}: Props) => {
    return isVisible ? (
        <View style={[styles.container, style]}>
            <View style={COMMON_STYLES.flexBtw}>
                <Button
                    onPress={() => {
                        onLeftClick();
                    }}
                    textColor={firstTextColor}
                    backgroundColor={firstBackColor}
                    title={firstTitle}
                    style={styles.firstButtton}
                />
                <Button
                    backgroundColor={secondBackColor}
                    onPress={() => {
                        onRightClick();
                    }}
                    textColor={secondTextColor}
                    title={secondTitle}
                    style={styles.secondButtton}
                />
            </View>
        </View>
    ) : null;
};

const styles = StyleSheet.create({
    container: {},
    firstButtton: {
        borderColor: COLORS.primary,
        borderWidth: 1,
        width: scaleSize(157),
    },
    secondButtton: {
        width: scaleSize(157),
    },
});

export default ButtonBottom;
