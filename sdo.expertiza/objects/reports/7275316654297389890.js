// 7275316654297389890 - Отчет по децентрализованным заявкам

function getName(id, catalog) {
    var res = "";
    if (id != "" && id != undefined) {
        if (catalog == "collaborator") {
            res = ArrayOptFirstElem(XQuery("for $e in " + catalog + "s where id = " + id + " return $e")).fullname.Value;
        } else if (catalog == "education_org") {
            res = ArrayOptFirstElem(XQuery("for $e in " + catalog + "s where id = " + id + " return $e")).disp_name.Value;
        } else {
            res = ArrayOptFirstElem(XQuery("for $e in " + catalog + "s where id = " + id + " return $e")).name.Value;
        }
    }
    return res;
}

function getCols(collaborators) {
    arr = [];
    for (el in collaborators.split(";")) {
        arr.push(getName(el, "collaborator"));
    }
    return ArrayMerge(arr, "This", "; ");
}

function getDate(date) {
    res = "";
    if (OptDate(date) != undefined) {
        res = StrDate(OptDate(date), false, false);
    }
    return res;
}

var cond = " and person_id != 7241157892942218865"
var arr = XQuery("for $e in requests where request_type_id = 7265281441174738432 " + cond + " return $e");
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

    obj.collaborators = String(teElem.custom_elems.ObtainChildByKey("collaborators").value);
    obj.event_name = String(teElem.custom_elems.ObtainChildByKey("event_name").value);
    obj.event_type = String(teElem.custom_elems.ObtainChildByKey("event_type").value);
    obj.event_form = String(teElem.custom_elems.ObtainChildByKey("event_form").value);
    obj.event_cost = String(teElem.custom_elems.ObtainChildByKey("event_cost").value);
    obj.event_start_date = getDate(teElem.custom_elems.ObtainChildByKey("event_start_date").value);
    obj.event_period = String(teElem.custom_elems.ObtainChildByKey("event_period").value);
    obj.education_org = String(teElem.custom_elems.ObtainChildByKey("education_org").value);
    obj.education_org_new = String(teElem.custom_elems.ObtainChildByKey("education_org_new").value);
    obj.education_programm_URL = String(teElem.custom_elems.ObtainChildByKey("education_programm_URL").value);
    obj.city = String(teElem.custom_elems.ObtainChildByKey("city").value);
    obj.base = String(teElem.custom_elems.ObtainChildByKey("base").value);
    obj.lector = String(teElem.custom_elems.ObtainChildByKey("lector").value);
    obj.comment = String(teElem.custom_elems.ObtainChildByKey("comment").value);

    obj.cols = getCols(obj.collaborators);
    obj.edu_org = getName(obj.education_org, "education_org");
    obj.reg = getName(obj.city, "region");
    obj.lec = getName(obj.lector, "collaborator");
    obj.priority = teElem.workflow_fields.ObtainChildByKey("priority").value;

    obj.cols_count = ArrayCount(obj.collaborators.split(";"));
    obj.sum_cost = obj.cols_count * OptReal(obj.event_cost, 0);
    
    // obj.isSubdivisionFromCA = personalLib.isSubdivisionFromCA(teElem.person_subdivision_id) ? "Да" : "Нет";
    // obj.getSubdivisionRole = personalLib.getSubdivisionRole(teElem.person_subdivision_id);

    obj.person_subdivision_name = teElem.person_subdivision_name;
    
    if (teElem.person_id.ForeignElem.position_parent_id.ForeignElem.parent_object_id.Value == 7156931433189943821) {
        obj.person_parent_subdivision_name = teElem.person_id.ForeignElem.position_parent_id.ForeignElem.name;
    } else {
        obj.person_parent_subdivision_name = teElem.person_id.ForeignElem.position_parent_id.ForeignElem.parent_object_id.ForeignElem.name;
    }
    
    final_arr.push(obj);
}

return final_arr;