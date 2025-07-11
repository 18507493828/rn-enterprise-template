import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
    Button,
    ClickableItem,
    CustomImage,
    DefaultView,
    Hud,
    InputField,
    TextInner,
} from '@components/index';
import { scaleSize } from '@utils/ScreenUtil';
import {
    BORDER_RADIUS,
    COLORS,
    COMMON_STYLES,
    DEFAULT_BOTTOM_SPACE,
    DEFAULT_CONTAINER_SPACE,
    FONT_SIZES,
} from '@common/CommonStyle';
import CountDownTime from './core/CountDownTime';
import Privavacy from './core/Privavacy';
import CommonMethods from '@utils/CommonMethods';
import AuthController from '@business/controller/AuthController';
import LastUserStorage from '@business/storage/LastUserStorage';
import CountryStorage from '@business/storage/CountryStorage';
import { SendType } from '@jssdk/model/mappings/SendMsgMapping';
import {
    ghanaPhoneRegex,
    kenyaPhoneRegex,
    nigeriaPhoneRegex,
    regexNumber,
    regexNumberAndLetter,
    regexVerificationCode,
} from '@utils/RegularUtil';
import SelectCountry from '../sell/core/SelectCountry';
import { CommonActions } from '@react-navigation/native';
import OneSignalInit from '@view/common/OneSignalManager/OneSignalInit';
import { loginChat } from '@view/common/ChatManager';
import { LoginType } from '@jssdk/model/mappings/CommonMapping';
import GlobalConfig from '@config/GlobalConfig';
import DeviceInfo from 'react-native-device-info';
import CommonController from '@business/controller/CommonController';
import { isBaseurlEditable } from '@config/EnvConfig';
import { SIX_NUMBER } from './config/AuthConfig';
import { useTranslation } from 'react-i18next';
import { useCommonState } from '@lib/zustand';
import { getStorage } from '@utils/StorageUtil';

// 类型定义
interface LoginProps {
    navigation: any;
    route: any;
}

interface LoginForm {
    phone: string;
    password: string;
    code: string;
    countryId: any;
}

