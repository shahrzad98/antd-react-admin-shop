import { createSlice } from '@reduxjs/toolkit';
import { LegalConditionForShow } from '@src/model/Legal.model';
import { GlobalSingleStore } from '@src/shared/models';
import { Reducer } from '@src/shared/utils/reducer.service';

import { getLegalsForLegalConditions } from '../controller/Legal.controller';

export type LegalStore = GlobalSingleStore<LegalConditionForShow>;

const initialState: LegalStore = {
  item: null,
  error: null,
  isPending: false,
};

const legalSlice = createSlice({
  name: 'legal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    Reducer<LegalConditionForShow, LegalStore>(builder, getLegalsForLegalConditions, { stateHandler: 'single' });
  },
});

export default legalSlice;
