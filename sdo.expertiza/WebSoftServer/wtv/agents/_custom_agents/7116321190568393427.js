// 7116321190568393427 - Интеграция с 1С Состояния

var logger = {
    isLog: true,
    logType: "report",
    logName: "7116321190568393427",
}

var libs = OpenCodeLib("x-local://source/gge/libs.js").getAllLibs;
var l = libs.log_lib;

function newQualification(code, name) {
    doc = tools.new_doc_by_name("qualification", false);
    doc.BindToDb(DefaultDb);
    doc.TopElem.role_id.ObtainByValue(qual_role_id);
    doc.TopElem.code = code;
    doc.TopElem.name = name;            
    doc.Save();
    return doc;
}

function newQA(person_id, qualification_id, e) {
    doc = tools.new_doc_by_name("qualification_assignment", false);
    doc.BindToDb(DefaultDb);
    doc.TopElem.person_id = OptInt(person_id);
    tools.common_filling( "collaborator", doc.TopElem, OptInt(person_id));
    doc.TopElem.qualification_id = OptInt(qualification_id);
    doc.TopElem.assignment_date = OptDate(e.flStartDate);
    doc.TopElem.expiration_date = OptDate(e.flFinishDate);
    doc.TopElem.custom_elems.ObtainChildByKey("reestr14").value = String(e.flCertificateNumber);
    doc.Save();
    return doc;
}

try {
l.open(logger);

var sApiLogin = Param.GetOptProperty("sApiLogin");
var sApiPassword = Param.GetOptProperty("sApiPassword");
var sUrlGetState = Param.GetOptProperty("sUrlGetState");
var sUrlGetWordDataD = Param.GetOptProperty("sUrlGetWordDataD");
var aHeaders = [];
aHeaders.push("Content-type: application/json");
aHeaders.push("Authorization: Basic " + Base64Encode(sApiLogin + ":" + sApiPassword));
var sHeaders = ArrayMerge(aHeaders, "This", "\n");
var obj = {};
var foundQual;
var foundCol;
var xq = "";
var qual_role_id = 7460160118839931985; // new
var isOk = true;

// Состояния
// var oDirections = HttpRequest(sUrlGetState, "GET", "", sHeaders);
// if (oDirections.RespCode == 200) { 
//     obj = tools.read_object(oDirections.Body);
//     l.write(logger, "Состояния");
//     l.write(logger, oDirections.Body);
// }

// Сотрудники
var oWordDataD = HttpRequest(sUrlGetWordDataD, "GET", "", sHeaders);
if (oWordDataD.RespCode == 200) {
    obj = tools.read_object(oWordDataD.Body);
    // l.write(logger, 'e.flGuid + " - " + e.fl + " - " + e.flExpertDirectionID + " - " + e.flStartDate + " - " + e.flFinishDate + " - " + e.flCertificateNumber');
    l.write(logger, "Сотрудники");
    l.write(logger, oWordDataD.Body);
    // for (e in obj.ExpertsData) {
    //     isOk = true;
    //     xq = "for $elem in collaborators where code = '" + e.flGuid + "' return $elem";
    //     foundCol = ArrayOptFirstElem(XQuery(xq));
    //     xq = "for $elem in qualifications where $elem/code = '" + e.flExpertDirectionID + "' and MatchSome($elem/role_id, (" + qual_role_id + ")) return $elem";
    //     foundQual = ArrayOptFirstElem(XQuery(xq));
    //     if (foundCol == undefined) {
    //         l.write(logger, "foundCol == undefined; e.flGuid = " + e.flGuid);
    //         isOk = false;
    //     } 
    //     if (foundQual == undefined) {
    //         l.write(logger, "foundQual == undefined; e.flExpertDirectionID = " + e.flExpertDirectionID);
    //         isOk = false;
    //     }
    //     if (isOk) {
    //         try {
    //             newQA(foundCol.id, foundQual.id, e);
    //             // l.write(logger, "OK - " + e.flExpertDirectionID);
    //         } catch (err) {
    //             l.write(logger, "err = " + err);
    //             continue;
    //         }
    //     }
        //l.write(logger, e.flGuid + " - " + e.fl + " - " + e.flExpertDirectionID + " - " + e.flStartDate + " - " + e.flFinishDate + " - " + e.flCertificateNumber);
    // }
}

// l.write(logger, msg);
l.close(logger);
} catch (error) {
l.write(logger, "error");
l.write(logger, error);
l.close(logger);
}