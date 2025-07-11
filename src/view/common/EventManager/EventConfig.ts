import { EVENT_NAMES } from './EventNames';
import appStateChangeEvent from './global/AppStateChangeEvent';
import networkChangeEvent from './global/NetworkChangeEvent';
import logoutEvent from './global/LogoutEvent';

// 定义所有的事件名
export interface EventMapping {
    appStateChangeEvent: (nextAppState: string) => void;
    networkChangeEvent: (state: any) => void;
    logoutEvent: (options: any) => void;
}

export const EventMappging: EventMapping = {
    [EVENT_NAMES.APP_STATE_CHANGE]: appStateChangeEvent,
    [EVENT_NAMES.NETWORK_CHANGE]: networkChangeEvent,
    [EVENT_NAMES.LOGOUT]: logoutEvent,
};

// 特殊事件需要添加到白名单，避免遍历注册
export const NO_REGISTER_EMITTER_LIST = ['appStateChangeEvent', 'networkChangeEvent'];
