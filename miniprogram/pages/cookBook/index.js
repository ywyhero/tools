Page({
  data: {
    searchVal: '',
    lists: [],
    autoplay: true,
    interval: 3000,
    height: '',
    isSroll: true,
    total: 0,
    rn: 10,
    pn: 0
  },
  onLoad() {
    let rpx = wx.getSystemInfoSync().windowWidth / 750;
    let height = wx.getSystemInfoSync().windowHeight - 104 * rpx;
    this.setData({
      height
    })

  },
  bindInput(e) {
    let searchVal = e.detail.value;
    this.setData({
      searchVal
    })
  },
  searchResult() {
    wx.showNavigationBarLoading()
    if (this.data.searchVal) {
      let pn = this.data.rn * this.data.pn
      wx.cloud.callFunction({
          name: 'cookBook',
          data: {
            menu: this.data.searchVal,
            rn: this.data.rn,
            pn: pn
          }
        })
        .then(res => {
          wx.hideNavigationBarLoading()
          let lists = this.data.lists;
          let total = res.result.data.total
          console.log(total)
          res.result.data.result.forEach(item => {
            lists.push(item)
          })
          this.setData({
            lists,
            total
          })
        })
    } else {
      wx.hideNavigationBarLoading()
      wx.showToast({
        title: '请输入菜名',
        icon: 'none'
      })
    }

  },
  bindScrolltolower() {
    if(this.data.lists.length === this.data.total) {
      return
    }
    if (this.data.isSroll) {
      let pn = this.data.pn;
      pn += 1;
      console.log(pn)
      this.setData({
        pn,
        isSroll: false
      })
      this.searchResult()
      setTimeout(() => {
        this.setData({
          isSroll: true
        })
      }, 1000)
    }
    
  },
  toDetail(e){
    let data = e.currentTarget.dataset.item;
    wx.setStorageSync('cookItem', data)
    wx.navigateTo({
      url: '/pages/cookDetail/index',
    })
  }
})