import { Spin } from 'antd';
import React from 'react';
import styled from 'styled-components';

const LoaderContainer = styled.div`
  width: 100%;
  min-height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;

  &.isFullPage {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 2222222;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 100%;
  }
`;

const Loader: React.FC<{ isFullPage?: boolean }> = ({ isFullPage = false }) => {
  return (
    <LoaderContainer className={isFullPage ? 'isFullPage' : ''}>
      <Spin />
    </LoaderContainer>
  );
};

export default Loader;
