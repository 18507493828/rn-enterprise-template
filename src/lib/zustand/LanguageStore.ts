import { create } from 'zustand';
import { getStorage, setStorage } from '@utils/StorageUtil';
import i18n from '../../localization/i18n';

interface LanguageState {
    lang: string;
    setLang: (lang: string) => void;
    initLang: () => Promise<void>;
}

const LanguageStore = create<LanguageState>(set => ({
    lang: 'en',
    setLang: lang => {
        i18n.changeLanguage(lang);
        setStorage('lang', lang);
        set({ lang });
    },
    initLang: async () => {
        const stored = await getStorage('lang');
        const lang = stored || 'en';
        i18n.changeLanguage(lang);
        set({ lang });
    },
}));

export default LanguageStore;
