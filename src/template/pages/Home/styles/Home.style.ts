import styled from 'styled-components';

const Container = styled.div`
  & > * {
    border-bottom: 2px solid ${(props) => props.theme.colors.main};
  }

  & .double-image {
    width: 100%;

    & img {
      width: 50%;
    }
  }
`;

export default { Container };
