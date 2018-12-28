'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1541735248311_6995';

  // add your config here
  config.middleware = [ 'errorHandler', 'verify' ];
  config.errorHandler = {
    match: '/api',
  };
  config.verify = {
      //match: ['/api/v1/[!user]'],
      match: /\/api\/v1\/(?!user)/i, //匹配/api/v1 并且后边非user的就成功
  };
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ 'http://localhost:4200', 'http://localhost:9528', 'http://127.0.0.1:9528', 'http://127.0.0.1:7001', 'http://95.169.30.124' ],
  };
  config.cors = {
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  return config;
};
