// 7362139289473150113 - Импорт вопросов теста с проверкой корректности файла с тестом

// Этап проверки корректности файла
global_obj = {cur_section: "import_start", errors: [], cur_question_type: "", cur_row_num: 0, cur_question_answers: [], cur_question_right_answers: [], test_id: null};


function get_error(type_code, descr, col){
	var type = "Некорректая ячейка";
	switch (type_code){
		case "wrong_type":
			type = "Неправильное значение поля";
			break;
		case "wrong_structure":
			type = "Неправильная структура файла";
			break;
	}
	return { row: global_obj.cur_row_num, type: type, descr: descr, col: col };
}

function check_row_with_question(){
	//alert("check_row_with_question : global_obj.cur_section = " + global_obj.cur_section)
	
	try{
		Trim('{[2]}');
	} catch (e){
		global_obj.errors.push(get_error("wrong_structure", "Отсутствует вторая ячейка", 2));
		return;
	}
	try{
		Trim('{[3]}');
	} catch (e){
		global_obj.errors.push(get_error("wrong_structure", "Отсутствует третья ячейка", 3));
		return;
	}
	try{
		Trim('{[4]}');
	} catch (e){
		global_obj.errors.push(get_error("wrong_structure", "Отсутствует четвертая ячейка", 4));
		return;
	}
	//мой код
	
	/* убрали проверку норм
	if (Trim('{[6]}') != "" || Trim('{[7]}') != "" || Trim('{[8]}') != "" || Trim('{[9]}') != "")
	{
		if (Trim('{[5]}') == "")
		{
			global_obj.errors.push(get_error("wrong_structure", "Отсутствует код нормы в вопросе", 5));
			return;
		}
	}
	*/
	
	// конец моего кода
	global_obj.cur_question_type = Trim('{[2]}');
	// тип вопроса - NUMBER / TEXT / SINGLE / SELECT / RANGE
	if (global_obj.cur_question_type != "NUMBER" && global_obj.cur_question_type != "TEXT" &&
			global_obj.cur_question_type != "SINGLE" && global_obj.cur_question_type != "SELECT" &&
			global_obj.cur_question_type != "RANGE"){
		global_obj.errors.push(get_error("wrong_type", "Тип вопроса должен быть NUMBER / TEXT / SINGLE / SELECT / RANGE", 2));
	}
	// в этой же строке указан ответ
	if (Trim('{[3]}') == ""){
		global_obj.errors.push(get_error("wrong_structure", "В строке с вопросом должен быть указан ответ", 3));
	} else {
		global_obj.cur_question_answers.push(Trim('{[3]}'));
	}
	// ответ нужного типа
	if (global_obj.cur_question_type == "NUMBER"){
		try{
			Real(Trim('{[3]}'));
		} catch (e){
			global_obj.errors.push(get_error("wrong_type", "В вопросах с типом NUMBER ответ должен быть числом", 3));
		}
	}
	// правильные ответы кладем в список
	if (Trim('{[4]}') == "Y"){
		global_obj.cur_question_right_answers.push(Trim('{[3]}'));
	}
}

function check_end_of_prev_question(){
	//alert("check_end_of_prev_question : global_obj.cur_section = " + global_obj.cur_section)
	//alert("check_end_of_prev_question : global_obj.cur_row_num = " + global_obj.cur_row_num)
	
	// проверяем вопрос, соответствующий предыдущей строке
	// если тип вопроса - SINGLE, SELECT или RANGE, ответов должно быть не меньше 2
	if((global_obj.cur_question_type == "SINGLE" || global_obj.cur_question_type == "SELECT" || global_obj.cur_question_type == "RANGE") &&
			global_obj.cur_question_answers.length < 2){
		//alert("check_end_of_prev_question: 1")
		global_obj.errors.push(get_error("wrong_structure", "Неверное количество ответов в предыдущем вопросе: у типов вопросов SINGLE, SELECT и RANGE должно быть больше одного ответа", 0));
	}
	if(global_obj.cur_question_type == "SELECT" && global_obj.cur_question_right_answers.length < 2){
		//alert("check_end_of_prev_question: 2")
		global_obj.errors.push(get_error("wrong_structure", "Неверное количество ответов в предыдущем вопросе: у типов вопросов SELECT должно быть хотя бы ДВА правильных ответа", 0));
	}
	// если тип вопроса - NUMBER, ответ дожен быть только один
	if((global_obj.cur_question_type == "NUMBER") &&
			global_obj.cur_question_answers.length > 1){
		//alert("check_end_of_prev_question: 3")
		global_obj.errors.push(get_error("wrong_structure", "Неверное количество ответов в предыдущем вопросе: у типов вопросов NUMBER и TEXT может быть только один ответ", 0));
	}
	// в single-вопросах указан ровно один правильный ответ
	if(global_obj.cur_question_type == "SINGLE" && global_obj.cur_question_right_answers.length != 1){
		//alert("check_end_of_prev_question: 4")
		global_obj.errors.push(get_error("wrong_structure", "Неверные ответы в предыдущем вопросе: у типов вопросов SINGLE должен быть ровно один правильный ответ", 0));
	}
	// все ответы должны быть разные
	if ( ArrayCount(global_obj.cur_question_answers) > ArrayCount(ArraySelectDistinct(global_obj.cur_question_answers, "This")) ){
		//alert("check_end_of_prev_question: 5")
		global_obj.errors.push(get_error("wrong_structure", "Неверные ответы в предыдущем вопросе: все ответы должны быть разные", 0));
	}

	global_obj.cur_question_answers = [];
	global_obj.cur_question_right_answers = [];
}

