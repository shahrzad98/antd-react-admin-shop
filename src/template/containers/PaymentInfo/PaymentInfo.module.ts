import i18n from '@src/core/i18n/config';
import { ContactGroups, FactoryChild } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';

export class InvoiceAddressChildModule implements FactoryChild<ContactGroups> {
  public entity = '/contact-groups';
  public title = [i18n.t('Global.InvoiceAddress'), i18n.t('Global.InvoiceAddress', { count: 2 })];
  public apiService = new ApiBuilder<ContactGroups>(this.entity, this.title[0]);
}

export class DeliveryAddressChildModule implements FactoryChild<ContactGroups> {
  public entity = '/contact-groups';
  public title = [i18n.t('Global.DeliveryAddress'), i18n.t('Global.DeliveryAddress', { count: 2 })];
  public apiService = new ApiBuilder<ContactGroups>(this.entity, this.title[0]);
}
