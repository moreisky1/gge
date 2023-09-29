// 7272136363481964523 - server_code

logName = "custom_reports/server_code";

try {
    EnableLog(logName, true);
    gge.clearAllLibs();
    var notif_lib = gge.getLib("notif_lib");
    teRequest = tools.open_doc(7270524530942173533).TopElem
    replaces = [
        {"name": "[request_code]", "value": teRequest.code},
        {"name": "[request_workflow_state_name]", "value": teRequest.workflow_state_name},
        {"name": "[request_url]", "value": global_settings.settings.portal_base_url.Value + "/_wt/" + teRequest.id}
    ];
    var obj = notif_lib.getNTSubjectBody(7274490988887933049, replaces);

    params = {
        subject: obj.subject,
        body: obj.body,
        recipientIDs: [7241157892942218865],
        resourceIDs: []
    }
    q = notif_lib.sendActiveNotif(params);

    LogEvent(logName, q)
} catch (err) {
    LogEvent(logName, ExtractUserError(err));
} finally {
    EnableLog(logName, false);
}
