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
const client_secret = "mjf7snk9YLiPgEot2LBa4B4SdmKsS0hXsb0jkb6UchlfadqRHO5yk3A2gpyUIOg4";
const client_id = "bffec9d4-21e4-4e41-8473-78cbf2f1beb6";
const code = "def502005ef2346ae2937b2a8439228e47c7452f8112f98556ea6934f6f6dc6fa8a7213550d14700d009dad1b0a4cb4b2d059c5e56a3b05d0872fab69c374dff836c4874c3f2c2b8b50907ee059b1278c207048eebbb78c143c5890daaf33646a7e1c2544fe2fb4c179ac9669056338ac88dd4ca7cccee0b8fadf740fe1beaa4c23b0b99952c6218bcebb2eff67c0648a45ec3368b3d256d79a3b45e0839175cfdf756a9abe407802689371cfa0e25e738431b91856e4cc6ae7ebbab29bc2a029a05a698ab97a03dbb5e9c73269d43cfd5e24888e71035869b4c98780b94fad4ee3c440f4138124576c3b8fb618f9067d2b8b99b365541101e453db2905007a07cecd5bd38a8b02f3201215efc6e554dd476f37f11193eb090d0b6992ee5493c9459d41da63fa9b80fc094efa8cd706188fcb13577d26b1b2f68c2e8edd55fef19eae9dc815f6323fae86a73ee36fe797738c8f2840a9d853510ca2b08229473a7f00d028f2f58ecc44cb657dc281401fad0021c1cc249af429338c0783000eed90235a9ac9cb5a776f4438bbd727209b9adbe72b6f3614686b55280e0bce20fbcc6fea2a90ae977f2bc2700c8b2760a39952db644d951c9579dbc9aedadf54837713865245d6d45";
const url = 'https://nickolaylabazov.amocrm.ru';
const redirect_url = "https://crm-hook.herokuapp.com";

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
    setTimeout(() => refrech(), expires * 1000 - 1200000);
  }).catch(function (error) {
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
    setTimeout(() => refrech(), expires * 1000 - 1200000);
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