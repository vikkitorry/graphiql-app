import { createContext } from 'react';
import { translationData } from './translationData/translationData';

export type Language = 'ru' | 'en';

export interface ITranslatorData {
  en: Record<string, string>;
  ru: Record<string, string>;
}

export type TranslatorContext = {
  lang: Language;
  setLang?: (lang: Language) => void;
  data: ITranslatorData;
};

export const TranslatorContext = createContext<TranslatorContext>({
  lang: 'en',
  data: translationData,
});
