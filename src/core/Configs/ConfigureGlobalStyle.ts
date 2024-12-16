import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    font-family: ${(props) => props.theme.typography.fontFamily.main};
  }

  .header-menu-popup {
    & ul.ant-menu, & ul.ant-menu-sub {
      & a,
      & i,
      & .ant-menu-submenu-title{
        color: #fff;

        &:hover {
          color: ${(props) => props.theme.colors.main};
        }
      }

      background:  ${(props) => props.theme.colors.secondary} !important;

      & li.ant-menu-item-selected {
        background: transparent;
      }

      & .ant-menu-item-only-child {
        height: 45px;
        
        &:not(:last-child){
          border-bottom: 1px solid ${(props) => props.theme.colors.main};
        }
      }

      & .ant-menu-submenu-vertical {
        &:not(:last-child){
          border-bottom: 1px solid ${(props) => props.theme.colors.main};
        }
      }
    }
  }

  .react-select.group-style__control {
    width: 220px;
    box-shadow: none;
    border-radius: 4px 0 0 4px;
  }

  .ant-modal-content {
    padding: 16px 32px;

    & .ant-modal-header {
      padding-inline: 0;
      padding-bottom: 24px;
      border-bottom: 1px dashed ${(props) => props.theme.colors.main};
    }
  }
  
  .ant-input-number, & .ant-picker, & .ant-upload {
    width: 100% !important;

    & .ant-progress-inner {
      margin-top: 8px;
    }
  }

 .ant-form-item-has-error {
    & .react-select__control, & .react-select.group-style__control {
      border-color: #f5222d !important;
    }
  }
`;

export default GlobalStyle;
