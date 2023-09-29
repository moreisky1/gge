// Включение в состав участников мероприятия

function sendEmail(teRequest) {
    var tePerson = tools.open_doc(teRequest.person_id).TopElem;
    var teEvent = tools.open_doc(teRequest.object_id).TopElem;
    var empty = "7258282324117648518";
    var partFormat = teRequest.custom_elems.GetOptChildByKey("part_format").value;
    var emailBody = '<p>Вы были включены в состав участников мероприятия "' + teEvent.name + 
        '" по заявке № ' + teRequest.code + ' от ' + teRequest.create_date + '.</p>';
    if (partFormat == "ВКС") {
        emailBody += "<p>Ссылка на ВКС: " + teEvent.custom_elems.GetOptChildByKey("vcs_link").value + "</p>";
    }
    
    docAN = tools.new_doc_by_name("active_notification", false);
    docAN.BindToDb(DefaultDb);
    docAN.TopElem.subject = "Принята заявка на участие в мероприятии";
    docAN.TopElem.body = emailBody;
    docAN.TopElem.sender.address = global_settings.settings.own_org.email;
    docAN.TopElem.body_type = "html";
    docAN.TopElem.notification_id = empty;
    docAN.TopElem.notification_system_id = "6035867320053143919";
    recipient = docAN.TopElem.recipients.AddChild();
    recipient.address = tePerson.email;
    recipient.name = tePerson.fullname;
    recipient.collaborator_id = tePerson.id;
    docAN.Save();
    return tools.send_notification(docAN.DocID);
}
// ДАТА ВРЕМЯ НАЧАЛА МЕРОПРИЯТИЯ
tools.add_person_to_event(curObject.person_id, curObject.object_id);
sendEmail(curObject);
