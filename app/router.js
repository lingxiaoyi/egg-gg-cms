'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.post('/api/v1/add_root_data', controller.ad.addRootData); // 添加基础数据
  router.post('/api/v1/add_root_ads', controller.ad.bulkCreateAd); // 添加 ad基础数据
  router.resources('ad', '/api/v1/ad', controller.ad);
  router.resources('qid', '/api/v1/qid', controller.qid);
  router.resources('page', '/api/v1/page', controller.page);
  router.resources('project', '/api/v1/project', controller.project);
  router.get('/api/v1/generate_ggfile', controller.index.index);
  router.get('/api/v1/get_menu', controller.index.menu);
  router.get('/api/v1/qid_list', controller.qid.getQidList);
  router.resources('user', '/api/v1/user', controller.user);
  router.post('/api/v1/user/sign_up', controller.user.create);
  router.post('/api/v1/user/sign_out', controller.user.logout);
  // 鉴权成功后的回调页面00
  // router.get('/authCallback', controller.home.authCallback);

  // 渲染登录页面，用户输入账号密码
  // router.get('/login', controller.home.login);
  // 登录校验
  router.post('/api/v1/user/sign_in', app.passport.authenticate('local', { session: true, successRedirect: null }));
};
