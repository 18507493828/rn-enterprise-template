import { Images } from '@assets/images';
import DefaultView from '@components/DefaultView';
import { scaleSize } from '@utils/ScreenUtil';
import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GuideScreen = () => {
    return (
        <DefaultView>
            <LinearGradient colors={['#F9FCFF', '#F8f8f8']} style={styles.linearGradient}>
                <ScrollView
                    contentContainerStyle={styles.content}
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                >
                    <Image source={Images.guide_image} style={styles.image} />
                    <View style={styles.bottomView} />
                </ScrollView>
            </LinearGradient>
        </DefaultView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    linearGradient: {
        flex: 1,
    },
    image: {
        // width: SCREEN_WIDTH,
        flex: 1,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        backgroundColor: 'transparent',
    },
    bottomView: {
        backgroundColor: 'transparent',
        height: scaleSize(40),
    },
});

export default GuideScreen;
