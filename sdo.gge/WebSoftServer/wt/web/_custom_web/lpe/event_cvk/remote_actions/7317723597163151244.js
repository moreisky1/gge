// 7317723597163151244 - Обработка кнопок (Регистрация на мероприятие в ЦВК)

logger = {
    isLog: true,
    logType: "report",
    logName: "7317723597163151244",
}
var l = gge.getLib("log_lib");
// var personalLib = gge.getLib("personal_lib");
// var notifLib = gge.getLib("notif_lib");
// var dlib = gge.getLib("develop");

function parse_form_fields(sFormFields) {
    var arrFormFields = undefined;
    try {
        arrFormFields = ParseJson(sFormFields);
    } catch (e) {
        arrFormFields = [];
    }
    return arrFormFields;
}

function check_fields(oFormFields, customFields) {
    var fields = [];
    for (elem in ArraySelect(customFields, "This.isReq == true")) {
        if (get_form_field(oFormFields, elem.code) == "") {
            fields.push(elem.name)
        }
    }
    if (get_form_field(oFormFields, "fld_gdpr") == "0") {
        fields.push("Согласие на обработку персональных данных");
    }
    if (get_form_field(oFormFields, "fld_type") == "Не выбрано") {
        fields.push("Форма подключения");
    }
    return ArrayMerge(fields, "This", "; ");
}

function get_form_field(oFields, sName) {
    var catElem = ArrayOptFind(oFields, "This.name == sName");
    return catElem == undefined ? "" : catElem.value;
}

function newRequest(oFormFields, user) {
    var docRequest = tools.new_doc_by_name("request", false);
    docRequest.BindToDb(DefaultDb);
    var teRequest = docRequest.TopElem;
    teRequest.person_id = user.id.Value;
    teRequest.type = "event";
    teRequest.object_id = curObjectID;
    teRequest.object_name = curObject.name.Value;
    teRequest.object_code = curObject.code.Value;
    teRequest.object_start_date = curObject.start_date.Value;
    teRequest.object_type = "id";
    tools.common_filling( "collaborator", teRequest, user.id.Value, user);
    teRequest.request_type_id = 7347986365819432649; // Заявка на ВКС участие в мероприятии (ЦВК)
    teRequest.custom_elems.ObtainChildByKey("fld_secondname").value = get_form_field(oFormFields, "fld_secondname");
    teRequest.custom_elems.ObtainChildByKey("fld_firstname").value = get_form_field(oFormFields, "fld_firstname");
    teRequest.custom_elems.ObtainChildByKey("fld_middlename").value = get_form_field(oFormFields, "fld_middlename");
    teRequest.custom_elems.ObtainChildByKey("fld_organization").value = get_form_field(oFormFields, "fld_organization");
    teRequest.custom_elems.ObtainChildByKey("fld_position").value = get_form_field(oFormFields, "fld_position");
    teRequest.custom_elems.ObtainChildByKey("fld_email").value = get_form_field(oFormFields, "fld_email");
    teRequest.custom_elems.ObtainChildByKey("fld_mobile_phone").value = get_form_field(oFormFields, "fld_mobile_phone");
    teRequest.custom_elems.ObtainChildByKey("fld_gdpr").value = get_form_field(oFormFields, "fld_gdpr");
    teRequest.custom_elems.ObtainChildByKey("fld_type").value = get_form_field(oFormFields, "fld_type");
	docRequest.Save();

    return docRequest.DocID;
}

// params = {
//     subject: "",
//     body: "",
//     emails,
// }
function createActiveNotif(params) {
    var res = undefined;
    var dlib = OpenCodeLib("x-local://source/gge/libs/develop.js");
    if (dlib.isValidObjField(params, "subject", "String") &&
        dlib.isValidObjField(params, "body", "String") &&
        dlib.isValidObjField(params, "emails", "SimpleArray")
    ) {
        docAN = tools.new_doc_by_name("active_notification", false);
        docAN.BindToDb(DefaultDb);
        docAN.TopElem.sender.address = global_settings.settings.own_org.email.Value;
        docAN.TopElem.sender.name = "Учебный портал Главгосэкспертизы России";
        docAN.TopElem.date = Date();
        docAN.TopElem.send_date = Date();
        docAN.TopElem.body_type = "html";
        docAN.TopElem.notification_id = "7258282324117648518"; // empty Заглушка
        docAN.TopElem.notification_system_id = "6035867320053143919"; // E-mail

        docAN.TopElem.subject = params.subject;
        docAN.TopElem.body = params.body;
        for (email in params.emails) {
            recipient = docAN.TopElem.recipients.AddChild();
            recipient.address = email;
            // recipient.name = teRecipient.fullname;
            // recipient.collaborator_id = teRecipient.id;
        }
        docAN.Save();
        res = docAN.DocID;
    }
    return res;
}

