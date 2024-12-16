import OrderSelector from '@src/logic/Order/store/Order.selector';
import { OrderItem } from '@src/template/components/OrderItem/OrderItem';
import { Pagination, Skeleton } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Styles from './styles/Order.style';

type Props = { handlePageChange: (page: number, pageSize: number) => void };
export function OrderList({ handlePageChange }: Props): ReactElement {
  const { items: orders, isPending, pagination } = useSelector(OrderSelector.getOrders);
  const { t } = useTranslation();
  //
  const render = (child: JSX.Element) => {
    if (!isPending && orders.length > 0) return child;
    else if (isPending)
      return (
        <>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(() => (
            <>
              <Skeleton active paragraph={{ rows: 6 }} />
              <br />
            </>
          ))}
        </>
      );
    else return <EmptyOrder>{t('Global.EmptyOrder')}</EmptyOrder>;
  };
  //
  return render(
    <Styles.MainContainer>
      {orders.map((order) => (
        <OrderItem order={order} />
      ))}
      <Pagination
        showSizeChanger
        showQuickJumper
        disabled={isPending}
        total={pagination?.total}
        onChange={handlePageChange}
        current={pagination?.current_page}
        pageSize={pagination?.per_page || 10}
      />
    </Styles.MainContainer>,
  );
}

const EmptyOrder = styled.div`
  width: 100%;
  height: 100%;
  display: 'flex';
  justify-content: 'center';
  align-items: 'center';
  font-size: '1.64em';
  font-weight: 'bold';
`;
