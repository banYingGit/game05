/**
 * Created by banYing on 2017/8/24 0024.
 */
/* 全局变量
 * sysTimeN：游戏开始时间
 * sysTimeO：游戏结束时间
 * timeObj： 游戏时间 json
 * correctNum：正确数量
 * curLevel：当前所处等级 默认1级 4组图  级数加1，组数加1
 * curNum：当前所处题数  默认是1 最大为2
 * memoryTime：当前记忆时间 默认20秒 每等级加5
 * answerTime：当前答题时间 默认60秒 每等级加15
 * atuoTime：倒计时  clearInterval(atuoTime)
 * curCliEl：当前点击元素
 * curErrorNumT：当前练习错误次数
 * elIndex: 当前点击元素索引值  避免双击事件
 */
var sysTimeN,
    sysTimeO,
    timeObj = {
        sumTime: 0,
        level1: {sum: 0, one: 0, two: 0},
        level2: {sum: 0, one: 0, two: 0},
        level3: {sum: 0, one: 0, two: 0},
        level4: {sum: 0, one: 0, two: 0},
        level5: {sum: 0, one: 0, two: 0}
    },
    correctNum = 0,
    curLevel = 4,
    curNum = 0,
    memoryTime = 20,//20
    answerTime = 60,//60
    atuoTime,
    curCliEl = '',
    curErrorNumT = 0,
    elIndex = -1

//source 资源库
var source = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8'];


_event()


// 游戏内事件处理
function _event() {


    $('#goscreen2').click(function () {

        $('#screen1').remove()

        $('#screen2').show()

    });
    $('#goscreen3').click(function () {

        $('#screen2').remove()

        $('#screen3').show()

        _screen3()

    });

    $('#again').click(function () {

        $('#again').parents('.again').hide()

        $('#screen3').show()

        _screen3()

    });

    $('#goscreen5').click(function () {

        $('#screen3').remove()
        $('#screen4').remove()
        $('#screen5').show()

        _screen5()

    });
    $('#stopBtn').click(function () {

        clearInterval(atuoTime)

        $('#screenStop').show()


        sysTimeO = new Date()

        var $curTime = (sysTimeO - sysTimeN) / 1000

        _overTime($curTime, true)

    });
    $('#continue').click(function () {

        $('#screenStop').hide()

        sysTimeN = new Date()

        var $time = $('#timeScr5').text()

        _time($time, $('#timeScr5'), function () {

            clearInterval(atuoTime)

            sysTimeO = new Date()

            var $curTime = (sysTimeO - sysTimeN) / 1000

            _overTime($curTime, false)

            if (curLevel == 8 && curNum == 2) return;

            _screen5()


        })

    });

    $('img[data-role="out"]').click(function () {

        //游戏点击退出按钮
        _out()

    })

}

function _screen3() {

    $('#sourceListPractice li .card').removeClass('flipped')

    $('#sourceListPractice li .card').attr('onclick', '')

    var sourceLi = _getArrayItems(source, 2),

        $sourceLi = sourceLi.concat(sourceLi),

        $sourceLiArr = _getArrayItems($sourceLi, 4)

    for (var i = 0; i < 4; i++) {

        $('#sourceListPractice li').eq(i).find('img[data-role="cardImg"]').attr({
            'src': 'img/' + $sourceLiArr[i] + '.png',
            'data-num': $sourceLiArr[i]
        })

    }
    var liWP = $('#sourceListPractice li').width()

    $('#sourceListPractice li').css('height', liWP)


    _time(15, $('#timeScr3'), function () {

        $('#sourceListPractice li .card').addClass('flipped')

        $('#sourceListPractice li .card').attr('onclick', '_checkImg(event)')

    })
    /*console.log('$sourceLiArr', $sourceLiArr)*/


}

