import {
  AreaChartOutlined,
  LoadingOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { AuthContext } from '@src/core/Authentication';
import { logoutAppUser } from '@src/core/Authentication/service/Auth.Controller';
import AuthSelector from '@src/core/Authentication/service/Auth.Selector';
import { dispatch } from '@src/core/Configs/StoreConfiguration';
import MainSelector from '@src/logic/Main/store/Main.selector';
import { InlineSvg } from '@src/shared/components';

const UserDropdown: React.FC = () => {
  const { t } = useTranslation();
  const { setLoginOpen } = useContext(AuthContext);
  const profile = useSelector(AuthSelector.authProfile);
  const isPending = useSelector(AuthSelector.isAuthPending);
  const isAuthenticated = useSelector(AuthSelector.isAuthenticated);
  const { item: config } = useSelector(MainSelector.getConfigsData);

  const handleLogout = () => {
    dispatch(
      logoutAppUser({
        onLogout: () => {
          window.location.href = '/';
        },
      }),
    );
  };

  const UserMenu = (
    <Menu>
      <Menu.Item key="-1">
        <Space>
          {t('Global.Welcome')}
          {', '}
          <b>
            <span>{profile.person?.first_name ?? ''}</span>
          </b>
        </Space>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="0">
        <Link to="/profile">
          <Space>
            <UserOutlined /> <span>{t('Comment.List.Table.UserProfile')}</span>
          </Space>
        </Link>
      </Menu.Item>

      <Menu.Item key="1">
        <Link to="/order">
          <Space>
            <ShoppingCartOutlined /> <span>{t('ActionMenus.Orders')}</span>
          </Space>
        </Link>
      </Menu.Item>

      {(profile.roles || []).some((role) => role.slug !== 'user') && (
        <Menu.Item key="2">
          <a href={config?.admin_page}>
            <Space>
              <AreaChartOutlined /> <span>Admin</span>
            </Space>
          </a>
        </Menu.Item>
      )}

      <Menu.Divider />
      <Menu.Item key="3" onClick={handleLogout}>
        <Space>
          {isPending ? <LoadingOutlined /> : <LogoutOutlined />} <span>{t('ActionMenus.Logout')}</span>
        </Space>
      </Menu.Item>
    </Menu>
  );

  if (isPending) {
    return (
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        <LoadingOutlined />
      </a>
    );
  }

  return !isAuthenticated ? (
    <a className="ant-dropdown-link" onClick={() => setLoginOpen(true)}>
      <InlineSvg src="/header/user.svg" />
    </a>
  ) : (
    <Dropdown overlay={UserMenu} trigger={['click']}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        <InlineSvg src="/header/user.svg" />
      </a>
    </Dropdown>
  );
};

export default UserDropdown;
