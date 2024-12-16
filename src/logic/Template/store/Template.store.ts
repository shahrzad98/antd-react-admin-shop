import { createSlice } from '@reduxjs/toolkit';
import { LandingTemplate } from '@src/model/Template.model';
import { GlobalSingleStore } from '@src/shared/models';
import { Reducer } from '@src/shared/utils/reducer.service';

import { getTemplatesForLanding } from '../controller/Template.controller';

export type TemplateStore = GlobalSingleStore<LandingTemplate>;

const initialState: TemplateStore = {
  item: null,
  error: null,
  isPending: false,
};

const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    Reducer<LandingTemplate, TemplateStore>(builder, getTemplatesForLanding, { stateHandler: 'single' });
  },
});

export default templateSlice;
