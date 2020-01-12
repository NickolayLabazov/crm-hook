const http = require('http');
const fs = require('fs');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const koaBody = require('koa-body');
//const request = require('request');
const request = require('request-promise')

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

let newLead = {
	add: [{
		name: "Покупка карандашей",
		created_at: "1508101200",
		updated_at: "1508274000",
		status_id: "13670637",
		responsible_user_id: "957083",
		sale: "5000",
		tags: "pencil, buy",
		contacts_id: [
			"1099149"
		],
		company_id: "1099148",
		catalog_elements_id: {
			99999: {
				111111: 10
			}
		},
		custom_fields: [{
				id: "4399649",
				values: [
					"3691615",
					"3691616",
					"3691617"
				]
			},
			{
				id: "4399656",
				values: [{
					value: "2017-10-26"
				}]
			},
			{
				id: "4399655",
				values: [{
						value: "ул. Охотный ряд, 1",
						subtype: "address_line_1"
					},
					{
						value: "Москва",
						subtype: "city"
					},
					{
						value: "101010",
						subtype: "zip"
					},
					{
						value: "RU",
						subtype: "country"
					}
				]
			}
		]
	}]
}

let accessToken = null;
let refreshToken = null;
let expires = null;

if (accessToken !== null) {
  request({
    method: 'POST',
    mode: "cors",
     url: 'https://nickolaylabazov.amocrm.ru/oauth2/access_token',
  //  url: 'https://en2pcob5ut59x.x.pipedream.net/',

    body: ({
      "client_id": "b577500b-8ff9-4cfc-b43f-2e0e93436177",
      "client_secret": "Y67fzyPFpovd5b7aiPv9jSjgU4Ya4oftPSIsNCt7YtyA9zdyqhp9x4Sr8XupBobJ",
      "grant_type": "authorization_code",
      "code": "def50200026301329977efd45429fa688663389a4637fccc2a74f51139042adf041fdb558fb4721d542ac0e7c1f46111e446a1bfccb4d7e585fe79a7083cbca006f282cab367fa87095a0be62355c7e3c8c39d9a971587468fa5c78bbf5560faa95b76a202982ddc4645615d3b3e53b4c0b9d9ba75d0f11d0225e29d370a9b8f17cd7cd4942c7f944bef7b33afa357f565bd0692bea9e107a757165fe4fecf12a5a78c1d67185de70a26a05354b9a026f3f7f29dbe2b54f5338bf9cfef7644fdf459a6df21c8b8e7bec5b6b1949b77ff0fd16b98e209a64dcf0011000f5e54c2dcbec04f6e32689662d2eeda113b0952d4677fa4c0deb7e30a4062aa5b84bec354e9e9af9225fad2d2227e5016ff104debb54d9eb64a8f0e08e96606b0ebe09b787e7c61f5f8a9b930d95f0339f3e71693028d38ad2abd6bdc57ea1e7575502c30f4d5a8132d809fb413b363a9e4f5dde0bbb9a857b31127267a7022457f91be1d1bf62ad4cf6b8a916619baeb4962a38ba0b36ea251757235db075445049377d0f9ba5643eade0dc5925480f1821d90d6d7f9fb8973c481ac8fddee0f3902afda6a1530201ff838809927defcde7fc63ac404aed838d3a8199b25d6cc5055be98008b92b533216b",
      "redirect_uri": "https://crm-hook.herokuapp.com"
    }),
    json: true,

  }).then(function (response) {
    console.log(response);
  //  accessToken = JSON.parse(response.access_token);
  //  refreshToken = JSON.parse(response.refresh_token);
  //  expires = JSON.parse(response.expires_in);
  })
}

accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQ5MGRhZjIwOTBkOWQxY2I5MTQyYmFlZTYwOGExYjA4ZjY1YWFjOTkzZjU1YTJjYjZlZTUxNzhhYmFhZWMxNGJjNGE0MjZjMzRiZjJjNTI5In0.eyJhdWQiOiJiNTc3NTAwYi04ZmY5LTRjZmMtYjQzZi0yZTBlOTM0MzYxNzciLCJqdGkiOiJkOTBkYWYyMDkwZDlkMWNiOTE0MmJhZWU2MDhhMWIwOGY2NWFhYzk5M2Y1NWEyY2I2ZWU1MTc4YWJhYWVjMTRiYzRhNDI2YzM0YmYyYzUyOSIsImlhdCI6MTU3ODgzMjM0NCwibmJmIjoxNTc4ODMyMzQ0LCJleHAiOjE1Nzg5MTg3NDQsInN1YiI6IjU3NTY2NDQiLCJhY2NvdW50X2lkIjoyODc1NDg2MCwic2NvcGVzIjpbInB1c2hfbm90aWZpY2F0aW9ucyIsImNybSIsIm5vdGlmaWNhdGlvbnMiXX0.KgkzsS-rUQwSK_UPtIY5axBJmamX-5LWkR4bdSZaqynpuRgoJN-tlVtlgfPiG4sb8rv2GOiRqJb7ww11ZjsyC56_gR6WYO0GS0zT8J_hesydF0bU69vZBMixqDhiI8XNQvHsBQR327KS13LGAmcOGtbuxjTgdJfJsFFbYhWOvB1h3d8IhopwkxnYdPMfrjEN2W-754e3YiUhgCim9EWXfbGPy9krWxfO3Z_znUDGmrzbYMxvodDFP3Fza0o84VjpIWsJBGCFyEGl9pjQns7_DNT_FikcheTwTHJA5raWVzzpp3hzQR5F316rbIsURf_Se8mXsJ3Yg5hVILuvjld4_A';

app.use(async (ctx) => {
  ctx.response.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': ['DELETE', 'PUT', 'PATCH', 'POST'],
  });
  if (ctx.request.method === 'OPTIONS') {
    ctx.response.body = '';
  }

  ctx.response.body = 'server response';

  if (ctx.request.method === 'POST') {
   // ctx.response.body = key;
    //let obj = JSON.parse(ctx.request.body);
    let obj = ctx.request.body;

    request({
      method: 'POST',
      mode: "cors",
      url: 'https://nickolaylabazov.amocrm.ru/api/v2/leads',
     // url: 'https://en2pcob5ut59x.x.pipedream.net/',
      headers: {        
        'Authorization': `Bearer ${accessToken}`        
       },
      //body: newLead,
      body: obj.unsorted,
      json: true,

    }).then(function (response) {
      console.log(response)
     // key = response;
    })
  }
});

const port = process.env.PORT || 7071;
const server = http.createServer(app.callback());
server.listen(port);