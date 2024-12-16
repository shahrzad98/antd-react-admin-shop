import { RootState } from '@src/core/Configs/StoreConfiguration';

import { PaymentMethodStore } from './PaymentMethod.store';

const getPaymentMethods = (state: RootState): PaymentMethodStore => state.payments;

export default { getPaymentMethods };
