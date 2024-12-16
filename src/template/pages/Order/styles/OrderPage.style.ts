import styled from 'styled-components';

import { device } from '@src/shared/styles';

const Container = styled.div`
  max-width: 1310px;
  margin: 0 auto;
  padding: 16px;

  @media ${device.tablet} {
    padding: 16px;
  }
`;

export default { Container };
