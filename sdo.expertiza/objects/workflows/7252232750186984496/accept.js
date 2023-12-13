var logger = {
    isLog: true,
    logType: "report",
    logName: "Включение в состав участников мероприятия - accept",
}

var libs = OpenCodeLib("x-local://source/gge/libs.js").getAllLibs;
var l = libs.log_lib

function sendEmail(teRequest, teEvent) {
    l.write(logger, "sendEmail");
    var notifLib = libs.notif_lib
    var partFormat = teRequest.custom_elems.ObtainChildByKey("part_format").value;
    var emailBody = '<p>Вы были включены в состав участников мероприятия "' + teEvent.name + '".</p>' +
        '<p>Формат участия: ' + partFormat + '</p>' +
        '<p>Дата и время начала мероприятия: ' + StrDate(teEvent.start_date, true, false) + '.</p>'+
        '<p>Дата и время завершения мероприятия: ' + StrDate(teEvent.finish_date, true, false) + '.</p>';
    
    if (teEvent.custom_elems.ObtainChildByKey("vcs_link").value != "" && partFormat == "ВКС") {
        emailBody += "<p>Ссылка для подключения: " + teEvent.custom_elems.ObtainChildByKey("vcs_link").value + ".</p>";
    }
    var params = {
        subject: "Принята заявка на участие в мероприятии",
        body: emailBody,
        recipientIDs: [teRequest.person_id],
        resourceIDs: [],
    }
    notifLib.sendActiveNotif(params);
}

function confirmER(teRequest) {
    l.write(logger, "confirmER");
    var foundER = ArrayOptFirstElem(XQuery("for $e in event_results where $e/person_id=" + teRequest.person_id +
    " and $e/event_id=" + teRequest.object_id + " return $e"));
    if (foundER != undefined) {
        erDoc = tools.open_doc(foundER.id);
        erDoc.TopElem.is_confirm = true;
        erDoc.Save();
    }
}

function hideFormatPart(teRequest, teEvent) {
    l.write(logger, "hideFormatPart");
    var countOchnoRequests = ArrayCount(XQuery("for $elem in requests where object_id = " + teRequest.object_id + 
    " and doc-contains($elem/id,'','[part_format=Очно]') return $elem"));
    var show = countOchnoRequests + 1 < OptInt(teEvent.custom_elems.ObtainChildByKey("max_person").value.Value)
    custom_templates.request_type.items.ObtainChildByKey(teRequest.request_type_id.Value).fields.ObtainChildByKey("part_format").disp_web.Value = show;
    custom_templates.Doc.Save();
}


try {
l.open(logger);

if (curObject.custom_elems.ObtainChildByKey("part_format").value == "") {
    curObject.custom_elems.ObtainChildByKey("part_format").value = "ВКС";
    curObject.Doc.Save()
}

var docEvent = tools.open_doc(curObject.object_id);
var teEvent = docEvent.TopElem;
var partFormat = curObject.custom_elems.ObtainChildByKey("part_format").value;

if (partFormat == "Очно" && OptInt(teEvent.custom_elems.ObtainChildByKey("max_person").value.Value) != undefined) {
    hideFormatPart(curObject, teEvent);
}

tools.add_person_to_event(curObject.person_id, curObject.object_id);
confirmER(curObject);
sendEmail(curObject, teEvent);


l.close(logger);
} catch (error) {
logger = {
    isLog: true,
    logType: "report",
    logName: "Включение в состав участников мероприятия - accept",
}
l.open(logger);
l.write(logger, error);
l.close(logger);
}