function cell_exists(cell_code, cell_name){
	try{
		Trim(cell_code);
	} catch (e){
		global_obj.errors.push(get_error("wrong_structure", "Отсутствует " + cell_name + " ячейка", 3));
		return false;
	}
	return true;
}

try{
	global_obj.cur_row_num++;
	if ( !cell_exists('{[1]}', "первая") ){
		throw "Отсутствует первая ячейка";
	}
	// Смотрим, какая была предыдущая строка. Определяем, какой по структуре файла может быть текущая строка.
	
	//alert("global_obj.cur_section = " + global_obj.cur_section)
	//alert("global_obj.cur_row_num = " + global_obj.cur_row_num)
	
	switch (global_obj.cur_section){
		case "import_start":
			global_obj.cur_section = "Тест";
			// в первой ячйке должно быть слово "Тест"
			if (global_obj.cur_row_num == 1 && Trim('{[1]}') != "Тест" ){
				global_obj.errors.push(get_error("wrong_structure", "Первым должен идти раздел \"Тест\"", 1));
			}
			break;
		case "Тест":
			global_obj.cur_section = "Название теста";
			var section_name = Trim('{[1]}');
			// название теста не пустое
			if (section_name == ""){
				global_obj.errors.push(get_error("wrong_type", "Название теста не может быть пустым", 1));
			}
			// строка с названием теста не пропущена
			else if (section_name == "Тест" || section_name == "Раздел" || section_name == "Вопросы"){
				global_obj.errors.push(get_error("wrong_structure", "После строки со словом \"Тест\" должна идти строка с названием теста", 1));
				global_obj.cur_section = section_name;
				break;
			}
			if ( !cell_exists('{[2]}', "вторая") ){
				break;
			}
			if ( !cell_exists('{[3]}', "третья") ){
				break;
			}
			if ( !cell_exists('{[4]}', "четвертая") ){
				break;
			}
			// во второй ячейке - либо пусто, либо число (временное ограничение )
			if ( Trim('{[2]}') != "" ){
				try{
					Int(Trim('{[2]}'));
				} catch (e){
					global_obj.errors.push(get_error("wrong_type", "Поле \"Временное ограничение\" должно быть числом (или пустой строкой)", 2));
				}
			}
			// в третьей ячейке - либо пусто, либо число (количество попыток)
			if ( Trim('{[3]}') != "" ){
				try{
					Int(Trim('{[3]}'));
				} catch (e){
					global_obj.errors.push(get_error("wrong_type", "Поле \"Количество попыток\" должно быть числом (или пустой строкой)", 3));
				}
			}
			// в четвертой ячейке - либо пусто, либо число от 0 до 100 (проходной балл (%))
			if ( Trim('{[4]}') != "" ){
				try{
					_t = Int(Trim('{[4]}'));
					if (_t < 0 || _t > 100) throw "noooo"
				} catch (e){
					global_obj.errors.push(get_error("wrong_type", "Поле \"Проходной балл\" должно быть числом от 0 до 100 (или пустой строкой)", 4));
				}
			}
			// в пятой ячейке должен быть уникальный код
			try{
				_code = Trim('{[5]}');
				if (ArrayCount(XQuery("for $a in assessments where $a/code = '"+ _code + "' return $a"))>0) throw "noooo"
			} catch (e){
				global_obj.errors.push(get_error("wrong_type", "Поле \"Код теста\" должно содержать уникальный код теста", 5));
			}
			break;
		case "Название теста":
			global_obj.cur_section = "Раздел";
			// после строки с названием теста идет строка со словом "Раздел"
			if (Trim('{[1]}') != "Раздел" ){
				global_obj.errors.push(get_error("wrong_structure", "После строки с названием теста должна идти строка со словом \"Раздел\"", 1));
			}
			break;
		case "Раздел":
			global_obj.cur_section = "Название раздела";
			var section_name = Trim('{[1]}');
			// название раздела не пустое
			if (section_name == ""){
				global_obj.errors.push(get_error("wrong_type", "Название раздела не может быть пустым", 1));
			}
			// строка с названием раздела не пропущена
			else if (section_name == "Тест" || section_name == "Раздел" || section_name == "Вопросы"){
				global_obj.errors.push(get_error("wrong_structure", "После строки со словом \"Раздел\" должна идти строка с названием раздела", 1));
				global_obj.cur_section = section_name;
				break;
			}
			if ( !cell_exists('{[2]}', "вторая") ){
				break;
			}
			// во второй ячейке - либо пусто, либо число (сколько вопросов выдавать)
			if ( Trim('{[2]}') != "" ){
				try{
					Int(Trim('{[2]}'));
				} catch (e){
					global_obj.errors.push(get_error("wrong_type", "Поле \"Сколько вопросов выдавать\" должно быть числом (или пустой строкой)", 2));
				}
			}
			break;
		case "Название раздела":
			global_obj.cur_section = "Вопросы";
			// после строки с названием раздела идет строка со словом "Вопросы"
			if (Trim('{[1]}') != "Вопросы" ){
				global_obj.errors.push(get_error("wrong_structure", "После строки с названием раздела должна идти строка со словом \"Вопросы\"", 1));
			}
			break;
		case "Вопросы":
			global_obj.cur_section = "Название вопроса";
			var section_name = Trim('{[1]}');
			// название вопроса не пустое
			if (section_name == ""){
				global_obj.errors.push(get_error("wrong_type", "Название вопроса не может быть пустым", 1));
			}
			// строка с названием вопроса не пропущена
			else if (section_name == "Тест" || section_name == "Раздел" || section_name == "Вопросы"){
				global_obj.errors.push(get_error("wrong_structure", "После строки со словом \"Вопросы\" должна идти строка с названием вопроса", 1));
				global_obj.cur_section = section_name;
				break;
			}
			check_row_with_question();
			break;
		case "Название вопроса":
			// после названия вопроса может идти следующий вопрос, ответ (пустая ячейка) или Раздел
			switch (Trim('{[1]}')){
				case "Раздел":
					global_obj.cur_section = "Раздел";
					check_end_of_prev_question();
					break;
				case "":
					if ( !cell_exists('{[3]}', "третья") ){
						break;
					}
					if ( !cell_exists('{[4]}', "четвертая") ){
						break;
					}
					global_obj.cur_section = "Ответ";
					global_obj.cur_question_answers.push(Trim('{[3]}'));
					// правильные ответы кладем в список
					if (Trim('{[4]}') == "Y"){
						global_obj.cur_question_right_answers.push(Trim('{[3]}'));
					}
					break;
				default:
					global_obj.cur_section = "Название вопроса";
					check_end_of_prev_question();
					check_row_with_question();
			}
			break;
		case "Ответ":
			// после ответа может идти следующий вопрос, ответ (пустая ячейка) или Раздел
			switch (Trim('{[1]}')){
				case "Раздел":
					global_obj.cur_section = "Раздел";
					check_end_of_prev_question();
					break;
				case "":
					if ( !cell_exists('{[3]}', "третья") ){
						break;
					}
					if ( !cell_exists('{[4]}', "четвертая") ){
						break;
					}
					global_obj.cur_section = "Ответ";
					global_obj.cur_question_answers.push(Trim('{[3]}'));
					// правильные ответы кладем в список
					if (Trim('{[4]}') == "Y"){
						global_obj.cur_question_right_answers.push(Trim('{[3]}'));
					}
					break;
				default:
					global_obj.cur_section = "Название вопроса";
					check_end_of_prev_question();
					check_row_with_question();
			}
			break;
	}
	//alert("ArrayCount(global_obj.cur_question_answers) = " + ArrayCount(global_obj.cur_question_answers))
	//alert("ArrayCount(global_obj.cur_question_right_answers) = " + ArrayCount(global_obj.cur_question_right_answers))
	continueFlag = true;

} catch (e){
	_REPORT+="error\n";
	_REPORT += e;
	docReport.TopElem.completed = false;
	global_obj.errors.push(get_error("unknown_type", "Неизвестная ошибка", 0));
	breakFlag = true;
}