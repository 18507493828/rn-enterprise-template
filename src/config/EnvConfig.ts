import { Platform } from 'react-native';
import Config from 'react-native-config';

export const extendedConfig = { baseURL: Config.API_URL };

export const isDebugMode = Config.IS_DEBUGMODE === 'true';

export const isBaseurlEditable = Config.IS_BASEURL_EDITABLE === 'true';

export const appStoreUrl = Platform.OS === 'android' ? Config.ANDROID_APP_URL : Config.IOS_APP_URL;
