import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { DefaultView } from '@components/index';
import { scaleSize } from '@utils/ScreenUtil';
import { COLORS } from '@common/CommonStyle';
import Config from 'react-native-config';
import { TextInner, Icon } from '@components/index';
import { FlatList } from 'react-native-actions-sheet';
import SDK from '@jssdk/index';
import RootNavigation from '@navigation/RootNavigation';
const SwitchBaseUrl = () => {
    //config无法读取env其他环境
    const urlList = [
        { url: 'http://192.168.5.90:3000/api/', text: 'pro' },
        { url: 'http://192.168.5.90:3000/api/', text: 'pre' },
        { url: 'http://192.168.5.90:3000/api/', text: 'staging' },
        { url: 'http://192.168.5.90:3000/api/', text: 'dev' },
    ];
    const updatedUrlList = useMemo(() => {
        return urlList.map(item => ({
            ...item,
            isSelect: item.url === Config.API_URL,
        }));
    }, [Config.updatedUrlList]);
    const RenderItem = item => {
        return (
            <TouchableOpacity
                style={styles.itemView}
                onPress={() => {
                    SDK.updateBaseConfig({ baseURL: item.url });
                    RootNavigation.goBack();
                }}
            >
                <TextInner style={styles.nameText}>
                    {item?.url}({item.text})
                </TextInner>
                {item.isSelect && (
                    <Icon
                        name={'check-circle'}
                        size={16}
                        color={COLORS.primary}
                        style={styles.selectIcon}
                    />
                )}
            </TouchableOpacity>
        );
    };
    return (
        <DefaultView style={styles.container}>
            <FlatList
                data={updatedUrlList}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.url}
                renderItem={({ item }) => RenderItem(item)}
            />
        </DefaultView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    itemView: {
        backgroundColor: '#f4f4f4',
        height: scaleSize(30),
        margin: scaleSize(10),
        flexDirection: 'row',
    },
    nameText: {
        alignSelf: 'center',
        marginLeft: scaleSize(10),
        marginRight: scaleSize(10),
    },
    selectIcon: {
        alignSelf: 'center',
    },
});

export default SwitchBaseUrl;
