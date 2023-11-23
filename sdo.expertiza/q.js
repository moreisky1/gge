logger = {
    isLog: true,
    logType: "report",
    logName: "7273781679301533405",
}
libs = OpenCodeLib("x-local://source/gge/libs.js").getAllLibs;
l = libs.log_lib
d = libs.develop.clear
p = libs.personal_lib.clear

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
            if (oFieldDef.catalog != "resource") {
                oField.catalog = RValue(oFieldDef.catalog);
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


function getCustomForm() {
    var fldReqFieldElem, oFieldDef, sFieldName, sValue, oForm = ({
        "command": "display_form",
        "title": "Дополнительные поля",
        "message": "Измените необходимые данные",
        "form_fields": ([])
    });
    

    for (fldReqFieldElem in custom_templates.object_data_type.items.ObtainChildByKey(7284158758529408071).fields) {
        oFieldDef = fldReqFieldElem;
        if (oFieldDef != undefined) {
            sFieldName = "custom_elems." + oFieldDef.name;

            oFieldDef = ({
                "name": sFieldName,
                "type": oFieldDef.type.Value,
                "title": oFieldDef.title.Value,
                "catalog": oFieldDef.catalog.Value,
                "entries": ArrayExtract(oFieldDef.entries, '({"name": This.value.Value, "value": This.value.Value})')
            });

            sValue = "";

            oField = ({ "name": sFieldName, "label": oFieldDef.title, "type": oFieldDef.type, "value": sValue });

            SlavaTypeConversion(oField, oFieldDef);

            if (fldReqFieldElem.mandatory) {
                oField.mandatory = true;
                oField.validation = "nonempty";
            }

            oForm.form_fields.push(oField);
        }
    }
    
    return oForm;
}

try {
l.open(logger)

q = getCustomForm();
l.write(logger, tools.object_to_text(q, 'json'))


l.close(logger)
} catch (error) {
l.write(logger, error)
l.close(logger)
}


// 

logger = {
    isLog: true,
    logType: "report",
    logName: "Включение в состав участников мероприятия - accept",
}
libs = OpenCodeLib("x-local://source/gge/libs.js").getAllLibs;
l = libs.log_lib
d = libs.develop
n = libs.notif_lib

try {
l.open(logger)

var teEvent = tools.open_doc(curObject.object_id).TopElem;
// var partFormat = curObject.custom_elems.GetOptChildByKey("part_format").value;
var emailBody = '<p>Вы были включены в состав участников мероприятия "' + teEvent.name + 
    '" по заявке № ' + curObject.code + ' от ' + curObject.create_date + '.</p>';
if (teEvent.custom_elems.GetOptChildByKey("vcs_link").value != "") {
    emailBody += "<p>Ссылка для подключения: " + teEvent.custom_elems.GetOptChildByKey("vcs_link").value + "</p>";
}
l.write(logger, emailBody)
params = {
    subject: "Принята заявка на участие в мероприятии",
    body: emailBody,
    recipientIDs: [curObject.person_id],
    resourceIDs: [],
}
n.sendActiveNotif(params);

tools.add_person_to_event(curObject.person_id, curObject.object_id);

l.close(logger)
} catch (error) {
l.write(logger, error)
l.close(logger)
}