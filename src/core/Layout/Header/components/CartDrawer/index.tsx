import { Button, Drawer } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { CartItems } from '@src/shared/components/CartItems';
import { CartPrices } from '@src/template/components/Basket/Prices';

type Props = { disabled: boolean; isOpen: boolean; setOpen: (toggle: boolean) => void };
export const CartDrawer: React.FC<Props> = ({ disabled, isOpen, setOpen }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBuyClick = () => {
    setOpen(false);
    navigate('/cart');
  };

  const drawerFooter = () => {
    return (
      <>
        <CartPrices isSide />

        <Button block size="large" type="primary" disabled={disabled} onClick={() => handleBuyClick()}>
          {t('Cart.Buy')}
        </Button>
      </>
    );
  };

  return (
    <Drawer
      width={380}
      placement="right"
      visible={isOpen}
      footer={drawerFooter()}
      onClose={() => setOpen(!isOpen)}
      title={t('ActionMenus.YourBasket')}
    >
      <CartItems isSide />
    </Drawer>
  );
};
