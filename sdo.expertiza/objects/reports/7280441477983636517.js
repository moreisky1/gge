// 7280441477983636517 - Отчет по централизованным заявкам

function getNames(catalog, ids) {
    arr = [];
    for (el in ids.split(";")) {
        arr.push(d.getNameInCatalogByID(catalog, el));
    }
    return ArrayMerge(arr, "This", "; ");
}

logger = {
    isLog: false,
    logType: "report",
    logName: "7280441477983636517",
}
libs = OpenCodeLib("x-local://source/gge/libs.js").getAllLibs;
l = libs.log_lib
d = libs.develop.clear
p = libs.personal_lib.clear

try {
l.open(logger);


columns.Clear();
var request_type_id = 7268266412676422854; // Заявка на централизованное обучение

var cond = " "
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
    if (teDoc.person_id.ForeignElem.position_parent_id.ForeignElem.parent_object_id.Value == 7156931433189943821) {
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

// 7275316654297389890 - Отчет по децентрализованным заявкам

var cond = " and person_id != 7241157892942218865"
var arr = XQuery("for $e in requests where request_type_id = 7268266412676422854 " + cond + " return $e");
var final_arr = [];
var personalLib = gge.getLib("personal_lib");

for (elem in arr) {
    teElem = tools.open_doc(elem.id).TopElem;
    obj = {};
    for (fldElem in elem) {
        if (fldElem.Name != "id") {
            obj.SetProperty(fldElem.Name, String(fldElem));
        }
    }
    obj.SetProperty("PrimaryKey", String(elem.id));

    obj.event_name = String(teElem.custom_elems.ObtainChildByKey("event_name").value);
    obj.event_cost = String(teElem.custom_elems.ObtainChildByKey("event_cost").value);
    obj.collaborators = String(teElem.custom_elems.ObtainChildByKey("collaborators").value);
    obj.event_name = String(teElem.custom_elems.ObtainChildByKey("event_name").value);
    cols_count = ArrayCount(obj.collaborators.split(";"));
    sum_cost = cols_count * OptReal(obj.event_cost, 0);
    obj.cols_count = cols_count;
    obj.sum_cost = sum_cost;
    obj.isSubdivisionFromCA = personalLib.isSubdivisionFromCA(teElem.person_subdivision_id) ? "Да" : "Нет";
    obj.getSubdivisionRole = personalLib.getSubdivisionRole(teElem.person_subdivision_id);
    obj.person_subdivision_name = teElem.person_subdivision_name;
    if (teElem.person_id.ForeignElem.position_parent_id.ForeignElem.parent_object_id.Value == 7156931433189943821) {
        obj.person_parent_subdivision_name = teElem.person_id.ForeignElem.position_parent_id.ForeignElem.name;
    } else {
        obj.person_parent_subdivision_name = teElem.person_id.ForeignElem.position_parent_id.ForeignElem.parent_object_id.ForeignElem.name;
    }
    

    final_arr.push(obj);
}

return final_arr;