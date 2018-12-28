'use strict';

module.exports = () => {
  const config = exports = {};
  // sequelize options
  config.sequelize = {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
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
