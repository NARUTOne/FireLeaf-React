
// 千分符
const numPoints = (str) => {
  str = str+'';
  return str.replace(/(?=(?!\b)(\d{3})+$)/g, ',');
};

const toRound = (digit, length) =>{
  length = length ? parseInt(length) : 0;  
  if (length <= 0) return Math.ceil(digit);  
  digit = Math.ceil(digit * Math.pow(10, length)) / Math.pow(10, length);  
  return digit;    
};

const emptyObj = (obj) => { // json 判断属性
  for (var prop in obj){
    if(obj.hasOwnProperty(prop))
    {
      return false;
    }
  }
  return true;
};

const toDouble = (num) => {
  let str = num.toString();
  str = str > 10 ? str : '0'+str;
  return str;
};

// 数组去重

const uniqueArray = (array) => {
  var r = [];
  for(var i = 0, l = array.length; i < l; i++) {
    for(var j = i + 1; j < l; j++)
      if (array[i] === array[j]) j = ++i;
    r.push(array[i]);
  }
  return r;
};

// 数组取max
const maxArrNum = (arr) => {
  return arr.reduce((a, b) => {
    return Math.max(a, b);
  });
};

const isEquivalent = (a, b) => {
    // 获取对象属性的所有的键
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // 如果键的数量不同，那么两个对象内容也不同
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0, len = aProps.length; i < len; i++) {
        var propName = aProps[i];

        // 如果对应的值不同，那么对象内容也不同
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    return true;
};

// 三角函数画直线中间的箭头
const drawLineArrow = (x1, y1, x2, y2) =>{  
      var path;  
      var slopy, cosy, siny;  
      var Par=10.0;  
      var x3, y3;  
      slopy=Math.atan2((y1-y2), (x1-x2));     
      cosy=Math.cos(slopy);     
      siny=Math.sin(slopy);   
       
      path="M"+x1+","+y1;  
           
      x3=(Number(x1)+Number(x2))/2;  
      y3=(Number(y1)+Number(y2))/2;  
  
  
      path +=" L"+x3+","+y3;  
    
      path +=" L"+(Number(x3)+Number(Par*cosy-(Par/2.0*siny)))+","+(Number(y3)+Number(Par*siny+(Par/2.0*cosy)));  
      path +=" L"+x3+","+y3; 
      path +=" L"+(Number(x3)+Number(Par*cosy+Par/2.0*siny)+","+ (Number(y3)-Number(Par/2.0*cosy-Par*siny)));  

      path +=" L"+x3+","+y3 + " L"+x2+","+y2;  
  
  
      return path;  
};

const deepCopy = (o) => {
  if (o instanceof Array) {
    const n = [];
    for (let i = 0; i < o.length; ++i) {
      n[i] = deepCopy(o[i]);
    }
    return n;

  } else if (o instanceof Object) {
    const n = {};
    let i;
    for (i in o) {
      n[i] = deepCopy(o[i]);
    }
    return n;
  } else {
    return o;
  }
};


const extend = (obj1, obj2) =>{
  for(var key in obj2){
    if(obj1.hasOwnProperty(key)&&obj1[key])continue; // 有相同的属性则略过
    obj1[key]=obj2[key];
  }
  return obj1;
};

// 容量转换
const btSize = (size) => {
  const types = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const k = 1024;
  if(typeof size == 'string') {
    var num = parseFloat(size);
    var unit = size.replace(num, '');
    var i = types.indexOf(unit.trim().toUpperCase());
    if( i < 0) {
      return 0;
    }
    else {
      return parseInt(num * Math.pow(k, i));
    }
  }
  else if (typeof size == 'number') {
    return size;
  }
  return 0;
};

// 时间范围生成
function rangeDate(min, max) {
  const  dates = [];
  const  days = (new Date(max) - new Date(min))/1000/60/60/24;
  const  len = Math.floor(days) + 1;

  let i = 0;

  for(; i< len; i++){
    dates.push(format(new Date(min).getTime()+1000*60*60*24*i));
  } 
  return  dates; 

  function format(date) {
    var dateString = new Date(date),
        month = (dateString.getMonth() + 1) < 10 ? '0'+ (dateString.getMonth() + 1): (dateString.getMonth() + 1),
        day = dateString.getDate() < 10 ? '0'+ dateString.getDate() : dateString.getDate();
    return dateString.getFullYear() + '-' + month + '-' + day;
  }
}

// xhr  data 解析

function xhrSetData(data) {
  const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';
  const isArray = arr => Array.isArray(arr);

  let sendData = data;
  if (isObject(sendData)) {
    sendData = Object.assign({}, sendData);
    sendData = Object.keys(sendData).map(key => {
      let value = sendData[key];
      if (isArray(value) || isObject(value)) {
        value = JSON.stringify(value);
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }).join('&');

    return sendData;
  }
  else {
     throw  new Error('xhr data is not an object !');
  }
}


// Tree data callback of one node

function arrayTreeCallBack(treeNodes, Fn, options) {
  if (!treeNodes || !treeNodes.length) return;
  options = options || {};
  options.childrenKeyName = options.childrenKeyName || 'children';
  
  function treeMap(tree) {
    return tree.map((item, i) => {
      item = Fn(item, i);

      if(item[options.childrenKeyName] && item[options.childrenKeyName].length) {
        const children = item[options.childrenKeyName];
        item[options.childrenKeyName] = treeMap(children);
      }

      return item;
    });
  }

  return treeMap(treeNodes);
}

const util = function () {
  this.name = 'tools';
};

util.prototype = {
  numPoints,
  emptyObj,
  toDouble,
  uniqueArray,
  isEquivalent,
  maxArrNum,
  drawLineArrow,
  deepCopy,
  extend,
  btSize,
  toRound,
  rangeDate,
  xhrSetData,
  arrayTreeCallBack
};

const tools = new util();

export default tools;
