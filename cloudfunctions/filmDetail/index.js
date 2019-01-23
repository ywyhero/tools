const cloud = require('wx-server-sdk')
cloud.init();
const rq = require('request-promise');

exports.main = async (event) => {
    const {movieId} = event;
    let data = await rq({
        method: 'get',
        url: ``
    })
}