const DEV = 'tools-dev-6e00f3'
const PROD = 'tools-d732fb'

const cloud = require('wx-server-sdk');
const rq = require('request-promise');
cloud.init()

exports.main = async (event, context) => {
    let { q } = event
    let data = await rq({
        method: 'get',
        url: `http://v.juhe.cn/dream/query?q=${encodeURI(q)}&full=1&key=ef0f8c971e4f192ab9175cccc7a6d16d`
    })
    data = JSON.parse(data)
    return {
        code: 200,
        data: {
            result: data.result
        }
    }
}