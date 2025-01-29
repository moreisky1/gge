// 7269738612966110179 - Обработка кнопок ДО (Заявка на децентрализованное обучение)

logger = {
    isLog: true,
    logType: "report",
    logName: "7269738612966110179",
}
var l = gge.getLib("log_lib");
var personalLib = gge.getLib("personal_lib");
var notifLib = gge.getLib("notif_lib");
var dlib = gge.getLib("develop");

function setFields(teRequest, sFormFields, sAction) {
    if (sAction == "0" || sAction == "2_1") {
        var CONTEXT = sFormFields == "" || sFormFields == null ? ({}) : ParseJson( sFormFields );
        var curWorkflowID = teRequest.workflow_id.Value;
        var curWorkflow = OpenDoc(UrlFromDocID(curWorkflowID)).TopElem;
        try {
            for (fldFieldGroupElem in curWorkflow.field_groups) {
                if (!tools.safe_execution(fldFieldGroupElem.read_conditions.condition_eval_str)) {
                    continue;
                }
                if (!tools.safe_execution(fldFieldGroupElem.write_conditions.condition_eval_str)) {
                    continue;
                }
                for (fldWorkflowFieldElem in ArraySelectByKey(curWorkflow.workflow_fields, fldFieldGroupElem.code, 'field_group_id')) {
                    try {
                        oValue = ArrayOptFindByKey( CONTEXT, fldWorkflowFieldElem.name, "name" );
                        if (oValue == undefined) {
                            continue;
                        }
                        sValue = oValue.value;
                        teRequest.workflow_fields.ObtainChildByKey( fldWorkflowFieldElem.name ).value = sValue;
                    }
                    catch (err) {
                        l.write(logger, err);
                    }
                }
            }
        }
        catch (e) {
            l.write(logger, e);
        }
    }
}

function GetPersonRequestActionWorkflowFieldsEnv(teRequest, sAction) {
    var oRes = tools.get_code_library_result_object();
    oRes.fields = [];
    var iWorkflowID = teRequest.workflow_id.Value;
    var teWorkflow = OpenDoc( UrlFromDocID( iWorkflowID ) ).TopElem;
    var arrWorkflowFields = [];

    if (sAction == "0") {
        for (fldFieldElem in ArraySelectByKey(teWorkflow.workflow_fields, "cancel_reason", "field_group_id")) {
            arrWorkflowFields.push( fldFieldElem );
        }
    }
    if (sAction == "2_1") {
        for (fldFieldElem in ArraySelectByKey(teWorkflow.workflow_fields, "priority", "field_group_id")) {
            arrWorkflowFields.push( fldFieldElem );
        }
    }
    for (fldWorkflowFieldElem in arrWorkflowFields) {
        sValue = "";
        fldWorkflowField = teRequest.workflow_fields.GetOptChildByKey( fldWorkflowFieldElem.PrimaryKey );
        if (fldWorkflowField != undefined) {
            sValue = fldWorkflowField.value.Value;
        }
        entrs = [];
        for (entr in fldWorkflowFieldElem.entries) {
            entrs.push({name: String(entr.value), value: String(entr.value)});
        }
        oRes.fields.push({
            "id": fldWorkflowFieldElem.PrimaryKey.Value,
            "title": ( curLng == null ? fldWorkflowFieldElem.title.Value : tools_web.get_cur_lng_name( fldWorkflowFieldElem.title.Value, curLng.short_id ) ),
            "value": sValue,
            "type": fldWorkflowFieldElem.type.Value,
            "entries": entrs,
            "catalog": fldWorkflowFieldElem.catalog.Value,
            "tooltip": fldWorkflowFieldElem.tooltip.Value,
            "query_qual": fldWorkflowFieldElem.xquery_qual.Value,
            "is_required": fldWorkflowFieldElem.is_required.Value,
        });
    }
    return oRes;
}

function getFirstCol(teRequest) {
    var collaborators = teRequest.custom_elems.GetOptChildByKey("collaborators");
    var person1 = undefined;
    if (collaborators != undefined) {
        person1 = collaborators.value.Value.split(";")[0];
    }
    return person1;
}

