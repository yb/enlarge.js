/*
    enlarge.js v1.1
    by AbelYao, USKY.ORG
*/

(function($)
{
    var defaults = 
    {
        shadecolor: "#FFD24D",
        shadeborder: "#FF8000",
        shadeopacity: 0.5,
        cursor: "move",
        
        layerwidth: 400,
        layerheight: 300,
        layerborder: "#DDD",
        fade: true,
        
        largewidth: 1280,
        largeheight: 960
    }
    
    var enlarge = function(option)
    {
        option = $.extend({}, defaults, option);

        $(this).each(function() 
        {
            var self = $(this).css("position", "relative");
            var img = self.children().first();
            
            var ratio =
            {
                x: img.width() / option.largewidth,
                y: img.height() / option.largeheight
            }
            
            var size = 
            {
                shade:
                {
                    width: option.layerwidth * ratio.x - 2,
                    height: option.layerheight * ratio.y - 2
                }
            }
            
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
            
            var half = 
            {
                x: size.shade.width / 2,
                y: size.shade.height / 2
            }
            
            var area = 
            {
                width: self.innerWidth() - shade.outerWidth(),
                height: self.innerHeight() - shade.outerHeight()
            }
            
            var offset = self.offset();
            
            var show = function()
            {
                offset = self.offset();
                shade.show();
                if(option.fade) layer.stop().fadeIn(300);
                else layer.show();
            }
            
            var hide = function()
            {
                shade.hide();
                layer.hide();
            }
            
            self.mousemove(function(e)
            {
                var x = e.pageX - offset.left;
                var y = e.pageY - offset.top;
                
                if(x < 0 || x > self.innerWidth()) return hide();
                if(y < 0 || y > self.innerHeight()) return hide();
                
                x = x - half.x;
                y = y - half.y;
                
                if(x < 0) x = 0;
                if(y < 0) y = 0;
                if(x > area.width) x = area.width;
                if(y > area.height) y = area.height;
                
                shade.css(
                {
                    left: x,
                    top: y
                });
                
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
    
    $.fn.extend(
    {
        enlarge: enlarge
    });
})(jQuery)
