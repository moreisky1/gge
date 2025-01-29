// 7453432027637879944 - Отчет по итогам внешнего обучения

logger = {
    isLog: true,
    logType: "report",
    logName: "7453432027637879944",
}

var l = OpenCodeLib("x-local://source/gge/libs/log_lib.js");
var p = OpenCodeLib("x-local://source/gge/libs/personal_lib.js");
var d = OpenCodeLib("x-local://source/gge/libs/develop.js");

try {
l.open(logger);

var dateFrom = DateNewTime(OptDate(_CRITERIONS[0].value));
var dateTo = DateNewTime(OptDate(_CRITERIONS[1].value));
var condsArr = [];
condsArr.push("MatchSome($elem/role_id, 7316258618108953997)"); // Мероприятия 2024 года
condsArr.push("MatchSome($elem/event_type_id, (5787283383659285610, 7181540287065047852, 7231923083885220396))"); 
// Разовое мероприятие, Программа повышения квалификации, Информационно-консультационные услуги
condsArr.push("$elem/finish_date > date('" + dateFrom + "')");
condsArr.push("$elem/finish_date < date('" + dateTo + "')");
var cond = " and " + ArrayMerge(condsArr, "This", " and ");
var xq = "for $elem in events where 1=1 " + cond + " return $elem";
var arr = XQuery(xq);
var final_arr = [];

for (elem in arr) {
    teEvent = tools.open_doc(elem.id).TopElem;
    obj = {};
    for (fldElem in elem) {
        if (fldElem.Name != "id") {
            obj.SetProperty(fldElem.Name, String(fldElem));
        }
    }
    obj.SetProperty("PrimaryKey", String(elem.id));
    poll_ids = d.getAttachedObjectIDs(teEvent, 'poll');
    obj.poll_ids = ArrayCount(poll_ids);
    obj.event_collaborators = ArrayCount(teEvent.collaborators);
    if (ArrayCount(poll_ids)) {
        obj.poll_results = ArrayCount(XQuery("for $elem in poll_results where poll_id = " + poll_ids[0] + " and status=2 return $elem"));
    } else {
        obj.poll_results = 0;
    }
    
    final_arr.push(obj);
}

l.close(logger);
return final_arr;
} catch (error) {
l.write(logger, error);
l.close(logger);
return [];
}

