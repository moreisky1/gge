// 7352804885300467999 - Агент поиска дублей сотрудников по Excel

var logger = {
    isLog: true,
    logType: "report",
    logName: "7352804885300467999",
}

var libs = OpenCodeLib("x-local://source/gge/libs.js").getAllLibs;

var l = libs.log_lib;
var d = libs.develop;
KEY_FIELD = "fullname";

try {
l.open(logger);

if (!LdsIsServer) {
    try {
        var excelFileUrl = Screen.AskFileOpen('', 'Выбери файл&#09;*.*');
        var sourceList = OpenDoc(excelFileUrl, 'format=excel');
        var lineArray = ArrayFirstElem(sourceList.TopElem);
        var startRow = OptInt(Param.start_row, 0);
        var startColumn = OptInt(Param.start_column, 0);
        var endRow = OptInt(Param.end_row, 0);
        var endColumn = OptInt(Param.end_column, 0);
        var exist = true;
        var val = "";
        var msg = "";
        
        for (i = startRow; i < ArrayCount(lineArray); i++) {
            for (j = startColumn; j <= endColumn; j++) {
                // val = d.clearString(String(lineArray[i][j]));
                // l.write(logger, val);
                val = d.clearString(String(lineArray[i][j]));
                if (val != "") {
                    cols = ArrayCount(XQuery("for $elem in collaborators where $elem/is_dismiss=false() " + 
                    " and $elem/" + KEY_FIELD + "=" + XQueryLiteral(val) + " return $elem"));
                    if (cols != 1) {
                        msg += String(lineArray[i][j]) + " count = " + cols + "; ";
                    }
                    // isOk = isOk && exist;
                }
            }
        }
        l.write(logger, msg);
    } catch (err) {
        alert(err);
        l.write(logger, err);
        isOk = false;
    }

} else {
    l.write(logger, "Запущен на сервере");
}


l.close(logger);
} catch (error) {
l.write(logger, error);
l.close(logger);
}