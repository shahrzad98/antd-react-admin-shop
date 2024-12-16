import { device } from '@src/shared/styles';
import styled from 'styled-components';

const MainContainer = styled.div`
  background-color: ${(props) => props.theme.colors.secondary};

  & .ant-typography {
    color: #fff;
    font-size: 15px;
  }

  & .title {
    padding-block: 16px;
    text-align: center;

    & h1 {
      color: #fff;
      margin: 0;
      font-size: 2.64em;
    }
  }

  & .pictures {
    & .ant-col {
      width: 20%;
      height: 100%;
    }

    & .ant-col > img {
      width: 100%;
      height: 100%;
    }

    @media ${device.tablet} {
      & .ant-col {
        width: 33.3%;
      }

      & .ant-col:nth-child(4),
      & .ant-col:nth-child(5) {
        width: 50%;
      }
    }
  }

  .news-letter {
    margin-top: 138px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .news-letter-big-title {
      font-size: 30px;
      font-family: Garamond;
      color: white;
      margin-top: 28px;
      margin-bottom: 0;
    }
    .news-letter-big-title-hint {
      color: white;
      margin-top: 12px;
      font-size: 20px;
      margin-bottom: 0;
    }

    & .ant-input {
      border: none;
      outline: none;
      background: none;
      font-size: 20px;
      color: white;
    }
  }
  .impression > span {
    padding-bottom: 8px;
    border-bottom: 4px solid ${(props) => props.theme.colors.main};
  }

  .news-letter-input {
    background: none;
    border: none;
    outline: none;
    transition: 0.5s all;
    font-size: 20px;
    color: white;
    border-bottom: 5px solid black;

    & .ant-input {
      color: black;
    }
    & .ant-input-affix-wrapper {
      background: none;
      border: none;
      outline: none;

      &-focused {
        background: none;
      }
    }
  }
  .ant-form-item-has-error .ant-input-affix-wrapper,
  .ant-form-item-has-error :not(.ant-input-disabled):not(.ant-input-borderless).ant-input {
    background: none !important;
    &:hover {
      background: none;
    }
  }

  .news-letter-active {
    background: ${(props) => props.theme.colors.main};
    color: white;
  }
`;

export default { MainContainer };
