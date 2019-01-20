Page({
  data: {
    list: null
  },
  onLoad() {
    let list = wx.getStorageSync('cookItem');
    console.log(list)
    this.setData({
      list
    })
  }
})