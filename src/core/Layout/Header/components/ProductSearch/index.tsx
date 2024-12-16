import { CloseOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React, { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { InlineSvg } from '@src/shared/components';

export const ProductSearch: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [isOpen, setOpen] = useState(false);

  const onSearch = (event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value);

  const handleClose = () => {
    setSearch('');
    setOpen(false);
  };

  const handleSearch = () => {
    navigate(`/category?search=${search}`);
  };

  return (
    <MainContainer>
      <div className="single-menu" onClick={() => setOpen(true)}>
        <InlineSvg src="/header/search.svg" />
      </div>

      {isOpen && (
        <div className="input">
          <Input
            autoFocus
            value={search}
            onChange={onSearch}
            onPressEnter={handleSearch}
            placeholder={t('ProductSearch.Placeholder')}
            suffix={<CloseOutlined onClick={handleClose} />}
          />
        </div>
      )}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  position: relative;

  & .input {
    padding: 8px;
    position: absolute;
    right: 40px;
    top: -12px;
    width: 500px;
    z-index: 3;
    background: ${(props) => props.theme.colors.secondary};
    border-radius: 4px;

    @media (max-width: 992px) {
      right: -110px;
      width: 300px;
    }

    @media (max-width: 460px) {
      right: -110px;
      width: 265px;
    }

    & .ant-input-group-addon {
      display: none;
    }

    & .ant-input-suffix {
      color: #fff;
      cursor: pointer;
    }

    & input,
    & .ant-input-affix-wrapper {
      border: none;
      background: transparent;
      color: #fff;
    }

    & .ant-input-affix-wrapper {
      border-radius: 10px !important;
    }
  }
`;
