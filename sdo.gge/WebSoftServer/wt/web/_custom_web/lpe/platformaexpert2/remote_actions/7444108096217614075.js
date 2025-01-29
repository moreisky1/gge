// 7444108096217614075 - Обработка кнопок (platformaexpert2)

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
    var form_field;
    for (elem in ArraySelect(customFields, "This.isReq == true")) {
        form_field = get_form_field(oFormFields, elem.code)
        // alert(elem.name + " - " + form_field + ", " + DataType(form_field))
        if (form_field == "" || form_field == "0") {
            fields.push(elem.name)
        }
    }
    return ArrayMerge(fields, "This", "; ");
}

function get_form_field(oFields, sName) {
    var catElem = ArrayOptFind(oFields, "This.name == sName");
    return catElem == undefined ? "" : catElem.value;
}

function newDoc(oFormFields) {
    var docRequest = tools.new_doc_by_name("request", false);
    docRequest.BindToDb(DefaultDb);
    var teRequest = docRequest.TopElem;
    var userID = 7241154938841094958 // ya
    teRequest.person_id = userID;
    tools.common_filling( "collaborator", teRequest, userID);
    teRequest.request_type_id = 7444167795860645886; // CustDEV ЕЦПЭ
    teRequest.custom_elems.ObtainChildByKey("fld_lastname").value = get_form_field(oFormFields, "fld_lastname");
    teRequest.custom_elems.ObtainChildByKey("fld_firstname").value = get_form_field(oFormFields, "fld_firstname");
    teRequest.custom_elems.ObtainChildByKey("fld_middlename").value = get_form_field(oFormFields, "fld_middlename");
    teRequest.custom_elems.ObtainChildByKey("fld_org").value = get_form_field(oFormFields, "fld_org");
    teRequest.custom_elems.ObtainChildByKey("fld_position").value = get_form_field(oFormFields, "fld_position");
    teRequest.custom_elems.ObtainChildByKey("fld_email").value = get_form_field(oFormFields, "fld_email");
    teRequest.custom_elems.ObtainChildByKey("fld_phone").value = get_form_field(oFormFields, "fld_phone");
    teRequest.custom_elems.ObtainChildByKey("fld_checkbox1").value = get_form_field(oFormFields, "fld_checkbox1");
    teRequest.custom_elems.ObtainChildByKey("fld_checkbox2").value = get_form_field(oFormFields, "fld_checkbox2");
    docRequest.Save();
    sendEmail(teRequest);
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

function sendEmail(teRequest) {
    // var nlib = gge.getLib("notif_lib");
    var body = "";
    var customTemplates = custom_templates.request_type.items.ObtainChildByKey(7444167795860645886); // CustDEV ЕЦПЭ
    for (ce in teRequest.custom_elems) {
        body += "<div>" + ArrayOptFindByKey(customTemplates.fields, ce.name.Value, "name").title.Value + "</div>"
        body += "<div>" + StrReplace(ce.value.Value, "\n", "<br>") + "</div>"
    }
    var params = {
        subject: "CustDEV ЕЦПЭ",
        body: body,
        emails: ["d.rashin@gge.ru"]
        // emails: ["u.daribazaron@gge.ru"]
    }
    sendActiveNotif(params);
}

try {
    if (curObject != null) {
        var oFormFields = parse_form_fields(SCOPE_WVARS.GetOptProperty("form_fields"));
        var customFields = [
            {"name": "Фамилия", "code": "fld_lastname", "isReq": true},
            {"name": "Имя", "code": "fld_firstname", "isReq": true},
            {"name": "Отчество", "code": "fld_middlename", "isReq": false},
            {"name": "Организация", "code": "fld_org", "isReq": true},
            {"name": "Должность", "code": "fld_position", "isReq": true},
            {"name": "Адрес электронной почты", "code": "fld_email", "isReq": false},
            {"name": "Телефон", "code": "fld_phone", "isReq": true},
            {"name": "Согласие с обработкой персональных данных", "code": "fld_checkbox1", "isReq": true},
            {"name": "Согласие 2", "code": "fld_checkbox2", "isReq": false},    
        ];
        var check_fields_msg = check_fields(oFormFields, customFields);
        if (check_fields_msg == "") {
            newDoc(oFormFields);
            RESULT = {
                command: "alert",
                msg: "Благодарим за участие! Мы скоро с вами свяжемся.",
                confirm_result: {
                    command: "redirect",
                    redirect_url: "https://cvk.gge.ru/_wt/platformaexpert2/7442695412454710660"
                },
            };
        } else {
            RESULT = {
                command: "alert",
                msg: "Заполните обязательные поля: " + check_fields_msg,
            };
        }
    } else {
        RESULT = {
            command: "alert",
            msg: "NO event",
        };
    }
} catch (e) {
    RESULT = {
        command: "alert",
        msg: ExtractUserError(e),
    };
}