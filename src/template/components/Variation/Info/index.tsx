import { Breadcrumb, Col, Image, Rate, Row, Space, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ShowMoreText from 'react-show-more-text';
import styled from 'styled-components';

import { AppVariation } from '@src/model/Variation.model';
import { intlCurrency } from '@src/shared/utils/engine.service';

import AuthSelector from '@core/Authentication/service/Auth.Selector';

const { Title } = Typography;

export const VariationInfo: React.FC<{ variation: AppVariation }> = ({ variation }) => {
  const { t } = useTranslation();
  const isAuthenticated = useSelector(AuthSelector.isAuthenticated);

  return (
    <MainContainer>
      <div className="category">
        <Breadcrumb className="product-breadcrumb">
          <Breadcrumb.Item>
            <Link to="/">Cleafin</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/category">Webshop</Link>
          </Breadcrumb.Item>

          {variation.categories.length !== 0 && (
            <Breadcrumb.Item>
              {/* <Link to="/category">{variation.categories[0].name}</Link> */}
              <Link to="/category">Reiniger</Link>
            </Breadcrumb.Item>
          )}
        </Breadcrumb>
      </div>

      <Space className="score">
        <Rate disabled defaultValue={variation.averageRating} style={{ fontSize: '0.9rem' }} />
        {variation.reviewCount && (
          <div>
            ({variation.reviewCount} {t('Product.Reviews')})
          </div>
        )}
      </Space>

      <Title level={2}>{variation.name}</Title>

      <Title level={4}>
        {t('Product.Number')} : {variation.number}
      </Title>

      <Row justify="space-between">
        <Col span={12}>
          <ShowMoreText
            lines={3}
            expanded={false}
            className="content-css"
            more={t('Global.ShowMore')}
            less={t('Global.ShowLess')}
            anchorClass="my-anchor-css-class"
            truncatedEndingComponent={' ... '}
          >
            <div dangerouslySetInnerHTML={{ __html: variation.previewText || '' }} />
          </ShowMoreText>
        </Col>
        <Col>
          <Image
            alt="certificate"
            style={{ cursor: 'pointer' }}
            src={'/assets/images/temp/enamad.png'}
            preview={{ src: variation.files.find((file) => file.type === 'certificate')?.link, mask: false }}
          />
        </Col>
      </Row>

      {(variation.product.priceVisible || isAuthenticated) && (
        <Row className="prices">
          {variation.prices.userValue !== 0 && (
            <Col md={8}>
              <Title level={2}>
                {intlCurrency(
                  variation.prices.currency.iso2,
                  variation.prices.currency.iso3,
                  variation.prices.userValue,
                )}
              </Title>
              {t('Product.YourPrice')}
            </Col>
          )}

          {variation.prices.variationValue !== 0 && (
            <Col md={8}>
              <Title level={2}>
                {intlCurrency(
                  variation.prices.currency.iso2,
                  variation.prices.currency.iso3,
                  variation.prices.variationValue,
                )}
              </Title>
              {t('Product.VariationPrice')}
            </Col>
          )}

          {variation.prices.unitValue !== 0 && (
            <Col md={8}>
              <Title level={2}>
                {intlCurrency(
                  variation.prices.currency.iso2,
                  variation.prices.currency.iso3,
                  variation.prices.unitValue,
                )}
              </Title>
              Litre {t('Cart.Price')}
            </Col>
          )}
        </Row>
      )}

      {(variation.product.priceVisible || isAuthenticated) && (
        <div style={{ marginTop: 16 }}>
          <p>{t('Product.IncludeVat')}</p>
        </div>
      )}

      <Space>
        <div className={`tag ${!variation.availability && ' bg-gray'}`}>
          {variation.availability ? variation.availability.name : t('Product.Unavailable')}
        </div>

        {variation.shippingProfiles.length !== 0 && <div className="tag">{variation.shippingProfiles[0].name}</div>}

        {variation.prices.shippingValue !== 0 ? (
          <div className="tag">
            {t('Cart.ShippingPrice')}:{' '}
            {intlCurrency(
              variation.prices.currency.iso2,
              variation.prices.currency.iso3,
              variation.prices.shippingValue,
            )}
          </div>
        ) : (
          <div className="tag">{t('Product.FreeShipping')}</div>
        )}
      </Space>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  & .tag {
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 0 10px;
    margin: 35px 0;
    color: #000;
  }

  & .tag.bg-gray {
    background-color: #eee;
    box-shadow: none;
  }

  & .score {
    padding-top: 8px;
    padding-bottom: 16px;
  }

  & .category {
    .product-breadcrumb {
      display: flex;
      flex-wrap: wrap;
    }

    & span {
      font-size: 1.2rem;
    }
  }

  & .prices {
    color: #707070;
    padding-top: 16px;

    & h2 {
      margin: 0;
    }

    & h4 {
      color: #707070;
    }

    & .ant-col:first-child {
      color: #000;
      h2 {
        font-size: 36px;
      }
    }

    & .ant-col:not(:last-child) {
      padding-right: 8px;
      border-right: 1px solid ${(props) => props.theme.colors.main};

      & div:first-child {
        margin: auto;
        width: fit-content;
      }
    }

    & .ant-col:not(:first-child) {
      padding-left: 8px;

      & h2 {
        font-size: 25px;
        color: #707070;
        font-weight: 400;
        margin: 6px 0;
      }
    }
  }
`;
