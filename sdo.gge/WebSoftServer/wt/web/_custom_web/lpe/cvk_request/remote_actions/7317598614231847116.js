// 7317598614231847116 - Обработка кнопок (Заявка на бронирование помещения ЦВК)

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
    return ArrayMerge(fields, "This", "; ");
}

function prepare_date(dDate) {
    return OptDate(StrDate(dDate, false));
}

function check_date(oFormFields) {
    var eventsCVK = [];
    var startDate = OptDate(get_form_field(oFormFields, "fld_event_start_date"));
    var finishDate = OptDate(get_form_field(oFormFields, "fld_event_finish_date"));
    var msg = "";
    if (startDate > finishDate) {
        msg += "Указанная дата окончания мероприятия некорретная (раньше чем дата начала).<br>";	
    }
    eventsCVK = XQuery("for $elem in events where place_id=7264887617762771120 and start_date>Date() return $elem");
    for (elem in eventsCVK) {
        if (prepare_date(startDate) >= prepare_date(elem.start_date) && prepare_date(startDate) <= prepare_date(elem.finish_date) 
        || prepare_date(finishDate) >= prepare_date(elem.start_date) && prepare_date(finishDate) <= prepare_date(elem.finish_date)) {
            msg += "Выбранная дата недоступна для бронирования<br>";
            break;
        }        
    }
    // RESULT = {
    //     command: "alert",
    //     msg: msg,
    //     // msg: prepare_date(startDate) > prepare_date(ArrayOptFirstElem(eventsCVK).start_date) ? "true" : "false",
    // };
    return msg;
}

function get_form_field(oFields, sName) {
    var catElem = ArrayOptFind(oFields, "This.name == sName");
    return catElem == undefined ? "" : catElem.value;
}

function SaveFileInResource(oFile, iPersonID, tePerson) {
    var iPath = null;

    if (oFile != undefined && oFile.HasProperty("url") && oFile.url != "") {
        docResource = OpenNewDoc('x-local://wtv/wtv_resource.xmd');
        docResource.TopElem.person_id = iPersonID;
        tools.common_filling('collaborator', docResource.TopElem, iPersonID, tePerson);
        docResource.BindToDb();
        docResource.TopElem.put_data(oFile.url);
        docResource.TopElem.name = oFile.value;
        docResource.TopElem.file_name = oFile.value;
        docResource.TopElem.role_id.ObtainByValue(7330251450110256052); // CVK_event_programm
        docResource.Save();

        iPath = docResource.DocID;
    }

    return iPath;
}


function newRequest(oFormFields, user) {
    var docRequest = tools.new_doc_by_name("request", false);
    docRequest.BindToDb(DefaultDb);
    var teRequest = docRequest.TopElem;
    teRequest.workflow_state = "0";
    teRequest.workflow_state_name = "Формирование";
    teRequest.workflow_id = 7301213248860724614;
    teRequest.person_id = user.id.Value;
    tools.common_filling( "collaborator", teRequest, user.id.Value, user);
    teRequest.request_type_id = 7262725678821686078; 
    teRequest.custom_elems.ObtainChildByKey("fld_location").value = get_form_field(oFormFields, "fld_location");
    teRequest.custom_elems.ObtainChildByKey("fld_event_org_name").value = get_form_field(oFormFields, "fld_event_org_name");
    teRequest.custom_elems.ObtainChildByKey("fld_event_name").value = get_form_field(oFormFields, "fld_event_name");
    teRequest.custom_elems.ObtainChildByKey("fld_event_start_date").value = get_form_field(oFormFields, "fld_event_start_date");
    teRequest.custom_elems.ObtainChildByKey("fld_event_start_time").value = get_form_field(oFormFields, "fld_event_start_time");
    teRequest.custom_elems.ObtainChildByKey("fld_event_finish_date").value = get_form_field(oFormFields, "fld_event_finish_date");
    teRequest.custom_elems.ObtainChildByKey("fld_event_finish_time").value = get_form_field(oFormFields, "fld_event_finish_time");
    teRequest.custom_elems.ObtainChildByKey("fld_event_form").value = get_form_field(oFormFields, "fld_event_form");
    oFileTemp = ArrayOptFind(oFormFields, "This.name == 'fld_event_programm'");
    iFileTemp = SaveFileInResource(oFileTemp, curUser.id.Value, curUser);
    teRequest.custom_elems.ObtainChildByKey("fld_event_programm").value = iFileTemp;
    teRequest.object_name = get_form_field(oFormFields, "fld_location");
    docRequest.Save();
    return docRequest.DocID;
}

try {
    var oFormFields = parse_form_fields(SCOPE_WVARS.GetOptProperty("form_fields"));
    var customFields = [
        {"name": "Полное наименование организации, планирующей проведение мероприятия", "code": "fld_event_org_name", "isReq": true},
        {"name": "Наименование мероприятия", "code": "fld_event_name", "isReq": true},
        {"name": "Дата начала мероприятия", "code": "fld_event_start_date", "isReq": true},
        {"name": "Время начала мероприятия", "code": "fld_event_start_time", "isReq": true},
        {"name": "Дата завершения мероприятия", "code": "fld_event_finish_date", "isReq": true},
        {"name": "Время завершения мероприятия", "code": "fld_event_finish_time", "isReq": true},
        {"name": "Форма проведения мероприятия", "code": "fld_event_form", "isReq": true},
        {"name": "Проект программы мероприятия", "code": "fld_event_programm", "isReq": true},
    ];
    var check_fields_msg = check_fields(oFormFields, customFields);
    if (check_fields_msg == "") {
        var check_date_msg = check_date(oFormFields);
        if (check_date_msg == "") {
            RESULT = {
                command: "alert",
                msg: "check_date_msg",
            };
            
            var id = newRequest(oFormFields, curUser);
            tools.create_notification("cvk_request", curUserID, "sTextNotif");
            RESULT = {
                command: "alert",
                msg: "Ваша заявка отправлена на рассмотрение.<br>Результат будет направлен Вам на электронную почту.",
                confirm_result: {
                    command: "redirect",
                    redirect_url: "https://cvk.gge.ru/_wt/request_complete"
                },
            };	
        } else {
            RESULT = {
                command: "alert",
                msg: check_date_msg,
            };
        }
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