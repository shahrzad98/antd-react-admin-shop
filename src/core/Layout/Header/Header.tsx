import { MenuOutlined } from '@ant-design/icons';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import MainSelector from '@src/logic/Main/store/Main.selector';
import CategoryController from '@src/logic/Product/controller/Category.controller';
import ProductSelector from '@src/logic/Product/store/Product.selector';
import { device } from '@src/shared/styles';

import PartnerInfo from './components/PartnerInfo';
import { MenuTabs } from './MenuTabs';

export default function Header(): ReactElement {
  const dispatch = useDispatch();
  const [isMenuVisible, setMenuVisible] = useState(false);

  const { isPending, item: partner } = useSelector(MainSelector.getConfigsData);
  const { isPending: menuPending, items: menus } = useSelector(ProductSelector.getCategories);

  useEffect(() => {
    dispatch(CategoryController.getCategoryTreeForProducts());
  }, []);

  const Partner = () => {
    if (!isPending) {
      return (
        <PartnerInfo
          partner={{
            name: partner?.saleSystem?.partner ?? '',
            description: partner?.saleSystem?.partner_detail ?? '',
          }}
          email={partner?.saleSystem?.email ?? ''}
          phone={partner?.saleSystem?.phone ?? ''}
          image={partner?.saleSystem?.partner_picture ?? ''}
        />
      );
    }
    return null;
  };

  return (
    <MainContainer>
      <div className="inner">
        <div className="logo-container">
          <div className="drawer-menu">
            <MenuOutlined onClick={() => setMenuVisible(true)} />
          </div>

          {Partner()}
        </div>

        <MenuTabs menus={menus} isPending={menuPending} isOpen={isMenuVisible} setOpen={setMenuVisible} />
      </div>
    </MainContainer>
  );
}

const MainContainer = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 800;
  left: 0;
  background: #fff;
  padding: 0 24px;
  height: 100px;
  min-width: 300px;
  box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  background: ${(props) => props.theme.colors.secondary};

  @media ${device.tablet} {
    height: 75px;
  }

  @media ${device.mobileL} {
    height: 50px;
  }

  & .drawer-menu {
    display: none;

    @media ${device.tablet} {
      display: block;
    }

    & .anticon {
      color: #fff;
      font-size: 20px;
      cursor: pointer;
    }
  }

  & .inner {
    display: flex;
    position: relative;
    height: 100%;
    max-width: 1240px;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;

    & .logo-container {
      display: flex;
      align-items: center;
    }
  }
`;
