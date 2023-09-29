var logName = "7249748132516004951"; // Отправить Уведомление работнику о непройденных адаптационных курсах

var courses1 = [ // Отправляем если есть незавершенный, но нет завершенного
    "6638809191131716174", // Противодействие коррупции в ФАУ «Главгосэкспертиза России»
    "6638805021259473927", // АИС ФАУ «Главгосэкспертиза России» Часть 1. Основы работы
    "6649243814098458626", // АИС ФАУ «Главгосэкспертиза России» Часть 2. Для исполнителей
    "6753594766514922174", // Основы информационной безопасности. Правила и требования для работников Учреждения
    "6937569963636896296", // Добро пожаловать в ФАУ «Главгосэкспертиза России»
    "6749027788576291899", // Принципы постановки индивидуальных Ключевых показателей эффективности (КПЭ) и оценки результатов выполнения
    "7057848312540133908" // Стандарты общения с заявителями
];

var courses2 = [ // Отправляем если есть незавершенный
    "7130524934665025316" // Охрана труда
];

var courseIDs1 = ArrayMerge(courses1, "This", ", ");
var courseIDs2 = ArrayMerge(courses2, "This", ", ");

function getList(personID, courseIDs1, courseIDs2) {
    return XQuery("for $elem in active_learnings where MatchSome($elem/course_id, (" + courseIDs1 + ", " + courseIDs2 + ")) " +
        " and $elem/person_id = " + personID + " return $elem");
}

function getText(personID, courseIDs1, courseIDs2) {
    var text = "<ol>";
    for (elem in getList(personID, courseIDs1, courseIDs2)) {
        text += "<li><a href='http://sdo.expertiza.ru/_wt/" + elem.course_id + "'>" + elem.course_name + "</a></li>";
    }
    text += "</ol>";
    return text;

}

function getActiveLearnings(courseIDs) {
    var condition = "and $elem/person_id = 7241157892942218865 or $elem/person_id = 6769089066357701563";
    condition = "";
    var xq = "for $elem in active_learnings, $col in collaborators where MatchSome($elem/course_id, (" + courseIDs + ")) " +
        " and $col/id = $elem/person_id and $col/is_dismiss = false() and $elem/is_self_enrolled = false() " +
        " and contains($col/current_state, 'Отпуск') = false() " + condition + " return $elem";
    return XQuery(xq);
}

function existLearning(personID, courseID) {
    var xq = "for $elem in learnings where $elem/person_id = " + personID + " and $elem/course_id = " + courseID + " return $elem";
    return ArrayOptFirstElem(XQuery(xq)) == undefined;
}

function getCols(courseIDs1, courseIDs2) {
    var als1 = getActiveLearnings(courseIDs1);
    var cols1 = ArraySelectDistinct(ArrayExtractKeys(ArraySelect(als1, "existLearning(This.person_id, This.course_id)"), "person_id"), "This");
    LogEvent(logName, "ArrayCount(cols1) = " + ArrayCount(cols1));
    var als2 = getActiveLearnings(courseIDs2);
    var cols2 = ArraySelectDistinct(ArrayExtractKeys(als2, "person_id"), "This");
    LogEvent(logName, "ArrayCount(cols2) = " + ArrayCount(cols2));
    var cols = ArraySelectDistinct(ArrayUnion(cols1, cols2), "This");
    LogEvent(logName, "ArrayCount(cols) = " + ArrayCount(cols));
    return cols;
}

function is_exist_in_catalog_by_id(catalogName, id) {
    return ArrayOptFirstElem(XQuery("for $elem in " + catalogName + "s where $elem/id = " + id + " return $elem")) != undefined;
}
function add_cols_to_groups(groupIDs, colIDs) {
    try {
        for (groupID in groupIDs) {
            if (is_exist_in_catalog_by_id("group", groupID)) {
                docGroup = tools.open_doc(groupID);
                teGroup = docGroup.TopElem;
                for (colID in colIDs) {
                    colID = OptInt(colID);
                    if (is_exist_in_catalog_by_id("collaborator", colID) && !teGroup.collaborators.ChildByKeyExists(colID)) {
                        teGroup.collaborators.ObtainChildByKey(colID);
                    }
                }
                docGroup.Save();
            }
        }
        return true;
    } catch (err) {
        return false;
    }
}

try {
    EnableLog(logName, true);
    var cols = getCols(courseIDs1, courseIDs2);
    var col;
    // add_cols_to_groups(["7250511083601225837"], cols);
    for (col in cols) {
        //LogEvent(logName, getText(col, courseIDs1, courseIDs2));
        try {
            tools.create_notification(Param.notification_id, col, getText(col, courseIDs1, courseIDs2));
            LogEvent(logName, "OK, col = " + col);
        } catch (er) {
            LogEvent(logName, "ERROR, col = " + col);
            continue;
        }
    }
} catch (error) {
    LogEvent(logName, ExtractUserError(error));
} finally {
    EnableLog(logName, false);
}
