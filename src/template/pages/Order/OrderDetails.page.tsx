import { Col, Row } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import OrderController from '@src/logic/Order/controller/Order.controller';
import { OrderDetailsHeader } from '@src/template/components/OrderDetailsHeader/OrderDetailsHeader';
import { OrderDetailsInfo } from '@src/template/components/OrderDetailsInfo/OrderDetailsInfo';
import { OrderSummary } from '@src/template/components/OrderSummary/OrderSummary';
import { OrderDetailsPositionList } from '@src/template/containers/Order/OrderDetailsPositionList';

import Styles from './styles/OrderPage.style';

const OrderDetailPage: React.FC<{ orderId?: string }> = ({ orderId }) => {
  const dispatch = useDispatch();
  const { order_id } = useParams();

  useEffect(() => {
    if (orderId) {
      dispatch(OrderController.getOrder(Number(orderId)));
    } else if (order_id) {
      dispatch(OrderController.getOrder(Number(order_id)));
    }
  }, []);

  return (
    <Styles.Container>
      <Row gutter={[8, 24]}>
        <Col span={24}>{<OrderDetailsHeader />}</Col>
        <Col xs={24} md={12}>
          {<OrderSummary />}
        </Col>
        <Col xs={24} md={12}>
          {<OrderDetailsInfo />}
        </Col>
        <Col span={24}>
          <OrderDetailsPositionList />
        </Col>
      </Row>
    </Styles.Container>
  );
};

export default OrderDetailPage;
