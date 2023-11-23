// 7286375623450383507 - statistics/lpe_contexts/sdo_task.js

function isPersonInGroup(personID, groupID) {
    var xq = "for $e in group_collaborators where collaborator_id=" + personID + " and group_id=" + groupID + " return $e";
    return ArrayCount(XQuery(xq)) != 0
}

function getNameInCatalogByKey(catalog, keyName, keyValue) {
    var res = "";
    if (catalog == "collaborator") {
        res = ArrayOptFirstElem(XQuery("for $e in " + catalog + "s where $e/" + keyName + " = '" + keyValue + "' return $e")).fullname.Value;
    } else if (catalog == "education_org") {
        res = ArrayOptFirstElem(XQuery("for $e in " + catalog + "s where $e/" + keyName + " = '" + keyValue + "' return $e")).disp_name.Value;
    } else {
        res = ArrayOptFirstElem(XQuery("for $e in " + catalog + "s where $e/" + keyName + " = '" + keyValue + "' return $e")).name.Value;
    }
    return res;
}

function getDate(date) {
    return OptDate(date) == undefined ? "" : StrDate(OptDate(date), false, false);
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

    var doc = tools.open_doc(ID);
    
    if (doc != undefined) {
        var teDoc = doc.TopElem;
        var msg = '<h1 style="margin:20px;">' + teDoc.name + '</h1>';
        try {
            msg += '<div style="border:2px solid #555; box-shadow:3px 3px 5px #999; width: 50%; text-align:left;  margin:20px; padding:20px;">';
            msg += "<strong>Заказчик</strong> - " + getNameInCatalogByKey("collaborator", "id", RValue(teDoc.object_id)) + "<br>";
            msg += "<strong>Исполнитель</strong> - " + getNameInCatalogByKey("collaborator", "id", RValue(teDoc.sec_object_id)) + "<br>";
            var fields = custom_templates.object_data_type.items.ObtainChildByKey(7284158758529408071).fields; // Задачи СДО
            for (field in fields) {
                if (field.type == "text") {
                    msg += "<strong>" + RValue(field.title) + ":</strong><br>" + StrReplace(teDoc.custom_elems.ObtainChildByKey(RValue(field.name)).value, "\n", "<br>") + "<br>"
                } else if (field.type == "date") {
                    msg += "<strong>" + RValue(field.title) + "</strong> - " + getDate(teDoc.custom_elems.ObtainChildByKey(RValue(field.name)).value.Value) + "<br>"
                } else {
                    msg += "<strong>" + RValue(field.title) + "</strong> - " + teDoc.custom_elems.ObtainChildByKey(RValue(field.name)).value + "<br>"
                }
                
            }
            msg += '</div>';
            oRes.context.SetProperty("msg", msg);
        } catch (e) {
            oRes.context.SetProperty("msg", e);
        }
        oRes.context.SetProperty("display", OptInt(teDoc.object_id) == OptInt(curUserID) || OptInt(teDoc.sec_object_id) == OptInt(curUserID));
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