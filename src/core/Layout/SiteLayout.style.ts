import { device } from '@src/shared/styles';
import styled from 'styled-components';

const MainContainer = styled.section`
  position: relative;
`;

const AppContainer = styled.div`
  overflow-y: hidden;

  & .contents-container {
    min-height: 100vh;
    margin-top: 100px;

    @media ${device.mobileL} {
      & {
        margin-top: 50px;
      }
    }

    @media ${device.tablet} {
      & {
        margin-top: 75px;
      }
    }
  }
`;

export default { AppContainer, MainContainer };
