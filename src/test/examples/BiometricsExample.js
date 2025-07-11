import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

export default function BiometricsExample() {
    const rnBiometrics = new ReactNativeBiometrics();

    // 检查生物识别支持
    const checkBiometricSupport = async () => {
        const { available, biometryType } = await rnBiometrics.isSensorAvailable();
        if (available) {
            if (biometryType === ReactNativeBiometrics.Biometrics) {
                Alert.alert('支持生物识别 (指纹或面容ID)');
            } else if (biometryType === ReactNativeBiometrics.TouchID) {
                Alert.alert('支持 Touch ID');
            } else if (biometryType === ReactNativeBiometrics.FaceID) {
                Alert.alert('支持 Face ID');
            } else {
                Alert.alert('未知的生物识别类型');
            }
        } else {
            Alert.alert('设备不支持生物识别');
        }
    };

    // 进行生物识别验证
    const performBiometricAuth = async () => {
        const { success } = await rnBiometrics.simplePrompt({ promptMessage: '验证您的身份' });

        if (success) {
            Alert.alert('身份验证成功');
        } else {
            Alert.alert('身份验证失败');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>生物识别示例</Text>
            <Button title="检查生物识别支持" onPress={checkBiometricSupport} />
            <Button title="执行生物识别验证" onPress={performBiometricAuth} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});
