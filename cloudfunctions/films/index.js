const cloud = require('wx-server-sdk');
const rq = require('request-promise');
cloud.init()

exports.main = async () => {
    let data = await rq({
        method: 'get',
        url: `http://v.juhe.cn/movie/citys?key=92c48bc2e85c69447df4278ba3df0eaa`
    })
    data = JSON.parse(data)
    let result = data.result;
    let letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let cities = []
    for(let i = 0; i < letter.length; i++) {
        let obj = {
            letter: letter[i],
            cities: []
        }
        result.forEach(item => {
            if(letter[i] === item.city_pre) {
                obj.cities.push(item)
            }
            
        })
        if(obj.cities.length > 0) {
            cities.push(obj)
        }
    }
    return {
        code: 200,
        cities
    }
}