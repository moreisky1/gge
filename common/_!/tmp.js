function fun(sFormCommand, sFormFields) {

    var oRes = tools.get_code_library_result_object();
    oRes.result = []
    var arrFormFields = [];
    try {
        if ( command == "eval" )
            {
                // добавить поле для вывода текста (условно type=paragraph)
            
                oRes.result = {
                    command: "wizard",
                    title: "Подача заявки на обучение",
                    form_fields:
                    [
                        { name: "fld0", type: "hidden", value: "1", page: "page_one" },
                        { name: "fld5", label: "Выпадающее меню", type: "select", value: "v1", entries: [ { name: "Value 1", value: "v1" }, { name: "Value 2", value: "v2" } ], page: "page_one" },
                        { name: "fld2", label: "Целое число", type: "integer", value: 1, mandatory: true, validation: "number", column: 2, page: "page_one", error_message: "Введите целое число", visibility: [{ parent: "fld5", value: "v2" }] },
                        { name: "fld8", label: "Правда или вымысел", type: "bool", mandatory: true, value: true, view: "check", page: "page_one" },
                        { name: "fld3", label: "Дробное число", type: "real", value: 1, mandatory: false, validation: "number", column: 1, page: "page_one", error_message: "Введите дробное число", visibility: [{ parent: "fld8", value: true }] },
            
                        { name: "fld_file", label: "Файл", type: "file", page: "page_two" },
                        { name: "fld1", label: "email", type: "string", value: "test_string", mandatory: true, validation: "email", column: 1, page: "page_two" },
                        { name: "flddate3", label: "Дата", type: "date", value: "2020-06-24", mandatory: true, validation: "date", column: 2, page: "page_two" },
            
                        { name: "fld4", label: "Свободный текст", type: "text", value: "test_text", mandatory: true, validation: "nonempty", page: "page_three" },
                        { name: "fld7", label: "DB Object", type: "foreign_elem", catalog: "collaborator", value: null, title: "Выберите элемент", page: "page_three" }
                    ],
                    pages: 
                    [
                        { name: "page_one" },
                        { name: "page_two"},//, buttons: [{ name: "click2", label: "Проверка", type: "click2" }] },
                        { name: "page_three"}//, buttons: [{ name: "click3", label: "Проверка", type: "click3" }] }
                    ],
                    buttons:
                    [
                        { name: "submit", label: "Сохранить", type: "submit" },
                        { name: "cancel", label: "Отменить", type: "cancel"}
            
                    ],
                    no_buttons: false
                };
                // alert( tools.object_to_text( RESULT, 'json' ) );
            }
            
            if ( command == "submit_form" )
            {
                sMsg = "Вы уверены?";
                oFormFields = undefined;
            
                // if ( form_fields != "" )
                // {
                // 	oFormFields = ParseJson( form_fields );
                // }
            
                // if ( oFormFields != undefined )
                // {
                // 	oFld1 = ArrayOptFirstElem( oFormFields );
                // 	if(oFld1.value=="1")
                // 	{
                // 		RESULT =	{
                // 			command: "display_form",
                // 			title: "Another questions",
                // 			message: "Fill that too",
                // 			form_fields:
                // 			[
                // 				{ name: "fld0", type: "hidden", value: "2" },
                // 				{ name: "fld1", label: "String", type: "string", value: test_string, mandatory: true, validation: "nonempty" },
                // 				{ name: "fld2", label: "Integer", type: "integer", value: test_integer, mandatory: true, validation: "nonempty" },
                // 				{ name: "fld3", label: "Real number", type: "real", value: test_real, mandatory: true, validation: "nonempty" },
                // 				{ name: "fld4", label: "Free text", type: "text", value: test_text, mandatory: true, validation: "nonempty" },
                // 				{ name: "fld5", label: "Selector", type: "select", value: test_select, entries: [ { name: "Value 1", value: "v1" }, { name: "Value 2", value: "v2" } ] },
                // 				{ name: "fld7", label: "DB Object", type: "foreign_elem", catalog: "collaborator", value: test_foreign_elem },
                // 				{ name: "fld8", label: "Boolean", type: "bool", value: test_bool }
                // 			]
                // 		};
                        
                // 	}
                // 	else
                // 	{
                // 		if ( oFld1 != undefined && curObject != null )
                // 		{
                //             curObject.code = oFld1.value;
                // 			sMsg = "OK )))";
                // 		}
                // 	}
                // }
                oRes.result = {
                    command: "confirm",
                    msg: sMsg,
                    confirm_result: { "command": "reload_page" },
                    cancel_result: { "command": "close_form" },
                };	
            }
    
    } catch(err) {
        oRes.error = 1;
        oRes.errorText = "Ошибка вызова удаленного действия \"TEMP\"\r\n" + err;
        oRes.result = {command: "close_form", msg: oRes.errorText};
    }
    return oRes;
    }
    
    var oRes = fun(command, form_fields)
    RESULT = oRes.result;
    ERROR = oRes.error;
    MESSAGE = oRes.errorText;
    if (ERROR != 0) alert("ERROR: " + MESSAGE )
    