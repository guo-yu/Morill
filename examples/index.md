# Morill 图表解决方案

---

![](https://i.alipayobjects.com/e/201303/2QdAPDtYSq.png)  

Morill是一个基于raphael的图表包装集，提供了柱状图，donut图，pie图，折线图等图表组件，也提供了实时更新，回调函数等功能，方便拓展与设计自定义图表。在spm上搜索和安装：`spm search alipay.morill`

Morill现在包装了基于raphael的Morris，未来会包装基于raphael开发的账单系统图表和其他可视化解决方案

### BugList
- Morill图表在父元素display:none的时候会绘制错误。对于第一次展示给用户需要隐藏的图表，可以考虑不在dom ready的时候初始化图表，而在绑定其他事件的时候触发图表的生成。

<!-- ### 折线图
<div id="yc" style="width: 800px;height:500px;"></div>

### 柱状图
<div id="yc2" style="width: 900px;height:500px;"></div>

## 高度自定义的柱状图表范例：

<div id="SingleBarChart" style="width: 500px;height:300px;"></div>

````javascript
seajs.use('morill', function($){

	var y1 = [0.5,4.9,52.4,6.2,2.0,6.1,4.6,3.3,10.5,5.6,1.5,0.7,1.8];
	var y2 = [1.4,4.9,51.1,5.9,1.8,6.2,5.8,3.5,9.4,5.1,2.1,0.6,2.4];
	var y3 = [1.4,6.1,42.6,7.5,3.3,5.2,4.6,4.4,8.5,4.4,3.2,0.5,1.8,6.6];
	var tagName = ['农林牧渔','采掘','制造','电煤水','建筑','交通仓储','信息技术','批发零售','金融保险','房地产','社会服务','文化传播','综合','其他'];

	var y1c = [];
	var y2c = [];
	var y3c = [];

	for (var i = 0; i < y1.length; i++) {
		var y = {
			name: tagName[i],
			data:y1[i]
		}
		y1c.push(y)
	}

	for (var i = 0; i < y2.length; i++) {
		var y = {
			name: tagName[i],
			data:y2[i]
		}
		y2c.push(y)
	};

	for (var i = 0; i < y3.length; i++) {
		var y = {
			name: tagName[i],
			y1:y1[i],
			y2:y2[i],
			y3:y3[i]
		}
		y3c.push(y)
	};

	$(document).ready(function() {

	  	var singlebardata = [
		    {x: '2011 第一季度',b: 1, a: 1},
		    {x: '2011 第二季度',b: 2, a: 2},
		    {x: '2011 第三季度',b: 4, a: 100},
		    {x: '2011 第三季度',b: 1, a: 1},
		    {x: '2011 第三季度',b: 2, a: 2},
		    {x: '2011 第三季度',b: 3, a: 3.5},
		    {x: '2011 第三季度',b: 3, a: 3.2},
		    {x: '2011 第三季度',b: 1, a: 10},
		    {x: '2011 第三季度',b: 2, a: 2},
		    {x: '2011 第三季度',b: 2, a: 2},
		    {x: '2011 第三季度',b: 1, a: 1},
		    {x: '2011 第三季度',b: 2, a: 2},
		    {x: '2011 第三季度',b: 3, a: 3},
		    {x: '2011 第三季度',b: 2, a: 2},
		    {x: '2011 第四季度',b: 3, a: 3}
		];

		$('#yc').Morill({
			type: 'line',// 图表类型
			data: y3c,
			parseTime: false,
			x: 'name',
			xStep: 0.1, // [xStep]: 表示X轴标记的步长，数值越大，x轴标记的距离就越宽
			yLines: 10, // [yLines]: 表示Y轴的行密度。数值越大，密度越大。
			order: ['y1','y2','y3'], // [order]: 表示Y轴数据的次序。
			labels: ['2010','2011','2012'], // [labels]: 表示Y轴数据在鼠标浮入时展示的标签,
			yUnit: '%', // Y轴显示的单位,
		});

		$('#yc2').Morill({
			type: 'bar',// 图表类型
			data: y3c,
			parseTime: false,
			x: 'name',
			xStep: 0.1, // [xStep]: 表示X轴标记的步长，数值越大，x轴标记的距离就越宽
			yLines: 10, // [yLines]: 表示Y轴的行密度。数值越大，密度越大。
			order: ['y1','y2','y3'], // [order]: 表示Y轴数据的次序。
			labels: ['2010','2011','2012'], // [labels]: 表示Y轴数据在鼠标浮入时展示的标签,
			yUnit: '%', // Y轴显示的单位,
		});

		// 初始化图表
		$('#SingleBarChart').Morill({
			type: 'bar',// 图表类型
			data: singlebardata, // 导入数据
			x:'x', // [x] : 表示在X轴显示的对象
			xStep: 10, // [xStep]: 表示X轴标记的步长，数值越大，x轴标记的距离就越宽
			yLines: 15, // [yLines]: 表示Y轴的行密度。数值越大，密度越大。
			order: ['a','b'], // [order]: 表示Y轴数据的次序。
			labels: ['序列a','序列b'], // [labels]: 表示Y轴数据在鼠标浮入时展示的标签
		// ----- 以下配置对于除了donut圆环图以外的所有类型图表适用 ------ //
			axesY: false,
			backGrid: true, // 是否显示背景网格
			gridLineColor: '#efefef', // 网格线颜色
			gridStrokeWidth: 1, // 网格线粗细
			gridTextColor: 'red', // 图表中的字体颜色
			gridTextSize: 12, // 字体大小
			padding: 10, // 图表相对于父层的padding
			yUnit: '$', // Y轴显示的单位
			yPreUnit: '前', // Y轴显示的前置单位
			goals: [5], // Y轴目标
			goalStrokeWidth: 10, // Y轴目标线宽度
			goalLineColor: '#efefef', // Y轴目标线
			events: [100], // X轴事件
			eventStrokeWidth: 2, // X轴事件线的宽度
			eventLineColors: '#ddd', // X轴事件线的颜色
			colors: ['#E67E22','#F1C40F']
		});
	});
});
```` -->

## 实时更新柱状图表范例：
<div id="AjaxSingleBarChart" style="width: 500px;height:300px;"></div>

````javascript
seajs.use('morill', function($){

	$(document).ready(function() {

	  	var singlebardata = [
		    {x: '2011 第一季度', a: 1},
		    {x: '2011 第二季度', a: 2},
		    {x: '2011 第三季度', a: 4},
		    {x: '2011 第三季度', a: 1},
		    {x: '2011 第三季度', a: 2},
		    {x: '2011 第三季度', a: 3.5},
		    {x: '2011 第三季度', a: 3.2},
		    {x: '2011 第三季度', a: 10},
		    {x: '2011 第三季度', a: 2},
		    {x: '2011 第三季度', a: 2},
		    {x: '2011 第三季度', a: 1},
		    {x: '2011 第三季度', a: 2},
		    {x: '2011 第三季度', a: 3},
		    {x: '2011 第三季度', a: 2},
		    {x: '2011 第四季度', a: 3}
		];

		// 初始化图表
		var barchart = $('#AjaxSingleBarChart').Morill({
			type: 'bar',
			data: singlebardata,
			x:'x',
			order: ['a'],
			labels: ['序列a'],
			ajax: true,
			ajaxInfo: {
				method: 'GET',
				url: 'http://mdataprod.p812.alipay.net/un_login.json',
				data: 'demoData',
				delay: 3,
				errorEvent: function(err){
					console.log('实时更新网络异常，请稍后再试。（别理我，我只是向你展示自定义Morill支持配置错误回调）')
				},
				successEvent: function(chart,data){
					console.log('请求成功了')
					chart.setData(data);
				}
			}
		});

		console.log(barchart);

	});
});
````

## 层叠柱状图表范例：
<div id="BarChartStacked" style="width: 500px;height:300px;"></div>

````javascript
seajs.use('morill', function($){

	$(document).ready(function() {

	  	var bardata = [
		    {x: '2011 第一季度', y: 3, z: 2},
		    {x: '2011 第二季度', y: 2, z: 8},
		    {x: '2011 第三季度', y: 3, z: 2},
		    {x: '2011 第三季度', y: 3, z: 2},
		    {x: '2011 第三季度', y: 3, z: 2},
		    {x: '2011 第三季度', y: 3, z: 2},
		    {x: '2011 第三季度', y: 3, z: 2},
		    {x: '2011 第三季度', y: 3, z: 2},
		    {x: '2011 第三季度', y: 3, z: 2},
		    {x: '2011 第一季度', y: 3, z: 2},
		    {x: '2011 第一季度', y: 3, z: 2},
		    {x: '2011 第三季度', y: 3, z: 2},
		    {x: '2011 第一季度', y: 3, z: 2},
		    {x: '2011 第四季度', y: 2, z: 4}
		];

		// 初始化图表
		$('#BarChartStacked').Morill({
			type: 'bar',
			data: bardata,
			x:'x',
			order: ['y', 'z'],
			labels: ['序列Y', '序列Z', '序列A'],
			stacked: false,
			barSizeRatio: 0.2,
			barGap: -6.8,
			colors: ['red','blue'],
			barTag: 1,
			barTagHeight: 6
		});

	});
});
````

## 折线图表范例：
<div id="LineChart" style="width: 500px;height:300px;"></div>

````javascript
seajs.use('morill', function($){

	$(document).ready(function() {

	  	// period 可以是YYYY-MM-DD
		var linedata = [
		  {"period": "2012 W27", "licensed": 3407, "sorned": 660},
		  {"period": "2012 W26", "licensed": 3351, "sorned": 629},
		  {"period": "2012 W25", "licensed": 3269, "sorned": 618},
		  {"period": "2012 W24", "licensed": 3246, "sorned": 661},
		  {"period": "2012 W23", "licensed": 3257, "sorned": 667},
		  {"period": "2012 W22", "licensed": 3248, "sorned": 627},
		  {"period": "2012 W21", "licensed": 3171, "sorned": 660},
		  {"period": "2012 W20", "licensed": 3171, "sorned": 676},
		  {"period": "2012 W19", "licensed": 3201, "sorned": 656},
		  {"period": "2012 W18", "licensed": 3215, "sorned": 622},
		  {"period": "2012 W17", "licensed": 3148, "sorned": 632},
		  {"period": "2012 W16", "licensed": 3155, "sorned": 681},
		  {"period": "2012 W15", "licensed": 3190, "sorned": 667},
		  {"period": "2012 W14", "licensed": 3226, "sorned": 620},
		  {"period": "2012 W13", "licensed": 3245, "sorned": null},
		  {"period": "2012 W12", "licensed": 3289, "sorned": null},
		  {"period": "2012 W11", "licensed": 3263, "sorned": null},
		  {"period": "2012 W10", "licensed": 3189, "sorned": null},
		  {"period": "2012 W09", "licensed": 3079, "sorned": null},
		  {"period": "2012 W08", "licensed": 3085, "sorned": null},
		  {"period": "2012 W07", "licensed": 3055, "sorned": null},
		  {"period": "2012 W06", "licensed": 3063, "sorned": null},
		  {"period": "2012 W05", "licensed": 2943, "sorned": null},
		  {"period": "2012 W04", "licensed": 2806, "sorned": null},
		  {"period": "2012 W03", "licensed": 2674, "sorned": null},
		  {"period": "2012 W02", "licensed": 1702, "sorned": null},
		  {"period": "2012 W01", "licensed": 1732, "sorned": null}
		];

		// 初始化图表
		var line = $('#LineChart').Morill({
			type: 'line',
			data: linedata.reverse(),
			x:'period',
			order: ['licensed', 'sorned'],
	  		labels: ['Licensed', 'SORN'],
	  		events: [
			    '2012-05',
			    '2012-03'
			],
			goals: [2000],
			smooth: false,
			backGrid: true,
			axesX: false,
	  		tip: function(index,data) {
	  			return '<div class="custom-pop">这是一个callback，你点的是第' + index + '个，元数据是：' + data[index].licensed + ' 和 ' + data[index].sorned + '</div>';
	  		}
		});

		console.log(line);
	});
});
````

## donut图表范例：
<div id="PieChart" style="width: 300px;height:300px;"></div>

````javascript
seajs.use('morill', function($){

	$(document).ready(function() {

	  	var donutdata = [
		    {value: 70, label: '第一名'},
		    {value: 15, label: '第二名'},
		    {value: 10, label: '第三名'},
		    {value: 5, label: '第291921828128821块'}
		];

		// 初始化图表
		window.donut = $('#PieChart').Morill({
			type: 'donut',
			data: donutdata,
			tip: function(x,data) {
				return '回调自定义字段(元数据：' + x + '%)';
			}
		});

		console.log(donut);
		
	});
});
````

## 面积图表范例：
<div id="AreaChart" style="width: 500px;height:300px;"></div>

````javascript
seajs.use('morill', function($){

	$(document).ready(function() {

	  	var areadata = [
		    {x: '2011 Q1', y: 2, z: 3},
		    {x: '2011 Q2', y: 6, z: 3},
		    {x: '2011 Q3', y: 17, z: 10},
		    {x: '2011 Q4', y: 4, z: 4}
	  	];

		// 初始化图表
		$('#AreaChart').Morill({
			type: 'area',
			data: areadata,
			x:'x',
			order: ['y', 'z'],
			labels: ['序列Y', '序列Z'],
			// hideHover: 'always',
		});
	});
});
````
