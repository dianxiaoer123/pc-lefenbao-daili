/** 
 * 时间戳格式化函数 
 * @param  {string} format    格式 
 * @param  {int}    timestamp 要格式化的时间 默认为当前时间 
 * @return {string}           格式化的时间字符串 
 */
export function dateFormat(now){ 
    var year = now.getFullYear();
    var month = (now.getMonth() + 1) > 9?(now.getMonth() + 1):'0'+(now.getMonth() + 1);
    var date = now.getDate() > 9 ?now.getDate():'0'+now.getDate();
    var hour = now.getHours() > 9 ? now.getHours():"0"+now.getHours();
    var minute = now.getMinutes() > 9 ? now.getMinutes():"0"+now.getMinutes();
    var second = now.getSeconds() > 9 ? now.getSeconds():"0"+now.getSeconds();
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}
