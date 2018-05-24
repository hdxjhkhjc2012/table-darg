;(function(global,undefined) {
    "use strict"
    var _global;
    var Tdrag = {
		//绑定
        bind:function(aim){
            var x_x = 0;
            var y_y = 0;
            var first_e = "";
            var aim_class = $(aim).attr("class");
            var divModel = "",newDiv = "";
            aim.ondragstart=function(e){
                if($(e.currentTarget).attr("class")=="button-add"){
                    divModel = Tdrag.getDidModel();
                }
                first_e = e;
            }
            aim.ondrag=function(e){
                var x= e.pageX;
                var y= e.pageY;
                var lx = first_e.clientX - e.clientX,ly = first_e.clientY - e.clientY;
                if($(e.currentTarget).attr("class")=="button-add"){
                }
                if(e.target.className=='button'){
                    //获取生成模型

                }
                //drag事件最后一刻，无法读取鼠标的坐标，pageX和pageY都变为0
                if(x==0 && y==0){
                    aim.style.height = (+this.style.height.replace("px","") -  ly)+ "px";
                    return; //不处理拖动最后一刻X和Y都为0的情形
                }
               
            }
            aim.ondragend=function(e){
                if($(e.currentTarget).attr("class")=="button-add"){
                    divModel.left = e.clientX - 130;
                    divModel.top = e.clientY - 140;
                    var newDiv = Tdrag.createDiv(divModel);
                    lableFather.append(newDiv);
                    Tdrag.init($(".table-Label"));
                    return;
                }
                var oldlf =  this.style.left,oldtp = this.style.top;
                var lx = first_e.clientX - e.clientX,ly = first_e.clientY - e.clientY;
                var _lx = this.style.left.replace("px","") - lx,_ly = this.style.top.replace("px","") - ly;
                if(e.target.className=='button'){
                    var lfnum = parseInt(lx/200),lynum = parseInt(ly/21);
                    if(ly%21>=9){
                        ly = (lynum+1)*21
                    }else{
                        ly = lynum*21;
                    }
                    aim.style.height = (+this.style.height.replace("px","") -  ly)+ "px";
                }else{
                    var lfnum = parseInt(_lx/200),lynum = parseInt(_ly/21);
                    if(_lx%200>=100){
                        lx = (lfnum+1)*200
                    }else{
                        lx = lfnum*200;
                    }
                    if(_ly%21>=10){
                        ly = (lynum+1)*21
                    }else{
                        ly = lynum*21;
                    }
                    this.style.left = lx +"px";
                    this.style.top = ly +"px";
                    if(lx<0){
                        this.style.left = "0px";
                    }
                    if(lx>1200){
                        this.style.left = "1200px";
                    }
                    if(ly<0){
                        this.style.top = "0px";
                    }
                    if(ly>2016){
                        this.style.top = "1995px";
                    }
                   /* var not_mineList = Tdrag.isnotmine(this),len = not_mineList.length;
                    for(var i=0; i<len; i++){
                        var flag = Tdrag.isOverlap($(this),$(not_mineList[i]));
                        if(flag){
                            this.style.left  = oldlf ;
                            this.style.top  = oldtp;
                            alert("不可重合");
                            return false;
                        }
                    }*/
                }

            }
            var menu=document.getElementById("menu");
            var aimindex = 0;
            aim.oncontextmenu=function(ev){
                aimindex = $(aim).index();
                var ev=ev||event;
                var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
                menu.style.display="block";
                menu.style.left=ev.clientX+"px";
                //当滑动滚动条时也能准确获取菜单位置
                menu.style.top=ev.clientY+scrollTop+"px";
                $(menu).find("li").on("click",function(){
                    aim.remove()
                    $(menu).css("display","none");
                })
                //阻止默认事件
                return false;
            }
            $(menu).on("mouseleave",function(){
               $(this).css("display","none");
            });

        },
		//初始化
        init:function(ls){
            if(ls){
                var len = ls.length;
                for(var i=0; i<len; i++ ){
                    Tdrag.bind(ls[i]);
                }
            }
        },
		//是否重合
        isOverlap:function(objOne, objTwo){
            var offsetOne = objOne.offset();
            var offsetTwo = objTwo.offset();
            var x1 = offsetOne.left;
            var y1 = offsetOne.top;
            var x2 = x1 + objOne.width();
            var y2 = y1 + objOne.height();

            var x3 = offsetTwo.left;
            var y3 = offsetTwo.top;
            var x4 = x3 + objTwo.width();
            var y4 = y3 + objTwo.height();

            var zx = Math.abs(x1 + x2 - x3 - x4);
            var x = Math.abs(x1 - x2) + Math.abs(x3 - x4);
            var zy = Math.abs(y1 + y2 - y3 - y4);
            var y = Math.abs(y1 - y2) + Math.abs(y3 - y4);
            return (zx < x && zy < y);
        },
        //取到非自己元素
        isnotmine:function(mine){
            var n = $(mine).index();
            var mineClass = $(mine).attr("class");
            var list = $('.'+mineClass+':not(:eq('+n+'))');
            return list;
        },
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
        createDiv:function(value){
            var lableDom = '<div class="table-Label" datedata=""  draggable="true" ondragstart="drag(event)" style="' +
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
        }

    }
    // 最后将插件对象暴露给全局对象
    _global = (function(){ return this || (0, eval)('this'); }());
    !('Tdrag' in _global) && (_global.Tdrag = Tdrag);
}());
Tdrag.init($(".table-Label"));
Tdrag.init($(".botbtn"));
Tdrag.init($(".button-add"));
