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
  mode: "no-cors",
  url: 'https://nickolaylabazov.amocrm.ru/oauth2/access_token',
 // url: 'https://enevhn5z8ne1t.x.pipedream.net/',
  
 form: JSON.stringify({
    "client_id": "a118aee2-ac4a-4bf5-a7a4-2b2d3de42642",
    "client_secret": "vhkCnmMPUs4Dkb7z9c2e47A6yL8dLufq43vSlVxcxEI80JIf6e5rNizv86CmohGi",
    "grant_type": "authorization_code",
    "code": "def5020046503a2daa795103919310868e2cdb54127bdbccb28ecc04b31e6a04cacc43e39dcacfc29149afa28f9c982016266984fd924b7a3b7a8909d8ba22ba233da9e28438babc180b0b215422c49e40052f24314f3332dcee8e2d8298d2313f9f4ed53450db958dfe3ad87aa0d808b4bbb2ad616b2f2c362df466acf1a54eb6712607ef97fbd5f4f11594973813e07e82ed827486b4f053a53f2b89c1aeda7442392f3974df912059276fab59f57264684646c2d9fe1b6931981669c8eb7acdd6cb1ec665ec19ae7c5ce1cdc63cf2c6525d6420a917571bbad589a06044934a420220fec41a774a68c364f4ce044737e1e24a85805990f5c2d205a5aaed875fcdd518ead29b706ac570c577089ddc9a5b44c22a3348af6593c5401f7afadaade7f220c84c5036fde0c94eb4b2b2827187cd2da5bbfec64289864c2aaf6e6c3d80696d75567dbb547c3522687ac62d992b5f62b14e2b90327d4783cb678b34c2d39fca11d1963d02bd53724f16e3fa8a4bbcb7ca33656656981d636863e4878468fa1dfd877e2460fe663c981f74658755c3ea35ed9eb7441622a8a580f94e4c7e6bca81c72024228b71bb03e2f3fb8d53ea1630790ac96157e58383b9925f32f5e1f1de588038",
   "redirect_uri": "https://crm-hook.herokuapp.com"
  }),  
  function (error, response, body) {
    console.log(response);
    if (!error && response.statusCode == 200) {
       
      key=body; 
      console.log(body);
       
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