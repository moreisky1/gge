function parse_form_fields(sFormFields) {
    var arrFormFields = undefined;
    try {
        arrFormFields = ParseJson(sFormFields);
    } catch (e) {
        arrFormFields = [];
    }

    return arrFormFields;
}

function get_form_field(oFields, sName) {
    var catElem = ArrayOptFind(oFields, "This.name == sName");

    return catElem == undefined ? "" : catElem.value;
}

function DeleteResource(id) {
    var iResourceID = OptInt(id);
    var dFile = tools.open_doc(iResourceID);

    if (dFile != undefined && ArrayOptFirstElem(dFile.TopElem.links) == undefined) {
        try {
            DeleteDoc(UrlFromDocID(dFile.TopElem.id.Value));
        } catch (e) {
            alert("DeleteResource | " + e);
        }
    }

    return true;
}

function SaveFileInResource(oFile, iPersonID, tePerson) {
    var iPath = null;

    if (oFile != undefined && oFile.HasProperty("url") && oFile.url != "") {
        docResource = OpenNewDoc('x-local://wtv/wtv_resource.xmd');
        docResource.TopElem.person_id = iPersonID;
        tools.common_filling('collaborator', docResource.TopElem, iPersonID, tePerson);
        docResource.BindToDb();
        docResource.TopElem.put_data(oFile.url);
        docResource.Save();

        iPath = docResource.DocID;
    }

    return iPath;
}


