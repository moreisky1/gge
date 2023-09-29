var logName = "7252972473088749415"; // Обновить папку с фото на сервере по autodiscover.expertiza.ru

function getCollaborators() {
    var cond = " and id=7241157892942218865";
    cond = "";
    var xq = "for $elem in collaborators where is_dismiss=0 and contains(email, 'gge.ru') " + 
        " and contains(current_state, 'отпуск')=false() " + cond + " return $elem";
    return XQuery(xq);
}

function getRequest(email) {
    var request = "https://autodiscover.expertiza.ru/ews/Exchange.asmx/s/GetUserPhoto?email=" +
        email + "&size=HR648x648";
    return HttpRequest(request, "get", null, "Ignore-Errors: 1\n");
}

function pictUrl(colID, email) {
    colDoc = tools.open_doc(colID);
    colDoc.TopElem.pict_url = "/photo1/" + email + ".jpg";
    colDoc.Save();
}

try {
    EnableLog(logName, true);
    var folder = LdsIsServer ? FilePathToUrl("E:\\Websoft\\WebSoftServer\\wt\\web\\photo1\\") : FilePathToUrl("C:\\temp\\");
    var file = "";
    SetHttpDefaultAuth (Base64Decode("dS5kYXJpYmF6YXJvbg=="), Base64Decode("TGZoZScxNDE5IQ=="));
    for (elem in getCollaborators()) {
        oResp = getRequest(elem.email.Value);
        file = folder + elem.email.Value + ".jpg";
        if (oResp.RespCode == 200) {
            oResp.SaveToFile(file);
            pictUrl(elem.id.Value, elem.email.Value);
        } else {
            LogEvent(logName, elem.email.Value + " - " + oResp.RespCode);
        }
    }
} catch (e) {
    LogEvent(logName, ExtractUserError(e));
} finally {
    EnableLog(logName, false);
}
