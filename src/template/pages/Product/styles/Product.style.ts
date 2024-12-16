import { Row } from 'antd';
import styled from 'styled-components';

const ProductContainer = styled(Row)`
  padding: 32px 16px;
  margin-bottom: 80px;
  max-width: 1310px;
  margin: 0 auto !important;

  & .options {
    color: #000;
    margin-top: 70px;
  }

  & .attribute-value {
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    box-shadow: 0 0 4px 1px rgb(0 0 0 / 10%);
    height: 35px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    margin-top: 10px;
  }

  & .p-0 {
    padding: 0 !important;
  }
`;

const EmptyContainer = styled.div`
  padding: 64px;
`;

export default { ProductContainer, EmptyContainer };
