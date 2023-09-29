/*
 Агент для удаления дублей из персонала
*/

//--- Уточнение запроса сотрудников
var _select_xquery = Param._select_xquery;
var _eq_fields = Param._eq_fields == '' ? 'code' : Param._eq_fields;
var _eq_accountname = Param._eq_accountname;
var _eq_custom_fields = Param._eq_custom_fields;
var _eq_xquery = Param._eq_xquery;

//--- Определение уникальности
var _main_flag = Param._main_flag == '' ? 'maxdate' : Param._main_flag;
var _main_field = Param._main_field == '' ? 'doc_info.creation.date' : Param._main_field;

//--- Перенос информации
//- По сотруднику
var _delete_persons = tools_web.is_true(Param._delete_persons);
var _replace_fields = Param._replace_fields;
var _clear_fields = Param._clear_fields;
var _copy_fields = Param._copy_fields;
var MERGE_HISTORY_STATES = tools_web.is_true(Param._merge_history_states);

//- История обучение (законченные и не законченные тесты, курсы, результаты мероприятия)
var _copy_learning = tools_web.is_true(Param._copy_learning);

//- Должность
var _delete_positions = Param._delete_positions == '' ? 'delete' : Param._delete_positions;

//- Заявки
var _req_custom_fields = Param._req_custom_fields;
var _req_workflow_fields = Param._req_workflow_fields;

//- Логирование
var bIsLog = tools_web.is_true(Param._b_is_log);
var sLogMethod = Param._s_log_method == '' ? 'ext' : Param._s_log_method;
var sLogMode = Param._s_log_mode == '' ? 'error' : Param._s_log_mode;
var sLogStr = '';
var docReport = null;

var sLogMethodExt = "doubles"; // префикс файла журнала (для sLogMethod = "ext")
var slogMethodPath = "x-local://Logs"; //директория для сохранения файла на сервер (sLogMethod = "excel")
var bLogError = StrContains(sLogMode, "error");
var bLogNotFound = StrContains(sLogMode, "notfound");
var bLogSuccess = StrContains(sLogMode, "success");
var bLogDetails = StrContains(sLogMode, "details");
var bLogDelete = StrContains(sLogMode, "delete");

function open_log() {
    if (!bIsLog) {
        return false;
    }
    if (sLogMethod == "system") {
        return true;
    } else if (sLogMethod == "ext") {
        EnableLog(sLogMethodExt, true);
    } else if (sLogMethod == "report") {
        docReport = OpenNewDoc('x-local://wtv/wtv_action_report.xmd');
        docReport.BindToDb(DefaultDb);
        docReport.TopElem.create_date = Date();
        docReport.TopElem.type = "import_excel";
        docReport.TopElem.completed = false;
        docReport.TopElem.report_text = "Удаление дублей сотрудников.\n";
        docReport = tools.add_report(docReport.DocID, 'Запуск процесса.', docReport);
        sLogStr = docReport.TopElem.report_text;
    } else if (sLogMethod == "excel") {
        sLogStr = "<HTML>< META HTTP - EQUIV=\"Content-Type\" CONTENT=\"text/html; charset=utf-8\"/> < BODY > <TABLE BORDER=\"1\" CELLPADDING=\"2\" CELLSPACING=\"0\"> < TR > <TD><B>" + Date() + "-   ПРОЦЕСС УДАЛЕНИЯ ДУБЛЕЙ ЗАПУЩЕН</B></TD></TR > ";
    } else {
        return false;
    }
}

function close_log() {
    if (!bIsLog) {
        return false;
    }
    if (sLogMethod == "system") {
        return true;
    } else if (sLogMethod == "ext") {
        EnableLog(sLogMethodExt, false);
    } else if (sLogMethod == "report") {
        docReport.TopElem.completed = true;
        docReport.TopElem.report_text = sLogStr + "\n" + Date() + '  Процесс завершен.';
        docReport.Save();
    } else if (sLogMethod == "excel") {
        sLogStr = sLogStr + "< TR > <TD><B>" + Date() + "-   ПРОЦЕСС УДАЛЕНИЯ ЗАВЕРШЕН</B></TD></TR ></TABLE ></BODY ></HTML > ";
        if (LdsIsServer) {
            _filemname = slogMethodPath+ '/' + (sLogMethodExt + "_" + Year(Date()) + "_" + Month(Date()) + "_" + Day(Date()) + "_" + Hour(Date()) + "_" + Minute(Date())) + ".xls";
            PutUrlText(_filemname, sLogStr);
        } else {
            _filemname = ObtainTempFile('.xls');
            PutUrlText(_filemname, sLogStr);
            ShellExecute('open', _filemname);
        }
    } else {
        return false;
    }
}

function write_log_text(text) {
    if (!bIsLog) {
        return false;
    }
    if (sLogMethod == "system") {
        alert(text);
    } else if (sLogMethod == "ext") {
        LogEvent(sLogMethodExt, text);
    } else if (sLogMethod == "report") {
        sLogStr = sLogStr + "\n" + Date() + " -  " + text;
    } else if (sLogMethod == "excel") {
        sLogStr = sLogStr + "<TR><TD>" + Date() + " -  " + text + "</TD></TR>";
    } else {
        return false;
    }
}

function wLog(id, errstr, obj, key, doubles, delete_id) {
    if (!bIsLog) {
        return false;
    }
    _text = "ID:" + id + "; ";
    if (errstr != "" && bLogError) {
        write_log_text(_text + "ОШИБКА: " + errstr);
        return true;
    }
    if (obj == null && bLogNotFound) {
        write_log_text(_text + "НЕ НАЙДЕНО ПО ЗАПРОСУ: " + key);
        return true;
    }
    if (obj != null && bLogDelete && delete_id != null) {
        _text += "УДАЛЕН ОБЪЕКТ С ID:  " + delete_id + " тип:" + obj + " ПО ЗАПРОСУ: " + key;
        write_log_text(_text);
        return true;
    } else if (obj != null && bLogSuccess && delete_id == null && doubles != null) {
        _text += "НАЙДЕНА ЗАПИСЬ ПО КЛЮЧУ: " + key + ". ЗАМЕНЕНО: " + doubles;
        write_log_text(_text);
        return true;
    }
    if (obj != undefined && bLogDetails && delete_id == null) {
        _text += "ИЗМЕНЕН ОБЪЕКТ С ID:  " + (obj.ChildExists('id') ? obj.id : 'Не указан ') + " тип:" + obj.Name + " ПО ЗАПРОСУ: " + key;
        write_log_text(_text);
        return true;
    } else {
        return true;
    }
    write_log_text(_text);
    return true;
}

function save(_doc){
    _doc.Save();
}
var _agent_num = Random(0, 100000);

