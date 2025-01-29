// 7403707291955411398 - Отчет о прохождении курса "Социальная инженерия"

var logger = {
    isLog: false,
    logType: "report",
    logName: "7403707291955411398",
}
var l = gge.getLib("log_lib");
var pLib = gge.getLib("personal_lib");
var arr = [];
var final_arr = [];
var obj = {};
var xq1 = "";
var xq2 = "";
var subdivisionLevel = 0;
var course_id = 7375108698236781024; // Опрос в рамках реализации проекта по Комплексной оценке работников Учреждения
var ca_id = 7369945090447834449; // Центральный аппарат
var subdivName1 = "";
var subdivName2 = "";
var person_fullname = "";
var position_name = "";
var state = "";

try {
l.open(logger);

xq1 = "for $elem in active_learnings, $c in collaborators where $elem/person_id=$c/id and $c/is_dismiss=false() and course_id=" + course_id + " return $elem";
xq2 = "for $elem in learnings, $c in collaborators where $elem/person_id=$c/id and $c/is_dismiss=false() and course_id=" + course_id + " return $elem";

arr = ArrayUnion(XQuery(xq1), XQuery(xq2));

for (elem in arr) {
    obj = {};

    subdivisionLevel = pLib.getSubdivisionLevel(elem.person_id.ForeignElem.position_parent_id.Value);
    if (subdivisionLevel == 0 || elem.person_id.ForeignElem.position_parent_id.ForeignElem.parent_object_id.Value == ca_id) {
        subdivName1 = elem.person_id.ForeignElem.position_parent_id.ForeignElem.name.Value;
    } else {
        subdivName1 = elem.person_id.ForeignElem.position_parent_id.ForeignElem.parent_object_id.ForeignElem.name.Value;
    }

    subdivName2 = elem.person_id.ForeignElem.position_parent_id.ForeignElem.name.Value;

    person_fullname = RValue(elem.person_id.ForeignElem.fullname);

    position_name = elem.person_id.ForeignElem.position_id.ForeignElem.name.Value;

    obj.SetProperty("PrimaryKey", String(elem.id));
    obj.subdivName1 = subdivName1;
    obj.subdivName2 = subdivName2;
    obj.person_fullname = person_fullname;
    obj.position_name = position_name;
    obj.state = elem.state_id.ForeignElem.name.Value;
    
    final_arr.push(obj);
}

l.close(logger);
} catch (error) {
l.write(logger, error);
l.close(logger);
}


return final_arr;