import { storeState } from '@config/StoreConfiguration';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { LandingTemplate } from '@src/model/Template.model';
import TemplateService from '@src/service/Template.service';

export const getTemplatesForLanding = createAsyncThunk('Templates/GetAllForLanding', async () => {
  return await new Promise<LandingTemplate>((resolve, reject) => {
    if (storeState().template.item) {
      resolve(storeState().template.item as LandingTemplate);
    } else {
      TemplateService.getTemplates()
        .then(({ body, summary, title }) => {
          resolve({ body, summary, title });
        })
        .catch((e) => reject(e));
    }
  });
});

export default { getTemplatesForLanding };
