import VariationController from '@logic/Product/controller/Variation.Controller';
import ProductSelector from '@logic/Product/store/Product.selector';
import { AppVariation, ProductVariationFiles } from '@src/model/Variation.model';
import { Loader } from '@src/shared/components';
import { VariationBuy } from '@src/template/components/Variation/Buy';
import { VariationDescription } from '@src/template/components/Variation/Description';
import { VariationImages } from '@src/template/components/Variation/Images';
import { VariationInfo } from '@src/template/components/Variation/Info';
import { Button, Col, Divider, Result } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import ProductSlider from '../../containers/Home/ProductSlider';
import Styles from './styles/Product.style';

export default function Product(): ReactElement {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { product_id, variation_id } = useParams();

  const { items: variations, isPending } = useSelector(ProductSelector.getProductVariations);

  const [images, setImages] = useState<ProductVariationFiles[]>([]);
  const [productVariations, setProductVariations] = useState<AppVariation[]>([]);
  const [selectedVariation, setSelectedVariation] = useState<AppVariation>({} as AppVariation);

  useEffect(() => {
    if (product_id) {
      dispatch(VariationController.getVariationsByProductId(Number(product_id)));
    }
  }, [product_id]);

  useEffect(() => {
    if (!isPending && variations.length !== 0) {
      handleImages(variations);
      setProductVariations(variations);

      const selectedIndex = Number(variation_id);
      setSelectedVariation(variations[selectedIndex === -1 ? selectedIndex : 0]);
    }
  }, [isPending]);

  const handleImages = (data: AppVariation[]) => {
    let variationImages: ProductVariationFiles[] = [];

    data.forEach((item) => {
      const variationFiles =
        item.files.length === 0 || item.files.some(({ file }) => file === null)
          ? [
              {
                type: 'image',
                variationId: item.id,
                title: item.product.name,
                link: item.product.image,
              } as ProductVariationFiles,
            ]
          : [...item.files];

      variationImages = [...variationImages, ...variationFiles];
    });

    setImages(variationImages);
  };

  const handleImageChange = (variationId: number) => {
    if (variations.some((prod) => prod.id === variationId)) {
      setSelectedVariation(variations.find((prod) => prod.id === variationId) || ({} as AppVariation));
    }
  };

  return (
    <div>
      {isPending ? (
        <Loader />
      ) : productVariations.length === 0 ? (
        <Styles.EmptyContainer>
          <Result
            title="404"
            status="404"
            extra={<Button type="primary">Go ToProduct List</Button>}
            subTitle="Sorry, the product you visited does not have any variation."
          />
        </Styles.EmptyContainer>
      ) : (
        <Styles.ProductContainer gutter={{ xs: 32, lg: 64 }}>
          <Col xs={24} lg={12}>
            {images.length > 0 && <VariationImages images={images} onChange={(id) => handleImageChange(id)} />}
          </Col>

          <Col xs={24} lg={12}>
            <VariationInfo variation={selectedVariation} />

            <VariationBuy variation={selectedVariation} />
          </Col>

          <Col xs={24}>
            <VariationDescription variation={selectedVariation} />
          </Col>

          {productVariations.length !== 0 &&
            selectedVariation.crossSelling &&
            selectedVariation.crossSelling.length !== 0 && (
              <ProductSliderContainer>
                <Divider />
                <div className="title">
                  <h2>{t('Product.ConsiderSimilarItems')}</h2>
                </div>

                <ProductSlider isPending={false} variations={selectedVariation.crossSelling} />
              </ProductSliderContainer>
            )}
        </Styles.ProductContainer>
      )}
    </div>
  );
}

const ProductSliderContainer = styled.div`
  max-width: 100%;
`;
