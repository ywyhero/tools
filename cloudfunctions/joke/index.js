const cloud = require('wx-server-sdk');
cloud.init();
const rq = require('request-promise');

exports.main = async (event) => {
    const { page, pageSize} = event;
    let data = await rq({
        method: 'get',
        url: `http://v.juhe.cn/joke/content/text.php?page=${page}&pagesize=${pageSize}&key=d848f43554c30c35e8ad51dbfb0cd306`
    })
    data = JSON.parse(data)
    return {
        code: 200,
        data: data.result
    }
}