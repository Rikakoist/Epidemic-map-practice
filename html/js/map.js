require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/layers/GeoJSONLayer",
    "esri/widgets/Legend",
    "esri/widgets/Compass",
    "esri/widgets/BasemapLayerList",
    "esri/widgets/LayerList",
    "esri/widgets/Zoom",
    "esri/widgets/Fullscreen",
    "esri/widgets/ScaleBar",
    "esri/widgets/Search",
    "esri/widgets/BasemapToggle"
], function(Map, MapView, FeatureLayer, GeoJSONLayer, Legend, Compass, BasemapLayerList, LayerList, Zoom, Fullscreen, ScaleBar, Search, BasemapToggle) {

    //底图
    const mapType = ["topo", "streets", "satellite",
        "hybrid", "dark-gray", "gray",
        "national-geographic", "oceans", "osm",
        "terrain", "dark-gray-vector", "gray-vector",
        "streets-vector", "streets-night-vector", "streets-navigation-vector",
        "topo-vector", "streets-relief-vector"
    ];

    const map = new Map({
        basemap: mapType[0]
    });


    //容器
    var view = new MapView({
        container: "viewdiv",
        map: map,
        center: [135.00, 35.50],
        zoom: 6
    });

    //符号
    const symOutline = {
        width: 1,
        color: "gray"
    };

    const nodatasym = {
        type: "simple-fill",
        color: "grey",
        outline: symOutline
    };

    const lvl0 = {
        type: "simple-fill",
        color: [255, 255, 255, 0.9],
        outline: symOutline
    };

    const lvl1 = {
        type: "simple-fill",
        color: [255, 204, 204, 0.9],
        outline: symOutline
    };

    const lvl2 = {
        type: "simple-fill",
        color: [252, 158, 143, 0.9],
        outline: symOutline
    };

    const lvl3 = {
        type: "simple-fill",
        color: [250, 114, 90, 0.9],
        outline: symOutline
    };

    const lvl4 = {
        type: "simple-fill",
        color: [237, 67, 45, 0.9],
        outline: symOutline
    };

    const lvl5 = {
        type: "simple-fill",
        color: [219, 0, 0, 0.9],
        outline: symOutline
    };

    //渲染器
    const classBreakRenderer = {
        type: "class-breaks",
        field: "患者数",
        legendOptions: {
            title: "日本"
        },
        defaultSymbol: nodatasym,
        defaultLabel: "暂无数据",
        classBreakInfos: [{
            minValue: 0,
            maxValue: 0,
            symbol: lvl0,
            label: "0"
        }, {
            minValue: 1,
            maxValue: 100,
            symbol: lvl1,
            label: "1 - 100"
        }, {
            minValue: 101,
            maxValue: 500,
            symbol: lvl2,
            label: "101 - 500"
        }, {
            minValue: 501,
            maxValue: 1000,
            symbol: lvl3,
            label: "501 - 1000"
        }, {
            minValue: 1001,
            maxValue: 3000,
            symbol: lvl4,
            label: "1001 - 3000"
        }, {
            minValue: 3001,
            maxValue: 100000,
            symbol: lvl5,
            label: "3000+"
        }]
    };

    //弹出菜单
    const epidemicPopup = {
        title: "<h2>{NL_NAME_1} ({日付})</h2>",
        dockEnabled: true,
        content: [{
                type: "fields",
                fieldInfos: [{
                        fieldName: "患者数",
                        visible: true,
                        label: "<b>病例总数</b>",
                    }, {
                        fieldName: "入院中",
                        visible: true,
                        label: "活动病例",
                    },
                    {
                        fieldName: "退院者",
                        visible: true,
                        label: "治愈",
                    },
                    {
                        fieldName: "死亡者",
                        visible: true,
                        label: "病亡",
                    }
                ]
            },
            {
                type: "media",
                mediaInfos: [{
                    title: "<h3>人数比例</h3>",
                    type: "pie-chart",
                    caption: "山川异域，日月同天",
                    value: {
                        fields: ["入院中", "退院者", "死亡者"],
                        normalizeField: null,
                        tooltipField: ""
                    }
                }]
            }
        ]
    };

    //要素图层
    const featureLayer = new FeatureLayer({
        url: "http://mc.mikuappendmc.online:6080/arcgis/rest/services/jpn/Japan/FeatureServer",
        copyright: "日本国土地理院",
        renderer: classBreakRenderer,
        popupTemplate: epidemicPopup
    });
    map.add(featureLayer);

    //图例
    var legend = new Legend({
        view: view,
        layerInfos: [{
            layer: featureLayer,
            title: "累积病例数"
        }]
    });
    view.ui.add(legend, "bottom-right");

    //指南针
    var compass = new Compass({
        view: view
    });
    view.ui.add(compass, {
        position: "top-right",
        index: 0
    });

    //缩放
    view.ui.move("zoom", {
        position: "top-right",
        index: 1
    });

    //全屏
    fullscreen = new Fullscreen({
        view: view
    });
    view.ui.add(fullscreen, {
        position: "top-right",
        index: 2
    });

    /*
        var basemapLayerList = new BasemapLayerList({
            view: view
        });
        view.ui.add(basemapLayerList, "top-left");
*/
    var layerList = new LayerList({
        view: view
    });
    view.ui.add(layerList, {
        position: "top-left",
        index: 1
    });

    //底图切换
    var basemapToggle = new BasemapToggle({
        view: view,
        nextBasemap: mapType[4]
    });
    view.ui.add(basemapToggle, {
        position: "bottom-left",
        index: 0
    });

    //比例线段
    var scaleBar = new ScaleBar({
        view: view,
        style: "line",
        unit: "metric"
    });
    view.ui.add(scaleBar, {
        position: "bottom-left",
        index: 1
    });

    //搜索 
    const searchWidget = new Search({
        view: view,
    });
    view.ui.add(searchWidget, {
        position: "top-left",
        index: 0
    });
});