import { FONT_SIZES } from '@common/CommonStyle';
import { scaleSize } from '@utils/ScreenUtil';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type PasswordInputProps = {
    length?: number; // 密码长度，默认为 4
    value?: string; // 当前密码值
    error?: string; // 错误提示信息
    onChange?: (value: string) => void; // 密码变化的回调
    onComplete?: (value: string) => void; // 密码输入完成的回调
};

const PasswordInput: React.FC<PasswordInputProps> = ({ length = 4, value = '', error = '' }) => {
    const handlePressBox = () => {
        // 用于触发外部键盘
        console.log('Box pressed, show keyboard');
    };

    return (
        <View style={styles.container}>
            {/* 密码框 */}
            <View style={styles.passwordContainer}>
                {Array.from({ length }).map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.box,
                            // value.length > index && styles.boxFilled,
                            error && styles.boxError,
                        ]}
                        activeOpacity={0.7}
                        onPress={handlePressBox} // 触发外部键盘逻辑
                    >
                        <Text style={styles.boxText}>{value.length > index ? '●' : ''}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* 错误提示 */}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    passwordContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // width: '80%',
        marginBottom: 10,
    },
    box: {
        width: scaleSize(39),
        height: scaleSize(39),
        borderWidth: 1,
        borderColor: '#CCC',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: '#FFF',
        marginHorizontal: scaleSize(6),
    },
    boxFilled: {
        borderColor: '#000',
    },
    boxError: {
        borderColor: '#FF0000',
    },
    boxText: {
        fontSize: FONT_SIZES.xSmall,
    },
    errorText: {
        fontSize: 14,
        color: '#FF0000',
        marginBottom: scaleSize(10),
    },
});

export default PasswordInput;
