import { RootState } from '@src/core/Configs/StoreConfiguration';

import { TemplateStore } from './Template.store';

const getTemplates = (state: RootState): TemplateStore => state.template;

export default { getTemplates };
