// 7280441477983636517 - Отчет по централизованным заявкам

logger = {
    isLog: false,
    logType: "report",
    logName: "7280441477983636517",
}
var l = OpenCodeLib("x-local://source/gge/libs/log_lib.js");
var personalLib = OpenCodeLib("x-local://source/gge/libs/personal_lib.js");
var d = OpenCodeLib("x-local://source/gge/libs/develop.js");


function getNames(catalog, ids) {
    arr = [];
    for (el in ids.split(";")) {
        arr.push(d.getNameInCatalogByID(catalog, OptInt(el)));
    }
    return ArrayMerge(arr, "This", "; ");
}

try {
l.open(logger);

columns.Clear();
var request_type_id = 7268266412676422854; // Заявка на централизованное обучение

var cond = " and person_id != 7241157892942218865 and create_date>date('"+Date('08.08.2024')+"')"
var arr = XQuery("for $e in requests where request_type_id = " + request_type_id + cond + " return $e");
var final_arr = [];

for (elem in arr) {
    teDoc = tools.open_doc(elem.id).TopElem;
    obj = {};
    for (fldElem in elem) {
        if (fldElem.Name != "id") {
            obj.SetProperty(fldElem.Name, String(fldElem));
        }
    }
    obj.SetProperty("PrimaryKey", String(elem.id));
    
    obj.person_subdivision_name = teDoc.person_subdivision_name;

    subdivisionLevel = personalLib.getSubdivisionLevel(teDoc.person_id.ForeignElem.position_parent_id)
    if (subdivisionLevel == 0) {
        obj.person_parent_subdivision_name = teDoc.person_id.ForeignElem.position_parent_id.ForeignElem.name;
    } else {
        obj.person_parent_subdivision_name = teDoc.person_id.ForeignElem.position_parent_id.ForeignElem.parent_object_id.ForeignElem.name;
    }

    for (field in custom_templates.request_type.items.ObtainChildByKey(request_type_id).fields) {
        val = d.ceValue(teDoc, field.name.Value);
        if (field.name.Value == "qualifications") {
            obj.SetProperty(field.name.Value, getNames("knowledge_part", val));
        } else if (field.name.Value == "subdivisions") {
            obj.SetProperty(field.name.Value, getNames("subdivision", val));
        } else if (field.name.Value == "position_commons") {
            obj.SetProperty(field.name.Value, getNames("position_common", val));
        } else {
            obj.SetProperty(field.name.Value, val == undefined ? "" : val);
        }
    }
    
    final_arr.push(obj);
}

// _cc = columns.AddChild()
// _cc.flag_formula = true
// _cc.flag_visible = true
// _cc.datatype = "string"
// _cc.column_width = "10"
// _cc.column_title = "PrimaryKey"
// _cc.column_value = "ListElem.PrimaryKey"


_cc = columns.AddChild()
_cc.flag_formula = true
_cc.flag_visible = true
_cc.datatype = "string"
_cc.column_width = "10"
_cc.column_title = "Подразделение выше"
_cc.column_value = "ListElem.person_parent_subdivision_name"

_cc = columns.AddChild()
_cc.flag_formula = true
_cc.flag_visible = true
_cc.datatype = "string"
_cc.column_width = "10"
_cc.column_title = "Подразделение"
_cc.column_value = "ListElem.person_subdivision_name"

_cc = columns.AddChild()
_cc.flag_formula = true
_cc.flag_visible = true
_cc.datatype = "string"
_cc.column_width = "10"
_cc.column_title = "Сотрудник"
_cc.column_value = "ListElem.person_fullname"

for (field in custom_templates.request_type.items.ObtainChildByKey(request_type_id).fields) {
    _cc = columns.AddChild()
    _cc.flag_formula = true
    _cc.flag_visible = true
    _cc.datatype = "string"
    _cc.column_width = "10"
    _cc.column_title = field.title.Value
    _cc.column_value = "ListElem." + field.name.Value
}

l.close(logger);
return final_arr;
} catch (error) {
l.write(logger, error)
l.close(logger)
}