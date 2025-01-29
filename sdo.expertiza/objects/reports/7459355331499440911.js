// 7459355331499440911 - Отчет по результатам опроса


logger = {
    isLog: false,
    logType: "report",
    logName: "7459355331499440911",
}

var l = OpenCodeLib("x-local://source/gge/libs/log_lib.js");
var p = OpenCodeLib("x-local://source/gge/libs/personal_lib.js");
var d = OpenCodeLib("x-local://source/gge/libs/develop.js");

function getOptAnswer(tePoll, tePollResult, idQuestion) {
    var answer = undefined;
    var foundAnswer = ArrayOptFind(tePollResult.questions, "This.id==" + idQuestion);
    if (foundAnswer != undefined) {
        answer = ArrayOptFind(ArrayOptFind(tePoll.questions, "This.id==" + idQuestion).entries, "This.id==" + foundAnswer.value).value.Value;
    }
    return answer;
}

try {
l.open(logger);
columns.Clear();

var poll_id = _CRITERIONS[0].value

var condsArr = [];
condsArr.push("$elem/poll_id = " + poll_id);
var cond = " and " + ArrayMerge(condsArr, "This", " and ");
var xq = "for $elem in poll_results where 1=1 " + cond + " return $elem";
var arr = XQuery(xq);
var final_arr = [];

var tePoll = tools.open_doc(poll_id).TopElem;
for (elem in arr) {
    tePollResult = tools.open_doc(elem.id).TopElem;
    obj = {};
    obj.SetProperty("PrimaryKey", String(elem.id));
    obj.person_fullname = tePollResult.person_fullname.Value;
    obj.person_position_name = tePollResult.person_position_name.Value;
    obj.person_subdivision_name = tePollResult.person_subdivision_name.Value;
    i = 1
    for (question in tePoll.questions) {
        if (question.type.Value == "combo" || question.type.Value == "choice") {
            answer = getOptAnswer(tePoll, tePollResult, question.id.Value);
        } else {
            foundAnswer = ArrayOptFind(tePollResult.questions, "This.id==" + question.id.Value);
            answer = foundAnswer == undefined ? "" : foundAnswer.value.Value;
        }
        
        if (answer != undefined) {
            obj.SetProperty("answer" + i, answer);
        } else {
            obj.SetProperty("answer" + i, "");
        }
        i++;
    }
    final_arr.push(obj);
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
_cc.column_title = "ФИО"
_cc.column_value = "ListElem.person_fullname"

_cc = columns.AddChild()
_cc.flag_formula = true
_cc.flag_visible = true
_cc.datatype = "string"
_cc.column_width = "10"
_cc.column_title = "Должность"
_cc.column_value = "ListElem.person_position_name"

_cc = columns.AddChild()
_cc.flag_formula = true
_cc.flag_visible = true
_cc.datatype = "string"
_cc.column_width = "10"
_cc.column_title = "Подразделение"
_cc.column_value = "ListElem.person_subdivision_name"

i = 1;
for (question in tePoll.questions) {
    _cc = columns.AddChild()
    _cc.flag_formula = true
    _cc.flag_visible = true
    _cc.datatype = "string"
    _cc.column_width = "100"
    _cc.column_title = question.title
    _cc.column_value = "ListElem.answer" + i
    i++;
}

l.close(logger);
return final_arr;
} catch (error) {
l.write(logger, error);
l.close(logger);
return [];
}
