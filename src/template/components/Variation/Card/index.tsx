import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Image, Rate, Row, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { addVariationToBasket } from '@src/logic/Basket/store/Basket.store';
import { AppVariation } from '@src/model/Variation.model';
import { intlCurrency } from '@src/shared/utils/engine.service';
import { Favorite } from '@src/template/components/Favorite';

type Props = { variation: AppVariation };

export const VariationCard: React.FC<Props> = ({ variation: { prices, ...variation } }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { variationValue, userValue, unitValue } = prices;
  const actualPrice = variationValue !== 0 ? variationValue : userValue !== 0 ? userValue : unitValue;

  const addToCart = () => {
    dispatch(addVariationToBasket({ prices, ...variation }));
  };

  return (
    <Container>
      <div className="card-body">
        <div className="card-image">
          <Link to={`/products/${variation.product.id}/${variation.id}`}>
            <Image
              alt="product"
              preview={false}
              className="image"
              src={variation.image}
              fallback={'/assets/images/global/placeholder.jpeg'}
            />
          </Link>
        </div>

        <div className="product-info">
          <Row className="review" justify="space-between" align="middle">
            <Rate defaultValue={variation.averageRating} disabled />
            {
              <Typography.Text type="secondary">
                ({variation.reviewCount ?? 0} {t('Product.Reviews')})
              </Typography.Text>
            }
          </Row>

          <ProductDetails>
            <Link to={`/products/${variation.product.id}/${variation.id}`}>
              <Typography.Paragraph className="paragraph" ellipsis={{ rows: 2, tooltip: variation.name }}>
                {variation.name}
              </Typography.Paragraph>
            </Link>
          </ProductDetails>

          <div className="card-price">
            <Typography.Text strong className="price">
              {intlCurrency(prices.currency.iso2, prices.currency.iso3, actualPrice)}
            </Typography.Text>

            {unitValue !== 0 && (
              <Typography.Text type="secondary" className="unit">
                {`(${intlCurrency(prices.currency.iso2, prices.currency.iso3, unitValue)} / 1 L)`}
              </Typography.Text>
            )}
          </div>

          <Button type="primary" block icon={<ShoppingCartOutlined />} onClick={addToCart}>
            {t('Product.AddToBasket')}
          </Button>
        </div>

        <Stack>
          <Favorite variationId={variation.id} />
        </Stack>
      </div>
    </Container>
  );
};

const Container = styled.div`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #e0e3e7;

  & .card-body {
    position: relative;
  }

  & .product-info {
    padding: 8px;
  }

  & .card-image {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding-bottom: 8px;

    & .image {
      object-fit: contain;
      height: 250px;
      width: 100%;
      align-self: center;
      border-radius: 8px;
    }
  }

  & .card-price {
    display: flex;
    position: relative;
    padding-bottom: 8px;

    & .price {
      color: #1c1c1c;
      font-size: 1.1rem;
    }

    & .unit {
      margin-left: 8px;
      display: flex;
      align-items: center;
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
`;

const Stack = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

const ProductDetails = styled.div`
  padding: 8px 0;

  & .paragraph {
    height: 50px;
    color: #545454;
    font-size: 1.05rem;
    font-weight: 600;
  }
`;
