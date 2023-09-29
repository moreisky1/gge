// 7268270853620897451 - Обработка кнопок (Заявка на централизованное обучение)

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
        if (get_form_field(oFormFields, elem.code) == "") {
            fields.push(elem.name)
        }
    }
    return ArrayMerge(fields, "This", "; ");
}

function newRequest(oFormFields, user) {
    var docRequest = tools.new_doc_by_name("request", false);
    docRequest.BindToDb(DefaultDb);
    var teRequest = docRequest.TopElem;
    teRequest.person_id = user.id.Value;
    tools.common_filling( "collaborator", teRequest, user.id.Value, user);
    teRequest.request_type_id = 7268266412676422854; // Заявка на централизованное обучение
    teRequest.custom_elems.ObtainChildByKey("qualifications").value = get_form_field(oFormFields, "fld_qualifications");
    teRequest.custom_elems.ObtainChildByKey("subdivisions").value = get_form_field(oFormFields, "fld_subdivisions");
    teRequest.custom_elems.ObtainChildByKey("position_commons").value = get_form_field(oFormFields, "fld_position_commons");
    teRequest.custom_elems.ObtainChildByKey("event_name").value = get_form_field(oFormFields, "fld_event_name");
    teRequest.custom_elems.ObtainChildByKey("event_type").value = get_form_field(oFormFields, "fld_event_type");
    teRequest.custom_elems.ObtainChildByKey("event_form").value = get_form_field(oFormFields, "fld_event_form");
    teRequest.custom_elems.ObtainChildByKey("event_period").value = get_form_field(oFormFields, "fld_event_period");
    teRequest.custom_elems.ObtainChildByKey("base").value = get_form_field(oFormFields, "fld_base");
    teRequest.custom_elems.ObtainChildByKey("comment").value = get_form_field(oFormFields, "fld_comment");
    teRequest.object_name = get_form_field(oFormFields, "fld_event_name");
    docRequest.Save();

    return docRequest.DocID;
}

try {
    var oFormFields = parse_form_fields(SCOPE_WVARS.GetOptProperty("form_fields"));
    var customFields = [
        {"name": "Направления", "code": "fld_qualifications", "isReq": true},
        {"name": "Подразделения", "code": "fld_subdivisions", "isReq": true},
        {"name": "Типовые должности", "code": "fld_position_commons", "isReq": true},
        {"name": "Тема", "code": "fld_event_name", "isReq": true},
        {"name": "Вид", "code": "fld_event_type", "isReq": true},
        {"name": "Форма", "code": "fld_event_form", "isReq": true},
        {"name": "Квартал", "code": "fld_event_period", "isReq": true},
        {"name": "Цель прохождения", "code": "fld_base", "isReq": true},
        {"name": "Комментарий", "code": "fld_comment", "isReq": false},
    ];
    var check_fields_msg = check_fields(oFormFields, customFields);
    if (check_fields_msg == "") {
        var id = newRequest(oFormFields, curUser);
        RESULT = {
            command: "alert",
            msg: "Отправлено",
            confirm_result: {
                command: "redirect",
                redirect_url: "http://sdo.expertiza.ru/_wt/" + id
            },
        };
    } else {
        RESULT = {
            command: "alert",
            msg: "Заполните обязательные поля: " + check_fields_msg,
        };
    }
} catch (e) {
    RESULT = {
        command: "alert",
        msg: ExtractUserError(e),
    };
}
