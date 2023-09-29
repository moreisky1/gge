function clear() {
    var url = "x-local://source/gge/libs/notif_lib.js";
    DropFormsCache(url);
    return OpenCodeLib(url);
}

function addNewLineAfterTags(text) {
    var result = StrReplace(text, "<", "\r\n<");
    result = StrReplace(result, ">", ">\r\n");
    return result;
}

function addAttachment(teNotif, resourceID) {
    try {
        var res = true;
        var teResource = tools.open_doc(resourceID).TopElem;
        var fileUrl = String(teResource.file_url);
        var newAttachment = teNotif.attachments.AddChild();
        newAttachment.name = String(teResource.file_name);
        newAttachment.data = LoadUrlData(fileUrl);
    } catch (err) {res = false;} finally {return res;}
}

function getNTSubjectBody(notifTemplateID, replaces) {
    try {
        var res = {};
        teNT = tools.open_doc(notifTemplateID).TopElem;
        res.subject = teNT.subject.Value;
        res.body = teNT.body.Value;
        for (el in replaces) {
            res.subject = StrReplace(res.subject, el.name, el.value);
            res.body = StrReplace(res.body, el.name, el.value);
        }
    } catch (err) {res = undefined;} finally {return res;}
}

// params = {
//     subject: "",
//     body: "",
//     recipientIDs: [],
//     resourceIDs: [],
// }
function createActiveNotif(params) {
    var res = undefined;
    var dlib = OpenCodeLib("x-local://source/gge/libs/develop.js");
    if (dlib.isValidObjField(params, "subject", "String") &&
        dlib.isValidObjField(params, "body", "String") &&
        dlib.isValidObjField(params, "recipientIDs", "SimpleArray")
    ) {
        docAN = tools.new_doc_by_name("active_notification", false);
        docAN.BindToDb(DefaultDb);
        docAN.TopElem.sender.address = global_settings.settings.own_org.email.Value;
        docAN.TopElem.sender.name = "Учебный портал Главгосэкспертизы России";
        docAN.TopElem.date = Date();
        docAN.TopElem.send_date = Date();
        docAN.TopElem.body_type = "html";
        docAN.TopElem.notification_id = "7258282324117648518"; // empty Заглушка
        docAN.TopElem.notification_system_id = "6035867320053143919"; // E-mail

        docAN.TopElem.subject = params.subject;
        docAN.TopElem.body = params.body;

        for (recipientID in params.recipientIDs) {
            if (dlib.existInCatalogByID("collaborator", recipientID)) {
                teRecipient = tools.open_doc(recipientID).TopElem;
                recipient = docAN.TopElem.recipients.AddChild();
                recipient.address = teRecipient.email;
                recipient.name = teRecipient.fullname;
                recipient.collaborator_id = teRecipient.id;
            }
        }
        if (dlib.isValidObjField(params, "resourceIDs", "SimpleArray")) {
            for (resourceID in params.resourceIDs) {
                if (dlib.existInCatalogByID("resource", resourceID)) addAttachment(docAN.TopElem, resourceID);
            }
        }
        docAN.Save();
        res = docAN.DocID;
    }
    return res;
}

function sendActiveNotif(params) {
    var res = undefined;
    var activeNotifID = createActiveNotif(params);
    if (activeNotifID != undefined) res = tools.send_notification(activeNotifID);
    return res;
}
