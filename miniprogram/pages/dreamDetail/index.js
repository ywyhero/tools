
Page({
    data: {
        lists: [],
        title: ''
    },
    onLoad(options) {
        wx.setNavigationBarTitle({
            title: '周公解梦'
        })
        let title = ''
        if(options.title) {
            title = options.title;
        }
        let lists = wx.getStorageSync('dreamList')
        this.setData({
            title,
            lists
        })
    },
    onUnload() {
        wx.removeStorageSync('dreamList')
    }
})