function isPersonInGroup(personID, groupID) {
    var xq = "for $e in group_collaborators where collaborator_id=" + personID + " and group_id=" + groupID + " return $e";
    return ArrayCount(XQuery(xq)) != 0;
}

function getOriginalUserID() {
    var originalUserID = tools_web.get_user_data("original_user_id_" + CurRequest.Session.sid);
    return originalUserID ? originalUserID : curUserID;
}

var oRes = tools.get_code_library_result_object();
oRes.context = new Object;

oRes.context = {
    display: isPersonInGroup(getOriginalUserID(), "7278006054261960450"), // develop
    msg: "curUserID = " + curUserID + " | getOriginalUserID() = " + getOriginalUserID(),
};

VALUE_STR = EncodeJson(oRes.context);
