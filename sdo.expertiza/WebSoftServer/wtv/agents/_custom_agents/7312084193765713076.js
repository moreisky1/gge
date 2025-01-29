//Переменные

sUrlGetWordData = Param.GetOptProperty("sUrlGetWordData");
sUrlGetDeps = Param.GetOptProperty("sUrlGetDeps");
sApiLogin = Param.GetOptProperty("sApiLogin");
sApiPassword = Param.GetOptProperty("sApiPassword");

iOrgId = OptInt(Param.GetOptProperty("iOrgId"));
iBossType = OptInt(Param.GetOptProperty("iBossType"));
iSubdivBossType = OptInt(Param.GetOptProperty("iSubdivBossType"));
iNoDismissGroup = OptInt(Param.GetOptProperty("iNoDismissGroup"));

arrNoDismiss = ArraySelectAll(XQuery("for $elem in group_collaborators where $elem/group_id = " + iNoDismissGroup + " return $elem"));

sLogName = "data_import_from_1c";
EnableLog(sLogName, true);


hreq = tools.get_object_assembly('HttpRequest');

aHeaders = [];
aHeaders.push("Content-type: application/json");
aHeaders.push("Authorization: Basic " + Base64Encode(sApiLogin + ":" + sApiPassword));

LogEvent(sLogName, "Authorization: Basic " + Base64Encode(sApiLogin + ":" + sApiPassword));
//Функции

function UpdateSubdivision(code, name, parent_code, create_date, disband_date) {

    var bStop = false;
    var oRes = new Object;
    oRes.message = '';
    oRes.result = false;


    sCode = Trim(code);
    if (sCode == "") {
        oRes.message += "Subdivision code is empty\n";
        oRes.result = false;
        bStop = true;
    }

    sName = Trim(name);
    if (sName == "") {
        oRes.message += "Subdivision name is empty\n";
        bStop = true;
    }
    sParentCode = Trim(parent_code);
    if (sParentCode == '00000000-0000-0000-0000-000000000000') {
        sParentCode = '';
    }
    dCreateDate = OptDate(create_date);
    dDisbandDate = OptDate(disband_date);

    aSubs = ArraySelectAll(tools.xquery("for $elem in subdivisions where $elem/code = '" + sCode + "' return $elem"));
    if (ArrayCount(aSubs) > 1) {
        oRes.message += "Found several subdivisions with code " + sCode + "\n";
        bStop = true;
    } else if (ArrayCount(aSubs) == 1) {
        oDocSub = tools.open_doc(ArrayOptFirstElem(aSubs).id);
        if (oDocSub == undefined) {
            oRes.message += "Error open subdivision with code " + sCode + "\n";
            bStop = true;
        }
    } else {
        oDocSub = OpenNewDoc("x-local://wtv/wtv_subdivision.xmd");
        oDocSub.BindToDb(DefaultDb);
        oDocSub.TopElem.code = sCode;
    }


    if (!bStop) {
        oDocSub.TopElem.name = sName;
        oDocSub.TopElem.org_id = iOrgId;
        if (sParentCode != '') {
            arrCatParentSub = ArraySelectAll(tools.xquery("for $elem in subdivisions where $elem/code = '" + sParentCode + "' return $elem"));
            if (ArrayCount(arrCatParentSub) == 1) {
                oCatParentSub = ArrayOptFirstElem(arrCatParentSub);
                oDocSub.TopElem.parent_object_id = oCatParentSub.id;
            } else if (ArrayCount(arrCatParentSub) > 1) {
                oRes.message += "Found several parent subdivisions with code " + sParentCode + ' for subdovosion with code ' + sCode + "\n";
            } else {
                oRes.message += 'Not found parent subdivision with code ' + sParentCode + ' for subdovosion with code ' + sCode + "\n";
            }
        }
        if (dCreateDate != undefined) {
            oDocSub.TopElem.formed_date = dCreateDate;
        }
        if (dDisbandDate != undefined) {
            oDocSub.TopElem.disbanded_date = dDisbandDate;
        } else {
            oDocSub.TopElem.disbanded_date = '';
        }
        if (dDisbandDate != undefined && dDisbandDate < Date()) {
            oDocSub.TopElem.is_disbanded = true;
        } else {
            oDocSub.TopElem.is_disbanded = false;
        }
        oDocSub.Save();

        oRes.message += 'Successful';
        oRes.result = true;
    }

    return oRes;
}

