// 7415939383751863540 - Отчет по статусам прохождения курсов по группе

logger = {
    isLog: false,
    logType: "report",
    logName: "7415939383751863540",
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

var arr = [];
var final_arr = [];
var xq = "";
var i = 1;

var group_id = "7386640946623528091"; // Основной управленческий кадровый резерв

var courses = [
    {"id" : "6945713935506956717", "name" : "Анализ проблем и принятие решений"},
    {"id" : "6945714782086381694", "name" : "Построение эффективной команды"},
    {"id" : "6945714592103875818", "name" : "Инновационность и управление изменениями"},
    {"id" : "6945714962660144654", "name" : "Саморазвитие"},
    {"id" : "6945714368428313646", "name" : "Стратегическое мышление"},
    {"id" : "7213989527784485766", "name" : "Управление эффективностью"},
    {"id" : "7214003629307292133", "name" : "Ориентация на результат"},
    {"id" : "7412616614067643106", "name" : "Командность"}
];

xq = "for $e in group_collaborators where $e/group_id=" + group_id + " return $e";
arr = XQuery(xq);

for (elem in arr) {
    obj = {};
    obj.PrimaryKey = String(elem.collaborator_id);
    obj.fullname = String(elem.collaborator_fullname);
    i = 1;
    for (course in courses) {
        learn = getLearn(elem.collaborator_id, course.id);
        if (learn != undefined) {
            obj.SetProperty("status" + i, learn.state_id.ForeignElem.name.Value);
        } else {
            obj.SetProperty("status" + i, "-");
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
_cc.column_value = "ListElem.fullname"

i = 1;
for (course in courses) {
    _cc = columns.AddChild()
    _cc.flag_formula = true
    _cc.flag_visible = true
    _cc.datatype = "string"
    _cc.column_width = "10"
    _cc.column_title = course.name
    _cc.column_value = "ListElem.status" + i
    i++;
}
l.close(logger);
return final_arr;

} catch (error) {
l.write(logger, error);
l.close(logger);
}

