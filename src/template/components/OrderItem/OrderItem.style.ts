import { device } from '@src/shared/styles';
import styled from 'styled-components';

const MainContainer = styled.div`
  margin-bottom: 16px;

  & .image-holder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > div {
      max-width: 150px;
    }
  }
  & button {
    border-radius: 8px !important;
  }
  & .ant-card {
    position: relative;
    overflow: hidden;

    & .name {
      color: #4e4e4e;
      font-size: 1.32em;
      border-left: solid;
      border-left-color: #173d56;
      padding: 8px;
    }

    & .ant-col:nth-child(2) {
      & button {
        width: 180px;
      }

      & .ant-typography-secondary {
        color: #8d9194;
        font-size: 1.32em;
      }

      & button:first-child {
        background-color: ${(props) => props.theme.colors.main};
        margin: 8px;
        color: #ffffff;
        font-size: 1.24em;
      }
      & button:last-child {
        color: #4e4e4e;
        font-size: 1.24em;
      }
    }

    & .ant-col:last-child button {
      width: 100%;
      margin: 4px;
      margin-top: 16px;
      font-size: 1.12em;
      color: #4e4e4e;
    }
  }

  & .detail-header {
    border-bottom: 1px solid #eee;
    margin-bottom: 16px;
    padding-bottom: 16px;
    display: flex;
    overflow-x: auto;

    & > * {
      min-width: max-content;
    }

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

  & .navigator {
    display: flex;
    justify-content: center;
    margin-top: 4px;

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
  }
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & .product-image {
    width: 100%;
    max-width: 150px;
    max-height: 150px;
  }

  & .calendar {
  }

  @media ${device.mobileL} {
    & .calendar {
      flex-direction: column;
      & > div {
        margin-top: 16px !important;
      }
    }
  }
`;

const CalenderContainer = styled.div`
  display: flex;
  margin-top: 16px;
  align-items: center;

  & .ant-typography-secondary,
  & strong {
    font-size: 0.94em !important;
  }

  & > div {
    margin: 0 !important;
    border-left: none !important;
    padding: 0 !important;
    font-size: 1em !important;
    margin-right: 16px !important;
  }

  & .ant-typography {
    margin: 0 4px;
  }

  @media ${device.mobileL} {
    flex-direction: column;
    align-items: baseline;

    & > div {
      margin-right: 0px !important;
      margin-top: 16px !important;
    }
  }
`;
export default { MainContainer, DetailContainer, CalenderContainer };
