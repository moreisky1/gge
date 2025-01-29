// 7267125116759394275 - Таблица заявок подразделения (Заявка на децентрализованное обучение)

logger = {
    isLog: false,
    logType: "report",
    logName: "7267125116759394275",
}
var l = OpenCodeLib("x-local://source/gge/libs/log_lib.js");
var personalLib = OpenCodeLib("x-local://source/gge/libs/personal_lib.js");
var dlib = OpenCodeLib("x-local://source/gge/libs/develop.js");

function getFirstCol(teRequest) {
    var collaborators = teRequest.custom_elems.GetOptChildByKey("collaborators");
    var person1 = undefined;
    if (collaborators != undefined) {
        person1 = collaborators.value.Value.split(";")[0];
    }
    return person1;
}

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
    var factSubID = getFactSubID(userID, factRole);
    var colIDs = [];
    var xq = "";
    var extraRequests = [];
    if (factSubID != null) colIDs = personalLib.getAllChildSubdivisionPersonIDs(factSubID);
    for (colID in colIDs) {
        l.write(logger, "colID=" + tools.open_doc(colID).TopElem.fullname)
        xq = "sql: " +
        "SELECT " +
        "    dbo.requests.* " +
        "FROM dbo.requests " +
        "LEFT JOIN dbo.request ON dbo.request.id = dbo.requests.id " +
        "WHERE dbo.requests.request_type_id = " + requestTypeID +
        "    AND dbo.requests.workflow_state != '0' " +
        // "    AND dbo.requests.status_id = 'active' " +
        "    AND DATE(dbo.requests.create_date) >= '08.10.2024' " +
        "    AND (xpath('//request/custom_elems/custom_elem[name=''collaborators'']/value/text()', data))[1]::text LIKE '%" + colID + "%' " +
        "    AND (xpath('//request/custom_elems/custom_elem[name=''subdivision_bosses'']/value/text()', data))[1]::text IS NULL " +
        "    AND (xpath('//request/custom_elems/custom_elem[name=''department_bosses'']/value/text()', data))[1]::text IS NULL " +
        "";
        colRequests = XQuery(xq);
        l.write(logger, "ArrayCount(colRequests)=" + ArrayCount(colRequests))
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
    "    AND DATE(dbo.requests.create_date) >= '08.10.2024' " +
    "    AND ( (xpath('//request/custom_elems/custom_elem[name=''subdivision_bosses'']/value/text()', data))[1]::text LIKE '%" + userID + "%' " +
    "    OR (xpath('//request/custom_elems/custom_elem[name=''department_bosses'']/value/text()', data))[1]::text LIKE '%" + userID + "%' ) " +
    "";
    extraRequests = XQuery(xq);

    requests = ArrayUnion(requests, extraRequests);

    return ArraySelectDistinct(requests, "This.id");
}

try {
    l.open(logger);

    var oRes = {};
    oRes.error = 0;
    oRes.errorText = "";
    oRes.array = [];
    oRes.data = {};

    var arr = [];
    arr = getRequests(curUserID);
    var i = 1;
    for (elem in arr) {
        teDoc = tools.open_doc(elem.id).TopElem;
        obj = {};
        obj.id = i;
        obj.request_number = i;
        obj.code = RValue(teDoc.code);
        obj.collaborators = ArrayCount(dlib.ceValue(teDoc, "collaborators").split(";"));
        obj.event_name = dlib.ceValue(teDoc, "event_name");
        if (dlib.ceValue(teDoc, "education_org") != "") {
            obj.education_org = ArrayOptFirstElem(XQuery("for $e in education_orgs where $e/id=" + dlib.ceValue(teDoc, "education_org") + " return $e")).disp_name;
        } else {
            obj.education_org = dlib.ceValue(teDoc, "education_org_new");
        }
        obj.event_start_date = OptDate(dlib.ceValue(teDoc, "event_start_date"));
        obj.event_cost = dlib.ceValue(teDoc, "event_cost");
        obj.event_cost_sum = OptReal(dlib.ceValue(teDoc, "event_cost")) != undefined ? OptReal(dlib.ceValue(teDoc, "event_cost")) * obj.collaborators : null;
        obj.status_id_name = teDoc.workflow_state_name;
        obj.priority = String(teDoc.workflow_fields.ObtainChildByKey( "priority" ).value);
        // obj.link = 'http://sdo.expertiza.ru/_wt/' + elem.id
        obj.btn = '<a class="gge_btn_grid gge_btn_start" href="http://sdo.expertiza.ru/_wt/' + elem.id + '" target="_blank">Перейти</a>';
        oRes.array.push(obj);
        i++;
    }

    if (ObjectType(PAGING) == 'JsObject' && PAGING.SIZE != null) {
        PAGING.MANUAL = true;
        PAGING.TOTAL = ArrayCount(oRes.array);
        oRes.array = ArrayRange(oRes.array, OptInt(PAGING.INDEX, 0) * PAGING.SIZE, PAGING.SIZE);
    }

    RESULT = oRes.array;
    DATA = oRes.data;
    ERROR = oRes.error;
    MESSAGE = oRes.errorText;

    l.close(logger);
} catch (error) {
    l.write(logger, error);
    l.close(logger);
    ERROR = 1;
    MESSAGE = error;
    RESULT = [];
}