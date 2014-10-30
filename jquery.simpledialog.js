/* 
 * Jquery simple-dialog v0.3
 * Author Irice
 * Create 2014/08/05
 * Modify 2014/08/11
 */
(function($){
    $(function(){
        var method = {
            hide: function (obj){
                $(obj).trigger('beforeHide').removeClass('active').trigger('afterHide');
            },
            show: function (obj){
				$(obj).trigger('beforeShow');
				var container = $(obj).find('.simple-container');
				var wheight = $(window).height(); //cache window height.
                if (wheight <= container.height()) { container.css('top', $(window).scrollTop()); }
				else { container.css('top', Math.floor((wheight - container.height()) / 2)); }
                $(obj).addClass('active').trigger('afterShow');
            },
            toggle: function (obj){
				if ($(obj).hasClass('active')) { this.hide(obj); } else { this.show(obj); }
            }
        };
        
        $('.simple-dialog').each(function(){
            var that = this;
            $(that).bind('beforeShow').bind('afterShow').bind('beforeHide').bind('afterHide').data('method', method).on('click', '[data-close=true]', function(){ method.hide(that); }); //closure data method and binding events.
            if ($(that).data('mask')){
                var _mask = $('<div/>').addClass('simple-mask');
				if ($(that).data('unfocus') === true) { //unfocus close the dialog.
					_mask.click(function(){ method.hide(that); });
				}
                $(that).append(_mask);
            };
        });
    });
    
    $.fn.simpleDialog = function(_method){
        var that = this;
        var _handler = function(){
            if (that.data('method')[_method]) that.data('method')[_method](that);
        };
        return that.each(_handler);
    };
})(jQuery);