try {
    logName = "gge_cabinet_external";
    EnableLog(logName, true);
    var docUser = tools.open_doc(curUserID);
    LogEvent(logName, "docUser.TopElem.fullname = " + docUser.TopElem.fullname);
    if (docUser != undefined) {
        var teUser = docUser.TopElem;
        var oFormFields = parse_form_fields(SCOPE_WVARS.GetOptProperty("form_fields"));
    
        // Поля с прикрепляемыми файлами 
        var aFieldFileRequired = [
            "educ_scan",
            "educ_decl",
            "educ_change_name",
            "educ_pass",
            "snils_scan",
            "other"
        ];
    
        // Кастомные поля
        // Обязательные для заполнения!
        var aFieldCustomRequired = [
            "self_reg_org",
            "educ_level",
            "self_reg_pos",
            "snils",
            "fio_dat",
            "user_ind",
            "city",
            "building",
            "direction",
            "cur_status",
            "datа_is_not"
        ];
    
        // Кастомные поля
        // НЕобязательные для заполнения!
        var aFieldCustom = [
            "date_certification",
            "attestat",
            "data_is_not"
        ];
    
        teUser.lastname = (get_form_field(oFormFields, "fld_lastname")) ? get_form_field(oFormFields, "fld_lastname") : teUser.lastname;
        teUser.firstname = (get_form_field(oFormFields, "fld_firstname")) ? get_form_field(oFormFields, "fld_firstname") : teUser.firstname;
        teUser.middlename = get_form_field(oFormFields, "fld_middlename");
        teUser.sex = get_form_field(oFormFields, "fld_sex");
        teUser.email = get_form_field(oFormFields, "fld_email");
        teUser.phone = get_form_field(oFormFields, "fld_phone");
        
        docPosition = tools.open_doc(teUser.position_id);
        docPosition.TopElem.position_common_id = OptInt(7180353139707763433);
        docPosition.TopElem.org_id = (OptInt(get_form_field(oFormFields, "fld_orgs"))) ? (OptInt(get_form_field(oFormFields, "fld_orgs"))) : docPosition.TopElem.org_id;
        docPosition.TopElem.name = get_form_field(oFormFields, "fld_position");
        docPosition.Save();
    
        var dBirthDate = OptDate(get_form_field(oFormFields, "fld_birthdate"));
        teUser.birth_date = dBirthDate != undefined ? StrDate(dBirthDate, false, false) : teUser.birth_date;
    
        var field, bate;
    
        for (sField in aFieldCustomRequired) {
            field = get_form_field(oFormFields, "fld_" + sField);
            if (StrContains(sField, 'date', true)) {
                teUser.custom_elems.ObtainChildByKey(sField).value = OptDate(field) != undefined ? StrDate(OptDate(field), false, false) : teUser.custom_elems.ObtainChildByKey(sField).value;
            } else {
                teUser.custom_elems.ObtainChildByKey(sField).value = (field) ? field : teUser.custom_elems.ObtainChildByKey(sField).value;
              if (docUser.TopElem.access.access_role == 'expert_gge') {//проверка заполнения обязательных кастомных полей для эксперта
            _check = true;
            if (docUser.TopElem.org_id == '') {_check = false;} //проверка выбора организации
            if (docUser.TopElem.position_name == '') {_check = false;} //проверка указания должности
            if (teUser.custom_elems.ObtainChildByKey('direction').value == '') {_check = false;} //проверка выбора направления
            if (teUser.custom_elems.ObtainChildByKey('cur_status').value == '') {_check = false;} //проверка выбора статуса
            if (_check) //если проверки пройдены
                    {
                        _tasks = XQuery('for $elem in tasks where $elem/executor_id=' + teUser.id + ' return $elem'); //выбор задач пользователя
                        for (_userTasks in _tasks) { //обход задач пользователя
                            if (_userTasks.code == '00000') { //если код задачи 00000 - это внесение информации в личном кабинете
                                DocTask =  DeleteDoc( UrlFromDocID( _userTasks.id ) );
                                //DocTask.TopElem.status = '1'; //закрытие задачи
                                
                            }
                        }
                    }
            } 
              if (docUser.TopElem.access.access_role == 'corporate_customer_gge') {//проверка заполнения обязательных кастомных полей для корпоративного заказчика обучения
            _check = true;
            if (docUser.TopElem.org_id == '') {_check = false;} //проверка выбора организации
            if (docUser.TopElem.position_name == '') {_check = false;} //проверка указания должности
            if (teUser.custom_elems.ObtainChildByKey('educ_level').value == '') {_check = false;} //проверка выбора уровня образования
            if (teUser.custom_elems.ObtainChildByKey('educ_scan').value == '') {_check = false;} //проверка наличия скана об образовании
            if (teUser.custom_elems.ObtainChildByKey('educ_decl').value == '') {_check = false;} //проверка наличия скана заявления о зачислении
            if (teUser.custom_elems.ObtainChildByKey('educ_pass').value == '') {_check = false;} //проверка наличия скана паспорта
            if (teUser.custom_elems.ObtainChildByKey('snils').value == '') {_check = false;} //проверка наличия номера СНИЛС
            if (teUser.custom_elems.ObtainChildByKey('snils_scan').value == '') {_check = false;} //проверка наличия скана СНИЛС
            if (teUser.custom_elems.ObtainChildByKey('fio_dat').value == '') {_check = false;} //проверка указания ФИО в дательном падеже
            if (teUser.custom_elems.ObtainChildByKey('user_ind').value == '') {_check = false;} //проверка указания индекса
            if (teUser.custom_elems.ObtainChildByKey('city').value == '') {_check = false;} //проверка указания города
            if (teUser.custom_elems.ObtainChildByKey('building').value == '') {_check = false;} //проверка указания улицы, номера дома, квартиры
            if (_check) //если проверки пройдены
                    {
                        _tasks = XQuery('for $elem in tasks where $elem/executor_id=' + teUser.id + ' return $elem'); //выбор задач пользователя
                        for (_userTasks in _tasks) { //обход задач пользователя
                            if (_userTasks.code == '00000') { //если код задачи 00000 - это внесение информации в личном кабинете
                                DocTask =  DeleteDoc( UrlFromDocID( _userTasks.id ) );
                                //DocTask.TopElem.status = '1'; //закрытие задачи
                                
                            }
                        }
                    }
            } 
            if (sField == "direction") // если пользователь выбрал направление, то ему прописывается значение карты знаний, соответствующее направлению
            {
            _knowledge_parts = XQuery("knowledge_parts");
            for (_knowledge_part in _knowledge_parts)
                {
                    if ( OptInt(teUser.custom_elems.ObtainChildByKey(sField).value) == OptInt(_knowledge_part.id) ) 
                        {
                            _Userkp = [];
                            _UserkpArr = tools.get_knowledge_parts_by_person_id(teUser.id);
                            _kpExist = false;
                            for (_Userkp in _UserkpArr)
                            {
                                if ( OptInt(_Userkp.id) == OptInt(teUser.custom_elems.ObtainChildByKey(sField).value) )
                                {_kpExist = true;}
                            }
                            _length = 0;
                            for (_elem in teUser.knowledge_parts)
                            {
                                _length = _length+1;	
                            }
                            if (!_kpExist) 
                            {
                                teUser.knowledge_parts.AddChild();
                                teUser.knowledge_parts[_length].knowledge_part_id = _knowledge_part.id;
                                teUser.knowledge_parts[_length].knowledge_part_name = _knowledge_part.name;
                            }
                        }
                }
            }
            }
        }
    
        for (sField in aFieldCustom) {
            if (StrContains(sField, 'date', true)) {
                field = get_form_field(oFormFields, "fld_" + sField);
    
                if (OptDate(field) != undefined) {
                    teUser.custom_elems.ObtainChildByKey(sField).value = StrDate(OptDate(field), false, false);
                } else if (field == '') {
                    teUser.custom_elems.ObtainChildByKey(sField).value = '';
                }
            } else {
                teUser.custom_elems.ObtainChildByKey(sField).value = get_form_field(oFormFields, "fld_" + sField);
            }
        }
    
        for (sField in aFieldFileRequired) {
            oFileTemp = ArrayOptFind(oFormFields, "This.name == 'fld_" + sField + "'");
            iFileTemp = SaveFileInResource(oFileTemp, curUserID, teUser);
    
            if (iFileTemp != null) {
                iFileOld = teUser.custom_elems.ObtainChildByKey(sField).value;
                if (iFileOld != "") DeleteResource(iFileOld);
    
                teUser.custom_elems.ObtainChildByKey(sField).value = iFileTemp;
            }
        }
    
        docUser.Save();
        RESULT = {
            command: "alert",
            msg: 'Данные успешно сохранены'
        };
    }
} catch(err) {
    LogEvent(logName, ExtractUserError(err));
} finally {
    EnableLog(logName, false);
}
