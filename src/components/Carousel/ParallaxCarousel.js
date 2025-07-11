import React from 'react';
import { StyleSheet, View, Dimensions, Platform } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { parallaxLayout } from '@components/Carousel/core/parallax';
import { scaleSize } from '@utils/ScreenUtil';
import ParallaxCarouselItem from './core/ParallaxCarouselItem';

const { width } = Dimensions.get('window');

const ParallaxCarousel = ({
    defaultIndex = 0,
    data,
    progress,
    onProgressChange,
    renderItem,
    style,
    containerStyle,
}) => {
    return (
        <View style={[containerStyle]}>
            <Carousel
                defaultIndex={defaultIndex}
                loop={false}
                width={width * 0.5}
                height={200}
                data={data}
                snapEnabled={true}
                style={[styles.content, style]}
                onProgressChange={(_, absoluteProgress) => {
                    progress.value = absoluteProgress;
                    if (onProgressChange) onProgressChange(absoluteProgress);
                }}
                customAnimation={parallaxLayout(
                    { size: width * 0.6, vertical: false },
                    {
                        parallaxScrollingScale: 1,
                        parallaxAdjacentItemScale: 0.8,
                        parallaxScrollingOffset: 38,
                    },
                )}
                renderItem={({ item, animationValue }) => (
                    <ParallaxCarouselItem
                        item={item}
                        animationValue={animationValue}
                        renderItem={renderItem}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        width,
        height: scaleSize(200),
        justifyContent: 'center',
        alignItems: 'center',
        top: Platform.OS === 'android' ? scaleSize(0) : scaleSize(20),
    },
});

export default ParallaxCarousel;
