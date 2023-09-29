// Включение в состав участников мероприятия (с гостями)

function sendEmail(teRequest) {
    var tePerson = tools.open_doc(teRequest.person_id).TopElem;
    var teEvent = tools.open_doc(teRequest.object_id).TopElem;
    var empty = "7258282324117648518";
    var countGuests = teRequest.custom_elems.GetOptChildByKey("count_guests").value;
    var emailBody = '<p>Вы были включены в состав участников мероприятия "' + teEvent.name + 
        '" по заявке № ' + teRequest.code + ' от ' + teRequest.create_date + '.</p>';
    emailBody += '<p>Количество гостей: ' + countGuests + '</p>'
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

tools.add_person_to_event(curObject.person_id, curObject.object_id);
sendEmail(curObject);

var countG = OptInt(curObject.custom_elems.GetOptChildByKey("count_guests").value, 0);
eventDoc = tools.open_doc(curObject.object_id)
if (countG > 0) {
    eventDoc.TopElem.max_person_num -= countG
}
eventDoc.Save()
var foundER = ArrayOptFirstElem(XQuery("for $e in event_results where $e/person_id=" + curObject.person_id +
    " and $e/event_id=" + curObject.object_id + " return $e"));
if (foundER != undefined) {
    erDoc = tools.open_doc(foundER.id);
    erDoc.TopElem.is_confirm = true;
    erDoc.Save();
} else {
    alert("7268203753616143820, foundER == undefined")
}