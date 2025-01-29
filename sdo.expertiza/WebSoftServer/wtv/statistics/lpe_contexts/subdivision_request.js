// 7267463972231149647 - statistics/lpe_contexts/subdivision_request.js

logger = {
    isLog: true,
    logType: "report",
    logName: "7267463972231149647",
}
var l = OpenCodeLib("x-local://source/gge/libs/log_lib.js");
var personalLib = OpenCodeLib("x-local://source/gge/libs/personal_lib.js");
var dlib = OpenCodeLib("x-local://source/gge/libs/develop.js");

function getFactRole(userID) {
    var factRole = "";
    var bossGroupID = "6946469776977774881"; // Admin_boss - Начальники управлений имеющие право просмотра бюджета на обучение
    var bossTypeID = "7070444973261573463"; // Ответственный за обучение
    bossTypeID = undefined;
    var userRoles = personalLib.getUserRolesForPerson(userID, userID, bossTypeID);
    if (personalLib.isPersonInGroup(userID, bossGroupID)) {
        factRole = "subdivision_boss";
    } else {
        if (ArrayOptFind(userRoles, "This=='subdivision_boss'") != undefined) {
            factRole = "subdivision_boss";
        } else if (ArrayOptFind(userRoles, "This=='department_boss'") != undefined) {
            factRole = "department_boss";
        }
    }
    return factRole;
}

function getFactSubID(userID, factRole) {
    var factSubID = null;
    var subdivisionID = tools.get_doc_by_key("collaborator", "id", userID).TopElem.position_parent_id;
    var parentSubdivisionID = personalLib.getParentSubdivisionID(subdivisionID);
    var subdivisionRole = personalLib.getSubdivisionRole(subdivisionID);
    l.write(logger, "subdivisionRole="+subdivisionRole)
    if (factRole == "subdivision_boss") {
        if (subdivisionRole == "subdivision") {
            factSubID = subdivisionID;
        } else if (subdivisionRole == "department") {
            factSubID = parentSubdivisionID;
        }
    } else if (factRole == "department_boss") {
        if (subdivisionRole == "subdivision") {
            factSubID = subdivisionID; // непонятка
        } else if (subdivisionRole == "department") {
            factSubID = subdivisionID;
        }
    }
    return factSubID;
}

function getRequests(userID) {
    var requests = [];
    var colRequests = [];
    var requestTypeID = "7265281441174738432"; // Заявка на децентрализованное обучение
    var factRole = getFactRole(userID);
    var factSubID;
    var colIDs = [];
    var xq = "";
    var extraRequests = [];
    if (factRole == "subdivision_boss") {
        factSubID = getFactSubID(userID, factRole);
        if (factSubID != null) colIDs = personalLib.getAllChildSubdivisionPersonIDs(factSubID);
        for (colID in colIDs) {
            xq = "sql: " +
            "SELECT " +
            "    dbo.requests.* " +
            "FROM dbo.requests " +
            "LEFT JOIN dbo.request ON dbo.request.id = dbo.requests.id " +
            "WHERE dbo.requests.request_type_id = " + requestTypeID +
            "    AND dbo.requests.workflow_state != '0' " +
            // "    AND dbo.requests.status_id = 'active' " +
            "    AND DATE(dbo.requests.create_date) >= '08.19.2024' " +
            "    AND (xpath('//request/custom_elems/custom_elem[name=''collaborators'']/value/text()', data))[1]::text LIKE '%" + colID + "%' " +
            "    AND (xpath('//request/custom_elems/custom_elem[name=''subdivision_bosses'']/value/text()', data))[1]::text IS NULL " +
            "    AND (xpath('//request/custom_elems/custom_elem[name=''department_bosses'']/value/text()', data))[1]::text IS NULL " +
            "";
            colRequests = XQuery(xq);
            requests = ArrayUnion(requests, colRequests);
        }
        xq = "sql: " +
        "SELECT " +
        "    dbo.requests.* " +
        "FROM dbo.requests " +
        "LEFT JOIN dbo.request ON dbo.request.id = dbo.requests.id " +
        "WHERE dbo.requests.request_type_id = " + requestTypeID +
        "    AND dbo.requests.workflow_state != '0' " +
        // "    AND dbo.requests.status_id = 'active' " +
        "    AND DATE(dbo.requests.create_date) >= '08.19.2024' " +
        "    AND ( (xpath('//request/custom_elems/custom_elem[name=''subdivision_bosses'']/value/text()', data))[1]::text LIKE '%" + userID + "%' " +
        "    OR (xpath('//request/custom_elems/custom_elem[name=''department_bosses'']/value/text()', data))[1]::text LIKE '%" + userID + "%' ) " +
        "";
        extraRequests = XQuery(xq);
    
        requests = ArrayUnion(requests, extraRequests);
    }
    return ArraySelectDistinct(requests, "This.id");
}

function getBudget(userID) {
    var budget;
    var factSubID = getFactSubID(userID, getFactRole(userID));
    if (factSubID != null) budget = personalLib.getSubdivisionBudget(factSubID);
    return budget;
}

function getWasted(userID) {
    var wasted = 0;
    var arr = [];
    arr = getRequests(userID);
    for (elem in arr) {
        try {
            teDoc = tools.open_doc(elem.id).TopElem;
            wasted += ArrayCount(dlib.ceValue(teDoc, "collaborators").split(";")) * OptReal(dlib.ceValue(teDoc, "event_cost"));
        } catch(e) {continue;}
    }
    return wasted;
}

function getFields(userID) {
    var oRes = tools.get_code_library_result_object();
    oRes.context = new Object;

    try {
        userID = Int(userID);
    } catch (err) {
        oRes.error = 503;
        oRes.errorText = "{ text: 'Object not found.', param_name: 'ID' }";
        return oRes;
    }
    try {
        l.open(logger);
        l.write(logger, "userID="+userID);
        l.write(logger, "DataType(userID)="+DataType(userID));
        var budget = getBudget(userID);
        l.write(logger, budget);
        var wasted = getWasted(userID);
        var budgetMsg = "";
        var wastedMsg = "";
        if (budget != undefined && budget != 0) {
            budgetMsg = "Бюджет подразделения: " + StrReplace(String(budget), ".", ",") + " руб.";
            if (budget < wasted) {
                wastedMsg = "Бюджет заявок " + StrReplace(String(StrReal(wasted, 2, true)), ".", ",") + " руб. превышает бюджет подразделения на обучение!";
            }
        }

        oRes.context = {
            subdivision_budget_msg: budgetMsg,
            budget_msg: wastedMsg,
        };

        l.close(logger);
        return oRes;
    } catch (error) {
        l.write(logger, error);
        l.close(logger);
        oRes.error = 503;
        oRes.errorText = "oshipga " + error;
        return oRes;
    }
}

var oRes = getFields(curUserID);
VALUE_STR = EncodeJson(oRes.context);