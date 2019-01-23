Page({
    data: {
        films: []
    },
    onLoad(options) {
        wx.setNavigationBarTitle({
            title: '今日放映影片'
        })
        console.log(options)
        wx.cloud.callFunction({
            name: 'cityFilms',
            data: {
                id: options.id
            }
        })
        .then(res => {
            let films = res.result.data
            this.setData({
                films
            })
        })
    }
})