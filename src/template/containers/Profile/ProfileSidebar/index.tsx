import {
  ArrowRightOutlined,
  KeyOutlined,
  PaperClipOutlined,
  SendOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Typography } from 'antd';
import cn from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import AuthSelector from '@src/core/Authentication/service/Auth.Selector';

export const ProfileSidebar: React.FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const profile = useSelector(AuthSelector.authProfile);

  const Menus = [
    {
      title: t('Global.PersonalInformation'),
      link: '/profile',
      icon: <UserOutlined />,
    },
    {
      title: t('Global.Addresses'),
      link: '/profile/address',
      icon: <SendOutlined />,
    },
    {
      title: t('Global.Documents'),
      link: '/profile/document',
      icon: <PaperClipOutlined />,
    },
    {
      title: t('Global.ChangePassword'),
      link: '/profile/password',
      icon: <KeyOutlined />,
    },
    {
      title: t('ActionMenus.Orders'),
      link: '/order',
      icon: <ShoppingCartOutlined />,
    },
  ];

  return (
    <Sidebar>
      <div className="header">
        <Typography.Title level={2}>
          {t('Global.Welcome')}
          {', '}

          <span>{profile.person?.first_name ?? ''}</span>
        </Typography.Title>
      </div>

      <div className="menus">
        {Menus.map((menu, index) => (
          <Link key={`menu-${index}`} to={menu.link} className={cn('single-menu', { active: pathname === menu.link })}>
            {menu.icon}
            <div className="title">
              <span>{menu.title}</span>
            </div>
            <ArrowRightOutlined />
          </Link>
        ))}
      </div>
    </Sidebar>
  );
};

const Sidebar = styled.div`
  padding: 8px 10%;
  background-color: #f5f5f5;
  border-radius: 8px;
  min-height: 420px;
  height: 100%;

  & div.menus {
    margin: 16px 0;
    display: flex;
    flex-direction: column;

    & .single-menu {
      display: flex;
      align-items: center;
      background: #fff;
      border-radius: 8px;
      padding: 0 16px;
      color: #211e22;
      margin-top: 16px;

      &.active {
        color: ${(props) => props.theme.colors.main};
      }

      &:hover {
        transition: color 0.15s ease-out;
        color: ${(props) => props.theme.colors.main};
      }

      & .anticon {
        font-size: 1.2rem;
      }

      & .title {
        flex: 1;
        margin-left: 16px;
        font-size: 16px;
        padding: 14px 0;
      }
    }
  }
`;