var _arr_eq_fields = _eq_fields.split(",");
var _arr_eq_custom_fields = _eq_custom_fields.split(",");
var _arr_main_field = _main_field.split(".");
var _arr_copy_fields = _copy_fields.split(",");
var _arr_replace_fields = _replace_fields.split(",");
var _arr_clear_fields = _clear_fields.split(",");
var _arr_req_custom_fields = String(_req_custom_fields).split(",");
var _arr_req_workflow_fields = String(_req_workflow_fields).split(",");

function Delete_positions(aData, idDouble, idMain, docDouble, teMainPerson) {
    try {
        var aRes = ArrayOptFirstElem(aData) != undefined ? ArraySelectBySortedKey(aData, OptInt(idDouble), 'basic_collaborator_id') : [];
        for (_position in aRes) {
            PositionDoc = tools.open_doc(_position.id);
            if (PositionDoc == undefined) continue;

            if (_delete_positions == "delete") {
                docDouble.TopElem.position_id.Clear();
                docDouble.TopElem.position_name.Clear();
                save(docDouble);
                DeleteDoc(UrlFromDocID(_position.PrimaryKey));
                wLog(idMain, "", "position", "", null, _position.PrimaryKey);
            } else if (_delete_positions == "clear" || _delete_positions == "keep") {
                if (_delete_persons == false) {
                    docDouble.TopElem.position_id.Clear();
                    docDouble.TopElem.position_name.Clear();
                    save(docDouble);
                    wLog(idMain, "", docDouble.TopElem, "", null, null)
                }
                if (_delete_positions == "keep") {
                    PositionDoc.TopElem.basic_collaborator_id = _main_person_id;
                    PositionDoc.TopElem.basic_collaborator_id.sd.fullname = teMainPerson.fullname;
                    PositionDoc.TopElem.basic_collaborator_id.sd.position_name = PositionDoc.TopElem.name;
                    PositionDoc.TopElem.basic_collaborator_id.sd.position_id = _position.PrimaryKey;
                    PositionDoc.TopElem.basic_collaborator_id.sd.is_dismiss = teMainPerson.is_dismiss;
                    wLog(idMain, "", PositionDoc.TopElem, "", null, null)
                } else {
                    PositionDoc.TopElem.basic_collaborator_id.Clear();
                    wLog(idMain, "", PositionDoc.TopElem, "", null, null)
                }
                save(PositionDoc);
            }
        }
    } catch (dp_error) {
        wLog(a, dp_error, null, null, null, null)
    }
}

function InfoChanging(_test_or_course, m_person_id, xq) {
    try {
        var docObject = tools.open_doc(_test_or_course.id);
        if (docObject != undefined) {
            docObject.TopElem.person_id = m_person_id;
            if (tools.common_filling('collaborator', docObject.TopElem, m_person_id)) {
                save(docObject);
                wLog(_test_or_course.id, "", docObject.TopElem, xq, null, null)
            } else {
                wLog(_test_or_course.id, "tools.common_filling_failed", docObject.TopElem, xq, null, null)
            }
        }
    } catch (e) {
        wLog(_test_or_course, 'InfoChanging - ' + e, null, null, null, null)
    }
}

function GetDotValue(_obj, _arr_field) {
    var ch_obj = _obj;
    for (_m_arr_field in _arr_field) {
        eval("ch_obj = ch_obj." + _m_arr_field);
    }
    return ch_obj.Value;
}

function SetDotValue(_obj, _arr_field, _v_value) {
    try {
        var ch_obj = _obj;
        for (_m_arr_field in _arr_field) {
            eval("ch_obj = ch_obj." + _m_arr_field);
        }
        ch_obj.Value = _v_value;
    } catch (e) {
        wLog(_obj, 'SetDotValue - ' + e, null, null, null, null)
    }
    return true;
}

function Copy_Person_Values(_m_doc_te, _d_id) {
    try {
        var _d_doc = tools.open_doc(_d_id);
        if (_d_doc == undefined) return false;
        var _d_doc_te = _d_doc.TopElem;
        if (_copy_fields != "") {
            for (_m_arr_copy_fields in _arr_copy_fields) {
                _arr_m_arr_copy_fields = _m_arr_copy_fields.split(".");
                if (_m_arr_copy_fields != 'hire_date') {
                    if (String(GetDotValue(_m_doc_te, _arr_m_arr_copy_fields)) == "") {
                        SetDotValue(_m_doc_te, _arr_m_arr_copy_fields, GetDotValue(_d_doc_te, _arr_m_arr_copy_fields));
                    }
                } else if (_m_arr_copy_fields == 'hire_date') {
                    dMainDate = GetDotValue(_m_doc_te, _arr_m_arr_copy_fields);
                    dDblDate = GetDotValue(_d_doc_te, _arr_m_arr_copy_fields);
                    if (dDblDate < dMainDate) {
                        SetDotValue(_m_doc_te, _arr_m_arr_copy_fields, dDblDate);
                    }
                }
            }
        }
        if (_replace_fields != "") {
            for (_m_arr_replace_fields in _arr_replace_fields) {
                _arr_m_arr_replace_fields = _m_arr_replace_fields.split(".");
                SetDotValue(_d_doc_te, _arr_m_arr_replace_fields, GetDotValue(_m_doc_te, _arr_m_arr_replace_fields));
                save(_m_doc_te.Doc);
            }
        }
        if (_clear_fields != "") {
            for (_m_arr_clear_fields in _arr_clear_fields) {
                _arr_m_arr_clear_fields = _m_arr_clear_fields.split(".");
                SetDotValue(_d_doc_te, _arr_m_arr_clear_fields, "");
                save(_d_doc_te.Doc);
            }
        }
    } catch (e) {
        wLog(_d_id, 'Copy_Person_Values - ' + e, null, null, null, null)
    }
}

