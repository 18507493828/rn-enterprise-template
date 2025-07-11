import { Images } from '@assets/images';
import { scaleSize } from '@utils/ScreenUtil';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { StyleSheet, Image, TouchableOpacity, ViewStyle, ImageStyle } from 'react-native';

type Style = ImageStyle | ViewStyle;

interface Props {
    onClick?: () => void;
    size?: number;
    url?: string;
    isBorderRadius?: boolean;
    borderRadius?: number;
    style?: Style;
    isHead?: boolean; //是否是头像
    isClickable?: boolean; //是否可以点击
}
const CustomImage = (
    {
        isClickable = false,
        style,
        onClick, //图片点击事件
        size = scaleSize(100),
        isBorderRadius = false,
        borderRadius,
        isHead = true,
        url = '', //
    }: Props,
    ref: any,
) => {
    const defalt_head = Images.app_defaultAvatar; //头像默认图片
    const defalt_loading = Images.default_loading; //加载中图片
    const defalt_failed = Images.default_failed; //失败图片
    const noUrlDefaltImage = isHead ? defalt_head : defalt_failed;
    const errorImage = isHead ? defalt_head : defalt_failed;
    const defaltImage = isHead ? defalt_head : defalt_loading;

    const [isError, setIsError] = useState(false); //false 没有错误，true有错误
    const [isLoading, setIsLoading] = useState(url && url?.includes('http') ? true : false);
    const defaultSource = isError ? errorImage : defaltImage;

    //个人上传头像时用到
    useImperativeHandle(ref, () => ({
        upLoadImage: () => {
            setIsError(false);
        },
    }));

    return (
        <TouchableOpacity
            hitSlop={{ left: 20, right: 20, top: 20 }}
            activeOpacity={isLoading || isError ? 1 : 0.8}
            onPress={() => {
                ((url && !isLoading && !isError) || isClickable) && onClick && onClick();
            }}
        >
            {url ? (
                <Image
                    resizeMethod="resize"
                    style={[
                        {
                            borderRadius: isBorderRadius ? size * 0.5 : borderRadius,
                            width: size,
                            height: size,
                        },
                        style,
                    ]}
                    onLoadEnd={() => {
                        setIsLoading(false);
                    }}
                    onError={err => {
                        setIsError(true);
                    }}
                    defaultSource={defaltImage}
                    source={!isLoading && !isError ? { uri: url } : defaultSource}
                />
            ) : (
                <Image
                    style={[
                        {
                            borderRadius: isBorderRadius ? size * 0.5 : borderRadius,
                            width: size,
                            height: size,
                        },
                        style,
                    ]}
                    source={noUrlDefaltImage}
                />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({});

export default forwardRef(CustomImage);
