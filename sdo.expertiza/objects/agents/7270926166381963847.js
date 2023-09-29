// 7270926166381963847 - Агент выстраивания оргструктуры

function getSubID(num) {
    var subs = [
        {"num": "22", "id": "7156931445642758245"}, // Административное управление
        {"num": "32", "id": "7156931481694514538"}, // Управление методологии и стандартизации экспертной деятельности
        {"num": "42", "id": "7156931481771522140"}, // Финансово-экономическое управление
        {"num": "52", "id": "7156931480523574108"}, // Управление безопасности
        {"num": "62", "id": "7156931480127021919"}, // Центр кибербезопасности
        {"num": "92", "id": "7156931481677816450"}, // Управление делами
        {"num": "102", "id": "7156931481291216642"}, // Центр цифровой трансформации
        {"num": "122", "id": "7156931481260199691"}, // Управление организационного развития
        {"num": "132", "id": "7156931480992233630"}, // Учебный центр
        {"num": "142", "id": "7156931476741183421"}, // Служба взаимодействия по экспертным услугам
        {"num": "162", "id": "7156931481266824347"}, // Управление проверки сметной док. и экспертизы пр-ов орг. стр-ва
        {"num": "172", "id": "7156931445709550596"}, // Инжиниринговый центр
        {"num": "182", "id": "7156931480985434385"}, // Управление экологической экспертизы
        {"num": "192", "id": "7156931481681199688"}, // Управление инженерного обеспечения
        {"num": "202", "id": "7156931481270240354"}, // Управление промышленной, ядерной,радиационной, пожарной безопасн
        {"num": "222", "id": "7156931480603790360"}, // Управление строительных решений
        {"num": "232", "id": "7156931481280346553"}, // Управление сметного нормирования
        {"num": "242", "id": "7156931481701139194"}, // Управление мониторинга цен строительных ресурсов и МРИС в Ц
        {"num": "252", "id": "7156931481273721896"}, // Управление разработки сметных нормативов
        {"num": "262", "id": "7166984460794795039"}, // Служба ГЭП по объектам производственного назначения
        {"num": "272", "id": "7166984461923979694"}, // Служба ГЭП по объектам гражданского назначения
        {"num": "282", "id": "7168839938677955436"}, // Служба ГЭП по объектам транспортного и гидротех-кого назначения
        {"num": "302", "id": "7191847215071461214"}, // Управление экспертизы и координации специальных проектов
    ];
    var foundElem = ArrayOptFind(subs, "This.num == num");
    return foundElem != undefined ? foundElem.id : undefined;
}

try {
    var logName = "agent/Агент выстраивания оргструктуры";
    EnableLog(logName, true);
    var sourceList = OpenDoc("x-local://wt/web/AD2023_04.xlsx", "format=excel");
    var lineArray = ArrayFirstElem(sourceList.TopElem);
    var subName = "";
    var num = "";
    var xq = "";
    var foundSub = undefined;
    var foundSubID = undefined;
    for (i = 1; i < ArrayCount(lineArray); i++) {
        subName = lineArray[i][0];
        num = lineArray[i][3];
        if (num != "") {
            xq = "for $elem in subdivisions where contains($elem/code,'_ФАУ') and $elem/name='" + subName + "' return $elem";
            foundSub = ArrayOptFirstElem(XQuery(xq));
            foundSubID = getSubID(num);
            if (foundSub != undefined && foundSubID != undefined) {
                docSub = tools.open_doc(foundSub.id);
                docSub.TopElem.parent_object_id = foundSubID;
                docSub.Save();
            } else {
                LogEvent(logName, "i = " + i + "; foundSub = " + foundSub + "; foundSubID = " + foundSubID);
            }
        } else {
            continue;
        }
    }
    LogEvent(logName, "OK");
} catch (err) {
    LogEvent(logName, ExtractUserError(err));
} finally {
    EnableLog(logName, false);
}
