import { ApiBuilder } from '@shared/utils';

import { PaymentMethod } from '@src/model/PaymentMethod.model';

const API = new ApiBuilder<PaymentMethod>('payment-methods');
const getPaymentMethods = async (): Promise<PaymentMethod[]> => {
  return (await API.getAll({ pagination: { page: 1, per_page: 100 } })).data;
};

export default { getPaymentMethods };
