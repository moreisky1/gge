// 7242618299013355360 - add_sdo_task - _custom_web/lpe/sdo_tasks/remote_actions/add_sdo_task.js

function SlavaTypeConversion(oField, fldDef) {
    switch (fldDef.type) {
        case "radio":
        case "combo":
            oField.type = "select";
            var entry;
            oField.entries = new Array();
            for (entry in fldDef.entries)
                oField.entries.push(({ "name": RValue(entry.name), "value": RValue(entry.value) }));
            break;
        case "list":
            oField.type = "list";

            var entry;
            oField.entries = new Array();
            for (entry in fldDef.entries)
                oField.entries.push(({ "name": RValue(entry.name), "value": RValue(entry.value) }));

            if (DataType(oField.value) == "string") {
                oField.value = String(oField.value).split(";");
            }
            break;
        case "richtext":
            oField.type = "text";
            break;
        case "foreign_elem":
            if (fldDef.catalog != "resource") {
                oField.catalog = RValue(fldDef.catalog);
                break;
            }
        case "file":
            oField.type = "file";
            oField.catalog = "";
            break;
        case "heading":
            oField.type = "paragraph";
            oField.value = oField.label;
            break;
        case "object":
            oField.type = "string";
            break;
    }
}

function getCustomFormFields(sheetName, teDoc) {
    var sheetField, fName, sValue, customFormFields = [];
    var object_data_type_id = 7284158758529408071; // Задачи СДО
    var customTemplates = custom_templates.object_data_type.items.ObtainChildByKey(object_data_type_id);
    var sheetID = customTemplates.sheets.ObtainChildByKey(sheetName, "title").id.Value;
    var sheetFields = ArraySelectByKey(customTemplates.fields, sheetID, "sheet_id");
    for (sheetField in sheetFields) {
        fName = sheetField.name.Value;
        sheetField = ({
            "name": "custom_elems." + fName,
            "type": sheetField.type.Value,
            "title": sheetField.title.Value,
            "catalog": sheetField.catalog.Value,
            "entries": ArrayExtract(sheetField.entries, '({"name": This.value.Value, "value": This.value.Value})'),
            "is_required": sheetField.is_required.Value
        });

        sValue = teDoc == undefined ? "" : d.ceValue(teDoc, fName);
        
        oField = ({ "name": sheetField.name, "label": sheetField.title, "type": sheetField.type, "value": sValue });

        SlavaTypeConversion(oField, sheetField);

        if (sheetField.is_required) {
            oField.mandatory = true;
            oField.validation = "nonempty";
        }

        customFormFields.push(oField);
    }
    
    return customFormFields;
}

function doSave(aFields, teDoc) {
    var docTask;
    if (teDoc == undefined) {
        var arr = XQuery("for $elem in object_datas where object_data_type_id = 7284158758529408071 return $elem");
        var maxCode = 0;
        if (ArrayCount(arr)) {
            maxCode = OptInt(ArrayMax(XQuery("for $elem in object_datas where object_data_type_id = 7284158758529408071 return $elem"), "OptInt(This.code)").code);
        }
        
        docTask = tools.new_doc_by_name("object_data", false);
        docTask.BindToDb(DefaultDb);
        docTask.TopElem.object_data_type_id = 7284158758529408071 // Задачи СДО
        docTask.TopElem.object_type = "collaborator";
        docTask.TopElem.sec_object_type = "collaborator";
        docTask.TopElem.object_id = curUserID;
        docTask.TopElem.custom_elems.ObtainChildByKey("state").value = "Планируется";
        docTask.TopElem.code = maxCode + 1;
        docTask.TopElem.name = ArrayOptFindByKey(aFields, "custom_elems.name", "name").value;
    } else {
        docTask = teDoc.Doc;
    }
    for (field in aFields) {
        field_name = String(field.name)
        // l.write(logger, field_name);
        
        if (StrBegins(field_name, "custom_elems.")) {
            docTask.TopElem.custom_elems.ObtainChildByKey(field_name.split(".")[1]).value = field.value;
        } else {
            docTask.TopElem.OptChild(field_name).Value = field.value;
        }
    }
    
    docTask.Save();

    return docTask.DocID;
}

logger = {
    isLog: true,
    logType: "report",
    logName: "7242618299013355360",
}
libs = OpenCodeLib("x-local://source/gge/libs.js").getAllLibs;
l = libs.log_lib
d = libs.develop.clear
p = libs.personal_lib.clear

