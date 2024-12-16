import { RootState } from '@src/core/Configs/StoreConfiguration';

import { LegalStore } from './Legal.store';

const getLegal = (state: RootState): LegalStore => state.legal;

export default { getLegal };
