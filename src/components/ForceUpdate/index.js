import { appStoreUrl } from '@config/EnvConfig';
import { TextInner, Touchable } from '@components/index';
import { scaleSize, SCREEN_WIDTH } from '@utils/ScreenUtil';
import React from 'react';
import { Images } from '@assets/images';
import { View, StyleSheet, Image, Linking } from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import { t } from 'i18next';
let modalInstance = null;

export const showForceUpdateModal = () => {
    if (modalInstance) {
        return;
    }
    const goStore = () => {
        Linking.openURL(appStoreUrl);
    };

    const modal = new RootSiblings(
        (
            <View style={styles.rootContainer}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Image source={Images.forceupdate_icon} style={styles.updateImg} />
                        <TextInner style={styles.title}>{t('force_update_title')}</TextInner>
                        <TextInner style={styles.benefitText}>
                            {t('force_update_content')}
                        </TextInner>

                        <Touchable style={styles.button} onPress={goStore}>
                            <TextInner style={styles.buttonText}>{t('got_it')}</TextInner>
                        </Touchable>
                    </View>
                </View>
            </View>
        ),
    );

    modalInstance = modal;
};

const styles = StyleSheet.create({
    rootContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        elevation: 999,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(29, 32,35, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: SCREEN_WIDTH * 0.85,
        backgroundColor: 'white',
        borderRadius: scaleSize(8),
        padding: scaleSize(24),
        paddingTop: scaleSize(20),
        alignItems: 'center',
        position: 'relative',
    },
    title: {
        fontSize: scaleSize(16),
        color: '#1D2023',
        marginBottom: scaleSize(12),
        marginTop: scaleSize(16),
    },
    benefitText: {
        color: '#666666',
        marginBottom: scaleSize(16),
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#1D2023',
        width: SCREEN_WIDTH * 0.75,
        height: scaleSize(44),
        borderRadius: scaleSize(22),
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: scaleSize(16),
    },
    updateImg: {
        width: scaleSize(128),
        height: scaleSize(128),
    },
});
