// 7407393490684306325 - Обработка кнопок (contacs_request)

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

function newPollResult(oFormFields) {
    var docPR = tools.new_doc_by_name("poll_result", false);
    docPR.BindToDb(DefaultDb);
    var tePR = docPR.TopElem;
    tePR.poll_id = 7407060346989711293; // Материалы спикеров сессии
    tePR.is_done = true;
    tePR.status = "2";
    newQ = tePR.questions.AddChild();

    newQ.id = "52100180"
    newQ.value = get_form_field(oFormFields, "fld_lastname");

    newQ = tePR.questions.AddChild();
    newQ.id = "29622765"
    newQ.value = get_form_field(oFormFields, "fld_firstname");

    newQ = tePR.questions.AddChild();
    newQ.id = "44341479"
    newQ.value = get_form_field(oFormFields, "fld_middlename");

    newQ = tePR.questions.AddChild();
    newQ.id = "75138183"
    newQ.value = get_form_field(oFormFields, "fld_org");

    newQ = tePR.questions.AddChild();
    newQ.id = "42929738"
    newQ.value = get_form_field(oFormFields, "fld_position");

    newQ = tePR.questions.AddChild();
    newQ.id = "11132745"
    fld_role = get_form_field(oFormFields, "fld_role")
    switch (fld_role) {
        case 'Застройщик (технический заказчик)':
            newQ.value = "10270190"
            break
        case 'Проектировщик':
            newQ.value = "83004501"
            break
        case 'Экспертная организация':
            newQ.value = "93963826"
            break
        case 'Иное':
            newQ.value = "76992445"
            break
    }

    newQ = tePR.questions.AddChild();
    newQ.id = "83566242"
    newQ.value = get_form_field(oFormFields, "fld_email");

    newQ = tePR.questions.AddChild();
    newQ.id = "69349323"
    newQ.value = get_form_field(oFormFields, "fld_checkbox1") == "1";

    newQ = tePR.questions.AddChild();
    newQ.id = "40059019"
    newQ.value = get_form_field(oFormFields, "fld_checkbox2") == "1";

    docPR.Save();
    return docPR.DocID;
}

try {
    var oFormFields = parse_form_fields(SCOPE_WVARS.GetOptProperty("form_fields"));
    var customFields = [
        {"name": "Фамилия", "code": "fld_lastname", "isReq": true},
        {"name": "Имя", "code": "fld_firstname", "isReq": true},
        {"name": "Отчество", "code": "fld_middlename", "isReq": false},
        {"name": "Организация", "code": "fld_org", "isReq": true},
        {"name": "Должность", "code": "fld_position", "isReq": true},
        {"name": "Роль организации", "code": "fld_role", "isReq": true},
        {"name": "Адрес электронной почты", "code": "fld_email", "isReq": true},
        {"name": "Согласие с обработкой персональных данных", "code": "fld_checkbox1", "isReq": true},
        {"name": "Согласие 2", "code": "fld_checkbox2", "isReq": false},
    ];
    var check_fields_msg = check_fields(oFormFields, customFields);
    if (check_fields_msg == "") {
        newPollResult(oFormFields)
        RESULT = {
            command: "new_window",
            url: String(curObject.comment) // "download_file.html?file_id=7407435144142272178"
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