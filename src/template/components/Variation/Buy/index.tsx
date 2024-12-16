import { FacebookOutlined, InstagramOutlined, ShoppingCartOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { Button, Col, message, Row, Space } from 'antd';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { AuthContext } from '@src/core';
import AuthSelector from '@src/core/Authentication/service/Auth.Selector';
import { addVariationToBasket } from '@src/logic/Basket/store/Basket.store';
import { AppVariation } from '@src/model/Variation.model';
import { Favorite } from '@src/template/components/Favorite';

export const VariationBuy: React.FC<{ variation: AppVariation }> = ({ variation }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setLoginOpen } = useContext(AuthContext);
  const isAuthenticated = useSelector(AuthSelector.isAuthenticated);

  const onAddProduct = () => {
    message.success(t('Product.SuccessfullAdd'));
    dispatch(addVariationToBasket(variation));
  };

  const onNavigateBasket = () => {
    dispatch(addVariationToBasket(variation));
    navigate('/cart');
  };

  return (
    <MainContainer>
      <Row gutter={16}>
        <Col md={16}>
          <Row>
            <Col md={20}>
              {!variation.product.priceVisible && !isAuthenticated ? (
                <Button type="primary" size="large" style={{ marginTop: 8 }} onClick={() => setLoginOpen(true)}>
                  {t('Login.RegisterTitle')}
                </Button>
              ) : (
                <Row align="middle" justify="space-around" className="buttons-group">
                  <Col xs={11} sm={9} md={24}>
                    <Link to="/cart">
                      <Button block size="large" onClick={onNavigateBasket}>
                        {t('Product.BuyNow')}
                      </Button>
                    </Link>
                  </Col>

                  <Col xs={11} sm={9} md={24}>
                    <Button type="primary" size="large" icon={<ShoppingCartOutlined />} block onClick={onAddProduct}>
                      {t('Product.AddToBasket')}
                    </Button>
                  </Col>
                </Row>
              )}
            </Col>
            <Col md={4} className="like-btn">
              <Favorite variationId={variation.id} />
            </Col>
          </Row>
        </Col>

        <Col md={8}>
          <Space>
            <BlackCircle>
              <FacebookOutlined />
            </BlackCircle>
            <BlackCircle>
              <WhatsAppOutlined />
            </BlackCircle>
            <BlackCircle>
              <InstagramOutlined />
            </BlackCircle>
          </Space>
        </Col>
      </Row>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  padding-bottom: 16px;

  .like-btn {
    padding-top: 4px;
  }

  .buttons-group {
    margin-right: 10px;

    @media (max-width: 768px) {
      & {
        align-self: flex-end;
        width: 100vw;
        z-index: 100;
        position: fixed;
        left: 0;
        bottom: 0;
        background-color: white;
        padding: 2rem 0px 15px 0px;
        border-radius: 30% 30% 0% 0%;
        box-shadow: 0px -1px 13px rgba(0, 0, 0, 0.17);
      }
    }
    @media (min-width: 768px) {
      & > * {
        padding: 5px 0px;
      }
    }

    .ant-btn {
      border-radius: 1rem;
    }
  }
`;

const BlackCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 20px;
  margin: 0 2px;
`;
