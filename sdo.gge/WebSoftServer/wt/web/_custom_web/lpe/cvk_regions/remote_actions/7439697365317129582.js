// 7439697365317129582 - Обработка кнопок (cvk_regions)

logger = {
    isLog: false,
    logType: "report",
    logName: "7439697365317129582",
}
var l = gge.getLib("log_lib");
var plib = gge.getLib("personal_lib");
// var nlib = gge.getLib("notif_lib");
var dlib = gge.getLib("develop");

function parse_form_fields(sFormFields) {
    var arrFormFields = undefined;
    try {
        arrFormFields = ParseJson(sFormFields);
    } catch (e) {
        arrFormFields = [];
    }
    return arrFormFields;
}

function get_form_field(oFields, sName) {
    var catElem = ArrayOptFind(oFields, "This.name == sName");
    return catElem == undefined ? "" : catElem.value;
}

function check_fields(oFormFields, customFields) {
    var fields = [];
    for (elem in ArraySelect(customFields, "This.isReq == true")) {
        if (get_form_field(oFormFields, elem.code) == "" || get_form_field(oFormFields, elem.code) == "0") {
            fields.push(elem.name)
        }
    }
    return ArrayMerge(fields, "This", "; ");
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

function sendEmail(oFormFields, customFields) {
    var body = "<div>";
    for (elem in customFields) {
        if (elem.code == "fld_region") {
            body += elem.name + " - " + tools.open_doc(get_form_field(oFormFields, "fld_region")).TopElem.name + "<br>"
        } else {
            body += elem.name + " - " + get_form_field(oFormFields, elem.code) + "<br>"
        }
    }
    body += "</div>";
    var params = {
        subject: "Заявка cvk_regions",
        body: body,
        emails: ["edu@gge.ru"]
    }
    sendActiveNotif(params);
}

function newRequest(oFormFields) {
    var docRequest = tools.new_doc_by_name("request", false);
    docRequest.BindToDb(DefaultDb);
    var teRequest = docRequest.TopElem;
    var userID = 7241154938841094958 // ya
    teRequest.person_id = userID;
    tools.common_filling( "collaborator", teRequest, userID);
    teRequest.request_type_id = 7439694995646833698; // cvk_regions

    teRequest.custom_elems.ObtainChildByKey("fld_lastname").value = get_form_field(oFormFields, "fld_lastname");
    teRequest.custom_elems.ObtainChildByKey("fld_firstname").value = get_form_field(oFormFields, "fld_firstname");
    teRequest.custom_elems.ObtainChildByKey("fld_middlename").value = get_form_field(oFormFields, "fld_middlename");
    teRequest.custom_elems.ObtainChildByKey("fld_org").value = get_form_field(oFormFields, "fld_org");
    teRequest.custom_elems.ObtainChildByKey("fld_count").value = get_form_field(oFormFields, "fld_count");
    teRequest.custom_elems.ObtainChildByKey("fld_region").value = get_form_field(oFormFields, "fld_region");
    teRequest.custom_elems.ObtainChildByKey("fld_phone").value = get_form_field(oFormFields, "fld_phone");
    teRequest.custom_elems.ObtainChildByKey("fld_email").value = get_form_field(oFormFields, "fld_email");
    teRequest.custom_elems.ObtainChildByKey("fld_checkbox1").value = get_form_field(oFormFields, "fld_checkbox1");
    teRequest.custom_elems.ObtainChildByKey("fld_checkbox2").value = get_form_field(oFormFields, "fld_checkbox2");
    teRequest.object_name = get_form_field(oFormFields, "fld_course_name");
    docRequest.Save();

    return docRequest.DocID;
}

try {
    l.open(logger);

    var oFormFields = parse_form_fields(SCOPE_WVARS.GetOptProperty("form_fields"));

    var customFields = [
        {"name": "Фамилия", "code": "fld_lastname", "isReq": true},
        {"name": "Имя", "code": "fld_firstname", "isReq": true},
        {"name": "Отчество", "code": "fld_middlename", "isReq": false},
        {"name": "Организация", "code": "fld_org", "isReq": true},
        {"name": "Количество участников на программу", "code": "fld_count", "isReq": true},
        {"name": "Субъект РФ", "code": "fld_region", "isReq": true},
        {"name": "Телефон", "code": "fld_phone", "isReq": true},
        {"name": "Адрес электронной почты", "code": "fld_email", "isReq": true},
        {"name": "Персональные данные", "code": "fld_checkbox1", "isReq": true},
        {"name": "Рассылка", "code": "fld_checkbox2", "isReq": false},
    ];

    var check_fields_msg = check_fields(oFormFields, customFields);
    if (check_fields_msg == "") {
        var id = newRequest(oFormFields);
        sendEmail(oFormFields, customFields);
        RESULT = {
            command: "alert",
            msg: "Ваша заявка принята",
            confirm_result: {
                command: "redirect",
                redirect_url: "https://cvk.gge.ru/_wt/regions"
            },
        };
    } else {
        RESULT = {
            command: "alert",
            msg: "Заполните обязательные поля: " + check_fields_msg,
        };
    }

    l.close(logger);
} catch (error) {
    l.write(logger, error);
    l.close(logger);
    RESULT = {
        command: "alert",
        msg: ExtractUserError(error),
    };
}