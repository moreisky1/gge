// 7277843317619841070 - statistics/lpe_contexts/request_std_20203_gge.js

function isPersonInGroup(personID, groupID) {
    var xq = "for $e in group_collaborators where collaborator_id=" + personID + " and group_id=" + groupID + " return $e";
    return ArrayCount(XQuery(xq)) != 0
}

function getFirstCol(teRequest) {
    var collaborators = teRequest.custom_elems.GetOptChildByKey("collaborators");
    var person1 = undefined;
    if (collaborators != undefined) {
        person1 = collaborators.value.Value.split(";")[0];
    }
    return person1;
}

function getColls(teRequest) {
    var collaborators = teRequest.custom_elems.GetOptChildByKey("collaborators");
    var res = [];
    if (collaborators != undefined) {
        res = collaborators.value.Value.split(";");
    }
    return res;
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
        try {
            var personRole = "";
            var personID;
            var tePerson;
            var personFullname = "";
            var personPositionName = "";
            var personSubdivisionName = "";
            var pic = "";
            if (teRequest.request_type_id.Value == 7265281441174738432) { // Заявка на децентрализованное обучение
                if (ArrayCount(getColls(teRequest)) > 1) {
                    personRole = "Обучаемые";
                    personFullname = "Групповая заявка";
                    pic = "/pics/nophoto.jpg";
                } else  {
                    personRole = "Обучаемый";
                    personID = getFirstCol(teRequest);
                    tePerson = tools.open_doc(personID).TopElem;
                    personFullname = String(tePerson.fullname);
                    personPositionName = String(tePerson.position_name);
                    personSubdivisionName = String(tePerson.position_parent_name);
                    pic = "/person_icon.html?id=" + personID + "&size=200x200";
                }
            } else {
                personRole = "Заявитель";
                personID = teRequest.person_id.Value;
                tePerson = tools.open_doc(personID).TopElem;
                personFullname = String(tePerson.fullname);
                personPositionName = String(tePerson.position_name);
                personSubdivisionName = String(tePerson.position_parent_name);
                pic = "/person_icon.html?id=" + personID + "&size=200x200";
            }
            oRes.context = {
                pic: pic,
                personRole: personRole,
                personFullname: personFullname,
                personPositionName: personPositionName,
                personSubdivisionName: personSubdivisionName,
            };
        } catch (e) {
            oRes.context = {
                pic: "pic",
                personRole: "personRole",
                personFullname: "personFullname",
                personPositionName: "personPositionName",
                personSubdivisionName: "personSubdivisionName",
            };
        }
    }
    
    return oRes;
}

oRes = getFields(curObjectID);

VALUE_STR = EncodeJson(oRes.context);