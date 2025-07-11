import { Images } from '@assets/images';
import { COLORS, FONT_SIZES } from '@common/CommonStyle';
import Button from '@components/Button';
import Icon from '@components/Icon';
import StepView from './StepView';
import { scaleSize } from '@utils/ScreenUtil';
import ShowBalanceView from '@view/module/home/core/ShowBalanceView';
import React, { useEffect, useState } from 'react';
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
    Modal,
    Dimensions,
    Platform,
    NativeModules,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUserState } from '@lib/zustand';
import FirstGuideStorage from '@business/storage/FirstGuideStorage';

const GuideModal = ({ pageY }) => {
    const [isVisible, setIsVisible] = useState(false); //控制引导页显示或者不显示
    const [step, setStep] = useState(1);
    const { userInfo } = useUserState();
    // 获取安全区域
    const insets = useSafeAreaInsets();

    useEffect(() => {
        //检测是否首次使用APP
        checkFirstUseApp();
    }, []);

    //modal 消失重置初始状态
    const reset = () => {
        setIsVisible(false);
        setTimeout(() => {
            setStep(1);
        }, 500);
    };
    //安卓非全面屏适配
    const getNavigationBarHeight = () => {
        if (
            Platform.OS === 'android' &&
            parseInt(NativeModules.PlatformConstants.Version, 10) <= 29
        ) {
            const { height } = Dimensions.get('screen');
            const { height: windowHeight } = Dimensions.get('window');
            return height - windowHeight;
        }
        return 0;
    };
    const BOTTOM_OFFSET = insets.bottom + scaleSize(20) + getNavigationBarHeight();

    /**
     * 首次使用APP
     */
    const checkFirstUseApp = async () => {
        const isFirstLauch = await FirstGuideStorage.getInfo();
        if (!isFirstLauch) {
            setIsVisible(true);
            // 首次登录
            await FirstGuideStorage.save(true);
        }
    };

    return (
        <View style={styles.container}>
            {/* Modal 组件 */}
            <Modal
                statusBarTranslucent
                animationType="fade" // 设置动画效果
                transparent={true} // 设置背景透明
                visible={isVisible && pageY !== 0} // 控制 Modal 显示与隐藏
            >
                {/* Modal 内容 */}
                <TouchableOpacity activeOpacity={1} style={[styles.modalView]}>
                    {step == 1 && (
                        <View
                            style={[
                                styles.stepOneFlex,
                                {
                                    marginTop: pageY,
                                },
                            ]}
                        >
                            {/* <View style={styles.parentOneView}> */}
                            <Button
                                title="Chat"
                                style={styles.chatBtn}
                                textStyle={styles.chatBtnText}
                                icon="chat"
                                iconColor={COLORS.primary}
                            />
                            <Icon
                                style={{ marginRight: scaleSize(25) }}
                                name={'drop-up1-copy'}
                                size={scaleSize(16)}
                                color={'#fff'}
                            />

                            <StepView
                                style={{ marginTop: -scaleSize(3) }}
                                nextStep={() => {
                                    setStep(2);
                                }}
                                dissMissModal={reset}
                                title="Contact the dedicated customer service through this channel."
                                stepTitle="1/4"
                            />
                        </View>
                    )}

                    {step == 2 && (
                        <View style={[styles.stepTwoFlex, { marginTop: pageY + scaleSize(77) }]}>
                            <View style={styles.stepBalance}>
                                <ShowBalanceView
                                    userInfo={userInfo}
                                    isShow={true}
                                    marginBottom={scaleSize(6)}
                                />
                            </View>

                            <Icon
                                style={{ marginLeft: scaleSize(25) }}
                                name={'drop-up1-copy'}
                                size={scaleSize(16)}
                                color={'#fff'}
                            />
                            <StepView
                                style={{ marginTop: -scaleSize(3) }}
                                nextStep={() => {
                                    setStep(3);
                                }}
                                dissMissModal={reset}
                                title="Here is the balance of your wallet"
                                stepTitle="2/4"
                            />
                        </View>
                    )}

                    {step == 3 && (
                        <View style={[styles.bottomThree, { marginBottom: BOTTOM_OFFSET }]}>
                            <View style={styles.stepThreeFlex}>
                                <StepView
                                    nextStep={() => {
                                        setStep(4);
                                    }}
                                    dissMissModal={reset}
                                    title="You can also click to sell here, there is rate calculator sell section."
                                    stepTitle="3/4"
                                />
                                <Icon
                                    style={{ marginTop: -scaleSize(6) }}
                                    name={'drop-down1'}
                                    size={scaleSize(16)}
                                    color={'#fff'}
                                />

                                <View style={styles.parentView}>
                                    <Image
                                        style={styles.image}
                                        source={Images.sell_icon}
                                        // size={scaleSize(50)}
                                        // color={'#fff'}
                                    />
                                </View>
                            </View>
                        </View>
                    )}

                    {step == 4 && (
                        <View style={[styles.bottomFour, { marginBottom: BOTTOM_OFFSET }]}>
                            <View style={styles.stepFourFlex}>
                                <StepView
                                    dissMissModal={reset}
                                    buttonTextTitle={'OK'}
                                    nextStep={reset}
                                    title="Click here to learn about profit records and withdrawal records"
                                    stepTitle="4/4"
                                />
                                <Icon
                                    style={styles.fourCorner}
                                    name={'drop-down1'}
                                    size={scaleSize(16)}
                                    color={'#fff'}
                                />
                                <View style={[styles.parentView, { marginRight: scaleSize(10) }]}>
                                    <Image style={styles.image} source={Images.transaction_icon} />
                                </View>
                            </View>
                        </View>
                    )}
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        flex: 1,
        paddingHorizontal: scaleSize(16),
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', // 半透明背景
    },
    modalText: {
        fontSize: 20,
        color: 'white',

        marginBottom: 20,
    },
    title: {
        fontSize: scaleSize(12),
    },
    bottomView: {
        marginTop: scaleSize(12),
    },
    stepOneFlex: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    stepTwoFlex: {
        // justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    stepThreeFlex: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepFourFlex: {
        alignItems: 'flex-end',
    },
    skip: {
        color: COLORS.link,
        marginRight: scaleSize(10),
    },
    fourCorner: {
        marginTop: -scaleSize(6),
        marginRight: scaleSize(30),
    },
    bottomFour: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        // marginBottom: scaleSize(40),
    },
    bottomThree: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        // marginBottom: scaleSize(40),
    },
    parentOneView: {
        marginTop: scaleSize(10),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: scaleSize(4),
        backgroundColor: '#fff',
        width: scaleSize(68),
        paddingVertical: scaleSize(10),
    },
    parentView: {
        marginTop: scaleSize(10),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: scaleSize(30),
        width: scaleSize(60),
        height: scaleSize(60),
    },
    chatBtn: {
        width: scaleSize(68),
        paddingVertical: scaleSize(10),
        backgroundColor: '#fff',
        borderRadius: 4,
        marginBottom: scaleSize(10),
    },
    chatBtnText: { fontSize: FONT_SIZES.xSmall, color: COLORS.primary, fontWeight: 'bold' },
    stepBalance: {
        backgroundColor: '#fff',
        width: scaleSize(132),
        paddingTop: scaleSize(6),
        paddingLeft: scaleSize(10),
        justifyContent: 'center',
        borderRadius: scaleSize(8),
    },
    image: {
        width: scaleSize(36),
        height: scaleSize(36),
    },
});

export default GuideModal;