function sendActiveNotif(params) {
    var res = undefined;
    var activeNotifID = createActiveNotif(params);
    if (activeNotifID != undefined) {
        res = tools.send_notification(activeNotifID);
    }
    return res;
}

function sendEmail(body, email) {
    var params = {
        subject: "Регистрация на мероприятие",
        body: body,
        emails: [email]
    }
    sendActiveNotif(params);
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

try {
    l.open(logger);
    if (curObject != null) {
        var oFormFields = parse_form_fields(SCOPE_WVARS.GetOptProperty("form_fields"));
        var customFields = [
            {"name": "Фамилия", "code": "fld_secondname", "isReq": true},
            {"name": "Имя", "code": "fld_firstname", "isReq": true},
            {"name": "Отчество", "code": "fld_middlename", "isReq": true},
            {"name": "Организация", "code": "fld_organization", "isReq": true},
            {"name": "Должность", "code": "fld_position", "isReq": true},
            {"name": "Адрес электронной почты", "code": "fld_email", "isReq": true},
            {"name": "Мобильный телефон", "code": "fld_mobile_phone", "isReq": false},
            {"name": "Согласие на обработку персональных данных", "code": "fld_gdpr", "isReq": true},
            {"name": "Форма подключения", "code": "fld_type", "isReq": false},
        ];
        var check_fields_msg = check_fields(oFormFields, customFields);
        if (check_fields_msg == "") {  
            var id = newRequest(oFormFields, curUser);
            var vcs_link = curObject.custom_elems.ObtainChildByKey("vcs_link").value;
            var fld_type = get_form_field(oFormFields, "fld_type");
            var body = "";
            if (curObject.event_form == "online" && vcs_link != "") {
                body = "<div>Ссылка на мероприятие: <a href='" + vcs_link + "'>" + vcs_link + "</a></div>";
                sendEmail(body, get_form_field(oFormFields, "fld_email"));
                RESULT = {
                    command: "alert",
                    msg: "Информация о регистрации направлена Вам на электронную почту.",
                    confirm_result: {
                        command: "redirect",
                        redirect_url: vcs_link
                    },
                };	
            } else if (curObject.event_form == "offline") {
                body = "<div>Ваша регистрация на очное участие подтверждена.<br>Для прохода на территорию, пожалуйста, возьмите паспорт.</div>"
                sendEmail(body, get_form_field(oFormFields, "fld_email"));
                RESULT = {
                    command: "alert",
                    msg: "Информация о регистрации направлена Вам на электронную почту."
                };
            } else if (curObject.event_form == "mixed") {
                if (fld_type == "ВКС" && vcs_link != "") {
                    body = "<div>Ссылка на мероприятие: <a href='" + vcs_link + "'>" + vcs_link + "</a></div>";
                    sendEmail(body, get_form_field(oFormFields, "fld_email"));
                    RESULT = {
                        command: "alert",
                        msg: "Информация о регистрации направлена Вам на электронную почту.",
                        confirm_result: {
                            command: "redirect",
                            redirect_url: vcs_link
                        },
                    };
                } else if (fld_type == "Очное") {
                    body = "<div>Ваша регистрация на очное участие подтверждена.<br>Для прохода на территорию, пожалуйста, возьмите паспорт.</div>"
                    sendEmail(body, get_form_field(oFormFields, "fld_email"));
                    RESULT = {
                        command: "alert",
                        msg: "Информация о регистрации направлена Вам на электронную почту."
                    };
                }
            } else {
                RESULT = {
                    command: "alert",
                    msg: "OK."
                };
            }
        } else {
            RESULT = {
                command: "alert",
                msg: "Заполните обязательные поля: " + check_fields_msg,
            };
        }
    }
    

        // RESULT = {
        //     command: "alert",
        //     msg: curObject.custom_elems.ObtainChildByKey("vcs_link").value ,
        // };
    
    l.close(logger);
} catch (error) {
    l.write(logger, error);
    l.close(logger);
    RESULT = {
        command: "alert",
        msg: ExtractUserError(error),
    };

}
