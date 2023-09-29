// 7259290876083792888 Сотрудники подразделения и ниже по иерархии

var arr = [];
var final_arr = [];
try {
    if ({PARAM2}) {
        arr = tools.get_sub_persons_by_subdivision_id ({PARAM1});
    } else {
        arr = XQuery("for $e in collaborators where $e/position_parent_id = " + {PARAM1} + " return $e");
    }
} catch (e) {}

for (elem in arr) {
    obj = {};
    for (fldElem in elem) {
        if (fldElem.Name != "id") {
            obj.SetProperty(fldElem.Name, String(fldElem));
        }
    }
    obj.SetProperty("PrimaryKey", String(elem.id));
    final_arr.push(obj);
}

return final_arr;
