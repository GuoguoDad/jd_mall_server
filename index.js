const Koa = require('koa');
const { koaBody } = require('koa-body');
const Router = require('@koa/router');
const jsonp = require('koa-safe-jsonp')
const mock = require('mockjs-lite')
const {queryCartGoodsList, queryMaybeLikeList, categoryList, queryContentByCategory, queryGoodsListByPage,
  queryGoodsDetail, queryStoreGoodsList, queryHomePageInfo, queryMineInfo, loginResponse
} = require('./map')

async function boot() {
  const app = new Koa();
  const router = new Router();

  jsonp(app, {
    callback: 'callback',
    limit: 50,
  });

  router.all('/cart/queryCartGoodsList',
    (ctx) => {
      ctx.jsonp = mock.mock(queryCartGoodsList)
    }
  )

  router.all('/cart/queryMaybeLikeList',
    (ctx) => {
      ctx.jsonp = mock.mock(queryMaybeLikeList)
    }
  )

  router.all('/category/list',
    (ctx) => {
      ctx.jsonp = mock.mock(categoryList)
    }
  )

  router.all('/category/queryContentByCategory',
    (ctx) => {
      ctx.jsonp = mock.mock(queryContentByCategory)
    }
  )

  router.all('/common/queryGoodsListByPage',
    (ctx) => {
      ctx.jsonp = mock.mock(queryGoodsListByPage)
    }
  )

  router.all('/detail/queryGoodsDetail',
    (ctx) => {
      ctx.jsonp = mock.mock(queryGoodsDetail)
    }
  )

  router.all('/detail/queryStoreGoodsList',
    (ctx) => {
      ctx.jsonp = mock.mock(queryStoreGoodsList)
    }
  )


  router.all('/home/queryHomePageInfo',
    (ctx) => {
      ctx.jsonp = mock.mock(queryHomePageInfo)
    }
  )

  router.all('/mine/queryMineInfo',
    (ctx) => {
      ctx.jsonp = mock.mock(queryMineInfo)
    }
  )

  router.all('/common/login',
    (ctx) => {
      ctx.jsonp = mock.mock(loginResponse)
    }
  )


  app.use(
    koaBody({
      multipart: true,
    })
  );

  app.use(router.routes());
  app.use(router.allowedMethods());


  app.listen(3000);
  console.log(`[mock] Mock server is running successful`);
}
boot();

