const app = getApp()
Page({
    data: {
        taxVal: '',
        taxAfterVale: '0.00',
        oldPersonalVal: '0.00',
        oldCompanyVal: '0.00',
        healthPersonalVal: '0.00',
        healthCompanyVal: '0.00',
        losePersonalVal: '0.00',
        loseCompanyVal: '0.00',
        homePersonalVal: '0.00',
        homeCompanyVal: '0.00',
        workCompanyVal: '0.00',
        maternityCompanyVal: '0.00',
        totalPersonalVal: '0.00',
        totalCompanyVal: '0.00',
        afterPersonalVal: '0.00',
        personalTaxVal: '0.00',
    },
    onLoad(){
        wx.setNavigationBarTitle({
            title: `个税计算`
        })
    },
    taxInput(e) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            let val = Number(e.detail.value);
            if (val === 0) {
                val = ''
                this.setData({
                    taxAfterVale: '0.00',
                    oldPersonalVal: '0.00',
                    oldCompanyVal: '0.00',
                    healthPersonalVal: '0.00',
                    healthCompanyVal: '0.00',
                    losePersonalVal: '0.00',
                    loseCompanyVal: '0.00',
                    homePersonalVal: '0.00',
                    homeCompanyVal: '0.00',
                    workCompanyVal: '0.00',
                    maternityCompanyVal: '0.00',
                    totalPersonalVal: '0.00',
                    totalCompanyVal: '0.00',
                    afterPersonalVal: '0.00',
                    personalTaxVal: '0.00',
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
        wx.showNavigationBarLoading()
        wx.cloud.callFunction({
            name: 'tax',
            data:{
                username: app.globalData.userInfo.nickName,
                salary: taxVal
            }
            
        })
        .then(res => {
          wx.hideNavigationBarLoading()
            let socialMax = taxVal > 21396 ? 21396 : taxVal;
            let homeMax = taxVal > 21400 ? 21400 : taxVal;
            let pensionPercent = 0.08;
            let healthPercent = 0.02;
            let homePercent = 0.07;
            let losePercent = 0.005;
            let oldPersonalVal = (socialMax * pensionPercent).toFixed(2);
            let oldCompanyVal = (socialMax * 0.2).toFixed(2);
            let healthPersonalVal = (socialMax * healthPercent).toFixed(2);
            let healthCompanyVal = (socialMax * 0.095).toFixed(2);
            let losePersonalVal = (socialMax * losePercent).toFixed(2);
            let loseCompanyVal = (socialMax * losePercent).toFixed(2);
            let homePersonalVal = (homeMax * homePercent).toFixed(2);
            let homeCompanyVal = (homeMax * homePercent).toFixed(2);
            let workCompanyVal = (socialMax * 0.002).toFixed(2);
            let maternityCompanyVal = (homeMax * 0.01).toFixed(2);
            let totalPersonalVal = (Number(oldCompanyVal) + Number(healthCompanyVal) + Number(loseCompanyVal) + Number(homeCompanyVal) + Number(workCompanyVal) + Number(maternityCompanyVal)).toFixed(2)
            let socialVal = (socialMax * pensionPercent + socialMax * healthPercent + homeMax * homePercent + socialMax * losePercent).toFixed(2);
            let afterPersonalVal = (taxVal - 5000).toFixed(2);
            let moneyVal = (taxVal - Number(socialVal) - 5000).toFixed(2);
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
                oldPersonalVal,
                oldCompanyVal,
                healthPersonalVal,
                healthCompanyVal,
                losePersonalVal,
                loseCompanyVal,
                homePersonalVal,
                homeCompanyVal,
                workCompanyVal,
                maternityCompanyVal,
                totalPersonalVal,
                totalCompanyVal: socialVal,
                afterPersonalVal,
                personalTaxVal: personalVal,
                taxAfterVale
            })
        })
        .catch(error => {
            console.error(error)
        })
    }
})