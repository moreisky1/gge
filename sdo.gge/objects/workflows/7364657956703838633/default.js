var logger = {
    isLog: true,
    logType: "report",
    logName: "ДО Заявка на участие в тренинге (7364657956703838633) - default",
}

var libs = OpenCodeLib("x-local://source/gge/libs.js").getAllLibs;
var l = libs.log_lib
var dlib = libs.develop

function sendEmail(teRequest, teEvent) {
    l.write(logger, "sendEmail");
    var notifLib = libs.notif_lib
    var emailBody = '<p>Вы были включены в состав участников мероприятия "' + teEvent.name + '".</p>' +
        '<p>Дата и время начала мероприятия: ' + StrDate(teEvent.start_date, true, false) + '.</p>'+
        '<p>Дата и время завершения мероприятия: ' + StrDate(teEvent.finish_date, true, false) + '.</p>';
    var params = {
        subject: "Принята заявка на участие в мероприятии",
        body: emailBody,
        recipientIDs: [teRequest.person_id],
        resourceIDs: [],
    }
    notifLib.sendActiveNotif(params);
}

function sendEmailDecline(teRequest, teEvent) {
    l.write(logger, "sendEmail");
    var notifLib = libs.notif_lib
    var emailBody = '<p>Ваша заявка на мероприятие "' + teEvent.name + '" была отклонена.</p>'
    var params = {
        subject: "Отклонена заявка на участие в мероприятии",
        body: emailBody,
        recipientIDs: [teRequest.person_id],
        resourceIDs: [],
    }
    notifLib.sendActiveNotif(params);
}

function confirmER(teRequest, eventID) {
    l.write(logger, "confirmER");
    var foundER = ArrayOptFirstElem(XQuery("for $e in event_results where $e/person_id=" + teRequest.person_id +
    " and $e/event_id=" + eventID + " return $e"));
    if (foundER != undefined) {
        erDoc = tools.open_doc(foundER.id);
        erDoc.TopElem.is_confirm = true;
        erDoc.Save();
    }
}

try {
l.open(logger);

var eventsArr = [
    {"id": "7364670222885883608", "name": "1. Мастер-класс «Технологии креативного мышления» (развитие навыков генерации идей с использованием инструментов РТВ ТРИЗ)"},
    {"id": "7364670265537165618", "name": "2. Тренинг «Управление изменениями»"},
    {"id": "7364669609291952440", "name": "3. Тренинг «Влияние и противостояние манипуляциям»"},
    {"id": "7364670150519329980", "name": "4. Тренинг «Организация эффективной командной работы»"}
]
var traning = dlib.ceValue(curObject, "traning")
var foundEvent = ArrayOptFind(eventsArr, "name=='" + traning + "'")

if (foundEvent != undefined) {
    var teEvent = tools.open_doc(foundEvent.id).TopElem
    var countER = ArrayCount(XQuery("for $elem in event_results where event_id=" + foundEvent.id + " and is_confirm=true() return $elem"))
    if (teEvent.max_person_num.Value > countER) {
        tools.add_person_to_event(OptInt(curObject.person_id), OptInt(foundEvent.id));
        confirmER(curObject, foundEvent.id)
        sendEmail(curObject, teEvent);
        curObject.workflow_state = "approved"
        curObject.status_id = "close"
    } else {
        // l.write(logger, "else");
        sendEmailDecline(curObject, teEvent);
        curObject.workflow_state = "declined"
        curObject.status_id = "ignore"
    }
}

l.close(logger);
} catch (error) {
logger = {
    isLog: true,
    logType: "report",
    logName: "ДО Заявка на участие в тренинге (7364657956703838633) - default",
}
l.open(logger);
l.write(logger, error);
l.close(logger);
}