import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInner } from '@components/index';
import { useTranslation } from 'react-i18next';
import LanguageStore from '@lib/zustand/LanguageStore';

const SwitchLanguage = () => {
    const { t } = useTranslation();
    const { lang, setLang } = LanguageStore();

    return (
        <View style={styles.container}>
            <TextInner style={{ fontSize: 20 }}>{t('greeting', { name: '呀呀呀test' })}</TextInner>
            <Button
                title={t('language_switch_btn')}
                onPress={() => setLang(lang === 'zh' ? 'en' : 'zh')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SwitchLanguage;
