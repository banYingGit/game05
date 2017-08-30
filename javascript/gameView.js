/**
 * Created by banYing on 2017/8/24 0024.
 */
/* 全局变量
 * clickIndex：点击索引
 * clickN：点击次数
 * atuoTime：倒计时
 * errorNum ：错误点击次数
 * maxNum：正确点击最大值
 * sysTimeN：游戏开始时间
 * sysTimeO：游戏结束时间
 * sumTime：总计用时
 */
var clickIndex,
    clickN = 0,
    atuoTime,
    errorNum = 0,
    maxNum,
    sysTimeN,
    sysTimeO,
    sumTime = 0;

var sourceA = [],
    sourceB = [],
    sourceC = [],
    ArrA = [],
    ArrB = [],
    ArrC = [],
    ArrD = [];

_event()


// 游戏内事件处理
function _event() {

    $('#goScreen2').click(function () {

        $('#screen1').remove()
        $('#screen2').show()

    })

    $('#goList').click(function () {

        $('#screen2').remove()

        $('#listBox').show()

        $('#listBox #list').removeClass().addClass('listTest')

        _setListTest()

        _time(20, function () {

            $('#screen3').show()
            $('#listBox').hide()
            $('#listBox #list').removeClass().empty()

        })

    })
    $('#start').click(function () {

        $('#screen3').remove()

        $('#listBox').show()

        $('#listBox #list').removeClass().addClass('list')

        _setList()

        sysTimeN = new Date()

        _time(60, function () {

            sysTimeO = new Date()

            var $cur$Time = (sysTimeO - sysTimeN) / 1000

            sumTime = parseInt(sumTime + $cur$Time)

            maxNum = +($('#target').text()) - 1

            $('#listBox').remove()

            $('#over').show()

            // console.log('maxNum,errorNum,sumTime>>>>>>>>>>>2', maxNum, errorNum, sumTime)
            _over()
        })

    })
    $('#stop').click(function () {

        clearInterval(atuoTime)
        $('#listBox').hide()
        $('#stopBox').show()

        sysTimeO = new Date()

        var $cur$Time = (sysTimeO - sysTimeN) / 1000

        sumTime = parseInt(sumTime + $cur$Time)

    })
    $('#continue').click(function () {

        $('#listBox').show()
        $('#stopBox').hide()
        var $time = $('#time').text()

        sysTimeN = new Date()

        _time($time, function () {

            if ($('#screen3').length > 0) {

                $('#screen3').show()
                $('#listBox').hide()
                $('#listBox #list').removeClass().empty()

            } else {

                maxNum = +($('#target').text()) - 1

                $('#listBox').remove()

                $('#over').show()

                sysTimeO = new Date()

                var $cur$Time = (sysTimeO - sysTimeN) / 1000

                sumTime = parseInt(sumTime + $cur$Time)

                console.log('maxNum,errorNum,sumTime>>>>>>>>>>>>1', maxNum, errorNum, sumTime)
                _over()

            }


        })

    })

    $('.button[data-role="out"]').click(function () {

        //游戏点击退出按钮
        _out()

    })

}

//游戏结束
function _over() {


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

/*** 数字点击事件 ***/
function _clickEvent(e) {


    var dataRole = $(e.target).parent('li').attr('data-role'),

        dataParRole = $(e.target).parents('ul').attr('data-role'),

        sourceNum


    // 禁止双击
    if (clickIndex == $(this).index()) return

    // console.log('clickN,sourceNum', clickN, sourceNum)

    if (dataRole == ArrD[clickN]) {

        var $valNew;

        if (dataParRole != 'true') {

            $valNew = ArrB[clickN] ? ArrB[clickN] : ''

            sourceNum = 15

        } else {

            if (clickN <= 15) {

                $valNew = ArrB[clickN]

            } else {

                $valNew = ArrC[clickN - 16] ? ArrC[clickN - 16] : ''
            }

            sourceNum = 40

        }

        $(e.target).parent('li').attr('data-role', $valNew).children('p').text($valNew)

        // console.log('点击对了', $valNew)

        clickIndex = $(e.target).parent('li').index()

        clickN = clickN + 1

        $('#target').text(ArrD[clickN])

        if (clickN >= sourceNum) {

            //点击完成

            clearInterval(atuoTime)

            if (dataParRole != 'true') {

                $('#screen3').show()

                $('#listBox').hide()

                $('#listBox #list').removeClass().empty()

            } else {

                sysTimeO = new Date()

                var $cur$Time = (sysTimeO - sysTimeN) / 1000

                sumTime = parseInt(sumTime + $cur$Time)

                maxNum = ArrD[39]

                // console.log('maxNum,errorNum,sumTime>>>>>>>>3', maxNum, errorNum, sumTime)

                _over()
                $('#listBox').remove()

                $('#over').show()

            }

            return

        }


    } else {

        if (dataParRole == 'true') {

            errorNum = errorNum + 1

        }
        console.log('错误')
    }


}

/*** 设置列表正式测验 ***/
function _setList() {

//source 资源库
    sourceA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    sourceB = [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];
    sourceC = [33, 34, 35, 36, 37, 38, 39, 40];
    ArrA = _getArrayItems(sourceA, 16);
    ArrB = _getArrayItems(sourceB, 16);
    ArrC = _getArrayItems(sourceC, 8);
    ArrD = sourceA.concat(sourceB).concat(sourceC);

    clickIndex = ''

    clickN = 0;

    for (var i = 0; i < 16; i++) {
        $('#list').append('<li  onclick="_clickEvent(event)"  data-role="' + ArrA[i] + '"><p>' + ArrA[i] + '</p></li>')
    }

    $('#list').attr('data-role', 'true')

    $('#time').text('360')

    $('#target').text('1')

    //UI 样式

    var listH = $('#list').height()

    $('#list').css('width', listH)

    $('#list li p').css({'font-size': listH / 10, 'line-height': listH / 5 + 'px'})


}

/*** 设置列表练习题 ***/
function _setListTest() {

    //source 资源库
    sourceA = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    sourceB = [10, 11, 12, 13, 14, 15];
    ArrA = _getArrayItems(sourceA, 9);
    ArrB = _getArrayItems(sourceB, 6);
    ArrD = sourceA.concat(sourceB);

    for (var i = 0; i < 9; i++) {
        $('#list').append('<li onclick="_clickEvent(event)"  data-role="' + ArrA[i] + '"><p>' + ArrA[i] + '</p></li>')
    }

    $('#list').attr('data-role', 'false')

    $('#time').text('120')

    $('#target').text('1')

    //UI 样式

    var listH = $('#list').height()

    $('#list').css('width', listH)

    $('#list li p').css({'font-size': listH / 7, 'line-height': listH / 3.5 + 'px'})


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
