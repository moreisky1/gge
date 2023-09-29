// 7276568721715711877 - Обработка кнопок (Подмена пользователя)

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

function setUser(userID, personID) {
    var original_sid = Request.Session.sid;
    tools_web.set_user_data("original_sid", original_sid, 86400);
    tools_web.set_user_data("original_user_id_" + original_sid, userID, 86400);
    var sCode = "" +
        "var originalUserID = " + userID + ";\n" +
        "var personID = " + personID + ";\n" +
        "var docUser = tools.open_doc(personID);\n" +
        "curUserID = personID;\n" +
        "curUser = docUser.TopElem;\n" +
        "Request.Session.SetProperty('sid', String(personID));\n" +
        "Request.Session.SetProperty('cur_user_id', String(personID));\n" +
        "Request.Session.SetProperty('cur_user_fullname', String(docUser.TopElem.fullname));\n" +
        "Request.Session.SetProperty('cur_user_login', String(docUser.TopElem.login));\n" +
        "Request.Session.GetOptProperty('Env', ({})).SetProperty('curUserID', personID);\n" +
        "Request.Session.GetOptProperty('Env', ({})).SetProperty('curUser', docUser.TopElem);\n" +
        "tools_web.set_user_data('user_verification_' + originalUserID, ({'is_user_verified' : true, 'user_verification': null}), 86400);\n";
    PutFileData(UrlToFilePath("x-local://wt/web/include/users/" + userID), sCode);
}

function resetUser(userID) {
    if (FilePathExists(UrlToFilePath("x-local://wt/web/include/users/" + userID))) {
        DeleteFile(UrlToFilePath("x-local://wt/web/include/users/" + userID));
        tools_web.remove_user_data("original_sid");
        tools_web.remove_user_data("original_user_id_" + Request.Session.sid);
    }
}

try {
    var sAction = "" + ParseJson(_ITEM_).title;
    var oFormFields = parse_form_fields(SCOPE_WVARS.GetOptProperty("form_fields"));
    var fld_collaborator = get_form_field(oFormFields, "fld_collaborator");
    if (!FilePathExists(UrlToFilePath("x-local://wt/web/include/users"))) {
        CreateDirectory(UrlToFilePath("x-local://wt/web/include/users"));
    }
    if (sAction == "set_user") {
        setUser(curUserID, fld_collaborator);
    } else if (sAction == "reset_user") {
        resetUser(curUserID);
    }

    RESULT = {
        command: "reload_page",
    };
} catch (e) {
    RESULT = {
        command: "alert",
        msg: ExtractUserError(e),
    };
}
