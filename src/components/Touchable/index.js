import React, { useCallback, useRef } from 'react';
import { TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';

const Touchable = ({ children, onPress, type = 'opacity', delay = 300, ...props }) => {
    let TouchableComponent;
    const lastPressTimeRef = useRef(0);

    switch (type) {
        case 'highlight':
            TouchableComponent = TouchableHighlight;
            break;
        case 'withoutFeedback':
            TouchableComponent = TouchableWithoutFeedback;
            break;
        case 'opacity':
        default:
            TouchableComponent = TouchableOpacity;
            break;
    }

    // 防抖处理快速点击
    const handlePress = useCallback(() => {
        const now = Date.now();
        if (now - lastPressTimeRef.current < delay) {
            return; // 忽略过快的连续点击
        }
        lastPressTimeRef.current = now; // 更新上次点击时间
        onPress?.();
    }, [onPress, delay]);

    return (
        <TouchableComponent onPress={handlePress} {...props}>
            {children}
        </TouchableComponent>
    );
};

export default Touchable;
