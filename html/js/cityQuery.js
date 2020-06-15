var cityQueryApp = new Vue({
    el: '#cityApp',
    data: {
        activeTab: 'epidemicChart',
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
        cityQuery: null,
        cityQueryResult: null,
        queryDateSpan: null,
        dateQueryResult: null,
        compCity: null,
        compDateSpan: null,
        compQueryResult: null,
        serverAddr: "http://localhost:8081/",
    },
    computed: {
        compQuery: function() {
            if (this.compCity && this.compDateSpan) {
                // this.btn1 = false;
                return this.compCity + "," + this.compDateSpan;
            } else {
                // this.btn1 = true;
            }
        },
    },
    methods: {
        getCompResult: function(res) {
            this.compQueryResult = JSON.parse(res);
        },
        getCompQuery: function(val, cbFunc) {
            var req = new XMLHttpRequest();
            req.open("GET", this.serverAddr + "covid19CompData/" + val, true);
            req.send();
            req.onreadystatechange = function() {
                if (req.readyState == 4 && req.status == 200) {
                    //console.log(req);
                    cbFunc(req.response);
                } else {
                    //console.log(req.readyState + ", " + req.status);
                }
            };
        },
        getCityResult: function(res) {
            this.cityQueryResult = JSON.parse(res);
        },
        getCityQuery: function(val, cbFunc) {
            var req = new XMLHttpRequest();
            req.open("GET", this.serverAddr + "covid19CityData/" + val, true);
            req.send();

            req.onreadystatechange = function() {
                if (req.readyState == 4 && req.status == 200) {
                    //console.log(req);
                    cbFunc(req.response);
                } else {
                    //console.log(req.readyState + ", " + req.status);
                }
            };
        },
        getDateResult: function(res) {
            this.dateQueryResult = JSON.parse(res);
        },
        getDateQuery: function(val, cbFunc) {
            var req = new XMLHttpRequest();
            req.open("GET", this.serverAddr + "covid19DateData/" + val, true);
            req.send();
            req.onreadystatechange = function() {
                if (req.readyState == 4 && req.status == 200) {
                    //console.log(req);
                    cbFunc(req.response);
                } else {
                    //console.log(req.readyState + ", " + req.status);
                }
            };
        },
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
        compQuery: function(newVal, oldVal) {
            //console.log("old: " + oldVal + ", new: " + newVal);
            if (!newVal) {
                //alert('QWQ查询条件为空');
                this.btn1 = true;
                return;
            }
            this.getCompQuery(newVal, this.getCompResult);
            this.btn1 = false;
        },
        cityQuery: function(newVal, oldVal) {
            //console.log("old: " + oldVal + ", new: " + newVal);
            if (!newVal) {
                //alert('QWQ查询条件为空');
                this.btn2 = true;
                return;
            }
            this.getCityQuery(newVal, this.getCityResult);
            this.btn2 = false;
        },
        queryDateSpan: function(newVal, oldVal) {
            //console.log("old: " + oldVal + ", new: " + newVal);
            //alert("选择的时间段：" + newVal);
            if (!newVal) {
                //alert('QWQ查询条件为空');
                this.btn3 = true;
                return;
            }
            this.getDateQuery(newVal, this.getDateResult);
            this.btn3 = false;
        },
    }
})