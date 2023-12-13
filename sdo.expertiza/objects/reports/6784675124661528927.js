// 6784675124661528927 - Незаконченные адаптационные курсы

var logger = {
    isLog: true,
    logType: "report",
    logName: "6784675124661528927",
}
var l = gge.getLib("log_lib");
// var personalLib = gge.getLib("personal_lib");
// var notifLib = gge.getLib("notif_lib");
// var dlib = gge.getLib("develop");

var courses1 = [ // Отправляем если есть незавершенный, но нет завершенного
    "6638809191131716174", // Противодействие коррупции в ФАУ «Главгосэкспертиза России»
    "6638805021259473927", // АИС ФАУ «Главгосэкспертиза России» Часть 1. Основы работы
    "6649243814098458626", // АИС ФАУ «Главгосэкспертиза России» Часть 2. Для исполнителей
    "6753594766514922174", // Основы информационной безопасности. Правила и требования для работников Учреждения
    "6937569963636896296", // Добро пожаловать в ФАУ «Главгосэкспертиза России»
    "6749027788576291899", // Принципы постановки индивидуальных Ключевых показателей эффективности (КПЭ) и оценки результатов выполнения
    "7057848312540133908", // Стандарты общения с заявителями 6638804711819068245 ??
    "6832345345511998928", // Коронавирус. Что нужно знать?
    "7130524934665025316", // Охрана труда
];

var courseIDs1 = ArrayMerge(courses1, "This", ", ");
// var courseIDs2 = ArrayMerge(courses2, "This", ", ");

function getActiveLearnings(courseIDs) {
    var condArray = ["1=1"];
    if ({PARAM1} != null && {PARAM1} != "") {
        condArray.push("$col/hire_date >= " + XQueryLiteral({PARAM1}));
    }
    if ({PARAM2} != null && {PARAM2} != "") {
        condArray.push("$col/hire_date <= " + XQueryLiteral({PARAM2}));
    }
    var condition = ArrayMerge(condArray, "This", " and ")
    var xq = "for $elem in active_learnings, $col in collaborators where MatchSome($elem/course_id, (" + courseIDs + ")) " +
        " and $col/id = $elem/person_id and $col/is_dismiss = false() and $elem/is_self_enrolled = false() " +
        " and contains($col/current_state, 'Отпуск') = false() and " + condition + " return $elem";
    // l.write(logger, xq);
    return XQuery(xq);
}

function existLearning(personID, courseID) {
    var xq = "for $elem in learnings where $elem/person_id = " + personID + " and $elem/course_id = " + courseID + " return $elem";
    return ArrayOptFirstElem(XQuery(xq)) == undefined;
}

try {
    // l.open(logger);

    var als1 = getActiveLearnings(courseIDs1);
    var arr = ArraySelectDistinct(ArraySelect(als1, "existLearning(This.person_id, This.course_id)"), "This");
    var final_arr = [];
    
    for (elem in arr) {
        teElem = tools.open_doc(elem.id).TopElem;
        obj = {};
        for (fldElem in elem) {
            if (fldElem.Name != "id") {
                obj.SetProperty(fldElem.Name, String(fldElem));
            }
        }
        obj.SetProperty("PrimaryKey", String(elem.id));

        // obj.collaborators = String(teElem.custom_elems.ObtainChildByKey("collaborators").value);
        
        final_arr.push(obj);
    }
    // l.write(logger, tools.object_to_text(final_arr, "json"));
    // l.close(logger);
    return final_arr;
} catch (error) {
    l.open(logger);
    l.write(logger, error);
    l.close(logger);
}
