import { BORDER_RADIUS, COLORS, COMMON_STYLES } from '@common/CommonStyle';
import Button from '@components/Button';
import TextInner from '@components/TextInner';
import { scaleSize } from '@utils/ScreenUtil';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
    dissMissModal?: () => void;
    nextStep?: () => void;
    title?: string;
    style?: Record<string, any>;
    stepTitle?: string;
    buttonTextTitle?: string;
    skipTitle?: string;
}

const StepView = ({
    style,
    dissMissModal,
    nextStep,
    title,
    stepTitle,
    skipTitle = 'Skip',
    buttonTextTitle = 'next',
}: Props) => (
    <View style={style}>
        <View style={[styles.stepView, style]}>
            <TextInner style={styles.title}>
                {title}
                {/* Contact the dedicated customer service through this channel. */}
            </TextInner>
            <View style={[COMMON_STYLES.flexBtwNoScale, styles.bottomView]}>
                <TextInner style={styles.step}>{stepTitle}</TextInner>
                <View style={COMMON_STYLES.flexRow}>
                    <TextInner
                        style={styles.skip}
                        onPress={() => {
                            dissMissModal && dissMissModal();
                        }}
                    >
                        {skipTitle}
                    </TextInner>
                    <Button
                        onPress={() => {
                            nextStep && nextStep();
                        }}
                        fontSize={scaleSize(12)}
                        paddingVertical={scaleSize(10)}
                        style={{ width: scaleSize(80) }}
                        title={buttonTextTitle}
                    />
                </View>
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    title: {
        fontSize: scaleSize(12),
    },
    stepView: {
        paddingHorizontal: scaleSize(10),
        width: scaleSize(240),
        paddingVertical: scaleSize(18),
        backgroundColor: '#fff',
        borderRadius: BORDER_RADIUS.medium,
    },
    bottomView: {
        marginTop: scaleSize(12),
    },
    stepOneFlex: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    step: {
        fontSize: scaleSize(12),
    },
    skip: {
        color: COLORS.link,
        marginRight: scaleSize(10),
    },
});

export default StepView;
