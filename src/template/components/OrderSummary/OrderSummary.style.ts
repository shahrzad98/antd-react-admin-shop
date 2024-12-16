import styled from 'styled-components';

const MainContainer = styled.div`
  & .ant-row:first-child {
    margin-bottom: 16px;
    & div {
      font-size: 1.4em;
      color: #173d56;
      font-weight: bold;
    }

    & button {
      color: #0d83d1;
      font-weight: 500;
      background-color: rgba(13, 131, 209, 0.08);
      border: none;
      padding: 2px 16px;
      border-radius: 4px !important;
    }
  }
  & .ant-row.table {
    padding-bottom: 8px;
    border-bottom: 1px solid #cdced5;
    & .ant-col {
      font-size: 1.32em;
      margin-bottom: 16px;
    }

    & .ant-col:nth-child(even) {
      color: #173d56;
      font-weight: 600;
      text-align: right;
    }
    & .ant-col:nth-child(odd) {
      color: #8d9194;
    }
    & .ant-col:last-child {
      color: ${(props) => props.theme.colors.main};
      font-size: 1.44em;
    }
  }
  & .ant-row:last-child {
    margin-top: 16px;
    & div:first-child {
      color: #173d56;
      font-size: 1.4em;
      font-weight: bold;
    }
    & div:last-child {
      color: #173d56;
      font-size: 1.44em;
      font-weight: bold;
    }
  }
`;
export default { MainContainer };
