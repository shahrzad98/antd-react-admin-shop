import { Drawer, Menu } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { AppCategory } from '@src/model/Category.model';
import { device } from '@src/shared/styles';

const { SubMenu } = Menu;

interface MenusProps {
  isOpen: boolean;
  isPending: boolean;
  menus: AppCategory[];
  setOpen: (isOpen: boolean) => void;
}

const DynamicMenu = (data: AppCategory[]) => {
  if (data === null) return;
  return data.map((item) => {
    if (item.children?.length === 0) {
      return (
        <Menu.Item key={item.key}>
          <Link to={`/category?ids=${item.key}`}>{item.title}</Link>
        </Menu.Item>
      );
    }
    return (
      <SubMenu key={item.key} title={item.key} popupClassName="header-menu-popup">
        {DynamicMenu(item.children)}
      </SubMenu>
    );
  });
};

export const InlineMenus: React.FC<MenusProps> = ({ menus, isOpen, setOpen, isPending }) => {
  const { t } = useTranslation();

  return (
    <MainContainer>
      <Drawer
        width={250}
        closable={false}
        placement="left"
        visible={isOpen}
        bodyStyle={{ padding: 0 }}
        title={t('Product.Category')}
        onClose={() => setOpen(false)}
      >
        <Menu mode="inline" onClick={() => setOpen(false)}>
          {DynamicMenu(menus)}
        </Menu>
      </Drawer>

      <MainMenus>
        <Menu mode="horizontal">
          <SubMenu
            key="ProductWorld"
            disabled={isPending}
            title={t('Header.ProductWorld')}
            popupClassName="header-menu-popup"
          >
            {DynamicMenu(menus)}
          </SubMenu>
          <Menu.Item key="Currenct">
            <Link to="/category?ids=49">{t('Header.Current')}</Link>
          </Menu.Item>
        </Menu>
      </MainMenus>
    </MainContainer>
  );
};

const MainContainer = styled.div``;

const MainMenus = styled.div`
  display: block;
  min-width: 230px;

  @media ${device.tablet} {
    display: none;
  }

  & .ant-menu-horizontal {
    border: none;
    color: #fff;
    background: transparent;

    & a {
      color: #fff;
    }

    & .ant-menu-item::after,
    & .ant-menu-submenu::after {
      content: unset;
    }

    & .ant-menu-submenu-selected {
      color: unset;
    }

    & li.ant-menu-submenu {
      border-right: 1px solid ${(props) => props.theme.colors.main};
    }
  }
`;
