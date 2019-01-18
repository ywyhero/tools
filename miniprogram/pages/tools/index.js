Page({
    data: {
        toolsLists: [
            {
                id: 0,
                value: '个税计算'
            }, {
                id: 1,
                value: '今天吃啥叻？'
            }, {
                id: 2,
                value: '去哪儿玩？(国内)'
            }, {
                id: 3,
                value: '菜谱大全'
            }
        ]
    },
    toDetail(e) {
        let index = e.currentTarget.dataset.index;
        switch (index) {
            case 0 :
                wx.navigateTo({
                    url: '/pages/tax/index'
                })
                break;
            case 1:
                wx.navigateTo({
                    url: '/pages/lucky/index?from=food'
                })
                break;
            case 2:
                wx.navigateTo({
                    url: '/pages/lucky/index?from=city'
                })
                break;
            case 3:
                wx.navigateTo({
                    url: '/pages/cookBook/index'
                })
                break;
        }
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