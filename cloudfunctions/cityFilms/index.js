const cloud = require('wx-server-sdk');
cloud.init()
const rq = require('request-promise');

exports.main = async (event, context) => {
    const { id } = event
    let data = await rq({
        method: 'get',
        url: `http://v.juhe.cn/movie/movies.today?cityid=${id}&key=92c48bc2e85c69447df4278ba3df0eaa`
    })
    data = JSON.parse(data)
    return {
        code: 200,
        data: data.result
    }
}