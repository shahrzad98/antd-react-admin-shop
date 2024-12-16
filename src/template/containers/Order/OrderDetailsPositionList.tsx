import OrderSelector from '@src/logic/Order/store/Order.selector';
import { OrderDescriptionItem } from '@src/template/components/OrderItem/OrderDescriptionItem';
import { Col, Row, Skeleton } from 'antd';
import SkeletonImage from 'antd/lib/skeleton/Image';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import Styles from './styles/Order.style';

export function OrderDetailsPositionList(): ReactElement {
  const { item: order } = useSelector(OrderSelector.getLatestOrder);

  //
  const render = (child: JSX.Element) => {
    if (order) return child;
    else
      return (
        <Row>
          <Col span={12}>
            <Skeleton active paragraph={{ rows: 4 }} />
          </Col>
          <br />
          <Col span={24}>
            <Skeleton active paragraph={{ rows: 6 }} />
          </Col>
          <br />
          <br />

          <Col span={24}>
            <SkeletonImage />
            <Skeleton active paragraph={{ rows: 4 }} />
          </Col>
        </Row>
      );
  };
  //
  return render(
    <Styles.MainContainer>
      {order?.orderSalePositions
        .filter((order) => order.productVariation)
        .map((order) => (
          <OrderDescriptionItem orderPosition={order} />
        ))}
    </Styles.MainContainer>,
  );
}
