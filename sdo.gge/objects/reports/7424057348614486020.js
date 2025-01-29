// 7424057348614486020 - Отчет по заявкам - Заявка на ВКС участие в мероприятии (ЦВК) 2

logger = {
    isLog: false,
    logType: "report",
    logName: "7424057348614486020",
}
var l = OpenCodeLib("x-local://source/gge/libs/log_lib.js");
var dlib = OpenCodeLib("x-local://source/gge/libs/develop.js");


try {
l.open(logger);

var arr = [];
var final_arr = [];

var event_id = OptInt(_CRITERIONS[0].value)
var cond = ""
if (event_id != undefined) {
    cond = " and object_id = " + event_id;
}
request_type_id = 7347986365819432649; // Заявка на ВКС участие в мероприятии (ЦВК)
arr = XQuery("for $elem in requests where request_type_id=" + request_type_id + cond + " return $elem");


for (elem in arr) {
    obj = {};
    for (fldElem in elem) {
        if (fldElem.Name != "id") {
            obj.SetProperty(fldElem.Name, String(fldElem));
        }
    }
    obj.SetProperty("PrimaryKey", String(elem.id));
    
    teElem = tools.open_doc(elem.id).TopElem;
    obj.fld_secondname = String(teElem.custom_elems.ObtainChildByKey("fld_secondname").value);
    obj.fld_firstname = String(teElem.custom_elems.ObtainChildByKey("fld_firstname").value);
    obj.fld_middlename = String(teElem.custom_elems.ObtainChildByKey("fld_middlename").value);
    obj.fld_organization = String(teElem.custom_elems.ObtainChildByKey("fld_organization").value);
    obj.fld_position = String(teElem.custom_elems.ObtainChildByKey("fld_position").value);
    obj.fld_email = String(teElem.custom_elems.ObtainChildByKey("fld_email").value);
    obj.fld_mobile_phone = String(teElem.custom_elems.ObtainChildByKey("fld_mobile_phone").value);
    obj.fld_gdpr = String(teElem.custom_elems.ObtainChildByKey("fld_gdpr").value);
    obj.fld_type = String(teElem.custom_elems.ObtainChildByKey("fld_type").value);

    final_arr.push(obj);
}

l.close(logger);
return final_arr;
} catch (e) {
l.write(logger, e);
l.close(logger);
}
