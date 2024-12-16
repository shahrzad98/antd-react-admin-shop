import i18n from '@src/core/i18n/config';
import { SocialMediaModel, SocialMediaPure } from '@src/model/SocialMedia.model';
import { ApiBuilder } from '@src/shared/utils';

const settingsAPI = new ApiBuilder<SocialMediaPure>('/settings', i18n.t('ShopSettings.Tab.SocialMedia'));

export const getSocialMedias = async (): Promise<SocialMediaModel[]> => {
  try {
    return (await settingsAPI.request({
      url: '/settings/social-media',
      method: 'GET',
    })) as unknown as SocialMediaModel[];
  } catch (e) {
    throw new Error(e);
  }
};

export default { getSocialMedias };
