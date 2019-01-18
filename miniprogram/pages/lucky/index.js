Page({
    data: {
        index: 0,
        isShow: true,
        lists: [],
        selectVal: '',
        selectedVal: ''
    },
    onLoad(options) {
        console.log(options)
        wx.showLoading({
            title: "拼命加载中..."
        })
        let name = '',
        selectVal='',
        selectedVal=''
        if(options.from === 'food') {
            name = 'foods';
            selectVal = '吃啥呢？';
            selectedVal = '就吃它了！'
        } else if(options.from === 'city') {
            name = 'cities';
            selectVal = '去哪儿玩呢？';
            selectedVal = '就去这儿了！'
        }
        wx.cloud.callFunction({
            name: name
        })
        .then(res => {
            let {data} = res.result.data.lists
            data = data.sort(() => Math.random() - 0.5);
            this.setData({
                lists: data,
                selectVal,
                selectedVal
            })
            wx.hideLoading()
        })
        
    },
    eatClick() {
        this.timer = setInterval(() => {
            let index = this.data.index + 1;
           
            if(this.data.lists.length - 1 > index) {
                index += 1;
            } else {
                index = 0
            }
            this.setData({
                index,
                isShow: false
            })
        }, 60)
    },
    stopClick() {
        clearInterval(this.timer)
        this.setData({
            isShow: true
        })
    },
    onHide() {
        clearInterval(this.timer)
        this.setData({
            isShow: true
        })
    }
})