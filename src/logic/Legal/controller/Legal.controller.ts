import { createAsyncThunk } from '@reduxjs/toolkit';

import { LegalConditionForShow } from '@src/model/Legal.model';
import LegalService from '@src/service/Legal.service';
import { normalizeTranslate } from '@src/shared/utils';

export const getLegalsForLegalConditions = createAsyncThunk('Legals/Get', async (name: string) => {
  return await new Promise<LegalConditionForShow>((resolve, reject) => {
    LegalService.getLegal(name)
      .then(({ description, translate }) => {
        resolve({ description, translate: normalizeTranslate(translate) });
      })
      .catch((e) => reject(e));
  });
});

export default { getLegalsForLegalConditions };
