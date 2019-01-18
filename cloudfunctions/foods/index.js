const DEV = 'tools-dev-6e00f3'
const PROD = 'tools-d732fb'
const cloud = require('wx-server-sdk');

cloud.init()

const db = cloud.database({
    env: PROD
})

const foodsCollection = db.collection('foods');

exports.main = async (event, context) => {
   let foods =  await foodsCollection.where().get()
   return {
       code: 200,
        data: {
            lists: foods
        }
   }
}