import { intlCurrency } from '@shared/utils/engine.service';
import { Button, Image, Row, Space, Tooltip, Typography } from 'antd';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { AppProduct } from '@model/Product.model';

import AuthSelector from '@core/Authentication/service/Auth.Selector';
import { AuthContext } from '@core/Authentication/service/AuthProvider';

export const ProductCard: React.FC<{ product: AppProduct }> = ({ product: { currency, ...product } }) => {
  const { t } = useTranslation();
  const { setLoginOpen } = useContext(AuthContext);
  const isAuthenticated = useSelector(AuthSelector.isAuthenticated);

  const scrollOnClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <MainContainer>
      <div className="card-item">
        <Space className="card-body" direction="vertical">
          <div className="card-img">
            <Link to={`/products/${product.id}`} onClick={scrollOnClick}>
              <Image src={product.image} alt="example" className="img" preview={false} />
            </Link>
          </div>

          <div className="card-title">
            <Tooltip title={product.name}>
              <Typography.Paragraph ellipsis={{ rows: 2 }} className="Paragraph">
                <Link to={`/products/${product.id}`} onClick={scrollOnClick}>
                  <b>{product.name}</b>
                </Link>
              </Typography.Paragraph>
            </Tooltip>
          </div>
          <Row justify="space-between">
            {product.priceVisible || isAuthenticated ? (
              <div className="card-price">
                <Typography.Text className="price-text">{t('Product.PriceFrom')}</Typography.Text>
                <Typography style={{ fontWeight: 'bold' }} className="price">
                  {`${intlCurrency(currency.iso2, currency.iso3, product.priceValue)}`}
                </Typography>
                {product.unitPrice !== 0 && (
                  <span className="unit-price">
                    {`(${intlCurrency(currency.iso2, currency.iso3, product.unitPrice)} / 1 ${product.unit})`}
                  </span>
                )}
              </div>
            ) : (
              <LoginBtn>
                <Typography.Text onClick={() => setLoginOpen(true)}>Login</Typography.Text>
              </LoginBtn>
            )}
            <Link to={`/products/${product.id}`} onClick={scrollOnClick}>
              <Button size="middle" shape="round" className="view-detail-btn">
                {t('Product.GoToDetails')}
              </Button>
            </Link>
          </Row>
        </Space>
      </div>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  & .card-item {
    padding: 8px;
    border: 1px solid #e0e3e7;
    border-radius: 4px;

    .card-body {
      width: 100%;
      padding: 5px;
      margin-bottom: 20px;
      flex-direction: column;
    }

    .ant-card-body {
      padding: 5px;
      flex-direction: column;
    }

    & .card-img {
      display: flex;
      justify-content: center;
      text-align: center;
      padding-bottom: 8px;

      & .img {
        object-fit: contain;
        height: 250px;
        width: 100%;
        align-self: center;
        border-radius: 8px;
      }
    }

    & .card-title {
      & .Paragraph {
        height: 50px;

        & a {
          color: #545454;
          font-size: 1.05rem;
        }
      }
    }

    & .card-price {
      flex-direction: column;
      display: flex;
      position: relative;

      & .price {
        color: #1c1c1c;
        font-size: 1.1rem;
      }

      & .price-text {
        opacity: 1;
        color: #676b6e;
        font-size: 15px;
      }

      & .unit-price {
        color: #979797;
        font-size: 0.8rem;
        position: absolute;
        bottom: -20px;
        left: 0px;
        white-space: nowrap;
      }
    }

    & .view-detail-btn {
      border-radius: 44px !important;
      width: 100px;
      height: 40px;
      display: flex;
      padding: 0;
      margin-top: 8px;
      justify-content: center;
      align-items: center;
    }
  }
`;

const LoginBtn = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  & .ant-typography {
    cursor: pointer;
    color: ${(props) => props.theme.colors.main};
  }
`;
