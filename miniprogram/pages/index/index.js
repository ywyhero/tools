const app = getApp();
Page({
    data: {
        toolsLists: [],
        banners: [],
        autoplay: true,
        indicatorDots: true,
        interval: 3000,
        isShow: false
    },
    onLoad() {
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            app.globalData.userInfo = res.userInfo;
                            console.log(app.globalData.userInfo)
                        }
                    })
                } else {
                    this.setData({
                        isShow: true
                    })
                }
            }
        })
        this.getData()
    },
    getData(){
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
    onGetUserInfo(e) {
        if (e.detail.userInfo) {
            this.setData({
                isShow: false
            })
            const userInfo = e.detail.userInfo;
            wx.cloud.callFunction({
                name: 'login',
                data: userInfo
            })
            .then(res => {
                app.globalData.userInfo = e.detail.userInfo;
            })

        }
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