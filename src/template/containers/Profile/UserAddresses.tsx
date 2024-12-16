import { Button, Divider, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import AuthSelector from '@src/core/Authentication/service/Auth.Selector';
import MainController from '@src/logic/Main/controller/Main.controller';
import { getContactGroups } from '@src/logic/Main/store/Main.selector';
import { addContactGroup } from '@src/logic/Main/store/Main.store';
import { setUserInvoiceAddress } from '@src/service/Profile.service';
import AddressForm from '@src/shared/components/Selects/Address/AddressForm';
import { ContactGroups } from '@src/shared/models';

const UserAddresses: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [pendingId, setPendingId] = useState(-1);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [invoiceAddress, setInvoiceAddress] = useState<ContactGroups>();

  const profile = useSelector(AuthSelector.authProfile);
  const { items: contactGroups, isPending } = useSelector(getContactGroups);

  useEffect(() => {
    dispatch(MainController.getAppCountries());
    dispatch(MainController.getUserContactGroups());
  }, []);

  useEffect(() => {
    if (profile && contactGroups.length > 0) {
      const foundInvoiceAddress = contactGroups.find((ad) => ad.id === profile.invoice_contact_group_id);
      setInvoiceAddress(foundInvoiceAddress);
    }
  }, [profile, contactGroups]);

  const handleCallback = (data: ContactGroups) => {
    dispatch(addContactGroup(data));
  };

  const makeInvoiceAddress = (id: number, data: ContactGroups) => {
    setPendingId(id);
    setUserInvoiceAddress(id)
      .then(() => {
        setPendingId(-1);
        setInvoiceAddress(data);
      })
      .catch(() => setPendingId(-1));
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (id: number, data: ContactGroups) => (
        <Button
          type="primary"
          size="small"
          loading={pendingId === id}
          onClick={() => makeInvoiceAddress(id, data)}
          disabled={pendingId !== -1 || id === invoiceAddress?.id}
        >
          {t('Order.InvoiceAddress')}
        </Button>
      ),
    },
  ];

  return (
    <MainContainer>
      <div className="header">
        <Typography.Title level={2}>{t('Global.Addresses')}</Typography.Title>

        <Button type="primary" onClick={() => setModalVisible(true)}>
          {t('Global.CreateNewAddress')}
        </Button>
      </div>

      {invoiceAddress && (
        <>
          <Divider orientation="left">{t('Order.InvoiceAddress')}</Divider>

          <div dangerouslySetInnerHTML={{ __html: invoiceAddress.address.address_complete }} />

          <Divider orientation="left">{t('Order.DeliveryAddress')}</Divider>
        </>
      )}

      <AddressForm visible={isModalVisible} setVisible={setModalVisible} onCallback={handleCallback} />

      <div className="table">
        <Table
          rowKey="id"
          columns={columns}
          loading={isPending}
          dataSource={contactGroups}
          expandable={{
            expandedRowRender: (record) => (
              <div>
                <h2>Full Address</h2>
                <div dangerouslySetInnerHTML={{ __html: record.address.address_complete }} />
              </div>
            ),
          }}
        />
      </div>
    </MainContainer>
  );
};

export default UserAddresses;

const MainContainer = styled.div`
  & div.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  & div.table {
    margin-top: 16px;
  }
`;