try {
l.open(logger);


switch (command) {

    case "eval":
        nextCommand = "first_form";
        form_fields = "";

    case "submit_form":

        if (form_fields != "") {
            try {
                oFormFields = ParseJson(form_fields);
                nextCommand = ArrayOptFindByKey(oFormFields, "__next", "name").value;
            }
            catch (_x_) {
            }
        }

        switch (nextCommand) {
            case "first_form":
                sAction = "" + ParseJson(_ITEM_).title;
                switch (sAction) {
    
                    case "Добавить":
                        var oForm = ({
                            "command": "display_form",
                            "title": "Дополнительные поля",
                            "message": "Измените необходимые данные",
                            "form_fields": ([])
                        });
                        var colIDs = p.getAllChildSubdivisionPersonIDs(7156931480992233630); // Учебный центр
                        var arr = [
                            {
                                "name": "sec_object_id"
                                , "label": "Исполнитель"
                                , "type": "foreign_elem"
                                , "catalog": "collaborator"
                                , "query_qual": "id in (" + ArrayMerge(colIDs, "This", ",") + ")"
                                , "mandatory": true
                                , "validation": "nonempty"
                            }
                        ]
                        oForm.form_fields = ArrayUnion(arr, getCustomFormFields("Для заказчика"));
                        oForm.form_fields.push({"name": "__next", "type": "hidden", "value": "new"});
                        RESULT = oForm;
    
                        break;
    
                    case "Редактировать":
                        var oForm = ({
                            "command": "display_form",
                            "title": "Дополнительные поля",
                            "message": "Измените необходимые данные",
                            "form_fields": ([])
                        });
                        var arr = [];
                        var arr1 = [];
                        var arr2 = [];
                        if (OptInt(curObject.object_id) == OptInt(curUserID)) {
                            arr = [
                                {
                                    "name": "sec_object_id"
                                    , "label": "Исполнитель"
                                    , "type": "foreign_elem"
                                    , "catalog": "collaborator"
                                    , "query_qual": "is_arm_admin=true()"
                                    , "mandatory": true
                                    , "validation": "nonempty"
                                    , "value": curObject == undefined ? "" : curObject.sec_object_id
                                }
                            ]
                            arr1 = getCustomFormFields("Для заказчика", curObject);
                        }
                        
                        if (OptInt(curObject.sec_object_id) == OptInt(curUserID)) {
                            arr2 = getCustomFormFields("Для исполнителя", curObject);
                        }

                        oForm.form_fields = ArrayUnion(arr, arr1, arr2);
                        oForm.form_fields.push({"name": "__next", "type": "hidden", "value": "save"});
                        RESULT = oForm;
    
                        break;
    
                    case "Удалить":
                        if (OptInt(curObject.object_id) == OptInt(curUserID)) {
                            var oForm = ({
                                "command": "display_form",
                                "title": "Удалить задачу",
                                "message": "Задача будет удалена. Вы уверены?",
                                "form_fields": ([])
                            });
                            oForm.form_fields.push({"name": "__next", "type": "hidden", "value": "del"});
                        } else {
                            RESULT = ({
                                command: "alert",
                                msg: "Удалить может только Заказчик"
                            });
                        }

                        RESULT = oForm;
    
                        break;
                }
                break;

            case "new":
                var saveFields = ArraySelect(oFormFields, "!StrContains(This.name, '__')");
                var docTaskID = doSave(saveFields);
                RESULT = {
                    command: "close_form",
                    confirm_result: {
                        command: "alert",
                        msg: "Задача создана",
                        confirm_result: {
                            command: "reload_page",
                            // redirect_url: "http://sdo.expertiza.ru/_wt/sdo_task/" + docTaskID
                        }
                    }
                }
                break;

            case "save":
                var saveFields = ArraySelect(oFormFields, "!StrContains(This.name, '__')");
                var docTaskID = doSave(saveFields, curObject);
                RESULT = {
                    command: "close_form",
                    confirm_result: {
                        command: "alert",
                        msg: "Данные сохранены",
                        confirm_result: {
                            command: "reload_page"
                        }
                    }
                }
                break;

            case "del":
                DeleteDoc(UrlFromDocID(OptInt(curObjectID)));
                RESULT = {
                    command: "close_form",
                    confirm_result: {
                        command: "alert",
                        msg: "Задача удалена",
                        confirm_result: {
                            command: "redirect",
                            redirect_url: "http://sdo.expertiza.ru/_wt/sdo_tasks"
                        }
                    }
                }
                break;
        }
        
        
        break;
    default:
        RESULT = ({
            command: "alert",
            msg: "Ошибка данных формы"
        });
        break;
}




l.close(logger);
} catch (error) {
l.write(logger, error);
l.close(logger);
}
