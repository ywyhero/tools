//index.js
const app = getApp()
Page({
    data: {
        userInfo: {},
        isShow: false,
        takeSession: false,
        requestResult: '',
        avatarUrl: './../../assets/images/t.jpg'
    },

    onLoad: function () {
        if (!wx.cloud) {
            return
        }
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            wx.redirectTo({
                                url: '/pages/tools/index'
                            })
                            
                            app.globalData.userInfo = res.userInfo;
                            console.log( app.globalData.userInfo)
                        }
                    })
                } else {
                    this.setData({
                        isShow: true
                    })
                }
            }
        })
    },
    onGetUserInfo(e) {
        if (e.detail.userInfo) {
            wx.redirectTo({
                url: '/pages/tools/index'
            })
            const userInfo = e.detail.userInfo;
          wx.showNavigationBarLoading()
            wx.cloud.callFunction({
                name: 'login',
                data: userInfo
            })
            .then(res => {
              wx.hideNavigationBarLoading()
                app.globalData.userInfo = e.detail.userInfo;
            })
            
        }
    }

})
