var logName = "7250460865990632385"; // Агент включения в мероприятие по Excel

function findCollaborator(key, value) {
    var xq = "for $elem in collaborators where $elem/" + key + " = '" + value + "' return $elem";
    return ArrayOptFirstElem(XQuery(xq));
}

try {
    EnableLog(logName, true);
    var eventID = OptInt(Param.event_id);
    var curRow = OptInt(Param.start_row);
    var emailColumn = OptInt(Param.email_column);
    var protocolColumn = OptInt(Param.protocol_column);
    var url = Screen.AskFileOpen('', "Выбери файл *.xls*");
    var excelObject = new ActiveXObject("Excel.Application");
    var excelFile = excelObject.Workbooks.Open(url);
    var excelSheet = excelFile.Worksheets(1);
    var foundCol = undefined;
    var email = "";
    while(true) {
        if (excelSheet.Cells(curRow, emailColumn).Value == undefined) {break;}
        email = Trim(UnifySpaces(excelSheet.Cells(curRow, emailColumn).Value));
        foundCol = findCollaborator("email", email);
        if (foundCol != undefined) {
            tools.add_person_to_event(foundCol.id.Value, eventID);
        } else {
            excelSheet.Cells(curRow, protocolColumn).Value = "Не найден";
        }
        curRow++;
    }
    excelFile.Save();
    excelObject.Application.Quit();
} catch (e) {
    LogEvent(logName, ExtractUserError(e));
} finally {
    EnableLog(logName, false);
}
