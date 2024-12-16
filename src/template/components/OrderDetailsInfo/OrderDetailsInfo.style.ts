import styled from 'styled-components';

const MainContainer = styled.div`
  height: 100%;
  & .ant-card,
  & .ant-row:last-child {
    height: 100%;
  }

  & .ant-card-body {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  & .col {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  white-space: pre-wrap;
  & .ant-row:first-child {
    margin-bottom: 16px;
    & div {
      font-size: 1.4em;
      color: #173d56;
      font-weight: bold;
    }
  }

  & strong {
    color: #173d56;
    font-weight: 600;
    font-size: 1.32em;
  }

  & .ant-col {
    color: #8d9194;
    font-size: 1.32em;
    padding-left: 0 !important;
    margin-bottom: 16px;
  }

  & .colors {
    display: flex;
    align-self: flex-end;
    margin-left: auto;
    & div {
      width: 36px;
      height: 36px;
      border-radius: 16px;
      background-color: red;

      &:last-child {
        background-color: yellow;
        margin-left: -8px;
      }
    }
  }
`;
export default { MainContainer };
