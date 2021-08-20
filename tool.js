/**
 * 常用代码组合
 */

/**
 * Remove an item from an array
 * arr []
 * item string|number|object
 */
export function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

/**
 * Parse simple path.
 * 把一个形如'data.a.b.c'的字符串路径所表示的值，从真实的data对象中取出来
 * 例如：
 * data = {a:{b:{c:2}}}
 * parsePath('a.b.c')(data)  // 2
 */
const bailRE = /[^\w.$]/;
export function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }
  const segments = path.split(".");
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return;
      obj = obj[segments[i]];
    }
    return obj;
  };
}

/**
 * 深拷贝
 */
export function deepClone(obj) {
  var target = {};
  if (obj === null) return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (typeof obj !== "object") return obj;
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      target[i] = obj[i];
    }
  }
  return target;
}

/**
 *防抖函数
 * var debounceFunc= debounce(1000,fn);
 * debounceFunc(value)
 */
export function debounce(delay, callback) {
  let timer;
  return function (value) {
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback(value);
    }, delay);
  };
}

/***
 *节流函数
 *func function(){}
 * wait 1000 一秒钟
 */
export function thro(func, wait) {
  let timerOut;
  return function () {
    if (!timerOut) {
      timerOut = setTimeout(function () {
        func();
        timerOut = null;
      }, wait);
    }
  };
}

/**
 *发布订阅模式
 */
export function Event() {
  var list = {},
    listen,
    trigger,
    remove;
  listen = function (key, fn) {
    if (!list[key]) {
      list[key] = [];
    }
    list[key].push(fn);
  };
  trigger = function () {
    // 对应的key 取出来
    var key = Array.prototype.shift.call(arguments);
    var fns = list[key];
    if (!fns || fns.length == 0) {
      return;
    }
    for (var i = 0; fn; fn = fns[i++]) {
      // fn.apply(this,arguments)
      fn(...arguments);
    }
  };
  remove = function () {
    var fns = list[key];
    if (!fns) return false;
    if (!fn) {
      fn && (fns.length = 0);
    } else {
      for (var i = fns.length - 1; i >= 0; i--) {
        var _fn = fns[i];
        if (_fn == fn) {
          fns.splice(i, 1);
        }
      }
    }
  };
  return {
    listen,
    trigger,
    remove,
  };
}

/**
 * 导出并下载
 */
export function export4Excel() {
  $.ajax({
    url: "http://10.83.100.10:8100/gateway-health/fdoctor/excel/",
    type: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: "{}",
    responseType: "blob",
    success: function (msg) {
      const blob = new Blob([msg], { type: "application/vnd.ms-excel" });
      const fileName = "表名称.xls";
      if ("download" in document.createElement("a")) {
        // 非IE下载
        const elink = document.createElement("a");
        elink.download = fileName;
        elink.style.display = "none";
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
      } else {
        // IE10+下载
        navigator.msSaveBlob(blob, fileName);
      }
    },
    error: function (e) {},
  });
}
