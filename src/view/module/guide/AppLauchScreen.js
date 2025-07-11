import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import { Images } from '@assets/images';
import { CommonActions } from '@react-navigation/native';
import { ClickableItem, DefaultView } from '@components/index';
import { scaleSize } from '@utils/ScreenUtil';
import {
    BORDER_RADIUS,
    DEFAULT_BOTTOM_SPACE,
    DEFAULT_CONTAINER_SPACE,
    DEFAULT_TOP_SPACE,
} from '@common/CommonStyle';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FirstLanchAppStorage } from '@business/storage';
import { interpolate, Extrapolation, useSharedValue } from 'react-native-reanimated';
import { INIT_ROUTE_NAME } from '@navigation/router';

const data = [{ imageNameSource: Images.splash_screen }];

const AppLauchScreen = ({ navigation }) => {
    const { height, width } = Dimensions.get('window');
    const insets = useSafeAreaInsets();
    const progress = useSharedValue(0);
    const [buttonTitle, setButtonTitle] = useState('5s');

    let interval;

    //开始倒计时
    const startInterVal = () => {
        let count = 5;
        interval = setInterval(() => {
            count -= 1;
            if (count <= 0) {
                setButtonTitle('0s');
                goToHome();
                clearInterval(interval);
            } else {
                setButtonTitle(`${count}s`);
            }
        }, 1000);
    };

    useEffect(() => {
        startInterVal();
        return () => {
            clearInterval(interval);
        };
    }, []);

    const ref = useRef(null);

    const onPressPagination = index => {
        ref.current?.scrollTo({
            count: index - progress.value,
            animated: true,
        });
    };

    const renderItem = ({ item, index }) => {
        return (
            <Image
                source={item.imageNameSource}
                style={{ height, width }}
                resizeMode="cover" // 图片覆盖填充模式
            />
        );
    };

    const goToHome = () => {
        FirstLanchAppStorage.save(INIT_ROUTE_NAME);
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'MainScreen' }],
            }),
        );
    };

    return (
        <DefaultView statusBarColor={'#F2FEFF'} style={styles.container}>
            <Carousel
                loop={false}
                ref={ref}
                width={width}
                height={height}
                data={data}
                renderItem={renderItem}
                onProgressChange={progress}
            />
            {data.length > 1 && (
                <View style={styles.dotStyle}>
                    <Pagination.Custom
                        dotStyle={styles.defaultDotStyle}
                        activeDotStyle={styles.defaultActiveDotStyle}
                        containerStyle={styles.defaultPaginationStyle}
                        progress={progress}
                        data={data}
                        onPress={onPressPagination}
                        customReanimatedStyle={(progress, index, length) => {
                            let val = Math.abs(progress - index);
                            if (index === 0 && progress > length - 1) {
                                val = Math.abs(progress - length);
                            }
                            return {
                                transform: [
                                    {
                                        translateY: interpolate(
                                            val,
                                            [0, 1],
                                            [0, 0],
                                            Extrapolation.CLAMP,
                                        ),
                                    },
                                ],
                            };
                        }}
                    />
                </View>
            )}

            <ClickableItem
                text={buttonTitle}
                textStyle={styles.btnText}
                style={[styles.button, { top: insets.top + DEFAULT_TOP_SPACE }]}
                onPress={() => {
                    goToHome();
                }}
            />
        </DefaultView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btnText: {
        color: '#fff',
    },
    button: {
        backgroundColor: 'rgba(0,0,0,0.5)', // 半透明背景
        width: scaleSize(46),
        paddingVertical: scaleSize(5),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: BORDER_RADIUS.large,
        position: 'absolute',
        right: DEFAULT_CONTAINER_SPACE,
    },
    dotStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        bottom: DEFAULT_BOTTOM_SPACE * 2,
    },
    defaultDotStyle: {
        borderRadius: 3,
        width: 10,
        height: 5,
        backgroundColor: '#B6B6B6',
    },
    defaultActiveDotStyle: {
        borderRadius: 3,
        width: 10,
        height: 5,
        backgroundColor: 'black',
    },
    defaultPaginationStyle: {
        gap: 10,
        marginBottom: 10,
        alignItems: 'center',
        height: 10,
    },
});

export default AppLauchScreen;
