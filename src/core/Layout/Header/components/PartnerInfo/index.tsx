import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Env } from '@src/core';
import { device } from '@src/shared/styles';

type Props = { partner: { name: string; description: string }; email: string; phone: string; image: string };
const PartnerInfo = ({ email, phone, partner, image }: Props): ReactElement => {
  return (
    <MainContainer>
      <Link to="/">
        {image ? (
          <div className="profile-image">
            <img src={Env.PURE_URL + image} alt="profile" />
          </div>
        ) : (
          <img src={'/assets/images/global/cleafin-logo.png'} alt="Logo" />
        )}
      </Link>
      {partner && (
        <div className="partner-info">
          <div className="name">
            <Link to={'/partner'}>{partner.name}</Link>
          </div>
          <div className="static">
            <span>{partner.description}</span>
          </div>
          <div className="email">{email && <span>{email}</span>}</div>
          <div>{phone && <span>{phone}</span>}</div>
        </div>
      )}
    </MainContainer>
  );
};

export default PartnerInfo;

const MainContainer = styled.div`
  display: flex;
  color: white;
  align-items: center;

  & .profile-image {
    & img {
      width: 75px;
      border-radius: 50%;
      border: 1px solid #fff;

      @media ${device.tablet} {
        width: 50px;
        margin-left: 16px;
      }

      @media ${device.mobileL} {
        width: 35px;
      }
    }
  }

  & .partner-info {
    margin-left: 16px;
  }

  @media (max-width: 900px) {
    & .static {
      display: none;
    }
  }

  @media (max-width: 500px) {
    & .partner-info {
      display: none;
    }
  }

  & img {
    height: 75px;

    @media ${device.tablet} {
      height: 50px;
      margin-left: 16px;
    }

    @media ${device.mobileL} {
      height: 35px;
    }
  }

  & a {
    color: white;
  }
`;
