import React from 'react';
import { View, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { Icon, TextInner } from '@components/index';
import { scaleSize } from '@utils/ScreenUtil';

const { width } = Dimensions.get('window');

const NumericKeyboard = ({
    onKeyPress,
    onDelete,
    style,
    buttonStyle,
    buttonTextStyle,
    renderKey,
}) => {
    const defaultKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'delete'];

    const handleKeyPress = key => {
        if (key === 'delete') {
            onDelete && onDelete();
        } else if (key !== '') {
            onKeyPress && onKeyPress(key);
        }
    };

    const renderButton = (key, index) => {
        if (renderKey) {
            return renderKey(key, index, handleKeyPress);
        }

        const isDeleteKey = key === 'delete';

        return (
            <TouchableHighlight
                key={index}
                style={[styles.button, buttonStyle]}
                underlayColor="#E0E0E0" // 按下时的反馈颜色
                onPress={() => handleKeyPress(key)}
            >
                <View style={styles.centerContent}>
                    {isDeleteKey ? (
                        <Icon name="backspace" size={30} color="#333" />
                    ) : (
                        <TextInner style={[styles.buttonText, buttonTextStyle]}>{key}</TextInner>
                    )}
                </View>
            </TouchableHighlight>
        );
    };

    return (
        <View style={[styles.container, style]}>
            {defaultKeys.map((key, index) => renderButton(key, index))}
        </View>
    );
};

NumericKeyboard.propTypes = {
    onKeyPress: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    style: PropTypes.object,
    buttonStyle: PropTypes.object,
    buttonTextStyle: PropTypes.object,
    renderKey: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        backgroundColor: '#FFF', // 背景色白色
    },
    button: {
        width: '33.33%', // 每行三个按钮，占屏幕宽度的三分之一
        minHeight: scaleSize(54), // 固定高度
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF', // 按钮背景色白色
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1, // 确保内容垂直水平居中
    },
    buttonText: {
        fontSize: 24,
        color: '#333',
        textAlign: 'center', // 文本水平居中
    },
});

export default NumericKeyboard;
