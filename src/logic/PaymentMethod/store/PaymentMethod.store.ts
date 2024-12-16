import { createSlice } from '@reduxjs/toolkit';
import { PaymentInfoPaymentType } from '@src/model/PaymentMethod.model';
import { GlobalListStore } from '@src/shared/models';
import { Reducer } from '@src/shared/utils/reducer.service';

import { getPaymentMethodsForPaymentInfo } from '../controller/PaymentMethod.controller';

export type PaymentMethodStore = GlobalListStore<PaymentInfoPaymentType>;

const initialState: PaymentMethodStore = {
  items: [],
  error: null,
  isPending: false,
};

const paymentMethodSlice = createSlice({
  name: 'paymentMethod',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    Reducer<PaymentInfoPaymentType[], PaymentMethodStore>(builder, getPaymentMethodsForPaymentInfo, {
      stateHandler: 'multi',
    });
  },
});

export default paymentMethodSlice;
