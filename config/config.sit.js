'use strict';

module.exports = () => {
  const config = exports = {};

  // sequelize options
  config.sequelize = {
    username: 'developer',
    password: '123123',
    database: 'sports_ad',
    host: '172.18.254.39',
    dialect: 'mysql',
    operatorsAliases: false,
    dialectOptions: {
      charset: 'utf8',
      supportBigNumbers: true,
      bigNumberStrings: true,
    },

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    timezone: '+08:00', // 东八时区
  };
  return config;
};
