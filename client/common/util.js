function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()

  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatOnlyDate(date,format) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  return [year, month, day].map(formatNumber).join(format) 
}

function formatOnlyTime(date,format) {
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [hour, minute, second].map(formatNumber).join(format)
}

function formatHourAndMinu(date,format) {
  var hour = date.getHours()
  var minute = date.getMinutes()

  return [hour, minute].map(formatNumber).join(format)
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getLocalTime(now) {     
  var d = new Date(now);
  var Y = d.getFullYear();
  var M = d.getMonth() + 1;
  var day = d.getDate();
  var hour = d.getHours();
  var Min = d.getMinutes();

  if (Min < 10) {
    Min = "0" + Min;
  }

  return Y + "-" + M + "-" + day + "  " + hour + ":" + Min;
}      

function formatTimestamp(dateTimeStamp) {
    var date = new Date(dateTimeStamp);
    var time = date.getTime();
  	var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    //var diffValue = now - dateTimeStamp;
    var diffValue = now - time;
    if(diffValue < 0){return;}
    var  result="刚刚";
    var monthC =diffValue/month;
    var weekC =diffValue/(7*day);
    var dayC =diffValue/day;
    var hourC =diffValue/hour;
    var minC =diffValue/minute;
    if(monthC>=1){
      result="" + parseInt(monthC) + "月前";
    }
    else if(weekC>=1){
      result="" + parseInt(weekC) + "周前";
    }
    else if(dayC>=1){
      result=""+ parseInt(dayC) +"天前";
    }
    else if(hourC>=1){
      result=""+ parseInt(hourC) +"小时前";
    }
    else if(minC>=1){
      result=""+ parseInt(minC) +"分钟前";
    }
    return result;
}
//评论模板用
function formatTime2(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatDate(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


module.exports.formatTime = formatTime;
module.exports.formatOnlyDate = formatOnlyDate;
module.exports.formatOnlyTime = formatOnlyTime;
module.exports.formatHourAndMinu = formatHourAndMinu;
module.exports.formatNumber = formatNumber;
module.exports.formatTimestamp = formatTimestamp;
module.exports.getLocalTime = getLocalTime;
module.exports.formatTime2 = formatTime2;
module.exports.formatDate = formatDate;