import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Keyboard, DeviceEventEmitter } from 'react-native';
import { Alert, Button, DefaultView, InputField } from '@components/index';
import { scaleSize } from '@utils/ScreenUtil';
import {
    BORDER_RADIUS,
    COLORS,
    COMMON_STYLES,
    DEFAULT_BOTTOM_SPACE,
    DEFAULT_CONTAINER_SPACE,
} from '@common/CommonStyle';
import CommonMethods from '@utils/CommonMethods';
import { useUserState } from '@lib/zustand';
import { regexNumberAndLetter } from '@utils/RegularUtil';
import { EVENT_NAMES } from '@view/common/EventManager/EventNames';
import { LOGOUT_TYPE } from '@jssdk/config/LogoutConstants';
import { userDeleteConfig } from './config/AuthConfig';

const DeleteAccountScreen = () => {
    const { t } = useTranslation();
    const { userInfo } = useUserState();
    const [inputData, setInputData] = useState([]);

    useEffect(() => {
        getProfileEditList();
    }, []);

    const getProfileEditList = async () => {
        const arr = userDeleteConfig();
        arr.map(item => {
            if (item.key == 'Phone') {
                item.showValue = `+` + userInfo?.country?.area_code + ` ${userInfo?.phone}`;
                item.value = userInfo?.phone;
            }
        });
        setInputData([...arr]);
    };
    const confirm = async () => {
        const Phone = inputData.filter(v => v.key == 'Phone')[0].value || '';
        const Password = inputData.filter(v => v.key == 'Password')[0].showValue || '';

        if (inputData.some(v => v.showValue.length == 0)) {
            return CommonMethods.verifyFormWithKey('whole');
        }
        if (!regexNumberAndLetter(Password)) {
            return CommonMethods.verifyFormWithKey('passwordRules');
        }
        DeviceEventEmitter.emit(EVENT_NAMES.LOGOUT, {
            code: LOGOUT_TYPE.ACCOUNT_DELETION,
            phone: Phone,
            password: Password,
        });
    };

    const alertView = () => {
        Alert.show({
            title: t('auth_delete_account_tip'),
            content: t('auth_delete_account_content_tip'),
            onConfirm: confirm,
            onCancel: () => {},
        });
    };

    const isClick = inputData && inputData.filter(it => it.showValue.length > 5).length == 2;

    return (
        <DefaultView style={styles.container} keyboardAvoiding>
            <ScrollView>
                {inputData.map((v, index) => (
                    <View key={index} style={styles.view}>
                        <InputField
                            label={t(v.title)}
                            showClearButton={v.key != 'Phone'}
                            editable={v.key != 'Phone'}
                            value={v.showValue}
                            placeholder={t(v.placeholder)}
                            key={index}
                            secureTextEntry={v.key == 'Password' && !v.show}
                            onChangeText={text => {
                                const arr = inputData;
                                arr.map((item, i) => {
                                    if (i == index) {
                                        item.showValue = text.trim();
                                    }
                                });
                                setInputData([...arr]);
                            }}
                        />
                    </View>
                ))}
            </ScrollView>
            <View style={[COMMON_STYLES.center, styles.button]}>
                <Button
                    disabled={!isClick}
                    title={t('delete')}
                    onPress={() => {
                        if (isClick) {
                            Keyboard.dismiss();
                            alertView();
                        }
                    }}
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
    input: {
        borderRadius: BORDER_RADIUS.small,
        width: '100%',
        height: scaleSize(36),
        borderWidth: 1,
        marginTop: scaleSize(8),
        paddingHorizontal: scaleSize(10),
        borderColor: COLORS.border,
    },
    view: {
        marginTop: scaleSize(20),
        paddingHorizontal: scaleSize(16),
    },
    button: {
        paddingHorizontal: DEFAULT_CONTAINER_SPACE,
        marginBottom: DEFAULT_BOTTOM_SPACE,
    },
});

export default DeleteAccountScreen;
