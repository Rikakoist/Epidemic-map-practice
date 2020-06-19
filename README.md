# Epidemic-map-practice
Epidemic visualization map practice.
疫情地图可视化练习。

## 目录结构
- /: 网站根目录。
    - login.html: 登陆页面。
    - map.html: 可视化页面。
    - pgQuery.js：服务端数据库查询脚本。
    - server.js: Express 服务端脚本。
- /public: 网站的公共目录。
    - /component: Vue 组件（暂未使用）。
        - newscard.vue: 新闻列表组件。
        - resultTable.vue: 图表及查询组件。
    - /js: JavaScript 文件。
        - chartLayout.js: ECharts 图表配置文件。
        - epidemicApp.js: 可视化页面关联的 Vue app。
        - loginApp.js: 登陆页面关联的 Vue app。
        - map.js: 可视化页面的底图配置文件。
        - saveCsv.js: 可视化页面查询的保存功能。
    - /style: 样式表文件。
        - newsStyle.css: 新闻列表的样式。
        - screenstyle.css: 登陆页面的样式。

