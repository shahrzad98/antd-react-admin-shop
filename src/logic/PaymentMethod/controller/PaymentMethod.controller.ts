import { storeState } from '@config/StoreConfiguration';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { PaymentInfoPaymentType } from '@src/model/PaymentMethod.model';
import PaymentMethodService from '@src/service/PaymentMethod.service';

export const getPaymentMethodsForPaymentInfo = createAsyncThunk('PaymentMethods/GetAllForLanding', async () => {
  return await new Promise<PaymentInfoPaymentType[]>((resolve, reject) => {
    if (storeState().payments.items.length > 0) {
      resolve(storeState().payments.items as PaymentInfoPaymentType[]);
    } else {
      PaymentMethodService.getPaymentMethods()
        .then((type) => {
          resolve(type.map((type) => ({ id: type.id, name: type?.name ?? '', is_default: type.is_default })));
        })
        .catch((e) => reject(e));
    }
  });
});

export default { getPaymentMethodsForPaymentInfo };
