/*
	Enlarge for jQuery v1.0
	Abel Yao, 2013
	http://www.abelcode.com/
*/

(function($)
{
	// 默认参数
	var defaults = 
	{
		// 鼠标遮罩层样式
		shadecolor: "#FFD24D",
		shadeborder: "#FF8000",
		shadeopacity: 0.5,
		cursor: "move",
		
		// 大图外层样式
		layerwidth: 400,
		layerheight: 300,
		layerborder: "#DDD",
		fade: true,
		
		// 大图尺寸
		largewidth: 1280,
		largeheight: 960
	}
	
	// 插件入口
	var enlarge = function(option)
	{
		// 合并参数
		option = $.extend({}, defaults, option);
		
		// 循环处理
		$(this).each(function() 
		{
			var self = $(this).css("position", "relative");
			var img = self.children().first();
			
			// 计算大小图之间的比例
			var ratio =
			{
				x: img.width() / option.largewidth,
				y: img.height() / option.largeheight
			}
			
			console.log(ratio);
			
			// 定义一些尺寸
			var size = 
			{
				// 计算鼠标遮罩层的大小
				shade:
				{
					width: option.layerwidth * ratio.x - 2,
					height: option.layerheight * ratio.y - 2
				}
			}
			
			// 创建鼠标遮罩层
			var shade = $("<div>").css(
			{
				"position": "absolute",
				"left": "0px",
				"top": "0px",
				"background-color": option.shadecolor,
				"border": "1px solid " + option.shadeborder,
				"width": size.shade.width,
				"height": size.shade.height,
				"opacity": option.shadeopacity,
				"cursor": option.cursor
			});
			shade.hide().appendTo(self);
			
			// 创建大图和放大图层
			var large = $("<img>").css(
			{
				"position": "absolute",
				"display": "block",
				"width": option.largewidth,
				"height": option.largeheight
			});
			var layer = $("<div>").css(
			{
				"position": "absolute",
				"left": self.width() + 5,
				"top": 0,
				"background-color": "#111",
				"overflow": "hidden",
				"width": option.layerwidth,
				"height": option.layerheight,
				"border": "1px solid " + option.layerborder
			});
			large.attr("src", self.attr("href"));
			large.appendTo(layer);
			layer.hide().appendTo(self);
			
			// 不可移动的半径范围
			var half = 
			{
				x: size.shade.width / 2,
				y: size.shade.height / 2
			}
			
			// 有效范围
			var area = 
			{
				width: self.innerWidth() - shade.outerWidth(),
				height: self.innerHeight() - shade.outerHeight()
			}
			
			// 显示效果
			var show = function()
			{
				shade.show();
				if(option.fade) layer.stop().fadeIn(300);
				else layer.show();
			}
			
			// 隐藏效果
			var hide = function()
			{
				shade.hide();
				layer.hide();
			}
			
			// 绑定鼠标事件
			var offset = self.offset();
			self.mousemove(function(e)
			{
				// 鼠标位置
				var x = e.pageX - offset.left;
				var y = e.pageY - offset.top;
				
				// 不在图像中则直接隐藏
				if(x < 0 || x > self.innerWidth()) return hide();
				if(y < 0 || y > self.innerHeight()) return hide();
				
				// 判断是否在有效范围内
				x = x - half.x;
				y = y - half.y;
				
				if(x < 0) x = 0;
				if(y < 0) y = 0;
				if(x > area.width) x = area.width;
				if(y > area.height) y = area.height;
				
				// 遮罩层跟随鼠标
				shade.css(
				{
					left: x,
					top: y
				});
				
				// 大图移动到相应位置
				large.css(
				{
					left: (0 - x / ratio.x),
					top: (0 - y / ratio.y)
				});
			})
			.mouseenter(show)
			.mouseleave(hide);
        });
	}
	
	// 扩展插件
	$.fn.extend(
	{
		enlarge: enlarge
	});
})(jQuery)