import { COLORS, COMMON_STYLES } from '@common/CommonStyle';
import { CustomImage, TextInner } from '@components/index';
import { scaleSize } from '@utils/ScreenUtil';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

interface Props {
    onChioce: (data: object) => void;
    datas: [];
}

export default ({ onChioce = () => {}, datas }: Props) => {
    const { t } = useTranslation();
    return (
        <View style={COMMON_STYLES.center}>
            <View style={[COMMON_STYLES.flexRowCenter, { marginTop: scaleSize(20) }]}>
                <View style={styles.lineView} />
                <TextInner style={styles.orText}>{t('or')}</TextInner>
                <View style={styles.lineView} />
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={[COMMON_STYLES.center, { flexDirection: 'row', flexWrap: 'wrap' }]}>
                    {datas.map((v, index) => (
                        <TouchableOpacity
                            style={[
                                COMMON_STYLES.center,
                                {
                                    // backgroundColor: 'red',
                                    marginLeft: index != 0 ? scaleSize(10) : 0,
                                    width: scaleSize(50),
                                    marginTop: scaleSize(10),
                                },
                            ]}
                            key={index}
                            activeOpacity={0.8}
                            onPress={() => {
                                onChioce(v);
                            }}
                        >
                            <CustomImage
                                url={v.url}
                                source={v.source}
                                size={scaleSize(32)}
                                isBorderRadius
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    orText: {
        color: COLORS.secondary,
        marginHorizontal: scaleSize(10),
    },
    lineView: {
        height: 0.5,
        backgroundColor: COLORS.border,
        width: '42%',
    },
});
