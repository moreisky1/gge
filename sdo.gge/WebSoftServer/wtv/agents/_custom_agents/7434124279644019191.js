// 7434124279644019191 - Excel найти объект по полю

var logger = {
    isLog: true,
    logType: "report",
    logName: "7434124279644019191",
}

var libs = OpenCodeLib("x-local://source/gge/libs.js").getAllLibs;

var l = libs.log_lib.clear;

var catalog = Param.catalog;
var field = Param.field;
var condition = Param.condition;
var start_row = OptInt(Param.start_row);
var column = OptInt(Param.column);

if (catalog == "" || field == "" || start_row == undefined || column == undefined) {
    Cancel();
}

function getAllTestLearnings(personID, courseID, condition) {
    var addCondition = "";
    if (condition != "") {
        // addCondition = 
    } else {
        " and "
    }
    xq1 = "for $e in active_test_learnings where person_id=" + personID + " and course_id=" + courseID + " return $e";
    xq2 = "for $e in test_learnings where person_id=" + personID + " and course_id=" + courseID + " return $e";
    return ArrayOptFirstElem(ArrayUnion(XQuery(xq1), XQuery(xq2))); 
}

try {
l.open(logger);

if (!LdsIsServer) {
    var url = Screen.AskFileOpen('', "Выбери файл *.xls*");
    var excelObject = new ActiveXObject("Excel.Application");
    var excelFile = excelObject.Workbooks.Open(url);
    var excelSheet = excelFile.Worksheets(1);
    var curRow = start_row;
    var curVal = "";
    var arr = [];
    var xq = "";
    var found;
    while(true) {
        curVal = excelSheet.Cells(curRow, column).Value
        if (curVal == undefined) {break;}
        xq = "sql: " +
            "SELECT dbo." + catalog + "s.* " +
            "FROM dbo." + catalog + "s " +
            "WHERE LOWER(dbo." + catalog + "s." + field + ")=" + XQueryLiteral(StrLowerCase(curVal)) +
        "";
        // l.write(logger, xq);
        arr = XQuery(xq);
        excelSheet.Cells(curRow, 6).Value = ArrayCount(arr);

        xq = "sql: " +
            "SELECT dbo." + catalog + "s.* " +
            "FROM dbo." + catalog + "s " +
            "WHERE LOWER(dbo." + catalog + "s." + field + ")=" + XQueryLiteral(StrLowerCase(curVal)) +
        "";
        // l.write(logger, ArrayCount(arr));
        // arr = XQuery(xq);
        // l.write(logger, ArrayCount(arr));
        // found = ArrayOptFirstElem();
        // if ( != undefined) {
        //     l.write(logger, found.);
        // }
        // l.write(logger, curVal);
        curRow++;
    }
    excelFile.Save();
    excelObject.Application.Quit();

} else {
    l.write(logger, "Агент предназначен для запуска на клиенте");
}

l.close(logger);
} catch (error) {
l.write(logger, ExtractUserError(error));
l.close(logger);
}
