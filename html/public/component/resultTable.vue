<template>
    <el-tab-pane label="按时间段查询" name="queryByTimeSpan">
        <span slot="label"><i class="el-icon-date"></i> 按时间段查询</span>
        <el-date-picker v-model="queryDateSpan" default-value="2020-04-15" value-format="yyyyMMdd" type="daterange" range-seperator="至" start-placeholder="起始日期" end-placeholder="结束日期"></el-date-picker>
        <el-button type="primary" :disabled="btn3" @click="saveData(2)" icon="el-icon-download"></el-button>
        <el-table :data="dateQueryResult" stripe>
            <el-table-column prop="daytime" label="日期" width="90"></el-table-column>
            <el-table-column prop="city" label="城市" width="80"></el-table-column>
            <el-table-column prop="infected" label="感染数" width="65"></el-table-column>
            <el-table-column prop="inhospital" label="治疗中" width="65"></el-table-column>
            <el-table-column prop="cured" label="治愈" width="55"></el-table-column>
            <el-table-column prop="died" label="病亡" width="55"></el-table-column>
        </el-table>
    </el-tab-pane>
</template>

<script>
module.exports={
    name:'querybytime',
    props:['queryresult'],
    data(){
        return{
            queryResult:[],
        }
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