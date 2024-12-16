import { notification } from 'antd';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LoginFormComponent } from '../components';
import { LoginForm } from '../model';
import { loginUserToApp } from '../service/Auth.Controller';
import AuthSelector from '../service/Auth.Selector';

export default function LoginContainer({
  onCallback,
  onChangePage,
}: {
  onCallback: () => void;
  onChangePage: (page: string) => void;
}): ReactElement {
  const dispatch = useDispatch();
  const isAuthPending = useSelector(AuthSelector.isAuthPending);

  const handleSubmit = (values: LoginForm): void => {
    dispatch(
      loginUserToApp({
        values,
        callback: () => {
          onCallback();
          notification.success({
            message: 'Logged In Successfully',
            description: "You're Redirecting To Your Dashboard",
          });
        },
      }),
    );
  };

  return <LoginFormComponent onSubmit={handleSubmit} isPending={isAuthPending} onChangePage={onChangePage} />;
}
