// 7317166081410743423 - Обработка кнопок (check-list)

logger = {
    isLog: true,
    logType: "report",
    logName: "7317166081410743423",
}
var l = gge.getLib("log_lib");
// var plib = gge.getLib("personal_lib");
// var nlib = gge.getLib("notif_lib");
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

function get_form_field(oFields, sName) {
    var catElem = ArrayOptFind(oFields, "This.name == sName");
    return catElem == undefined ? "" : catElem.value;
}

function newDoc(oFormFields) {
    var docRequest = tools.new_doc_by_name("request", false);
    docRequest.BindToDb(DefaultDb);
    var teRequest = docRequest.TopElem;
    // teRequest.person_id = user.id.Value;
    // tools.common_filling( "collaborator", teRequest, user.id.Value, user);
    teRequest.request_type_id = 7316573791901411159; // Чек-лист ЦВК
    teRequest.custom_elems.ObtainChildByKey("fld_check_list1").value = get_form_field(oFormFields, "fld_check_list1");
    teRequest.custom_elems.ObtainChildByKey("fld_check_list2").value = get_form_field(oFormFields, "fld_check_list2");
    teRequest.custom_elems.ObtainChildByKey("fld_check_list3").value = get_form_field(oFormFields, "fld_check_list3");
    teRequest.custom_elems.ObtainChildByKey("fld_check_list4").value = get_form_field(oFormFields, "fld_check_list4");
    teRequest.custom_elems.ObtainChildByKey("fld_check_list5").value = get_form_field(oFormFields, "fld_check_list5");
    teRequest.custom_elems.ObtainChildByKey("fld_check_list6").value = get_form_field(oFormFields, "fld_check_list6");
    teRequest.custom_elems.ObtainChildByKey("fld_check_list7").value = get_form_field(oFormFields, "fld_check_list7");
    teRequest.custom_elems.ObtainChildByKey("fld_check_list8").value = get_form_field(oFormFields, "fld_check_list8");
    teRequest.custom_elems.ObtainChildByKey("fld_check_list9").value = get_form_field(oFormFields, "fld_check_list9");
    teRequest.custom_elems.ObtainChildByKey("fld_check_list10").value = get_form_field(oFormFields, "fld_check_list10");
    teRequest.custom_elems.ObtainChildByKey("fld_check_list11").value = get_form_field(oFormFields, "fld_check_list11");
    teRequest.custom_elems.ObtainChildByKey("fld_check_list12").value = get_form_field(oFormFields, "fld_check_list12");
    teRequest.custom_elems.ObtainChildByKey("fld_check_list13").value = get_form_field(oFormFields, "fld_check_list13");
    teRequest.custom_elems.ObtainChildByKey("fld_check_list14").value = get_form_field(oFormFields, "fld_check_list14");
    teRequest.custom_elems.ObtainChildByKey("fld_check_list15").value = get_form_field(oFormFields, "fld_check_list15");
    teRequest.custom_elems.ObtainChildByKey("fld_check_list16").value = get_form_field(oFormFields, "fld_check_list16");
    docRequest.Save();
    var email = get_form_field(oFormFields, "email")
    sendEmail(teRequest, email);

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

function sendEmail(teRequest, email) {
    // var nlib = gge.getLib("notif_lib");
    var body = "";
    var customTemplates = custom_templates.request_type.items.ObtainChildByKey(7316573791901411159); // Чек-лист ЦВК;
    for (ce in teRequest.custom_elems) {
        body += "<div>" + ArrayOptFindByKey(customTemplates.fields, ce.name.Value, "name").title.Value + "</div>"
        body += "<div>" + StrReplace(ce.value.Value, "\n", "<br>") + "</div>"
    }
    var params = {
        subject: "Чек-лист ЦВК",
        body: body,
        emails: [email, "a.semin@gge.ru"]
    }
    sendActiveNotif(params);
}

try {
    l.open(logger);
    var oFormFields = parse_form_fields(SCOPE_WVARS.GetOptProperty("form_fields"));
    for (oFormField in oFormFields) {
        if (StrContains(oFormField.name, "fld_check_list")) {
            oFormField.type = "hidden"
        }
    }

    // l.write(logger, "try")
    switch (command) {
        case "eval":
            nextCommand = "first_form";
            // l.write(logger, "eval")
        case "submit_form":
            // l.write(logger, "submit_form")

            try {
                nextCommand = ArrayOptFindByKey(oFormFields, "__next", "name").value;
            } catch (_x_) {}
            switch (nextCommand) {
                case "first_form":
                    // l.write(logger, "first_form")
                    var oForm = {
                        command: "display_form",
                        title: "Электронная почта",
                        form_fields: oFormFields
                    };
                    oForm.form_fields.push({"name": "email", "type": "string", "label": "Email", "mandatory": true, "validation": "nonempty"});
                    oForm.form_fields.push({"name": "__next", "type": "hidden", "value": "new"});
                    RESULT = oForm;
                    break;
                case "new":
                    // l.write(logger, "new")
                    var saveFields = ArraySelect(oFormFields, "!StrContains(This.name, '__')");
                    var docID = newDoc(saveFields);
                    
                    RESULT = {
                        command: "close_form",
                        confirm_result: {
                            command: "alert",
                            msg: "Чек лист отправлен на почту"
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
    RESULT = {
        command: "alert",
        msg: ExtractUserError(error),
    };
}