function _screen5() {

    $('#sourceList li .card').removeClass('flipped')

    $('#sourceList li .card').attr('onclick', '')

    $('#sourceList li').removeAttr().removeClass().empty().append('<img src="img/none.png"/>')

    $('.stop').hide()


    elIndex = -1
    if (curNum < 2) {
        curNum = curNum + 1;

    } else {
        curNum = 1

        curLevel = curLevel + 1
        memoryTime = memoryTime + 5

        answerTime = answerTime + 15

    }

    $('#timeScr5').text(memoryTime)
    console.log('answerTime，与提数', memoryTime, answerTime, curLevel)


    var sourceLi = _getArrayItems(source, curLevel),

        $sourceLi = sourceLi.concat(sourceLi),

        $sourceLiArr = _getArrayItems($sourceLi, curLevel * 2),

        index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],

        indexArr = _getArrayItems(index, curLevel * 2)

    var $p = ' <p class="back"><img src="img/block.png"/></p>',
        $img = '<p><img src="img/seat.png" data-role="cardImg"/></p>',
        $div = ' <div class="card">' + $p + $img + ' </div>'


    for (var i = 0; i < indexArr.length; i++) {


        $('#sourceList li').eq(indexArr[i]).attr('data-role', 'haveImg').empty().append($div)

        $('#sourceList li').eq(indexArr[i]).find('img[data-role="cardImg"]').attr({
            'src': 'img/' + $sourceLiArr[i] + '.png',
            'data-num': $sourceLiArr[i]
        })

    }
    var liWP = $('#sourceList li').width()

    $('#sourceList li').css('height', liWP)


    _time(memoryTime, $('#timeScr5'), function () {

        $('#sourceList li .card').addClass('flipped')

        $('#sourceList li .card').attr('onclick', '_checkImg(event)')

        $('.stop').show()

        $('#timeScr5').text(answerTime)
        //每次调起 答题开始时间
        sysTimeN = new Date()

        _time(answerTime, $('#timeScr5'), function () {

            clearInterval(atuoTime)

            //这里游戏自动结束时间

            sysTimeO = new Date()


            var $curTime = (sysTimeO - sysTimeN) / 1000


            _overTime($curTime, false)

            if (curLevel == 8 && curNum == 2) return;

            _screen5()

        })

    })
    /*console.log('$sourceLiArr', $sourceLiArr)*/


}

function _checkImg(e) {

    var $elCli = $(e.target).parents('li').index()
    var $elRole = $(e.target).parents('li').attr('data-role')

    if (elIndex == $elCli) return

    if ($elRole == 'result') return

    elIndex = $elCli


    // console.log('>>>>>>>>>>>>', $elCli)

    var imgEl = $(e.target).parents('.card').find('img[data-role="cardImg"]'),

        imgData = imgEl.attr('data-num');

    // console.log('curCliEl', curCliEl)

    if (curCliEl == '') {

        $(e.target).parents('.card').removeClass('flipped')

        curCliEl = imgData

    } else {

        if (imgData == curCliEl) {

            $(e.target).parents('.card').removeClass('flipped')

            setTimeout(function () {

                //翻转后显示对号
                $('body').find('img[data-num="' + curCliEl + '"]').parents('.card').addClass('result')
                $('body').find('img[data-num="' + curCliEl + '"]').parents('li').attr('data-role', 'result')
                setTimeout(function () {
                    //时隔1秒对号隐藏
                    $('body').find('.result').removeClass('result')

                }, 1000)

                curCliEl = ''

            }, 500)

            var len = $(e.target).parents('ul').find('.flipped').length

            if (len <= 0) {

                if ($('#screen3').length > 0) {

                    setTimeout(function () {
                        $('#screen3').remove()
                        $('#screen4').show()

                    }, 2000)

                } else {


                    correctNum = correctNum + 1

                    console.log('答题正确数量', correctNum)

                    setTimeout(function () {

                        clearInterval(atuoTime)


                        sysTimeO = new Date()

                        var $curTime = (sysTimeO - sysTimeN) / 1000

                        _overTime($curTime, false)

                        if (curLevel == 8 && curNum == 2) return;

                        _screen5()


                    }, 2000)

                    // console.log('这里是正式答题')
                }

            }


        } else {

            curErrorNumT = curErrorNumT + 1

            elIndex = -1

            $(e.target).parents('.card').removeClass('flipped')

            setTimeout(function () {

                $('body').find('img[data-num="' + curCliEl + '"]').parents('.card').addClass('flipped')

                $(e.target).parents('.card').addClass('flipped')

                curCliEl = ''

            }, 1000)

            // console.log('你答错了')

            if ($('#screen3').length > 0) {

                if (curErrorNumT < 2) {

                    $('#again').parents('.again').show()

                } else {

                    setTimeout(function () {
                        $('#screen3').remove()
                        $('#screen4').show()
                    }, 1500)

                }
            } else {

            }


        }


    }


}

