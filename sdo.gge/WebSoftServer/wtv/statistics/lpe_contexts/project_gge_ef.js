// 7309752519815556639 - statistics/lpe_contexts/project_gge_ef.js

function getFields(ID) {
    var oRes = tools.get_code_library_result_object();
    oRes.context = new Object;

    try {
        ID = Int(ID);
    } catch (err) {
        oRes.error = 503;
        oRes.errorText = "{ text: 'Object not found.', param_name: 'ID' }";
        return oRes;
    }

    var doc = tools.open_doc(ID);
    
    if (doc != undefined) {
        var teDoc = doc.TopElem;
        var project_type = tools.open_doc(teDoc.project_type_id);
        var group = tools.open_doc(teDoc.group_id);
        var project_type_name = project_type == undefined ? "" : project_type.TopElem.name.Value;
        var group_name = group == undefined ? "" : group.TopElem.name.Value;

        oRes.context = {
            project_type_name: project_type_name
            , group_name: group_name
            , video: teDoc.custom_elems.ObtainChildByKey("f_videoURL").value.Value
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
        msg: "curObjectID == undefined"
        , display: false,
    };
}

VALUE_STR = EncodeJson(oRes.context);
