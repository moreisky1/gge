// 7432286953455038112 - Отчет по вопросам теста

logger = {
    isLog: false,
    logType: "report",
    logName: "7432286953455038112",
}
var l = OpenCodeLib("x-local://source/gge/libs/log_lib.js");
var personalLib = OpenCodeLib("x-local://source/gge/libs/personal_lib.js");
var dlib = OpenCodeLib("x-local://source/gge/libs/develop.js");

function getLearn(personID, courseID) {
    xq1 = "for $e in active_learnings where person_id=" + personID + " and course_id=" + courseID + " return $e";
    xq2 = "for $e in learnings where person_id=" + personID + " and course_id=" + courseID + " return $e";
    return ArrayOptFirstElem(ArrayUnion(XQuery(xq1), XQuery(xq2))); 
}

try {
l.open(logger);
columns.Clear();

// var arr = [];
var final_arr = [];
// var xq = "";
// var i = 1;

var assessment_id = OptInt(_CRITERIONS[0].value);
var answersStr = "";
if (assessment_id != undefined) {
    teAss = tools.open_doc(assessment_id).TopElem;
    teAss.sections[0].items
    for (elem in teAss.sections[0].items) {
        obj = {};
        teItem = tools.open_doc(elem.id).TopElem;
        obj.PrimaryKey = String(elem.id);
        obj.question_text = String(teItem.question_text);
        obj.type_id = String(teItem.type_id)
        answersStr = ""
        for (answer in teItem.answers) {
            if (answer.is_correct_answer) {
                answersStr += "!" + answer.text + "; "
            } else {
                answersStr += answer.text + "; "
            }
        }
        obj.answersStr = answersStr;
        final_arr.push(obj);
    }
}


_cc = columns.AddChild()
_cc.flag_formula = true
_cc.flag_visible = false;
_cc.datatype = "string"
_cc.column_width = "10"
_cc.column_title = "PrimaryKey"
_cc.column_value = "ListElem.PrimaryKey"

_cc = columns.AddChild()
_cc.flag_formula = true
_cc.flag_visible = true
_cc.datatype = "string"
_cc.column_width = "10"
_cc.column_title = "Вопрос"
_cc.column_value = "ListElem.question_text"

_cc = columns.AddChild()
_cc.flag_formula = true
_cc.flag_visible = true
_cc.datatype = "string"
_cc.column_width = "10"
_cc.column_title = "Ответы"
_cc.column_value = "ListElem.answersStr"

l.close(logger);
return final_arr;

} catch (error) {
l.write(logger, error);
l.close(logger);
}

