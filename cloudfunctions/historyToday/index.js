const cloud = require('wx-server-sdk');
cloud.init()

const rq = require('request-promise');

exports.main = async (event) => {
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();
    let data = await rq({
        method: 'get',
        url: `http://api.juheapi.com/japi/toh?v=1.0&month=${month}&day=${day}&key=2149827761ba430f5df497914360a4ae`
    })
    data = JSON.parse(data)
    return {
        code: 200,
        data: data.result
    }
}