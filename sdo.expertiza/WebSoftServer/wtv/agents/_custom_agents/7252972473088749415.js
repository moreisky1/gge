// 7252972473088749415 - Обновить папку с фото на сервере по autodiscover.expertiza.ru

var logger = {
    isLog: true,
    logType: "report",
    logName: "7252972473088749415",
}

var libs = OpenCodeLib("x-local://source/gge/libs.js").getAllLibs;
var l = libs.log_lib;

function getCollaborators() {
    var cond = " and id=7241157892942218865";
    // cond = "";
    var xq = "for $elem in collaborators where $elem/web_banned=false() and $elem/is_dismiss=false() and contains($elem/email, 'gge.ru') " + 
        " and contains($elem/current_state, 'отпуск')=false() " + cond + " return $elem";
    return XQuery(xq);
}

function getRequest(email) {
    var request = "https://autodiscover.expertiza.ru/ews/Exchange.asmx/s/GetUserPhoto?email=" + email + "&size=HR648x648";
    
    return HttpRequest(request, "get", null, 'Ignore-Errors: 1\n');
}

function pictUrl(colID, email) {
    colDoc = tools.open_doc(colID);
    colDoc.TopElem.pict_url = "/photo1/" + email + ".jpg";
    colDoc.Save();
}


try {
l.open(logger);

var folder = UrlToFilePath(FilePathToUrl("x-local://wt/web/photo1/"));

var file = "";
// SetHttpDefaultAuth(Base64Decode("dS5kYXJpYmF6YXJvbg=="), Base64Decode("TGZoZScxNDE5IQ=="));
var collaborators = getCollaborators();
l.write(logger, "ArrayCount(collaborators)=" + ArrayCount(collaborators))
for (elem in collaborators) {
    oResp = getRequest(elem.email.Value);
    file = folder + elem.email.Value + ".jpg";
    if (oResp.RespCode == 200) {
        oResp.SaveToFile(file);
        pictUrl(elem.id.Value, elem.email.Value);
    } else {
        l.write(logger, elem.email.Value + " - " + oResp.RespCode);
    }
}

l.close(logger);
} catch (error) {
l.write(logger, error);
l.close(logger);
}
