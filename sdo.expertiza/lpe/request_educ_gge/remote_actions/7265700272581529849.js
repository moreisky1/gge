// 7265700272581529849 - Обработка кнопок (Заявка на децентрализованное обучение)

logger = {
    isLog: true,
    logType: "ext",
    logName: "7265700272581529849",
}
var l = gge.getLib("log_lib");
var personalLib = gge.getLib("personal_lib");
var notifLib = gge.getLib("notif_lib");
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

function deleteRequest(objectID) {
    DeleteDoc(UrlFromDocID(OptInt(objectID)));
}

function getFirstCol(teRequest) {
    var collaborators = teRequest.custom_elems.GetOptChildByKey("collaborators");
    var person1 = undefined;
    if (collaborators != undefined) {
        person1 = collaborators.value.Value.split(";")[0];
    }
    return person1;
}

function newRequest(oFormFields, user) {
    var docRequest = tools.new_doc_by_name("request", false);
    docRequest.BindToDb(DefaultDb);
    var teRequest = docRequest.TopElem;
    teRequest.person_id = user.id.Value;
    tools.common_filling( "collaborator", teRequest, user.id.Value, user);
    teRequest.request_type_id = 7265281441174738432; // Заявка на децентрализованное обучение
    teRequest.custom_elems.ObtainChildByKey("collaborators").value = get_form_field(oFormFields, "fld_collaborators");
    teRequest.custom_elems.ObtainChildByKey("event_name").value = get_form_field(oFormFields, "fld_event_name");
    teRequest.custom_elems.ObtainChildByKey("event_type").value = get_form_field(oFormFields, "fld_event_type");
    teRequest.custom_elems.ObtainChildByKey("event_form").value = get_form_field(oFormFields, "fld_event_form");
    teRequest.custom_elems.ObtainChildByKey("event_cost").value = get_form_field(oFormFields, "fld_event_cost");
    teRequest.custom_elems.ObtainChildByKey("event_start_date").value = get_form_field(oFormFields, "fld_event_start_date");
    teRequest.custom_elems.ObtainChildByKey("event_period").value = get_form_field(oFormFields, "fld_event_period");
    teRequest.custom_elems.ObtainChildByKey("education_org").value = get_form_field(oFormFields, "fld_education_org");
    teRequest.custom_elems.ObtainChildByKey("education_org_new").value = get_form_field(oFormFields, "fld_education_org_new");
    teRequest.custom_elems.ObtainChildByKey("education_programm_URL").value = get_form_field(oFormFields, "fld_education_programm_URL");
    teRequest.custom_elems.ObtainChildByKey("city").value = get_form_field(oFormFields, "fld_city");
    teRequest.custom_elems.ObtainChildByKey("base").value = get_form_field(oFormFields, "fld_base");
    teRequest.custom_elems.ObtainChildByKey("lector").value = get_form_field(oFormFields, "fld_lector");
    teRequest.custom_elems.ObtainChildByKey("comment").value = get_form_field(oFormFields, "fld_comment");
    teRequest.object_name = get_form_field(oFormFields, "fld_event_name");
    teRequest.workflow_state = "0";
    teRequest.workflow_state_name = "Доработка";
    teRequest.workflow_id = 7265268818410614233;
    docRequest.Save();

    return docRequest.DocID;
}

function setFields(oFormFields, teRequest) {
    teRequest.custom_elems.ObtainChildByKey("collaborators").value = get_form_field(oFormFields, "fld_collaborators");
    teRequest.custom_elems.ObtainChildByKey("event_name").value = get_form_field(oFormFields, "fld_event_name");
    teRequest.custom_elems.ObtainChildByKey("event_type").value = get_form_field(oFormFields, "fld_event_type");
    teRequest.custom_elems.ObtainChildByKey("event_form").value = get_form_field(oFormFields, "fld_event_form");
    teRequest.custom_elems.ObtainChildByKey("event_cost").value = get_form_field(oFormFields, "fld_event_cost");
    teRequest.custom_elems.ObtainChildByKey("event_start_date").value = get_form_field(oFormFields, "fld_event_start_date");
    teRequest.custom_elems.ObtainChildByKey("event_period").value = get_form_field(oFormFields, "fld_event_period");
    teRequest.custom_elems.ObtainChildByKey("education_org").value = get_form_field(oFormFields, "fld_education_org");
    teRequest.custom_elems.ObtainChildByKey("education_org_new").value = get_form_field(oFormFields, "fld_education_org_new");
    teRequest.custom_elems.ObtainChildByKey("education_programm_URL").value = get_form_field(oFormFields, "fld_education_programm_URL");
    teRequest.custom_elems.ObtainChildByKey("city").value = get_form_field(oFormFields, "fld_city");
    teRequest.custom_elems.ObtainChildByKey("base").value = get_form_field(oFormFields, "fld_base");
    teRequest.custom_elems.ObtainChildByKey("lector").value = get_form_field(oFormFields, "fld_lector");
    teRequest.custom_elems.ObtainChildByKey("comment").value = get_form_field(oFormFields, "fld_comment");
    teRequest.object_name = get_form_field(oFormFields, "fld_event_name");
}