// 表单初始值
const initialFormState: LoginForm = {
    phone: '',
    password: '',
    code: '',
    countryId: 1,
};

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
    const { t } = useTranslation();
    const { countryList, defaultCountryData } = useCommonState();
    const [form, setForm] = useState<LoginForm>(initialFormState);
    const [isCodeLogin, setIsCodeLogin] = useState(false);
    const [avatar_url, setAvatar_url] = useState('');
    const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false);
    const [countryInfo, setCountryInfo] = useState({
        name: defaultCountryData?.name,
        code: defaultCountryData?.area_code,
        icon: defaultCountryData?.icon,
        id: defaultCountryData?.id,
    });

    useEffect(() => {
        initUserInfo();
    }, []);

    const initUserInfo = async () => {
        const userInfo = await LastUserStorage.getInfo();
        const isPrivacyAccepted = await getStorage('privacy');

        if (Object.keys(userInfo).length !== 0) {
            const countryList = await CountryStorage.getInfo();
            const userCountry = countryList?.find((v: { id: any }) => v.id === userInfo.country_id);
            setAvatar_url(userInfo.avatar_url);
            setCountryInfo({
                name: userCountry?.name || '',
                code: userCountry?.area_code || '',
                icon: userCountry?.icon || '',
                id: userInfo.country_id,
            });
            setForm(prev => ({ ...prev, phone: userInfo.phone }));
        } else {
            const countryData = await CommonController.getCountryList();
            const dictCountry = countryData.filter((v: { name: string }) => v.name == 'NG')[0];
            setCountryInfo({
                name: dictCountry?.name || '',
                code: dictCountry?.area_code || '',
                icon: dictCountry?.icon || '',
                id: dictCountry?.id || 1,
            });
        }
        setIsPrivacyAccepted(!!isPrivacyAccepted);
    };

    const goToRegister = () => {
        navigation.navigate('RegisterScreen');
    };

    const goToForgetPassword = () => {
        navigation.navigate('ResetPasswordScreen');
    };

    const handleSelect = (value: { name: any; area_code: any; icon: any; id: any }) => {
        setCountryInfo({
            name: value.name,
            code: value.area_code,
            icon: value.icon,
            id: value.id,
        });
    };
    //按钮是否可点击
    const disabledBtn = () => {
        return (
            form.phone.trim() &&
            ((form.password.length >= SIX_NUMBER && !isCodeLogin) ||
                (form.code.trim() && isCodeLogin))
        );
    };

    // 表单验证
    const validateForm = () => {
        if (!countryInfo.id) return CommonMethods.verifyFormWithKey('country');
        if (!form.phone.trim()) return CommonMethods.verifyFormWithKey('phoneNum');
        if (isCodeLogin && !form.code.trim()) return CommonMethods.verifyFormWithKey('code');
        if (!isCodeLogin && !form.password) return CommonMethods.verifyFormWithKey('newPassWord');
        if (!isPrivacyAccepted) return CommonMethods.verifyFormWithKey('privacy');
        if (!isCodeLogin && !regexNumberAndLetter(form.password))
            return CommonMethods.verifyFormWithKey('passwordError');
        if (isCodeLogin && !regexVerificationCode(form.code.trim()))
            return CommonMethods.verifyFormWithKey('verificationCode');
        // 手机号格式验证
        const phoneValidators = {
            1: nigeriaPhoneRegex,
            2: ghanaPhoneRegex,
            3: kenyaPhoneRegex,
        } as any;

        if (phoneValidators[countryInfo?.id]?.(form.phone.trim())) {
            return CommonMethods.verifyFormWithKey('correct');
        }

        return true;
    };

    // 登录处理
    const handleLogin = async () => {
        if (!validateForm()) return;
        let newPhoneNum = form.phone;
        if (form.phone.trim().charAt(0) == '0') {
            newPhoneNum = newPhoneNum.substring(1);
        }
        Hud.show();

        const success = await AuthController.pwdLogin({
            phone: newPhoneNum.trim(),
            password: isCodeLogin ? '' : form.password,
            country_id: countryInfo.id,
            verification_code: isCodeLogin ? form.code.trim() : '',
            type: isCodeLogin ? LoginType.TYPE_CODE_LOGIN : LoginType.TYPE_PASSWORD_LOGIN,
            device_id: DeviceInfo.getUniqueIdSync(),
        });
        Hud.hide();
        if (success) {
            OneSignalInit();
            loginChat();
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'MainScreen' }],
                }),
            );
        }
    };

    //跳转隐私政策
    const goToWebView = () => {
        navigation.navigate('WebViewScreen', {
            url: GlobalConfig.userAgreement.privacyPolicyUrl,
            title: '',
            content: '',
        });
    };

    // console.log('countryImage', countryImage);

    return (
        <DefaultView style={styles.container} keyboardAvoiding>
            <ScrollView>
                <View style={styles.containerView}>
                    <View style={[COMMON_STYLES.center, { marginBottom: scaleSize(10) }]}>
                        <CustomImage
                            url={avatar_url}
                            size={scaleSize(60)}
                            isBorderRadius
                            borderRadius={scaleSize(4)}
                        />
                        <TextInner style={styles.textTip}>{t('auth_login_account')}</TextInner>
                    </View>
                    <View style={COMMON_STYLES.center}>
                        <SelectCountry
                            selectedValue={countryInfo.name}
                            iconUrl={countryInfo.icon}
                            title={countryInfo.name || t('auth_select_country')}
                            style={{ width: '100%' }}
                            onSelect={handleSelect}
                            data={countryList}
                            disabled={false}
                            defaultSelected={countryInfo?.id as any}
                            label={''}
                        />
                        <InputField
                            leftChirdren={
                                countryInfo.code ? (
                                    <TextInner style={styles.text}>+{countryInfo.code}</TextInner>
                                ) : null
                            }
                            placeholder={t('auth_phone_number')}
                            keyboardType="number-pad"
                            value={form.phone}
                            onChangeText={text => {
                                if (regexNumber(text)) {
                                    setForm(prev => ({
                                        ...prev,
                                        phone: text,
                                    }));
                                }
                            }}
                        />
                        {isCodeLogin ? (
                            <InputField
                                value={form.code}
                                RightChirdren={
                                    <CountDownTime
                                        phoneNum={form.phone.trim()}
                                        type={SendType.TYPE_LOGIN}
                                        country_id={countryInfo.id}
                                    />
                                }
                                placeholder={t('auth_verification_code')}
                                onChangeText={text => {
                                    setForm(prev => ({
                                        ...prev,
                                        code: text,
                                    }));
                                }}
                            />
                        ) : (
                            <InputField
                                value={form.password}
                                secureTextEntry
                                placeholder={t('auth_input_password')}
                                onChangeText={text => {
                                    setForm(prev => ({
                                        ...prev,
                                        password: text.trim(),
                                    }));
                                }}
                            />
                        )}
                    </View>
                    <View style={[COMMON_STYLES.flexBtwNoScale, { marginTop: scaleSize(20) }]}>
                        <ClickableItem
                            onPress={() => {
                                setIsCodeLogin(!isCodeLogin);
                            }}
                        >
                            <TextInner style={styles.btnText}>
                                {isCodeLogin
                                    ? t('auth_login_password')
                                    : t('auth_login_code_password')}
                            </TextInner>
                        </ClickableItem>

                        <ClickableItem onPress={goToForgetPassword}>
                            <TextInner style={styles.btnText}>
                                {t('auth_login_forgot_password')}
                            </TextInner>
                        </ClickableItem>
                    </View>
                    <Button
                        disabled={!disabledBtn()}
                        title={t('auth_login_sign_in')}
                        onPress={handleLogin}
                        style={styles.buttonStyle}
                        textStyle={undefined}
                    />
                    <View style={[COMMON_STYLES.flexRowCenter, { marginTop: scaleSize(15) }]}>
                        <TextInner style={{ fontSize: scaleSize(12) }}>
                            {t('auth_registered_not_yet')}
                        </TextInner>
                        <ClickableItem style={{ marginLeft: scaleSize(5) }} onPress={goToRegister}>
                            <TextInner style={styles.signBtnText}>{t('auth_sign_up')}</TextInner>
                        </ClickableItem>
                    </View>

                    {/* <ThirdLoginView datas={getThirdLoginConfig()} /> */}

                    <Privavacy
                        martop={scaleSize(30)}
                        selected={isPrivacyAccepted}
                        onSelect={isSelect => {
                            setIsPrivacyAccepted(!isSelect);
                        }}
                        show={GlobalConfig.userAgreement.enable}
                        onPress={goToWebView}
                    />
                    {isBaseurlEditable && (
                        <ClickableItem
                            style={{ marginLeft: scaleSize(5), marginTop: 30 }}
                            onPress={() => {
                                navigation.navigate('BaseUrlScreen', {});
                            }}
                        >
                            <TextInner style={styles.signBtnText}>BaseUrl</TextInner>
                        </ClickableItem>
                    )}
                </View>
            </ScrollView>
        </DefaultView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flex: 1,
    },
    containerView: {
        paddingHorizontal: DEFAULT_CONTAINER_SPACE,
    },
    countryText: {
        marginLeft: scaleSize(5),
        fontSize: scaleSize(12),
    },
    text: {
        marginRight: scaleSize(10),
    },
    textTip: {
        marginTop: scaleSize(20),
        marginBottom: scaleSize(10),
        fontWeight: '600',
        fontSize: FONT_SIZES.small,
    },
    input: {
        borderRadius: BORDER_RADIUS.medium,
        width: '100%',
        paddingVertical: scaleSize(10),
        borderWidth: 1,
        paddingRight: scaleSize(10),
        marginTop: scaleSize(8),
        paddingLeft: scaleSize(10),
        borderColor: COLORS.lineColor,
    },
    buttonStyle: {
        marginTop: scaleSize(50),
    },
    btnText: {
        fontSize: scaleSize(12),
        color: COLORS.link,
        textDecorationLine: 'underline',
    },
    signBtnText: {
        fontSize: scaleSize(14),
        textDecorationLine: 'underline',
        color: COLORS.link,
    },
    codeView: {},
    lineView: {
        height: 0.5,
        backgroundColor: COLORS.border,
        width: '42%',
    },
    iconView: {
        paddingHorizontal: scaleSize(120),
        marginTop: scaleSize(15),
    },
    orText: {
        color: COLORS.secondary,
        marginHorizontal: scaleSize(10),
    },
    versionText: {
        textAlign: 'center',
        fontSize: FONT_SIZES.xSmall,
        color: COLORS.textSecondary,
        marginTop: DEFAULT_BOTTOM_SPACE * 2,
    },
    autoFilledInput: {
        backgroundColor: '#fff', // 改变自动填充时的背景颜色
    },
});

export default LoginScreen;
