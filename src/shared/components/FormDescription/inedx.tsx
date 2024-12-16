import { Divider, Row, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

export const FormDescription: React.FC = () => {
  return (
    <MainContainer>
      <Divider style={{ margin: '10px 0 5px 0' }} />
      <Row>
        <Typography.Text style={{ fontSize: '0.8rem' }}>pflichtfeld</Typography.Text>
      </Row>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  margin-bottom: 24px;

  & .ant-typography {
    &::before {
      display: inline-block;
      margin-right: 4px;
      color: #ff4d4f;
      font-size: 14px;
      font-family: SimSun, sans-serif;
      line-height: 1;
      content: '*';
    }
  }
`;
