import { ApiBuilder } from '@shared/utils';

import { Coupon } from '@src/model/Coupon.model';

const API = new ApiBuilder<Coupon>('coupons');

const setCoupon = async (code: string): Promise<Coupon | undefined> => {
  return await API.request<Coupon, { code: string }>({
    method: 'POST',
    body: { code },
    url: 'coupons/set',
  });
};

export default { setCoupon };
