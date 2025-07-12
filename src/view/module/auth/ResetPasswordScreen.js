// 函数写法
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, DefaultView, Hud, InputField, TextInner, Toast } from '@components/index';
import { scaleSize } from '@utils/ScreenUtil';
import { BORDER_RADIUS, COLORS, COMMON_STYLES, DEFAULT_BOTTOM_SPACE } from '@common/CommonStyle';
import { SCREEN_WIDTH } from '@utils/ScreenUtil';
import CountDownTime from './core/CountDownTime';
import CommonMethods from '@utils/CommonMethods';
import AuthController from '@business/controller/AuthController';
import { SendType } from '@jssdk/model/mappings/SendMsgMapping';
import {
    ghanaPhoneRegex,
    kenyaPhoneRegex,
    nigeriaPhoneRegex,
    regexNumberAndLetter,
    regexVerificationCode,
} from '@utils/RegularUtil';
import { SIX_NUMBER } from './config/AuthConfig';
import { useTranslation } from 'react-i18next';
import { useCommonState } from '@lib/zustand';

const ResetPassword = ({ navigation, route }) => {
    const { defaultCountryData, countryList } = useCommonState();
    const { t } = useTranslation();
    const [country, setCountry] = useState(defaultCountryData?.name);
    const [countryId, setCountryId] = useState(defaultCountryData?.id);
    const [countryCode, setCountryCode] = useState(defaultCountryData?.area_code);
    const [countryImage, setCountryImage] = useState(defaultCountryData?.icon);
    const [phoneNum, setPhoneNum] = useState('');
    const [code, setCode] = useState('');
    const [newPassWord, setNewPassWord] = useState('');
    const [againPassWord, setAgainPassWord] = useState('');

    useEffect(() => {}, []);

    //按钮是否可点击
    const disabledBtn = () => {
        return phoneNum && againPassWord && newPassWord && code && countryId;
    };

    const handleSelect = value => {
        setCountry(value.name);
        setCountryId(value.id);
        setCountryCode(value.area_code);
        setCountryImage(value.icon);
        // console.log('Selected Value:', value);
    };

    const forgotPassword = async () => {
        Hud.show();
        let newPhoneNum = phoneNum;
        if (phoneNum.trim().charAt(0) == '0') {
            newPhoneNum = phoneNum.substring(1);
        }
        const success = await AuthController.forgotPassword({
            phone: newPhoneNum.trim(),
            password: againPassWord,
            verification_code: code.trim(),
            country_id: countryId,
        });
        Hud.hide();
        if (success) {
            Toast.success(t('auth_setting_successful'));
            navigation.goBack();
        }
    };

    const onClick = () => {
        if (countryId == 1 && nigeriaPhoneRegex(phoneNum.trim())) {
            return CommonMethods.verifyFormWithKey('correct');
        }
        if (countryId == 2 && ghanaPhoneRegex(phoneNum.trim())) {
            return CommonMethods.verifyFormWithKey('correct');
        }
        if (countryId == 3 && kenyaPhoneRegex(phoneNum.trim())) {
            return CommonMethods.verifyFormWithKey('correct');
        }

        if (!regexVerificationCode(code.trim())) {
            return CommonMethods.verifyFormWithKey('verificationCode');
        }
        if (!regexNumberAndLetter(againPassWord)) {
            return CommonMethods.verifyFormWithKey('passwordRules');
        }
        if (againPassWord.length < SIX_NUMBER) {
            return CommonMethods.verifyFormWithKey('six');
        }
        if (newPassWord != againPassWord) {
            return CommonMethods.verifyFormWithKey('diffrent');
        }
        forgotPassword();
    };

    return (
        <DefaultView keyboardAvoiding>
            <ScrollView>
                <View style={[COMMON_STYLES.center, styles.country]}>
                    <InputField
                        keyboardType="number-pad"
                        value={phoneNum}
                        maxLength={30}
                        leftChirdren={
                            countryCode && <TextInner style={styles.text}>+{countryCode}</TextInner>
                        }
                        placeholder={t('auth_phone_number')}
                        onChangeText={setPhoneNum}
                    />
                    <InputField
                        RightChirdren={
                            <CountDownTime
                                phoneNum={phoneNum.trim()}
                                country_id={countryId}
                                type={SendType.TYPE_FORGET_PASSWORD}
                            />
                        }
                        placeholder={t('auth_verification_code')}
                        value={code}
                        showClearButton={false}
                        onChangeText={text => {
                            setCode(text);
                        }}
                    />

                    <InputField
                        secureTextEntry
                        placeholder={t('auth_input_password')}
                        value={newPassWord}
                        onChangeText={text => {
                            setNewPassWord(text.trim());
                        }}
                    />

                    <InputField
                        secureTextEntry
                        value={againPassWord}
                        placeholder={t('auth_confirm_password')}
                        onChangeText={text => {
                            setAgainPassWord(text.trim());
                        }}
                    />
                </View>
            </ScrollView>
            <Button
                disabled={!disabledBtn()}
                title={t('submit')}
                onPress={onClick}
                style={styles.button}
                textStyle={undefined}
            />
        </DefaultView>
    );
};

const styles = StyleSheet.create({
    input: {
        borderRadius: BORDER_RADIUS.small,
        width: '100%',
        height: scaleSize(36),
        borderWidth: 1,
        paddingRight: scaleSize(10),
        marginTop: scaleSize(8),
        paddingLeft: scaleSize(10),
        borderColor: COLORS.border,
    },
    country: {
        paddingHorizontal: scaleSize(16),
        marginTop: scaleSize(5),
    },
    text: {
        marginRight: scaleSize(10),
    },
    button: {
        width: '90%',
        marginBottom: DEFAULT_BOTTOM_SPACE,
        marginLeft: SCREEN_WIDTH * 0.05,
    },
});

export default ResetPassword;
