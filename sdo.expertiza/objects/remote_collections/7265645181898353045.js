// 7265645181898353045 - Выборка для вкладки Информация на странице Курса

var oRes = {};
oRes.error = 0;
oRes.errorText = "";
oRes.array = [];
oRes.data = {};
try {
    teCourse = tools.open_doc(curObjectID).TopElem;

    oRes.array.push({
        "id": 1,
        "name": "Время на изучение (час)",
        "value": String(teCourse.custom_elems.ObtainChildByKey('hours').value)
    })
    oRes.array.push({
        "id": 2,
        "name": "Максимальный балл",
        "value": teCourse.max_score.Value
    })
    oRes.array.push({
        "id": 3,
        "name": "Проходной балл",
        "value": teCourse.mastery_score.Value
    })
    
    if (ObjectType(PAGING) == 'JsObject' && PAGING.SIZE != null) {
        PAGING.MANUAL = true;
        PAGING.TOTAL = ArrayCount(oRes.array);
        oRes.array = ArrayRange(oRes.array, OptInt(PAGING.INDEX, 0) * PAGING.SIZE, PAGING.SIZE);
    }
} catch (e) {
    oRes.error = 1;
    oRes.errorText = e;
}
RESULT = oRes.array;
DATA = oRes.data;
ERROR = oRes.error;
MESSAGE = oRes.errorText;
