import { RootState } from '@src/core/Configs/StoreConfiguration';

import { SocialMediaStore } from './SocialMedia.store';

const getSocialMedias = (state: RootState): SocialMediaStore => state.socialMedia;

export default { getSocialMedias };