// ------------active_learnings----------------------
function activeLearnings(aData, idDouble, idMain) {
    try {
        var aActiveLearns = ArrayOptFirstElem(aData) != undefined ? ArraySelectBySortedKey(aData, OptInt(idDouble), 'person_id') : [];
        for (catLearn in aActiveLearns) {
            InfoChanging(catLearn, idMain);
        }
    } catch (e) {
        wLog("", "active_learnings - " + e, null, null, null, null)
    }
}
// ------------learnings----------------------------- 
function learnings(aData, idDouble, idMain) {
    try {
        var aLearns = ArrayOptFirstElem(aData) != undefined ? ArraySelectBySortedKey(aData, OptInt(idDouble), 'person_id') : [];
        for (catLearn in aLearns) {
            InfoChanging(catLearn, idMain);
        }
    } catch (e) {
        wLog("", "learnings - " + e, null, null, null, null)
    }
}
// ------------active_test_learnings-----------------
function activeTestLearnings(aData, idDouble, idMain) {
    try {
        var aActiveTestLearns = ArrayOptFirstElem(aData) != undefined ? ArraySelectBySortedKey(aData, OptInt(idDouble), 'person_id') : [];
        for (catLearn in aActiveTestLearns) {
            InfoChanging(catLearn, idMain);
        }
    } catch (e) {
        wLog("", "active_test_learnings - " + e, null, null, null, null)
    }
}
// ------------test_learnings------------------------
function testLearnings(aData, idDouble, idMain) {
    try {
        var aTestLearns = ArrayOptFirstElem(aData) != undefined ? ArraySelectBySortedKey(aData, OptInt(idDouble), 'person_id') : [];
        for (catLearn in aTestLearns) {
            InfoChanging(catLearn, idMain);
        }
    } catch (e) {
        wLog("", "test_learnings - " + e, null, null, null, null)
    }
}
// -----------------events result--------------------
function eventsResult(aData, idDouble, idMain) {
    try {
        var aEventResult = ArrayOptFirstElem(aData) != undefined ? ArraySelectBySortedKey(aData, OptInt(idDouble), 'person_id') : [];
        for (catLearn in aEventResult) {
            InfoChanging(catLearn, idMain);
        }
    } catch (e) {
        wLog("", "events result - " + e, null, null, null, null)
    }
}
// -----------------events---------------------
function events(aData, idDouble, idMain, teMainPerson) {
    try {
        var aEventColl = ArrayOptFirstElem(aData) != undefined ? ArraySelectBySortedKey(aData, OptInt(idDouble), 'collaborator_id') : [];

        for (catEvent in aEventColl) {
            docEvent = tools.open_doc(catEvent.event_id);
            if (docEvent == undefined)
                continue;
            if (catEvent.is_collaborator == true) {
                elemCollab = docEvent.TopElem.collaborators.GetOptChildByKey(idDouble);
                if (elemCollab != undefined) {
                    elemCollab.collaborator_id = idMain;
                    elemCollab.person_fullname = teMainPerson.fullname;
                    elemCollab.person_position_name = (teMainPerson.position_name != null ? teMainPerson.position_name : '');
                    elemCollab.person_org_name = (teMainPerson.org_name != null ? teMainPerson.org_name : '');
                    elemCollab.person_subdivision_name = (teMainPerson.position_parent_name != null ? teMainPerson.position_parent_name : '');
                }
            }
            if (catEvent.is_tutor == true) {
                elemTutor = docEvent.TopElem.tutors.GetOptChildByKey(idDouble);
                if (elemTutor != undefined) {
                    elemTutor.collaborator_id = idMain;
                    elemTutor.person_fullname = teMainPerson.fullname;
                    elemTutor.person_position_name = (teMainPerson.position_name != null ? teMainPerson.position_name : '');
                    elemTutor.person_org_name = (teMainPerson.org_name != null ? teMainPerson.org_name : '');
                    elemTutor.person_subdivision_name = (teMainPerson.position_parent_name != null ? teMainPerson.position_parent_name : '');
                }
            }
            if (catEvent.is_preparation == true) {
                elemPrepar = docEvent.TopElem.even_preparations.GetOptChildByKey(idDouble);
                if (elemPrepar != undefined) {
                    elemPrepar.person_id = idMain;
                    elemPrepar.person_fullname = teMainPerson.fullname;
                }
            }
            save(docEvent);
            wLog(idMain, "", docEvent.TopElem, null, null, null);
        }
    } catch (e) {
        wLog("", "events - " + e, null, null, null, null)
    }
}

// --------------------assessment_appraises-------------------------
function assessmentAppraises(aData, idDouble, idMain, teMainPerson) {
    try {
        for (catAssessm in aData) {
            docAssessm = tools.open_doc(catAssessm.id);
            if (docAssessm != undefined) {
                arrPerson = docAssessm.TopElem.auditorys;
                elemPers = docAssessm.TopElem.auditorys.GetOptChildByKey(idDouble);
                if (elemPers != undefined) {
                    elemPers.person_id = idMain;
                    elemPers.person_name = teMainPerson.fullname;
                    elemPers.position_name = (teMainPerson.position_name != null ? teMainPerson.position_name : '');
                    save(docAssessm)
                    wLog(idMain, "", docAssessm.TopElem, "", null, null);
                }
            }
        }
    } catch (e) {
        wLog("", "assessment_appraises - " + e, null, null, null, null)
    }
}

function pas(aPas, aDevPlans, aAssessmPlans, idDouble, idMain) {
    try {
        var aData = ArrayUnion(
            (ArrayOptFirstElem(aPas) != undefined ? ArraySelectBySortedKey(aPas, OptInt(idDouble), 'person_id') : []),
            (ArrayOptFirstElem(aDevPlans) != undefined ? ArraySelectBySortedKey(aDevPlans, OptInt(idDouble), 'person_id') : []),
            (ArrayOptFirstElem(aAssessmPlans) != undefined ? ArraySelectBySortedKey(aAssessmPlans, OptInt(idDouble), 'person_id') : [])
        );
        for (catPa in aData) {
            docPa = tools.open_doc(catPa.id);
            if (docPa == undefined) continue;
            docPa.TopElem.person_id = idMain;
            tools_ass.assessment_person_filling(docPa.TopElem.person_id, idMain);
            save(docPa);
            wLog(idMain, "", docPa.TopElem, "", null, null);
        }
    } catch (e) {
        wLog("", "pas - " + e, null, null, null, null)
    }
}

function pasExp(aPas, aDevPlans, aAssessmPlans, idDouble, idMain) {
    try {
        var aData = ArrayUnion(
            (ArrayOptFirstElem(aPas) != undefined ? ArraySelectBySortedKey(aPas, OptInt(idDouble), 'expert_person_id') : []),
            (ArrayOptFirstElem(aDevPlans) != undefined ? ArraySelectBySortedKey(aDevPlans, OptInt(idDouble), 'expert_person_id') : []),
            (ArrayOptFirstElem(aAssessmPlans) != undefined ? ArraySelectBySortedKey(aAssessmPlans, OptInt(idDouble), 'expert_person_id') : [])
        );
        for (catExpPa in aData) {
            docPas = tools.open_doc(catExpPa.id);
            if (docPas == undefined) continue;
            docPas.TopElem.expert_person_id = idMain;
            tools_ass.assessment_person_filling(docPas.TopElem.expert_person_id, idMain);
            save(docPas);
            wLog(idMain, "", docPas.TopElem, '', null, null);
        }
    } catch (e) {
        wLog("", "pas_expert - " + e, null, null, null, null)
    }
}

