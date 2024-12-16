import { storeState } from '@config/StoreConfiguration';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SocialMediaModel } from '@src/model/SocialMedia.model';
import SocialMediaService from '@src/service/SocialMedia.service';

export const getSocialMedias = createAsyncThunk('SocialMedias/GetAll', async () => {
  return await new Promise<SocialMediaModel[]>((resolve, reject) => {
    if (storeState().socialMedia.items.length > 0) {
      resolve(storeState().socialMedia.items as SocialMediaModel[]);
    } else {
      SocialMediaService.getSocialMedias()
        .then((data) => {
          resolve(data);
        })
        .catch((e) => reject(e));
    }
  });
});

export default { getSocialMedias };
