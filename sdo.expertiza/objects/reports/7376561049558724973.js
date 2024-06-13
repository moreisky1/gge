// 7376561049558724973 - Отчет по опросу в рамках реализации проекта по Комплексной оценке работников Учреждения

var logger = {
    isLog: false,
    logType: "report",
    logName: "7376561049558724973",
}
var l = gge.getLib("log_lib");
var pLib = gge.getLib("personal_lib");
var arr = [];
var final_arr = [];
var obj = {};
var foundPR;
var xq = "";
var subdivisionLevel = 0;
var group_id = 7376335005342859105; // Зеленый список
var poll_id = 7376303252864061192; // Опрос в рамках реализации проекта по Комплексной оценке работников Учреждения
var ca_id = 7369945090447834449; // Центральный аппарат
var subdivName1 = "";
var subdivName2 = "";
var person_fullname = "";
var position_name = "";
var is_done = "";

try {
l.open(logger);

xq = "for $elem in group_collaborators where group_id=" + group_id + " return $elem";
arr = ArrayExtractKeys(XQuery(xq), "collaborator_id");

for (elem in arr) {
    obj = {};
    teCol = tools.open_doc(elem).TopElem;

    subdivisionLevel = pLib.getSubdivisionLevel(teCol.position_parent_id.Value);
    if (subdivisionLevel == 0 || teCol.position_parent_id.ForeignElem.parent_object_id.Value == ca_id) {
        subdivName1 = teCol.position_parent_id.ForeignElem.name.Value;
    } else {
        subdivName1 = teCol.position_parent_id.ForeignElem.parent_object_id.ForeignElem.name.Value;
    }

    subdivName2 = teCol.position_parent_id.ForeignElem.name.Value;

    person_fullname = RValue(teCol.fullname);

    position_name = teCol.position_id.ForeignElem.name.Value;

    xq = "for $elem in poll_results where poll_id=" + poll_id + " and person_id=" + elem + " return $elem"
    foundPR = ArrayOptFirstElem(XQuery(xq));
    if (foundPR != undefined) {
        obj.SetProperty("PrimaryKey", String(foundPR.id));
        is_done = foundPR.is_done ? "Да" : "Нет"
    } else {
        obj.SetProperty("PrimaryKey", String(elem));
        is_done = "Нет";
    }

    obj.subdivName1 = subdivName1;
    obj.subdivName2 = subdivName2;
    obj.person_fullname = person_fullname;
    obj.position_name = position_name;
    obj.is_done = is_done;
    
    final_arr.push(obj);
}

l.close(logger);
} catch (error) {
l.write(logger, error);
l.close(logger);
}


return final_arr;