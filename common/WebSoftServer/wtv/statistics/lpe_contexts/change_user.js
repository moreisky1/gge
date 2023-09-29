// 7277472401809821576 - statistics/lpe_contexts/change_user.js

function isPersonInGroup(personID, groupID) {
    var xq = "for $e in group_collaborators where collaborator_id=" + personID + " and group_id=" + groupID + " return $e";
    return ArrayCount(XQuery(xq)) != 0;
}

var oRes = tools.get_code_library_result_object();
oRes.context = new Object;


var original_sid = IsEmptyValue(CurRequest.Session.GetOptProperty('original_sid')) ? CurRequest.Session.sid : CurRequest.Session.GetOptProperty('original_sid')
var original_user_id = IsEmptyValue(CurRequest.Session.GetOptProperty('original_user_id')) ? curUserID : CurRequest.Session.GetOptProperty('original_user_id');

oRes.context = {
    display: isPersonInGroup(original_user_id, "7272291807600532768"), // develop
    msg: "curUserID = " + curUserID + "<br>" +
    "original_user_id = " + original_user_id + "<br>" +
    "CurRequest.Session.sid = " + CurRequest.Session.sid + "<br>" +
    "original_sid = " + original_sid,
};

VALUE_STR = EncodeJson(oRes.context);
