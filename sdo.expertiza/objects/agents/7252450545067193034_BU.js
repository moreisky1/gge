MAX_MANAGERS = OptInt(Param.MAX_MANAGERS); // Кол-во столбцов в Excel файле Руководителей
MAX_COLLS = OptInt(Param.MAX_COLLS); // Кол-во столбцов в Excel файле Коллег
MAX_STAFF = OptInt(Param.MAX_STAFF); // Кол-во столбцов в Excel файле Подчиненных
KEY_FIELD = "fullname";

if (Param.RECREATE == "1") KILL_FLAG = true; // Пересоздавать планы/анкеты или досоздавать
else KILL_FLAG = false;

if (Param.VERIFY_RUN_MODE == '1') // Режим проверки
    VERIFY_RUN_MODE = true;
else 
    VERIFY_RUN_MODE = false;

SILENT_MODE = false;
// -----------------------------------------------------------Функции----------------------------------------------------------------
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
        if (is_exist_in_catalog_by_id("collaborator", recipientID)) {
            teRecipient = tools.open_doc(recipientID).TopElem;
            recipient = docAN.TopElem.recipients.AddChild();
            recipient.address = teRecipient.email;
            recipient.name = teRecipient.fullname;
            recipient.collaborator_id = teRecipient.id;
        }
    }

    docAN.Save();
    res = docAN.DocID;
    
    return res;
}

function sendActiveNotif(params) {
    var res = undefined;
    var activeNotifID = createActiveNotif(params);
    if (activeNotifID != undefined) res = tools.send_notification(activeNotifID);
    return res;
}

function sendEmail(coll_id, person_id) {
    var teCol = tools.open_doc(coll_id).TopElem;
    var tePerson = tools.open_doc(person_id).TopElem;
    var replaces = [
        {"name": "[fullname]", "value": String(teCol.fullname)},
        {"name": "[person_fullname]", "value": String(tePerson.fullname)},
        {"name": "[url]", "value": "http://sdo.expertiza.ru/appr_player.html?assessment_appraise_id=" + ASS_ID}
    ];
    var obj = getNTSubjectBody(notif_template_id, replaces);
    params = {
        subject: obj.subject,
        body: obj.body,
        recipientIDs: [coll_id],
        resourceIDs: [],
    }
    sendActiveNotif(params);
}

function is_exist_in_catalog_by_id(catalogName, id) {
    return ArrayOptFirstElem(XQuery("for $elem in " + catalogName + "s where $elem/id = " + id + " return $elem")) != undefined;
}

function add_cols_to_groups(groupIDs, colIDs) {
    try {
        for (groupID in groupIDs) {
            if (is_exist_in_catalog_by_id("group", groupID)) {
                docGroup = tools.open_doc(groupID);
                teGroup = docGroup.TopElem;
                for (colID in colIDs) {
                    colID = OptInt(colID);
                    if (is_exist_in_catalog_by_id("collaborator", colID) && !teGroup.collaborators.ChildByKeyExists(colID)) {
                        teGroup.collaborators.ObtainChildByKey(colID);
                    }
                }
                docGroup.Save();
            }
        }
        return true;
    } catch (err) {
        return false;
    }
}

