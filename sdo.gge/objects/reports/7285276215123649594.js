// 7285276215123649594 - Отчет по заявкам ЭБ строим вместе СТУДЕНТЫ

logger = {
    isLog: false,
    logType: "report",
    logName: "7285276215123649594",
}
libs = OpenCodeLib("x-local://source/gge/libs.js").getAllLibs;
l = libs.log_lib
d = libs.develop.clear
p = libs.personal_lib.clear

function addColumns(customTemplates, sheetName) {
    var sheetID = customTemplates.sheets.ObtainChildByKey(sheetName, "title").id.Value;
    var sheetFields = ArraySelectByKey(customTemplates.fields, sheetID, "sheet_id");
    for (sheetField in sheetFields) {
        _cc = columns.AddChild()
        _cc.flag_formula = true
        _cc.flag_visible = true
        _cc.datatype = "string"
        _cc.column_width = "10"
        _cc.column_title = sheetField.title.Value
        _cc.column_value = "ListElem." + sheetField.name.Value
    }
}

try {
l.open(logger);


columns.Clear();
var request_type_id = 7277549967278945474; // Заявка на участие в проекте «Экспертиза будущего: строим вместе»

var cond = " and doc-contains($elem/id, DefaultDb, '[fld_status=Студент или аспирант вуза]') "
var arr = XQuery("for $elem in requests where request_type_id = " + request_type_id + cond + " return $elem");
var final_arr = [];
var customTemplates = custom_templates.request_type.items.ObtainChildByKey(request_type_id);

for (elem in arr) {
    teDoc = tools.open_doc(elem.id).TopElem;
    obj = {};
    for (fldElem in elem) {
        if (fldElem.Name != "id") {
            obj.SetProperty(fldElem.Name, String(fldElem));
        }
    }
    obj.SetProperty("PrimaryKey", String(elem.id));
    
    for (field in customTemplates.fields) {
        val = d.ceValue(teDoc, field.name.Value);
        if (field.name.Value == "fld_region") {
            obj.SetProperty(field.name.Value, d.getNameInCatalogByID("region", val));
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
_cc.column_title = "Дата подачи заявки"
_cc.column_value = "ListElem.create_date"

addColumns(customTemplates, "stage1");
addColumns(customTemplates, "stage2");
addColumns(customTemplates, "stage7");
addColumns(customTemplates, "stage8");

l.close(logger);
return final_arr;
} catch (error) {
l.write(logger, error)
l.close(logger)
}