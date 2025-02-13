import { join } from 'path';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { isProd, rootDir, webpackDir } from '../utils/env';

export const cssLoader = {
  loader: 'css-loader',
};

export const sassLoaderItems = [
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
      implementation: require('sass'),
    },
  },
];

export const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      config: join(webpackDir, './config/postcss.js'),
    },
    sourceMap: true,
  },
};

export const miniCssExtractLoader = isProd
  ? {
      loader: MiniCssExtractPlugin.loader,
      options: {
        esModule: false,
      },
    }
  : {
      loader: 'style-loader',
      options: {
        esModule: false,
      },
    };

export const lessLoader = {
  loader: 'less-loader',
  options: {
    sourceMap: true,
    lessOptions: {
      javascriptEnabled: true,
    },
  },
};

export const typingsCssModulesLoader = {
  loader: '@teamsupercell/typings-for-css-modules-loader',
  options: {
    banner: '// autogenerated by typings-for-css-modules-loader. \n// Please do not change this file!',
    formatter: 'prettier',
  },
};

export const resolveUrlLoader = {
  loader: 'resolve-url-loader',
  options: {
    sourceMap: true,
  },
};

export const babelLoader = {
  loader: 'babel-loader',
  options: {
    configFile: join(rootDir, '/.babelrc.js'),
  },
};

export const cssModulesSupportLoaderItems = [
  miniCssExtractLoader,
  typingsCssModulesLoader,
  {
    ...cssLoader,
    options: {
      esModule: false,
      modules: {
        exportLocalsConvention: 'camelCaseOnly',
        localIdentName: '[local]__[contenthash:base64:5]',
      },
    },
  },
];

export const cssLoaderItems = [miniCssExtractLoader, cssLoader];
