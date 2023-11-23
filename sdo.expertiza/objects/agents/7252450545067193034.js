var logger = {
    isLog: true,
    logType: "report",
    logName: "7252450545067193034",
}
var libs = OpenCodeLib("x-local://source/gge/libs.js").getAllLibs;

var l = libs.log_lib;
var d = libs.develop;
// var n = libs.notif_lib;
var p = libs.personal_lib;

function sendEmail(coll_id, person_id, ass_app_id) {
    var n = libs.notif_lib;
    var notif_template_id = OptInt(Param.notif_template_id);
    var teCol = tools.open_doc(coll_id).TopElem;
    var tePerson = tools.open_doc(person_id).TopElem;
    var replaces = [
        {"name": "[fullname]", "value": String(teCol.fullname)},
        {"name": "[person_fullname]", "value": String(tePerson.fullname)},
        {"name": "[url]", "value": "http://sdo.expertiza.ru/appr_player.html?assessment_appraise_id=" + ass_app_id}
    ];
    var obj = n.getNTSubjectBody(notif_template_id, replaces);
    var params = {
        subject: obj.subject,
        body: obj.body,
        recipientIDs: [coll_id],
        resourceIDs: [],
    }
    n.sendActiveNotif(params);
}

function createAssApp() {
    var template_ass_app_id = OptInt(Param.template_ass_app_id);
    var ass_app_role_id = 7249616588246769367;

    var ass_app = tools.read_object(Param.ass_app, "json")[0];
    var ass_app_start_date = ass_app.start_date;
    var ass_app_end_date = ass_app.end_date;
    var ass_app_code = ass_app.code;

    var template = tools.open_doc(template_ass_app_id);

    var docAssApp = tools.new_doc_by_name("assessment_appraise", false);
    docAssApp.BindToDb(DefaultDb);
    docAssApp.TopElem.AssignExtraElem(template.TopElem);
    docAssApp.TopElem.role_id.ObtainByValue(ass_app_role_id);
    docAssApp.TopElem.code = ass_app_code;
    docAssApp.TopElem.start_date = ass_app_start_date;
    docAssApp.TopElem.end_date = ass_app_end_date;
    docAssApp.TopElem.groups.Clear();
    docAssApp.TopElem.auditorys.Clear();    
    docAssApp.Save();
    
    return docAssApp;
}

function createGroup() {
    var group_role_id = 6901314200273231950;

    var group = tools.read_object(Param.group, "json")[0];
    var group_code = group.code;
    var group_name = group.name;

    docGroup = tools.new_doc_by_name("group", false);
    docGroup.BindToDb(DefaultDb);
    docGroup.TopElem.role_id.ObtainByValue(group_role_id);
    docGroup.TopElem.code = group_code;
    docGroup.TopElem.name = group_name;            
    docGroup.Save();

    return docGroup;
}

