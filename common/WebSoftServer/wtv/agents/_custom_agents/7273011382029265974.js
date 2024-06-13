// 7273011382029265974 - Агент по отправке событий в календарь Outlook

var logger = {
    isLog: true,
    logType: "report",
    logName: "7273011382029265974",
}

var libs = OpenCodeLib("x-local://source/gge/libs.js").getAllLibs;

var l = libs.log_lib.clear;
var lib_event = OpenCodeLib("x-local://source/gge/libs/event_outlook_lib.js");

try {
    l.open(logger);

    var sSenderAddress = global_settings.settings.own_org.email;
    var event_id = OptInt(Param.event_id);
    var method = String(Param.method);
    var teEvent = tools.open_doc(event_id).TopElem;
    var oIcalConfig = {};
    var sEvent;
    var oMessConfig = {};
    var sMess;
    var oClient = lib_event.get_smtp_client();
    var attendees = [];
    var xq = "";
    var subject = "";

    for (collaborator in teEvent.collaborators) {
        xq = "for $e in collaborators where $e/id=" + collaborator.collaborator_id.Value + " return $e";
        foundCol = ArrayOptFirstElem(XQuery(xq));
        if (foundCol != undefined) {
            attendees.push(foundCol);
        }
    }
    
    for (attendee in attendees) {
        try {
            oIcalConfig = {
                id : lib_event.generate_id(event_id),     
                body: "Клёво!",   
                title: "Новая тема", 
                desc: "Что это?",   
                start_date: DateToTimeZoneDate(teEvent.start_date, 0), 
                end_date: DateToTimeZoneDate(teEvent.finish_date, 0),    
                create_date: Date(),
                attendees: attendees,
                place: teEvent.place,
                org_name: "Учебный портал",       
                org_email: sSenderAddress,      
                method: method
            };
            sEvent = lib_event.create_event(oIcalConfig);
            if (method == "REQUEST") {
                subject = teEvent.name;
            } else {
                subject = "Canceled: " + teEvent.name;
            }
            
            oMessConfig = {
                recipient_email: attendee.email,  
                subject: subject,
                sender_email: sSenderAddress,
                html_body : teEvent.desc,
                ical : sEvent
            };
            sMess = lib_event.create_message(oMessConfig);
    
            oClient.SendMimeMessage(sSenderAddress, attendee.email, sMess);
            l.write(logger, attendee.fullname + " - " + attendee.email);
        } catch (e) {
            l.write(logger, e);
            continue;
        }
        
    }

    oClient.CloseSession();
    
    l.close(logger)
} catch (error) {
l.write(logger, error)
l.close(logger)
}