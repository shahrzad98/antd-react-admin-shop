import React, { ReactElement, useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { useLocation } from 'react-router-dom';

import { AuthModals } from '@src/core/Authentication/containers';

import Cookies from './Cookies';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Styles from './SiteLayout.style';

export default function SiteLayout({ children }: { children: ReactElement }): ReactElement {
  const { pathname } = useLocation();
  const [isOpen, setOpen] = useState<boolean>(typeof localStorage.getItem('cookie_acc') !== 'string');

  useEffect(() => {
    // Scroll To Top When Page changes
    window.scrollTo(0, 0);

    if (pathname) {
      ReactGA.pageview(pathname);
    }
  }, [pathname]);

  const handleAccept = () => {
    localStorage.setItem('cookie_acc', 'true');
    setOpen(false);
  };

  return (
    <Styles.MainContainer>
      <Styles.AppContainer>
        <Header />
        <div className="contents-container">{children}</div>
        <Footer />
      </Styles.AppContainer>

      <AuthModals />

      <Cookies open={isOpen} onAccept={handleAccept} />
    </Styles.MainContainer>
  );
}
