import { Images } from '@assets/images';
import { FONT_SIZES } from '@common/CommonStyle';
import { scaleSize } from '@utils/ScreenUtil';
import React, { useEffect } from 'react';
import { t } from 'i18next';
import { Image, ImageSourcePropType, StyleSheet } from 'react-native';
import { Touchable, TextInner, Button } from '@components/index';

interface Props {
    label?: string;
    tipTitle?: string;
    setTipTitle?: (title: string) => void;
    style?: object;
    marginTop?: number;
    onClick?: () => void;
    source?: ImageSourcePropType;
    isVisible?: boolean;
    btnWidth?: number;
    showBtn?: boolean;
    btnTitle?: string;
    onPress?: () => void;
}

const NoDataView = ({
    tipTitle = t('empty_tip'),
    style,
    marginTop = scaleSize(50),
    onClick,
    onPress,
    isVisible = false,
    source = Images.app_nodata_pic,
    btnWidth = scaleSize(120),
    showBtn = false,
    btnTitle,
}: Props) => {
    return !isVisible ? (
        <Touchable
            activeOpacity={1}
            onPress={() => {
                onClick && onClick();
            }}
            style={[styles.container, { marginTop }, style]}
        >
            <Image source={source} />
            <TextInner style={styles.noResultsText}>{tipTitle}</TextInner>
            {showBtn && (
                <Button
                    onPress={() => {
                        onPress && onPress();
                    }}
                    title={btnTitle}
                    style={[styles.button, { width: btnWidth }]}
                    textStyle={{ fontWeight: 'normal' }}
                    fontSize={scaleSize(14)}
                />
            )}
        </Touchable>
    ) : null;
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    noResultsText: {
        width: '60%',
        fontSize: FONT_SIZES.xSmall,
        color: '#888',
        textAlign: 'center',
        marginTop: scaleSize(10),
    },
    button: {
        paddingVertical: scaleSize(10),
        marginTop: scaleSize(20),
    },
});

export default NoDataView;
