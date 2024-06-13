// 7252682647708184862 - Добавить в опрос вопросы по шаблону

var logger = {
    isLog: true,
    logType: "report",
    logName: "7252682647708184862",
}

var libs = OpenCodeLib("x-local://source/gge/libs.js").getAllLibs;

var l = libs.log_lib.clear;

var template_poll_id = OptInt(Param.template_poll_id);
var poll_id = OptInt(Param.poll_id);
var question_type = OptInt(Param.question_type);
var start_row = OptInt(Param.start_row);
var start_column = OptInt(Param.start_column);

if (template_poll_id == undefined || poll_id == undefined || question_type == undefined
    || start_row == undefined || start_column == undefined) {
    Cancel();
}

try {
l.open(logger);

if (!LdsIsServer) {
    
    var teTemplatePoll = tools.open_doc(template_poll_id).TopElem;
    var docPoll = tools.open_doc(poll_id);

    var url = Screen.AskFileOpen('', "Выбери файл *.xls*");
    var excelObject = new ActiveXObject("Excel.Application");
    var excelFile = excelObject.Workbooks.Open(url);
    var excelSheet = excelFile.Worksheets(1);
    var questColumn = start_column;
    var id = teTemplatePoll.questions[question_type].id.Value + 1;
    var curRow = start_row;
    while (true) {
        if (excelSheet.Cells(curRow, questColumn).Value == undefined) {break;}
        questTitle = Trim(UnifySpaces(excelSheet.Cells(curRow, questColumn).Value));
        newQ = docPoll.TopElem.questions.AddChild();
        newQ.AssignElem(teTemplatePoll.questions[question_type]);
        newQ.id = id;
        newQ.title = StrReplace(newQ.title, "questTitle", questTitle);
        curRow++;
        id++;
    }
    docPoll.Save();
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