try {
l.open(logger);

MAX_MANAGERS = OptInt(Param.MAX_MANAGERS); // Кол-во столбцов в Excel файле Руководителей
MAX_COLLEGUES = OptInt(Param.MAX_COLLEGUES); // Кол-во столбцов в Excel файле Коллег
MAX_STAFF = OptInt(Param.MAX_STAFF); // Кол-во столбцов в Excel файле Подчиненных
KEY_FIELD = "fullname";

if (!LdsIsServer) {
    var isOk = true;
    var msg = ""
    try {
        var excelFileUrl = Screen.AskFileOpen('', 'Выбери файл&#09;*.*');
        var sourceList = OpenDoc(excelFileUrl, 'format=excel');
        var lineArray = ArrayFirstElem(sourceList.TopElem);
        var startRow = OptInt(Param.start_row, 1); // row from 0
        var startColumn = OptInt(Param.start_column, 0); // column from 0
        var exist = true;
        var val = "";
        
        for (i = startRow; i < ArrayCount(lineArray); i++) {
            for (j = startColumn; j < MAX_MANAGERS + MAX_COLLEGUES + MAX_STAFF + 1; j++) {
                val = d.clearString(String(lineArray[i][j]));
                if (val != "") {
                    exist = d.existInCatalogByKey("collaborator", KEY_FIELD, val);
                    if (exist == false) {
                        msg += String(lineArray[i][j]) + " not found; ";
                    }
                    isOk = isOk && exist;
                }
            }
        }
    } catch (err) {
        alert(err);
        l.write(logger, err);
        isOk = false;
    }

    if (isOk) {

        for (i = startRow; i < ArrayCount(lineArray); i++) {
            personValue = d.clearString(String(lineArray[i][startColumn]));
            foundPerson = ArrayOptFirstElem(XQuery("for $elem in collaborators where $elem/" + KEY_FIELD + " = '" + personValue + "' return $elem"));
            
            docAssApp = createAssApp();
            docGroup = createGroup();
            p.addColsToGroups([foundPerson.id], [docGroup.DocID]);
            newGroup = docAssApp.TopElem.groups.AddChild();
            newGroup.group_id = docGroup.DocID;
            docAssApp.Save();

            tools_ass.generate_assessment_plan(docAssApp.DocID, true, true, true, undefined, undefined, docGroup.DocID);

            foundAssPlan = ArrayOptFirstElem(XQuery("for $elem in assessment_plans where $elem/assessment_appraise_id = " +
                docAssApp.DocID + " and $elem/person_id = " + foundPerson.id + " return $elem"));
            if (foundAssPlan != undefined) {
                docAssPlan = tools.open_doc(foundAssPlan.id);

                tools_ass.generate_participant(docAssApp.DocID, docAssApp.TopElem.participants.GetOptChildByKey("self"), docAssPlan.TopElem, null, docAssPlan.TopElem, foundPerson.id, true, null);    
                
                sendEmail(foundPerson.id, foundPerson.id, docAssApp.DocID);
                
                for (j = startColumn + 1; j < (startColumn + MAX_MANAGERS + 1); j++) {
                    collValue = d.clearString(String(lineArray[i][j]));
                    foundColl = ArrayOptFirstElem(XQuery("for $elem in collaborators where $elem/" + KEY_FIELD + " = '" + collValue + "' return $elem"));
                    
                    tools_ass.generate_participant(docAssApp.DocID, docAssApp.TopElem.participants.GetOptChildByKey("manager"), docAssPlan.TopElem, null, docAssPlan.TopElem, foundColl.id, true, null);
                    
                    sendEmail(foundColl.id, foundPerson.id, docAssApp.DocID);
                }
                for (n = (startColumn + MAX_MANAGERS + 1); n < (startColumn + MAX_MANAGERS + MAX_COLLEGUES + 1); n++) {
                    collValue = d.clearString(String(lineArray[i][n]));
                    foundColl = ArrayOptFirstElem(XQuery("for $elem in collaborators where $elem/" + KEY_FIELD + " = '" + collValue + "' return $elem"));
                    
                    tools_ass.generate_participant(docAssApp.DocID, docAssApp.TopElem.participants.GetOptChildByKey("coll"), docAssPlan.TopElem, null, docAssPlan.TopElem, foundColl.id, true, null);
                    
                    sendEmail(foundColl.id, foundPerson.id, docAssApp.DocID);
                }
                for (k = (startColumn + MAX_MANAGERS + MAX_COLLEGUES + 1); k < (startColumn + MAX_MANAGERS + MAX_COLLEGUES + MAX_STAFF + 1); k++) {
                    collValue = d.clearString(String(lineArray[i][k]));
                    foundColl = ArrayOptFirstElem(XQuery("for $elem in collaborators where $elem/" + KEY_FIELD + " = '" + collValue + "' return $elem"));
                    
                    tools_ass.generate_participant(docAssApp.DocID, docAssApp.TopElem.participants.GetOptChildByKey("staff"), docAssPlan.TopElem, null, docAssPlan.TopElem, foundColl.id, true, null);
                    
                    sendEmail(foundColl.id, foundPerson.id, docAssApp.DocID);
                }
            }
        }

    } else {
        l.write(logger, msg);
        alert(msg);
    }

} else {
    l.write(logger, "Запущен на сервере");
}


l.close(logger);
} catch (error) {
l.write(logger, error);
l.close(logger);
}