Page({
    data: {
        searchVal: '',
        lists: []
    },
    bindInput(e) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            let searchVal = e.detail.value;
            this.setData({
                searchVal
            })
        }, 500)
    },
    searchResult() {
        wx.cloud.callFunction({
            name: 'cookBook',
            data: {
                menu: this.data.searchVal,
                page: 1
            }
        })
        .then(res => {
            let lists = res.result.data.result;
            this.setData({
                lists
            })
            console.log(res)
        })
    }
})