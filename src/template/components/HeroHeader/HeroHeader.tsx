import { Col, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';

export default function HeroHeader(): JSX.Element {
  return (
    <Container>
      <Row>
        <Col xs={24}>
          <img src={require('@src/assets/images/temp/mainHeader.png')} alt="main-header" />
        </Col>
      </Row>
    </Container>
  );
}

const Container = styled.div`
  & img {
    width: 100%;
  }
`;
