import { Col, Empty, Pagination, Row, Space, Typography } from 'antd';
import queryString, { StringifyOptions } from 'query-string';
import React, { ReactElement, useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { CardSkelton } from '@src/template/components/CardSkelton';
import { ProductCard } from '@src/template/components/Product/Card';
import { CategorySidebar } from '@src/template/components/Product/CategorySiderBar';
import { SearchInput } from '@src/template/components/Product/SearchInput';

import ProductController from '@logic/Product/controller/Product.controller';
import { getCategories, getProducts } from '@logic/Product/store/Product.selector';

const queryStringProps: StringifyOptions = {
  encode: false,
  skipNull: true,
  skipEmptyString: true,
};

export default function ProductsCategory(): ReactElement {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search, pathname } = useLocation();
  const { query } = queryString.parseUrl(pathname + search);

  const [categoriyKeys, setCategoryKeys] = useState<string[]>();
  const { items: categories, isPending: categoyLoading } = useSelector(getCategories);
  const { items: products, isPending: productLoading, pagination } = useSelector(getProducts);

  const handlePagination = (page: number, per_page: number) => {
    const pageQueries = {
      ids: categoriyKeys,
      search: query.search ? String(query.search) : undefined,
      page: Number(query.page) === page ? Number(query.page) : page,
      per_page: Number(query.per_page) === per_page ? Number(query.per_page) : per_page,
    };

    window.scrollTo(0, 0);
    navigate(`?${queryString.stringify(pageQueries, queryStringProps)}`);
  };

  const handleSearch = (searchValue: string) => {
    const pageQueries = {
      page: 1,
      per_page: 12,
      ids: categoriyKeys,
      search: searchValue !== '' ? searchValue : undefined,
    };

    navigate(`?${queryString.stringify(pageQueries, queryStringProps)}`);
  };

  const handleCategoryChange = (ids: string[]) => {
    const pageQueries = {
      ids,
      page: 1,
      per_page: 12,
      search: query.search ? String(query.search) : undefined,
    };

    console.log(ids);

    setCategoryKeys(ids);
    navigate(`?${queryString.stringify(pageQueries, queryStringProps)}`);
  };

  useEffect(() => {
    const pageQueries = {
      page: query.page ? Number(query.page) : 1,
      per_page: query.per_page ? Number(query.per_page) : 12,
      search: query.search ? String(query.search) : undefined,
    };
    const productCategoryIds = queryString.stringify(
      { productCategoryIds: query.ids },
      { ...queryStringProps, arrayFormat: 'bracket' },
    );

    setCategoryKeys(query.ids ? (Array.isArray(query.ids) ? (query.ids as string[]) : [query.ids as string]) : []);

    window.scrollTo(0, 0);
    dispatch(
      ProductController.getProductsForCategory({
        pagination: pageQueries,
        productCategoryIds: productCategoryIds !== '' ? productCategoryIds : undefined,
      }),
    );
  }, [search]);

  return (
    <MainContainer>
      <Typography.Title level={2} className="title">
        {t('Product.YourSearchResult')}
      </Typography.Title>
      <Row gutter={[32, 32]}>
        <Col xl={6} lg={8}>
          <CategorySidebar
            categories={categories}
            loading={categoyLoading}
            checkedKeys={categoriyKeys}
            onChange={handleCategoryChange}
          />
        </Col>

        <Col xl={18} lg={16}>
          <Space size={15} direction="vertical" style={{ width: '100%' }}>
            <SearchInput
              handleSearch={handleSearch}
              count={pagination.total ?? 0}
              inputValue={query.search ? String(query.search) : ''}
            />

            <Row gutter={[16, 16]}>
              {!productLoading && products.length === 0 && (
                <Col span={24} className="empty">
                  <Row justify="center">
                    <Empty description="The Products You Looking For Not Found, Change Your Search Or Refresh The Page." />
                  </Row>
                </Col>
              )}
              {productLoading
                ? Array.from(new Array(12)).map((_, index) => {
                    return (
                      <Col span={8} xs={24} lg={12} xl={8} key={`skelton-${index}`}>
                        <CardSkelton />
                      </Col>
                    );
                  })
                : products.map((product) => {
                    return (
                      <Col span={8} xs={24} lg={12} xl={8} key={product.id}>
                        <ProductCard key={product.id} product={product} />
                      </Col>
                    );
                  })}
            </Row>
          </Space>

          <PaginationContainer>
            {products.length > 0 && (
              <Pagination
                showSizeChanger
                disabled={productLoading}
                total={pagination.total}
                onChange={handlePagination}
                pageSize={pagination.per_page}
                current={pagination.current_page}
                pageSizeOptions={['12', '24', '48', '96']}
              />
            )}
          </PaginationContainer>
        </Col>
      </Row>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  padding: 32px;
  max-width: 1310px;
  margin: 0 auto;

  @media (max-width: 992px) {
    padding: 0 12px;

    & .title {
      margin: 0px !important;
    }
  }

  & .title {
    margin-bottom: 32px;
  }

  .product-container {
    display: flex;
    max-width: 1310px;
    margin: 0 auto;
  }

  & .empty {
    padding: 32px 0;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 32px;

  @media (max-width: 992px) {
    padding: 32px 4px;
  }
`;
