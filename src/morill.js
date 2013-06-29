//                          _ ____
//    ____ ___  ____  _____(_) / /
//   / __ `__ \/ __ \/ ___/ / / / 
//  / / / / / / /_/ / /  / / / /  
// /_/ /_/ /_/\____/_/  /_/_/_/   
//                                

/**
*
* Morill - another wrapper of morris
* @uses Jquery
* @uses raphael
* @uses Morris
* @author: [yu.gy@alipay.com]
* @version: [0.1.6]
* @role: core
*
**/

/**

	TODO:
	- 账单系统：现有的绘图逻辑是固定扰动值，绘图不根据Y轴的绝对位置来计算。这是个难点

**/


define(function(require,exports,module){

    var jQuery = require('$');
    var Morris = require('./morris.js');

    require('./morill.css');
    
	(function($){
		
		var updateChart = function(method,url,data,cb) {

				$.ajax({
					url: url,
					type: method,
					data: data,
					cache: false
				}).done(function(data){
					cb(data);
				}).fail(function(data){
					cb('error')
				});

		}

		var bindHoverHidden = function(id) {
			var id = '#' + id; 
			$(id).find('.morris-hover').hide();
			$(id).hover(function(){
				$(id).find('.morris-hover').fadeIn(100);
			});
			$(id).mouseleave(function(){
				$(id).find('.morris-hover').fadeOut(100);
			})
		}

		$.fn.Morill = function(options) {

			// 默认配置
		    var defaults = {    
			    type: 'bar',
			    padding: 10,
			    colors: ['#1ABC9C','#2ECC71','#3498DB','#9B59B6','#34495E','#E67E22']
			}

			var chartMap = {
				bar: 'Bar',
				line: 'Line',
				area: 'Area',
				donut: 'Donut'
			}

			var tipCallbacksMap = {
				donut: 'formatter',
				line: 'hoverCallback',
				area: 'hoverCallback',
				bar: 'hoverCallback'
			}

			options['id'] = this.attr('id');

			var opts = $.extend(defaults, options);

			var init = function(options) {

				var callTip = function(type) {
					var tipCallback = function (index, chart) {
					    return options.tip(index, chart);
				  	}
				  	var tipCallbackGrid = function (index, chart) {
					    return options.tip(index, chart.data);
				  	}
				  	if (type != 'donut') {
				  		return tipCallbackGrid;
				  	} else {
				  		return tipCallback;
				  	}
			  	}

				var params = {
					element: options.id,
					data: options.data,
					padding: options.padding
				}

				var handlers = {
					grid: {
						// 轴设置
						xkey: options.x,
						ykeys: options.order,
						labels: options.labels,
						// 是否显示xy轴
						axesX: options.axesX,
						axesY: options.axesY,
						// 网格样式设置
						grid: options.backGrid,
						gridLineColor: options.gridLineColor,
						gridStrokeWidth: options.gridStrokeWidth,
						gridTextColor: options.gridTextColor,
						gridTextSize: options.gridTextSize,
						hideHover: options.hideHover,
						// Y轴单位设置
						postUnits: options.yUnit,
						preUnits: options.yPreUnit,
						ymax: options.yMax,
        				ymin: options.yMin,
        				dateFormat: options.dateFormat,
						// 目标和事件设置
						goals: options.goals,
						goalStrokeWidth: options.goalStrokeWidth,
						goalLineColors: options.goalLineColors,
						events: options.events,
						eventStrokeWidth: options.eventStrokeWidth,
						eventLineColors: options.eventLineColors,
						// X,Y轴单元距离设置
						xLabelMargin: options.xStep,
						numLines: options.yLines,
						// 是否parse x轴的时间
						parseTime: options.parseTime
					},
					donut: {
						backgroundColor: options.backgroundColor,
						labelColor: options.labelColors,
						colors: options.colors
					},
					bar: {
						stacked: options.stacked,
						barColors: options.colors,
						barSizeRatio: options.barSizeRatio,
						barGap: options.barGap,
						barTag: options.barTag,
						barTagHeight: options.barTagHeight
					},
					line: {
						smooth: options.smooth,
						lineColors: options.colors,
						lineWidth: options.lineWidth,
						pointSize: options.pointSize,
						pointWidths: options.pointWidths, // array
						pointStrokeColors: options.pointStrokeColors,
						pointFillColors: options.pointFillColors
					},
					area: {
						lineColors: options.colors,
						lineWidth: options.lineWidth,
						pointSize: options.pointSize,
						pointWidths: options.pointWidths, // array
						pointStrokeColors: options.pointStrokeColors,
						pointFillColors: options.pointFillColors
					}
				}

				// 过滤各种条件
				if (options.type == 'bar' || options.type == 'line' || options.type == 'area') {
					$.each(handlers['grid'],function(pkey,pvalue){
						params[pkey] = pvalue;
					});
				}
				// 导入配置
				$.each(handlers[options.type],function(pkey,pvalue){
					params[pkey] = pvalue;
				});
				// 判断有无自定义回调tip
				if ( typeof(options.tip) == 'function' && typeof(options.tip) != 'undefined') {
					params[tipCallbacksMap[options.type]] = callTip(options.type);
				}
				
				// 初始化图表
				var chart = Morris[chartMap[options.type]](params);

				// 判断是需要实时更新
				if (options.ajax === true) {

					var url = options.ajaxInfo.url;
					var method = options.ajaxInfo.method;
					var data = options.ajaxInfo.data;
					var errorEvent = options.ajaxInfo.errorEvent;
					var success = options.ajaxInfo.successEvent;

					var activeUpdate = function() {
						updateChart(method,url,data,function(data){
							// 网络故障导致的error
							if (data === 'error') {
								errorEvent(data);
							} else {
								// 连接成功后，筛选一遍数据，或者触发自定义的事件
								success(chart,data);
								if (typeof(window[options.id]) != 'undefined') {
									clearTimeout(window[options.id])
								}
 								window[options.id] = setTimeout(activeUpdate, options.ajaxInfo.delay*1000);
							}
						})
					}

					setTimeout(activeUpdate, options.ajaxInfo.delay*1000);
				}

				// 没有浮入的时候隐藏
				bindHoverHidden(options.id);

				return chart;

			}

			return init(opts);
		}
		module.exports = $;
	})(jQuery,Morris);

});