function updateState(oDocColl, state_index) {
    var history_states = oDocColl.TopElem.history_states;
    var lastState;
    var curState = ArrayOptFind(lists.person_states, "This.id=='" + state_index + "'");
    if (curState != undefined) {
        if (ArrayCount(history_states) != 0) {
            lastState = history_states[ArrayCount(history_states) - 1];
            if (OptInt(curState.id) != OptInt(lastState.state_id)) {
                lastState.finish_date = Date(StrDate(Date(), false, false));
                if (OptInt(state_index) != 0) {
                    newState = oDocColl.TopElem.history_states.AddChild();
                    newState.state_id = curState.id;
                    newState.start_date = Date(StrDate(Date(), false, false));
                }
            }
        } else {
            if (OptInt(state_index) != 0) {
                newState = oDocColl.TopElem.history_states.AddChild();
                newState.state_id = curState.id;
                newState.start_date = Date(StrDate(Date(), false, false));
            }
        }
    }
    return oDocColl;
}

function UpdatePerson(code, lastname, firstname, middlename, sex, birth_date, hire_date, dismiss_date, email, login, position_name, manager_id, subdivision_code, telephone_number, state_index) {
    var bStop = false;
    var oRes = new Object;
    oRes.message = '';
    oRes.result = false;

    sCode = Trim(code);
    if (sCode == "") {
        oRes.message += "Collaborator code is empty\n";
        bStop = true;
    }


    if (iBossType == undefined) {
        iBossType = 6148914691236517290;
    }

    sLastName = Trim(lastname);
    sFirstName = Trim(firstname);
    sMiddleName = Trim(middlename);
    sSex = Trim(sex);

    if (sSex == 'w' || sSex == 'woman' || sSex == '1') {
        sSex = "w";
    } else if (sSex == "m" || sSex == "man" || sSex == '0') {
        sSex = "m";
    } else {
        sSex = null;
    }

    dBirthDate = OptDate(birth_date);
    if (dBirthDate == undefined) {
        dBirthDate = null;
    }

    dHireDate = OptDate(hire_date);
    if (dHireDate == undefined) {
        dHireDate = null;
    }
    dDismissDate = OptDate(dismiss_date);
    if (dDismissDate == undefined) {
        dDismissDate = null;
    }
    sLogin = 'expertiza\\' + Trim(login);
    sEmail = Trim(email);

    aCatCollaborators = ArraySelectAll(tools.xquery("for $elem in collaborators where $elem/code = '" + sCode + "' return $elem"));
    if (ArrayCount(aCatCollaborators) > 1) {
        oRes.message += "Found several collaborators with code " + sCode + "\n";
        bStop = true;
    } else if (ArrayCount(aCatCollaborators) == 1) {
        oDocColl = tools.open_doc(ArrayOptFirstElem(aCatCollaborators).id);
        if (oDocColl == undefined) {
            oRes.message += "Error open collaborator with code " + sCode + "\n";
            bStop = true;
        }
    } else {
        oDocColl = OpenNewDoc("x-local://wtv/wtv_collaborator.xmd");
        oDocColl.BindToDb(DefaultDb);
        oDocColl.TopElem.code = sCode;
    }


    aCatPositions = ArraySelectAll(tools.xquery("for $elem in positions where $elem/code = '" + sCode + "' return $elem"));
    if (ArrayCount(aCatPositions) > 1) {
        oRes.message += "Found several positions with code " + sCode + "\n";
        bStop = true;
    } else if (ArrayCount(aCatPositions) == 1) {
        oDocPos = tools.open_doc(ArrayOptFirstElem(aCatPositions).id);
        if (oDocPos == undefined) {
            oRes.message += "Error open position with code " + sCode + "\n";
            bStop = true;
        }
    } else {
        oDocPos = OpenNewDoc("x-local://wtv/wtv_position.xmd");
        oDocPos.BindToDb(DefaultDb);
        oDocPos.TopElem.code = sCode;
    }


    sPositionName = Trim(position_name);
    sSubdivisionCode = Trim(subdivision_code);


    if (sSubdivisionCode != "") {
        aCatSubdivisions = ArraySelectAll(tools.xquery("for $elem in subdivisions where $elem/code = '" + sSubdivisionCode + "' return $elem"));
        if (ArrayCount(aCatSubdivisions) > 1) {
            oRes.message += "Found several subdivisions with code " + sSubdivisionCode + "\n";
            bStop = true;
        } else if (ArrayCount(aCatSubdivisions) == 1) {
            oDocSub = tools.open_doc(ArrayOptFirstElem(aCatSubdivisions).id);
            if (oDocSub == undefined) {
                oRes.message += "Error open subdivision with code " + sSubdivisionCode + "\n";
                bStop = true;
            } else {
                iSubId = oDocSub.DocID;
                sSubName = oDocSub.TopElem.name;
                iSubOrgId = oDocSub.TopElem.org_id;
                iParentSubId = oDocSub.TopElem.parent_object_id;
            }
        } else {
            bStop = true;
            oRes.message += "Subdivision with code " + sSubdivisionCode + " for user with code " + sCode + " (" + sLastName + " " + sFirstName + " " + sMiddleName + ") not found\n";
        }
    } else {
        bStop = true;
        oRes.message += "Subdivision code is empty\n";
    }

    sManagerId = Trim(manager_id);

    //if(sManagerId == ""){
    //	LogEvent(sLogName,"Для пользователя " + sLastName + " " + sFirstName + " " + sMiddleName + " с кодом " + sCode + " не указан руководитель (поле chiefGuid)");	
    //}

    if (!bStop) {
        oDocColl.TopElem.lastname = sLastName;
        oDocColl.TopElem.firstname = sFirstName;
        oDocColl.TopElem.middlename = sMiddleName;
        oDocColl.TopElem.login = sLogin;
        oDocColl.TopElem.email = sEmail;
        oDocColl.TopElem.sex = sSex;
        oDocColl.TopElem.birth_date = dBirthDate;
        oDocColl.TopElem.hire_date = dHireDate;
        oDocColl.TopElem.dismiss_date = dDismissDate;
        oDocColl.TopElem.last_import_date = Date();
        oDocColl = updateState(oDocColl, state_index);
        if (dDismissDate != null && dDismissDate < Date()) {
            oDocColl.TopElem.is_dismiss = true;
            oDocColl.TopElem.access.web_banned = true;
        } else {
            oDocColl.TopElem.is_dismiss = false;
            oDocColl.TopElem.access.web_banned = false;
            oDocColl.TopElem.custom_elems.ObtainChildByKey("use_or_not").value = 1;
        }

        aFuncManagerDelete = ArraySelect(oDocColl.TopElem.func_managers, "This.boss_type_id==iBossType");
        for (oFuncManagerDelete in aFuncManagerDelete) {
            oDocColl.TopElem.func_managers.DeleteChildByKey(oFuncManagerDelete.PrimaryKey)
        }

        if (sManagerId == sCode || sManagerId == "") {

            if (sManagerId == sCode) {
                oDocSub.TopElem.func_managers.ObtainChildByKey(oDocColl.DocID).person_fullname = oDocColl.TopElem.lastname + " " + oDocColl.TopElem.firstname + " " + oDocColl.TopElem.middlename;
                oDocSub.TopElem.func_managers.ObtainChildByKey(oDocColl.DocID).person_position_name = oDocColl.TopElem.position_name;
                oDocSub.TopElem.func_managers.ObtainChildByKey(oDocColl.DocID).person_org_name = oDocColl.TopElem.org_name;
                oDocSub.TopElem.func_managers.ObtainChildByKey(oDocColl.DocID).person_subdivision_name = oDocColl.TopElem.position_parent_name;
                oDocSub.TopElem.func_managers.ObtainChildByKey(oDocColl.DocID).person_code = oDocColl.TopElem.code;
                oDocSub.TopElem.func_managers.ObtainChildByKey(oDocColl.DocID).is_native = true;
                oDocSub.TopElem.func_managers.ObtainChildByKey(oDocColl.DocID).boss_type_id = iSubdivBossType;
                oDocSub.Save();
            }

            oCatParentSubdivision = ArrayOptFirstElem(tools.xquery("for $elem in subdivisions where $elem/id = " + iParentSubId + " return $elem"));

            if (oCatParentSubdivision != undefined) {

                arrParentManagers = ArraySelect(aColls, "This.depGuid == oCatParentSubdivision.code && This.chiefGuid == This.flGuid");

                if (ArrayCount(arrParentManagers) > 1) {
                    LogEvent(sLogName, "Больше одного руководителя у " + sCode + " --- " + ArrayCount(arrParentManagers));
                }

                oParentManager = ArrayOptFirstElem(arrParentManagers);
                if (oParentManager != undefined) {
                    sManagerId = oParentManager.flGuid;
                } else {
                    sManagerId = undefined;
                }
            } else {
                sManagerId = undefined;
            }

            if (sManagerId == undefined && sHeadManagerCode != undefined && sCode != sHeadManagerCode) {
                if (oCatParentSubdivision == undefined || Trim(oCatParentSubdivision.name) == 'Центральный аппарат') {
                    sManagerId = sHeadManagerCode;
                }
            }

        }

        if (sManagerId != '' && sManagerId != undefined) {
            oCatFuncManager = ArrayOptFirstElem(tools.xquery("for $elem in collaborators where $elem/code = '" + sManagerId + "' return $elem"));
            if (oCatFuncManager != undefined) {
                oDocColl.TopElem.func_managers.ObtainChildByKey(oCatFuncManager.id).person_fullname = oCatFuncManager.fullname;
                oDocColl.TopElem.func_managers.ObtainChildByKey(oCatFuncManager.id).person_position_name = oCatFuncManager.position_name;
                oDocColl.TopElem.func_managers.ObtainChildByKey(oCatFuncManager.id).person_org_name = oCatFuncManager.org_name;
                oDocColl.TopElem.func_managers.ObtainChildByKey(oCatFuncManager.id).person_subdivision_name = oCatFuncManager.position_parent_name;
                oDocColl.TopElem.func_managers.ObtainChildByKey(oCatFuncManager.id).person_code = oCatFuncManager.code;
                oDocColl.TopElem.func_managers.ObtainChildByKey(oCatFuncManager.id).is_native = true;
                oDocColl.TopElem.func_managers.ObtainChildByKey(oCatFuncManager.id).boss_type_id = iBossType;
            }

        } else {
            LogEvent(sLogName, "Для пользователя " + sLastName + " " + sFirstName + " " + sMiddleName + " с кодом " + sCode + " не указан руководитель (поле chiefGuid). Руководитель родительского подразделения не найден.");
        }

        oDocPos.TopElem.name = sPositionName;
        oDocPos.TopElem.basic_collaborator_id = oDocColl.DocID;


        oDocPos.TopElem.parent_object_id = iSubId;
        oDocPos.TopElem.org_id = iSubOrgId;
        oDocPos.Save();

        oDocColl.TopElem.position_id = oDocPos.DocID;
        oDocColl.TopElem.position_name = oDocPos.TopElem.name;
        oDocColl.TopElem.position_parent_id = iSubId;
        oDocColl.TopElem.position_parent_name = sSubName;
        oDocColl.TopElem.org_id = iSubOrgId;
        oCatOrg = ArrayOptFirstElem(tools.xquery("for $elem in orgs where $elem/id = " + iSubOrgId + " return $elem"));
        if (oCatOrg != undefined) {
            oDocColl.TopElem.org_name = oCatOrg.name;
        }

        oDocColl.Save();
        oDocPos.Save();

        oRes.message += 'Successful';
        oRes.result = true;
    }

    return oRes;
}

