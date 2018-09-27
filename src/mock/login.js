import Mock from 'mockjs';
import tools from 'utils/tools';

const {param2Obj} = tools;

const userMap = Mock.mock({
  admin: {
    id: '@id',
    userName: 'admin',
    cname: '@cname',
    age: '@integer(10, 30)',
    address: '@county(true)'
  },
  NARUTOne: {
    id: '@id',
    userName: 'NARUTOne',
    cname: '路鸣',
    age: '@integer(10, 20)',
    address: '东海红大陆木叶村'
  }
});

/**
 * config: {url, type, body}
 */

export default {
  toLogin: config => {
    const body = param2Obj(config.body);
    const {userName} = body;

    return {
      code: 200,
      data: userMap[userName],
      msg: 'success, welcome !'
    };
  },
  toLogout: () => {
    return {code: 200, data: {}, msg: 'success, thanks!'};
  }
};