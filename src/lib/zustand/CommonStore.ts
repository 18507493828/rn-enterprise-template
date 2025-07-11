import { createStore } from 'zustand/vanilla';

interface MethodState {
    countryList?: []; //国家信息
    setCountryList: (arr: []) => void;
    defaultCountryData?: {}; //默认国家信息
    setDefaultCountryData: (data: object) => void;
}

const CommonStore = createStore<MethodState>(set => ({
    countryList: [],
    defaultCountryData: {},
    setDefaultCountryData: data => set(() => ({ defaultCountryData: data })),
    setCountryList: arr => set(() => ({ countryList: arr })),
}));

export default CommonStore;
