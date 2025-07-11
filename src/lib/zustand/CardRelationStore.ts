import { createStore } from 'zustand/vanilla';

interface MethodState {
    cardList?: Record<string, any>[]; //卡片数组
    setCardList: (result: Record<string, any>[]) => void;
}

const CardRelationStore = createStore<MethodState>(set => ({
    cardList: [],
    setCardList: list => set(() => ({ cardList: list })),
}));

export default CardRelationStore;
