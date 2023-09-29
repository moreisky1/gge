// 7271216784406956672 - Кнопки (Заявка на децентрализованное обучение)

try {
    var oRes = tools.get_code_library_result_object();
    oRes.actions = [];
    oRes.actions.push({
        "id": "1",
        "title": "Сохранить",
        "action_id": "1"
    });
    
    if (curObject != null && curObject != undefined) {
        oRes.actions.push({
            "id": "2",
            "title": "Отправить на согласование",
            "action_id": "2"
        });
        oRes.actions.push({
            "id": "3",
            "title": "Удалить",
            "action_id": "3"
        })
    }

    ERROR = oRes.error;
    MESSAGE = tools.get_code_library_error_message(oRes, Env);
    RESULT = oRes.actions;
} catch (e) {
    ERROR = 1;
    MESSAGE = e;
    RESULT = [];
}
