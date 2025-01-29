// 7381764368079394270 - Агент по итогам внешнего обучения

var logger = {
    isLog: true,
    logType: "report",
    logName: "7381764368079394270",
}

var libs = OpenCodeLib("x-local://source/gge/libs.js").getAllLibs;
var l = libs.log_lib;
var d = libs.develop.clear;
var notif_lib = libs.notif_lib;

function sendEmail(poll_id, col, event_name) {
    var teCol = tools.open_doc(col.collaborator_id).TopElem;
    var uvazh = teCol.sex.Value == "m" ? "Уважаемый" : "Уважаемая" 
    var notifTemplateID = "7304623221202569837"; // Уведомление о необходимости пройти опрос
    var replaces = [
        {"name": "[poll_name]", "value": event_name},
        {"name": "[greeting]", "value": uvazh + " " + teCol.firstname.Value + " " + teCol.middlename.Value + "!"},
        {"name": "[url]", "value": global_settings.settings.portal_base_url.Value + "/_wt/" + poll_id},
    ];
    var obj = notif_lib.getNTSubjectBody(notifTemplateID, replaces);
    var params = {
        subject: obj.subject,
        body: obj.body,
        recipientIDs: [col.collaborator_id.Value],
        resourceIDs: [],
    }
    notif_lib.sendActiveNotif(params);
    // l.write(logger, tools.object_to_text(params, "json"));
}

function newPoll(tePollTemplate, ev) {
    docObject = tools.new_doc_by_name("poll", false);
    docObject.BindToDb(DefaultDb);
    docObject.TopElem.AssignExtraElem(tePollTemplate);
    docObject.TopElem.role_id.Clear();
    docObject.TopElem.role_id.ObtainByValue(7382180150680663109); // Опросы по внешнему обучению
    docObject.TopElem.name += " - " + ev.name.Value;
    docObject.Save();
    return docObject;
}

// function 

try {
l.open(logger);


var today = DateNewTime(Date()); // Date("08.07.2024") //
var weekDay = WeekDay(today);
// 1 2 3 4 5 6 0
// if (weekDay < 6 && weekDay > 0) { // ПН-ПТ
    var daysOffset = weekDay == 1 ? 3 : 1;
    var dateFrom = DateNewTime(DateOffset(today, -daysOffset * 86400));
    var dateTo = today;
dateFrom = DateNewTime(Date('01.11.2024'));
dateTo = DateNewTime(Date('28.12.2024'));
    var condsArr = [];
    condsArr.push("MatchSome($elem/role_id, 7316258618108953997)"); // Мероприятия 2024 года
    condsArr.push("MatchSome($elem/event_type_id, (5787283383659285610, 7181540287065047852, 7231923083885220396))"); 
// Разовое мероприятие, Программа повышения квалификации, Информационно-консультационные услуги
    condsArr.push("$elem/finish_date > date('" + dateFrom + "')");
    condsArr.push("$elem/finish_date < date('" + dateTo + "')");
    condsArr.push("$elem/id != 7451380295103257341");
    // condsArr.push("$elem/id = 7451797271123361152");
    var cond = " and " + ArrayMerge(condsArr, "This", " and ");
    var xq = "for $elem in events where 1=1 " + cond + " return $elem";
    l.write(logger, xq);
    var eventsArr = XQuery(xq);
    l.write(logger, "ArrayCount(eventsArr) = " + ArrayCount(eventsArr));
    tePollTemplate = tools.open_doc(7381860442502410013).TopElem; // 2024_external_poll - Опрос по итогам внешнего обучения
    var poll_ids = [];
    var poll_results = [];
    var foundPR;
    var counter = 0;
    for (ev in eventsArr) {
        docEvent = tools.open_doc(ev.id);
        teEvent = docEvent.TopElem;
        poll_ids = d.getAttachedObjectIDs(teEvent, 'poll');
        if (ArrayCount(poll_ids) == 0) {
            docPoll = newPoll(tePollTemplate, ev);
            catalog = docEvent.TopElem.catalogs.ObtainChildByKey("poll", "type");
            catalog.title = "Опросы";
            catalog.objects.ObtainChildByKey(docPoll.DocID);
            docEvent.Save();
    
            for (col in docEvent.TopElem.collaborators) {
                counter++;
                sendEmail(docPoll.DocID, col, ev.name.Value);
            }
        } else {
            for (col in docEvent.TopElem.collaborators) {
                xq = "for $elem in poll_results where poll_id = " + poll_ids[0] + " and status = 2 and person_id = " + col.collaborator_id.Value + " return $elem"
                foundPR = ArrayOptFirstElem(XQuery(xq)); 
                if (foundPR == undefined) {
                    counter++;
                    sendEmail(poll_ids[0], col, ev.name.Value);
                }
            }

        }
    }
    l.write(logger, "counter=" + counter);
// }

// l.write(logger, msg);
l.close(logger);
} catch (error) {
l.write(logger, error);
l.close(logger);
}