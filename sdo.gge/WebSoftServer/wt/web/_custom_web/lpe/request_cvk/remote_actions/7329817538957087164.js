// 7329817538957087164 - Редактирование заявки (ЦВК)

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

function get_form_field(oFields, sName) {
    var catElem = ArrayOptFind(oFields, "This.name == sName");
    return catElem == undefined ? "" : catElem.value;
}

function getCustomFormFields(teDoc) {
    var sheetField, fName, sValue, customFormFields = [];
    var request_type_id = 7262725678821686078; // Заявка на бронирование помещения ЦВК
    var customTemplates = custom_templates.request_type.items.ObtainChildByKey(request_type_id);
    // var sheetID = customTemplates.sheets.ObtainChildByKey(sheetName, "title").id.Value;
    // var sheetFields = ArraySelectByKey(customTemplates.fields, sheetID, "sheet_id");
    var sheetFields = customTemplates.fields
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

function DeleteResource(id) {
    var iResourceID = OptInt(id);
    var dFile = tools.open_doc(iResourceID);

    if (dFile != undefined && ArrayOptFirstElem(dFile.TopElem.links) == undefined) {
        try {
            DeleteDoc(UrlFromDocID(dFile.TopElem.id.Value));
        } catch (e) {
            alert("DeleteResource | " + e);
        }
    }

    return true;
}

function SaveFileInResource(oFile, iPersonID, tePerson) {
    var iPath = null;

    if (oFile != undefined && oFile.HasProperty("url") && oFile.url != "") {
        docResource = OpenNewDoc('x-local://wtv/wtv_resource.xmd');
        docResource.TopElem.person_id = iPersonID;
        tools.common_filling('collaborator', docResource.TopElem, iPersonID, tePerson);
        docResource.BindToDb();
        docResource.TopElem.put_data(oFile.url);
        docResource.TopElem.name = oFile.value;
        docResource.TopElem.file_name = oFile.value;
        docResource.TopElem.role_id.ObtainByValue(7330251450110256052); // CVK_event_programm
        docResource.Save();

        iPath = docResource.DocID;
    }

    return iPath;
}

function doSave(aFields, teDoc) {
    var docTask = teDoc.Doc;
    for (field in aFields) {
        field_name = String(field.name)
        // l.write(logger, field_name);
        
        if (StrBegins(field_name, "custom_elems.")) {
            if (field_name.split(".")[1] == "fld_event_programm") {
                // oFileTemp = ArrayOptFind(aFields, "This.name == 'fld_" + sField + "'");
                iFileTemp = SaveFileInResource(field, curUser.id.Value, curUser);
    
                if (iFileTemp != null) {
                    iFileOld = docTask.TopElem.custom_elems.ObtainChildByKey(field_name.split(".")[1]).value;
                    if (iFileOld != "") DeleteResource(iFileOld);
    
                    docTask.TopElem.custom_elems.ObtainChildByKey(field_name.split(".")[1]).value = iFileTemp;
                }
            } else {
                docTask.TopElem.custom_elems.ObtainChildByKey(field_name.split(".")[1]).value = field.value;
            }
        } else {
            docTask.TopElem.OptChild(field_name).Value = field.value;
        }
    }
    
    docTask.Save();

    return docTask.DocID;
}

function prepare_date(dDate) {
    return OptDate(StrDate(dDate, false));
}

function check_date(oFormFields) {
    var eventsCVK = [];
    var startDate = OptDate(get_form_field(oFormFields, "custom_elems.fld_event_start_date"));
    var finishDate = OptDate(get_form_field(oFormFields, "custom_elems.fld_event_finish_date"));
    var msg = "";
    if (startDate > finishDate) {
        msg += "Указанная дата окончания мероприятия некорретная (раньше чем дата начала).<br>";	
    }
    eventsCVK = XQuery("for $elem in events where place_id=7264887617762771120 and start_date>Date() return $elem");
    for (elem in eventsCVK) {
        if (prepare_date(startDate) >= prepare_date(elem.start_date) && prepare_date(startDate) <= prepare_date(elem.finish_date) 
        || prepare_date(finishDate) >= prepare_date(elem.start_date) && prepare_date(finishDate) <= prepare_date(elem.finish_date)) {
            msg += "Выбранная дата недоступна для бронирования<br>";
            break;
        }        
    }
    // RESULT = {
    //     command: "alert",
    //     msg: msg,
    //     // msg: prepare_date(startDate) > prepare_date(ArrayOptFirstElem(eventsCVK).start_date) ? "true" : "false",
    // };
    return msg;
}

logger = {
    isLog: false,
    logType: "report",
    logName: "7329817538957087164",
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
                var oForm = ({
                    "command": "display_form",
                    "title": "Дополнительные поля",
                    "message": "Измените необходимые данные",
                    "form_fields": ([])
                });
                var arr = [];
                if (OptInt(curObject.person_id) == OptInt(curUserID)) {
                    arr = getCustomFormFields(curObject);
                }
            

                oForm.form_fields = arr;
                oForm.form_fields.push({"name": "__next", "type": "hidden", "value": "save"});
                RESULT = oForm;
                break;

            case "save":
                var saveFields = ArraySelect(oFormFields, "!StrContains(This.name, '__')");

                var check_date_msg = check_date(saveFields);
                if (check_date_msg == "") {
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
                } else {
                    RESULT = {
                        command: "close_form",
                        confirm_result: {
                            command: "alert",
                            msg: check_date_msg,
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
