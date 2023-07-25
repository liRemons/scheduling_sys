const query = require('./mysql');
const { initResult, uuid, REQ_ARG } = require('../utils');

const search = async ({ sql }) => {
  const result = initResult({});
  const res = await query(sql);
  result.data = res;
  return result;
};

const createScheduling = async (ctx) => {
  const { params, data } = REQ_ARG({ ctx, method: 'POST' });
  let sql = `INSERT INTO list
  (id,params,data) VALUES ('${uuid()}','${JSON.stringify(params)}','${data}')`;
  const res = await query(sql);
  ctx.body = initResult({});
};
// 查询
const queryMyInfo = async (ctx) => {
  let sql = `select id,params from list where 1=1 `;
  const result = await search({ sql });
  ctx.body = result;
};

const queryMyInfoDetail = async(ctx) => {
  const { id } = REQ_ARG({ ctx, method: 'GET' });
  let sql = `select * from list where id='${id}' `;
  const result = await search({ sql });
  ctx.body = result;
}


// 删除
const deleteMyInfo = async (ctx) => {
  const { id } = REQ_ARG({ ctx, method: 'DELETE' });
  let sql = `delete from list where id in ('${id}')`;
  const res = await query(sql);
  const result = initResult({});
  ctx.body = result;
};

module.exports = {
  deleteMyInfo,
  queryMyInfo,
  createScheduling,
  queryMyInfoDetail
};
