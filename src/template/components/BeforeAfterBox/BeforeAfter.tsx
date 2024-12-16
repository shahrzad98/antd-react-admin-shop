import { Col, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export default function BeforeAfter(): JSX.Element {
  const { t } = useTranslation();

  return (
    <Container>
      <Row>
        <Col xs={24}>
          <ImageTitle>{t('Main.BeforeAfter')}</ImageTitle>
          <img src={require('@src/assets/images/temp/mainBeforeAndAfter.png')} alt="before-and-after-cleafin" />
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

const ImageTitle = styled.p`
  font-family: 'Helvetica';
  background-color: ${(props) => props.theme.colors.secondary};
  text-align: center;
  color: #fff;
  margin: 0;
  font-size: 2.64em;
  padding: 10px 0;
`;
