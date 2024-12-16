import GlobalStyles from '@config/ConfigureGlobalStyle';
import { shopTheme } from '@config/ConfigureTheme';
import { Loader } from '@shared/components';
import { ConfigProvider } from 'antd';
import React, { Suspense, useEffect } from 'react';
import ReactGA from 'react-ga';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { AuthProvider, SiteLayout } from '@src/core';
import { getUserAppProfile } from '@src/core/Authentication/service/Auth.Controller';

import BasketController from '@logic/Basket/controller/Basket.controller';
import FavoriteController from '@logic/Favorite/controller/Favorite.controller';
import MainController from '@logic/Main/controller/Main.controller';

import './core/i18n/config';
import { getAnalytics } from './logic/Main/store/Main.selector';
import SocialMediaController from './logic/SocialMedia/controller/SocialMedia.controller';
import { validateFormMessages } from './shared/utils';
import ShopRoutes from './template/Router';

export const App = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { item: analytics } = useSelector(getAnalytics);

  useEffect(() => {
    ConfigProvider.config({ theme: { primaryColor: shopTheme.colors.main } });
    dispatch(getUserAppProfile());
    dispatch(MainController.getAnalyticsForShop());
    dispatch(FavoriteController.getAllFavorites());
    dispatch(MainController.getConfigsDataForApp());
    dispatch(SocialMediaController.getSocialMedias());
    dispatch(BasketController.getBasketProductsFromStorage());
  }, []);

  useEffect(() => {
    if (analytics) {
      if (analytics.data[0] && analytics.data[0].google !== '') {
        ReactGA.initialize(analytics.data[0].google);
      }
    }
  }, [analytics]);

  return (
    <Suspense fallback={<Loader isFullPage />}>
      <ConfigProvider form={{ validateMessages: validateFormMessages }}>
        <ThemeProvider theme={shopTheme}>
          <AuthProvider>
            <BrowserRouter>
              <SiteLayout>
                <Routes>
                  {ShopRoutes.map(({ Component, path }, index) => (
                    <Route key={`shop-route-${index}`} path={path} element={<Component />} />
                  ))}
                </Routes>
              </SiteLayout>
            </BrowserRouter>
          </AuthProvider>

          <GlobalStyles />
        </ThemeProvider>
      </ConfigProvider>
    </Suspense>
  );
};
