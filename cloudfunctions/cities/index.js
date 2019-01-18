const DEV = 'tools-dev-6e00f3'
const PROD = 'tools-d732fb'

const cloud = require('wx-server-sdk');
cloud.init()
const db = cloud.database({
    env: PROD
})
const citiesCollection = db.collection('cities');

exports.main = async (event, context) => {
    let cities = await citiesCollection.where().get();
    return {
        code: 200,
        data: {
            lists: cities
        }
    }
}