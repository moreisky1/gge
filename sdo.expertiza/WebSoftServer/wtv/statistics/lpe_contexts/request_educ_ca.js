// 7270847855256143811 - statistics/lpe_contexts/request_educ_ca.js

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
        var display = isPersonInGroup(curUserID, 6946469776977774881) // Начальники управлений имеющие право просмотра бюджета на обучение
        oRes.context = {
            qualifications: String(teRequest.custom_elems.ObtainChildByKey("qualifications").value),
            subdivisions: String(teRequest.custom_elems.ObtainChildByKey("subdivisions").value),
            position_commons: String(teRequest.custom_elems.ObtainChildByKey("position_commons").value),
            event_name: String(teRequest.custom_elems.ObtainChildByKey("event_name").value),
            event_type: String(teRequest.custom_elems.ObtainChildByKey("event_type").value),
            event_form: String(teRequest.custom_elems.ObtainChildByKey("event_form").value),
            event_period: String(teRequest.custom_elems.ObtainChildByKey("event_period").value),
            base: String(teRequest.custom_elems.ObtainChildByKey("base").value),
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
    oRes.context = new Object;
    oRes.context = {
        display: isPersonInGroup(curUserID, 6946469776977774881),
    };
}

VALUE_STR = EncodeJson(oRes.context);