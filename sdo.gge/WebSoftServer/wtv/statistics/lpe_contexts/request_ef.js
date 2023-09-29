
function isFirstRequest(userID) {
    var request_type_id = 7277549967278945474 // Заявка на участие в проекте «Экспертиза будущего: строим вместе»
    var xq = "for $e in requests where request_type_id = " + request_type_id + " and person_id = " + userID + " return $e";
    return ArrayOptFirstElem(XQuery(xq)) == undefined;
}

var oRes = tools.get_code_library_result_object();
oRes.context = new Object;

oRes.context = {
    display: isFirstRequest(curUserID), // develop
};

VALUE_STR = EncodeJson(oRes.context);