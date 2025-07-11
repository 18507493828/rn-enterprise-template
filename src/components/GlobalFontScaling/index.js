import { Text, TextInput } from 'react-native';
//全局禁用text随系统字体大小缩放
export const useTextScalingDisabled = () => {
    if (typeof Text.defaultProps === 'undefined') {
        Text.defaultProps = {};
    }
    Text.defaultProps.allowFontScaling = false;

    if (typeof TextInput.defaultProps === 'undefined') {
        TextInput.defaultProps = {};
    }
    TextInput.defaultProps.allowFontScaling = false;
};
