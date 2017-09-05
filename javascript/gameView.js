/**
 * Created by banYing on 2017/8/24 0024.
 */


/* 全局变量
 * atuoTime：倒计时
 * setNum ：点击次数
 * getChoseA：第一部分返回参数
 * getChoseB: 第二部分返回参数
 * getChoseA与getChoseB 返回格式  误删 {name:显示图片名称，chose：用户选择，correct：正确选择，time：用户用时，result：用户选择是否正确}
 * getSumA：第一部分总计分返回参数
 * getSumB：第二部分总计分返回参数
 * getSumA与getSumB 返回格式 误删 （sumTime:总计用时，averageSumTime：平均总用时, averageTime：平均用时，averageTimeCor:正确题目平均用时,corLength：答对数目）
 *
 */


var atuoTime,
    setNum = 1,
    getChoseA = [],
    getChoseB = [],
    getSumA = {"sumTime": "", "averageSumTime": "", "averageTime": "", "averageTimeCor": "", "corLength": ""},
    getSumB = {"sumTime": "", "averageSumTime": "", "averageTime": "", "averageTimeCor": "", "corLength": ""};

/* 全局变量
 * sourceA：人造物
 * sourceB：自热物
 *
 */
var sourceA = [], sourceB = [];

for (var i = 1; i < 29; i++) {

    var $obj = {'name': 'r1-' + i, 'attr': 'create'};

    sourceA.push($obj)

}

for (var i = 1; i < 33; i++) {

    var $obj = {'name': 'r2-' + i, 'attr': 'natural'};

    sourceB.push($obj)

}

/* 全局变量
 * source40: 第一部分答题数组
 * source20：第二部分答题数组
 *
 */

var $res = sourceA.concat(sourceB),
    source40 = _getArrayItems($res, 40),
    source20 = _getArrayItems($res, 20);


_event()


// 游戏内事件处理
function _event() {

    $('#goScreen2').click(function () {

        $('#screen1').remove()
        $('#screen2').show()

    })

    $('#goList').click(function () {

        $('#screen2').remove()
        $('#list').show()
        _setListpartA()

    })

    $('#start').click(function () {

        $('#screen3').remove()

        $('#list').show()

        setNum = 1;

        _setListpartB()

    })

    $('#stop').click(function () {

        clearInterval(atuoTime)

        $('#list').hide()

        $('#stopBox').show()


    })

    $('#continue').click(function () {

        var $time = $('#time').text(),

            $part = $('#list').attr('data-part');

        $('#list').show()

        $('#stopBox').hide()

        if ($part == 'A') {

            //设置倒计时
            _time($time, function () {

                if ($('#list').attr('data-click') != 'yes') {

                    // 没有点击选择，到时自动添加选项对象

                    var imgEl = $('#list li p').attr('data-role'),

                        $name = $('#list li p').attr('data-name');


                    var $key = 'number' + setNum,

                        $chose = '{"name":"' + $name + '","chose":"","correct":"' + imgEl + '","time":"4","result":"false"}',

                        $val = JSON.parse($chose),

                        $obj = {};

                    $obj[$key] = $val


                    getChoseA.push($obj)

                }

                setNum = setNum + 1

                //6改41
                if (setNum < 41) {

                    _setListpartA()

                } else {

                    $('#list').hide()

                    $('#screen3').show()

                    // 测试数据
                    // console.log('Aarr', Aarr)
                }

            })

        } else if ($part == 'B') {


            //设置倒计时
            _time($time, function () {


                if ($('#list').attr('data-click') != 'yes') {

                    // 没有点击选择，到时自动添加选项对象

                    var imgEl = $('#list li p').attr('data-role'),

                        $name = $('#list li p').attr('data-name');


                    var $key = 'number' + setNum,

                        $chose = '{"name":"' + $name + '","chose":"","correct":"' + imgEl + '","time":"4","result":"false"}',

                        $val = JSON.parse($chose),

                        $obj = {};

                    $obj[$key] = $val


                    getChoseB.push($obj)


                }


                setNum = setNum + 1

                //6改21 时间到了结束
                if (setNum < 21) {

                    _setListpartB()

                } else {

                    $('#list').remove()

                    $('#over').show()

                    _over()
                    // console.log('getChoseB>>>>>>>11', getChoseB)
                    // console.log('Barr', Barr)
                }


            })


        }


    })

    $('.button[data-role="out"]').click(function () {

        _out()
    })


}
// 测试数据
// var Aarr = [], Barr = []