// ------------requests---------------------------------------------
function requests(idDouble, idMain) {
    try {
        var aReqs = XQuery("for $req in requests where $req/person_id = " + idDouble + " or $req/object_id= " + idDouble + ((_req_custom_fields != "" || _req_workflow_fields != "") ? " or doc-contains($req/id,'wt_data','" + idDouble + "')" : "") + " return $req/id");
        for (catReq in aReqs) {
            docReq = tools.open_doc(catReq.id);

            if (docReq == undefined) continue;

            is_change = false;
            if (docReq.TopElem.person_id == idDouble) {
                docReq.TopElem.person_id = idMain;
                is_change = true;
            }
            if (docReq.TopElem.object_id == idDouble) {
                docReq.TopElem.object_id = idMain;
                is_change = true;
            }
            for (_mfld in _arr_req_custom_fields) {
                if (OptInt(docReq.TopElem.custom_elems.ObtainChildByKey(_mfld).value, 999) == idDouble) {
                    docReq.TopElem.custom_elems.ObtainChildByKey(_mfld).value = idMain;
                    is_change = true;
                }
            }
            for (_mfld in _arr_req_workflow_fields) {
                if (OptInt(docReq.TopElem.workflow_fields.ObtainChildByKey(_mfld).value, 999) == idDouble) {
                    docReq.TopElem.workflow_fields.ObtainChildByKey(_mfld).value = idMain;
                    is_change = true;
                }
            }
            if (is_change) {
                save(docReq);
                wLog(idMain, "", docReq.TopElem, "", null, null);
            }
        }
    } catch (e) {
        wLog("", "requests - " + e, null, null, null, null)
    }
}
// ----------------------------------qualification_assignment-------
function qualificationAssignment(aData, idDouble, idMain) {
    try {
        var aQualAssign = ArrayOptFirstElem(aData) != undefined ? ArraySelectBySortedKey(aData, OptInt(idDouble), 'person_id') : [];
        for (catRes in aQualAssign) {
            InfoChanging(catRes, idMain);
        }
    } catch (e) {
        wLog("", "qualification_assignment - " + e, null, null, null, null)
    }
}
// ---------------------------------- account-----------------------
function account(aData, idDouble, idMain, teMainPerson) {
    try {
        var aAccount = ArrayOptFirstElem(aData) != undefined ? ArraySelectBySortedKey(aData, OptInt(idDouble), 'object_id') : [];
        for (catAcc in aAccount) {
            docAcc = tools.open_doc(catAcc.id);
            if (docAcc == undefined) continue;
            docAcc.TopElem.object_id = idMain;
            docAcc.TopElem.object_name = teMainPerson.fullname;
            save(docAcc);
            wLog(idMain, "", docAcc.TopElem, null, null, null);
        }
    } catch (e) {
        wLog("", "account - " + e, null, null, null, null)
    }
}
// ---------------------------------- transaction-------------------
function transaction(aData, idDouble, idMain) {
    try {
        var aTran = ArrayOptFirstElem(aData) != undefined ? ArraySelectBySortedKey(aData, OptInt(idDouble), 'person_id') : [];
        for (catTran in aTran) {
            InfoChanging(catTran, idMain);
        }
    } catch (e) {
        wLog("", "transaction - " + e, null, null, null, null)
    }
}
// ----------------------------------order--------------------------
function order(aData, idDouble, idMain) {
    try {
        var aOrder = ArrayOptFirstElem(aData) != undefined ? ArraySelectBySortedKey(aData, OptInt(idDouble), 'person_id') : [];
        for (catOrder in aOrder) {
            InfoChanging(catOrder, idMain);
        }
    } catch (e) {
        wLog("", "order - " + e, null, null, null, null)
    }
}
// ----------------------------------basket-------------------------
function basket(aData, idDouble, idMain) {
    try {
        var aBasket = ArrayOptFirstElem(aData) != undefined ? ArraySelectBySortedKey(aData, OptInt(idDouble), 'person_id') : [];
        for (catOrder in aBasket) {
            InfoChanging(catOrder, idMain);
        }
    } catch (e) {
        wLog("", "basket - " + e, null, null, null, null)
    }
}
// ----------------------------------forum--------------------------
function forum(aData, idDouble, idMain) {
    try {
        var aForum = ArrayOptFirstElem(aData) != undefined ? ArraySelectBySortedKey(aData, OptInt(idDouble), 'person_id') : [];
        for (catElem in aForum) {
            doc = tools.open_doc(catElem.id);
            doc.TopElem.person_id = idMain;
            save(doc);
            wLog(idMain, "", doc.TopElem, null, null, null);
        }
    } catch (e) {
        wLog("", "forum - " + e, null, null, null, null)
    }
}

