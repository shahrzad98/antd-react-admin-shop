import { Col, Row, Skeleton } from 'antd';
import React from 'react';
import styled from 'styled-components';

export const CardSkelton: React.FC<{ isVariation?: boolean }> = ({ isVariation = false }) => {
  return (
    <MainContainer>
      <div className="image">
        <Skeleton.Image />
      </div>

      <div className="content">
        <Skeleton active paragraph={{ rows: 3 }} />
      </div>

      <Row justify="space-between">
        {isVariation ? (
          <Skeleton.Button block active />
        ) : (
          <>
            <Col>
              <Skeleton.Button active />
            </Col>
            <Col>
              <Skeleton.Button active />
            </Col>
          </>
        )}
      </Row>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  padding: 16px;
  border-radius: 4px;
  border: 1px solid #e0e3e7;

  & .content {
    padding-bottom: 8px;
  }

  & .image {
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;

    & .ant-skeleton-element {
      width: 80%;
      height: 80%;

      & .ant-skeleton-image {
        width: 100%;
        height: 100%;
        border-radius: 8px;
      }
    }
  }
`;
