const router = require('koa-router')();
const {
  deleteMyInfo,
  queryMyInfo,
  createScheduling,
  queryMyInfoDetail
} = require('../controller/info');
router.prefix('/info');

// 查询
router.post('/createScheduling', (ctx) => {
  return createScheduling(ctx);
});
// 查询
router.get('/queryMyInfo', (ctx) => queryMyInfo(ctx));

// 查询
router.get('/queryMyInfoDetail', (ctx) => queryMyInfoDetail(ctx));
// 上传文件
// 删除
router.delete('/deleteMyInfo', (ctx) => deleteMyInfo(ctx));

module.exports = router;
