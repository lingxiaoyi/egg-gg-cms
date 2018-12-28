'use strict';
module.exports = function() {
  return async function(ctx, next) {
    if (ctx.isAuthenticated()) {
      await next();
    } else {
      ctx.status = 401;
      ctx.body = { error: 'Unauthorized' };
    }
  };
};
