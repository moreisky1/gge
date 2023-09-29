// 7265289802501221765 - test

SILENT_MODE = false;
ASS_ID = null;
KILL_FLAG = true;
KEY_FIELD = "id";
LOG_FILE_PATH = "file:/" + "C:/temp/"; // Каталог, где будут размещаться лог файлы
// -----------------------------------------------------------Константы------------------------------------------------------------
// расширение файла журнала
LOG_FORMAT = "xls";
// содержание журнала - не менять!!!
LOG_STR = "";
// -----------------------------------------------------------Функции----------------------------------------------------------------

// ***********************************************************
// функция: OpenLogError
// описание: Формирует начало содержания протокала
// входные параметры:
//			! используются глобальные переменные
// 				LOG_STR : строка протокола
// возвращает:
//			<нет>
// ***********************************************************
function OpenLogError() {
    LOG_STR = ""+

    "Content-Type: text/html; charset=\"windows-1251\"\n"+
    "\n"+
    "<html xmlns:v=3D\"urn:schemas-microsoft-com:vml\"\n"+
    "xmlns:o=3D\"urn:schemas-microsoft-com:office:office\"\n"+
    "xmlns:x=3D\"urn:schemas-microsoft-com:office:excel\"\n"+
    "xmlns=3D\"http://www.w3.org/TR/REC-html40\">\n"+
    "<head>\n"+
    "<meta http-equiv=3DContent-Type content=3D\"text/html; charset=3Dwindows-125=\n"+
    "1\">\n"+
    "<meta name=3DGenerator content=3D\"Microsoft Excel 14\">\n"+
    "\n"+
    "</head>\n"+
    "\n"+
    "\n"+
    "\n"+
    "<table border=1>\n"+
    "	<tr>\n"+
    "		<td colspan='4'><b><font color='red'>Протокол загрузки  данных </font></b></td>\n"+
    "	</tr>\n"+
    "	<tr>\n"+
    "		<td colspan='4'>&nbsp;</td>\n"+
    "	</tr>\n"+
    "	<tr>\n"+
    "		<td><b>дата:</b></td>\n"+
    "		<td>" + StrDate(Date()) + "</td>\n"+
    "		<td>&nbsp;</td>\n"+
    "		<td>&nbsp;</td>\n"+
    "	</tr>\n"+
    "	<tr>\n"+
    "		<td colspan='4'>&nbsp;</td>\n"+
    "	</tr>\n"+
    "	<tr>\n"+
    "		<td align=center><b>№ строки</b></td>\n"+
    "		<td align=center><b>ТН</b></td>\n"+
    "		<td align=center><b>ФИО</b></td>\n"+
    "		<td align=center><b>Тип ошибки загрузки</b></td>\n"+
    "	</tr>\n"+
    "\n";

}

// ***********************************************************
// функция: writeLogError
// описание: Формирует строку протокала
// входные параметры:
//			! используются глобальные переменные
// 				LOG_STR : строка протокола
//			index : номер строки матрицы ролей
//			error : сообщени об ошибке
//			status : статус
// возвращает:
//			<нет>
// ***********************************************************
function WriteLogError(index, _code, _fio, error) {
    LOG_STR += "<tr>" +
        "<td align=center> " + index + "</td>" +
        "<td align=center>" + _code+ "</td>" +
        "<td align=center>" + _fio+ "</td>" +
        "<td align=center>" + error+ "</td>" +
        "</tr>";
}

// ***********************************************************
// функция: CloseLogError
// описание: Пишет содержание протокала в файл
// входные параметры:
//			! используются глобальные переменные
// 				LOG_STR : строка протокола
//				LOG_FILE_PATH : пусть с название файла журнала
//				LOG_FORMAT : формат файла
// возвращает:
//			<нет>
// ***********************************************************
function CloseLogError() {
    LOG_STR += "" +
        "</table>"+
        "</html>";

    _month = (StrCharCount(String(Month(Date()))) == 1 ? '0' + String(Month(Date())) : String(Month(Date())));
    _day = (StrCharCount(String(Day(Date()))) == 1 ? '0' + String(Day(Date())) : String(Day(Date())));
    _hour = (StrCharCount(String(Hour(Date()))) == 1 ? '0' + String(Hour(Date())) : String(Hour(Date())));
    _minute = (StrCharCount(String(Minute(Date()))) == 1 ? '0' + String(Minute(Date())) : String(Minute(Date())));
    _second = (StrCharCount(String(Second(Date()))) == 1 ? '0' + String(Second(Date())) : String(Second(Date())));

    //LOG_FILE_NAME = LOG_FILE_PATH + " от " + String(Year(Date())) + String(Month(Date())) + String(Day(Date())) + "_" +
    //				String(Hour(Date())) + String(Minute(Date())) + String(Second(Date())) + "." + LOG_FORMAT;

    LOG_FILE_NAME = "file:/"+ UrlToFilePath(LOG_FILE_PATH) + 'Протокол' + " от " +
         String(Year(Date())) + _month + _day + "_" +
         _hour +'-' + _minute + '-' + _second + "." + LOG_FORMAT;

    LOG_STR=EncodeCharset(LOG_STR,"windows-1251");
    PutUrlData(LOG_FILE_NAME, LOG_STR);
}

