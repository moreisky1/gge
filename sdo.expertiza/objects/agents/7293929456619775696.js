// 7293929456619775696 - visitor control API

// http://<имя_сайта_visitorcontrol>/api/<название_контроллера>/<название_действия>


// request = "http://10.34.70.249/api/Account/Logout"
// q = HttpRequest(request, "post", UrlEncodeQuery({key: '900649cc-39b5-4980-9f66-e5f382de2193'}));


//request = "http://10.34.70.249/api/Account/Logon"
//oResp = HttpRequest(request, "post", UrlEncodeQuery({login: 'API', password: '111111'}));

// 48e988b6-bb14-48f0-90ad-38669313e157
//if (oResp.RespCode == 200) {
//	key = tools.read_object(oResp.Body, "json").key
//	alert(key)
//}

var logger = {
    isLog: true,
    logType: "report",
    logName: "7293929456619775696",
}

var libs = OpenCodeLib("x-local://source/gge/libs.js").getAllLibs;

var l = libs.log_lib.clear;
var d = libs.develop;
var n = libs.notif_lib;
var p = libs.personal_lib;


try {
l.open(logger)

var request = "http://10.34.70.249/api/RequestTemporary/Create"

var oResp = HttpRequest(request, "post", UrlEncodeQuery({key: '48e988b6-bb14-48f0-90ad-38669313e157'}));

// if (oResp.RespCode == 200) {
//     l.write(logger, oResp.Body)
// }


l.write(logger, oResp.Body)
l.write(logger, "oResp.RespCode = " + oResp.RespCode)


l.close(logger)
} catch (error) {
l.write(logger, error)
l.close(logger)
}