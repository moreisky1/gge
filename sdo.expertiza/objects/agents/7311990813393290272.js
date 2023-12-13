// 7311990813393290272 - Агент простановки фактических уровней компетенций по Excel

var logger = {
    isLog: true,
    logType: "report",
    logName: "7311990813393290272",
}

var libs = OpenCodeLib("x-local://source/gge/libs.js").getAllLibs;

var l = libs.log_lib;
var d = libs.develop;
var n = libs.notif_lib;
var p = libs.personal_lib;


try {
l.open(logger)

l.write(logger, "oRsp.Beody")

l.close(logger)
} catch (error) {
l.write(logger, error)
l.close(logger)
}