function sendEmails(teRequest) {
    var bossTypeID = "7070444973261573463"; // Ответственный за обучение
    bossTypeID = undefined;
    var person1 = getFirstCol(teRequest);
    var subdivisionID = tools.get_doc_by_key("collaborator", "id", person1).TopElem.position_parent_id;
    var department_bosses = dlib.ceValue(teRequest, "department_bosses");
    var subdivision_bosses = dlib.ceValue(teRequest, "subdivision_bosses");

    var recipientIDs = [];
    if (teRequest.workflow_state == "1" && department_bosses != undefined && department_bosses != "") {
        recipientIDs = department_bosses.split(";");
    } else if (teRequest.workflow_state == "2" && subdivision_bosses != undefined && subdivision_bosses != "") {
        recipientIDs = subdivision_bosses.split(";");
    } else {
        recipientIDs = personalLib.getSubdivisionFmIDs(subdivisionID, bossTypeID);
    }
    
    if (ArrayCount(recipientIDs)) {
        var notifTemplateID = "7274490988887933049"; // Заявка переведена на этап ДО
        var replaces = [
            {"name": "[request_code]", "value": teRequest.code.Value},
            {"name": "[request_workflow_state_name]", "value": teRequest.workflow_state_name.Value},
            {"name": "[request_url]", "value": global_settings.settings.portal_base_url.Value + "/_wt/" + teRequest.id.Value},
            {"name": "[cancel_reason]", "value": ""},
        ];
        var obj = notifLib.getNTSubjectBody(notifTemplateID, replaces);
        var params = {
            subject: obj.subject,
            body: obj.body,
            recipientIDs: recipientIDs,
            resourceIDs: [],
        }
        notifLib.sendActiveNotif(params);
    }
}

function setState(teRequest, user) {
    var person1 = getFirstCol(teRequest);
    var isPersonFromCA = personalLib.isPersonFromCA(person1);
    var subdivisionID = tools.get_doc_by_key("collaborator", "id", person1).TopElem.position_parent_id;
    var subdivisionLevel = personalLib.getSubdivisionLevel(subdivisionID);

    var fldLogEntryChild = teRequest.workflow_log_entrys.AddChild();
    fldLogEntryChild.create_date = Date();
    fldLogEntryChild.action_id = sAction;
    fldLogEntryChild.person_id = user.id.Value;
    fldLogEntryChild.person_fullname = user.fullname;
    fldLogEntryChild.begin_state = teRequest.workflow_state;

    if (isPersonFromCA) {
        if (subdivisionLevel == 2) {
            teRequest.workflow_state = "1";
            teRequest.workflow_state_name = "Согласование руководителем отдела";
        } else if (subdivisionLevel == 1) {
            teRequest.workflow_state = "2";
            teRequest.workflow_state_name = "Согласование руководителем подразделения";
        }
    } else {
        if (subdivisionLevel == 1) {
            teRequest.workflow_state = "1";
            teRequest.workflow_state_name = "Согласование руководителем отдела";
        } else if (subdivisionLevel == 0) {
            teRequest.workflow_state = "2";
            teRequest.workflow_state_name = "Согласование руководителем подразделения";
        }
    }

    fldLogEntryChild.finish_state = teRequest.workflow_state;
    fldLogEntryChild.submited = true;
}

try {
    l.open(logger);

    var sAction = "" + ParseJson(_ITEM_).action_id;
    var oFormFields = parse_form_fields(SCOPE_WVARS.GetOptProperty("form_fields"));
    var customFields = [
        {"name": "Работники", "code": "fld_collaborators", "isReq": true},
        {"name": "Тема", "code": "fld_event_name", "isReq": true},
        {"name": "Вид", "code": "fld_event_type", "isReq": true},
        {"name": "Форма", "code": "fld_event_form", "isReq": true},
        {"name": "Стоимость", "code": "fld_event_cost", "isReq": true},
        {"name": "Дата начала", "code": "fld_event_start_date", "isReq": false},
        {"name": "Квартал", "code": "fld_event_period", "isReq": false},
        {"name": "Организация каталог", "code": "fld_education_org", "isReq": false},
        {"name": "Организация", "code": "fld_education_org_new", "isReq": false},
        {"name": "Ссылка", "code": "fld_education_programm_URL", "isReq": true},
        {"name": "Место", "code": "fld_city", "isReq": true},
        {"name": "Цель прохождения", "code": "fld_base", "isReq": true},
        {"name": "Лектор", "code": "fld_lector", "isReq": false},
        {"name": "Комментарий", "code": "fld_comment", "isReq": false},
    ];
    var check_fields_msg = "";
    if (sAction == "1" || sAction == "2") { // Сохранить, Отправить на согласование
        check_fields_msg = check_fields(oFormFields, customFields);
        if (check_fields_msg != "") {
            RESULT = {
                command: "alert",
                msg: "Заполните обязательные поля: " + check_fields_msg,
            };
        } else {
            var id;
            if (sAction == "1") { // Сохранить
                if (curObjectID == "") {
                    id = newRequest(oFormFields, curUser);
                } else {
                    id = curObjectID;
                    setFields(oFormFields, curObject);
                    curObject.Doc.Save();
                }
                RESULT = {
                    command: "alert",
                    msg: "Ваша заявка сохранена. Для дальнейшего согласования нажмите на кнопку <strong>&laquo;Отправить на согласование&raquo;</strong>",
                    confirm_result: {
                        command: "redirect",
                        redirect_url: "http://sdo.expertiza.ru/_wt/request_educ_gge/" + id
                    },
                };
            } else if (sAction == "2") { // Отправить на согласование
                setFields(oFormFields, curObject);
                setState(curObject, curUser);
                curObject.Doc.Save();
                sendEmails(curObject);
                RESULT = {
                    command: "alert",
                    msg: "Отправлено",
                    confirm_result: {
                        command: "redirect",
                        redirect_url: "http://sdo.expertiza.ru/_wt/" + curObjectID
                    },
                };
            }
        }
    } else if (sAction == "3") { // Удалить
        deleteRequest(curObjectID);
        RESULT = {
            command: "alert",
            msg: "Удалено",
            confirm_result: {
                command: "redirect",
                redirect_url: "http://sdo.expertiza.ru/_wt/request_educ_gge/"
            },
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
