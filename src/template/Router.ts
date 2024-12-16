import { lazy } from 'react';

export default [
  {
    path: '/',
    Component: lazy(() => import('./pages/Home/Home.page')),
  },
  {
    path: '/profile/*',
    Component: lazy(() => import('./pages/Profile/ProfilePage.page')),
  },

  {
    path: '/partner',
    Component: lazy(() => import('./pages/Partner/Partner.page')),
  },

  {
    path: '/reset-password',
    Component: lazy(() => import('../core/Authentication/pages/ResetPassword.page')),
  },

  {
    path: '/cart/callback',
    Component: lazy(() => import('./pages/Order/OrderCallback.page')),
  },

  {
    path: '/order',
    Component: lazy(() => import('./pages/Order/Order.page')),
  },

  {
    path: '/order/:order_id',
    Component: lazy(() => import('./pages/Order/OrderDetails.page')),
  },

  {
    path: '/cart',
    Component: lazy(() => import('./pages/Basket/Basket.page')),
  },
  {
    path: '/payment-info',
    Component: lazy(() => import('./pages/PaymentInfo/PaymentInfo.page')),
  },
  {
    path: '/legals/:id',
    Component: lazy(() => import('./pages/Legal/Legal.page')),
  },
  {
    path: '/category',
    Component: lazy(() => import('./pages/Product/ProductsCategory.page')),
  },

  {
    path: '/products/:product_id',
    Component: lazy(() => import('./pages/Product/Product.page')),
  },

  {
    path: '/products/:product_id/:variation_id',
    Component: lazy(() => import('./pages/Product/Product.page')),
  },
];
