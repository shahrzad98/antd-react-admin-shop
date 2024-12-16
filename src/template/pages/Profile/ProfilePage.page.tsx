import { Col, Row } from 'antd';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import ChangePassword from '@src/template/containers/Profile/ChangePassword';
import PersonalForm from '@src/template/containers/Profile/PersonalForm';
import { ProfileSidebar } from '@src/template/containers/Profile/ProfileSidebar';
import UserAddresses from '@src/template/containers/Profile/UserAddresses';
import UserDocuments from '@src/template/containers/Profile/UserDocuments';

const ProfilePage: React.FC = () => {
  return (
    <MainContainer>
      <Row gutter={[32, 32]}>
        <Col span={8}>
          <ProfileSidebar />
        </Col>

        <Col span={16}>
          <Content>
            <Routes>
              <Route path="/" element={<PersonalForm />} />
              <Route path="password" element={<ChangePassword />} />
              <Route path="address" element={<UserAddresses />} />
              <Route path="document" element={<UserDocuments />} />
            </Routes>
          </Content>
        </Col>
      </Row>
    </MainContainer>
  );
};

export default ProfilePage;

const MainContainer = styled.div`
  max-width: 1310px;
  margin: 0 auto;
  padding: 32px;

  & div.header {
    margin-top: 16px;
  }
`;

const Content = styled.div`
  padding: 8px 5%;
  background-color: #f5f5f5;
  border-radius: 8px;
  min-height: 620px;
  height: 100%;
`;
