import { createStore } from 'zustand/vanilla';

interface MethodState {
    inComeresult?: Record<string, any>; //收入详情数据
    setInComeResult: (result: Record<string, any>) => void;

    withDrawResult?: Record<string, any>; //提现详情数据
    setWithDrawResult: (result: Record<string, any>) => void;
}

const TranSactionStore = createStore<MethodState>(set => ({
    withDrawResult: {},
    setWithDrawResult: info => set(() => ({ withDrawResult: info })),
    inComeresult: {},
    setInComeResult: info => set(() => ({ inComeresult: info })),
}));

export default TranSactionStore;
