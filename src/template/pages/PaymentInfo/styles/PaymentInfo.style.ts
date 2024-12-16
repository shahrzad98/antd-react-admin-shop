import styled from 'styled-components';

import { device } from '@src/shared/styles';

const MainContainer = styled.div`
  margin: 0 auto;
  padding: 64px;
  max-width: 1310px;

  @media ${device.mobileL} {
    padding: 16px;
  }

  & .ant-tabs-top > .ant-tabs-nav::before {
    border-bottom: 0;
  }

  & .ant-tabs-ink-bar.ant-tabs-ink-bar-animated {
    display: none;
  }

  & .ant-tabs-tab-active {
    & button {
      background: ${(props) => props.theme.colors.main};
      color: #fff;
    }
  }

  & .ant-tabs-tab {
    & button {
      font-weight: bold;
    }
  }
  & .cart-style {
    display: flex;
    flex-direction: column;
    justify-content: center;

    & .promo-code {
      font-size: 30px;
      color: #173d56;
      border: 1px solid #0d83d1;
      align-self: center;
      padding: 5px 10px;
      margin-top: 40px;
      border-radius: 5px;
      box-shadow: 1px 0px 7px 0px #0d83d1;
      & .anticon {
        -ms-transform: rotate(90deg); /* IE 9 */
        transform: rotate(270deg);
      }
    }
    & .ant-form-item-control-input-content {
      & .ant-input-suffix {
        & .ant-btn {
          font-size: 16px;
          color: #0d83d1;
        }
      }
    }
    & .btn-buy-style {
      font-weight: bold;
      margin-top: 60px;
      margin-bottom: 20px;
      color: #ffffff;
      align-self: center;
      padding: 5px 60px;
      border-radius: 7px;
      span {
        font-size: 20px;
      }
      & + div {
        font-size: 18px;
        color: black;
        text-align: center;
        margin-bottom: 40px;
        font-weight: bold;
      }
    }

    & .shipping-price {
      padding-left: 16px;
    }

    & .total-payment {
      font-size: 20px;
      padding: 16px;

      & div:first-child span {
        color: black;
      }
      & div:last-child span {
        color: black;
        margin-right: 8px;
        &:first-child {
          font-size: 22px;
          font-weight: bold;
          color: #8d9194;
        }
        &:last-child {
          font-size: 22px;
          font-weight: bold;
          color: ${(props) => props.theme.colors.main};
        }
      }
    }
  }
  & .coupon-code {
    position: absolute;
    top: 30px;
    left: 10%;
    right: 10%;
    text-align: center;
    color: #173d56;
    font-size: 30px;
    font-weight: bold;
    & + div {
      position: absolute;
      text-align: center;
      bottom: 30px;
      left: 10px;
      right: 10px;
      color: #8d9194;
      font-size: 25px;
      font-weight: bold;
    }
  }

  & .cart-items-list {
    max-height: 80vh;
    overflow-y: auto;
    padding: 10px 20px;
  }
`;

export default { MainContainer };