// ***********************************************************
// функция: LogMessage
// описание: Пишет сообщение в журнал и выводит сообщение пользователю
// входные параметры:
// 			mes : строка сообщения
// 			no_aler : признак выводить сообщение пользователю
//				(при выполнениии на сервере - выводитс в терминал, на клиенте - диалоговое окно)
// возвращает:
//			<нет>
// ***********************************************************
function LogMessage(mes, no_alert) {
    try {
        no_alert = Boolean(no_alert);
    }
    catch (err) {
        no_alert = false;
    }

    LogEvent('agent', mes);
    if (!no_alert && !SILENT_MODE)
        alert(mes);
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
            }
        }
        else
            WriteLogError(num , collCode , "" , "сотрудника с таким кодом не найдено");
    }
    
}
// ***********************************************************
// функция: FindColl
// описание: Проверяет сотрудника по коду(есть ли такой в базе), Если такого нет, то пишет запись в лог.
// входные параметры:
//			code : Код сотрудника
//			num : строка в файле Excel, которая обрабатывается в данный момент
// возвращает:
//			<нет>
// ***********************************************************
function FindColl(code, num) {
    if (code != "") {
        _coll = ArrayOptFirstElem(XQuery("for $elem in collaborators where $elem/" + KEY_FIELD + " = '" + code + "' return $elem"));
        if (_coll == undefined)
            WriteLogError(num + 1, code , "" , "FindColl сотрудника с таким кодом не найдено");
    }
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

function getMonth(curDate) {
    var months = ["январь", "февраль", "март", "апрель", "май", "июнь",
        "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];
    return months[Month(curDate) - 1];
}

function getCount(catalog, field, substr) {
    return ArrayCount(XQuery("for $e in " + catalog + "s " +
        " where contains(" + field + ", '" + substr + "') return $e"));
}

try {
    var ass_app_role_id = 7249616588246769367; // 360
    var group_role_id = 6901314200273231950; // Оценка 360
    var template_ass_app_id = 7252586122981674623; // Опрос по методу "360 градусов"

    var oFormFields = parse_form_fields(SCOPE_WVARS.GetOptProperty("form_fields"));
    var customFields = [
        {"name": "Работник", "code": "fld_collaborator", "isReq": true},
        {"name": "Руководители", "code": "fld_bosses", "isReq": false},
        {"name": "Коллеги", "code": "fld_colleagues", "isReq": false},
        {"name": "Дата", "code": "fld_end_date", "isReq": true}
    ];
    var curDate = Date();
    var check_fields_msg = check_fields(oFormFields, customFields);
    if (check_fields_msg == "") {
        var group_name = "Оценка (" + getMonth(curDate) + ")_" + (getCount("group", "name", "Оценка (" + getMonth(curDate) + ")_") + 1);
        var group_code = "360_" + Year(curDate) + "_" + (getCount("group", "code", "360_" + Year(curDate) + "_") + 1);
        
        var ass_app_start_date = curDate;
        var ass_app_end_date = get_form_field(oFormFields, "fld_end_date");
        var ass_app_code = Year(curDate) + "_360_" + (getCount("assessment_appraise", "code", Year(curDate) + "_360_") + 1);

        var template = tools.open_doc(template_ass_app_id);
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

        // if (KILL_FLAG)
        //     tools_ass.generate_assessment_plan(ASS_ID, false, false, KILL_FLAG, undefined, undefined, null);
        
        auditorys_ids = Array();
        
        _self = get_form_field(oFormFields, "fld_collaborator");
        _bosses = get_form_field(oFormFields, "fld_bosses");
        _colleagues = get_form_field(oFormFields, "fld_colleagues");
        if (_self != "") {
            _coll = ArrayOptFirstElem(XQuery("for $elem in collaborators where $elem/" + KEY_FIELD + " = '"+_self+"' return $elem"));
            if (_coll != undefined) {
                auditorys_ids[0] = _coll.id;
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
                auditorys_ids[0] = undefined;
                WriteLogError(0 , _self , "" , "оцениваемого сотрудника с таким кодом не найдено");
            }
        }
        
        assessmentDoc.Save();
        tools_ass.generate_assessment_plan(ASS_ID, true, true, KILL_FLAG, undefined, undefined, docGroup.DocID);

        plan = ArrayOptFirstElem(XQuery("for $elem in assessment_plans where $elem/assessment_appraise_id = " + ASS_ID + " and $elem/person_id = "+auditorys_ids[0]+" return $elem"));
        if (plan == undefined) {
            WriteLogError(1 , _self , "" , "не удалось создать план оценки.");
        } else {
            _planDoc = OpenDoc(UrlFromDocID(plan.id));
            _planObj = _planDoc.TopElem;
            
            CurGenPart(_self, auditorys_ids[0], _planObj, 'self', 1);
            
            for (elem in _bosses.split(";")) {
                _manager = Trim(elem);
                CurGenPart(_manager, auditorys_ids[0], _planObj, 'manager', 1);
            }
            for (elem in _colleagues.split(";")) {
                _collCode = Trim(elem);
                CurGenPart(_collCode, auditorys_ids[0], _planObj, 'coll', 1);
            }

        }

    } else {
        RESULT = {
            command: "alert",
            msg: "Заполните обязательные поля: " + check_fields_msg,
        };
    }
} catch (e) {
    RESULT = {
        command: "alert",
        msg: ExtractUserError(e),
    };
}
