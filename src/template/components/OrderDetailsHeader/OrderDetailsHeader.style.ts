import styled from 'styled-components';

const MainContainer = styled.div`
  & .detail-header {
    border-bottom: 1px solid #eee;
    margin-bottom: 16px;
    padding-bottom: 16px;
    display: flex;

    & .ant-select-selector {
      border: none;
      color: ${(props) => props.theme.colors.main};
      font-weight: 500;
    }

    & .ant-select-arrow {
      color: ${(props) => props.theme.colors.main};
    }

    & .item {
      border-right: 1px solid #eee;
      padding: 0 16px;
      display: flex;
      align-items: center;
      height: auto;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        border-right: none;
      }

      & .col {
        display: flex;
        flex-direction: column;
        margin-left: 8px;
      }

      & h4 {
        margin: 0;
        margin-left: 8px;
        color: ${(props) => props.theme.colors.main};
      }
    }
    & button {
      margin-left: auto;
      font-weight: 500;
      border: none;
      padding: 2px 16px;
      border-radius: 4px !important;
      &.completed {
        color: #0d83d1;
        background-color: rgba(13, 131, 209, 0.08);
      }
      &.cancelled {
        color: ${(props) => props.theme.colors.main};
        background-color: rgba(247, 97, 125, 0.08);
      }
      &.waiting {
        color: #888;
        background-color: rgba(136, 136, 136, 0.08);
      }
    }
  }

  & .item {
    display: flex;
    align-items: center;
    & .arrow {
      transform: scaleY(1.6);
      margin-left: 4px;
      & span {
        font-size: 1.32em;
      }
    }

    &:first-child span {
      color: #8d9194;
    }

    &:last-child span {
      color: ${(props) => props.theme.colors.main};
    }
  }
`;
export default { MainContainer };
