// 7420726886691797607 - Отчет по вопросам тестов с шаблонными ошибками


logger = {
    isLog: true,
    logType: "report",
    logName: "7420726886691797607",
}
var l = OpenCodeLib("x-local://source/gge/libs/log_lib.js");
var dlib = OpenCodeLib("x-local://source/gge/libs/develop.js");

function check(str) {
    var val = false;
    // var pattern = '[0-9] (%|°)';
    // var objRegExp = dlib.getRegExp(pattern);
    // if (objRegExp.Test(str)) {
    //     val = true;
    // }
    if (!val && StrContains(str, "°")){
        len = StrCharCount(str.split("°")[0])
        end = StrCharRangePos(str, len-1, len)
        val = OptInt(end) != undefined;
    }
    if (!val && StrContains(str, " %")){
        len = StrCharCount(str.split(" %")[0])
        end = StrCharRangePos(str, len-1, len)
        val = OptInt(end) != undefined;
    }
    return val;
}

try {
l.open(logger);
columns.Clear();

var arr = [];
var final_arr = [];
var xq = "";
var i = 1;
var role_id = "7420324880669760757"; // Тесты по направлениям деятельности 2024

xq = "for $elem in assessments where MatchSome($elem/role_id, (" + role_id + ")) return $elem";

for (ass in XQuery(xq)) {
    teAss = tools.open_doc(ass.id).TopElem;
    for (section in teAss.sections) {
        for (item in section.items) {
            teItem = tools.open_doc(item.id).TopElem;
            if (check(teItem.question_text.Value)) {
                l.write(logger, teItem.question_text.Value);
                obj = {};
                obj.PrimaryKey = String(teItem.id);
                obj.question = String(teAss.title.Value);
                obj.text = String(teItem.question_text.Value);
                obj.type = "item";
                final_arr.push(obj);
            }
            for (answer in teItem.answers) {
                if (check(answer.text.Value)) {
                    l.write(logger, answer.text.Value);
                    obj = {};
                    obj.PrimaryKey = String(teItem.id);
                    obj.question = String(teAss.title.Value);
                    obj.text = String(answer.text.Value);
                    obj.type = "answer";
                    final_arr.push(obj);
                }
            }
        }
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
_cc.flag_visible = true;
_cc.datatype = "string"
_cc.column_width = "10"
_cc.column_title = "question"
_cc.column_value = "ListElem.question"

_cc = columns.AddChild()
_cc.flag_formula = true
_cc.flag_visible = true;
_cc.datatype = "string"
_cc.column_width = "10"
_cc.column_title = "text"
_cc.column_value = "ListElem.text"

_cc = columns.AddChild()
_cc.flag_formula = true
_cc.flag_visible = true;
_cc.datatype = "string"
_cc.column_width = "10"
_cc.column_title = "type"
_cc.column_value = "ListElem.type"

l.close(logger);
return final_arr;

} catch (error) {
l.write(logger, error);
l.close(logger);
}
    