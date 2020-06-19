<template>
    <el-container class="flexContainer">
        <el-card v-for="news in newsList" v-bind:key="news.sourceId" v-bind:news="news" class="newsFace">
            <a class="newsLink" :href="news.url" target="_blank">
                <span class="newsTitle">{{news.title}}</span><br/>
                <img :src="news.imgsrc" class="newsImg"/>
            </a>
        </el-card>
        <small style="text-align:center;margin-top:15px;">到底了...</small> 
    <el-container>
        <el-button style="float:right;" type="primary" @click="getNewsList(getNewsResult)"></el-button>
    </el-container>
    </el-container>
</template>

<script>
module.exports={
    name:'newscard',
    props:['newsList'],
    data(){
        return{
            newsList: [],
            url: 'https://cors-anywhere.herokuapp.com/' + 'http://c.3g.163.com/nc/article/list/T1467284926140/0-20.html',
            scrollDown: '刷刷刷...',
        }
    },
    //装载时触发
    mounted() {
        this.getNewsList(this.getNewsResult);
    },
    methods:{
         //新闻拉取
        getNewsResult: function(res) {
            this.newsList = (JSON.parse(res)).T1467284926140;
        },
        getNewsList: function(cbFunc) {
            var req = new XMLHttpRequest();
            req.open("GET", this.url, true);
            req.send();
            req.onreadystatechange = function() {
                if (req.readyState == 4) {
                    if (req.status == 200) {
                        //console.log(req.response);
                        cbFunc(req.response);
                    } else {
                        alert('啊偶，新闻加载失败了~');
                        //location.reload();
                    }
                }
            };
        },
    },
    watch:{
          newsList: function(newVal, oldVal) {
            if (!newVal) {
                this.scrollDown = '什么都木有...';
            }
            this.scrollDown = '到底了...';
        },
    }
}
</script>

<style scoped>
.flexContainer {
    display: flex;
    flex-direction: column !important;
    height: auto;
}

.newsFace {
    margin-top: 15px;
    width: 430px;
}

.newsFace:last-child {
    margin-bottom: 0;
}

.newsImg {
    height: 75px;
}

.newsLink {
    text-decoration: none;
    color: black;
}

.newsTitle {
    font-weight: bold;
    font-size: 14px;
}
</style>
