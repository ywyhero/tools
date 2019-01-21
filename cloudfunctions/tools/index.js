const DEV = 'tools-dev-6e00f3'
const PROD = 'tools-d732fb'
const cloud = require('wx-server-sdk');

cloud.init()

const db = cloud.database({
    env: PROD
})

const dbCollection = db.collection('tools')

exports.main = async () => {
    let data = await dbCollection.where().get();
    const fileList = ['cloud://tools-d732fb.746f-tools-d732fb/images/tax.jpg','cloud://tools-d732fb.746f-tools-d732fb/images/cookBook.jpg', 'cloud://tools-d732fb.746f-tools-d732fb/images/dream.jpg']
    const result = await cloud.getTempFileURL({
        fileList
    })
    let fileLists = result.fileList;
    let banners = []
    fileLists.forEach(item => {
        let obj = {
            url: '',
            path: ''
        }
        obj.url = item.tempFileURL;
        let index = item.tempFileURL.lastIndexOf('/') + 1;
        let path = item.tempFileURL.substr(index).split('.')[0];
        obj.path = `/pages/${path}/index`
        banners.push(obj)
    })
    return {
        code: 200,
        data: {
            banners: banners,
            lists: data.data
        }
    }
}