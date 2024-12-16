import { Env } from '@src/core';
import { OrderSalePosition } from '@src/model/Order.model';
import { Button, Card, Col, Image, Row, Typography } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ShowMoreText from 'react-show-more-text';

import Styles from './OrderItem.style';

type Props = { orderPosition: OrderSalePosition };
export const OrderDescriptionItem = ({ orderPosition }: Props): ReactElement => {
  const { t } = useTranslation();

  const [image, setImage] = useState<string>();
  useEffect(() => {
    if (orderPosition.productVariation?.productVariationFiles != null) {
      if (orderPosition.productVariation?.productVariationFiles.length > 0) {
        if (orderPosition.productVariation?.productVariationFiles[0]?.type == 'image') {
          setImage(orderPosition.productVariation?.productVariationFiles[0]?.file);
        }
      } else {
        if (orderPosition.productVariation?.product != null) {
          setImage(orderPosition.productVariation?.product?.file);
        }
      }
    } else {
      if (orderPosition.productVariation?.product != null) {
        setImage(orderPosition.productVariation?.product?.file);
      }
    }
  }, [orderPosition]);

  return (
    <Styles.MainContainer>
      <Card className="order-product">
        <Row gutter={[8, 24]}>
          <Col xs={24} sm={4} className="image-holder">
            <div style={{ textAlign: 'center' }}>
              <Image
                alt="product"
                className="product-image"
                fallback="/assets/images/global/placeholder.jpeg"
                src={image ? Env.PURE_URL + image : 'error'}
              />
              <Typography.Text strong>{`${t('Order.Quantity')}: ${orderPosition.quantity}`}</Typography.Text>
            </div>
          </Col>
          <Col xs={24} sm={14}>
            <div className="name" key={orderPosition.id}>
              <Link
                to={`/products/${orderPosition.productVariation?.product.id}/${orderPosition.product_variation_id}`}
              >
                {orderPosition.productVariation?.product.name ?? ''}
              </Link>
            </div>
            <Typography.Text type="secondary">
              <ShowMoreText
                lines={3}
                more={t('Global.ShowMore')}
                less={t('Global.ShowLess')}
                anchorClass="my-anchor-css-class"
                expanded={false}
                truncatedEndingComponent={'... '}
              >
                {
                  <div
                    key={orderPosition.id}
                    dangerouslySetInnerHTML={{ __html: orderPosition.productVariation?.preview_text }}
                  />
                }
              </ShowMoreText>
            </Typography.Text>
          </Col>
          <Col xs={24} sm={6}>
            <Link to={`/products/${orderPosition.productVariation.product.id}`}>
              <Button size="large">{t('Order.RateComment')}</Button>
            </Link>
          </Col>
        </Row>
      </Card>
    </Styles.MainContainer>
  );
};