// ***********************************************************
// функция: CurGenPart
// описание: Генерирует анкету
// входные параметры:
//			collCode : Код сотрудника эксперта
// 			self_person_id : id оцениваемого сотрудника
// 			planObj : План оценки
//			type : роль эксперта
//			num : строка в файле Excel, которая обрабатывается в данный момент
// возвращает:
//			<нет>
// ***********************************************************
function CurGenPart(collCode, self_person_id, planObj, type, num) {
    if (collCode != "") {
        _coll = ArrayOptFirstElem(XQuery("for $elem in collaborators where $elem/" + KEY_FIELD + " = '"+collCode+"' return $elem"));
        if (_coll != undefined) {
            if (KILL_FLAG || ArrayOptFirstElem(XQuery("for $elem in pas where $elem/assessment_appraise_id = "+ASS_ID+" and $elem/person_id = "+self_person_id+" and $elem/expert_person_id = "+_coll.id+" return $elem")) == undefined) {
                tools_ass.generate_participant(ASS_ID, assessmentObj.participants.GetOptChildByKey(type), planObj, null, planObj, _coll.id, true, null);
                if (type == 'self') {
                    new_pa = ArrayOptFirstElem(XQuery("for $elem in pas where $elem/assessment_appraise_id = "+ASS_ID+" and $elem/person_id = "+_coll.id+" and $elem/expert_person_id = "+_coll.id+" return $elem"));
                    if (new_pa == undefined)
                        WriteLogError(num , collCode , "" , "для данного сотрудника не удалось создать анкету");
                    else if (new_pa.competence_profile_id == null)
                        WriteLogError(num , collCode , _coll.fullname , "сотруднику не удалось присвоить профиль компетенций");
                }
                /*try {
                    position_common = _coll.position_id.ForeignElem.position_common_id.ForeignElem;
                }
                catch(err) {
                    
                }*/
                sendEmail(_coll.id, self_person_id);
            }
        }
        else
            WriteLogError(num , collCode , "" , "сотрудника с таким кодом не найдено");
    }
    
}

ass_app_role_id = 7249616588246769367;
group_role_id = 6901314200273231950;

template_ass_app_id = OptInt(Param.template_ass_app_id);
notif_template_id = OptInt(Param.notif_template_id);

group = tools.read_object(Param.group, "json")[0];
group_name = group.name;
group_code = group.code;

ass_app = tools.read_object(Param.ass_app, "json")[0];
ass_app_start_date = ass_app.start_date;
ass_app_end_date = ass_app.end_date;
ass_app_code = ass_app.code;


// ***********************************************************

// ******************ОСНОВНАЯ ОБЛАСТЬ*************************
if (LdsIsServer)
    LogMessage("Агент создания планов и анкет по файлу Excel");

if (template_ass_app_id == undefined) {
    LogMessage("Не выбрана шаблонная процедура оценки. Агент завершен.");
    Cancel();
} else {
    template = tools.open_doc(template_ass_app_id);
    var docAssApp = tools.new_doc_by_name("assessment_appraise", false);
    docAssApp.BindToDb(DefaultDb);
    
    docAssApp.TopElem.AssignExtraElem(template.TopElem);
    docAssApp.TopElem.role_id.ObtainByValue(ass_app_role_id);
    docAssApp.TopElem.code = ass_app_code;
    docAssApp.TopElem.start_date = ass_app_start_date;
    docAssApp.TopElem.end_date = ass_app_end_date;
    docAssApp.TopElem.groups.Clear();
    docAssApp.TopElem.auditorys.Clear();    
    docAssApp.Save();

    ASS_ID = docAssApp.DocID;
    assessmentDoc = docAssApp;
    assessmentObj = assessmentDoc.TopElem;
}

try {
    // если агент выполняется на клиенте, то запросим файл
    excelFileUrl = Screen.AskFileOpen('', 'Выбери файл&#09;*.*');
}
catch(err) {
    LogMessage("Выполнение агента по добавлению функциональных руководителей на сервере, из файла - " + SERVER_FILE_URL);
    // скорее всего агент выполняется на сервере
    excelFileUrl = SERVER_FILE_URL;
}

lineArray = undefined;
try {
    sourceList = OpenDoc(excelFileUrl, 'format=excel');
    lineArray = ArrayFirstElem(sourceList.TopElem);
}
catch (err) {
    LogMessage("Ошибка загрузки." + err);
    LogMessage("Агент создания планов и анкет завершен.");
    Cancel();
}