// 设置第一部分答题界面
function _setListpartA() {


    //清空界面
    $('#list').attr('data-part', 'A')

    $('#list li p').removeClass().removeAttr()

    $('#time').text('4')

    $('#list').removeAttr('data-click')

    // 测试数据
    // Aarr.push(source40[setNum - 1].name)
    //设置问题

    $('#list li p').addClass(source40[setNum - 1].name).attr({
        'data-role': source40[setNum - 1].attr,
        'data-name': source40[setNum - 1].name
    })


    //设置选择按钮


    $('#listButA').attr({'data-role': 'create', 'onclick': '_clickButA(event)'}).removeClass('gray')

    $('#listButB').attr({'data-role': 'natural', 'onclick': '_clickButA(event)'}).removeClass('gray')


    //设置倒计时
    _time(4, function () {


        if ($('#list').attr('data-click') != 'yes') {

            // 没有点击选择，到时自动添加选项对象

            var imgEl = $('#list li p').attr('data-role'),

                $name = $('#list li p').attr('data-name');


            var $key = 'number' + setNum,

                $chose = '{"name":"' + $name + '","chose":"","correct":"' + imgEl + '","time":"4","result":"false"}',

                $val = JSON.parse($chose),

                $obj = {};

            $obj[$key] = $val


            getChoseA.push($obj)

        }

        setNum = setNum + 1

        //6改41
        if (setNum < 41) {

            _setListpartA()

        } else {

            $('#list').hide()

            $('#screen3').show()

            console.log('getChoseA>>>>>>>000', getChoseA)
            // 测试数据
            // console.log('Aarr', Aarr)
        }

    })


}

// 设置第二部分答题界面
function _setListpartB() {


    $('#pastBText').show()

    //清空界面

    $('#list').attr('data-part', 'B').removeAttr('data-click')

    $('#list li p').removeClass()

    $('#time').text('4')


    var $dataRole = '';

    var $nameArr = []

    for (var i = 0; i < source40.length; i++) {

        $nameArr.push(source40[i].name)

    }


    if ($.inArray(source20[setNum - 1].name, $nameArr) != -1) {

        $dataRole = 'yes'

    } else {

        $dataRole = 'no'

    }


    //设置问题

    // 测试数据
    // Barr.push(source20[setNum - 1].name)

    $('#list li p').addClass(source20[setNum - 1].name).attr({
        'data-role': $dataRole,
        'data-name': source20[setNum - 1].name
    })


    //设置选择按钮

    $('#listButA').attr({'data-role': 'yes', 'onclick': '_clickButA(event)'}).text('出现过').removeClass('gray')

    $('#listButB').attr({'data-role': 'no', 'onclick': '_clickButA(event)'}).text('没出现过').removeClass('gray')


    //设置倒计时
    _time(4, function () {


        if ($('#list').attr('data-click') != 'yes') {

            // 没有点击选择，到时自动添加选项对象

            var imgEl = $('#list li p').attr('data-role'),

                $name = $('#list li p').attr('data-name');


            var $key = 'number' + setNum,

                $chose = '{"name":"' + $name + '","chose":"","correct":"' + imgEl + '","time":"4","result":"false"}',

                $val = JSON.parse($chose),

                $obj = {};

            $obj[$key] = $val


            getChoseB.push($obj)


        }


        setNum = setNum + 1

        //6改21 时间到了结束
        if (setNum < 21) {

            _setListpartB()

        } else {

            $('#list').remove()

            $('#over').show()

            _over()
            // console.log('getChoseB>>>>>>>11', getChoseB)
            // console.log('Barr', Barr)
        }


    })


}

