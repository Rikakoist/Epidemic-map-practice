//新闻卡组件
Vue.component('newscard', {
    props: ['newsList'],
    data() {
        return {
            scrollDown: '',
            url: 'https://cors-anywhere.herokuapp.com/' + 'http://c.3g.163.com/nc/article/list/T1467284926140/0-20.html',
            ico: '',
            btn: 'true',
        }
    },
    template: '<el-container class="flexContainer" v-loading="btn" element-loading-text="刷刷刷..." element-loading-spinner="el-icon-loading">' +
        '<transition-group name="staggered-fade" tag="ul" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave">' +
        '<el-card v-for="news in newsList" v-bind:key="news.sourceId" v-bind:news="news" class="newsFace" v:if="btn">' +
        '<a class="newsLink" :href="news.url" target="_blank">' +
        '<span class="newsTitle">{{news.title}}</span><br/>' +
        '<img :src="news.imgsrc" class="newsImg"/><br/>' +
        '<span class="newsSource">来源：{{news.source.replace("#","")}}</span><br/>' +
        '</a>' +
        '</el-card>' +
        '</transition-group>' +
        '<el-button style="margin-top:15px;" type="primary" v-on:click="getNewsList(getNewsResult)" :icon="ico" :disabled="btn">{{scrollDown}}</el-button>' +
        '</el-container>',

    //装载时触发
    mounted() {
        this.getNewsList(this.getNewsResult);
    },
    methods: {
        //新闻拉取
        getNewsResult: function(res) {
            this.newsList = (JSON.parse(res)).T1467284926140;
            this.btn = false;
        },
        getNewsList: function(cbFunc) {
            this.newsList = [];
            this.btn = true;
            document.getElementById('newsAnchor').scrollIntoView({ behavior: 'smooth' });
            var req = new XMLHttpRequest();
            req.open("GET", this.url, true);
            req.setRequestHeader('cache-control', 'no-cache');
            req.send();
            req.onreadystatechange = function() {
                if (req.readyState == 4) {
                    if (req.status == 200) {
                        cbFunc(req.response);
                    } else {
                        this.btn = false;
                        this.scrollDown = '加载失败了~';
                        this.ico = 'el-icon-error';
                        //location.reload();
                    }
                } else {

                }
            };
        },
        //新闻折展动画
        beforeEnter: function(el) {
            el.style.opacity = 0
            el.style.height = 0
        },
        enter: function(el, done) {
            var delay = el.dataset.index * 100
            setTimeout(function() {
                Velocity(
                    el, { opacity: 1, height: 180 }, { complete: done }
                )
            }, delay)
        },
        leave: function(el, done) {
            var delay = el.dataset.index * 100
            setTimeout(function() {
                Velocity(
                    el, { opacity: 0, height: 0 }, { complete: done }
                )
            }, delay)
        }
    },
    watch: {
        //监听按钮可用性来改变文字和图标
        btn: function(newVal, oldVal) {
            this.scrollDown = newVal ? '刷刷刷...' : '到底了...';
            this.ico = newVal ? 'el-icon-loading' : 'el-icon-refresh';
        }
    }
});

//App
var cityQueryApp = new Vue({
    el: '#epidemicQueryApp',
    data: {
        activeTab: 'epidemicChart', //活动tab
        //按钮可用性
        btn1: true,
        btn2: true,
        btn3: true,
        tableLoadTxt: '服务器娘祈祷中...',
        tableLoadIco: 'el-icon-loading',
        tableLoad1: false,
        tableLoad2: false,
        tableLoad3: false,
        cityList: ["東京都", "大阪府", "神奈川県", "北海道", "埼玉県", "千葉県", "兵庫県", "福岡県",
            "愛知県", "京都府", "石川県", "富山県", "茨城県", "広島県", "岐阜県", "群馬県", "沖縄県",
            "福井県", "滋賀県", "奈良県", "宮城県", "福島県", "新潟県", "高知県", "長野県", "静岡県",
            "山形県", "和歌山県", "大分県", "山梨県", "栃木県", "愛媛県", "熊本県", "三重県", "佐賀県",
            "山口県", "香川県", "青森県", "島根県", "岡山県", "長崎県", "宮崎県", "秋田県", "鹿児島県",
            "徳島県", "鳥取県", "岩手県",
        ],
        //查询们
        compCity: null,
        compDateSpan: null,
        compQueryResult: null,
        cityQuery: null,
        cityQueryResult: null,
        queryDateSpan: null,
        dateQueryResult: null,
        serverAddr: "/covid19Data/",
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
            this.tableLoad1 = false;
        },
        //按城市查询
        getCityResult: function(res) {
            this.cityQueryResult = JSON.parse(res);
            this.tableLoad2 = false;
        },
        //按日期查询
        getDateResult: function(res) {
            this.dateQueryResult = JSON.parse(res);
            this.tableLoad3 = false;
        },
        //查询函数
        getQuery: function(val, cbFunc) {
            var req = new XMLHttpRequest();
            req.open("GET", this.serverAddr + val, true);
            req.send();
            req.onreadystatechange = function() {
                if (req.readyState == 4) {
                    switch (req.status) {
                        case 200:
                            {
                                cbFunc(req.response);
                                break;
                            }
                        case 400:
                            {
                                alert('啊偶，服务器娘不能识别查询的条件~');
                                break;
                            }
                        case 401:
                            {
                                alert('啊偶，cookie失效了~');
                                location.reload();
                                break;
                            }
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
        //监听查询字符串，并调用回调函数向服务端发送请求
        compQuery: function(newVal, oldVal) {
            if (!newVal) {
                return;
            }
            this.tableLoad1 = true;
            this.getQuery(newVal, this.getCompResult);
        },
        cityQuery: function(newVal, oldVal) {
            if (!newVal) {
                return;
            }
            this.tableLoad2 = true;
            this.getQuery(newVal, this.getCityResult);
        },
        queryDateSpan: function(newVal, oldVal) {
            if (!newVal) {
                return;
            }
            this.tableLoad3 = true;
            this.getQuery(newVal, this.getDateResult);
        },
        //监听查询结果，设置保存按钮可用性
        compQueryResult: function(newVal, oldVal) {
            this.btn1 = newVal ? false : true;
        },
        cityQueryResult: function(newVal, oldVal) {
            this.btn2 = newVal ? false : true;
        },
        dateQueryResult: function(newVal, oldVal) {
            this.btn3 = newVal ? false : true;
        },
    },
})