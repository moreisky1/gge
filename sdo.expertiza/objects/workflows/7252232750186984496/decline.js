// Включение в состав участников мероприятия

function sendEmail(teRequest) {
    var tePerson = tools.open_doc(teRequest.person_id).TopElem;
    var teEvent = tools.open_doc(teRequest.object_id).TopElem;
    var empty = "7258282324117648518";
    var emailBody = '<p>Заявка № ' + teRequest.code + ' от ' + teRequest.create_date +
        ' на участие в мероприятии "' + teEvent.name + '" отклонена.</p>';
    docAN = tools.new_doc_by_name("active_notification", false);
    docAN.BindToDb(DefaultDb);
    docAN.TopElem.subject = "Отклонение заявки на участие в мероприятии";
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
sendEmail(curObject);
