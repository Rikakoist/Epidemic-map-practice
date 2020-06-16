var cityQueryApp = new Vue({
    el: '#epidemicQueryApp',
    data: {
        activeTab: 'epidemicChart', //活动tab
        //按钮可用性
        btn1: true,
        btn2: true,
        btn3: true,
        cityList: ["東京都", "大阪府", "神奈川県", "北海道", "埼玉県", "千葉県", "兵庫県", "福岡県",
            "愛知県", "京都府", "石川県", "富山県", "茨城県", "広島県", "岐阜県", "群馬県", "沖縄県",
            "福井県", "滋賀県", "奈良県", "宮城県", "福島県", "新潟県", "高知県", "長野県", "静岡県",
            "山形県", "和歌山県", "大分県", "山梨県", "栃木県", "愛媛県", "熊本県", "三重県", "佐賀県",
            "山口県", "香川県", "青森県", "島根県", "岡山県", "長崎県", "宮崎県", "秋田県", "鹿児島県",
            "徳島県", "鳥取県", "岩手県",
        ],
        compCity: null,
        compDateSpan: null,
        compQueryResult: null,
        cityQuery: null,
        cityQueryResult: null,
        queryDateSpan: null,
        dateQueryResult: null,

        serverAddr: "http://localhost:8081/",
    },
    //综合查询的计算值
    computed: {
        compQuery: function() {
            if (this.compCity && this.compDateSpan) {
                return this.compCity + "," + this.compDateSpan;
            } else {}
        },
    },
    //方法们
    methods: {
        //综合查询
        getCompResult: function(res) {
            this.compQueryResult = JSON.parse(res);
        },
        getCompQuery: function(val, cbFunc) {
            var req = new XMLHttpRequest();
            req.open("GET", this.serverAddr + "covid19CompData/" + val, true);
            req.send();
            req.onreadystatechange = function() {
                if (req.readyState == 4) {
                    if (req.status == 200) {
                        cbFunc(req.response);
                    } else {
                        alert('啊偶，cookie失效了~');
                        location.reload();
                    }
                }
            };
        },
        //按城市查询
        getCityResult: function(res) {
            this.cityQueryResult = JSON.parse(res);
        },
        getCityQuery: function(val, cbFunc) {
            var req = new XMLHttpRequest();
            req.open("GET", this.serverAddr + "covid19CityData/" + val, true);
            req.send();
            req.onreadystatechange = function() {
                if (req.readyState == 4) {
                    if (req.status == 200) {
                        cbFunc(req.response);
                    } else {
                        alert('啊偶，cookie失效了~');
                        location.reload();
                    }
                }
            };
        },
        //按日期查询
        getDateResult: function(res) {
            this.dateQueryResult = JSON.parse(res);
        },
        getDateQuery: function(val, cbFunc) {
            var req = new XMLHttpRequest();
            req.open("GET", this.serverAddr + "covid19DateData/" + val, true);
            req.send();
            req.onreadystatechange = function() {
                if (req.readyState == 4) {
                    if (req.status == 200) {
                        cbFunc(req.response);
                    } else {
                        alert('啊偶，cookie失效了~');
                        location.reload();
                    }
                }
            };
        },
        //保存查询结果到csv
        saveData: function(method) {
            switch (method) {
                case 0:
                    {
                        saveCsv(this.compQueryResult, "ComplicatedQuery");
                        break;
                    }
                case 1:
                    {
                        saveCsv(this.cityQueryResult, "CityQuery");
                        break;
                    }
                case 2:
                    {
                        saveCsv(this.dateQueryResult, "DateQuery");
                        break;
                    }
            }
        }
    },
    watch: {
        //侦听查询字符串，并调用回调函数向服务端发送请求
        compQuery: function(newVal, oldVal) {
            //console.log("old: " + oldVal + ", new: " + newVal);
            if (!newVal) {
                //alert('QWQ查询条件为空');
                return;
            }
            this.getCompQuery(newVal, this.getCompResult);
        },
        cityQuery: function(newVal, oldVal) {
            //console.log("old: " + oldVal + ", new: " + newVal);
            if (!newVal) {
                //alert('QWQ查询条件为空');
                return;
            }
            this.getCityQuery(newVal, this.getCityResult);
        },
        queryDateSpan: function(newVal, oldVal) {
            //console.log("old: " + oldVal + ", new: " + newVal);
            //alert("选择的时间段：" + newVal);
            if (!newVal) {
                //alert('QWQ查询条件为空');
                return;
            }
            this.getDateQuery(newVal, this.getDateResult);
        },
        //侦听查询结果，设置保存按钮可用性
        compQueryResult: function(newVal, oldVal) {
            this.btn1 = newVal ? false : true;
        },
        cityQueryResult: function(newVal, oldVal) {
            this.btn2 = newVal ? false : true;
        },
        dateQueryResult: function(newVal, oldVal) {
            this.btn3 = newVal ? false : true;
        },
    }
})