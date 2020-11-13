// $sh.base64.decode()        base64加密
// $sh.base64.encode()        base64解密
// $sh.showZZ()               显示一个z-index99998的黑色遮罩
// $sh.closeZZ()              取消遮罩
// $sh.formD(json)                将json转化为URLSearchParams
// $sh.getUrlString(STR)           获取url中的字段的值
// $sh.getCookie()                获取cookie
// $sh.setCookie(name,key,minute)                设置cookie  名字，key，过期时间（分钟）
let $sh={

//base64编解码//解决原生abot中文乱码问题
base64 : {
  encode(str) {
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(
        match,
        p1
      ) {
        return String.fromCharCode("0x" + p1);
      })
    );
  },
  decode(str) {
    return decodeURIComponent(
      atob(str)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  },
},
//获取url的参数
getUrlString(req){
        let ID = location.href;
        let GRIDID = ID.match("(?<=" + req + "=)\\w*")[0];
        return GRIDID
},

////添加遮罩，z-index 99998
showZZ(){
            $('body').before(`<div id="kjsfi234129" style="height:100vh;width:100vw; position: fixed; top:0;left:0; background-color: rgb(0 0 0 / 74%);z-index:99998"></div>`)
},
closeZZ() {
            $("#kjsfi234129").remove()
},

///将json对象遍历未urlencoded对象
formD(obj){
        const formData = new URLSearchParams();
        Object.keys(obj).forEach((key) => {
          if (obj[key] instanceof Array) {
            obj[key].forEach((item) => {
              formData.append(key, item);
            });
            return;
          }
          formData.append(key, obj[key]);
        });
        return formData;
},
      
setCookie(cname,cvalue,minute){
  var d = new Date();
  d.setTime(d.getTime()+(minute*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
},

getCookie(cname){
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) 
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}


}