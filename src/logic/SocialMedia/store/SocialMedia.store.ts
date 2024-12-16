import { createSlice } from '@reduxjs/toolkit';
import { SocialMediaModel } from '@src/model/SocialMedia.model';
import { GlobalListStore } from '@src/shared/models';
import { Reducer } from '@src/shared/utils/reducer.service';

import { getSocialMedias } from '../controller/SocialMedia.controller';

export type SocialMediaStore = GlobalListStore<SocialMediaModel>;

const initialState: SocialMediaStore = {
  items: [],
  error: null,
  isPending: false,
};

const socialMediaSlice = createSlice({
  name: 'socialMedia',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    Reducer<SocialMediaModel[], SocialMediaStore>(builder, getSocialMedias, { stateHandler: 'multi' });
  },
});

export default socialMediaSlice;
