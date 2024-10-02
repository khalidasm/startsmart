import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import i18n from 'i18next';

export enum LANGUAGE_OPTIONS {
    ARABIC = "ar",
    ENGLISH = "en",
}

interface LanguageState {
    language: LANGUAGE_OPTIONS;
    changeLanguage: (newLanguage: LANGUAGE_OPTIONS) => Promise<void>;
}


export const useLanguageStore = create<LanguageState>()(
    persist(
        (set) => ({
            language: LANGUAGE_OPTIONS.ARABIC,
            changeLanguage: async (newLanguage: LANGUAGE_OPTIONS) => {
                try {
                    await i18n.changeLanguage(newLanguage);
                    document.documentElement.lang = newLanguage;
                    document.documentElement.dir = newLanguage === LANGUAGE_OPTIONS.ARABIC ? 'rtl' : 'ltr';
                    set({ language: newLanguage });
                } catch (error) {
                    console.error('Failed to change language:', error);
                }
            },
        }),
        {
            name: 'language-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

const initializeLanguage = async () => {
    const { language, changeLanguage } = useLanguageStore.getState();
    await changeLanguage(language);
};

initializeLanguage();

export const useLanguage = (): LanguageState => useLanguageStore();

export default useLanguage;