/*** 游戏计算结束时间
 * time：当期游戏所用时间
 * stopBtn：是否是暂停按钮触发
 ***/
function _overTime(time, stopBtn) {

    if (curLevel == 4) {


        if (curNum == 1) {


            timeObj.level1.one = parseInt(timeObj.level1.one + time) > 60 ? 60 : parseInt(timeObj.level1.one + time)

            console.log('4-1', timeObj.level1.one)

        } else if (curNum == 2) {

            timeObj.level1.two = parseInt(timeObj.level1.two + time) > 60 ? 60 : parseInt(timeObj.level1.two + time)

            console.log('4-2', timeObj.level1.two)

            timeObj.level1.sum = timeObj.level1.one + timeObj.level1.two

        }


    } else if (curLevel == 5) {


        if (curNum == 1) {


            timeObj.level2.one = parseInt(timeObj.level2.one + time) > 75 ? 75 : parseInt(timeObj.level2.one + time)
            console.log('5-1', timeObj.level2.one)

        } else if (curNum == 2) {


            timeObj.level2.two = parseInt(timeObj.level2.two + time) > 75 ? 75 : parseInt(timeObj.level2.two + time)
            console.log('5-2', timeObj.level2.two)

        }

        timeObj.level2.sum = timeObj.level2.one + timeObj.level2.two

    } else if (curLevel == 6) {


        if (curNum == 1) {

            timeObj.level3.one = parseInt(timeObj.level3.one + time) > 90 ? 90 : parseInt(timeObj.level3.one + time)
            console.log('6-1', timeObj.level3.one)

        } else if (curNum == 2) {


            timeObj.level3.two = parseInt(timeObj.level3.two + time) > 90 ? 90 : parseInt(timeObj.level3.two + time)

            console.log('6-2', timeObj.level3.two)

        }

        timeObj.level3.sum = timeObj.level3.one + timeObj.level3.two

    } else if (curLevel == 7) {


        if (curNum == 1) {


            timeObj.level4.one = parseInt(timeObj.level4.one + time) > 105 ? 105 : parseInt(timeObj.level4.one + time)

            console.log('7-1', timeObj.level4.one)

        } else if (curNum == 2) {


            timeObj.level4.two = parseInt(timeObj.level4.two + time) > 105 ? 105 : parseInt(timeObj.level4.two + time)
            console.log('7-2', timeObj.level4.two)


        }

        timeObj.level4.sum = timeObj.level4.one + timeObj.level4.two

    } else if (curLevel == 8) {


        if (curNum == 1) {


            timeObj.level5.one = parseInt(timeObj.level5.one + time) > 120 ? 120 : parseInt(timeObj.level5.one + time)
            console.log('8-1', timeObj.level5.one)

        } else if (curNum == 2) {


            timeObj.level5.two = parseInt(timeObj.level5.two + time) > 120 ? 120 : parseInt(timeObj.level5.two + time)

            console.log('8-2', timeObj.level5.two)

            timeObj.level5.sum = timeObj.level5.one + timeObj.level5.two


            if (!stopBtn) {


                timeObj.sumTime = timeObj.level1.sum + timeObj.level2.sum + timeObj.level3.sum + timeObj.level4.sum + timeObj.level5.sum

                //不是暂停按钮触发

                $('#screen5').remove()

                $('#screen8').show()


                console.log('>>>>>>>>>>>>>>>>>>游戏结束', timeObj, correctNum)

                clearInterval(atuoTime)

                _over()

            }


            return

        }
    }

}


//游戏结束
function _over() {

    $('#score').text(correctNum * 100)

    /* ajax 请求接口路径，返回json 数据
     * timeObj: 游戏时间json
     * score：得分
     * */

    var param = {

        timeObj: timeObj,

        score: correctNum * 100

    }

    console.log('当前返回参数', param)

}

//游戏退出
function _out() {

    console.log('游戏退出')

}


/*** 倒计时
 * i：结束时间
 * el：倒计时填充元素
 * fn：回调
 ***/
function _time(i, el, fn) {

    var timeFn = function () {

        i = i - 1

        el.text(i)

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