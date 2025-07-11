import { useStore } from 'zustand';
import UserStore from './UserStore';
import CardRelationStore from './CardRelationStore';
import TranSactionStore from './TranSactionStore';
import CommonStore from './CommonStore';
import SystemStore from './SystemStore';

export const useUserState = () => useStore(UserStore);
export const useCardRelationState = () => useStore(CardRelationStore);
export const useTranSactionState = () => useStore(TranSactionStore);
export const useCommonState = () => useStore(CommonStore);
export const useSystemStore = () => useStore(SystemStore);

export { UserStore, CardRelationStore, TranSactionStore, CommonStore, SystemStore };
