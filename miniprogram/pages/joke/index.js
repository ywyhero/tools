Page({
    data: {
        lists: [],
        page: 1,
        pageSize: 20
    },
    onLoad() {
        this.getData()
    },
    getData() {
        wx.showNavigationBarLoading()
        wx.cloud.callFunction({
            name: 'joke',
            data: {
                page: this.data.page,
                pageSize: this.data.pageSize
            }
        })
        .then(res => {
            wx.hideNavigationBarLoading()
            let data = res.result.data.data;
            let lists = this.data.lists;
            console.log(res)
            data.forEach(item => {
                lists.push(item)
            })
            this.setData({
                lists
            })
        })
    },
    onReachBottom() {
        let page = this.data.page + 1;
        this.setData({
            page
        })
        this.getData()
    }
})