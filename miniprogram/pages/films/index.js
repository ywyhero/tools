Page({
    data: {
        cities: []
    },
    onLoad() {
        wx.setNavigationBarTitle({
            title: '城市'
        })
        wx.cloud.callFunction({
            name: 'films'
        })
        .then(res => {
            let cities = res.result.cities;
            this.setData({
                cities
            })
            console.log(res)
        })
    },
    toDetail(e) {
        let id = e.currentTarget.dataset.id;
        console.log(id)
        wx.navigateTo({
            url: `/pages/cityFilms/index?id=${id}`
        })
    }
})