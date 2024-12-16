import { TranslationOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Menu, Space } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { AppCategory } from '@src/model/Category.model';
import { InlineSvg } from '@src/shared/components';

import BasketSelector from '@logic/Basket/store/Basket.selector';

import { CartDrawer } from '../components/CartDrawer';
import { InlineMenus } from '../components/InlineMenus';
import { ProductSearch } from '../components/ProductSearch';
import UserDropdown from '../components/UserDropdown';

interface MenusProps {
  isOpen: boolean;
  isPending: boolean;
  menus: AppCategory[];
  setOpen: (isOpen: boolean) => void;
}

export const MenuTabs: React.FC<MenusProps> = ({ menus, isOpen, setOpen, isPending }) => {
  const { i18n } = useTranslation();
  const [isCartOpen, setCartOpen] = useState(false);
  const cartItems = useSelector(BasketSelector.getAllBaskets);

  const handleChangeLang = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
  };

  const LanguMenus = (
    <Menu>
      <Menu.Item key="0">
        <span onClick={() => handleChangeLang('en')}>English</span>
      </Menu.Item>
      <Menu.Item key="1">
        <span onClick={() => handleChangeLang('de')}>Deutsch</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Space>
      <InlineMenus menus={menus} isOpen={isOpen} setOpen={setOpen} isPending={isPending} />

      <MenuContainer>
        <ProductSearch />

        <UserDropdown />

        <div className="single-menu">
          <Dropdown overlay={LanguMenus} trigger={['click']}>
            <TranslationOutlined />
          </Dropdown>
        </div>

        <div className="single-menu" onClick={() => setCartOpen(true)}>
          <Badge count={cartItems.length} size="small">
            <InlineSvg src="/header/basket.svg" />
          </Badge>
        </div>

        <CartDrawer disabled={cartItems.length === 0} isOpen={isCartOpen} setOpen={setCartOpen} />
      </MenuContainer>
    </Space>
  );
};

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding-left: 16px;

  & .single-menu {
    display: flex;
    cursor: pointer;

    & .anticon {
      color: #fff;
      font-size: 22px;
      cursor: pointer;
    }
  }

  & .d-none {
    display: none;
  }
`;
