;(function (global, undefined) {
    //严格模式用于查错
    "use strict"
    //定义全局变量
    var _global;
    //拖拽插件
    var Tdrag = {
        //所用到的元素
        element: {
            //页面元素组件
            component: {
                //父级div就是在此div上拖动
                fatherDiv: $(".table-content-bottom-content-father")[0]
            },
            //事件参数
            event: {
                firstE: "",
                processE:""
            },
            //可拖动元素的class类名，如果多个就用逗号隔开或者在外部手动往数组里添加；
            classTarget: ["table-Label"],
            //浏览器模式
            browser: ""
        },
        //初始化
        init: function () {

            this.bind();
        },
        //绑定事件
        bind: function () {
            //事件委托(关于目标块在父元素中拖动)
            this.entrust();
            //参数aim为被绑定对象
            /* aim.ondragstart= this.eventList.dragstart;*/
        },
        //事件委托
        entrust: function () {
            // 绑定父级元素
            var father = Tdrag.element.component.fatherDiv;
            // 绑定事件，此处为绑定拖拽事件
            //拖动开始事件
            father.addEventListener("dragstart",this.eventList.fatherEvent);
            //拖动过程事件
            father.addEventListener("drag",this.eventList.fatherEvent);
            //拖动结束事件
            father.addEventListener("dragend",this.eventList.fatherEvent);
        },
        //事件相关
        eventList: {
            //拖拽共通事件
            fatherEvent: function (e) {
                //获取拖拽事件的目标对象和拖拽事件处于的阶段 分为3各阶段 dragstart开始,drag过程,dragend结束
                var obj = Tdrag.eventList.targetJudge(e);
                //如果是目标文件
                if (obj) {
                    //根据事件type不同进行操作
                    switch (obj.type) {
                        //拖拽开始
                        case 'dragstart':
                            //处理兼容问题,这个地方太操蛋了,炎煌小伙伴一定注意
                            Tdrag.browserDiff(e);
                            Tdrag.eventList.dStart(obj.tar, e);
                            break;
                        //拖拽中
                        case 'drag':
                            Tdrag.eventList.dProcess(obj.tar, e);
                            break;
                        //拖拽结束
                        case 'dragend':
                            Tdrag.eventList.dEnd(obj.tar, e);
                            break;
                    }
                }
            },
            //目标事件判断
            targetJudge: function (e) {
                //进行事件的元素事件（可能ie有点问题哈,反正咱项目不用哈哈）
                var target = window.event ? window.event : e;
                //获取点击的dom元素
                var who = target.target ? target.target : target.secElement;
                //判断是不是我们的目标元素
                var targetArr = Tdrag.element.classTarget;
                //循环指定的可拖拽对象
                for (var i in targetArr) {
                    if ($(who).hasClass(targetArr[i])) {
                        //如果包含则返回事件类型和目标对象
                        return {
                            //拖拽类型或者说阶段
                            type: e.type,
                            //目标对象
                            tar: who
                        };
                    }
                }
            },
            dStart: function (tar, e) {
                Tdrag.element.event.firstE = e;
                Tdrag.element.event.processE = e;

            },
            dProcess: function (tar, e) {
                var lx = Tdrag.element.event.processE.screenX - e.screenX,
                    ly = Tdrag.element.event.processE.screenY - e.screenY;
                var _lx = tar.style.left.replace("px","") - lx,_ly = tar.style.top.replace("px","") - ly;
                tar.style.left = _lx +"px";
                tar.style.top = _ly +"px";
                Tdrag.element.event.processE = e;
            },
            dEnd: function (tar, e) {
                //如果目标是下拉扩展按钮
                if( e.target.className=='button'){
                    //进行高度吸附
                    Tdrag.eventList.extendAdsorb($(tar).parent()[0], e)
                }else{
                    //进行位置吸附
                    Tdrag.eventList.dragAdsorb(tar, e)
                }
            },
            //吸附
            dragAdsorb: function (tar, e) {
                //lx 是初次点击与最后停止的x轴距离,ly是初次点击与最后停止的y轴距离
                var lx = Tdrag.element.event.processE.screenX - e.screenX,
                    ly = Tdrag.element.event.processE.screenY - e.screenY;
                //_lx为最终被拖拽目标块的绝对定位x坐标,_ly为最终被拖拽目标块的绝对定位y坐标
                var _lx = tar.style.left.replace("px", "") - lx, _ly = tar.style.top.replace("px", "") - ly;
                //lxnum 为距离父元素(0,0)几个200px的横轴个数,lynum 为距离父元素(0,0)几个21px的纵轴个数
                var lxnum = parseInt(_lx / 200), lynum = parseInt(_ly / 21);
                //如果被拖拽目标元素绝对定位left取模 大于 100 在吸附偏倚一个,小于则不计入。如同四舍五入
                _lx % 200 >= 100 && (lx = (lxnum + 1) * 200) || (lx = lxnum * 200);
                //同上
                _ly % 21 >= 10 && (ly = (lynum + 1) * 21) || (ly = lynum * 21);
                //若超出则吸附边界
                lx < 0 && (lx = "0") || (lx > 1200 && (lx = "1200"));
                ly < 0 && (ly = "0") || (ly > 2016 && (ly = "1995"));
                //最终定位
                tar.style.left = lx + "px";
                tar.style.top = ly + "px";
            },
            extendAdsorb:function(tar,e){
                //lx 是初次点击与最后停止的x轴距离,ly是初次点击与最后停止的y轴距离
                var  ly = Tdrag.element.event.firstE.screenY - e.screenY;
                //计算吸附差值
                var lynum = parseInt(ly/21);
                //如果大于9则往下吸附，反之往上吸附
                ly%21>=9 && (ly = (lynum+1)*21) || ( ly = lynum*21);
                //改变其高度
                tar.style.height = (+ tar.style.height.replace("px","") -  ly)+ "px";
            }
        },
        //解决浏览器兼容
        browserType: function () {
            var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
            var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
            var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
            var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器
            var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
            var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
            var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
            if (isIE) {
                var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                reIE.test(userAgent);
                var fIEVersion = parseFloat(RegExp["$1"]);
                return {name: "IE", num: fIEVersion};
            }//isIE end

            if (isFF) {
                return {name: "FF", num: "FF"};
            }
            if (isOpera) {
                return {name: "Opera", num: "Opera"};
            }
            if (isSafari) {
                return {name: "Safari", num: "Safari"};
            }
            if (isChrome) {
                return {name: "Chrome", num: "Chrome"};
            }
            if (isEdge) {
                return {name: "Edge", num: "Edge"};
            }
        },
        browserDiff:function(e){
            if(Tdrag.browserType() && Tdrag.browserType().name == "FF"){
                Tdrag.element.browser = Tdrag.browserType().name;
                // 火狐拖拽必须携带数据
                e.dataTransfer.setData('demo',null);
                //取消默认事件
                e.stopPropagation();
                e.preventDefault();
                // 火狐设置默认属性
                e.dataTransfer.effectAllowed = "move";
            }
        }
}
    // 最后将插件对象暴露给全局对象
    _global = (function () {
        return this || (0, eval)('this');
    }());
    //判断是否有Tdrag命名,并绑定到全局变量
    !('Tdrag' in _global) && (_global.Tdrag = Tdrag);
}());

Tdrag.element.classTarget = ["table-Label", 'button'];
Tdrag.init();