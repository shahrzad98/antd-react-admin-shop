import { Button, Col, Collapse, Row, Tree } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { AppCategory } from '@model/Category.model';

import CategorySidebarSkelton from './SiderbarSkelton';

const { Panel } = Collapse;

type Props = {
  loading: boolean;
  checkedKeys?: string[];
  categories: AppCategory[];
  onChange: (ids: string[]) => void;
};

export const CategorySidebar: React.FC<Props> = ({ loading, categories, onChange, checkedKeys }) => {
  const { t } = useTranslation();
  const [isVisible, setVisible] = useState(false);

  const handleChange = (keys: string[]) => {
    onChange(keys);
  };

  const handleReset = () => {
    handleChange([]);
    setVisible(false);
  };

  return (
    <>
      <MainContainer visible={isVisible}>
        {loading ? (
          <CategorySidebarSkelton />
        ) : (
          <div className="container">
            <Collapse defaultActiveKey={['1']} expandIconPosition="right">
              <Panel header={<b style={{ fontSize: '1rem' }}>{t('Product.Category')}</b>} key="1">
                {categories.length > 0 && (
                  <Tree
                    checkable
                    selectable={false}
                    treeData={categories}
                    onCheck={handleChange}
                    checkedKeys={checkedKeys}
                  />
                )}
              </Panel>
            </Collapse>

            <Row gutter={[16, 8]} className="actions">
              <Col span={24} className="perform">
                <Button block type="primary" onClick={() => setVisible(false)}>
                  {t('Product.ApplyAllFilters')}
                </Button>
              </Col>
              <Col span={24}>
                <Button block onClick={handleReset}>
                  {t('Product.ResetAll')}
                </Button>
              </Col>
            </Row>
          </div>
        )}
      </MainContainer>

      <FilterButton>
        <Button size="large" block type="primary" onClick={() => setVisible(true)}>
          Categories
        </Button>
      </FilterButton>
    </>
  );
};

const MainContainer = styled.div<{ visible: boolean }>`
  @media (max-width: 992px) {
    display: ${(props) => (props.visible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    width: 100%;
    height: 100%;
    z-index: 1000;
    overflow: auto;

    & .container {
      padding: 16px;
    }
  }

  & .actions {
    margin-top: 16px;
    & .perform {
      display: none;
    }

    @media (max-width: 992px) {
      & .perform {
        display: block;
      }
    }
  }
`;

const FilterButton = styled.div`
  display: none;

  @media (max-width: 992px) {
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    width: 200px;
    display: block;
  }
`;
