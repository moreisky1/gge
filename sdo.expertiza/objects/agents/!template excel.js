var logName = "7242208022362212205"; // temp 2 excel

try {
    EnableLog(logName, true);
    var curRow = 2;
    var mainColumn = 1;
    var url = Screen.AskFileOpen('', "Выбери файл *.xls*");
    var excelObject = new ActiveXObject("Excel.Application");
    var excelFile = excelObject.Workbooks.Open(url);
    var excelSheet = excelFile.Worksheets(1);
    var foundCol = undefined;
    var email = "";
    while(true) {
        if (excelSheet.Cells(curRow, mainColumn).Value == undefined) {break;}
        curRow++;
    }
    excelFile.Save();
    excelObject.Application.Quit();
    alert(curRow);
} catch (e) {
    LogEvent(logName, ExtractUserError(e));
} finally {
    EnableLog(logName, false);
}

