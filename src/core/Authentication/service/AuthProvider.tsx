import React, { ReactElement, createContext, useState } from 'react';

interface IAuthContext {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  isForgotPasswordOpen: boolean;
  setLoginOpen: (toggle: boolean) => void;
  setRegisterOpen: (toggle: boolean) => void;
  setForgotPasswordOpen: (toggle: boolean) => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export default function AuthProvider({ children }: { children: ReactElement }): ReactElement {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isForgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isLoginOpen,
        isRegisterOpen,
        isForgotPasswordOpen,
        setLoginOpen,
        setRegisterOpen,
        setForgotPasswordOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
