Page({
    data: {
        q: '',
        height: 0,
        lists: []
    },
    onLoad() {
        wx.setNavigationBarTitle({
            title: '周公解梦'
        })
        let rpx = wx.getSystemInfoSync().windowWidth / 750;
        let height = wx.getSystemInfoSync().windowHeight - 104 * rpx;
        this.setData({
            height
        })
    },
    bindInput(e) {
        let q = e.detail.value;
        this.setData({
            q
        })
    },
    searchResult() {
        wx.showNavigationBarLoading()
        wx.cloud.callFunction({
            name: "dream",
            data: {
                q: this.data.q
            }
        })
        .then(res => {
            wx.hideNavigationBarLoading()
            let lists = res.result.data.result
            this.setData({
                lists
            })
        })
    },
    toDetail(e) {
        let title = e.currentTarget.dataset.title;
        let list = e.currentTarget.dataset.list;
        wx.setStorageSync('dreamList', list)
        wx.navigateTo({
            url: `/pages/dreamDetail/index?title=${title}`
        })
    }
})