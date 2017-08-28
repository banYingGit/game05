/**
 * Created by banYing on 2017/8/24 0024.
 */
/* 全局变量
 */


//source 资源库
var source = [];


_event()


// 游戏内事件处理
function _event() {


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