function forumsModerator(aData, idDouble, idMain) {
    try {
        for (catElem in aData) {
            doc = tools.open_doc(catElem.id);
            if (doc == undefined) continue;
            teDoc = doc.TopElem;
            arrColls = teDoc.moderators;
            elemCollab = arrColls.GetOptChildByKey(idDouble, 'moderator_id');
            if (elemCollab != undefined) {
                arrColls.DeleteChildByKey(idDouble);
                save(doc);
                newElemCollab = arrColls.GetOptChildByKey(idMain, 'moderatorsa_id');
                if (newElemCollab == undefined) {
                    addCollab = arrColls.AddChild();
                    addCollab.moderator_id = idMain;
                    save(doc);
                    wLog(idMain, "", doc.TopElem, null, null, null);
                }
            }
        }
    } catch (e) {
        wLog("", "forum moderator - " + e, null, null, null, null)
    }
}
// ----------------------------------history_states-----------------
function mergeHistory(docMainPerson, DblDoc, teMainPerson, idDouble, idMain) {
    try {
        var arrChangeLogs = docMainPerson.TopElem.change_logs;
        var iCntLogs = ArrayCount(arrChangeLogs);
        var arrChLogsDbl = DblDoc.TopElem.change_logs;
        if (iCntLogs == 0) {
            for (elemLog in arrChLogsDbl) {
                addChangeLog = arrChangeLogs.AddChild();
                addChangeLog.AssignElem(elemLog);
            }
        } else {
            for (elemLog in arrChLogsDbl) {
                bPrAdd = true;
                for (elemMain in arrChangeLogs) {
                    if (elemMain.position_id == elemLog.position_id && elemMain.position_parent_id == elemLog.position_parent_id && elemMain.org_id == elemLog.org_id) {
                        bPrAdd = false;
                        break;
                    }
                }
                if (bPrAdd == true) {
                    addChangeLog = arrChangeLogs.InsertChild((iCntLogs - 1))
                    iCntLogs++
                    addChangeLog.AssignElem(elemLog);
                }
            }
        }
        arrHistory = docMainPerson.TopElem.history_states;
        arrHistoryDbl = DblDoc.TopElem.history_states;
        for (elemHist in arrHistoryDbl) {
            addHistory = arrHistory.AddChild();
            addHistory.id = elemHist.id;
            addHistory.state_id = elemHist.state_id;
            addHistory.start_date = elemHist.start_date;
            addHistory.finish_date = elemHist.finish_date;
            addHistory.comment = elemHist.comment;
        }
        Copy_Person_Values(teMainPerson, idDouble);
        save(docMainPerson);
        wLog(idMain, "", docMainPerson.TopElem, "", null, null);
    } catch (e) {
        wLog("", "history_states - " + e, null, null, null, null)
    }
}
// ----------------------------------groups-------------------------
function group(aData, idDouble, idMain) {
    try {
        var aGroup = ArrayOptFirstElem(aData) != undefined ? ArraySelectBySortedKey(aData, OptInt(idDouble), 'collaborator_id') : [];
        for (catGroup in aGroup) {
            docGroup = tools.open_doc(catGroup.group_id);
            if (docGroup == undefined) continue;
            teGroup = docGroup.TopElem;
            arrCollaborat = teGroup.collaborators;
            elemCollab = arrCollaborat.GetOptChildByKey(idDouble);
            if (elemCollab != undefined) {
                arrCollaborat.DeleteChildByKey(idDouble);
                save(docGroup);
                wLog(idMain, "", teGroup, '', null, null);
                newElemCollab = arrCollaborat.GetOptChildByKey(idMain);
                if (newElemCollab == undefined) {
                    addCollab = arrCollaborat.AddChild();
                    addCollab.collaborator_id = idMain;
                    save(docGroup);
                    wLog(idMain, "", teGroup, '', null, null);
                }
            }
        }
    } catch (e) {
        wLog("", "groups - " + e, null, null, null, null)
    }
}
// ---------------------------------- forum_entrys-----------------------
function forumEntrys(aData, idDouble, idMain, teMainPerson) {
    try {
        var aRes = ArrayOptFirstElem(aData) != undefined ? ArraySelectBySortedKey(aData, OptInt(idDouble), 'user_id') : [];
        for (catAcc in aRes) {
            doc = tools.open_doc(catAcc.id);
            if (doc == undefined) continue;
            doc.TopElem.user_id = idMain;
            doc.TopElem.person_fullname = teMainPerson.fullname;
            save(doc);
            wLog(idMain, "", doc.TopElem, '', null, null);
        }
    } catch (e) {
        wLog("", "forum_entrys - " + e, null, null, null, null)
    }
}
// ----------------------------------blogs-------------------------
function blogs(aData, idDouble, idMain) {
    try {
        var aRes = ArrayOptFirstElem(aData) != undefined ? ArraySelectBySortedKey(aData, OptInt(idDouble), 'creator_id') : [];
        for (obj in aRes) {
            var docObject = tools.open_doc(obj.id);
            if (docObject != undefined) {
                docObject.TopElem.creator_id = idMain;
                if (tools.common_filling('collaborator', docObject.TopElem, idMain)) {
                    save(docObject);
                    wLog(idDouble, "", docObject.TopElem, '', null, null)
                } else {
                    wLog(idDouble, "tools.common_filling_failed", docObject.TopElem, '', null, null)
                }
            }
        }
    } catch (e) {
        wLog("", "blogs - " + e, null, null, null, null)
    }
}
// ----------------------------------blogs_author-------------------------
function blogsAuthor(aData, idDouble, idMain, teMainPerson) {
    try {
        for (catElem in aData) {
            doc = tools.open_doc(catElem.id);
            if (doc == undefined) continue;
            teDoc = doc.TopElem;
            arrColls = teDoc.authors;
            elemCollab = arrColls.GetOptChildByKey(idDouble, 'person_id');
            if (elemCollab != undefined) {
                arrColls.DeleteChildByKey(idDouble);
                save(doc);
                newElemCollab = arrColls.GetOptChildByKey(idMain, 'person_id');
                if (newElemCollab == undefined) {
                    addCollab = arrColls.AddChild();
                    addCollab.person_id = teMainPerson.id;
                    addCollab.person_fullname = teMainPerson.fullname;
                    addCollab.person_org_id = teMainPerson.org_id;
                    addCollab.person_org_name = teMainPerson.org_name;
                    addCollab.person_code = teMainPerson.code;
                    save(doc);
                    wLog(idMain, "", teDoc, '', null, null);
                }
            }
        }
    } catch (e) {
        wLog("", "blogsAuthor - " + e, null, null, null, null)
    }
}
// ----------------------------------blogs_entrys-------------------------
function blogsEntrys(aData, idDouble, idMain) {
    try {
        var aRes = ArrayOptFirstElem(aData) != undefined ? ArraySelectBySortedKey(aData, OptInt(idDouble), 'person_id') : [];
        for (catElem in aRes) {
            InfoChanging(catElem, idMain);
        }
    } catch (e) {
        wLog("", "blogs_entrys - " + e, null, null, null, null)
    }
}
//-----------------------------------blog_entry_comments------------------
function blogsEntryComments(aData, idDouble, idMain, teMainPerson) {
    try {
        var aRes = ArrayOptFirstElem(aData) != undefined ? ArraySelectBySortedKey(aData, OptInt(idDouble), 'person_id') : [];
        for (catAcc in aRes) {
            doc = tools.open_doc(catAcc.id);
            if (doc == undefined) continue;
            doc.TopElem.person_id = idMain;
            doc.TopElem.person_fullname = teMainPerson.fullname;
            save(doc);
            wLog(idMain, "", doc.TopElem, '', null, null);
        }
    } catch (e) {
        wLog("", "blog_entry_comments - " + e, null, null, null, null)
    }
}
//-----------------------------------func_managers------------------
function funcManagers(aData, idDouble, idMain) {
    try {
        var aRes = ArrayOptFirstElem(aData) != undefined ? ArraySelectBySortedKey(aData, OptInt(idDouble), 'person_id') : [];
        for (catElem in aRes) {
            doc = tools.open_doc(catElem.object_id);
            if (doc == undefined) continue;
            teDoc = doc.TopElem;
            arrCollaborat = teDoc.func_managers;
            elemCollab = arrCollaborat.GetOptChildByKey(idDouble);
            if (elemCollab != undefined) {
                boss_type_id = elemCollab.boss_type_id.Value;
                arrCollaborat.DeleteChildByKey(idDouble);
                save(doc);
                newElemCollab = arrCollaborat.GetOptChildByKey(idMain);
                if (newElemCollab == undefined) {
                    teDoc.obtain_func_manager_by_id(idMain, boss_type_id)
                    save(doc);
                }
                wLog(idMain, "", teDoc, '', null, null);
            }
        }
    } catch (e) {
        wLog("", "forum_entrys - " + e, null, null, null, null)
    }
}

open_log();

write_log_text("Start. Агент для удаления дублей из персонала");

if (OBJECTS_ID_STR != '') {
    // подготовка условий для выбора сотрудников
    _select_xquery = _select_xquery + (_select_xquery != '' ? " and " : '') + ' MatchSome( $obj/id, (' + ArrayMerge(OBJECTS_ID_STR.split(";"), 'OptInt(This)', ',') + ') )';
}

sQuery = " for $obj in collaborators " + (_select_xquery == '' ? '' : ' where ' + _select_xquery) + " return $obj ";
write_log_text(sQuery);
var ArrayAllPersons = XQuery(sQuery)

write_log_text('Found ' + ArrayCount(ArrayAllPersons) + ' Persons');

