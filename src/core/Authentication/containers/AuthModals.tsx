import { Modal } from 'antd';
import React, { useContext } from 'react';

import { AuthContext } from '../service/AuthProvider';
import ForgetContainer from './ForgetContainer';
import LoginContainer from './LoginContainer';
import RegisterContainer from './RegisterContainer';

const AuthModals: React.FC = () => {
  const { isLoginOpen, isRegisterOpen, isForgotPasswordOpen, setLoginOpen, setRegisterOpen, setForgotPasswordOpen } =
    useContext(AuthContext);

  const handleLoginPageChange = (page: string) => {
    if (page === 'register') {
      setLoginOpen(false);
      setRegisterOpen(true);
    } else if (page === 'forget') {
      setLoginOpen(false);
      setForgotPasswordOpen(true);
    }
  };

  const handleRegisterPageChange = (page: string) => {
    if (page === 'login') {
      setLoginOpen(true);
      setRegisterOpen(false);
    }
  };

  return (
    <>
      <Modal width={500} footer={false} destroyOnClose visible={isLoginOpen} onCancel={() => setLoginOpen(false)}>
        <LoginContainer onCallback={() => setLoginOpen(false)} onChangePage={handleLoginPageChange} />
      </Modal>

      <Modal width={500} footer={false} destroyOnClose visible={isRegisterOpen} onCancel={() => setRegisterOpen(false)}>
        <RegisterContainer onCallback={() => setRegisterOpen(false)} onChangePage={handleRegisterPageChange} />
      </Modal>

      <Modal
        width={500}
        footer={false}
        destroyOnClose
        visible={isForgotPasswordOpen}
        onCancel={() => setForgotPasswordOpen(false)}
      >
        <ForgetContainer onCallback={() => setRegisterOpen(false)} />
      </Modal>
    </>
  );
};

export default AuthModals;
