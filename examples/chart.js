	var y1 = [0.5,4.9,52.4,6.2,2.0,6.1,4.6,3.3,10.5,5.6,1.5,0.7,1.8];
	var y2 = [1.4,4.9,51.1,5.9,1.8,6.2,5.8,3.5,9.4,5.1,2.1,0.6,2.4];
	var y3 = [1.4,6.1,42.6,7.5,3.3,5.2,4.6,4.4,8.5,4.4,3.2,0.5,1.8,6.6];
	var tagName = ['农林牧渔','采掘','制造','电煤水','建筑','交通仓储','信息技术','批发零售','金融保险','房地产','社会服务','文化传播','综合','其他'];

	var y1c = [];
	var y2c = [];
	var y3c = [];

	for (var i = 0; i < y1.length; i++) {
		var y = {
			name: tagName[i]
			data:y1[i]
		}
		y1c.push(y)
	}

	for (var i = 0; i < y2.length; i++) {
		var y = {
			name: tagName[i]
			data:y2[i]
		}
		y2c.push(y)
	};

	for (var i = 0; i < y3.length; i++) {
		var y = {
			name: tagName[i]
			data:y3[i]
		}
		y3c.push(y)
	};