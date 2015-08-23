(function () {
    require.config({
        paths: {
            echarts:'http://echarts.baidu.com/doc/example/www/js'
        },
        packages: [
            {
                name: 'BMap',
                location: 'static/require',
                main: 'main'
            }
        ]
    });

    require(
    [
        'echarts',
        'BMap',
        'echarts/chart/map'
    ],
    function (echarts, BMapExtension) {
        $('#main').css({
            height:$('body').height(),
            width: $('body').width()
        });

        // 初始化地图
        var BMapExt = new BMapExtension($('#main')[0], BMap, echarts,{
            enableMapClick: false
        });
        var map = BMapExt.getMap();

        var container = BMapExt.getEchartsContainer();

        var startPoint = {
            //x: 121.4539,
            //y: 31.22940
            //x: 121.539812,
            //y: 25.019930
            x: 121.51932,
            y:25.062905
        };
        var point = new BMap.Point(startPoint.x, startPoint.y);
        map.centerAndZoom(point, 13);
        map.addControl(new BMap.NavigationControl());
map.addControl(new BMap.ScaleControl());
map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.MapTypeControl());

        map.enableScrollWheelZoom(true);
        // 地图自定义样式
        map.setMapStyle({
            styleJson: [
                  {
                       "featureType": "water",
                       "elementType": "all",
                       //"stylers": {
                       //     "color": "#044161"
                       //}
                      "stylers": {
                              "lightness": 10,
                              "saturation": -100
                    }
                  },
                  {
                       "featureType": "land",
                       "elementType": "all",
                       //"stylers": {
                       //    //"lightness": 100,
                       //    //   "saturation": -100,
                       //     "color": "#08304b"
                       //}
                      "stylers": {
                              "lightness": 10,
                              "saturation": -100
                    }
                  },
                  {
                       "featureType": "boundary",
                       "elementType": "geometry",
                       //"stylers": {
                       //     "color": "#064f85"
                       //}
                      "stylers": {
                          "visibility": "off",
                              "lightness": 10,
                              "saturation": -100
                    }
                  },
                  {
                       "featureType": "railway",
                       "elementType": "all",
                       //"stylers": {
                       //     "visibility": "off"
                       //}
                      "stylers": {

                          "visibility": "off"
                    }
                  },
                  {
                       "featureType": "highway",
                       "elementType": "geometry",
                       //"stylers": {
                       //     "color": "#08304b"
                       //}
                      "stylers": {
                          "visibility": "off",
                              "lightness": 10,
                              "saturation": -100
                    }
                  },
                  {
                       "featureType": "highway",
                       "elementType": "geometry.fill",
                       //"stylers": {
                       //     "color": "#005b96",
                       //     "lightness": 1
                       //}
                      "stylers": {
                          "visibility": "off",
                              "lightness": 10,
                              "saturation": -100
                    }
                  },
                  {
                       "featureType": "highway",
                       "elementType": "labels",

                       "stylers": {
                           "visibility": "off"
                           //"lightness": 10,
                           //   "saturation": -100,

                       }
                  },
                  {
                       "featureType": "arterial",
                       "elementType": "geometry",
                       "stylers": {
                           "visibility": "off",
                           "lightness": 10,
                              "saturation": -100

                            //"color": "#08304b"
                       }
                  },
                  {
                       "featureType": "arterial",
                       "elementType": "geometry.fill",
                       "stylers": {
                           "visibility": "off",
                            //"color": "#00508b"
                           "lightness": 10,
                              "saturation": -100
                       }
                  },
                  {
                       "featureType": "poi",
                       "elementType": "all",
                       "stylers": {
                            "visibility": "off"
                       }
                  },
                  {
                       "featureType": "green",
                       "elementType": "all",
                       "stylers": {
                            //"color": "#056197",
                            "visibility": "off"
                       }
                  },
                  {
                       "featureType": "subway",
                       "elementType": "all",
                       "stylers": {
                            "visibility": "off"
                            // "lightness": 10,
                            //   "saturation": -100
                       }
                  },
                  {
                       "featureType": "manmade",
                       "elementType": "all",
                       "stylers": {
                            "visibility": "off"
                       }
                  },
                  {
                       "featureType": "local",
                       "elementType": "all",
                       "stylers": {
                            "visibility": "off"
                       }
                  },
                  {
                       "featureType": "arterial",
                       "elementType": "labels",
                       "stylers": {
                            "visibility": "off"
                       }
                  },
                  {
                       "featureType": "boundary",
                       "elementType": "geometry.fill",
                       "stylers": {
                           "visibility": "off",
                            //"color": "#029fd4"
                            "lightness": 10,
                              "saturation": -100
                       }
                  },
                  {
                       "featureType": "building",
                       "elementType": "all",
                       "stylers": {
                            "lightness": 10,
                              "saturation": -100,
                           "visibility": "off"

                            //"color": "#1a5787"
                       }
                  },
                  {
                       "featureType": "label",
                       "elementType": "all",
                       "stylers": {
                            "visibility": "off"
                       }
                  }
            ]
        });

        option = {
            color: ['#C48D33','#E3002D','#01865B','#F7B41B','#0070BC'],
            title : {
				text: '臺北捷運列車實時運行圖',
				subtext:'',
				x:'center',
				textStyle : {
				color: '#333300'
				}
             },
			 tooltip : {
                trigger: 'item',
                formatter: function (v) {
                    return v[1].replace(':', ' > ');
                }
            },
            legend: {
                orient: 'vertical',
                x:'right',
                y:'bottom',
				data:['1号文湖線', '2号淡水信義線','3号松山新店線','4号中和新蘆線','5号板南線'],
				selectedMode: 'multiple',
				//selected:{
                 //   '1号线':true,
				//'2号线' : true,
				//'3号线' : true
				//},
                textStyle : {
                    color: '#333300'
                }
            },

            series : [
                {
					name:'1号文湖線',
					type:'map',
					mapType: 'none',
					data:[],
					geoCoord: {
					'南港展覽館站':[121.6278126,25.05798164],
                    '南港軟體園區站':[121.6262574,25.06259024],
                    '東湖站':[121.6217491,25.06984182],
                    '葫洲站':[121.6174634,25.07542846],
                    '大湖公園站':[121.6124439,25.08663357],
                    '內湖站':[121.6046876,25.08656738],
                    '文德站':[121.595011,25.0816116],
                    '港墘站':[121.5852999,25.08329064],
                    '西湖站':[121.5774232,25.08551564],
                    '劍南路站':[121.565817,25.08831016],
                    '大直站':[121.5571424,25.08291264],
                    '松山機場站':[121.5622135,25.06645088],
                    '中山國中站':[121.5544748,25.06425551],
                    '南京復興站':[121.554258,25.05571731],
                    '忠孝復興站':[121.5540205,25.04502865],
                    '大安站':[121.5538131,25.03634394],
                    '科技大樓站':[121.5537012,25.02952124],
                    '六張犁站':[121.5633469,25.0272289],
                    '麟光站':[121.5690153,25.02197181],
                    '辛亥站':[121.5673377,25.00892254],
                    '萬芳醫院站':[121.5683824,25.0028263],
                    '萬芳社區站':[121.5783276,25.0019506],
                    '木柵站':[121.5833833,25.00153446],
                    '動物園站':[121.5895902,25.00138214]
                    },
					markLine : {
						smooth:false,
						symbolSize:[0,0],
						effect : {
							show:true,
							scaleSize: 10,
							period: 30,
							color: '#fff',
							shadowBlur: 0
							},
							itemStyle : {
								normal: {
									borderWidth:1,
									label:{
										show:false
										},
										lineStyle: {
											type: 'solid',
											shadowBlur: 0
											}
											}
											},
							data : []
							},
					markPoint : {
						symbol:'emptyCircle',
						symbolSize : function (v){
							return 5 + v/10
						},
						effect : {
								show:true,
								shadowBlur : 0
								},
						itemStyle:{
							normal:{
								label:{show:false},
                                color:'#C48D33'
								}
						},
						tooltip : {
							show: true,
							trigger: 'item'
						},
						data : [
                            {name:'南港展覽館站',value:3},
                            {name:'南港軟體園區站',value:3},
                            {name:'東湖站',value:3},
                            {name:'葫洲站',value:3},
                            {name:'大湖公園站',value:3},
                            {name:'內湖站',value:3},
                            {name:'文德站',value:3},
                            {name:'港墘站',value:3},
                            {name:'西湖站',value:3},
                            {name:'劍南路站',value:3},
                            {name:'大直站',value:3},
                            {name:'松山機場站',value:3},
                            {name:'中山國中站',value:3},
                            {name:'南京復興站',value:3},
                            {name:'忠孝復興站',value:3},
                            {name:'大安站',value:3},
                            {name:'科技大樓站',value:3},
                            {name:'六張犁站',value:3},
                            {name:'麟光站',value:3},
                            {name:'辛亥站',value:3},
                            {name:'萬芳醫院站',value:3},
                            {name:'萬芳社區站',value:3},
                            {name:'木柵站',value:3},
                            {name:'動物園站',value:3}
									]
						}
				}
                ,
                 {
					name:'2号淡水信義線',
					type:'map',
					mapType: 'none',
					data:[],
					geoCoord: {

					'淡水站':[121.4561156
,25.17151706],
'紅樹林站':[121.4694352
,25.15752527],
'竹圍站':[121.4700611
,25.14041745],
'關渡站':[121.4776945
,25.12894923],
'忠義站':[121.484005
,25.13415287],
'復興崗站':[121.4960308
,25.14045309],
'北投站':[121.5091897
,25.13472798],
'奇岩站':[121.5116863
,25.12838161],
'唭哩岸站':[121.5167802
,25.12378506],
'石牌站':[121.5260297
,25.11753427],
'明德站':[121.5292979
,25.11277538],
'芝山站':[121.5329382
,25.10616646],
'士林站':[121.5366212
,25.09670197],
'劍潭站':[121.5354667
,25.08802026],
'圓山站':[121.5305252
,25.07441394],
'民權西路站':[121.5297313
,25.06595012],
'雙連站':[121.5310279
,25.06087512],
'中山站':[121.5307932
,25.05574265],
'台北車站':[121.527951
,25.04927187],
'台大醫院站':[121.5264701
,25.04425105],
'中正紀念堂站':[121.5286928
,25.03575887],
'東門站':[121.5390857
,25.03703916],
'大安森林公園站':[121.5451849
,25.03669101],
'大安站':[121.5538058
,25.03633545],
'信義安和站':[121.5637397
,25.03677296],
'台北101/世貿站':[121.5734895
,25.03651373],
'象山站':[121.5797832
,25.03617139]
                    },
					markLine : {
						smooth:false,
						symbolSize:[0,0],
						effect : {
							show:true,
							scaleSize: 10,
							period: 30,
							color: '#fff',
							shadowBlur: 0
							},
							itemStyle : {
								normal: {
									borderWidth:1,
									label:{
										show:false
										},
										lineStyle: {
											type: 'solid',
											shadowBlur: 0
											}
											}
											},
							data : []
							},
					markPoint : {
						symbol:'emptyCircle',
						symbolSize : function (v){
							return 5 + v/10
						},
						effect : {
								show:true,
								shadowBlur : 0
								},
						itemStyle:{
							normal:{
                                color:'#E3002D',
								label:{show:false}
								}
						},
						tooltip : {
							show: true,
							trigger: 'item'
						},
						data : [
                            {name:'淡水站',value:3},
                            {name:'紅樹林站',value:3},
                            {name:'竹圍站',value:3},
                            {name:'關渡站',value:3},
                            {name:'忠義站',value:3},
                            {name:'復興崗站',value:3},
                            {name:'北投站',value:3},
                            {name:'奇岩站',value:3},
                            {name:'唭哩岸站',value:3},
                            {name:'石牌站',value:3},
                            {name:'明德站',value:3},
                            {name:'芝山站',value:3},
                            {name:'士林站',value:3},
                            {name:'劍潭站',value:3},
                            {name:'圓山站',value:3},
                            {name:'民權西路站',value:3},
                            {name:'雙連站',value:3},
                            {name:'中山站',value:3},
                            {name:'台北車站',value:3},
                            {name:'台大醫院站',value:3},
                            {name:'中正紀念堂站',value:3},
                            {name:'東門站',value:3},
                            {name:'大安森林公園站',value:3},
                            {name:'大安站',value:3},
                            {name:'信義安和站',value:3},
                            {name:'台北101/世貿站',value:3},
                            {name:'象山站',value:3}
                        ]
						}
				}
                ,
                {
					name:'3号松山新店線',
					type:'map',
					mapType: 'none',
					data:[],
					geoCoord: {

					'松山站':[121.588221
,25.0524849],
'南京三民站':[121.5748995
,25.05505383],
'台北小巨蛋站':[121.561742
,25.05528617],
'南京復興站':[121.5542623
,25.05571898],
'松江南京站':[121.5433841
,25.05528256],
'中山站':[121.530787
,25.0557485],
'北門站':[121.5206476
,25.05248381],
'西門站':[121.5187846
,25.04499964],
'小南門站':[121.5213289
,25.03847939],
'中正紀念堂站':[121.5286933
,25.03575807],
'古亭站':[121.533272
,25.0294542],
'台電大樓站':[121.5385274
,25.02391137],
'公館站':[121.5445465
,25.01819297],
'萬隆站':[121.5493626
,25.00520552],
'景美站':[121.5508999
,24.9954948],
'大坪林站':[121.5516458
,24.98627028],
'七張站':[121.5532249
,24.97855814],
'新店區公所站':[121.5515858
,24.97076471],
'新店站':[121.5478785
,24.96117013]
                    },
					markLine : {
						smooth:false,
						symbolSize:[0,0],
						effect : {
							show:true,
							scaleSize: 10,
							period: 30,
							color: '#fff',
							shadowBlur: 0
							},
							itemStyle : {
								normal: {
									borderWidth:1,
									label:{
										show:false
										},
										lineStyle: {
											type: 'solid',
											shadowBlur: 0
											}
											}
											},
							data : []
							},
					markPoint : {
						symbol:'emptyCircle',
						symbolSize : function (v){
							return 5 + v/10
						},
						effect : {
								show:true,
								shadowBlur : 0
								},
						itemStyle:{
							normal:{
                                color:'#01865B',
								label:{show:false}
								}
						},
						tooltip : {
							show: true,
							trigger: 'item'
						},
						data : [
                            {name:'松山站',value:3},
                            {name:'南京三民站',value:3},
                            {name:'台北小巨蛋站',value:3},
                            {name:'南京復興站',value:3},
                            {name:'松江南京站',value:3},
                            {name:'中山站',value:3},
                            {name:'北門站',value:3},
                            {name:'西門站',value:3},
                            {name:'小南門站',value:3},
                            {name:'中正紀念堂站',value:3},
                            {name:'古亭站',value:3},
                            {name:'台電大樓站',value:3},
                            {name:'公館站',value:3},
                            {name:'萬隆站',value:3},
                            {name:'景美站',value:3},
                            {name:'大坪林站',value:3},
                            {name:'七張站',value:3},
                            {name:'新店區公所站',value:3},
                            {name:'新店站',value:3}


                        ]
						}
				}
                ,
                 {
					name:'4号中和新蘆線',
					type:'map',
					mapType: 'none',
					data:[],
					geoCoord: {

					'南勢角站':[121.5197481,24.99296694],
                    '景安站':[121.5156433,24.99679463],
                    '永安市場站':[121.5217217,25.00581912],
                    '頂溪站':[121.5259408,25.0168122],
                    '古亭站':[121.5332642,25.02945867],
                    '東門站':[121.5390849,25.0370462],
                    '忠孝新生站':[121.5432224,25.04561386],
                    '松江南京站':[121.5433873,25.0552753],
                    '行天宮站':[121.5434988,25.06298667],
                    '中山國小站':[121.5367761,25.06585237],
                    '民權西路站':[121.5297281,25.06595251],
                    '大橋頭站':[121.5231766,25.06621085],
                    '台北橋站':[121.511286,25.06615152],
                    '菜寮站':[121.5027074,25.06317008],
                    '三重站':[121.4952826,25.05876166],
                    '先嗇宮站':[121.4824732,25.04969136],
                    '頭前庄站':[121.4722977,25.04312251],
                    '新莊站':[121.4630194,25.03972107],
                    '輔大站':[121.4460266,25.03646963],
                    '丹鳳站':[121.4333093,25.03254872],
                    '迴龍站':[121.4219188,25.02537251],
                    '三重國小站':[121.5074408,25.07319338],
                    '三和國中站':[121.4969242,25.07981519],
                    '徐匯中學站':[121.4902584,25.08378556],
                    '三民高中站':[121.4839753,25.0886304],
                    '蘆洲站':[121.4750543,25.09492266]
                    },
					markLine : {
						smooth:false,
						symbolSize:[0,0],
						effect : {
							show:true,
							scaleSize: 10,
							period: 30,
							color: '#fff',
							shadowBlur: 0
							},
							itemStyle : {
								normal: {
									borderWidth:1,
									label:{
										show:false
										},
										lineStyle: {
											type: 'solid',
											shadowBlur: 0
											}
											}
											},
							data : []
							},
					markPoint : {
						symbol:'emptyCircle',
						symbolSize : function (v){
							return 5 + v/10
						},
						effect : {
								show:true,
								shadowBlur : 0
								},
						itemStyle:{
							normal:{
                                color:'#F7B41B',
								label:{show:false}
								}
						},
						tooltip : {
							show: true,
							trigger: 'item'
						},
						data : [
                            {name:'南勢角站',value:3},
                            {name:'景安站',value:3},
                            {name:'永安市場站',value:3},
                            {name:'頂溪站',value:3},
                            {name:'古亭站',value:3},
                            {name:'東門站',value:3},
                            {name:'忠孝新生站',value:3},
                            {name:'松江南京站',value:3},
                            {name:'行天宮站',value:3},
                            {name:'中山國小站',value:3},
                            {name:'民權西路站',value:3},
                            {name:'大橋頭站',value:3},
                            {name:'台北橋站',value:3},
                            {name:'菜寮站',value:3},
                            {name:'三重站',value:3},
                            {name:'先嗇宮站',value:3},
                            {name:'頭前庄站',value:3},
                            {name:'新莊站',value:3},
                            {name:'輔大站',value:3},
                            {name:'丹鳳站',value:3},
                            {name:'迴龍站',value:3},
                            {name:'三重國小站',value:3},
                            {name:'三和國中站',value:3},
                            {name:'徐匯中學站',value:3},
                            {name:'三民高中站',value:3},
                            {name:'蘆洲站',value:3}
                        ]
						}
				},
                 {
					name:'5号板南線',
					type:'map',
					mapType: 'none',
					data:[],
					geoCoord: {
					'南港展覽館站':[121.6278083,25.05797946],
                    '南港站':[121.6169787,25.0548467],
                    '昆陽站':[121.6035255,25.05337309],
                    '後山埤站':[121.592743,25.04817229],
                    '永春站':[121.5865068,25.04409343],
                    '市政府站':[121.5754278,25.04456457],
                    '國父紀念館站':[121.5680079,25.04479054],
                    '忠孝敦化站':[121.5613178,25.04492537],
                    '忠孝復興站':[121.5540123,25.04502747],
                    '忠孝新生站':[121.5432218,25.04561358],
                    '善導寺站':[121.5335923,25.04792411],
                    '台北車站':[121.5279467,25.04927342],
                    '西門站':[121.5187802,25.04499769],
                    '龍山寺站':[121.5103527,25.03814968],
                    '江子翠站':[121.4829601,25.03320318],
                    '新埔站':[121.4789308,25.02701108],
                    '板橋站':[121.4728805,25.01702444],
                    '府中站':[121.4699918,25.01208131],
                    '亞東醫院站':[121.4630932,25.00163016],
                    '海山站':[121.4593652,24.98898931],
                    '土城站':[121.4549278,24.97679033],
                    '永寧站':[121.4466368,24.97047405],
                    '頂埔站':[121.4311042,24.96376598]
                    },
					markLine : {
						smooth:false,
						symbolSize:[0,0],
						effect : {
							show:true,
							scaleSize: 10,
							period: 30,
							color: '#fff',
							shadowBlur: 0
							},
							itemStyle : {
								normal: {
									borderWidth:1,
									label:{
										show:false
										},
										lineStyle: {
											type: 'solid',
											shadowBlur: 0
											}
											}
											},
							data : []
							},
					markPoint : {
						symbol:'emptyCircle',
						symbolSize : function (v){
							return 5 + v/10
						},
						effect : {
								show:true,
								shadowBlur : 0
								},
						itemStyle:{
							normal:{
                                color:'#0070BC',
								label:{show:false}
								}
						},
						tooltip : {
							show: true,
							trigger: 'item'
						},
						data : [
                            {name:'南港展覽館站',value:3},
                            {name:'南港站',value:3},
                            {name:'昆陽站',value:3},
                            {name:'後山埤站',value:3},
                            {name:'永春站',value:3},
                            {name:'市政府站',value:3},
                            {name:'國父紀念館站',value:3},
                            {name:'忠孝敦化站',value:3},
                            {name:'忠孝復興站',value:3},
                            {name:'忠孝新生站',value:3},
                            {name:'善導寺站',value:3},
                            {name:'台北車站',value:3},
                            {name:'西門站',value:3},
                            {name:'龍山寺站',value:3},
                            {name:'江子翠站',value:3},
                            {name:'新埔站',value:3},
                            {name:'板橋站',value:3},
                            {name:'府中站',value:3},
                            {name:'亞東醫院站',value:3},
                            {name:'海山站',value:3},
                            {name:'土城站',value:3},
                            {name:'永寧站',value:3},
                            {name:'頂埔站',value:3}
                        ]
						}
				}
			]
		};
		var myChart = BMapExt.initECharts(container);
		window.onresize = myChart.onresize;
		BMapExt.setOption(option);

        var times =0;
        var start_time =0;
        var timedelta = 60;

        //clearInterval(timeTicket);
        timeTicket = setInterval(function (){
            times++;
            $.post('data',
                {
                    times:times,
                    start_time:start_time,
                    timedelta:timedelta
                },
                function(data,status){
                    console.log(data);
                    console.log(status);
                    start_time = data['start_time'];
                    $('#time').html(start_time)
                    if (data['mark_line']){

                        myChart.addMarkLine(0,data['mark_line'])

                    }
                    else{
                        console.log('seems to be an error')
                    }
            }
        )
}, 1000);

	});

})();
