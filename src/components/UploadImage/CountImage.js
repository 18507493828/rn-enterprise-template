import { scaleSize } from '@utils/ScreenUtil';
import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { BORDER_RADIUS } from '@common/CommonStyle';
const CountImage = ({ onPress, imgW, data }) => {
    const { imgUri, count } = data;
    return (
        <TouchableOpacity style={{ width: imgW + 8, height: imgW + 8 }} onPress={onPress}>
            <Image
                source={{ uri: imgUri }}
                style={[
                    styles.image,
                    {
                        width: imgW,
                        height: imgW,
                    },
                ]}
            />
            <View style={[styles.countView, { width: imgW, height: imgW }]}>
                <Text style={styles.countText}>+{count}</Text>
            </View>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    countText: {
        color: 'white',
        fontSize: 15,
        alignSelf: 'center',
    },
    image: {
        borderRadius: BORDER_RADIUS.medium,
        marginTop: 6,
        marginLeft: 10,
    },
    countView: {
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: BORDER_RADIUS.medium,
        marginTop: 6,
        marginLeft: 10,
    },
});

export default CountImage;
