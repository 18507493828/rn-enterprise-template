import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { scaleSize } from '@utils/ScreenUtil';
import TextInner from '@components/TextInner';
import Icon from '@components/Icon';
import GlobalConfig from '@config/GlobalConfig';
import { COLORS, COMMON_STYLES, FONT_SIZES } from '@common/CommonStyle';
import Touchable from '@components/Touchable';

interface Props {
    martop?: number;
    selected?: boolean;
    onSelect?: (select: any) => void;
    onPress?: () => void;
    show?: boolean;
}

const Privavacy = ({ martop = 0, onSelect, selected, onPress = () => {}, show = true }: Props) => {
    const [select, setSelect] = useState(selected);
    const { t } = useTranslation();
    useEffect(() => {}, []);

    return show ? (
        <View style={[{ marginTop: martop }]}>
            <View style={styles.container}>
                <Touchable
                    hitSlop={20}
                    onPress={() => {
                        setSelect(!select);
                        onSelect && onSelect(select);
                    }}
                >
                    <Icon size={scaleSize(16)} name={selected ? 'check' : 'iRadio_line'} />
                </Touchable>
                <View style={styles.margin}>
                    <Touchable
                        activeOpacity={1.0}
                        onPress={() => {
                            setSelect(!select);
                            onSelect && onSelect(select);
                        }}
                    >
                        <TextInner style={{ color: COLORS.secondary, fontSize: FONT_SIZES.xSmall }}>
                            {t('auth_confirm_agree_privacy', {
                                appName: GlobalConfig.appInfo.name,
                            })}
                        </TextInner>
                    </Touchable>
                    <View style={COMMON_STYLES.flexRow}>
                        <Touchable
                            activeOpacity={1.0}
                            onPress={() => {
                                setSelect(!select);
                                onSelect && onSelect(select);
                            }}
                        >
                            <TextInner
                                style={{
                                    color: COLORS.secondary,
                                    fontSize: FONT_SIZES.xSmall,
                                }}
                            >
                                {t('auth_confirm_read')}{' '}
                            </TextInner>
                        </Touchable>
                        <Touchable
                            onPress={() => {
                                onPress();
                            }}
                        >
                            <TextInner style={styles.privacy}>{t('privacy_policy')}</TextInner>
                        </Touchable>
                    </View>
                </View>
            </View>
        </View>
    ) : null;
};

const styles = StyleSheet.create({
    container: {
        marginTop: scaleSize(20),
        flexDirection: 'row',
    },
    privacy: {
        color: COLORS.link,
        fontSize: FONT_SIZES.xSmall,
        textDecorationLine: 'underline',
    },
    margin: {
        marginLeft: scaleSize(4),
    },
});

export default Privavacy;
