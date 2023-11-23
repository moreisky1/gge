// 7242603536238976127 - sdo_tasks - _custom_web/lpe/sdo_tasks/remote_collections/sdo_tasks.js

var oRes = {};
oRes.error = 0;
oRes.errorText = "";
oRes.array = [];
oRes.data = {};

logger = {
    isLog: true,
    logType: "ext",
    logName: "7242603536238976127",
}
libs = OpenCodeLib("x-local://source/gge/libs.js").getAllLibs;
l = libs.log_lib
d = libs.develop.clear
p = libs.personal_lib.clear

try {
l.open(logger)

var cond = "1=1";

if (mode == "from_me") {
    cond = "object_id = " + curUserID;
} else if (mode == "to_me") {
    cond = "sec_object_id = " + curUserID;
}

var arr = XQuery("for $elem in object_datas where object_data_type_id = 7284158758529408071 and " + cond + " order by $elem/create_date descending return $elem");

var i = 0;
for (elem in arr) {
    teDoc = tools.open_doc(elem.id.Value).TopElem
    obj = {}
    obj.id = i;
    obj.code = elem.code.Value;
    obj.name = elem.name.Value;
    obj.object_fio = d.getNameInCatalogByID("collaborator", elem.object_id.Value);
    obj.sec_object_fio = d.getNameInCatalogByID("collaborator", elem.sec_object_id.Value);
    obj.create_date = elem.create_date.Value;
    obj.type = d.ceValue(teDoc, "type");
    obj.state = d.ceValue(teDoc, "state");
    obj.portal = d.ceValue(teDoc, "portal");
    obj.link = "/_wt/sdo_task/" + elem.id.Value;
    // obj.btn = '';
    oRes.array.push(obj)
    i++;
}


l.close(logger);
} catch (error) {
l.write(logger, error);
l.close(logger);
}


if (ObjectType(PAGING) == 'JsObject' && PAGING.SIZE != null) {
    PAGING.MANUAL = true;
    PAGING.TOTAL = ArrayCount(oRes.array);
    oRes.array = ArrayRange(oRes.array, OptInt(PAGING.INDEX, 0) * PAGING.SIZE, PAGING.SIZE);
}

RESULT = oRes.array;
DATA = oRes.data;
ERROR = oRes.error;
MESSAGE = oRes.errorText;