/**
 * Created by banYing on 2017/8/24 0024.
 */
/* 全局变量
 * clickIndex：点击索引
 * clickN：点击次数
 */
var ArrA = [], ArrB = [],
    clickIndex,
    clickN = 0;
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

    })


    $('#list li').on('click', function () {

        var dataRole = $(this).attr('data-role'),

            dataParRole = $(this).parent('ul').attr('data-role'),

            sourceNum = dataRole == 'true' ? 40 : 15

        console.log('sourceNum', sourceNum)

        // 禁止双击
        if (clickIndex == $(this).index()) return

        if (clickN > 32) return

        if (dataRole == ArrC[clickN]) {

            var $val = ArrB[clickN] ? ArrB[clickN] : ''

            $(this).attr('data-role', $val).children('p').text($val)

            console.log('点击对了', $val)

            clickIndex = $(this).index()

            clickN = clickN + 1

        } else {

            console.log('错误')
        }

    })


}


/*** 设置列表
 * arr：数组
 * num：随机个数
 ***/
function _setList() {

//source 资源库
    sourceA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    sourceB = [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];
    sourceC = [33, 34, 35, 36, 37, 38, 39, 40];
    ArrA = _getArrayItems(sourceA, 16);
    ArrB = _getArrayItems(sourceB, 16);
    ArrC = _getArrayItems(sourceB, 8);
    ArrD = sourceA.concat(sourceB).concat(sourceC);
    for (var i = 0; i < 16; i++) {
        $('#list').append('<li  data-role="' + ArrA[i] + '"><p>' + ArrA[i] + '</p></li>')
    }

    $('#list').attr('data-role', 'true')

    $('#time').text('360')

    $('#target').text('1')

    //UI 样式

    var listH = $('#list').height()

    $('#list').css('width', listH)

    $('#list li p').css({'font-size': listH / 10, 'line-height': listH / 5 + 'px'})


}

function _setListTest() {

    //source 资源库
    sourceA = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    sourceB = [10, 11, 12, 13, 14, 15];
    ArrA = _getArrayItems(sourceA, 9);
    ArrB = _getArrayItems(sourceB, 6);
    ArrD = sourceA.concat(sourceB);

    for (var i = 0; i < 9; i++) {
        $('#list').append('<li  data-role="' + ArrA[i] + '"><p>' + ArrA[i] + '</p></li>')
    }

    $('#list').attr('data-role', 'false')

    $('#time').text('120')

    $('#target').text('1')

    //UI 样式

    var listH = $('#list').height()

    $('#list').css('width', listH)

    $('#list li p').css({'font-size': listH / 7, 'line-height': listH / 3.5 + 'px'})


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

/*** 数组去重
 * sumArr：大数组
 * subArr：去重元素数组
 ***/
function _repeat(sumArr, subArr) {

    var repArr = [];

    for (var i = 0; i < sumArr.length; i++) {

        for (var n = 0; n < subArr.length; n++) {

            if (sumArr[i] == subArr[n]) {

                sumArr.splice(i, 1);

                repArr = sumArr

            }

        }

    }
    return repArr;
}