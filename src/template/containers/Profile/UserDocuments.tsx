import { Button, Table, Typography } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Env } from '@src/core';
import { UserDocuments, UserDocumentType } from '@src/model/Profile.model';
import { getUserDocuments } from '@src/service/Profile.service';

const UserDocumentsList: React.FC = () => {
  const { t } = useTranslation();
  const [isPending, setPending] = useState(false);
  const [documents, setDocuments] = useState<UserDocuments[]>([]);

  useEffect(() => {
    setPending(true);
    getUserDocuments()
      .then((data: UserDocuments[]) => {
        setPending(false);
        setDocuments(data);
      })
      .catch(() => setPending(false));
  }, []);

  const columns = [
    {
      key: 'id',
      width: 100,
      dataIndex: 'order_id',
      title: t('Order.Field.OrderId'),
      render: (id: number) => <Link to={`/order/${id}`}>{id}</Link>,
    },
    {
      title: 'Type',
      dataIndex: 'documentType',
      key: 'documentType',
      render: (data: UserDocumentType) => data.name,
    },
    {
      dataIndex: 'created_at',
      key: 'created_at',
      title: t('Order.Field.CreatedAt'),
      render: (date: string) => moment(date).format('DD.MM.YYYY HH:mm'),
    },

    {
      title: 'Action',
      dataIndex: 'link',
      key: 'link',
      render: (link: string) => (
        <a href={link && link !== '' ? Env.PURE_URL + link : '#'}>
          <Button type="primary" size="small">
            {t('Global.Download')}
          </Button>
        </a>
      ),
    },
  ];

  return (
    <MainContainer>
      <div className="header">
        <Typography.Title level={2}>{t('Global.Documents')}</Typography.Title>
      </div>

      <div className="table">
        <Table rowKey="id" columns={columns} loading={isPending} dataSource={documents} />
      </div>
    </MainContainer>
  );
};

export default UserDocumentsList;

const MainContainer = styled.div`
  & div.table {
    margin-top: 16px;
  }
`;
