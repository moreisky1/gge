var agentID = "7257531068900052235"; // Агент создания мероприятий по Excel
var xq = "for $e in server_agents where id=" + agentID + " return $e";
var logName = "agent/" + ArrayOptFirstElem(XQuery(xq)).name.Value;

var nameEventCol = 2;
var dateFromCol = 3;
var dateToCol = 4;
var maxCountCol = 5;
var vcsLinkCol = 6;

var nameEvent = "";
var dateFrom = "";
var dateTo = "";
var maxCount = "";
var vcsLink = "";

var dateStr = "";
var eventTypeName = "Семинар";
var eventType = ArrayOptFirstElem(XQuery("for $elem in event_types where name='" + eventTypeName + "' return $elem"));

var me = "7241157892942218865";
var eduOrgID = "6632219763228355468"; // ФАУ «Главгосэкспертиза России»
var placeID = "471322384173288123"; // Центр взаимодействия и коммуникации в строительстве
var defaultRequestTypeID = "768614336404564681" // Заявка на включение в состав участников мероприятия

function findCollaborator(key, value) {
    var xq = "for $elem in collaborators where $elem/" + key + " = '" + value + "' return $elem";
    return ArrayOptFirstElem(XQuery(xq));
}

function plusZero(num) {
    return num < 10 ? "0" + num : num;
}

function getCode(dateStr) {
    var xq = "for $elem in events where contains($elem/code, '" + dateStr + "') return $elem";
    var count = ArrayCount(XQuery(xq));
    return count ? dateStr + "_" + count : dateStr;
}

try {
    EnableLog(logName, true);
    var roleID = OptInt(Param.role_id);
    var curRow = OptInt(Param.start_row);
    LogEvent(logName, roleID);

    var url = Screen.AskFileOpen('', "Выбери файл *.xls*");
    var excelObject = new ActiveXObject("Excel.Application");
    var excelFile = excelObject.Workbooks.Open(url);
    var excelSheet = excelFile.Worksheets(1);
    var docEvent = undefined;

    while (true) {
        if (excelSheet.Cells(curRow, nameEventCol).Value == undefined) {break;}
        nameEvent = Trim(UnifySpaces(excelSheet.Cells(curRow, nameEventCol).Value));
        dateFrom = OptDate((Trim(UnifySpaces(excelSheet.Cells(curRow, dateFromCol).Value))));
        dateTo = OptDate(Trim(UnifySpaces(excelSheet.Cells(curRow, dateToCol).Value)));
        maxCount = Trim(UnifySpaces(excelSheet.Cells(curRow, maxCountCol).Value));
        vcsLink = Trim(UnifySpaces(excelSheet.Cells(curRow, vcsLinkCol).Value));

        dateStr = Year(dateFrom) + "_" + plusZero(Month(dateFrom)) + "_" + plusZero(Day(dateFrom));

        docEvent = tools.new_doc_by_name("event", false);
        docEvent.BindToDb(DefaultDb);
        docEvent.TopElem.code = getCode(dateStr);
        docEvent.TopElem.name = nameEvent;
        docEvent.TopElem.start_date = dateFrom;
        docEvent.TopElem.finish_date = dateTo;
        docEvent.TopElem.max_person_num = maxCount;
        docEvent.TopElem.custom_elems.ObtainChildByKey("vcs_link").value = vcsLink;
        docEvent.TopElem.is_open = true;
        docEvent.TopElem.is_public = true;
        docEvent.TopElem.type_id = eventType.code;
        docEvent.TopElem.event_type_id = eventType.id;
        docEvent.TopElem.education_org_id = eduOrgID;
        docEvent.TopElem.place_id = placeID;
        docEvent.TopElem.default_request_type_id = defaultRequestTypeID;
        docEvent.TopElem.role_id.ObtainByValue(roleID);
        newTutor = docEvent.TopElem.tutors.AddChild();
        newTutor.collaborator_id = me;
        tools.common_filling("collaborator", newTutor, me);
        docEvent.Save();
        curRow++;
    }

    // excelFile.Save();
    excelObject.Application.Quit();
} catch (e) {
    LogEvent(logName, ExtractUserError(e));
} finally {
    EnableLog(logName, false);
}



