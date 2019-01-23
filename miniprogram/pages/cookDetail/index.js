Page({
    data: {
        list: null
    },
    onLoad() {
        
        let list = wx.getStorageSync('cookItem');
        wx.setNavigationBarTitle({
            title: `${list.title}做法步骤`
        })
        console.log(list)
        this.setData({
            list
        })
    },
    onUnload() {
        wx.removeStorageSync('cookItem')
    }
})