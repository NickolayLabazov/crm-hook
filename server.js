const http = require('http');
const Koa = require('koa');
const cors = require('koa2-cors');
const koaBody = require('koa-body');
const request = require('request-promise')

const app = new Koa();
app.use(cors());
app.use(koaBody({
  json: true,
  urlencoded: true,
}));

let accessToken = null;
let refreshToken = null;
let expires = null;
const client_secret = "F8IhhFHOF6iz3SoMAVoiv40WyCbGI6N0aUgHGe4ePAHwnTwwMDVvtNaA2LJCGYsp";    
const client_id = "858cd6ac-e335-4b49-baf2-4d1401097421";
const code = "def502003890c16c02b32f95e75cc8b40e7262e180f8187270e91d79f6b46d9a6926471e39f10e489817994525aa51428a4e15b1d4d518526987fd401a331ba3b0a94ecf8a31b9541a1facabfe4bae3a146cbcc218166fd90aabe01cfff086c8ca6e9128adda3640c9404362ef58256a8dd2e1e036904689c9781a215b639902639c5195eacbee0f9ad7cbaad80644c350f45d5d6b4a88598fc01b1b21a39da55827f21ac379b8b3b01b544f9cad403a71330baf1bbec671127cd2ed8760eefcc45094a6408f54442a7184435a06c4b690b05de3817f2bd5a5568b233e0b4059a36d23cd7b4d5dad4b44f584d7a05613e55c459ced50cd03312c8309bd2baaef2cb39977a2e39fb1d7d270473a55a539332744c985596fda1e128e8c30f24bc4eeae620fbaae5a3bdde78706701deea7993119b0a9e689a5daaa144311988205d40aa4a41ede38d3f4184d2ecf375a1b5308aca7e2c387531f23990e00bf2fcdbfa95627349074807b39d3719895b808c27036724db9f3e1397e1eba06f8dc42d86ca868a46371a4f21f9c3ccadd4f0d3a183c90061607c78b338688a1200e87f29760d53ec140acadc4d1e977c773f3c00fc05611b1db9b8b49b702965b905e98035e2aafc45033";
const url = 'https://nickolaylabazov.amocrm.ru';
const redirect_url =  "https://crm-hook.herokuapp.com";

const httpRequest = (url, body, accessToken) => {
  return request({
    method: 'POST',
    mode: "cors",
    url: url,
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    body: body,
    json: true,
  })
}

const refrech = () => {

  const bodyFrech = {
    "client_id": client_id,
    "client_secret": client_secret,
    "grant_type": "refresh_token",
    "refresh_token": refreshToken,
    "redirect_uri": redirect_url
  }

  httpRequest(`${url}/oauth2/access_token`, bodyFrech, '').then(function (response) {
    accessToken = response.access_token;
    refreshToken = response.refresh_token;
    expires = response.expires_in;
    console.log(accessToken);
    setTimeout(refrech(), expires * 1000 - 1200000);
  }).catch(function(error){
    refrech()
  });
}

if (accessToken === null) {

  const body = {
    "client_id": client_id,
    "client_secret": client_secret,
    "code": code,
    "grant_type": "authorization_code",    
    "redirect_uri": redirect_url
  }

  httpRequest(`${url}/oauth2/access_token`, body, '').then(function (response) {
    accessToken = response.access_token;
    refreshToken = response.refresh_token;
    expires = response.expires_in;
    console.log(accessToken);
    setTimeout(refrech(), 1000);
  });
}

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
    let obj = ctx.request.body;
    response = httpRequest(`${url}/api/v2/leads`, obj.unsorted, accessToken);
  }
});

const port = process.env.PORT || 7071;
const server = http.createServer(app.callback());
server.listen(port);