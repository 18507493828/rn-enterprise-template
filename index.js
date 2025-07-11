import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { TextEncoder, TextDecoder } from 'text-encoding';
import { useTextScalingDisabled } from '@components/GlobalFontScaling';

//全局禁用text随系统字体大小缩放
useTextScalingDisabled();

if (typeof global.TextDecoder === 'undefined') {
    global.TextDecoder = TextDecoder;
}
if (typeof global.TextEncoder === 'undefined') {
    global.TextEncoder = TextEncoder;
}

AppRegistry.registerComponent(appName, () => App);
