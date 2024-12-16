import { GeneralTranslate } from './Common.entity';
import { Country } from './Country.entity';

export interface Address {
  additional: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  city: string;
  gln_number: string;
  house_number: string;
  is_pack_station: boolean;
  is_post_office: boolean;
  latitude: number;
  longitude: number;
  post_identity: string;
  postal_code: string;
  state: string;
  use_gln: string;
  address_complete: string;
}

interface Email {
  email: string;
}

interface Phone {
  type: string;
  number: string;
}

interface Website {
  type: string;
  url: string;
}

interface Person {
  id: number;
  gender: string;
  last_name: string;
  created_by: string;
  first_name: string;
  company_name: string;
  contactGroups: ContactGroups[];
}

export interface ContactGroups {
  id: number;
  title: string;
  phones: Phone[];
  emails: Email[];
  country: Country;
  people: Person[];
  country_id: number;
  websites: Website[];
  address: Address;
  translate: GeneralTranslate[];
}

export interface ContactGroupsContext {
  country_id: number;
  translate: { de: { locale: string; title: string } };

  people: {
    last_name: string;
    first_name: string;
    company_name: string;
  }[];

  addresses: {
    latitude: number;
    longitude: number;
    country: number | undefined;
  }[];

  phones?: {
    type: string;
    number: string;
  }[];
}

export interface ContactGroupsForm {
  name: string;
  country: Country;
  first_name: string;
  last_name: string;
  company_name: string;
  phone: string;
}
