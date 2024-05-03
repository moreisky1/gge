// 7359202421058382912 - Агент создания test_learnings по excel

var logger = {
    isLog: true,
    logType: "report",
    logName: "7359202421058382912",
}

var libs = OpenCodeLib("x-local://source/gge/libs.js").getAllLibs;

var l = libs.log_lib;
var d = libs.develop;

function createTL(foundCol, teTemplate, mydate, percent) {
    var iPersonID = foundCol.id.Value;
    docLearning = OpenNewDoc( 'x-local://wtv/wtv_test_learning.xmd' );
    docLearning.BindToDb( DefaultDb );
    docLearning.TopElem.AssignExtraElem(teTemplate); // хрень со временем модулей
    var learningDoc = docLearning.TopElem;
    var randomTime = (learningDoc.time.Value * Random(80, 120) ) / 100
    learningDoc.time = randomTime
    learningDoc.last_usage_date = DateOffset(mydate, randomTime / 1000);
    learningDoc.start_usage_date = mydate;
    learningDoc.start_learning_date = mydate;
    learningDoc.person_id = iPersonID;
    tools.common_filling( 'collaborator', learningDoc, iPersonID );

    learningDoc.question_answered_num = learningDoc.question_num
    var randomScore = (learningDoc.question_num.Value * percent) / 100
    learningDoc.sections[0].score = randomScore
    learningDoc.question_passed_num = randomScore
    learningDoc.score = randomScore;
    learningDoc.state_id = 4;
    learningDoc.doc_info.creation.date = mydate
    learningDoc.doc_info.creation.user_login = foundCol.login.Value
    learningDoc.doc_info.creation.user_id = iPersonID
    learningDoc.doc_info.modification.user_login = foundCol.login.Value
    docLearning.Save();
    l.write(logger, docLearning.DocID)
}

function createWOtemplate(foundCol, testId, mydate, percent) {
    var testDoc = tools.open_doc(testId) 
    var iPersonID = foundCol.id.Value;
    docLearning = OpenNewDoc( 'x-local://wtv/wtv_test_learning.xmd' );
    docLearning.BindToDb( DefaultDb );
    var learningDoc = docLearning.TopElem;
    var randomTime = (4212345 * Random(80, 120) ) / 100
    learningDoc.assessment_id = testDoc.DocID
    learningDoc.assessment_name = testDoc.TopElem.title.Value
    learningDoc.assessment_code = testDoc.TopElem.code.Value
    learningDoc.time = randomTime
    learningDoc.last_usage_date = DateOffset(mydate, randomTime / 1000);
    learningDoc.start_usage_date = mydate;
    learningDoc.start_learning_date = mydate;
    learningDoc.person_id = iPersonID;
    tools.common_filling( 'collaborator', learningDoc, iPersonID );
    var itemsCount = ArrayCount(testDoc.TopElem.sections[0].items)
    learningDoc.max_score = itemsCount
    learningDoc.question_num = itemsCount
    learningDoc.question_answered_num = itemsCount
    var randomScore = (itemsCount * percent) / 100
    var section = learningDoc.sections.AddChild()
    section.score = randomScore
    learningDoc.question_passed_num = randomScore
    learningDoc.score = randomScore;
    learningDoc.state_id = 4;
    learningDoc.doc_info.creation.date = mydate
    learningDoc.doc_info.creation.user_login = foundCol.login.Value
    learningDoc.doc_info.creation.user_id = iPersonID
    learningDoc.doc_info.modification.user_login = foundCol.login.Value
    docLearning.Save();
    l.write(logger, docLearning.DocID)
}
try {
l.open(logger);

if (LdsIsServer) {
    var file_name = "Копия Данные тестирования1.xlsx"
    file_name = "Копия Данные тестирования2.xlsx"
    var oExcelDoc = tools.get_object_assembly("Excel");
    var excelFileUrl = UrlToFilePath("x-local://wtv/excel_files/" + file_name);
    oExcelDoc.Open(excelFileUrl);
    var oWorksheet = oExcelDoc.GetWorksheet(0);
    var startRow = 2;
    var startColumn = 1;

    var val = "";
    for (i = startRow; oWorksheet.Cells.GetCell(d.getExcelAddress(i, startColumn)).Value != undefined; i++) {
        date1 = OptDate(d.clearString(StrDate(oWorksheet.Cells.GetCell(d.getExcelAddress(i, 1)).Value, false, false)) + " " + Random(10, 18) + ":" + Random(10, 59) + ":" + Random(10, 59));
        date2 = OptDate(d.clearString(StrDate(oWorksheet.Cells.GetCell(d.getExcelAddress(i, 2)).Value, false, false)) + " " + Random(10, 18) + ":" + Random(10, 59) + ":" + Random(10, 59));
        date3 = OptDate(d.clearString(StrDate(oWorksheet.Cells.GetCell(d.getExcelAddress(i, 3)).Value, false, false)) + " " + Random(10, 18) + ":" + Random(10, 59) + ":" + Random(10, 59));
        
        testId = d.clearString(oWorksheet.Cells.GetCell(d.getExcelAddress(i, 4)).Value);
        fio = d.clearString(oWorksheet.Cells.GetCell(d.getExcelAddress(i, 5)).Value) + " " + d.clearString(oWorksheet.Cells.GetCell(d.getExcelAddress(i, 6)).Value) + 
        " " + d.clearString(oWorksheet.Cells.GetCell(d.getExcelAddress(i, 7)).Value);
        colsArr = XQuery("for $elem in collaborators where $elem/web_banned=false() and $elem/fullname=" + XQueryLiteral(fio) + " return $elem");
        colsCount = ArrayCount(colsArr)
        if (colsCount != 1) {
            l.write(logger, i + ") " + fio + " - " + colsCount);
        } else {
            foundCol = ArrayOptFirstElem(colsArr);
            foundTemplate = ArrayOptFirstElem(XQuery("for $elem in test_learnings where assessment_id=" + testId + " and state_id=4 order by $elem/score descending return $elem"))
            if (foundTemplate != undefined) {
                template = tools.open_doc(foundTemplate.id.Value)
                createTL(foundCol, template.TopElem, date1, Random(80, 90))
                createTL(foundCol, template.TopElem, date2, Random(91, 95))
                createTL(foundCol, template.TopElem, date3, 100)
            } else {
                createWOtemplate(foundCol, testId, date1, Random(80, 90))
                createWOtemplate(foundCol, testId, date2, Random(91, 95))
                createWOtemplate(foundCol, testId, date3, 100)
            }
        }
        // l.write(logger, i + ") date1 = " + date1 + ", date2 = " + date2 + ", date3 = " + date3 + ", testId = " + testId + ", fio = " + fio)
    }
}


l.close(logger);
} catch (error) {
l.write(logger, error);
l.close(logger);
}