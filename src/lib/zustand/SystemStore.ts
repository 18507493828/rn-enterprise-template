import { createStore } from 'zustand/vanilla';

interface MethodState {
    noticeNumber?: number; //消息数量
    setNoticeNumber: (num: number) => void;
}

const SystemStore = createStore<MethodState>(set => ({
    noticeNumber: 0,
    setNoticeNumber: num => set(() => ({ noticeNumber: num })),
}));

export default SystemStore;
