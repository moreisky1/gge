// 7267828615269255554 - Изменить роль доступа по группе

var logger = {
    isLog: true,
    logType: "report",
    logName: "7267828615269255554",
}

var libs = OpenCodeLib("x-local://source/gge/libs.js").getAllLibs;
var l = libs.log_lib;

function check(Param) {
    var isOk = Param.group_id != "" && Param.access_role != "" && 
        ArrayOptFirstElem(XQuery("for $elem in groups where $elem/id = " + Param.group_id + " return $elem")) != undefined
    return isOk
}


try {
l.open(logger);

if (check(Param)) {
    arr = XQuery("for $e in group_collaborators where $e/group_id=" + Param.group_id + " return $e")
    for (elem in arr) {
        try {
            colDoc = tools.open_doc(elem.collaborator_id)
            colDoc.TopElem.access.access_role = Param.access_role
            colDoc.Save();
            l.write(logger, elem.collaborator_fullname.Value + " - " + colDoc.TopElem.access.access_role.Value);
        } catch (e) {
            l.write(logger, e);
            continue;
        }
    }
} else {
    alert("Заполните параметры работы агента")
}


l.close(logger);
} catch (error) {
l.write(logger, error);
l.close(logger);
}
