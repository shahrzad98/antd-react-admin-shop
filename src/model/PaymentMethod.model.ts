export interface PaymentMethod {
  id: number;
  file: string | null;
  file_id: number | null;
  file_path: string | null;
  name: string;
  paymentMethodType: PaymentMethodType;
  payment_method_type_id: number;
  price_id: number;
  price_value: number;
  is_default: number;
}

interface PaymentMethodType {
  id: number;
  title: string;
}

export type PaymentInfoPaymentType = Pick<PaymentMethod, 'id' | 'name' | 'is_default'>;
