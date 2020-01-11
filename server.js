const http = require('http');
const fs = require('fs');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const koaBody = require('koa-body');
const request = require('request');

const categories = JSON.parse(fs.readFileSync('./data/categories.json'));
const items = JSON.parse(fs.readFileSync('./data/products.json'));
const topSaleIds = [66, 65, 73];
const moreCount = 6;


const app = new Koa();
app.use(cors());
app.use(koaBody({
    json: true,
    urlencoded: true,
    multipart: true,
}));

const router = new Router();

let key = 0;

 
 // app.use(koaStatic(publ));
  
 // let catalog = fs.readdirSync(publ);
  
  app.use(async (ctx) => {
    ctx.response.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': ['DELETE', 'PUT', 'PATCH'],
    });
    if (ctx.request.method === 'OPTIONS') {
      ctx.response.body = '';
    }

    ctx.response.body = 'server response';
  
if (ctx.request.method === 'POST') {
 ctx.response.body = key;
    let obj = ctx.request.body;
//console.log(JSON.parse(obj))

request({
  method: 'POST',
  url: 'https://nickolaylabazov.amocrm.ru/oauth2/access_token',
 
 form: {
    "client_id": "3ee4d2d1-8272-49ca-b068-64a6068570b4",
    "client_secret": "1a6fXO3Pdsk43rhS3AMdZtVVfCmPoKuZTRBc0vSJh4nM9vhJJeOUFgizf6Tvic5m",
    "grant_type": "authorization_code",
    "code": "def50200318217f8af82d3c18d04c111895d8f4450080a957d2e08d0dc8fef0e3dcbfc6bc3a02f3e90d7b5eff6683f6771706b7dcee4e7a9d0d5606edb847fc3be53ed22afc330875b5c67cf65a1d4f16fadb3b0a3492673e79ae976c3c1a3b487e23456d2fabfcd20a1fff50b3f24f73660a0dff3956ef1976a469c8fe98ebd0de7bc41b2ec85ad34fa8d132a8cce350aaa2a335688e19f52fb58f9a04043a56b664442776049a248d114bf36fe281c57d4d6627ec0da027388803e168673435e27bc70984a98f2aab408667aa85147b4df8e71d39a34cf49ab819d746129c667c4d3d34b4f734d2bef791045e27b7922439641e98b7bb0d56b67fb7107a1d196d2ab9e76761b356123033e776d3bc229fc9dcb59816524b7e8680cdc4f0c6f16835fb79e68f148dde05dbf6329f0cf7d98355668eebe7dfbb0585cb2d388817886391e5b174b6d0abef129cc2d3c613d116ef1e6bb37a00b28d22bacee5363b66a7c1247e0b7e96276d568ac73360eaf70fc79ad03c88a344a3163956e1426766d57b2637fd32d5f9a472804f0c2816220d92d73bd8cf9dce39eaee36b8ba86af8855c1177c9cdbb700a6ea8d089d88fe5826f9d95fbfa6471ece1cb226f738bb64c3ef9a757ab",
   "redirect_uri": "https://crm-hook.herokuapp.com"
  },  
  function (error, response, body) {
    console.log(response);
    if (!error && response.statusCode == 200) {
       console.log(body);
       key = body;
      // валидация и 
      // обработка полученного ответа, заголовков
     answer = body;
    }}

}) 

    request({
        method: 'POST',
        url: 'https://enmxqv17l3bv.x.pipedream.net/',
        form: obj,
        // параметры GET-запроса
        // index.php?param=edit&value=10
    /*     qs: {
          param: 'edit',
          value: 100
        } */
  //     }, function (error, response, body) {
   //    if (!error && response.statusCode == 200) {
         // console.log(body);
         // валидация и 
         // обработка полученного ответа, заголовков
    //     answer = body;
   //    }
     },

     function (error, response, body) {
      ctx.response.body = body;
    //  console.log(response)
      if (!error && response.statusCode == 200) {
       //      console.log(body);
            // валидация и 
            // обработка полученного ответа, заголовков
           answer = body;
          }}
     
     )
     // const { file } = ctx.request.files;
    // ctx.response.body = 'server response'; 
    // console.log('1');

    }
  });

/* app.use(async (ctx, next) => {

    ctx.response.body = 'server response';
  
    const origin = ctx.request.get('Origin');
    if (!origin) {
      return await next();
    }
    const headers = { 'Access-Control-Allow-Origin': '*' };
    if (ctx.request.method !== 'OPTIONS') {
      ctx.response.set({ ...headers });
      try {
        return await next();
      } catch (e) {
        e.headers = { ...e.headers, ...headers };
        throw e;
      }
    }
    if (ctx.request.get('Access-Control-Request-Method')) {
      ctx.response.set({
        ...headers,
        'Access-Control-Allow-Methods': 'GET, POST, PUD, DELETE, PATCH',
      });
      if (ctx.request.get('Access-Control-Request-Headers')) {
        ctx.response.set('Access-Control-Allow-Headers', ctx.request.get('Access-Control-Request-Headers'));
      }
      ctx.response.status = 204;
    }
}); */



/* router.get('/api/top-sales', async (ctx, next) => {
    return fortune(ctx, items.filter(o => topSaleIds.includes(o.id)).map(itemBasicMapper));
});

router.get('/api/categories', async (ctx, next) => {
    return fortune(ctx, categories);
});

router.get('/api/items', async (ctx, next) => {
    const { query } = ctx.request;

    const categoryId = query.categoryId === undefined ? 0 : Number(query.categoryId);
    const offset = query.offset === undefined ? 0 : Number(query.offset);
    const q = query.q === undefined ? '' : query.q.trim().toLowerCase();

    const filtered = items
        .filter(o => categoryId === 0 || o.category === categoryId)
        .filter(o => o.title.toLowerCase().includes(q) || o.color.toLowerCase() === q)
        .slice(offset, offset + moreCount)
        .map(itemBasicMapper);

    return fortune(ctx, filtered);
});

router.get('/api/items/:id', async (ctx, next) => {
    const id = Number(ctx.params.id);
    const item = items.find(o => o.id === id);
    if (item === undefined) {
        return fortune(ctx, 'Not found', 404);
    }

    return fortune(ctx, item);
});

router.post('', async (ctx, next) => {    
   // const { owner: { phone, address }, items } = JSON.parse(ctx.request.body);
   console.log('2')
   console.log(JSON.parse(ctx.request.body))
});

app.use(router.routes())
app.use(router.allowedMethods()); */

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());
server.listen(port);