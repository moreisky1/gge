// 7247400319036433188 - Агент назначения программ адаптации NEW

bProcessByHire = tools_web.is_true(Param.flag_hire);
sProgramSearchType = "simple";

bSengNotifiToUser = tools_web.is_true(Param.send_user);
iUserNotificationType = OptInt(Param.user_template_id,0);
if (iUserNotificationType == 0)
    bSengNotifiToUser = false;

bSengNotifiToBoss = tools_web.is_true(Param.send_manager);
iBossNotificationType = OptInt(Param.manager_template_id,0);
if (iBossNotificationType == 0)
    bSengNotifiToBoss = false;

bSengNotifiToAdmin = tools_web.is_true(Param.send_admin);
iAdminNotificationType = OptInt(Param.admin_template_id,0);
if (iAdminNotificationType == 0)
    bSengNotifiToAdmin = false;
if (bSengNotifiToAdmin) {
    arrAdmins = ArraySelectAll(XQuery("for $obj in group_collaborators where $obj/group_id=" + 
        OptInt(Param.admin_group_id,0) + " return $obj"));
    if (ArrayOptFirstElem(arrAdmins) == undefined)
        bSengNotifiToAdmin = false;
}

function CreateProgram(xmUserParam, iProgramID, teProgram) {
    xmResultCareerReserve = undefined;
    xmCareerReserveByUser = ArrayOptFirstElem(XQuery("for $obj in career_reserves where $obj/person_id=" + 
        xmUserParam.id + " and ($obj/status='active' or $obj/status='plan') return $obj"));
    
    if (xmCareerReserveByUser != undefined) {
        // alert("xmCareerReserveByUser.id = " + xmCareerReserveByUser.id);
        return xmResultCareerReserve;
    }
        
    xmResultCareerReserve = tools.new_doc_by_name("career_reserve");
    xmResultCareerReserve.BindToDb(DefaultDb);
    xmResultCareerReserve.TopElem.status = 'plan';
    xmResultCareerReserve.TopElem.person_id = xmUserParam.id;
    xmResultCareerReserve.TopElem.position_type = "adaptation";
    xmResultCareerReserve.TopElem.start_date = Date();
    if (ArrayCount(teProgram.tasks)>0) {
        xmResultCareerReserve.TopElem.plan_readiness_date = tools.AdjustDate(Date(), OptInt(ArrayMax(teProgram.tasks,"OptInt(This.due_date,0)").due_date,0));
    }
    xmResultCareerReserve.Save();

    try {
        xmResultCareerReserve.TopElem.assign_typical_program(iProgramID);
        xmResultCareerReserve.Save();
    }
    catch(e){}
    
    return xmResultCareerReserve;
}

function getBossIDs(personID) {
    var bossTypeID = "6870485814160724002"; // Функциональный
    var subdivisionID = tools.get_doc_by_key("collaborator", "id", personID).TopElem.position_parent_id.Value;
    var xq = "for $e in func_managers where catalog = 'subdivision' and object_id = " + subdivisionID + 
        " and boss_type_id = " + bossTypeID + " return $e";
    return ArrayExtractKeys(XQuery(xq), "person_id");
}

if (bProcessByHire) {
    dStartDate = Param.hire_start_date;
    if (String(dStartDate) == "") {
        dStartDate = tools.AdjustDate(Date(),(0-7));
    }
    iShiftDays = OptInt(Param.hire_days,0);

    arrCollaborators = XQuery("for $obj in collaborators where $obj/hire_date>=date('" + 
        StrDate(DateNewTime(Date(dStartDate))) + "') and $obj/hire_date<=date('" + 
        StrDate(DateNewTime(tools.AdjustDate(Date(),(0-iShiftDays)))) + "') " +
    " and $obj/is_dismiss=false() and contains($obj/fullname, 'Admin')=false() return $obj");

    if (ArrayOptFirstElem(arrCollaborators) != undefined) {
        if (sProgramSearchType == "simple") {
            iAssignedTypicatDevProgram = OptInt(Param.hire_program_id);
            if (iAssignedTypicatDevProgram != undefined) {
                teAssignedTypicatDevProgram = tools.open_doc(iAssignedTypicatDevProgram).TopElem;
            }
        }
        var arrBossIDs = [];
        var fio = "";
        for (itemCollab in arrCollaborators) {
            if (iAssignedTypicatDevProgram != undefined) {
                docCareerReserve = CreateProgram(itemCollab, iAssignedTypicatDevProgram, teAssignedTypicatDevProgram);
                if (docCareerReserve != undefined) {
                    tePerson = tools.open_doc(docCareerReserve.TopElem.person_id).TopElem;
                    fio = RValue(tePerson.fullname);
                    if (bSengNotifiToUser)
                        tools.create_notification(iUserNotificationType, docCareerReserve.TopElem.person_id, fio, docCareerReserve.DocID);
                    if (bSengNotifiToBoss) {
                        arrBossIDs = getBossIDs(RValue(docCareerReserve.TopElem.person_id));
                        for (bossID in arrBossIDs) {
                            tools.create_notification(iBossNotificationType, bossID, fio, docCareerReserve.DocID);
                        }
                    }
                    if (bSengNotifiToAdmin) {
                        for (itemPerson in arrAdmins)
                            tools.create_notification(iAdminNotificationType,itemPerson.collaborator_id,"",docCareerReserve.DocID);
                    }
                }
            }
        }
    }
}
