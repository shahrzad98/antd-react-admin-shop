import { Col, Image, Row, Typography } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ReactShowMoreText from 'react-show-more-text';
import styled from 'styled-components';

import { Basket } from '@src/model/Basket.model';
import { intlCurrency } from '@src/shared/utils/engine.service';

import QuantityCounter from './QuantityCounter';

type Props = { item: Basket; isSide?: boolean; isPayment?: boolean };

export default function CartItem({
  item: { product, quantity },
  isSide = false,
  isPayment = false,
}: Props): ReactElement {
  const { t } = useTranslation();
  const { variationValue, userValue, unitValue } = product.prices;
  const actualPrice = variationValue !== 0 ? variationValue : userValue !== 0 ? userValue : unitValue;

  return (
    <MainContainer>
      <Row gutter={[24, 24]} wrap={false} className="container">
        <Col span={isSide ? 7 : 5} className="image">
          <Link to={`/products/${product.id}/${product.id}`}>
            <Image
              alt="product"
              preview={false}
              src={product.image}
              className="product-image"
              fallback="/assets/images/global/placeholder.jpeg"
            />
          </Link>
        </Col>
        <Col flex={1} className="content">
          <div className="price-container">
            <Link to={`/products/${product.id}/${product.id}`}>
              <Typography.Title level={5} ellipsis={{ rows: 2, tooltip: product.name }}>
                {product.name}
              </Typography.Title>
            </Link>

            {!isSide && (
              <Typography.Paragraph className="preview-text">
                <ReactShowMoreText
                  lines={3}
                  expanded={false}
                  className="content-css"
                  more={t('Global.ShowMore')}
                  less={t('Global.ShowLess')}
                  truncatedEndingComponent={'... '}
                  anchorClass="my-anchor-css-class"
                >
                  <div dangerouslySetInnerHTML={{ __html: product.previewText }} />
                </ReactShowMoreText>
              </Typography.Paragraph>
            )}

            <div className="price">
              <Typography.Title level={5}>
                {intlCurrency(product.prices.currency.iso2, product.prices.currency.iso3, actualPrice)}
              </Typography.Title>

              <QuantityCounter isPayment={isPayment} cartItem={{ product, quantity }} />
            </div>
          </div>
        </Col>
      </Row>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  & .container {
    padding: 16px 0;
    border-bottom: 1px solid #dbdbdb;

    & .price {
      display: flex;
      align-items: center;
      justify-content: space-between;

      & h5 {
        margin: 0;
      }
    }
  }

  & .preview-text {
    @media (max-width: 768px) {
      display: none;
    }
  }

  & .price-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100px;
  }

  & .image {
    height: 100%;
    display: flex;
    overflow: hidden;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    border: 1px solid #ddd;

    & a {
      height: 100%;
      width: 100%;
      & .ant-image {
        height: 100%;
        display: block;

        & .product-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
  }
`;
