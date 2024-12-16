import { User } from '@src/core/Authentication/model';
import {
  AttributeType,
  Availability,
  Barcode,
  Country,
  Currency,
  CustomTariff,
  Package,
  Price,
  ShippingProfile,
  Supplier,
  VariationCategory,
} from '@src/shared/models';

import { GeneralTranslate } from '../shared/models/Common.entity';
import { AppProduct, Product } from './Product.model';

export interface VariationPackages {
  quantity: number;
  package: Package;
}

export interface ProductVariationUnit {
  id: number;
  name: string;
  slug: string;
  symbol: string;
}

export interface VariationAttributeTypes {
  visible: boolean;
  attributeType: AttributeType;
  translate: GeneralTranslate[];
}

export interface VariationSuppliers {
  price: Price;
  supplier: Supplier;
  price_value: number;
  delivery_days: number;
  packaging_unit: number;
  minimum_quantity: number;
  supplier_product_name: string;
  supplier_product_number: string;
}

export interface VariationFiles {
  id: number;
  file_id: number;
  file: string;
  link: string;
  title: string;
  type: string;
}

export interface VariationPrice {
  price: Price;
  value: number;
  price_id: number;
  minimum_quantity: number;
  available_from: string | Date;
}

export interface UserVariationPrices {
  user: User;
  price: Price;
  value: number;
  minimum_quantity: number;
  available_from: string | Date;
}

export interface VariationTranslate {
  description: string;
  locale: string;
  meta_description: string;
  meta_keywords: string;
  name: string;
  preview_text: string;
  technical_data: string;
}

export interface VariationVats {
  id: number;
  vat_id: number;
  country: Country;
}

export interface ProductVariation {
  id: number;
  name: string;
  type: string;
  point: number;
  number: string;
  inherit: boolean;
  is_main: boolean;
  quantity: number;
  is_active: boolean;
  description: string;
  review_count: number;
  preview_text: string;
  meta_keywords: string;
  weight: number | null;
  average_rating: number;
  technical_data: string;
  meta_description: string;
  max_order_quantity: number;
  min_order_quantity: number;
  release_date: string | Date;
  available_until: string | Date;
  auto_active_net_stock: boolean;
  auto_deactivate_net_stock: boolean;
  maximum_sale_for_each_user: number;

  product: Product;
  barcodes: Barcode[];
  unit: ProductVariationUnit;
  availability: Availability;
  custom_tariff: CustomTariff;
  packages: VariationPackages[];
  translate: VariationTranslate[];
  shippingProfiles: ShippingProfile[];
  attributes: VariationAttributeTypes[];
  productVariationVats: VariationVats[];
  productVariationFiles: VariationFiles[];
  productVariationPrices: VariationPrice[];
  crossSellingVariations: ProductVariation[];
  userVariationPrices: UserVariationPrices[];
  productVariationCategories: VariationCategory[];
  productVariationSuppliers: VariationSuppliers[];
}

export interface AppVariationPrice {
  unitValue: number;
  userValue: number;
  currency: Currency;
  shippingValue: number;
  variationValue: number;
}

export type ProductVariationFiles = VariationFiles & { variationId: number };
export interface AppVariation {
  id: number;
  name: string;
  number: string;
  image: string;
  reviewCount: number;
  previewText: string;
  description: string;
  averageRating: number;
  technicalData: string;
  prices: AppVariationPrice;
  crossSelling: AppVariation[];
  files: ProductVariationFiles[];
  categories: VariationCategory[];
  shippingProfiles: ShippingProfile[];
  availability: Pick<Availability, 'id' | 'name' | 'file'>;
  product: Pick<AppProduct, 'id' | 'name' | 'image' | 'priceVisible'>;
}
