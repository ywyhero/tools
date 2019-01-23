let title = ''
Page({
    data: {
        type: 'today',
        url: 'baiyang.png',
        data: {},
        des: '',
        date: ''
    },
    onLoad(options) {
        title = options.title;
        wx.setNavigationBarTitle({
            title: title
        })
        let url = options.url;
        let date = options.date;
        let des = options.des;
        this.setData({
            url,
            date,
            des
        })
        this.getData();
    },
    getData() {
        wx.showNavigationBarLoading()
        wx.cloud.callFunction({
            name: 'zodiacDetail',
            data: {
                title: title,
                type: this.data.type
            }
        })
        .then(res => {
            wx.hideNavigationBarLoading()
            let data = res.result.data;
            this.setData({
                data
            })
            console.log(data)
        })
    },
    tabClick(e) {
        let type = e.currentTarget.dataset.date;
        this.setData({
            type
        })
        this.getData();
    }
})