const cloud = require('wx-server-sdk');
cloud.init();
const rq = require('request-promise');

exports.main = async (event) => {
    const { title, type } = event
    let data = await rq({
        method: 'get',
        url: `http://web.juhe.cn:8080/constellation/getAll?consName=${encodeURI(title)}&type=${type}&key=8697786fb2f40462826389197d106815`
    })
    data = JSON.parse(data)
    return {
        code: 200,
        data: data
    }
}