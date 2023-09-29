// 7276568721715711877 - Обработка кнопок (Подмена пользователя) - _custom_web/lpe/change_user/remote_actions/change_user.js

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
    var original_sid = IsEmptyValue(Request.Session.GetOptProperty('original_sid')) ? Request.Session.GetOptProperty('sid') : Request.Session.GetOptProperty('original_sid');
    var original_user_id = IsEmptyValue(Request.Session.GetOptProperty('original_user_id')) ? userID : Request.Session.GetOptProperty('original_user_id');
    Request.Session.SetProperty('original_sid', original_sid);
    Request.Session.SetProperty('original_user_id', original_user_id);
    var new_sid = Random(1000000000000000000, 9999999999999999999);
    var sCode = "" +
        "var new_sid = " + new_sid + ";\n" +
        "var originalUserID = " + original_user_id + ";\n" +
        "var personID = " + personID + ";\n" +
        "var docUser = tools.open_doc(personID);\n" +
        "curUserID = personID;\n" +
        "curUser = docUser.TopElem;\n" +
        "Request.Session.SetProperty('sid', String(new_sid));\n" +
        "Request.Session.SetProperty('cur_user_id', String(personID));\n" +
        "Request.Session.SetProperty('cur_user_fullname', String(docUser.TopElem.fullname));\n" +
        "Request.Session.SetProperty('cur_user_login', String(docUser.TopElem.login));\n" +
        "Request.Session.GetOptProperty('Env', ({})).SetProperty('curUserID', personID);\n" +
        "Request.Session.GetOptProperty('Env', ({})).SetProperty('curUser', docUser.TopElem);\n" +
        "tools_web.set_user_data('user_verification_' + originalUserID, ({'is_user_verified' : true, 'user_verification': null}), 86400);\n";
    PutFileData(UrlToFilePath("x-local://wt/web/include/users/" + original_user_id + "_" + original_sid), sCode);
}

function resetUser(userID) {
    var original_sid = IsEmptyValue(Request.Session.GetOptProperty('original_sid')) ? Request.Session.GetOptProperty('sid') : Request.Session.GetOptProperty('original_sid');
    var original_user_id = IsEmptyValue(Request.Session.GetOptProperty('original_user_id')) ? userID : Request.Session.GetOptProperty('original_user_id');
    if (FilePathExists(UrlToFilePath("x-local://wt/web/include/users/" + original_user_id + "_" + original_sid))) {
        DeleteFile(UrlToFilePath("x-local://wt/web/include/users/" + original_user_id + "_" + original_sid));
        Request.Session.SetProperty('sid', original_sid);
        Request.Session.original_sid = null;
        Request.Session.original_user_id = null;
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
