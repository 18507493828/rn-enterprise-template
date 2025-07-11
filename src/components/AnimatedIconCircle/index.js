import React from 'react';
import { View } from 'react-native';
import { TextInner } from '@components/index';
import AnimatedOverlayView from './AnimatedOverlayView';

const AnimatedIconCircle = ({ name, animatedBackground, animatedColor }) => {
    return (
        <AnimatedOverlayView
            style={{ width: 48, height: 48, borderRadius: 24 }}
            animatedBackground={animatedBackground}
            opacity={0.12} // 保持透明度
        >
            <TextInner
                useIconFont
                useAnimated
                iconName={name}
                style={[animatedColor, { fontSize: 30 }]}
            />
        </AnimatedOverlayView>
    );
};

export default AnimatedIconCircle;
