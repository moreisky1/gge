// 7277551891597114065  - Обработка кнопок (Заявка на участие в проекте «Экспертиза будущего: строим вместе») - _custom_web/lpe/request_ef/remote_actions/add_request_ef.js

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

// function check_fields(oFormFields, customFields) {
//     var fields = [];
//     for (elem in ArraySelect(customFields, "This.isReq == true")) {
//         if (get_form_field(oFormFields, elem.code) == "") {
//             fields.push(elem.name)
//         }
//     }
//     return ArrayMerge(fields, "This", "; ");
// }

function newRequest(oFormFields) {
    var ya = 7036400859652491004; // Пользователь базы знаний
    user = tools.open_doc(ya).TopElem;
    var docRequest = tools.new_doc_by_name("request", false);
    docRequest.BindToDb(DefaultDb);
    var teRequest = docRequest.TopElem;
    teRequest.person_id = user.id.Value;
    tools.common_filling( "collaborator", teRequest, user.id.Value, user);
    teRequest.request_type_id = 7277549967278945474; // Заявка на участие в проекте «Экспертиза будущего: строим вместе»
    teRequest.custom_elems.ObtainChildByKey("fld_lastname").value = get_form_field(oFormFields, "fld_lastname");
    teRequest.custom_elems.ObtainChildByKey("fld_firstname").value = get_form_field(oFormFields, "fld_firstname");
    teRequest.custom_elems.ObtainChildByKey("fld_middlename").value = get_form_field(oFormFields, "fld_middlename");
    teRequest.custom_elems.ObtainChildByKey("fld_country").value = get_form_field(oFormFields, "fld_country");
    teRequest.custom_elems.ObtainChildByKey("fld_region").value = get_form_field(oFormFields, "fld_region");
    teRequest.custom_elems.ObtainChildByKey("fld_city").value = get_form_field(oFormFields, "fld_city");
    teRequest.custom_elems.ObtainChildByKey("fld_birthdate").value = get_form_field(oFormFields, "fld_birthdate");
    teRequest.custom_elems.ObtainChildByKey("fld_phone").value = get_form_field(oFormFields, "fld_phone");
    teRequest.custom_elems.ObtainChildByKey("fld_email").value = get_form_field(oFormFields, "fld_email");
    teRequest.custom_elems.ObtainChildByKey("fld_status").value = get_form_field(oFormFields, "fld_status");
    teRequest.custom_elems.ObtainChildByKey("fld_university").value = get_form_field(oFormFields, "fld_university");
    teRequest.custom_elems.ObtainChildByKey("fld_univercity_custom").value = get_form_field(oFormFields, "fld_univercity_custom");
    teRequest.custom_elems.ObtainChildByKey("fld_educ_level").value = get_form_field(oFormFields, "fld_educ_level");
    teRequest.custom_elems.ObtainChildByKey("fld_specialization").value = get_form_field(oFormFields, "fld_specialization");
    teRequest.custom_elems.ObtainChildByKey("fld_educ_year").value = get_form_field(oFormFields, "fld_educ_year");
    teRequest.custom_elems.ObtainChildByKey("fld_command_exist").value = get_form_field(oFormFields, "fld_command_exist");
    teRequest.custom_elems.ObtainChildByKey("fld_command_name").value = get_form_field(oFormFields, "fld_command_name");
    teRequest.custom_elems.ObtainChildByKey("fld_organization").value = get_form_field(oFormFields, "fld_organization");
    teRequest.custom_elems.ObtainChildByKey("fld_organization_site").value = get_form_field(oFormFields, "fld_organization_site");
    teRequest.custom_elems.ObtainChildByKey("fld_organization_role").value = get_form_field(oFormFields, "fld_organization_role");
    teRequest.custom_elems.ObtainChildByKey("fld_organization_field").value = get_form_field(oFormFields, "fld_organization_field");
    teRequest.custom_elems.ObtainChildByKey("fld_subdivision").value = get_form_field(oFormFields, "fld_subdivision");
    teRequest.custom_elems.ObtainChildByKey("fld_position").value = get_form_field(oFormFields, "fld_position");
    teRequest.custom_elems.ObtainChildByKey("fld_experience").value = get_form_field(oFormFields, "fld_experience");
    teRequest.custom_elems.ObtainChildByKey("fld_project_role").value = get_form_field(oFormFields, "fld_project_role");
    teRequest.custom_elems.ObtainChildByKey("fld_area").value = get_form_field(oFormFields, "fld_area");
    teRequest.custom_elems.ObtainChildByKey("fld_command_name_3").value = get_form_field(oFormFields, "fld_command_name_3");
    teRequest.custom_elems.ObtainChildByKey("fld_collaborator_q1").value = get_form_field(oFormFields, "fld_collaborator_q1");
    teRequest.custom_elems.ObtainChildByKey("fld_collaborator_q2").value = get_form_field(oFormFields, "fld_collaborator_q2");
    teRequest.custom_elems.ObtainChildByKey("fld_collaborator_q3").value = get_form_field(oFormFields, "fld_collaborator_q3");
    teRequest.custom_elems.ObtainChildByKey("fld_collaborator_q4").value = get_form_field(oFormFields, "fld_collaborator_q4");
    teRequest.custom_elems.ObtainChildByKey("fld_collaborator_q5").value = get_form_field(oFormFields, "fld_collaborator_q5");
    teRequest.custom_elems.ObtainChildByKey("fld_collaborator_q6").value = get_form_field(oFormFields, "fld_collaborator_q6");
    teRequest.custom_elems.ObtainChildByKey("fld_collaborator_q7").value = get_form_field(oFormFields, "fld_collaborator_q7");
    teRequest.custom_elems.ObtainChildByKey("fld_collaborator_q8").value = get_form_field(oFormFields, "fld_collaborator_q8");
    teRequest.custom_elems.ObtainChildByKey("fld_collaborator_q9").value = get_form_field(oFormFields, "fld_collaborator_q9");
    teRequest.custom_elems.ObtainChildByKey("fld_collaborator_q10").value = get_form_field(oFormFields, "fld_collaborator_q10");
    teRequest.custom_elems.ObtainChildByKey("fld_command_exist_6").value = get_form_field(oFormFields, "fld_command_exist_6");
    teRequest.custom_elems.ObtainChildByKey("fld_command_name_6").value = get_form_field(oFormFields, "fld_command_name_6");
    teRequest.custom_elems.ObtainChildByKey("fld_previous_participant").value = get_form_field(oFormFields, "fld_previous_participant");
    teRequest.custom_elems.ObtainChildByKey("fld_previous_stage").value = get_form_field(oFormFields, "fld_previous_stage");
    teRequest.custom_elems.ObtainChildByKey("fld_theme").value = get_form_field(oFormFields, "fld_theme");
    teRequest.custom_elems.ObtainChildByKey("fld_previous_project_role").value = get_form_field(oFormFields, "fld_previous_project_role");
    teRequest.custom_elems.ObtainChildByKey("fld_collaborator_q11").value = get_form_field(oFormFields, "fld_collaborator_q11");
    teRequest.custom_elems.ObtainChildByKey("fld_collaborator_q12").value = get_form_field(oFormFields, "fld_collaborator_q12");
    teRequest.custom_elems.ObtainChildByKey("fld_collaborator_q13").value = get_form_field(oFormFields, "fld_collaborator_q13");
    teRequest.custom_elems.ObtainChildByKey("fld_collaborator_q14").value = get_form_field(oFormFields, "fld_collaborator_q14");
    teRequest.custom_elems.ObtainChildByKey("fld_collaborator_q15").value = get_form_field(oFormFields, "fld_collaborator_q15");
    teRequest.custom_elems.ObtainChildByKey("fld_collaborator_q16").value = get_form_field(oFormFields, "fld_collaborator_q16");
    teRequest.custom_elems.ObtainChildByKey("fld_collaborator_q17").value = get_form_field(oFormFields, "fld_collaborator_q17");
    teRequest.custom_elems.ObtainChildByKey("fld_collaborator_q18").value = get_form_field(oFormFields, "fld_collaborator_q18");
    teRequest.custom_elems.ObtainChildByKey("fld_collaborator_q19").value = get_form_field(oFormFields, "fld_collaborator_q19");
    teRequest.custom_elems.ObtainChildByKey("fld_collaborator_q20").value = get_form_field(oFormFields, "fld_collaborator_q20");
    teRequest.custom_elems.ObtainChildByKey("fld_collaborator_q21").value = get_form_field(oFormFields, "fld_collaborator_q21");
    docRequest.Save();

    return docRequest.DocID;
}

try {
    var oFormFields = parse_form_fields(SCOPE_WVARS.GetOptProperty("form_fields"));
    var id = newRequest(oFormFields);
    
    if (get_form_field(oFormFields, "fld_status") == "Работник организации" && 
        get_form_field(oFormFields, "fld_project_role") == "Куратор проектной команды"
    ) {
        // tools.create_notification("eb6_2", curUserID, "sTextNotif");
    } else {
        // tools.create_notification("eb6", curUserID, "sTextNotif");
    }

    RESULT = {
        command: "alert",
        msg: "Отправлено",
        confirm_result: {
            command: "redirect",
            redirect_url: "https://ef.gge.ru/_wt/main_ef/"
        },
    };
} catch (e) {
    RESULT = {
        command: "alert",
        msg: ExtractUserError(e),
    };
}