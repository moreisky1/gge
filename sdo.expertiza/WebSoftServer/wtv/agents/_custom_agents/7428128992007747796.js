// 7428128992007747796 - Интеграция с 1С Аттестация

var logger = {
    isLog: true,
    logType: "report",
    logName: "7428128992007747796",
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
var sUrlGetExpertsData = Param.GetOptProperty("sUrlGetExpertsData");
var sUrlGetExpertsDirections = Param.GetOptProperty("sUrlGetExpertsDirections");
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

// Направления qualification
var oDirections = HttpRequest(sUrlGetExpertsDirections, "GET", "", sHeaders);
if (oDirections.RespCode == 200) { 
    obj = tools.read_object(oDirections.Body);
    // l.write(logger, 'e.flExpertDirectionID + " - " + e.flExpertDirectionName + " - " + e.flExpertDirectionFullName');
    l.write(logger, "Направления qualification");
    for (e in obj.ExpertsData) {
        xq = "for $elem in qualifications where $elem/code = '" + e.flExpertDirectionID + "' and MatchSome($elem/role_id, (" + qual_role_id + ")) return $elem";
        foundQual = ArrayOptFirstElem(XQuery(xq));
        if (foundQual == undefined) {
            newQualification(e.flExpertDirectionID, e.flExpertDirectionName);
        } else {
            doc = tools.open_doc(foundQual.id);
            doc.TopElem.name = e.flExpertDirectionName;
            doc.Save();
        }

        // l.write(logger, e.flExpertDirectionID + " - " + e.flExpertDirectionName);// + " - " + e.flExpertDirectionFullName
    }
}

// Присвоения qualification_assignment
var oExperts = HttpRequest(sUrlGetExpertsData, "GET", "", sHeaders);
if (oExperts.RespCode == 200) { 
    obj = tools.read_object(oExperts.Body);
    // l.write(logger, 'e.flGuid + " - " + e.fl + " - " + e.flExpertDirectionID + " - " + e.flStartDate + " - " + e.flFinishDate + " - " + e.flCertificateNumber');
    l.write(logger, "Присвоения qualification_assignment");
    for (e in obj.ExpertsData) {
        isOk = true;
        xq = "for $elem in collaborators where code = '" + e.flGuid + "' return $elem";
        foundCol = ArrayOptFirstElem(XQuery(xq));
        xq = "for $elem in qualifications where $elem/code = '" + e.flExpertDirectionID + "' and MatchSome($elem/role_id, (" + qual_role_id + ")) return $elem";
        foundQual = ArrayOptFirstElem(XQuery(xq));
        if (foundCol == undefined) {
            l.write(logger, "foundCol == undefined; e.flGuid = " + e.flGuid);
            isOk = false;
        } 
        if (foundQual == undefined) {
            l.write(logger, "foundQual == undefined; e.flExpertDirectionID = " + e.flExpertDirectionID);
            isOk = false;
        }
        if (isOk) {
            try {
                newQA(foundCol.id, foundQual.id, e);
                // l.write(logger, "OK - " + e.flExpertDirectionID);
            } catch (err) {
                l.write(logger, "err = " + err);
                continue;
            }
        }
        //l.write(logger, e.flGuid + " - " + e.fl + " - " + e.flExpertDirectionID + " - " + e.flStartDate + " - " + e.flFinishDate + " - " + e.flCertificateNumber);
    }
}

// l.write(logger, msg);
l.close(logger);
} catch (error) {
l.write(logger, "error");
l.write(logger, error);
l.close(logger);
}