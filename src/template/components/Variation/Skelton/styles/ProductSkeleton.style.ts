import styled from 'styled-components';

const MainContainer = styled.div`
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid #b8bed3;

  & .image {
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;

    & .ant-skeleton-element {
      width: 80%;
      height: 80%;

      & .ant-skeleton-image {
        width: 100%;
        height: 100%;
        border-radius: 16px;
      }
    }
  }

  & .content {
    padding: 16px 32px;
  }
`;
export default { MainContainer };
