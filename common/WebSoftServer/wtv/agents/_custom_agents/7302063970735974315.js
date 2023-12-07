// 7302063970735974315 - Агент по мероприятиям опросам

var logger = {
    isLog: true,
    logType: "report",
    logName: "7302063970735974315",
}

var libs = OpenCodeLib("x-local://source/gge/libs.js").getAllLibs;

var l = libs.log_lib.clear;
var d = libs.develop;
var notif_lib = libs.notif_lib;
var p = libs.personal_lib;

function getAttachedObjectIDs(teDoc, catalogType) {
    foundCatalog = ArrayOptFirstElem( teDoc.catalogs, "This.type == '" + catalogType + "'" )
    if (foundCatalog == undefined) {
        return [];
    } else {
        return ArrayExtractKeys(foundCatalog.objects, "object_id");
    }
}

function sendEmail(prs) {
    var first = ArrayOptFirstElem(prs);
    var notifTemplateID = "7304623221202569837"; // Уведомление о необходимости пройти опрос
    var replaces = [
        {"name": "[poll_name]", "value": first.name.Value},
        {"name": "[person_fullname]", "value": first.person_fullname.Value},
        {"name": "[url]", "value": global_settings.settings.portal_base_url.Value + "/_wt/" + first.poll_id.Value},
    ];
    var obj = notif_lib.getNTSubjectBody(notifTemplateID, replaces);
    var params = {
        subject: obj.subject,
        body: obj.body,
        recipientIDs: ArrayExtract(prs, "OptInt(This.person_id)"),
        resourceIDs: [],
    }
    // notif_lib.sendActiveNotif(params);
    l.write(logger, tools.object_to_text(params, "json"));
}

try {
l.open(logger)
var prs = [];
var all_prs = [];
var percent = 0;
for (elem in tools.read_object(Param.events)) {
    teDoc = tools.open_doc(elem.event_id).TopElem;
    l.write(logger, teDoc.id.Value + " - " + teDoc.name.Value);
    var objectIDs = [];
    pollIDs = getAttachedObjectIDs(teDoc, "poll");

    for (pollID in pollIDs) {
        all_prs = XQuery("for $elem in poll_results where poll_id=" + pollID + " return $elem");
        if (ArrayCount(all_prs) > 0) {
            prs = XQuery("for $elem in poll_results where poll_id=" + pollID + " and status != 2 return $elem");
            percent = OptReal(ArrayCount(prs)) / OptReal(ArrayCount(all_prs));
            if (percent > 0.2) sendEmail(prs);
        }

    }

    // l.write(logger, error)
}

l.close(logger)
} catch (error) {
l.write(logger, error)
l.close(logger)
}