function sendEmails(objectID) {
    var teRequest = tools.open_doc(objectID).TopElem; 
    var bossTypeID = "7070444973261573463"; // Ответственный за обучение
    bossTypeID = undefined;
    var person1 = getFirstCol(teRequest);
    var subdivisionID = tools.get_doc_by_key("collaborator", "id", OptInt(person1)).TopElem.position_parent_id;
    var parentSubdivisionID = personalLib.getParentSubdivisionID(subdivisionID);
    var recipientIDs = [];
    var subdivision_bosses = dlib.ceValue(teRequest, "subdivision_bosses");
    if (teRequest.workflow_state == "0") {
        recipientIDs = [teRequest.person_id.Value];
    } else if (teRequest.workflow_state == "3") {
        // recipientIDs = personalLib.getGroupCollaboratorIDs("7273085857227831636"); // Ответственные от УЦ за согласование
        recipientIDs = [];
    } else if (teRequest.workflow_state == "2") {
        if (subdivision_bosses != undefined && subdivision_bosses != "") {
            recipientIDs = subdivision_bosses.split(";");
        } else {
            recipientIDs = personalLib.getSubdivisionFmIDs(parentSubdivisionID, bossTypeID);
        }
    }
    if (ArrayCount(recipientIDs)) {
        var notifTemplateID = "7274490988887933049"; // Заявка переведена на этап ДО
        var request_url = "";
        var cancel_reason = "";
        if (teRequest.workflow_state == "0") {
            request_url = global_settings.settings.portal_base_url.Value + "/_wt/request_educ_gge/" + teRequest.id.Value;
            cancel_reason = teRequest.workflow_fields.ObtainChildByKey("cancel_reason").value.Value
        } else {
            request_url = global_settings.settings.portal_base_url.Value + "/_wt/" + teRequest.id.Value;
        }
        var replaces = [
            {"name": "[request_code]", "value": teRequest.code.Value},
            {"name": "[request_workflow_state_name]", "value": teRequest.workflow_state_name.Value},
            {"name": "[request_url]", "value": request_url},
            {"name": "[cancel_reason]", "value": cancel_reason},
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

function setState(teRequest, user, sAction) {

    var fldLogEntryChild = teRequest.workflow_log_entrys.AddChild();
    fldLogEntryChild.create_date = Date();
    fldLogEntryChild.action_id = sAction;
    fldLogEntryChild.person_id = user.id.Value;
    fldLogEntryChild.person_fullname = user.fullname;
    fldLogEntryChild.begin_state = teRequest.workflow_state;

    if (sAction == "0") {
        teRequest.workflow_state = "0";
        teRequest.workflow_state_name = "Доработка";
    } else if (sAction == "1_1") {
        teRequest.workflow_state = "2";
        teRequest.workflow_state_name = "Согласование руководителем подразделения";
    } else if (sAction == "2_1") {
        teRequest.workflow_state = "3";
        teRequest.workflow_state_name = "Согласование Учебным центром";
    } else if (sAction == "3_1") {
        teRequest.status_id = "close";
    }

    fldLogEntryChild.finish_state = teRequest.workflow_state;
    fldLogEntryChild.submited = true;
}

try {
    l.open(logger);

    sAction = "" + ParseJson(_ITEM_).action_id;

    if (command == "eval") {
        oLibRes = GetPersonRequestActionWorkflowFieldsEnv(curObject, sAction);
        ERROR = oLibRes.error;
        MESSAGE = tools.get_code_library_error_message(oLibRes, Env);;

        var arrFields = oLibRes.fields;
        if (ArrayCount(arrFields) == 0) {
            command = "submit_form";
        } else {
            RESULT = {
                command: "display_form",
                title: "Поля документооборота",
                message: "Заполните поля",
                form_fields: [],
                buttons: [
                    { name: "submit", label: "Сохранить", type: "submit" },
                    { name: "cancel", label: "Отменить", type: "cancel" }
                ],
                no_buttons: false
            };
            for (oFieldElem in arrFields) {
                RESULT.form_fields.push({
                    name: oFieldElem.id,
                    label: oFieldElem.title,
                    type: oFieldElem.type,
                    entries: oFieldElem.entries,
                    value: oFieldElem.value,
                    catalog: oFieldElem.GetOptProperty( "catalog", "" ),
                    query_qual: oFieldElem.GetOptProperty( "query_qual", "" ),
                    mandatory: oFieldElem.is_required,
                    validation: "nonempty",
                });
            }
        }
    }

    if (command == "submit_form") {
        if (sAction == "10") {
            sendEmails(curObjectID);
        } else {
            setState(curObject, curUser, sAction);
            if (sAction == "0" || sAction == "2_1") setFields(curObject, form_fields, sAction);
            curObject.Doc.Save();
            sendEmails(curObjectID);
        }
        RESULT = {
            command: "close_form",
            confirm_result: {
                command: "reload_page"
            }
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
