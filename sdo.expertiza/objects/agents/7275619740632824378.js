var logName = "7275619740632824378"; // Добавить в опрос вопросы с ответами от 0 до 10 по Excel

try {
    EnableLog(logName, true);
    var pollID = 7252665614818433949;
    var pollDoc = tools.open_doc(pollID);

    var url = Screen.AskFileOpen('', "Выбери файл *.xls*");
    var excelObject = new ActiveXObject("Excel.Application");
    var excelFile = excelObject.Workbooks.Open(url);
    var excelSheet = excelFile.Worksheets(1);
    var questColumn = 1;
    var id = pollDoc.TopElem.questions[0].id.Value + 1;
    var curRow = 2;
    while(true) {
        if (excelSheet.Cells(curRow, questColumn).Value == undefined) {break;}
        questTitle = Trim(UnifySpaces(excelSheet.Cells(curRow, questColumn).Value));
        newQ = pollDoc.TopElem.questions.AddChild();
        newQ.AssignElem(pollDoc.TopElem.questions[0]);
        newQ.id = id;
        newQ.title = questTitle;
        curRow++;
        id++;
    }
    pollDoc.Save();
    excelFile.Save();
    excelObject.Application.Quit();
} catch (e) {
    LogEvent(logName, ExtractUserError(e));
} finally {
    EnableLog(logName, false);
}