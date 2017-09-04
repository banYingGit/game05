/**
 * Created by banYing on 2017/8/24 0024.
 */


/* 全局变量
 * setNum ：点击次数
 * getChoseA：第一部分返回参数
 * getChoseB: 第二部分返回参数
 * getChoseA与getChoseB 返回格式  误删 {name:显示图片名称，chose：用户选择，correct：正确选择，time：用户用时，result：用户选择是否争取}
 * getSumA：第一部分总计分返回参数
 * getSumB：第二部分总计分返回参数
 * getSumA与getSumB 返回格式 误删 （sumTime:总计用时，averageTime：平均用时，averageTimeCor:正确题目平均用时）
 *
 */


var setNum = 1,
    getChoseA = [],
    getChoseB = [],
    getSumA={},
    getSumB = {};

/* 全局变量
 * sourceA：人造物
 * sourceB：自热物
 * source40: 第一部分答题数组
 * source20：第二部分答题数组
 *
 */

var sourceA = [
        {'name': 'r1-1', 'attr': 'create'},
        {'name': 'r1-2', 'attr': 'create'},
        {'name': 'r1-3', 'attr': 'create'},
        {'name': 'r1-4', 'attr': 'create'},
        {'name': 'r1-5', 'attr': 'create'},
        {'name': 'r1-6', 'attr': 'create'}
        // {'name': 'r1-7', 'attr': 'create'},
        // {'name': 'r1-8', 'attr': 'create'},
        // {'name': 'r1-9', 'attr': 'create'},
        // {'name': 'r1-10', 'attr': 'create'},
        // {'name': 'r1-11', 'attr': 'create'},
        // {'name': 'r1-12', 'attr': 'create'},
        // {'name': 'r1-13', 'attr': 'create'},
        // {'name': 'r1-14', 'attr': 'create'},
        // {'name': 'r1-15', 'attr': 'create'},
        // {'name': 'r1-16', 'attr': 'create'},
        // {'name': 'r1-17', 'attr': 'create'},
        // {'name': 'r1-18', 'attr': 'create'},
        // {'name': 'r1-19', 'attr': 'create'},
        // {'name': 'r1-20', 'attr': 'create'},
        // {'name': 'r1-21', 'attr': 'create'},
        // {'name': 'r1-22', 'attr': 'create'},
        // {'name': 'r1-23', 'attr': 'create'},
        // {'name': 'r1-24', 'attr': 'create'},
        // {'name': 'r1-25', 'attr': 'create'},
        // {'name': 'r1-26', 'attr': 'create'},
        // {'name': 'r1-27', 'attr': 'create'},
        // {'name': 'r1-28', 'attr': 'create'}
    ],
    sourceB = [
        {'name': 'r2-1', 'attr': 'natural'},
        {'name': 'r2-2', 'attr': 'natural'},
        {'name': 'r2-3', 'attr': 'natural'},
        {'name': 'r2-4', 'attr': 'natural'},
        {'name': 'r2-5', 'attr': 'natural'}
        // {'name': 'r2-6', 'attr': 'natural'},
        // {'name': 'r2-7', 'attr': 'natural'},
        // {'name': 'r2-8', 'attr': 'natural'},
        // {'name': 'r2-9', 'attr': 'natural'},
        // {'name': 'r2-10', 'attr': 'natural'},
        // {'name': 'r2-11', 'attr': 'natural'},
        // {'name': 'r2-12', 'attr': 'natural'},
        // {'name': 'r2-13', 'attr': 'natural'},
        // {'name': 'r2-14', 'attr': 'natural'},
        // {'name': 'r2-15', 'attr': 'natural'},
        // {'name': 'r2-16', 'attr': 'natural'},
        // {'name': 'r2-17', 'attr': 'natural'},
        // {'name': 'r2-18', 'attr': 'natural'},
        // {'name': 'r2-19', 'attr': 'natural'},
        // {'name': 'r2-20', 'attr': 'natural'},
        // {'name': 'r2-21', 'attr': 'natural'},
        // {'name': 'r2-22', 'attr': 'natural'},
        // {'name': 'r2-23', 'attr': 'natural'},
        // {'name': 'r2-24', 'attr': 'natural'},
        // {'name': 'r2-25', 'attr': 'natural'},
        // {'name': 'r2-26', 'attr': 'natural'},
        // {'name': 'r2-27', 'attr': 'natural'},
        // {'name': 'r2-28', 'attr': 'natural'},
        // {'name': 'r2-29', 'attr': 'natural'},
        // {'name': 'r2-30', 'attr': 'natural'},
        // {'name': 'r2-31', 'attr': 'natural'},
        // {'name': 'r2-32', 'attr': 'natural'}
    ],
    $res = sourceA.concat(sourceB),
    source40 = _getArrayItems($res, 5),
    source20 = _getArrayItems($res, 5);

// console.log('source40', source40)
// console.log('source20', source20)


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


    $('#listButA').attr({'data-role': 'create', 'onclick': '_clickButA(event)'})

    $('#listButB').attr({'data-role': 'natural', 'onclick': '_clickButA(event)'})


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
        if (setNum < 6) {

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
    console.log('$dataRole', $dataRole)

    //设置问题

    // 测试数据
    // Barr.push(source20[setNum - 1].name)

    $('#list li p').addClass(source20[setNum - 1].name).attr({
        'data-role': $dataRole,
        'data-name': source20[setNum - 1].name
    })


    //设置选择按钮

    $('#listButA').attr({'data-role': 'yes', 'onclick': '_clickButA(event)'}).text('出现过')

    $('#listButB').attr({'data-role': 'no', 'onclick': '_clickButA(event)'}).text('没出现过')


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
        if (setNum < 6) {

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

        $('#listButA').removeAttr('onclick')

        $('#listButB').removeAttr('onclick')


    } else if ($('#list').attr('data-part') == "B") {

        getChoseB.push($obj)

        clearInterval(atuoTime)

        setNum = setNum + 1

        //6改21  点击结束
        if (setNum < 6) {

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


    console.log('getChoseB', getChoseB)
    console.log('getChoseA', getChoseA)

    var $choseA = getChoseA,

        $choseB = getChoseB;


    /* ajax 请求接口路径，返回json 数据
     * maxNum: 游戏总计时间
     * errorNum ：错误点击次数
     * */

    var param = {

        timeObj: sumTime,

        maxNum: maxNum,

        errorNum: errorNum

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
