import { Descriptions } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { ContactGroups } from '@src/shared/models';

type Props = { address: ContactGroups; isInvoice: boolean };
const AddressInfo: React.FC<Props> = ({ address, isInvoice }) => {
  const { t } = useTranslation();
  return (
    <Descriptions column={1} title={isInvoice ? t('Cart.InvoiceAddressInfo') : t('Cart.DeliveryAddressInfo')}>
      {address.people && (
        <>
          <Descriptions.Item>{address.people[0]?.company_name}</Descriptions.Item>
          <Descriptions.Item>
            {address.people[0]?.first_name} - {address.people[0]?.last_name}
          </Descriptions.Item>
        </>
      )}
      {address.address && (
        <>
          <Descriptions.Item>
            {address.address.address1} {address.address.post_identity && address.address.address1 ? '-' : ''}{' '}
            {address.address.post_identity}
          </Descriptions.Item>
          <Descriptions.Item>
            {address.address.address2} {address.address.house_number && address.address.address2 ? '-' : ''}{' '}
            {address.address.house_number}
          </Descriptions.Item>
          <Descriptions.Item>
            {address.address.postal_code} {address.address.city && address.address.postal_code ? '-' : ''}{' '}
            {address.address.city}
          </Descriptions.Item>
          <Descriptions.Item>
            {address.address.state} {address.country.name && address.address.state ? '-' : ''} {address.country.name}
          </Descriptions.Item>
        </>
      )}
    </Descriptions>
  );
};

export default AddressInfo;
