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
const client_secret = "BxqngSrHjWuUCa0EOaGpQC6GCqSCZSHDnfZ5XBGQahkf9ugkxWOkiZI6kOWAF3zV";    
const client_id = "41920f31-d92d-40d3-a4b7-090799e90b82";
const code = "def50200608e91b94497c5400b191d9f1dbfc7fd4edf327042199bddf761422908203cd5ee314dee272bf3168a2318677e746dfba70a32e4806a0a1314855e0f05e65b9cf35aafbc36d68ec02617f78a364f8f94966079aa9af344071817ed29dcd03bc7f6371fbd5bcac54dc5a9d8650ec2419f59872c7cd384af7115f8bd9e77f1ec6ef54ef4e0b2bd2f5803c955a287ae2759453a53279fb2bdb426c464f7ed6912d3e3ce53cb3ca1708b2e87d024be5665e7c265d01edcdfc84e04160f1e8fdc4cc5e04279adb4a66ed6a438924fb73319076a886f77155225dccac00c5610969fb09fb27b4b9934e2cf488e1b635c5fbdaffce321844365e0674ed7f0c5bba431ebec6267cf2958bfca026ca162f43b2264426d74bdb91239cd8d86198be09ac853ca804c0cb062c6ac976b27bb5b273692bcc146b0985325d5ba3d41f0ab23671f1be52e452d7622e1f34a2d905f2daa0fd0806b72579127fe756472d334fef2acc28dfb8dc0f51052762e9ff2727a994d4b1d7475faaee9db971a821a263fe725a0a04ad61fed1ae03ff75ee43562dc8a483f7024153d0ebbc0afa4d4c6db256772006c9d67d5b7c5787967e9c4ce9d83ad200f2fec91759cbdb6ad6e702e4d5e86b31419";
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