//Агент


try {
LogEvent(sLogName, "Запуск импорта данных из 1С.");
LogEvent(sLogName, "Отправка запроса на получение данных по подразделениям на url = " + sUrlGetDeps);


oGetDepsResponse = HttpRequest(sUrlGetDeps, "get", "", ArrayMerge(aHeaders, "This", "\n"));


sHeadManagerCode = undefined;
sHeadManagerSubSubdivCode = undefined;

if (oGetDepsResponse.RespCode == 200) {
    //LogEvent(sLogName,"Данные получены: " + oGetDepsResponse.Body);
    i = 0;
    aDeps = ArraySelectAll(tools.read_object(oGetDepsResponse.Body));
    LogEvent(sLogName, "Данные получены (" + ArrayCount(aDeps) + "), обработка...");

    oHeadManagerSubdiv = ArrayOptFind(aDeps, "Trim(This.depName) == 'Центральный аппарат'");
    if (oHeadManagerSubdiv != undefined) {
        oHeadManagerSubSubdiv = ArrayOptFind(aDeps, "Trim(This.depGuidParent) == oHeadManagerSubdiv.depGuid && Trim(This.depName) == 'Руководство'");
        if (oHeadManagerSubSubdiv != undefined) {
            sHeadManagerSubSubdivCode = oHeadManagerSubSubdiv.depGuid;
        }
    }
    LogEvent(sLogName, "Код руководящего подразделения: " + sHeadManagerSubSubdivCode);

    for (oDep in aDeps) {
        oRes = UpdateSubdivision(oDep.depGuid, oDep.depName, oDep.depGuidParent, oDep.depCreateDate, oDep.depDismissDate);
        if (!oRes.result) {
            LogEvent(sLogName, "Ошибка при обновление подразделения: " + oRes.message);
        } else {
            i++;
        }
        if (oRes.message != 'Successful') {
            LogEvent(sLogName, "Info: " + oRes.message);
        }

    }

    LogEvent(sLogName, "Обработка завершена, обработано " + i + " подразделений.");
} else {
    LogEvent(sLogName, "Ошибка при получение данных по подразделениям. Код ответа: " + oGetDepsResponse.RespCode);
}

LogEvent(sLogName, "Отправка запроса на получение данных по сотрудникам на url = " + sUrlGetWordData);

//oGetCollsResponse = hreq.Open( sUrlGetWordData, "get", "", ArrayMerge(aHeaders, "This", "\n"));
oGetCollsResponse = HttpRequest(sUrlGetWordData, "get", "", ArrayMerge(aHeaders, "This", "\n"));

if (oGetCollsResponse.RespCode == 200) {
    i = 0;
    //LogEvent(sLogName,"Данные получены: " + oGetCollsResponse.Body);

    aColls = ArraySelectAll(tools.read_object(oGetCollsResponse.Body));

    LogEvent(sLogName, "Данные получены (" + ArrayCount(aColls) + "), обработка...");

    LogEvent(sLogName, "Установка отметки для увольнения активным сотрудникам");

    arrActiveCollaborators = XQuery("for $elem in collaborators where $elem/is_dismiss = false() return $elem");

    i_use_or_not = 0;

    for (oCatActiveCollaborator in arrActiveCollaborators) {
        oDocActiveCollaborator = tools.open_doc(oCatActiveCollaborator.id);
        if (oDocActiveCollaborator != undefined) {
            oDocActiveCollaborator.TopElem.custom_elems.ObtainChildByKey("use_or_not").value = 0;
            oDocActiveCollaborator.Save();
            i_use_or_not++;
        }
    }

    LogEvent(sLogName, "Отметка выставлена " + i_use_or_not + " сотрудникам");

    if (sHeadManagerSubSubdivCode != undefined) {
        oHeadManager = ArrayOptFind(aColls, "Trim(This.depGuid) == sHeadManagerSubSubdivCode && This.flGuid == This.chiefGuid");
        if (oHeadManager != undefined) {
            sHeadManagerCode = oHeadManager.flGuid;
        }
    }

    LogEvent(sLogName, "Код главного руководителя: " + sHeadManagerCode);
    for (oColl in aColls) {

        oRes = UpdatePerson(oColl.flGuid, oColl.flSurname, oColl.flName, oColl.flPatr, oColl.flGender, oColl.flBirthDate, oColl.fladDate, oColl.fldisDate, oColl.mail, oColl.samaccountname, oColl.posName, oColl.chiefGuid, oColl.depGuid, oColl.telephoneNumber, oColl.flStateIndex);
        if (!oRes.result) {
            LogEvent(sLogName, "Ошибка при обновление сотрудника: " + oRes.message);
        } else {
            i++;
        }
        if (oRes.message != 'Successful') {
            LogEvent(sLogName, "Info: " + oRes.message);
        }
    }
    LogEvent(sLogName, "Обработка завершена, обработано " + i + " сотрудников.");

    LogEvent(sLogName, "Увольнение сотрудников");

    arrActiveCollaborators = XQuery("for $elem in collaborators where $elem/is_dismiss = false() return $elem");


    i_dismiss = 0;

    for (oCatActiveCollaborator in arrActiveCollaborators) {
        if (ArrayOptFind(arrNoDismiss, "This.collaborator_id == oCatActiveCollaborator.id") == undefined) {
            oDocActiveCollaborator = tools.open_doc(oCatActiveCollaborator.id);
            if (oDocActiveCollaborator != undefined && OptInt(oDocActiveCollaborator.TopElem.custom_elems.ObtainChildByKey("use_or_not").value) == 0) {
                oDocActiveCollaborator.TopElem.is_dismiss = true;
                oDocActiveCollaborator.TopElem.access.web_banned = true;
                if (oDocActiveCollaborator.TopElem.dismiss_date == null || oDocActiveCollaborator.TopElem.dismiss_date == undefined) {
                    oDocActiveCollaborator.TopElem.dismiss_date = Date();
                }

                //arrSubsFuncManagerDelete = XQuery("for $elem in func_managers where $elem/catalog = 'subdivision' and $elem/person_id =  " + oCatActiveCollaborator.id + " return $elem");

                //for(oCatSubFuncManagerDelete in arrSubsFuncManagerDelete){
                //	oDocSubFuncManagerDelete = tools.open_doc(oCatSubFuncManagerDelete.object_id);
                //	if(oDocSubFuncManagerDelete != undefined){
                //		oDocSubFuncManagerDelete.TopElem.func_managers.DeleteChildByKey(oCatActiveCollaborator.id, 'person_id');
                //		oDocSubFuncManagerDelete.Save();
                //	}
                //}

                LogEvent(sLogName, "Уволен " + oCatActiveCollaborator.fullname + " - " + oCatActiveCollaborator.code);

                oDocActiveCollaborator.Save();
                i_dismiss++;
            }
        }
    }

    LogEvent(sLogName, "Уволено " + i_dismiss + " сотрудников");


} else {
    LogEvent(sLogName, "Ошибка при получение данных по сотрудникам. Код ответа: " + oGetCollsResponse.RespCode);
}

LogEvent(sLogName, "Снятие уволенных сотрудников с руководства подразделениями");

arrDismissFuncManagers = XQuery("for $fm in func_managers, $coll in collaborators where $coll/is_dismiss = true() and $fm/person_id = $coll/id and $fm/catalog = 'subdivision' return $fm");

for (oDismissFuncManager in arrDismissFuncManagers) {
    oDocSubdivision = tools.open_doc(oDismissFuncManager.object_id);
    if (oDocSubdivision != undefined) {
        oDocSubdivision.TopElem.func_managers.DeleteChildByKey(oDismissFuncManager.person_id, 'person_id');
        oDocSubdivision.Save();
        LogEvent(sLogName, "Пользователь " + oDismissFuncManager.person_fullname + " удалён из руководителей подразделения " + oDismissFuncManager.object_name);
    }

}

LogEvent(sLogName, "Агент импорта завершён");

} catch (err) {
    LogEvent(sLogName, "err - " + err);
}