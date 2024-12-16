import { notification } from 'antd';
import moment from 'moment';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAppCountries, getAppLanguages } from '@src/logic/Main/controller/Main.controller';

import { RegisterFormComponent } from '../components';
import { RegisterForm, RegisterFormContext } from '../model';
import { registerUserInApp } from '../service/Auth.Controller';
import AuthSelector from '../service/Auth.Selector';

export default function RegisterContainer({
  onCallback,
  onChangePage,
}: {
  onCallback: () => void;
  onChangePage: (page: string) => void;
}): ReactElement {
  const dispatch = useDispatch();
  const isAuthPending = useSelector(AuthSelector.isAuthPending);

  useEffect(() => {
    dispatch(getAppCountries());
    dispatch(getAppLanguages());
  }, []);

  const handleSubmit = ({ country, language, birth_date, ...restValues }: RegisterFormContext): void => {
    const finalValues: RegisterForm = {
      ...restValues,
      country_id: country.id,
      language_id: language.id,
      birth_date: moment(birth_date).format('YYYY-MM-DD'),
    };

    dispatch(
      registerUserInApp({
        values: finalValues,
        callback: () => {
          onCallback();
          notification.success({
            message: 'Registered Successfully',
            description: "You're Redirecting To Your Dashboard",
          });
        },
      }),
    );
  };

  return <RegisterFormComponent onSubmit={handleSubmit} isPending={isAuthPending} onChangePage={onChangePage} />;
}
