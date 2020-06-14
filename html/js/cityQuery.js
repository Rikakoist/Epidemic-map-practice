var cityQueryApp = new Vue({
    el: '#cityApp',
    data: {
        activeTab: 'queryByCity',
        cityList: ["東京都", "大阪府", "神奈川県", "北海道", "埼玉県", "千葉県", "兵庫県", "福岡県",
            "愛知県", "京都府", "石川県", "富山県", "茨城県", "広島県", "岐阜県", "群馬県", "沖縄県",
            "福井県", "滋賀県", "奈良県", "宮城県", "福島県", "新潟県", "高知県", "長野県", "静岡県",
            "山形県", "和歌山県", "大分県", "山梨県", "栃木県", "愛媛県", "熊本県", "三重県", "佐賀県",
            "山口県", "香川県", "青森県", "島根県", "岡山県", "長崎県", "宮崎県", "秋田県", "鹿児島県",
            "徳島県", "鳥取県", "岩手県",
        ],
        query: null,
        queryDateStart: "",
        queryDateEnd: "",
        queryResult: null,
    },
    methods: {
        getResult: function(res) {
            this.queryResult = JSON.parse(res);
        },
        getQuery: function(val, cbFunc) {
            var req = new XMLHttpRequest();
            req.open("GET", "http://localhost:8081/covid19CityData/" + val, true);
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
    },
    watch: {
        query: function(newVal, oldVal) {
            //console.log("old: " + oldVal + ", new: " + newVal);
            if (!newVal) {
                alert('QWQ查询条件为空');
                return;
            }
            this.getQuery(newVal, this.getResult);
        }
    }
})