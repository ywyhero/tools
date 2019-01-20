const DEV = 'tools-dev-6e00f3'
const PROD = 'tools-d732fb'
const cloud = require('wx-server-sdk');
const rq = require('request-promise');
cloud.init()

// const db = cloud.database({
//     env: PROD
// })

// const cookBookCollection = db.collection('cookBook');

exports.main = async (event, context) => {
    try{
        let {menu, pn, rn} = event
        let data = await rq({
            method:'get',
            url: `http://apis.juhe.cn/cook/query.php?menu=${encodeURI(menu)}&pn=${pn}&rn=${rn}&dtype==json&key=8c533b97721bad2c6734c93e9b630701`
        })
        data = JSON.parse(data)
        return {
            code: 200,
            data: {
                result: data.result.data,
                total: Number(data.result.totalNum)
            }
        }
    } catch(error) {
        return {
            code: 500,
            msg: error
        }
    }
    
}