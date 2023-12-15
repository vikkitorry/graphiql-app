import { createContext } from 'react';
import { translationData, translationErrorsData } from './translationData/translationData';

export type Language = 'ru' | 'en';

export interface ITranslatorData {
  en: Record<string, string>;
  ru: Record<string, string>;
}

export type TranslatorContext = {
  lang: Language;
  setLang?: (lang: Language) => void;
  data: ITranslatorData;
  errorsData: ITranslatorData;
};

export const TranslatorContext = createContext<TranslatorContext>({
  lang: 'en',
  data: translationData,
  errorsData: translationErrorsData,
});
