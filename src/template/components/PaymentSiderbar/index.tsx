import { Button } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import Checkbox from 'antd/lib/checkbox/Checkbox';

import { CartItems } from '@src/shared/components/CartItems';
import { CartPrices } from '@src/template/components/Basket/Prices';

type Props = { isPending: boolean };
export const PaymentSidebar: React.FC<Props> = ({ isPending }) => {
  const { t } = useTranslation();
  const [isAgreed, setIsAgreed] = useState<boolean>(false);

  const handleRulesChange = (e: CheckboxChangeEvent) => setIsAgreed(e.target.checked);

  return (
    <MainContainer>
      <div className="cart-items-list pretty-scrollbar">
        <CartItems isPayment />
      </div>

      <CartPrices />

      <div className="term-of-use">
        <div>
          <Checkbox onChange={handleRulesChange} />
          <span>
            {' '}
            <div
              style={{ display: 'inline' }}
              dangerouslySetInnerHTML={{ __html: t('Register.TermsAndConditionsText') }}
            />
          </span>
        </div>
      </div>

      <Button
        type="primary"
        htmlType="submit"
        loading={isPending}
        disabled={!isAgreed}
        style={{ marginBottom: '50px', alignSelf: 'center', minWidth: 220 }}
      >
        {t('Cart.Buy')}
      </Button>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #707070;
  border-radius: 6px;

  & .term-of-use {
    display: flex;
    flex-direction: column;
    font-size: 13px;
    margin-top: 16px;
    padding: 10px 20px;
    & label {
      margin: 0;
      margin-bottom: 5px;
    }
  }
`;
