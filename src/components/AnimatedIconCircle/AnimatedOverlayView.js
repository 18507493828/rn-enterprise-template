import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

// 背景是动画，前景层是内容
const AnimatedOverlayView = ({ children, style, opacity = 0.1, animatedBackground }) => {
    return (
        <View
            style={[
                {
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                style,
            ]}
        >
            <Animated.View style={[animatedBackground, style, { opacity }]} />
            <View style={{ position: 'absolute' }}>{children}</View>
        </View>
    );
};

export default AnimatedOverlayView;
