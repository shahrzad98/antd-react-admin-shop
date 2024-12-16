import { GeneralTranslate, TranslateContext } from '@src/shared/models';

export interface LegalCondition {
  id: number;
  description: string;
  translate: GeneralTranslate[] | TranslateContext;
}

export interface LegalConditionForShow extends Pick<LegalCondition, 'description'> {
  translate: TranslateContext;
}