// если агент выполняется на клиенте
if (!LdsIsServer) {
    VERIFY_RUN_MODE = Screen.MsgBox('Выполнить агент в режиме проверки данных?', 'Копирование данных', 'question', 'yes,no');
    if (!VERIFY_RUN_MODE) {
        KILL_FLAG = Screen.MsgBox('Вы хотите удалить созданные раннее планы и формы оценки для выбранной процедуры оценки? ' +
            'Для выполнения агента в режиме изменения/добавления планов и форм оценки выберите "Нет".', 'Создание планов и форм оценки', 'question', 'yes,no');
        if (KILL_FLAG)
            KILL_FLAG = Screen.MsgBox('Вы действительно хотите удалить все созданные раннее планы и формы оценки для ' +
                'выбранной процедуры оценки?  Для удаления планов и форм оценки для всех сотрудников, ' +
                'участвующих в процедуре, нажмите "Да", иначе выберите "Нет".', 'Создание планов и форм оценки', 'question', 'yes,no');
    }
}
if (VERIFY_RUN_MODE)
    LogMessage("Агент выполняется в режиме проверки данных.", true);
else {
    if (KILL_FLAG)
        LogMessage("Ранее созданные планы и анкеты по выбранной процедуре будут удалены", true);
    else
        LogMessage("Ранее созданные планы и анкеты по выбранной процедуре будут отредактированы", true);
}

if (KILL_FLAG) tools_ass.generate_assessment_plan(ASS_ID, false, false, KILL_FLAG, undefined, undefined, null);
    
auditorys_ids = Array();
for (i = 1; i < ArrayCount(lineArray); i++) {
    _selfCode = Trim(lineArray[i][0]);
    if (_selfCode != "") {
        _coll = ArrayOptFirstElem(XQuery("for $elem in collaborators where $elem/" + KEY_FIELD + " = '"+_selfCode+"' return $elem"));
        if (_coll != undefined) {
            auditorys_ids[i-1] = _coll.id;
            docGroup = tools.new_doc_by_name("group", false);
            docGroup.BindToDb(DefaultDb);
            docGroup.TopElem.role_id.ObtainByValue(group_role_id);
            docGroup.TopElem.code = group_code;
            docGroup.TopElem.name = group_name;            
            docGroup.Save();
            
            add_cols_to_groups([docGroup.DocID], [_coll.id]);

            newGroup = assessmentObj.groups.AddChild();
            newGroup.group_id = docGroup.DocID;
        } else {
            auditorys_ids[i-1] = undefined;
            WriteLogError(i+1 , _selfCode , "" , "оцениваемого сотрудника с таким кодом не найдено");
        }
    }
}

assessmentDoc.Save();
tools_ass.generate_assessment_plan(ASS_ID, true, true, KILL_FLAG, undefined, undefined, docGroup.DocID);

for (i = 1; i < ArrayCount(lineArray); i++) {	
    if (auditorys_ids[i-1] == undefined)
        continue;
    
    plan = ArrayOptFirstElem(XQuery("for $elem in assessment_plans where $elem/assessment_appraise_id = " + ASS_ID + " and $elem/person_id = "+auditorys_ids[i-1]+" return $elem"));
    if (plan == undefined) {
        WriteLogError(i+1 , Trim(lineArray[i][0]) , "" , "не удалось создать план оценки.");
    } else {
        _planDoc = OpenDoc(UrlFromDocID(plan.id));
        _planObj = _planDoc.TopElem;
        
        CurGenPart(Trim(lineArray[i][0]), auditorys_ids[i-1], _planObj, 'self', i);
        for (j = 1; j < (MAX_MANAGERS + 1); j++) {
            _managerCode = Trim(lineArray[i][j]);
            CurGenPart(_managerCode, auditorys_ids[i-1], _planObj, 'manager', i);
        }
        for (n = (MAX_MANAGERS + 1) ; n < (MAX_MANAGERS + MAX_COLLS + 1); n++) {
            _collCode = Trim(lineArray[i][n]);
            CurGenPart(_collCode, auditorys_ids[i-1], _planObj, 'coll', i);
        }
        for (k = (MAX_MANAGERS + MAX_COLLS + 1) ; k < (MAX_MANAGERS + MAX_COLLS + MAX_STAFF + 1); k++) {
            _staffCode = Trim(lineArray[i][k]);
            CurGenPart(_staffCode, auditorys_ids[i-1], _planObj, 'staff', i);
        }
    }
}
