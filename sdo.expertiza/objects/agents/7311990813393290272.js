// 7311990813393290272 - Агент простановки фактических уровней компетенций по Excel

var logger = {
    isLog: true,
    logType: "report",
    logName: "7311990813393290272",
}

var libs = OpenCodeLib("x-local://source/gge/libs.js").getAllLibs;

var l = libs.log_lib;
var d = libs.develop;
var n = libs.notif_lib;
var p = libs.personal_lib;


try {
l.open(logger)

var url = Screen.AskFileOpen('', "Выбери файл *.xls*");
var excelObject = new ActiveXObject("Excel.Application");
var excelFile = excelObject.Workbooks.Open(url);
var excelSheet = excelFile.Worksheets(1);
// var q = Trim(UnifySpaces(excelSheet.Cells(1, 1).Value));

// l.write(logger, q)

var curRow = 5;
var maxRow = 147;
var i = 1;

var q, fio, ass_plans, pas, ass_apps;
while (curRow <= maxRow) {
    q = Trim(UnifySpaces(excelSheet.Cells(curRow, 8).Value))
    if (StrLowerCase(q) == "факт") {
        fio = Trim(UnifySpaces(excelSheet.Cells(curRow, 2).Value));
        cols = XQuery("for $e in collaborators where fullname = '" + fio + "' return $e")
        if (ArrayCount(cols) == 1) {
            pers = ArrayOptFirstElem(cols)
            ass_plans = XQuery("for $e in assessment_plans where person_id = '" + pers.id.Value + "' return $e")
            pas = XQuery("for $e in pas where person_id = '" + pers.id.Value + "' return $e")
            ass_apps = XQuery("sql: " +
            "select aas.* from assessment_appraises aas " +
            "left join assessment_appraise aa on aa.id = aas.id " +
            "where aa.data.value('(//auditorys/auditory[last()])[1]/person_id[1]', 'varchar(max)') = '" + pers.id.Value + "'" +
            "")
            l.write(logger, fio + ", ass_plans - " + ArrayCount(ass_plans) + " (" + ArrayMerge(ass_plans, "This.id", ", ") + "), ass_apps - " + ArrayCount(ass_apps) + " (" + ArrayMerge(ass_apps, "This.id", ", ") + "), pas - " + ArrayCount(pas))
        }
        
    }
    curRow++;
}

excelFile.Save();
excelObject.Application.Quit();
l.close(logger)
} catch (error) {
l.write(logger, error)
l.close(logger)
}