const withLess = require('next-with-less');

console.log('==>env', process.env.STAGE);

/** 项目运行环境 */
const projectEnv = process.env.STAGE || 'local';

/** 是否为本地开发环境 */
const isLocal = projectEnv === 'local';

const envConfigMap = {
  local: {},
  prod: {},
};
const envConfig = envConfigMap[projectEnv] || {};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  lessLoaderOptions: {
    lessOptions: {
      modifyVars: {},
      javascriptEnabled: true,
    },
  },
  env: {
    PROJECT_ENV: projectEnv,
    IS_LOCAL: isLocal,
    // sentry 上报地址
    ...envConfig,
  },
};

module.exports = withLess(nextConfig);
