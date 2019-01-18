const app = getApp()
Page({
    data: {
        taxVal: '',
        socialVal: '',
        personalVal: '',
        taxAfterVale: ''
    },
    taxInput(e) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            let val = Number(e.detail.value);
            if (val === 0) {
                val = ''
                this.setData({
                    socialVal: '',
                    personalVal: '',
                    taxAfterVale: ''
                })
            }
            this.setData({
                taxVal: val
            })

        }, 500)
    },
    taxCompute() {
        let taxVal = this.data.taxVal;
        if(taxVal === '' || taxVal === 0) {
            wx.showToast({
                title: '请输入您的税前薪资',
                icon: 'none'
            })
            return
        }
        wx.cloud.callFunction({
            name: 'tax',
            data:{
                username: app.globalData.userInfo.nickName,
                salary: taxVal
            }
            
        })
        .then(res => {
            let socialMax = taxVal > 21396 ? 21396 : taxVal;
            let homeMax = taxVal > 21400 ? 21400 : taxVal;
            let pensionPercent = 0.08;
            let healthPercent = 0.02;
            let homePercent = 0.07;
            let losePercent = 0.005;
            let socialVal = (socialMax * pensionPercent + socialMax * healthPercent + homeMax * homePercent + socialMax * losePercent).toFixed(2);
            let moneyVal = (taxVal - socialVal - 5000).toFixed(2);
            let personalVal = 0;
            if (moneyVal > 80000) {
                personalVal = moneyVal * 0.45 - 15160;
            } else if (moneyVal > 55000) {
                personalVal = moneyVal * 0.35 - 7160;
            } else if (moneyVal > 35000) {
                personalVal = moneyVal * 0.30 - 4410;
            } else if (moneyVal > 25000) {
                personalVal = moneyVal * 0.25 - 2660;
            } else if (moneyVal > 12000) {
                personalVal = moneyVal * 0.20 - 1410;
            } else if (moneyVal > 3000) {
                personalVal = moneyVal * 0.10 - 210;
            } else if (moneyVal > 0) {
                personalVal = moneyVal * 0.03
            } else {
                personalVal = 0
            }
            personalVal = personalVal.toFixed(2)
            let taxAfterVale = (taxVal - personalVal - socialVal).toFixed(2);
            this.setData({
                socialVal,
                personalVal,
                taxAfterVale
            })
        })
        .catch(error => {
            console.error(error)
        })
    }
})