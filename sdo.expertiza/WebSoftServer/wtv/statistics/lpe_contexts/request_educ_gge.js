// 7268558462912893744 - statistics/lpe_contexts/request_educ_gge.js

function isPersonInGroup(personID, groupID) {
    var xq = "for $e in group_collaborators where collaborator_id=" + personID + " and group_id=" + groupID + " return $e";
    return ArrayCount(XQuery(xq)) != 0
}

function getFields(ID) {
    var oRes = tools.get_code_library_result_object();
    oRes.context = new Object;

    try {
        ID = Int(ID)
    } catch (err) {
        oRes.error = 503;
        oRes.errorText = "{ text: 'Object not found.', param_name: 'ID' }";
        return oRes;
    }

    var docRequest = tools.open_doc(ID);
    if (docRequest != undefined) {
        var teRequest = docRequest.TopElem;
        var display = (teRequest.workflow_state.Value == "0" && teRequest.person_id.Value == curUserID) || isPersonInGroup(curUserID, 7272291807600532768)
        oRes.context = {
            collaborators: String(teRequest.custom_elems.ObtainChildByKey("collaborators").value),
            event_name: String(teRequest.custom_elems.ObtainChildByKey("event_name").value),
            event_type: String(teRequest.custom_elems.ObtainChildByKey("event_type").value),
            event_form: String(teRequest.custom_elems.ObtainChildByKey("event_form").value),
            event_cost: String(teRequest.custom_elems.ObtainChildByKey("event_cost").value),
            event_start_date: OptDate(teRequest.custom_elems.ObtainChildByKey("event_start_date").value),
            event_period: String(teRequest.custom_elems.ObtainChildByKey("event_period").value),
            education_org: String(teRequest.custom_elems.ObtainChildByKey("education_org").value),
            education_org_new: String(teRequest.custom_elems.ObtainChildByKey("education_org_new").value),
            education_programm_URL: String(teRequest.custom_elems.ObtainChildByKey("education_programm_URL").value),
            city: String(teRequest.custom_elems.ObtainChildByKey("city").value),
            base: String(teRequest.custom_elems.ObtainChildByKey("base").value),
            lector: String(teRequest.custom_elems.ObtainChildByKey("lector").value),
            comment: String(teRequest.custom_elems.ObtainChildByKey("comment").value),
            display: display,
        };
    }

    return oRes;
}

if (curObjectID != undefined) {
    var oRes = getFields(curObjectID);
} else {
    var oRes = tools.get_code_library_result_object();
    oRes.context = {
        display: true,
    };
}

VALUE_STR = EncodeJson(oRes.context);