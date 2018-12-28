'use strict';

const Service = require('egg').Service;

class NewsService extends Service {
  async echo() {
    console.log(1);
  }
}

module.exports = NewsService;
