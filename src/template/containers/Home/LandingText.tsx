import TemplateSelector from '@src/logic/Template/store/Template.selector';
import { device } from '@src/shared/styles';
import { Col, Row, Skeleton } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

export default function LandingText(): JSX.Element {
  const { item: template, isPending } = useSelector(TemplateSelector.getTemplates);

  const render = (child: JSX.Element) => {
    if (!isPending && template) return child;
    else return <Skeleton paragraph={{ rows: 6 }} />;
  };

  return render(
    <Container>
      <Row>
        <Col xs={24}>
          <div className="title" dangerouslySetInnerHTML={{ __html: template?.title ?? '' }} />
        </Col>
        <Col xs={24} className="bodyContainer">
          <div className="body" dangerouslySetInnerHTML={{ __html: template?.body ?? '' }} />
        </Col>
        <Col xs={24} className="summaryContainer">
          <div className="summary" dangerouslySetInnerHTML={{ __html: template?.summary ?? '' }} />
        </Col>
      </Row>
    </Container>,
  );
}

const Container = styled.div`
  padding: 32px;
  max-width: 1310px;
  margin: 0 auto;

  @media ${device.mobileL} {
    padding: 32px 0px;
  }

  & .title {
    display: flex;
    justify-content: center;
    font-size: 1.4rem;
    text-transform: uppercase;
  }

  & .body {
    border: 1px solid ${(props) => props.theme.colors.grey};
    border-radius: 16px;
    padding: 16px;
    max-width: 100%;

    & img {
      max-width: 100%;
    }
  }

  & .summary {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    padding: 8px;
    min-width: 16%;
    cursor: pointer;
  }

  & .summary > * {
    color: white !important;
    margin-bottom: 0 !important;
    text-transform: uppercase;
  }

  & .bodyContainer,
  & .summaryContainer {
    display: flex;
    justify-content: center;
  }

  & > * > * {
    margin-bottom: 16px;
  }
`;
