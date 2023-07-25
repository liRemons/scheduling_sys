const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const logger = require('koa-logger');
const koaBody = require('koa-body');
const statics = require('koa-static');
const path = require('path');
const InitManger = require('./core/init');
const cors = require('koa2-cors'); //跨域处理
// error handler
onerror(app);
app.use(
  cors({
    origin: '*',
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
    allowHeaders: ['*'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'], //设置获取其他自定义字段
  })
);
const staticPath = './';
app.use(statics(path.join(__dirname, staticPath)));

app.use(
  koaBody({
    multipart: true,
    strict: false,
    formidable: {
      maxFileSize: 1000 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
    },
    jsonLimit: '10mb',
    formLimit: '10mb'
  })
);

app
  .use(json())
  .use(logger())
  .use(require('koa-static')(__dirname + '/public'))
  .use(
    views(__dirname + '/views', {
      extension: 'pug',
    })
  )
  // logger
  .use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  });
InitManger.InitCore(app);
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
