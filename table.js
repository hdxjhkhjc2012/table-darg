;(function(global,undefined) {
    "use strict"
    var _global;
    var _time = Date.now();
    var $_$ = {
        gettime : function(f){
            switch (f){
                case 0:
                    _time = Date.now();
                    break;
                case 1:
                    _time = _time - (1000 * 60 * 60 * 24 * 7);
                    break;
                case 2:
                    _time = _time + (1000 * 60 * 60 * 24 * 7);
                    break;
            }
            return _time;
        },
        getToday: function(now){
            var dateOfToday = now;
            var dayOfToday = (new Date(now).getDay() + 7 - 1) % 7;
            var daysOfThisWeek = [].slice.call(new Array(7)) .map(function(_, i) {
                var date = new Date(dateOfToday + (i - dayOfToday) * 1000 * 60 * 60 * 24);
                return date.getFullYear() +
                '-' +
                String(date.getMonth() + 1).padStart(2, '0') +
                '-' +
                String(date.getDate()).padStart(2, '0')
            })
            return daysOfThisWeek;
        },
        init:function(_now){
            //初始化
            $_$.clean();
            var arr = $_$.getToday(_now);
            var list = $(".table-content-top-list"),len = list.length;
            for(var i=0; i<len; i++){
                $(list[i]).find(".table-content-top-list-date").text(arr[i]);
                if(this.retYmd(arr[i])==this.retYmd(new Date())){
                    $(".table-content-bottom-content").eq(i+1).addClass("bgcolor");
                }
            }
            labelshow(born());
        },
        clean:function(){
            $(".table-Label").remove();
            var list = $(".table-content-top-list"),len = list.length;
            for(var i=0; i<len; i++){
               $(".table-content-bottom-content").eq(i+1).removeClass("bgcolor");
            }
        },
        retYmd:function(_ymd){
            var nowDate = new Date(_ymd);
            var year = nowDate.getFullYear();
            var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1)
                : nowDate.getMonth() + 1;
            var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate
                .getDate();
            var dateStr = year + "-" + month + "-" + day;
            return dateStr;
        }
    }
    // 最后将插件对象暴露给全局对象
    _global = (function(){ return this || (0, eval)('this'); }());
    !('$_$' in _global) && (_global.$_$ = $_$);
}());

$(function(){
    $(".btn-jump").on('click',function(){
        var order = $(this).index();
        var _now = $_$.gettime(order);
        $_$.init(_now);
    })
});
var _now = $_$.gettime(0);
$_$.init(_now);