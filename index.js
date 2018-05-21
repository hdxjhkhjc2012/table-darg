/*
*
* 表格格子内容 table_lattice-content
* 格子数量 table_lattice_Number
* 大格子   table_lattice_father
* 格子赋值 lattice
* */
var lattice = '';
var table_lattice = '<div class="table-content-bottom-content-list">' +
                         '<div class="table-content-bottom-content-list-son"></div>' +
                         '<div class="table-content-bottom-content-list-son"></div>' +
                         '<div class="table-content-bottom-content-list-son"></div>' +
                         '<div class="table-content-bottom-content-list-son no-border-buttom"></div>' +
                     '</div>'

var table_lattice_Number = 24;
for(i = 0 ; i<table_lattice_Number ; i++){
    lattice += table_lattice;
}
var table_lattice_father = '<div class="table-content-bottom-content">' + lattice +'</div>'

// 填入DOM标签
$(".table-content-bottom-content").html(table_lattice_father)

/*
*
* 表格时间格子内容 table_timeLattice-content
* 时间格子数量 table_timeLattice_Number
* 大时间格子   table_timeLattice_father
* 时间格子赋值 timeLattice
* */

var timeLattice = '';
var table_timeLattice_content = '';
var table_timeLattice_Number = 24;
for(i = 0 ; i<table_timeLattice_Number ; i++){
    if(i<10){
        table_timeLattice_content = '<div class="table-content-bottom-nav-list">' +
            '<div class="table-content-bottom-nav-list-son">' +
            '0' + i + ':00' +
            '</div>' +
            '</div>';
    }else{
        table_timeLattice_content = '<div class="table-content-bottom-nav-list">' +
            '<div class="table-content-bottom-nav-list-son">' +
            i + ':00' +
            '</div>' +
            '</div>';
    }

    timeLattice += table_timeLattice_content;
}
// 填入DOM标签
$(".table-content-bottom-nav").html(timeLattice)


/*
*   weekArray 星期数组
*   weekDom 星期Dom
* */
var weekArray =[
    {
        week: '星期一',
        data: '十二月 05,2011'
    },
    {
        week: '星期二',
        data: '十二月 05,2011'
    },
    {
        week: '星期三',
        data: '十二月 05,2011'
    },
    {
        week: '星期四',
        data: '十二月 05,2011'
    },
    {
        week: '星期五',
        data: '十二月 05,2011'
    },
    {
        week: '星期六',
        data: '十二月 05,2011'
    },
    {
        week: '星期日',
        data: '十二月 05,2011'
    }
];
var weekDom = '<div class="table-content-top-nav"></div>'
weekArray.forEach(function (value) {
    weekDom += '<div class="table-content-top-list"><div class="table-content-top-list-week" style="line-height: 20px">' +
        value.week +
        '</div><div class="table-content-top-list-date" style="line-height: 20px">' +
        value.data +
        '</div></div>'
})
// 填入DOM标签
$(".table-content-top").html(weekDom)




/*
*   labelArray 标签
* */
var height_Definition = 21;
var top_Definition = 21;
var left_Definition = 200;
/*
* height 定义竖着占个数 一整个为4  一个小时【4】  半个小时【2】  依次类推
* top  定义上侧的距离  小时整数为4  区间为 【0-92】
* left 定义左侧的距离  区间为 【0-6】
* */

var lableFather = $(".table-content-bottom-content-father-son");
function labelshow(labelArray){
    labelArray.forEach(function (value) {
        var lableDom = '<div class="table-Label"  draggable="true" style="' +
            'height: ' + parseInt(value.height) * parseInt(height_Definition) +
            'px;background: ' + value.background +
            ';top:' + parseInt(value.top) * parseInt(top_Definition) +
            'px;left: ' + parseInt(value.left) * parseInt(left_Definition) +
            'px;">'+
            '<div class="table-Label-title" style="background: '+ value.Tbackground +'">'+ value.title +'</div>'+
            '<div class="table-Label-content">'+ value.content +'</div>' +
            '<button class="button" draggable="true" style="position: absolute; width: 10px; height: 10px; background: #000; right: 0px; bottom: 0px"></button>'
        '</div>'

        lableFather.append(lableDom)
    })
}

function born(){
    var labelArray = [
        {
            height: 8,
            background: '#A2D79D',
            Tbackground: '#3CD79D',
            top: 4,
            left : 1,
            title: '这是title',
            content: 'contentcontentcontent'
        },
        {
            height: 6,
            background: '#C7E3D8',
            Tbackground: '#C7E3F1',
            top:2,
            left : 3,
            title: '这是title2',
            content: 'contentcontentcontent'
        },
        {
            height: 4,
            background: '#378D86',
            Tbackground: '#376F53',
            top: 8,
            left :6,
            title: '这是title3',
            content: 'contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent'
        }
    ]
    return labelArray;
}


