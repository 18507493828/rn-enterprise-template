import DefaultView from '@components/DefaultView';
import Hud from '@components/Hud';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewScreen = ({ navigation, route }) => {
    const { url, title, content } = route.params;
    const [webTitle, setWebTitle] = useState(title);
    const [key, setKey] = useState(0);


    const reloadWebView = () => {
        setKey(prevKey => prevKey + 1); // 重新生成 key，第一次加载不成功 就强制 WebView 重新加载
    };

    useEffect(() => {
        // 设置自定义的 导航头
        navigation.setOptions({
            title: webTitle,
        });
    }, [navigation, webTitle]);

    const jsCode = `window.ReactNativeWebView.postMessage(document.title);`;

    return (
        <DefaultView style={styles.container}>
            <WebView
                key={key}
                cacheEnabled
                allowUniversalAccessFromFileURLs
                scalesPageToFit
                javaScriptEnabled
                domStorageEnabled
                originWhitelist={['*']}
                onError={reloadWebView}
                onLoadStart={() => {
                    Hud.show();
                }}
                onLoadProgress={({ nativeEvent }) => {
                    if (nativeEvent.progress > 0) {
                        Hud.hide();
                    }
                }}
                source={url ? { uri: url } : { html: content }}
                injectedJavaScript={jsCode} // 执行 JS 获取标题
                onMessage={event => setWebTitle(event.nativeEvent.data)}
            />
        </DefaultView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default WebViewScreen;
