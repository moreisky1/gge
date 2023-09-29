// 7281594941417070946 - Отчет по прохождению курса с фильтром по курсу и дате активации

try {
    // var dlib = OpenCodeLib("x-local://source/gge/libs/develop.js");
    var condArray = ["1=1"];
    if ({PARAM1} != null && {PARAM1} != "") {
        condArray.push("course_id = " + {PARAM1});
    }
    if ({PARAM2} != null && {PARAM2} != "") {
        condArray.push("start_usage_date >= " + XQueryLiteral({PARAM2}));
    }
    var cond = ArrayMerge(condArray, "This", " and ")
    var arr1 = XQuery("for $e in active_learnings where " + cond + " return $e");
    var arr2 = XQuery("for $e in learnings where " + cond + " return $e");
    var arr = ArrayUnion(arr1, arr2);
    var final_arr = [];
    for (elem in arr) {
        teElem = tools.open_doc(elem.id).TopElem;
        obj = {};
        for (fldElem in elem) {
            if (fldElem.Name != "id") {
                obj.SetProperty(fldElem.Name, String(fldElem));
            }
        }
        obj.SetProperty("PrimaryKey", String(elem.id));
        obj.person_parent_subdivision_name = "";
        try {
            if (teElem.person_id.ForeignElem.position_parent_id.ForeignElem.parent_object_id.Value == 7156931433189943821) {
                obj.person_parent_subdivision_name = teElem.person_id.ForeignElem.position_parent_id.ForeignElem.name;
            } else {
                obj.person_parent_subdivision_name = teElem.person_id.ForeignElem.position_parent_id.ForeignElem.parent_object_id.ForeignElem.name;
            }
        } catch (e) {obj.person_parent_subdivision_name = "err"}

        // obj.state_name = common.learning_states[Int(teElem.state_id)].name;
        obj.state_name = teElem.state_id.ForeignElem.name;
        final_arr.push(obj);
    }
    return final_arr;
} catch (e) {
    var logger = {
        logType: "report",
        logName: "7281594941417070946",
    }
    var l = gge.getLib("log_lib");
    l.open(logger);
    l.write(logger, e);
    l.close(logger);
}
