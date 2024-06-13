function fun(sFormCommand, sFormFields) {

var oRes = tools.get_code_library_result_object();
oRes.result = []
var arrFormFields = [];
try {
    if (sFormCommand == "eval") {
        oRes.result = {
            command: "display_form",
            title: "sFormTitle",
            form_fields: [{ "name": "license_confirm", "type": "bool", "label": tools_web.get_web_const('prinimayuuslovi', curLngWeb), "value": LicenseRichText, "mandatory": true, "validation": "nonempty" }],
            // buttons: [{ name: "submit", label: "Отправить", type: "submit" },{ name: "cancel", label: "Отменить", type: "cancel"}]
        };
        // { "name": "__next", "type": "hidden", "value": "first_form" },
        // var sTitle, fValue, oFormElem;
        // oFormElem = {
        //     name: "photo",
        //     label: "Фотография",
        //     type: "file",
        //     mandatory: true,
        //     column: 1,
        // }
        // arrFormFields.push(oFormElem);
        // var sFormTitle = "Анкета кандидата";
        // var oForm = {
        //     command: "display_form",
        //     title: sFormTitle,
        //     form_fields: arrFormFields,
        //     buttons: [{ name: "submit", label: "Отправить", type: "submit" },{ name: "cancel", label: "Отменить", type: "cancel"}]
        // };
        // oRes.result = oForm;
    } else if (sFormCommand == "submit_form") {
        var oFormField = form_fields_to_object(sFormFields);
        oRes.result = set_resume(docResume, oFormField, arrFields);
    }

} catch(err) {
    oRes.error = 1;
    oRes.errorText = "Ошибка вызова удаленного действия \"TEMP\"\r\n" + err;
    oRes.result = {command: "close_form", msg: oRes.errorText};
}
return oRes;
}

var oRes = fun(command, form_fields)
RESULT = oRes.result;
ERROR = oRes.error;
MESSAGE = oRes.errorText;
if (ERROR != 0) alert("ERROR: " + MESSAGE )
