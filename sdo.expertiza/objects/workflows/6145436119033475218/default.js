// Сообщение об ошибке в электронном курсе

function sendEmail(teRequest) {
    var person_id = 6769089066357701563 // Семин Андрей Владимирович
    var tePerson = tools.open_doc(person_id).TopElem;
    var empty = "7258282324117648518";
    var emailBody = '<p>Заявка № ' + teRequest.code + '</a> от ' + teRequest.create_date + '.</p>';
    emailBody += "<p>" + teRequest.comment + "</p>";
    docAN = tools.new_doc_by_name("active_notification", false);
    docAN.BindToDb(DefaultDb);
    docAN.TopElem.subject = "Сообщение об ошибке в электронном курсе - " + teRequest.object_name + ".";
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

sendEmail(curObject);

