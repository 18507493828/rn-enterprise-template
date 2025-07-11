import { createStore } from 'zustand/vanilla';

interface MethodState {
    token?: string; //用户token
    currency: string; //钱的单位
    getToken?: () => void;
    userInfo?: Record<string, any>; //用户信息
    setUserInfo: (result: Record<string, any>) => void;
    setCurrency: (currency: string) => void;
}

const UserStore = createStore<MethodState>(set => ({
    token: '',
    currency: '',
    userInfo: {},
    getToken: () => {},
    setCurrency: str => set(() => ({ currency: str })),
    setUserInfo: info => set(() => ({ userInfo: info })),
}));

export default UserStore;
