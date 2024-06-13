// 7369926575452453414 - Добавить в группу по Excel

var logger = {
    isLog: true,
    logType: "report",
    logName: "7369926575452453414",
}

var libs = OpenCodeLib("x-local://source/gge/libs.js").getAllLibs;

var l = libs.log_lib;
var d = libs.develop;
var p = libs.personal_lib;

try {
    l.open(logger);

    var excelFileUrl = Screen.AskFileOpen('', 'Выбери файл&#09;*.*');
    var sourceList = OpenDoc(excelFileUrl, 'format=excel');
    var lineArray = ArrayFirstElem(sourceList.TopElem);
    var group_id = OptInt(Param.group_id);
    var startRow = OptInt(Param.start_row, 0);
    var key_column = OptInt(Param.key_column, 0);
    var key_field = String(Param.key_field);
    
    var exist = true;
    var val = "";
    var msg = "";
    var collaboratorIDs = [];

    for (i = startRow; i < ArrayCount(lineArray); i++) {
        val = d.clearString(String(lineArray[i][key_column]));
        if (val != "") {
            colsArr = XQuery("for $elem in collaborators where $elem/" + key_field + "=" + XQueryLiteral(val) + " return $elem");
            colsCount = ArrayCount(colsArr);
            if (colsCount != 1) {
                msg += String(lineArray[i][key_column]) + " count = " + colsCount + "; ";
            } else {
                foundCol = ArrayOptFirstElem(colsArr);
                collaboratorIDs.push(foundCol.id.Value);
            }
        }
        
    }

    p.addColsToGroups(collaboratorIDs, [group_id]);

    l.write(logger, msg);
    l.close(logger);
} catch (error) {
l.write(logger, error);
l.close(logger);
}