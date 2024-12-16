import { SearchOutlined } from '@ant-design/icons';
import { Col, Input, Row, Space, Typography } from 'antd';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

type Props = { handleSearch: (value: string) => void; inputValue: string; count: number };

export const SearchInput: React.FC<Props> = ({ handleSearch, count, inputValue = '' }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(inputValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

  useEffect(() => {
    if (inputValue) {
      setValue(inputValue);
    } else setValue('');
  }, [inputValue]);

  return (
    <MainContainer>
      <Space direction="vertical">
        <div className="search-input">
          <Input.Search
            size="large"
            value={value}
            allowClear={true}
            onChange={handleChange}
            onSearch={handleSearch}
            prefix={<SearchOutlined />}
            placeholder="Artikelnummer / Artikelname"
          />
        </div>
        <Row className="result" justify="end" align="middle" gutter={[16, 16]}>
          <Col>
            <Typography.Title level={5} className="text-detail">
              {t('Product.ResultPage', { title: count })}
            </Typography.Title>
          </Col>
        </Row>
      </Space>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  & .ant-space {
    width: 100%;
    & .search-input {
      align-items: flex-end;

      & .ant-input-affix-wrapper {
        background: #f8f8f8;

        & input {
          background: #f8f8f8;
        }
      }
    }
  }

  & .result {
    padding-top: 16px;
  }
`;
