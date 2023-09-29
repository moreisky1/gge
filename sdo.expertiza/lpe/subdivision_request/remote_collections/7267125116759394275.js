// 7267125116759394275 - Таблица заявок подразделения (Заявка на децентрализованное обучение)

logger = {
    isLog: true,
    logType: "ext",
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
        xq = "sql: " +
        "SELECT " +
        "    requests.* " +
        "FROM requests " +
        "LEFT JOIN request ON request.id = requests.id " +
        "WHERE requests.request_type_id = " + requestTypeID +
        "    AND requests.workflow_state != '0' " +
        "    AND request.data.value('(request/custom_elems/custom_elem[name=''collaborators''])[1]/value[1]', 'varchar(max)') LIKE '%" + colID + "%' " +
        "    AND ( request.data.value('(request/custom_elems/custom_elem[name=''subdivision_bosses''])[1]/value[1]', 'varchar(max)') IS NULL " +
        "    AND request.data.value('(request/custom_elems/custom_elem[name=''department_bosses''])[1]/value[1]', 'varchar(max)') IS NULL ) " +
        "";
        colRequests = XQuery(xq);
        requests = ArrayUnion(requests, colRequests);
    }

    xq = "sql: " +
    "SELECT " +
    "    requests.* " +
    "FROM requests " +
    "LEFT JOIN request ON request.id = requests.id " +
    "WHERE requests.request_type_id = " + requestTypeID +
    "    AND requests.workflow_state != '0' " +
    "    AND ( request.data.value('(request/custom_elems/custom_elem[name=''subdivision_bosses''])[1]/value[1]', 'varchar(max)') LIKE '%" + userID + "%' " +
    "    OR request.data.value('(request/custom_elems/custom_elem[name=''department_bosses''])[1]/value[1]', 'varchar(max)') LIKE '%" + userID + "%' ) " +
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
    MESSAGE = e;
    RESULT = [];
}
