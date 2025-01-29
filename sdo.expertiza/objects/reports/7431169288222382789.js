// 7431169288222382789 - Отчет по статусам прохождения курсов по группе 2

logger = {
    isLog: false,
    logType: "report",
    logName: "7431169288222382789",
}
var l = OpenCodeLib("x-local://source/gge/libs/log_lib.js");
var personalLib = OpenCodeLib("x-local://source/gge/libs/personal_lib.js");
var dlib = OpenCodeLib("x-local://source/gge/libs/develop.js");

function getLearn(personID, courseID) {
    var xq1 = "for $e in learnings where person_id=" + personID + " and course_id=" + courseID + " return $e";
    var xq2 = "for $e in active_learnings where person_id=" + personID + " and course_id=" + courseID + " return $e";
    var found1 = ArrayOptFirstElem(XQuery(xq1));
    var found2 = ArrayOptFirstElem(XQuery(xq2));
    return found1 != undefined ? found1 : found2; 
}

try {
l.open(logger);
columns.Clear();

var arr = [];
var final_arr = [];
var xq = "";
var i = 1;
var learn;

var group_id = "7386640946623528091"; // Основной управленческий кадровый резерв

var courses = [
    {"id" : "6945713935506956717", "group_id": "7431158244321209872", "name" : "Анализ проблем и принятие решений"},
    {"id" : "6945714782086381694", "group_id": "7431165812853095893", "name" : "Построение эффективной команды"},
    {"id" : "6945714592103875818", "group_id": "7431163605865627041", "name" : "Инновационность и управление изменениями"},
    {"id" : "6945714962660144654", "group_id": "7431164966908174700", "name" : "Саморазвитие"},
    {"id" : "6945714368428313646", "group_id": "7431166865185819871", "name" : "Стратегическое мышление"},
    {"id" : "7213989527784485766", "group_id": "7431166328212769971", "name" : "Управление эффективностью"},
    {"id" : "7214003629307292133", "group_id": "7431159704383389698", "name" : "Ориентация на результат"},
    {"id" : "7412616614067643106", "group_id": "7431157664039390150", "name" : "Командность"}
];

xq = "for $e in group_collaborators where $e/group_id=" + group_id + " order by $e/collaborator_fullname return $e";
arr = XQuery(xq);

for (elem in arr) {
    obj = {};
    obj.PrimaryKey = String(elem.collaborator_id);
    obj.fullname = String(elem.collaborator_fullname);
    i = 1;
    for (course in courses) {
        if (personalLib.isPersonInGroup(elem.collaborator_id.Value, course.group_id)) {
            learn = getLearn(elem.collaborator_id, course.id);
            if (learn != undefined) {
                obj.SetProperty("status" + i, learn.state_id.ForeignElem.name.Value);
            } else {
                tools.activate_course_to_person(String(elem.collaborator_id), String(course.id))
                obj.SetProperty("status" + i, "-");
            }
        } else {
            obj.SetProperty("status" + i, "Не требуется");
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