// 点击按钮事件处理
function _clickButA(e) {

    $('#list').attr('data-click', 'yes')

    var $dataRole = $(e.target).attr('data-role'),

        $name = $('#list li p').attr('data-name'),

        imgEl = $('#list li p').attr('data-role'),

        $time = 4 - (+($('#time').text())) > 0 ? 4 - (+($('#time').text())) : 1,

        $result = $dataRole == imgEl ? true : false;


    var $key = 'number' + setNum,

        $chose = '{"name":"' + $name + '","chose":"' + $dataRole + '","correct":"' + imgEl + '","time":"' + $time + '","result":"' + $result + '"}',

        $val = JSON.parse($chose),

        $obj = {};

    $obj[$key] = $val

    if ($('#list').attr('data-part') == "A") {

        getChoseA.push($obj)

        $('#listButA').removeAttr('onclick').addClass('gray')

        $('#listButB').removeAttr('onclick').addClass('gray')


    } else if ($('#list').attr('data-part') == "B") {

        getChoseB.push($obj)

        clearInterval(atuoTime)

        setNum = setNum + 1

        //6改21  点击结束
        if (setNum < 21) {

            _setListpartB()

        } else {

            $('#list').remove()

            $('#over').show()

            _over()

            // console.log('getChoseB>>>>>>>22', getChoseB)
            // 测试数据
            // console.log('Barr》》》', Barr)
        }


    }


}


//游戏结束
function _over() {


    var $choseA = getChoseA,

        $timeArrA = [],

        $corArrA = [];


    $.each($choseA, function (i, n) {

        $.each(n, function (j, k) {

            $timeArrA.push(k.time)

            if (k.result == 'true') {

                $corArrA.push(k.time)
            }

        })

    })

    getSumA.sumTime = eval($timeArrA.join("+"))

    getSumA.averageSumTime = eval($corArrA.join("+"))

    getSumA.averageTime = getSumA.sumTime / $choseA.length

    getSumA.averageTimeCor = getSumA.averageSumTime / $corArrA.length

    getSumA.corLength = $corArrA.length


    var $choseB = getChoseB,

        $timeArrB = [],

        $corArrB = [];


    $.each($choseB, function (i, n) {

        $.each(n, function (j, k) {

            $timeArrB.push(k.time)

            if (k.result == 'true') {

                $corArrB.push(k.time)
            }

        })

    })

    getSumB.sumTime = eval($timeArrB.join("+"))

    getSumB.averageSumTime = eval($corArrB.join("+"))

    getSumB.averageTime = getSumB.sumTime / $choseB.length

    getSumB.averageTimeCor = getSumB.averageSumTime / $corArrB.length

    getSumB.corLength = $corArrB.length

    /* ajax 请求接口路径，返回json 数据
     * getChoseA：第一部分返回参数
     * getChoseB: 第二部分返回参数
     * getSumA：第一部分总计时间返回参数
     * getSumB：第二部分总计时间返回参数
     * */

    var param = {

        "getChoseA": getChoseA,

        "getChoseB": getChoseB,

        "getSumA": getSumA,

        "getSumB": getSumB

    }

    console.log('当前返回参数', param)

}

//游戏退出
function _out() {

    console.log('游戏退出')

}


/*** 倒计时
 * i：时间
 * fn：倒计时结束回调
 ***/
function _time(i, fn) {

    var timeFn = function () {

        i = i - 1

        $('#time').text(i)

        if (i == 0) {

            clearInterval(atuoTime)

            fn && fn.call(this)

        }

    }

    atuoTime = setInterval(timeFn, 1000);


}

/*** 数组随机
 * arr：数组
 * num：随机个数
 ***/
function _getArrayItems(arr, num) {

    var array = [];

    for (var index in arr) {

        array.push(arr[index]);
    }

    var return_array = [];

    for (var i = 0; i < num; i++) {

        if (array.length > 0) {

            var arrIndex = Math.floor(Math.random() * array.length);

            return_array[i] = array[arrIndex];

            array.splice(arrIndex, 1);

        } else {
            break;
        }
    }
    return return_array;
}
