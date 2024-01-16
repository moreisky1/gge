// 7317153319464344169 - Обработка кнопок (ef_sprint2)

logger = {
    isLog: false,
    logType: "report",
    logName: "7317153319464344169",
}
var l = gge.getLib("log_lib");
// var plib = gge.getLib("personal_lib");
// var nlib = gge.getLib("notif_lib");
// var dlib = gge.getLib("develop");

function parse_form_fields(sFormFields) {
    var arrFormFields = undefined;
    try {
        arrFormFields = ParseJson(sFormFields);
    } catch (e) {
        arrFormFields = [];
    }
    return arrFormFields;
}

function get_form_field(oFields, sName) {
    var catElem = ArrayOptFind(oFields, "This.name == sName");
    return catElem == undefined ? "" : catElem.value;
}

function check_fields(oFormFields, customFields) {
    var fields = [];
    for (elem in ArraySelect(customFields, "This.isReq == true")) {
        if (get_form_field(oFormFields, elem.code) == "") {
            fields.push(elem.name)
        }
    }
    return ArrayMerge(fields, "This", "; ");
}

function SaveFileInResource(oFile, iPersonID, tePerson) {
    var iPath = null;

    if (oFile != undefined && oFile.HasProperty("url") && oFile.url != "") {
        docResource = OpenNewDoc('x-local://wtv/wtv_resource.xmd');
        docResource.TopElem.person_id = iPersonID;
        tools.common_filling('collaborator', docResource.TopElem, iPersonID, tePerson);
        docResource.BindToDb();
        docResource.TopElem.put_data(oFile.url);
        docResource.TopElem.name = oFile.value;
        docResource.TopElem.file_name = oFile.value;
        docResource.TopElem.role_id.ObtainByValue(7317153460876556528); // Спринт 2
        docResource.Save();

        iPath = docResource.DocID;
    }

    return iPath;
}

function attachFileToRepositorium(fileID, repID) {
    docRep = tools.open_doc(repID);
    newFile = docRep.TopElem.files.AddChild();
    newFile.file_id = fileID;
    docRep.Save();
}

function checkFileName(fileName) {
    var errors = [];
    if (!StrEnds(fileName, ".pptx")) {
        errors.push("Файл формата pptx");
    }
    if (!StrEnds(fileName.split(".pptx")[0], "_Спринт_2")) {
        errors.push("Шаблон названия файла  - Название команды_Спринт_2");
    }
    return ArrayMerge(errors, "This", "; ");
}

try {
    l.open(logger);

    var oFormFields = parse_form_fields(SCOPE_WVARS.GetOptProperty("form_fields"));

    var customFields = [
        {"name": "Презентация спринта 2", "code": "fld_sprint2", "isReq": true},
    ];

    var check_fields_msg = check_fields(oFormFields, customFields);
    if (check_fields_msg == "") {
        oFileTemp = ArrayOptFind(oFormFields, "This.name == 'fld_sprint2'");
        var check_file_name_msg = checkFileName(oFileTemp.value);
        if (check_file_name_msg == "") {
            iFileTemp = SaveFileInResource(oFileTemp, curUser.id.Value, curUser);
            attachFileToRepositorium(iFileTemp, 7317153638859278965);  // Спринт 2 Экспертиза будущего
            RESULT = {
                command: "alert",
                msg: "Файл отправлен",
            };
            
        } else {
            RESULT = {
                command: "alert",
                msg: check_file_name_msg,
            };
        }

    } else {
        RESULT = {
            command: "alert",
            msg: "Заполните обязательные поля: " + check_fields_msg,
        };
    }

    l.close(logger);
} catch (error) {
    l.write(logger, error);
    l.close(logger);
    RESULT = {
        command: "alert",
        msg: ExtractUserError(error),
    };
}