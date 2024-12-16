import { Skeleton } from 'antd';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

export default function SidebarSkeleton(): ReactElement {
  return (
    <MainContainer>
      <div className="content">
        <Skeleton active paragraph={{ rows: 8 }} />
      </div>

      <Skeleton.Button block active />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  padding: 16px;
  border: 1px solid #e0e3e7;
  border-radius: 4px;

  & .content {
    padding-bottom: 8px;
  }
`;
