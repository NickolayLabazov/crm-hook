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

    let obj = ctx.request.body;


    request({
        method: 'POST',
        url: 'https://enmxqv17l3bv.x.pipedream.net/',
        obj,
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
     })
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