// 7247400319036433188 - Агент назначения программ адаптации NEW

var logger = {
    isLog: true,
    logType: "report",
    logName: "7247400319036433188",
}

var libs = OpenCodeLib("x-local://source/gge/libs.js").getAllLibs;
var l = libs.log_lib;

var bProcessByHire = tools_web.is_true(Param.flag_hire);
var sProgramSearchType = "simple";

var bSengNotifiToUser = tools_web.is_true(Param.send_user);
var iUserNotificationType = OptInt(Param.user_template_id, 0);
var arrAdmins = [];

if (iUserNotificationType == 0)
    bSengNotifiToUser = false;

var bSengNotifiToBoss = tools_web.is_true(Param.send_manager);
var iBossNotificationType = OptInt(Param.manager_template_id, 0);
if (iBossNotificationType == 0)
    bSengNotifiToBoss = false;

var bSengNotifiToAdmin = tools_web.is_true(Param.send_admin);
var iAdminNotificationType = OptInt(Param.admin_template_id, 0);
if (iAdminNotificationType == 0)
    bSengNotifiToAdmin = false;
if (bSengNotifiToAdmin) {
    arrAdmins = ArraySelectAll(XQuery("for $obj in group_collaborators where $obj/group_id=" + 
        OptInt(Param.admin_group_id, 0) + " return $obj"));
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
    var bossTypeID = "6148914691236517290"; // Непосредственный руководитель
    // var subdivisionID = tools.get_doc_by_key("collaborator", "id", personID).TopElem.position_parent_id.Value;
    var xq = "for $e in func_managers where catalog = 'collaborator' and object_id = " + personID + 
        " and boss_type_id = " + bossTypeID + " return $e";
    return ArrayExtractKeys(XQuery(xq), "person_id");
}

try {
    l.open(logger);

    if (bProcessByHire) {
        dStartDate = Param.hire_start_date;
        if (String(dStartDate) == "") {
            dStartDate = tools.AdjustDate(Date(),(0-7));
        }
        iShiftDays = OptInt(Param.hire_days,0);
        var xq = "for $obj in collaborators where $obj/hire_date>=date('" + 
            StrDate(DateNewTime(Date(dStartDate))) + "') and $obj/hire_date<=date('" + 
            StrDate(DateNewTime(tools.AdjustDate(Date(),(0-iShiftDays)))) + "') " +
        " and $obj/is_dismiss=false() and contains($obj/fullname, 'Admin')=false() return $obj";
        xq = "for $elem in collaborators where $elem/hire_date>=date('" + 
            StrDate(DateNewTime(Date())) + "')"+
        " and $elem/is_dismiss=false() and contains($elem/fullname, 'Admin')=false() return $elem";
        arrCollaborators = XQuery(xq);
        // l.write(logger, xq)
        if (ArrayOptFirstElem(arrCollaborators) != undefined) {
            if (sProgramSearchType == "simple") {
                iAssignedTypicatDevProgram = OptInt(Param.hire_program_id);
                if (iAssignedTypicatDevProgram != undefined) {
                    teAssignedTypicatDevProgram = tools.open_doc(iAssignedTypicatDevProgram).TopElem;
                }
            }
            var arrBossIDs = [];
            var receiver_id;
            var fio = "";
            var receiver_io = "";
            for (itemCollab in arrCollaborators) {
                l.write(logger, itemCollab.fullname.Value + ", hire_date = " + itemCollab.hire_date.Value);
                if (iAssignedTypicatDevProgram != undefined) {
                    docCareerReserve = CreateProgram(itemCollab, iAssignedTypicatDevProgram, teAssignedTypicatDevProgram);
                    if (docCareerReserve != undefined) { 
                        if (bSengNotifiToUser) {
                            receiver_id = docCareerReserve.TopElem.person_id;
                            fio = docCareerReserve.TopElem.person_id.sd.fullname.Value;
                            receiver_io = fio.split(' ')[1] + " " + fio.split(' ')[2];
                            tools.create_notification(iUserNotificationType, receiver_id, receiver_io, docCareerReserve.DocID);
                        }
                        if (bSengNotifiToBoss) {
                            arrBossIDs = getBossIDs(RValue(docCareerReserve.TopElem.person_id));
                            for (bossID in arrBossIDs) {
                                receiver_id = bossID;
                                fio = tools.open_doc(bossID).TopElem.fullname.Value;
                                receiver_io = fio.split(' ')[1] + " " + fio.split(' ')[2];
                                tools.create_notification(iBossNotificationType, receiver_id, receiver_io, docCareerReserve.DocID);
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

    l.close(logger);
} catch (error) {
    logger.isLog = true;
    l.open(logger);
    l.write(logger, error);
    l.close(logger);
}
