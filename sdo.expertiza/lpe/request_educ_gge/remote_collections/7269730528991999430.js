// 7269730528991999430 - Кнопки ДО (Заявка на децентрализованное обучение)

logger = {
    isLog: true,
    logType: "ext",
    logName: "7269730528991999430",
}

var personalLib = gge.getLib("personal_lib");
var l = gge.getLib("log_lib");
var dlib = gge.getLib("develop");

function getFirstCol(teRequest) {
    var collaborators = teRequest.custom_elems.GetOptChildByKey("collaborators");
    var person1 = undefined;
    if (collaborators != undefined) {
        person1 = collaborators.value.Value.split(";")[0];
    }
    return person1;
}

function getActions(curObject, userID) {
    var person1 = getFirstCol(curObject);
    var bossTypeID = "7070444973261573463"; // Ответственный за обучение
    bossTypeID = undefined;
    var userRoles = personalLib.getUserRolesForPerson(userID, person1, bossTypeID);
    var arr = [];
    var department_bosses = dlib.ceValue(curObject, "department_bosses");
    var subdivision_bosses = dlib.ceValue(curObject, "subdivision_bosses");
    if (curObject.workflow_state == "1") {
        if (department_bosses != undefined && department_bosses != "") {
            if (StrContains(department_bosses, userID)) {
                arr.push({
                    "id": "1_1",
                    "title": "Согласовать заявку",
                    "action_id": "1_1",
                });
                arr.push({
                    "id": "0",
                    "title": "Отклонить заявку",
                    "action_id": "0",
                });
            }
        } else if (ArrayOptFind(userRoles, "This=='department_boss'") != undefined) {
            arr.push({
                "id": "1_1",
                "title": "Согласовать заявку",
                "action_id": "1_1",
            });
            arr.push({
                "id": "0",
                "title": "Отклонить заявку",
                "action_id": "0",
            });
        }
    }
    if (curObject.workflow_state == "2") {
        if (subdivision_bosses != undefined && subdivision_bosses != "") {
            if (StrContains(subdivision_bosses, userID)) {
                arr.push({
                    "id": "2_1",
                    "title": "Согласовать заявку",
                    "action_id": "2_1",
                });
                arr.push({
                    "id": "0",
                    "title": "Отклонить заявку",
                    "action_id": "0",
                });
            }
        } else if (ArrayOptFind(userRoles, "This=='subdivision_boss'") != undefined) {
            arr.push({
                "id": "2_1",
                "title": "Согласовать заявку",
                "action_id": "2_1",
            });
            arr.push({
                "id": "0",
                "title": "Отклонить заявку",
                "action_id": "0",
            });
        }
    }
    if (curObject.workflow_state == "3" && personalLib.isPersonInGroup(userID, "7273085857227831636")) { // Ответственные от УЦ за согласование заявок
        arr.push({
            "id": "3_1",
            "title": "Согласовать заявку",
            "action_id": "3_1",
        });
        arr.push({
            "id": "0",
            "title": "Отклонить заявку",
            "action_id": "0",
        });
    }
    if (personalLib.isPersonInGroup(userID, "7272291807600532768")) { // develop
        arr.push({
            "id": "10",
            "title": "Уведомления",
            "action_id": "10",
        })
    }
    return arr;
}
try {
    l.open(logger);

    if (curObject != null && curObject != undefined) {
        var oRes = tools.get_code_library_result_object();
        oRes.actions = [];
        if (curObject.status_id == "active") oRes.actions = getActions(curObject, curUserID);
        ERROR = oRes.error;
        MESSAGE = tools.get_code_library_error_message(oRes, Env);
        RESULT = oRes.actions;
    } else {
        ERROR = 0;
        RESULT = [];
    }
    
    l.close(logger);
} catch (error) {
    l.write(logger, error);
    l.close(logger);
    ERROR = 1;
    MESSAGE = e;
    RESULT = [];
}