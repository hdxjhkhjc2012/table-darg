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
                fatherDiv: $(".content")[0],
                addButton: $(".button-add")[0],
                divModel:""
            },
            //事件参数
            event: {
                //初次拖拽事件e
                firstE: "",
                //过程拖拽事件e
                processE:"",
                //初次目标参数
                firstTar:"",
                //右击目标参数
                contextTar:"",
            },
            //可拖动元素的class类名，如果多个就用逗号隔开或者在外部手动往数组里添加；
            classTarget: ["table-Label","button-add"],
            //浏览器模式
            browser: "",
            addFlag:true
        },
        //初始化
        init: function () {
            //浏览器默认清除
            this.defaultCancel();
            //既存人物块事件段显示
            this.timeInit();
            //相关事件绑定
            this.bind();
        },
        //浏览器默认事件
        defaultCancel:function(){
            document.oncontextmenu = function(){ return false; }
        },
        //获取模型块
        getDidModel:function(){
            return   {
                height: 8,
                background: '#A2D79D',
                Tbackground: '#3CD79D',
                top: 4,
                left : 1,
                title: '这是title',
                content: 'contentcontentcontent'
            }
        },
        //初始化时间
        timeInit:function(){
            //获取既存的目标块
            var arr = [].slice.call($(".table-Label"));
            var len = arr.length;
            for(var i=0; i<len; i++ ){
                //进行循环赋值
                this.eventList.timeQuantum(arr[i]);
            }
        },
        //绑定事件
        bind: function () {
            //事件委托(关于目标块在父元素中拖动)
            this.entrust();
            //菜单点击事件绑定
            this.menubind();
            //右键菜单划过事件
            this.menuleave();
        },
        //事件委托
        entrust: function () {
            // 绑定父级元素
            var father = Tdrag.element.component.fatherDiv;
            //拖动开始事件
            father.addEventListener("dragstart",this.eventList.fatherEvent);
            //拖动过程事件
            father.addEventListener("drag",this.eventList.fatherEvent);
            //拖动结束事件
            father.addEventListener("dragend",this.eventList.fatherEvent);
            //右击事件
            father.addEventListener("contextmenu",this.eventList.fatherEvent);

        },
        //删除按钮划过事件
        menuleave:function(){
            $(menu).on("mouseleave",this.eventList.mleave);
        },
        //菜单事件绑定
        menubind:function(){
            $(menu).find("li").on("click",this.eventList.menu);
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
                        case 'contextmenu':
                            Tdrag.eventList.dcontextmenu(obj.tar, e);
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
            //开始拖拽
            dStart: function (tar, e) {
                if(e.target.className=='button-add'){
                    Tdrag.element.component.divModel  = Tdrag.getDidModel();
                }
                //开始拖拽的初始值
                Tdrag.element.event.firstE = e;
                //开始拖拽记录的过程值
                Tdrag.element.event.processE = e;
                //如果是button则记录 其父元素
                e.target.className=='button' &&  (Tdrag.element.event.firstTar = $(tar).parent().clone()[0] )|| (Tdrag.element.event.firstTar = tar);
            },
            //拖拽过程
            dProcess: function (tar, e) {
                if( e.target.className=='button'){
                    var tarParent = $(tar).parent()[0];
                    var  ly = Tdrag.element.event.processE.screenY - e.screenY;
                    tarParent.style.height = ( tarParent.style.height.replace("px","") -  ly)+ "px";
                }else if(e.target.className=='button-add'){

                } else{
                    //这部分是拖动可随鼠标移动,现在注释掉了
                    var lx = Tdrag.element.event.processE.screenX - e.screenX,
                        ly = Tdrag.element.event.processE.screenY - e.screenY;
                    var _lx = tar.style.left.replace("px","") - lx,_ly = tar.style.top.replace("px","") - ly;
                    tar.style.left = _lx +"px";
                    tar.style.top = _ly +"px";
                }
                Tdrag.element.event.processE = e;
            },
            //拖拽结束
            dEnd: function (tar, e) {
                //如果目标是下拉扩展按钮
                if( e.target.className=='button'){
                    //进行高度吸附
                    Tdrag.eventList.extendAdsorb($(tar).parent()[0], e)
                }else if( e.target.className=='button-add'){
                    //拖拽生成新的人物块
                    Tdrag.element.component.divModel.left = e.pageX - 300;
                    Tdrag.element.component.divModel.top = e.pageY - 140;
                    //创建新的div
                    var newDiv = Tdrag.eventList.createDiv(Tdrag.element.component.divModel);
                    //新加入的成员
                    var newDragDiv = lableFather.append(newDiv).find(".new")[0];
                    //备用这次没用到
                    Tdrag.element.addFlag = false;
                    tar.style.display = "none";
                    //吸附
                    Tdrag.eventList.newDivAdsorb(newDragDiv, e)
                }else{
                    //进行位置吸附
                    Tdrag.eventList.dragAdsorb(tar, e)
                }
            },
            dcontextmenu:function(tar, e){
                //判断是否是新增的任务块
                if(!$(tar).hasClass("new")){
                    //不是则不可右键删除
                    return;
                }
                //获取菜单
                var menu=document.getElementById("menu");
                var ev=e||event;
                var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
                menu.style.display="block";
                menu.style.left=ev.pageX+"px";
                //当滑动滚动条时也能准确获取菜单位置
                menu.style.top=ev.clientY+scrollTop+"px";
                Tdrag.element.event.contextTar = tar;
                //阻止默认事件
                return false;
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
                Tdrag.eventList.timeQuantum(tar);
            },
            extendAdsorb:function(tar,e){
                //lx 是初次点击与最后停止的x轴距离,ly是初次点击与最后停止的y轴距离
                var  ly = Tdrag.element.event.firstE.screenY - e.screenY;
                //计算吸附差值
                var lynum = parseInt(ly/21);
                //如果大于9则往下吸附，反之往上吸附
                ly%21>=11 && (ly = (lynum+1)*21) || ( ly = lynum*21);
                //改变其高度
                tar.style.height = (+ Tdrag.element.event.firstTar.style.height.replace("px","") -  ly)+ "px";
                Tdrag.eventList.timeQuantum(tar);
            },
            newDivAdsorb:function(tar,e){
                var lx = "",ly = "";
                var _lx = tar.style.left.replace("px",""), _ly = tar.style.top.replace("px","");
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
                Tdrag.eventList.timeQuantum(tar);
            },
            //时间段展示
            timeQuantum:function(tar){
                //获取高度和长度
                var top = tar.style.top.replace("px",""), height = tar.style.height.replace("px","");
                //获取时间段
                var start = top/21,end = (+top+(+height))/21;
                var starttime = parseInt(start/4), detailstart =  start % 4;
                var endttime = parseInt(end/4), detailend =  end % 4;
                var secondstarttime = Tdrag.eventList.compareTime(detailstart),secondendtime =  Tdrag.eventList.compareTime(detailend);
                //如果小于10补零
                starttime<10 && (  starttime =  "0" + starttime );
                endttime<10 && (  endttime = "0" + endttime);
                //展示时间
                var showTime = starttime + ":" + secondstarttime + "--" + endttime+ ":" + secondendtime;
                $(tar).find(".table-Label-title").text(showTime);
            },
            compareTime:function(t){
                //分针时间
                var secondtime = 0;
                switch (t){
                    //余数1为15分
                    case 1:
                        secondtime = "15";
                        break;
                    //余数2为30分
                    case 2:
                        secondtime = "30";
                        break;
                    //余数2为45分
                    case 3:
                        secondtime = "45";
                        break;
                    //默认00
                    default:
                        secondtime = "00";
                        break;
                }
                return secondtime;
            },
            menu:function(){
                //目标任务块
                var tar = Tdrag.element.event.contextTar;
                //其最外层
                $(tar).remove();
                //menu隐藏
                $(this).closest(".menu").css("display","none");
                //增加按钮出现
                $(".button-add").show();

            },
            createDiv:function(value){
                var lableDom = '<div class="table-Label new"  draggable="true"  style="' +
                    'height: ' + parseInt(value.height) * parseInt(height_Definition) +
                    'px;background: ' + value.background +
                    ';top:' + value.top +
                    'px;left: ' + value.left +
                    'px;">'+
                    '<div class="table-Label-title" style="background: '+ value.Tbackground +'">'+ value.title +'</div>'+
                    '<div class="table-Label-content">'+ value.content +'</div>' +
                    '<button class="button" draggable="true" style="position: absolute; width: 10px; height: 10px; background: #000; right: 0px; bottom: 0px"></button>'
                '</div>';
                return lableDom;
            },
            mleave:function(){
                $(this).css("display","none");
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
                /*//取消默认事件
                e.stopPropagation();
                e.preventDefault();*/
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

Tdrag.element.classTarget =  ["table-Label","button-add","button"];
Tdrag.init();