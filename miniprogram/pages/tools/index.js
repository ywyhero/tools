Page({
    data: {
        toolsLists: [],
        banners: [],
        autoplay: true,
        indicatorDots: true,
        interval: 3000
    },
    onLoad() {
        wx.showNavigationBarLoading()
        wx.cloud.callFunction({
            name: 'tools'
        })
        .then(res => {
            wx.hideNavigationBarLoading()
            console.log(res)
            let toolsLists = res.result.data.lists;
            let banners = res.result.data.banners;
            this.setData({
                toolsLists,
                banners
            })
        })
    },
    toDetail(e) {
        let url = e.currentTarget.dataset.url;
        wx.navigateTo({
            url: url
        })
        console.log(e)
    },
    onShareAppMessage(res) {
        return {
            title: `日常小工具集合`,
            path: `/pages/index/index`,
            imageUrl: '',
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    }
})