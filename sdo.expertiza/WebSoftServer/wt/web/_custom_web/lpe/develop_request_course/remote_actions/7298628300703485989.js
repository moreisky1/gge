// 7298628300703485989 - Обработка кнопок (Заявка на разработку электронного курса)

logger = {
    isLog: false,
    logType: "report",
    logName: "7298628300703485989",
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
        if (get_form_field(oFormFields, elem.code) == "") {
            fields.push(elem.name)
        }
    }
    return ArrayMerge(fields, "This", "; ");
}

function SaveFileInResource(oFile, iPersonID, tePerson) {
    var iPath = null;

    if (oFile != undefined && oFile.HasProperty("url") && oFile.url != "") {
        docResource = OpenNewDoc('x-local://wtv/wtv_resource.xmd');
        docResource.TopElem.person_id = iPersonID;
        tools.common_filling('collaborator', docResource.TopElem, iPersonID, tePerson);
        docResource.BindToDb();
        docResource.TopElem.put_data(oFile.url);
        docResource.Save();

        iPath = docResource.DocID;
    }

    return iPath;
}

function sendEmail(id, user) {
    var nlib = gge.getLib("notif_lib");
    var requestUrl = global_settings.settings.portal_base_url.Value + "/_wt/" + id;
    var params = {
        subject: "Заявка на разработку электронного курса",
        body: "<div>Новая заявка от пользователя " + user.fullname + " <a href='" + requestUrl + "'>" + requestUrl + "</a></div>",
        recipientIDs: [6769089066357701563], // Семин Андрей Владимирович
        resourceIDs: [],
    }
    nlib.sendActiveNotif(params);
}

function newRequest(oFormFields, user) {
    var docRequest = tools.new_doc_by_name("request", false);
    docRequest.BindToDb(DefaultDb);
    var teRequest = docRequest.TopElem;
    teRequest.person_id = user.id.Value;
    tools.common_filling( "collaborator", teRequest, user.id.Value, user);
    teRequest.request_type_id = 7275040976411363103; // Заявка на разработку электронного курса

    teRequest.custom_elems.ObtainChildByKey("course_name").value = get_form_field(oFormFields, "fld_course_name");
    teRequest.custom_elems.ObtainChildByKey("course_goals").value = get_form_field(oFormFields, "fld_course_goals");
    teRequest.custom_elems.ObtainChildByKey("course_audience").value = get_form_field(oFormFields, "fld_course_audience");
    teRequest.custom_elems.ObtainChildByKey("course_requirements").value = get_form_field(oFormFields, "fld_course_requirements");
    teRequest.custom_elems.ObtainChildByKey("course_base").value = get_form_field(oFormFields, "fld_course_base");
    teRequest.custom_elems.ObtainChildByKey("course_end_date").value = get_form_field(oFormFields, "fld_course_end_date");

    oFileTemp = ArrayOptFind(oFormFields, "This.name == 'fld_course_content'");
    iFileTemp = SaveFileInResource(oFileTemp, user.id.Value, user);
    teRequest.custom_elems.ObtainChildByKey("course_content").value = iFileTemp;

    teRequest.custom_elems.ObtainChildByKey("course_assessment").value = get_form_field(oFormFields, "fld_course_assessment");

    teRequest.object_name = get_form_field(oFormFields, "fld_course_name");
    teRequest.workflow_state = "1";
    teRequest.workflow_state_name = "На согласовании";
    teRequest.workflow_id = 7298996508768875710; // ДО Заявка на разработку электронного курса
    docRequest.Save();

    sendEmail(docRequest.DocID, user);

    return docRequest.DocID;
}

try {
    l.open(logger);

    var oFormFields = parse_form_fields(SCOPE_WVARS.GetOptProperty("form_fields"));

    var customFields = [
        {"name": "Наименование курса", "code": "fld_course_name", "isReq": true},
        {"name": "Цели разработки курса", "code": "fld_course_goals", "isReq": true},
        {"name": "Аудитория курса", "code": "fld_course_audience", "isReq": true},
        {"name": "Необходимая начальная подготовка обучающихся", "code": "fld_course_requirements", "isReq": true},
        {"name": "Основание для создания курса", "code": "fld_course_base", "isReq": false},
        {"name": "Требуемый срок окончания разработки курса", "code": "fld_course_end_date", "isReq": true},
        {"name": "Материалы для разработки электронного курса", "code": "fld_course_content", "isReq": true},
        {"name": "Проверка знаний по курсу", "code": "fld_course_assessment", "isReq": true},
    ];

    var check_fields_msg = check_fields(oFormFields, customFields);
    if (check_fields_msg == "") {
        var id = newRequest(oFormFields, curUser);

        RESULT = {
            // command: "alert",
            // msg: "Отправлено",
            // confirm_result: {
                command: "redirect",
                redirect_url: "http://sdo.expertiza.ru/_wt/request_complete"
            // },
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