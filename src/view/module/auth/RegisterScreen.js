import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, DefaultView, Hud, InputField, TextInner, Toast } from '@components/index';
import { scaleSize } from '@utils/ScreenUtil';
import {
    BORDER_RADIUS,
    COLORS,
    COMMON_STYLES,
    DEFAULT_BOTTOM_SPACE,
    DEFAULT_KEYBOARD_TOP_SPACE,
    FONT_SIZES,
} from '@common/CommonStyle';
import CountDownTime from './core/CountDownTime';
import CommonMethods from '@utils/CommonMethods';
import AuthController from '@business/controller/AuthController';
import { SendType } from '@jssdk/model/mappings/SendMsgMapping';
import SelectCountry from '../sell/core/SelectCountry';
import { useCommonState } from '@lib/zustand';
import {
    ghanaPhoneRegex,
    kenyaPhoneRegex,
    nigeriaPhoneRegex,
    regexNumberAndLetter,
    regexVerificationCode,
} from '@utils/RegularUtil';
import DeviceInfo from 'react-native-device-info';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SIX_NUMBER } from './config/AuthConfig';
import { useTranslation } from 'react-i18next';

const RegisterScreen = ({ navigation, route }) => {
    const { defaultCountryData, countryList } = useCommonState();
    const { t } = useTranslation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState(defaultCountryData?.name);
    const [countryId, setCountryId] = useState(defaultCountryData?.id);
    const [countryCode, setCountryCode] = useState(defaultCountryData?.area_code);
    const [countryImage, setCountryImage] = useState(defaultCountryData?.icon);
    const [phoneNum, setPhoneNum] = useState('');
    const [code, setCode] = useState('');
    const [invitation, setInvitation] = useState('');
    const [newPassWord, setNewPassWord] = useState('');
    const [againPassWord, setAgainPassWord] = useState('');

    //按钮是否可点击
    const disabledBtn = () => {
        return firstName && lastName && phoneNum && againPassWord && code && countryId;
    };

    const registerDatas = async () => {
        let newPhoneNum = phoneNum;
        if (phoneNum.trim().charAt(0) == '0') {
            newPhoneNum = phoneNum.substring(1);
        }
        Hud.show();
        const success = await AuthController.register({
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            phone: newPhoneNum.trim(),
            password: againPassWord,
            verification_code: code.trim(),
            invite_code: invitation.trim(),
            country_id: countryId,
            //获取设备id
            device_id: DeviceInfo.getUniqueIdSync(),
        });
        Hud.hide();
        if (success) {
            Toast.success(t('auth_toast_register_successful'));
            navigation.goBack();
        }
    };

    const handleSelect = value => {
        setCountry(value.name);
        setCountryId(value.id);
        setCountryCode(value.area_code);
        setCountryImage(value.icon);
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
        if (newPassWord.length < SIX_NUMBER) {
            return CommonMethods.verifyFormWithKey('six');
        }
        if (againPassWord.length < SIX_NUMBER) {
            return CommonMethods.verifyFormWithKey('six');
        }
        if (newPassWord != againPassWord) {
            return CommonMethods.verifyFormWithKey('diffrent');
        }
        if (!regexNumberAndLetter(newPassWord)) {
            return CommonMethods.verifyFormWithKey('passwordRules');
        }
        registerDatas();
    };
    return (
        <DefaultView style={styles.container} keyboardAvoiding>
            <KeyboardAwareScrollView bottomOffset={DEFAULT_KEYBOARD_TOP_SPACE}>
                <View style={[COMMON_STYLES.center, styles.innerView]}>
                    <InputField
                        isProhibitCN={false}
                        value={firstName}
                        placeholder={t('first_name')}
                        onChangeText={text => {
                            setFirstName(text);
                        }}
                    />
                    <InputField
                        isProhibitCN={false}
                        value={lastName}
                        placeholder={t('last_name')}
                        onChangeText={text => {
                            setLastName(text);
                        }}
                    />

                    <SelectCountry
                        selectedValue={country}
                        iconUrl={countryImage}
                        title={country || t('auth_select_country')}
                        style={{ width: '100%', marginTop: scaleSize(20) }}
                        onSelect={handleSelect}
                        data={countryList}
                        disabled={false}
                        defaultSelected={countryId}
                    />

                    <InputField
                        keyboardType="number-pad"
                        value={phoneNum}
                        leftChirdren={
                            countryCode && <TextInner style={styles.text}>+{countryCode}</TextInner>
                        }
                        placeholder={t('auth_phone_number')}
                        onChangeText={text => {
                            setPhoneNum(text);
                        }}
                    />

                    <InputField
                        value={code}
                        RightChirdren={
                            <CountDownTime
                                phoneNum={phoneNum.trim()}
                                type={SendType.TYPE_REGISTER}
                                country_id={countryId}
                            />
                        }
                        placeholder={t('auth_verification_code')}
                        onChangeText={setCode}
                    />

                    <InputField
                        value={newPassWord}
                        secureTextEntry={true}
                        placeholder={t('auth_input_password')}
                        onChangeText={text => {
                            setNewPassWord(text.trim());
                        }}
                    />

                    <InputField
                        value={againPassWord}
                        secureTextEntry={true}
                        placeholder={t('auth_confirm_password')}
                        onChangeText={text => {
                            setAgainPassWord(text.trim());
                        }}
                    />

                    <InputField
                        value={invitation}
                        placeholder={t('auth_invitation_code')}
                        onChangeText={text => {
                            setInvitation(text);
                        }}
                    />

                    {/* <Privavacy martop={scaleSize(50)} /> */}
                </View>
                <TextInner style={styles.warning}>{t('auth_invitation_tip')}</TextInner>
            </KeyboardAwareScrollView>
            <View style={[COMMON_STYLES.center, styles.bottom]}>
                <View style={[COMMON_STYLES.flexRow, { marginBottom: scaleSize(20) }]}>
                    <TextInner style={{ fontSize: scaleSize(12) }}>
                        {t('auth_already_account')}
                    </TextInner>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('LoginScreen');
                        }}
                        style={{ marginLeft: scaleSize(5) }}
                    >
                        <TextInner style={styles.signIn}>{t('auth_login_sign_in')}</TextInner>
                    </TouchableOpacity>
                </View>

                <Button
                    disabled={!disabledBtn()}
                    title={t('auth_sign_up')}
                    onPress={onClick}
                    style={styles.textBottom}
                    textStyle={undefined}
                />
            </View>
        </DefaultView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    innerView: {
        paddingHorizontal: scaleSize(16),
    },
    topView: {
        paddingVertical: scaleSize(24),
    },
    textIner: {
        marginTop: scaleSize(10),
        fontWeight: '600',
        fontSize: FONT_SIZES.small,
    },
    country: {
        marginTop: scaleSize(18),
    },
    input: {
        borderRadius: BORDER_RADIUS.medium,
        width: '100%',
        paddingVertical: scaleSize(8),
        borderWidth: 1,
        paddingRight: scaleSize(10),
        paddingLeft: scaleSize(10),
        borderColor: COLORS.lineColor,
    },
    text: {
        marginRight: scaleSize(10),
    },
    textBottom: {
        width: '90%',
    },
    bottom: {
        marginBottom: DEFAULT_BOTTOM_SPACE,
    },
    signIn: {
        color: COLORS.link,
        fontSize: scaleSize(12),
        textDecorationLine: 'underline',
    },
    warning: {
        marginTop: scaleSize(8),
        fontSize: scaleSize(12),
        marginHorizontal: scaleSize(16),
        color: COLORS.primaryYellow,
    },
});

export default RegisterScreen;
