Page({
    data: {
        lists: [],
        date: ''
    },
    onLoad() {
        wx.showNavigationBarLoading()
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let week = date.getDay();
        let weekVal = ''
        if(week === 0) {
            weekVal = '日'
        } else if(week === 1) {
            weekVal = '一'
        } else if(week === 2) {
            weekVal = '二'
        } else if(week === 3) {
            weekVal = '三'
        } else if(week === 4) {
            weekVal = '四'
        } else if(week === 5) {
            weekVal = '五'
        } else if(week === 6) {
            weekVal = '六'
        } 
        wx.cloud.callFunction({
            name: 'historyToday'
        })
        .then( res => {
            wx.hideNavigationBarLoading()
            let lists = res.result.data;
            lists = lists.map(item => ({
                ...item,
                pic: item.pic !== '' ? item.pic : './../../assets/images/t.jpg'
            }))
            this.setData({
                lists,
                date: `${year}年${month}月${day}日 星期${weekVal}`
            })
        })
    }
})