var i = 0;
var strXQuery = '';
try {
    var ArrayDoubles = Array();
    var aCollDoubles = [];
    var aObjectDoubles = [];

    for (_col in ArraySelectAll(ArrayAllPersons)) {
        ArrayDoubles = [];
        //write_log_text(tools.object_to_text(aCollDoubles, 'json') + ' - ' + OptInt(_col.id.Value) + ' - ' + ArrayOptFindBySortedKey(aCollDoubles, OptInt(_col.id.Value), 'id'))

        if (ArrayOptFindBySortedKey(aCollDoubles, OptInt(_col.id.Value), 'id') != undefined) continue;

        _main_person_id = _col.id.Value;
        _main_doc = tools.open_doc(_main_person_id);
        if (_main_doc == undefined) {
            wLog(_main_person_id, "Карточка сотрудника не найдена", null, null, null, null);
            continue;
        }

        _main_obj = _main_doc.TopElem;

        aXQuery = [];
        for (_m_arr_eq_fields in _arr_eq_fields) {
            if (_m_arr_eq_fields == "" || _col.ChildExists(_m_arr_eq_fields) != true)
                continue;

            if (_col.Child(_m_arr_eq_fields).Value != '' && _col.Child(_m_arr_eq_fields).Value != null) {
                if (_m_arr_eq_fields != 'login' && _m_arr_eq_fields != 'email') {
                    if (_m_arr_eq_fields == 'birth_date' || _m_arr_eq_fields == 'hire_date') {
                        aXQuery.push("($obj/" + _m_arr_eq_fields + " = date('" + _col.Child(_m_arr_eq_fields).Value + "'))");

                    } else {
                        aXQuery.push("($obj/" + _m_arr_eq_fields + " = '" + _col.Child(_m_arr_eq_fields).Value + "')");

                    }
                } else if (_eq_accountname == "EMAIL" || _eq_accountname == "AD") {
                    _splitter = (_eq_accountname == "EMAIL" ? "@" : "\\");
                    _acc_name = String(_col.Child(_m_arr_eq_fields).Value).split(_splitter)[0] + _splitter;

                    aXQuery.push("contains($obj/" + _m_arr_eq_fields + ", '" + StrLowerCase(_acc_name) + "') " +
                        "or contains($obj/" + _m_arr_eq_fields + ", '" + StrUpperCase(_acc_name) + "') " +
                        "or contains($obj/" + _m_arr_eq_fields + ", '" + (_acc_name) + "')"
                    );
                } else {
                    aXQuery.push(
                        "($obj/" + _m_arr_eq_fields + " = '" + StrLowerCase(_col.Child(_m_arr_eq_fields).Value) + "'" +
                        " or $obj/" + _m_arr_eq_fields + " = '" + StrUpperCase(_col.Child(_m_arr_eq_fields).Value) + "'" +
                        " or $obj/" + _m_arr_eq_fields + " = '" + _col.Child(_m_arr_eq_fields).Value + "')"
                    );
                }
            }
        }

        for (_m_arr_eq_custom_fields in _arr_eq_custom_fields) {
            if (_m_arr_eq_custom_fields != "" && tools_web.is_true(_main_obj.custom_elems.ObtainChildByKey(_m_arr_eq_custom_fields).value)) {
                aXQuery.push("doc-contains($obj/id,'wt_data','[" + _m_arr_eq_custom_fields + "=" + _main_obj.custom_elems.ObtainChildByKey(_m_arr_eq_custom_fields).value + "]')");
            }
        }

        if (ArrayOptFirstElem(aXQuery) != undefined) {
            strXQuery = "for $obj in collaborators where " + ArrayMerge(aXQuery, 'This', ' and ') + " order by $obj/id return $obj/Fields('id')";
            ArrayDoubles = ArraySelectAll(XQuery(strXQuery));
        }

        if (ArrayCount(ArrayDoubles) > 1) {
            aObjectDoubles.push({
                d: ArrayDoubles,
                main_obj: _main_obj
            });
            aCollDoubles = ArraySelectDistinct(ArraySort(ArrayUnion(aCollDoubles, ArrayExtract(ArrayDoubles, "tools.read_object(\"{'id' : \" + OptInt(This.id) + \"}\")")), 'This.id', '+'), 'This.id');
        }
    }

    {
        write_log_text('Start of data collection');

        var xarrActiveLearns = [];
        var xarrLearnings = [];
        var xarrActiveTestLearns = [];
        var xarrTestLearns = [];
        var xarrResEvents = [];
        var xarrEventCollab = [];
        var xarrPas = [];
        var xarrDevPlans = [];
        var xarrAssessmPlans = [];
        var xarrExpPas = [];
        var xarrExpDevPlans = [];
        var xarrExpAssessmPlans = [];
        var xarrQualAssign = [];
        var xarrAccounts = [];
        var xarrTran = [];
        var xarrOrder = [];
        var xarrBasket = [];
        var xarrForum = [];
        var _xqRange = [];
        var xarrForumEntrys = [];
        var xarrBlogs = [];
        var xarrBlogsEntrys = [];
        var xarrBlogsEntrysComments = [];
        var xarrFuncManagers = [];
        var xarrFuncManagersPosition = [];
        var xarrPositions = [];

        var countRow = 0;
        while (true) {
            aCollDoublesTemp = ArrayRange(aCollDoubles, (5000 * countRow), 5000);
            if (ArrayOptFirstElem(aCollDoublesTemp) == undefined) break;

            sIDColl = ArrayMerge(aCollDoublesTemp, 'OptInt(This.id,0)', ',');

            if (_copy_learning == true) {
                xarrActiveLearns = ArrayUnion(
                    xarrActiveLearns,
                    ArraySelectAll(XQuery("for $learn in active_learnings where MatchSome( $learn/person_id, (" + sIDColl + ")) order by $learn/person_id return $learn/Fields('id', 'person_id')"))
                );
                xarrLearnings = ArrayUnion(
                    xarrLearnings,
                    ArraySelectAll(XQuery("for $learn in learnings where MatchSome($learn/person_id, (" + sIDColl + ")) order by $learn/person_id return $learn/Fields('id', 'person_id')"))
                );
                xarrActiveTestLearns = ArrayUnion(
                    xarrActiveTestLearns,
                    ArraySelectAll(XQuery("for $test_learn in active_test_learnings where MatchSome($test_learn/person_id, (" + sIDColl + ")) order by $test_learn/person_id return $test_learn/Fields('id', 'person_id')"))
                );
                xarrTestLearns = ArrayUnion(
                    xarrTestLearns,
                    ArraySelectAll(XQuery("for $test_learn in test_learnings where MatchSome($test_learn/person_id, (" + sIDColl + ")) order by $test_learn/person_id return $test_learn/Fields('id', 'person_id')"))
                );
                xarrResEvents = ArrayUnion(
                    xarrResEvents,
                    ArraySelectAll(XQuery("for $elem in event_results where MatchSome($elem/person_id, (" + sIDColl + ")) order by $elem/person_id return $elem/Fields('id', 'person_id')"))
                );
            }

            if (_delete_persons == true) {
                _xqRange = ArrayUnion(
                    _xqRange,
                    ArraySelectAll(XQuery("for $elem in group_collaborators where MatchSome($elem/collaborator_id, (" + sIDColl + ")) order by $elem/collaborator_id return $elem/Fields('group_id', 'collaborator_id')"))
                );
            }

            xarrEventCollab = ArrayUnion(
                xarrEventCollab,
                ArraySelectAll(XQuery("for $elem in event_collaborators where MatchSome($elem/collaborator_id, (" + sIDColl + ")) order by $elem/collaborator_id return $elem/Fields('event_id','is_collaborator','is_tutor','is_preparation','collaborator_id')"))
            );
            xarrPas = ArrayUnion(
                xarrPas,
                ArraySelectAll(XQuery("for $elem in pas where MatchSome($elem/person_id, (" + sIDColl + ")) order by $elem/person_id return $elem/Fields('id', 'person_id')"))
            );
            xarrDevPlans = ArrayUnion(
                xarrDevPlans,
                ArraySelectAll(XQuery("for $elem in development_plans where MatchSome($elem/person_id, (" + sIDColl + ")) order by $elem/person_id return $elem/Fields('id', 'person_id')"))
            );
            xarrAssessmPlans = ArrayUnion(
                xarrAssessmPlans,
                ArraySelectAll(XQuery("for $elem in assessment_plans where MatchSome($elem/person_id, (" + sIDColl + ")) order by $elem/person_id return $elem/Fields('id', 'person_id')"))
            );
            xarrExpPas = ArrayUnion(
                xarrExpPas,
                ArraySelectAll(XQuery("for $elem in pas where MatchSome($elem/expert_person_id, (" + sIDColl + ")) order by $elem/expert_person_id return $elem/Fields('id', 'expert_person_id')"))
            );
            xarrExpDevPlans = ArrayUnion(
                xarrExpDevPlans,
                ArraySelectAll(XQuery("for $elem in development_plans where MatchSome($elem/expert_person_id, (" + sIDColl + ")) order by $elem/expert_person_id return $elem/Fields('id', 'expert_person_id')"))
            );
            xarrExpAssessmPlans = ArrayUnion(
                xarrExpAssessmPlans,
                ArraySelectAll(XQuery("for $elem in assessment_plans where MatchSome($elem/expert_person_id, (" + sIDColl + ")) order by $elem/expert_person_id return $elem/Fields('id', 'expert_person_id')"))
            );
            xarrQualAssign = ArrayUnion(
                xarrQualAssign,
                ArraySelectAll(XQuery("for $elem in qualification_assignments where MatchSome($elem/person_id, (" + sIDColl + ")) order by $elem/person_id return $elem/Fields('id', 'person_id')"))
            );
            xarrAccounts = ArrayUnion(
                xarrAccounts,
                ArraySelectAll(XQuery("for $elem in accounts where MatchSome($elem/object_id, (" + sIDColl + ")) order by $elem/object_id return $elem/Fields('id', 'object_id')"))
            );
            xarrTran = ArrayUnion(
                xarrTran,
                ArraySelectAll(XQuery("for $elem in transactions where MatchSome($elem/person_id, (" + sIDColl + ")) order by $elem/person_id return $elem/Fields('id', 'person_id')"))
            );
            xarrOrder = ArrayUnion(
                xarrOrder,
                ArraySelectAll(XQuery("for $elem in orders where MatchSome($elem/person_id, (" + sIDColl + ")) order by $elem/person_id return $elem/Fields('id', 'person_id')"))
            );
            xarrBasket = ArrayUnion(
                xarrBasket,
                ArraySelectAll(XQuery("for $elem in baskets where MatchSome($elem/person_id, (" + sIDColl + ")) order by $elem/person_id return $elem/Fields('id', 'person_id')"))
            );
            xarrForum = ArrayUnion(
                xarrForum,
                ArraySelectAll(XQuery("for $elem in forums where MatchSome($elem/person_id, (" + sIDColl + ")) order by $elem/person_id return $elem/Fields('id', 'person_id')"))
            );

            xarrForumEntrys = ArrayUnion(
                xarrForumEntrys,
                ArraySelectAll(XQuery("for $elem in forum_entrys where MatchSome($elem/user_id, (" + sIDColl + ")) order by $elem/user_id return $elem/Fields('id', 'user_id')"))
            );

            xarrBlogs = ArrayUnion(
                xarrBlogs,
                ArraySelectAll(XQuery("for $elem in blogs where MatchSome($elem/creator_id, (" + sIDColl + ")) order by $elem/creator_id return $elem/Fields('id', 'creator_id')"))
            );

            xarrBlogsEntrys = ArrayUnion(
                xarrBlogsEntrys,
                ArraySelectAll(XQuery("for $elem in blog_entrys where MatchSome($elem/person_id, (" + sIDColl + ")) order by $elem/person_id return $elem/Fields('id', 'person_id')"))
            );

            xarrBlogsEntrysComments = ArrayUnion(
                xarrBlogsEntrysComments,
                ArraySelectAll(XQuery("for $elem in blog_entry_comments where MatchSome($elem/person_id, (" + sIDColl + ")) order by $elem/person_id return $elem/Fields('id', 'person_id')"))
            );

            xarrFuncManagers = ArrayUnion(
                xarrFuncManagers,
                ArraySelectAll(XQuery("for $elem in func_managers where MatchSome($elem/catalog, ('collaborator', 'group', 'subdivision', 'org')) and MatchSome($elem/person_id, (" + sIDColl + ")) return $elem/Fields('object_id', 'person_id')"))
            );

            xarrPositions = ArrayUnion(
                xarrPositions,
                ArraySelectAll(XQuery("for $position in positions where MatchSome($position/basic_collaborator_id, (" + sIDColl + ")) return $position/Fields('id','basic_collaborator_id')"))
            );
            countRow++;
        }

        xarrActiveLearns = ArraySort(xarrActiveLearns, 'OptInt(This.person_id)', '+');
        xarrLearnings = ArraySort(xarrLearnings, 'OptInt(This.person_id)', '+');
        xarrActiveTestLearns = ArraySort(xarrActiveTestLearns, 'OptInt(This.person_id)', '+');
        xarrTestLearns = ArraySort(xarrTestLearns, 'OptInt(This.person_id)', '+');
        xarrResEvents = ArraySort(xarrResEvents, 'OptInt(This.person_id)', '+');
        xarrEventCollab = ArraySort(xarrEventCollab, 'OptInt(This.collaborator_id)', '+');
        xarrPas = ArraySort(xarrPas, 'OptInt(This.person_id)', '+');
        xarrDevPlans = ArraySort(xarrDevPlans, 'OptInt(This.person_id)', '+');
        xarrAssessmPlans = ArraySort(xarrAssessmPlans, 'OptInt(This.person_id)', '+');
        xarrExpPas = ArraySort(xarrExpPas, 'OptInt(This.expert_person_id)', '+');
        xarrExpDevPlans = ArraySort(xarrExpDevPlans, 'OptInt(This.expert_person_id)', '+');
        xarrExpAssessmPlans = ArraySort(xarrExpAssessmPlans, 'OptInt(This.expert_person_id)', '+');
        xarrQualAssign = ArraySort(xarrQualAssign, 'OptInt(This.person_id)', '+');
        xarrAccounts = ArraySort(xarrAccounts, 'OptInt(This.object_id)', '+');
        xarrTran = ArraySort(xarrTran, 'OptInt(This.person_id)', '+');
        xarrOrder = ArraySort(xarrOrder, 'OptInt(This.person_id)', '+');
        xarrBasket = ArraySort(xarrBasket, 'OptInt(This.person_id)', '+');
        xarrForum = ArraySort(xarrForum, 'OptInt(This.person_id)', '+');
        _xqRaxnge = ArraySort(_xqRange, 'OptInt(This.collaborator_id)', '+');
        xarrForumEntrys = ArraySort(xarrForumEntrys, 'OptInt(This.user_id)', '+');
        xarrBlogs = ArraySort(xarrBlogs, 'OptInt(This.creator_id)', '+');
        xarrBlogsEntrys = ArraySort(xarrBlogsEntrys, 'OptInt(This.person_id)', '+');
        xarrBlogsEntrysComments = ArraySort(xarrBlogsEntrysComments, 'OptInt(This.person_id)', '+');
        xarrFuncManagers = ArraySort(xarrFuncManagers, 'OptInt(This.person_id)', '+');
        xarrPositions = ArraySort(xarrPositions, 'OptInt(This.basic_collaborator_id)', '+');

        var xarrAssessm = ArraySelectAll(XQuery("for $elem in assessment_appraises where $elem/status='0' and $elem/is_model=false() return $elem/Fields('id')"));
        var xarrForumModerator = ArraySelectAll(XQuery("for $elem in forums where $elem/closed = false() return $elem/Fields('id')"));
        var xarrBlogsAuthor = ArraySelectAll(XQuery("for $elem in blogs return $elem/Fields('id')"));

        write_log_text('Data collection is finished');
    }

    for (obj in aObjectDoubles) {
        i++;
        ArrayDoubles = obj.d;
        _main_obj = obj.main_obj;
        _main_person_id = _main_obj.id;

        //write_log_text(_main_obj.fullname + ', кол-во дублей - ' + ArrayCount(ArrayDoubles));

        curField = GetDotValue(_main_obj, _arr_main_field);

        for (_v_col in ArrayDoubles) {
            _v_doc = OpenDoc(UrlFromDocID(_v_col.id));
            _v_obj = _v_doc.TopElem;
            
            _v_date = GetDotValue(_v_obj, _arr_main_field);
            
            if (_main_flag == "nullfield" && (curField != "")) {
                if (String(_v_date) == "") {
                    _main_person_id = _v_col.id
                }
            }
            if (_main_flag == "solidfield" && (curField == "")) {
                if (String(_v_date) != "") {
                    _main_person_id = _v_col.id
                }
            }
            if (_main_flag == "maxdate") {
                if (_v_date > curField) {
                    _main_person_id = _v_col.id;
                    curField = _v_date;
                }
            }
            if (_main_flag == "mindate") {
                if (_v_date < curField) {
                    _main_person_id = _v_col.id;
                    curField = _v_date;
                }
            }
        }

        docMainPerson = tools.open_doc(_main_person_id);
        if (docMainPerson == undefined) {
            wLog(_main_person_id, "Карточка сотрудника не найдена", null, null, null, null);
            continue;
        }
        teMainPerson = docMainPerson.TopElem;

        // for (_dbl in ArrayDoubles) {
        //     if (_dbl.id != _main_person_id) { 
        //         DblDoc =tools.open_doc(_dbl.id);
                
        //         if (_copy_learning == true) {
        //             activeLearnings(xarrActiveLearns, _dbl.id, _main_person_id);
        //             learnings(xarrLearnings, _dbl.id, _main_person_id);
        //             activeTestLearnings(xarrActiveTestLearns, _dbl.id, _main_person_id);
        //             testLearnings(xarrTestLearns, _dbl.id, _main_person_id);
        //             eventsResult(xarrResEvents, _dbl.id, _main_person_id);
        //         }

        //         events(xarrEventCollab, _dbl.id, _main_person_id, teMainPerson);
        //         assessmentAppraises(xarrAssessm, _dbl.id, _main_person_id, teMainPerson);
        //         pas(xarrPas, xarrDevPlans, xarrAssessmPlans, _dbl.id, _main_person_id);
        //         pasExp(xarrExpPas, xarrExpDevPlans, xarrExpAssessmPlans, _dbl.id, _main_person_id);
        //         requests(_dbl.id, _main_person_id);
        //         qualificationAssignment(xarrQualAssign, _dbl.id, _main_person_id);
        //         account(xarrAccounts, _dbl.id, _main_person_id, teMainPerson);
        //         transaction(xarrTran, _dbl.id, _main_person_id);
        //         order(xarrOrder, _dbl.id, _main_person_id);
        //         basket(xarrBasket, _dbl.id, _main_person_id);
        //         forum(xarrForum, _dbl.id, _main_person_id);
        //         forumsModerator(xarrForumModerator, _dbl.id, _main_person_id);
        //         forumEntrys(xarrForumEntrys, _dbl.id, _main_person_id, teMainPerson);
        //         blogs(xarrBlogs, _dbl.id, _main_person_id);
        //         blogsAuthor(xarrBlogsAuthor, _dbl.id, _main_person_id, teMainPerson)
        //         blogsEntrys(xarrBlogsEntrys, _dbl.id, _main_person_id);
        //         blogsEntryComments(xarrBlogsEntrysComments, _dbl.id, _main_person_id, teMainPerson);
        //         funcManagers(xarrFuncManagers, _dbl.id, _main_person_id);

        //         if (MERGE_HISTORY_STATES) {
        //             mergeHistory(docMainPerson, DblDoc, teMainPerson, _dbl.id, _main_person_id)
        //         }

        //         Delete_positions(xarrPositions, _dbl.id, _main_person_id, DblDoc, teMainPerson);
        //         if (_delete_persons == true) {
        //             DeleteDoc(UrlFromDocID(_dbl.id));
        //             wLog(_main_person_id, "", "person", strXQuery, null, _dbl.id);
        //             group(_xqRange, _dbl.id, _main_person_id)
        //         } else {
        //             DblDoc = tools.open_doc(DblDoc.TopElem.id);
        //             DblDoc.TopElem.lastname = DblDoc.TopElem.lastname ;
        //             DblDoc.TopElem.firstname = DblDoc.TopElem.firstname ;
        //             DblDoc.TopElem.middlename = DblDoc.TopElem.middlename + ' (дубликат)';
        //             save(DblDoc);
        //         }
        //     }
        // }
    }
} catch (e) {
    wLog("", e, null, null, null, null)
}
write_log_text(" Agent_clear_doubles finished! Updated " + i + " records");
close_log();