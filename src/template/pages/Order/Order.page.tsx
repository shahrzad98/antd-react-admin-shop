import { Tabs } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import OrderController from '@src/logic/Order/controller/Order.controller';
import { OrderList } from '@src/template/containers/Order/OrderList';

import Styles from './styles/OrderPage.style';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(OrderController.getOrdersForOrderList({}));
  }, []);

  const handlePageChange = (page: number, perPage: number) => {
    window.scrollTo(0, 0);
    dispatch(OrderController.getOrdersForOrderList({ page, per_page: perPage }));
  };

  return (
    <Styles.Container>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab={'All Orders'} key="1">
          <OrderList handlePageChange={(page, perPage) => handlePageChange(page, perPage)} />
        </Tabs.TabPane>
      </Tabs>
    </Styles.Container>
  );
};

export default HomePage;
