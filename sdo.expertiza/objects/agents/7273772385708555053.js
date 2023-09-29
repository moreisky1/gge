var logName = "agent/7273772385708555053"; // Добавить в опрос вопросы с ответами (Поддерживаю,  Не поддерживаю,  Воздержался) по Excel

try {
    EnableLog(logName, true);
    var pollID = 7273767704330849720;
    var pollDoc = tools.open_doc(pollID);

    var url = Screen.AskFileOpen('', "Выбери файл *.xls*");
    var excelObject = new ActiveXObject("Excel.Application");
    var excelFile = excelObject.Workbooks.Open(url);
    var excelSheet = excelFile.Worksheets(1);
    var questColumn = 2;
    var id = pollDoc.TopElem.questions[0].id.Value + 1;
    var curRow = 15;
    while(true) {
        if (excelSheet.Cells(curRow, questColumn).Value == undefined) {break;}
        questTitle = Trim(UnifySpaces(excelSheet.Cells(curRow, questColumn).Value));
        questTitle = '<p style="color: rgb(0, 0, 0); font-family: &quot;DIN 2014&quot;, sans-serif; font-size: 20px; font-style: normal; font-weight: 300;"><strong>' + questTitle + '</strong><p>';
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
