var sName = new Array();
var mName = new Array();
var yname = new Array();
var xname = new Array();
var zname = new Array();
$.ajaxSetup({  
    async : false  
});
$(function() {
/********************************************饼状图*************************************************************/
	var count = [ 0,0,0,0,0 ];
	$.ajax({
		type : "GET",
		url : "getBin.do",
		dataType : "json",
		success : function(datats) {
			$.each(datats, function(k, v) {
				 count[0]=v.paiSum;
				 count[1]=v.goldSum;
				 count[2]=v.timeMallSum;
				 count[3]=v.suiMallSum;
				// count[4]=v.timeLinkSum;
				 count[5]=v.suiLinkSum;
			});

			Highcharts.setOptions({
				lang: {
					numericSymbols : null,
					downloadJPEG: "下载JPEG图片",
					downloadPDF: "下载PDF图片",
					downloadPNG: "下载PNG图片",
					downloadSVG: "下载SVG图片",
					exportButtonTitle: "导出图片",
					printButtonTitle:"打印图表"
				}
			});
			Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors,function(color){
				return{
					radialGradient : {cx:0.5,cy:0.3,r:0.7},
					stops:[
					       [0,color],
					       [1,Highcharts.Color(color).brighten(-0.3).get('rgb')]
					      ]
				};
			});
			$('#container1').highcharts({
				/*colors: ["#7cb5ec", "#f7a35c", "#7798BF", "#90ee7e", "#aaeeee", "#ff0066", "#eeaaee",
				 		"#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],*/
				chart: {
	                plotBackgroundColor: null,
	                plotBorderWidth: null,
	                plotShadow: false
	            },
	            title: {
	            	text : '总导入流量统计'
	            },
	            subtitle: {
		            text: '广告和入口流量'
		        },
	            tooltip: {
	            	pointFormat : '{point.y}'
	            },
	            credits:{
					enabled:false
				},
				exporting:{
				    filename:'imports',
				    url:'downData.do'
				},
	            plotOptions: {
	                pie: {
                   	allowPointSelect : true,
						cursor : 'pointer',
						dataLabels : {
							enabled : true,
							color : '#919191',
							connectorColor : '#919191',
							format : '<b>{point.name}</b>: {point.y}'
						},
						showInLegend: true
	                }
	            },
	            series: [{
	                type: 'pie',
	                name: '',
	                data : [ [ '拍币广告', count[1] ], [ '金币广告', count[0] ]/*, {
						name : '到点摇入口',
						y : count[2],
						sliced : true,
						selected : true
					}, [ '随时摇入口', count[3] ], [ '到点摇店铺逛逛入口', count[4] ],
							[ '随时摇店铺逛逛入口', count[5] ] */]
	            }]
	        });
		}
	});
/**************************************************线型图*********************************************************/
	var count1=new Array();
	var count3=new Array();
	var count2=new Array();
	$.ajax({
		type : "GET",
		url : "getLookOnMallIn.do",
		dataType : "json",
		success : function(datats) {
			$.each(datats, function(k, v) {
				 count1[k]=v.lookNum;
				 count2[k]=v.mallIn;
				 count3[k]=v.createDate;
			});
			Highcharts.setOptions({
				colors:['#1E90FF','#EE9A00'],
				lang: {
					numericSymbols : null,
					downloadJPEG: "下载JPEG图片",
					downloadPDF: "下载PDF图片",
					downloadPNG: "下载PNG图片",
					downloadSVG: "下载SVG图片",
					exportButtonTitle: "导出图片",
					printButtonTitle:"打印图表"
				}
			});
			 var chart = new Highcharts.Chart({
				chart : {
					renderTo : 'container3',
					defaultSeriesType : 'line'
				},
				title : {
					text : '最近七天随时摇奖品总浏览量、摇奖总参与量'
				},
				subtitle: {
		            text: '(仅浏览量和参与量统计)'
		        },
				credits:{
					enabled:false
				},
				xAxis : {
					categories : count3
				},
				yAxis : {
					title : {
						text : '总浏览量、摇奖总参与量(次)'
					},
					min : 0/*,
					 tickPositions:[0,50,100,150,200,250,300]*/
				},
				exporting:{
				    filename:'totalConsume',
				    url:'downData.do'
				},
				tooltip : {
					formatter : function() {
						return '<b>' + this.series.name
								+ '</b><br/>' + this.x + ' ('
								+ this.y + '次) ';
					}
				},
				series : [{
					name : '总浏览量',
					data : count1
				},
				{
					name : '总参与量',
					data : count2
				} ]
			});
		}
	});
	getBar();
	getColumn();
});
/********************************************************柱状图*******************************************************/	
function getColumn(){	
	caps.rquestJson('loadTotalAnswer.do',{},function(data){
		$.each(data,function(i,item){
			var date = new Date(item.createTime);
			var dateStr = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();
			xname.push(dateStr);
			yname.push(item.lookNum);
			zname.push(item.answerNum);
		});
	});
	Highcharts.setOptions({
		colors:['#1E90FF','#EE9A00'],
		lang: {
			numericSymbols : null,
			downloadJPEG: "下载JPEG图片",
			downloadPDF: "下载PDF图片",
			downloadPNG: "下载PNG图片",
			downloadSVG: "下载SVG图片",
			exportButtonTitle: "导出图片",
			printButtonTitle:"打印图表"
		}
	});
	var chart = new Highcharts.Chart({
		chart: {
			renderTo: 'container2',
			type: 'column'
		},
		title: {
			text: '最近七天广告总点击量、总答题量'
		},
		subtitle: {
			text: '(仅拍币广告和金币广告总量统计)'
		},
		credits:{
			enabled:false
		},
		xAxis: {
			categories: xname
		},
		yAxis: {
			min: 0,
			title: {
				text: '点击量、答题量(次)'
			}/*,
			tickPositions:[0,50,100,150,200,250,300]*/
		},
		exporting:{
		    filename:'answer',
		    url:'downData.do'
		},
		tooltip: {
			formatter: function() {
				return ''+
				this.x +' ( '+ this.y +' 次)';
			}
		},
		plotOptions: {
			column: {
				pointPadding: 0.2,
				borderWidth: 0
			}
		},
		series: [{
			name: '总点击量',
			data: yname
			
		}, {
			name: '总答题量',
			data: zname
			
		}]
	});
}
/****************************************************************条形图******************************************************/
function getBar(){	
	caps.rquestJson('loadFundConsumption.do',{},function(data){
		$.each(data,function(i,item){
			var date = new Date(item.createTime);
			var dateStr = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();
			sName.push(dateStr);
			mName.push(Math.round(item.totalFee/100));
		});
	});
	Highcharts.setOptions({
		colors:['#66CD00'],
		lang: {
			numericSymbols : null,
			downloadJPEG: "下载JPEG图片",
			downloadPDF: "下载PDF图片",
			downloadPNG: "下载PNG图片",
			downloadSVG: "下载SVG图片",
			exportButtonTitle: "导出图片",
			printButtonTitle:"打印图表"
		}
	});
	new Highcharts.Chart({
		chart: {
			renderTo: 'container4',
			defaultSeriesType: 'bar'
		},
		title: {
			text: '最近七天资金消耗'
		},
		subtitle: {
			text: '资金统计'
		},
		credits:{
			enabled:false
		},
		xAxis: {
			categories: sName,
			title: {
				text: null
			}
		},
		yAxis: {
			min: 0,
			title: {
				text: '每天资金消耗钱数(元)，对于金额显示小数点的数字采用四舍五入取整'
			}
		},
		exporting:{
		    filename:'consume',
		    url:'downData.do'
		},
		tooltip: {
			formatter: function() {
				return ''+
				this.series.name +': '+ this.y +' 元';
			}
		},
		plotOptions: {
			bar: {
				dataLabels: {
					enabled: true
				}
			}
		},
		credits: {
			enabled: false
		},
		series: [{
			name: '资金消耗',
			data: mName
		}]
	});
}
