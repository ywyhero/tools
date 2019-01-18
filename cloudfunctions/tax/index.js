const DEV = 'tools-dev-6e00f3'
const PROD = 'tools-d732fb'
const cloud = require('wx-server-sdk')
// 初始化 cloud
cloud.init()
const request = require('request-promise')
const db = cloud.database({
    env: PROD
})
const taxCollection = db.collection('tax')
exports.main = async (event, context) => {
    const { username, salary } = event
    const { OPENID, UNIONID } = cloud.getWXContext()
    await taxCollection.add({
        data: {
            openId: OPENID,
            username,
            salary
        }
    })
    return {
        code: 200
    }
}