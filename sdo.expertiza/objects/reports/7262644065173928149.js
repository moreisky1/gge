// 7262644065173928149 Отчет по всем курсам с фильтром по группе

var arr = [];
var final_arr = [];
try {
    cols = XQuery("for $e in group_collaborators where $e/group_id = " + {PARAM1} + " return $e");
    for (col in cols) {
        ls = XQuery("for $e in learnings where $e/person_id = " + col.collaborator_id.Value + " return $e");
        als = XQuery("for $e in active_learnings where $e/person_id = " + col.collaborator_id.Value + " return $e");
        arr = ArrayUnion(arr, ls, als);
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
