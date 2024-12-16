import { Row } from 'antd';
import styled from 'styled-components';

const MainContainer = styled(Row)`
  padding-top: 16px;

  & button {
    min-width: 220px;
  }
`;

export default { MainContainer };
