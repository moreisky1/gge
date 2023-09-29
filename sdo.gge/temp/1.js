function SlavaTypeConversion(oField, fldDef) {
    switch (fldDef.type) {
        case "radio":
        case "combo":
            oField.type = "select";
            var entry;
            oField.entries = new Array();
            for (entry in fldDef.entries)
                oField.entries.push(({ "name": RValue(entry.name), "value": RValue(entry.value) }));
            break;
        case "list":
            oField.type = "list";

            var entry;
            oField.entries = new Array();
            for (entry in fldDef.entries)
                oField.entries.push(({ "name": RValue(entry.name), "value": RValue(entry.value) }));

            if (DataType(oField.value) == "string") {
                oField.value = String(oField.value).split(";");
            }
            break;
        case "richtext":
            oField.type = "text";
            break;
        case "foreign_elem":
            if (oFieldDef.catalog != "resource") {
                oField.catalog = RValue(oFieldDef.catalog);
                break;
            }
        case "file":
            oField.type = "file";
            oField.catalog = "";
            break;
        case "heading":
            oField.type = "paragraph";
            oField.value = oField.label;
            break;
        case "object":
            oField.type = "string";
            break;
    }
}

function getCustomForm() {
    var fldReqFieldElem, oFieldDef, sFieldName, sValue, oForm = ({
        "command": "display_form",
        "title": "Дополнительные поля",
        "message": "Измените необходимые данные",
        "form_fields": ([])
    });

    for (fldReqFieldElem in ArraySelectByKey(global_settings.settings.required_fields, true, "is_custom"))
        if (fldReqFieldElem.is_web_edit.Value) {
            oFieldDef = custom_templates.collaborator.fields.GetOptChildByKey(fldReqFieldElem.name.Value);
            if (oFieldDef != undefined) {
                sFieldName = "custom_elems." + oFieldDef.name;

                oFieldDef = ({
                    "name": sFieldName,
                    "type": oFieldDef.type.Value,
                    "title": oFieldDef.title.Value,
                    "catalog": oFieldDef.catalog.Value,
                    "entries": ArrayExtract(oFieldDef.entries, '({"name": This.value.Value, "value": This.value.Value})')
                });

                sValue = "";

                oField = ({ "name": sFieldName, "label": oFieldDef.title, "type": oFieldDef.type, "value": sValue });

                SlavaTypeConversion(oField, oFieldDef);

                if (fldReqFieldElem.is_required) {
                    oField.mandatory = true;
                    oField.validation = "nonempty";
                }

                oForm.form_fields.push(oField);
            }
        }

    return oForm;
}
function doSave(aFields) {
    var sErrMsg = null;
    var sCommand = 'close_form';
    var oFld, bCustom, sName, fldField;

    if (global_settings.settings.eval_prev_registration_script && Trim(global_settings.settings.prev_registration_script) != "") {
        tools.safe_execution(global_settings.settings.prev_registration_script);
    }

    var docUser = tools.new_doc_by_name("collaborator", false);
    docUser.BindToDb(DefaultDb);

    for (oFld in aFields) {
        sName = oFld.name;
        bCustom = StrBegins(sName, "custom_elems.")
        bAccess = StrBegins(sName, "access.")
        if (bCustom) {
            sName = sName.slice(13);
        } else if (bAccess) {
            sName = sName.slice(7);
        }
        if (bCustom) {
            fldField = docUser.TopElem.custom_elems.ObtainChildByKey(sName);
            if (oFld.type == "file") {
                docResource = OpenNewDoc('x-local://wtv/wtv_resource.xmd');
                docResource.TopElem.person_id = docUser.DocID;
                tools.common_filling('collaborator', docResource.TopElem, docUser.DocID, docUser.TopElem);
                docResource.BindToDb();
                docResource.TopElem.put_data(oFld.url, docUser.TopElem);
                docResource.TopElem.file_name = oFld.value;
                docResource.TopElem.name = oFld.value;
                docResource.Save();
                fldField.value = docResource.DocID;
            }
            else { fldField.value = oFld.value; }
        }
        else if (docUser.TopElem.ChildExists(sName)) {
            fldField = docUser.TopElem.Child(sName);
            if (sName == 'login') {
                if (ArrayOptFirstElem(XQuery("for $elem in collaborators where $elem/login = " + XQueryLiteral(oFld.value) + " return $elem/Fields('id')")) == undefined) {
                    fldField.Value = oFld.value;
                } else {
                    sErrMsg += 'Такой логин уже существует';
                    sCommand = "alert";
                }
            } if (sName == 'email') {
                if (ArrayOptFirstElem(XQuery("for $elem in collaborators where $elem/email = " + XQueryLiteral(oFld.value) + " return $elem/Fields('id')")) == undefined) {
                    fldField.Value = oFld.value;
                } else {
                    sErrMsg += 'Пользователь с таким email уже существует';
                    sCommand = "alert";
                }
            } else {
                switch (oFld.type) {
                    case "real": fldField.Value = OptReal(oFld.value, null); break;
                    case "integer": fldField.Value = OptInt(oFld.value, null); break;
                    case "date": fldField.Value = OptDate(oFld.value, null); break;
                    case "bool": fldField.Value = (oFld.value == true); break;
                    default: fldField.Value = oFld.value; break;
                }
            }
        } else if (bAccess) {
            docUser.TopElem.access.Child(sName).Value = oFld.value;
        }
    }

    if (global_settings.settings.eval_post_registration_script && Trim(global_settings.settings.post_registration_script) != "")
        tools.safe_execution(global_settings.settings.post_registration_script);

    var docPosition = tools.new_doc_by_name("position", false);

    oFld = ArrayOptFindByKey(aFields, "self_position_name", "name");
    docPosition.TopElem.name = UnifySpaces(oFld.value);

    docPosition.TopElem.basic_collaborator_id = docUser.DocID;

    tools.common_filling('collaborator', docPosition.TopElem, docUser.DocID, docUser.TopElem);

    docPosition.BindToDb(DefaultDb);
    if (docUser.TopElem.access.access_role == 'expert_gge') {//присвоение типовой должности для эксперта
	docPosition.TopElem.position_common_id = OptInt(7180353139707763433);} 

    if (docUser.TopElem.access.access_role == 'corporate_customer_gge') {//присвоение типовой должности для корпоративного заказчика обучения
	docPosition.TopElem.position_common_id = OptInt(7201024672507697802);} 

    docPosition.Save();

    docUser.TopElem.position_id = docPosition.DocID;
    docUser.TopElem.position_name = docPosition.TopElem.name;
    docUser.TopElem.org_id = docPosition.TopElem.org_id;
    docUser.TopElem.org_name = tools.get_foreign_field(docPosition.TopElem.org_id, 'disp_name', global_settings.object_deleted_str);

    //создание задачи заполнения информации в личном кабинете
    taskDoc = OpenNewDoc('x-local://wtv/wtv_task.xmd');
    taskDoc.BindToDb( DefaultDb );
    taskDoc.TopElem.code = '00000';
    taskDoc.TopElem.name = 'Заполнить данные в личном кабинете';
    taskDoc.TopElem.executor_type = 'collaborator';
    taskDoc.TopElem.executor_id = OptInt(docUser.TopElem.id);
    taskDoc.TopElem.status = 'r';
    taskDoc.TopElem.task_type_id = OptInt(6895625962863611538);
    taskDoc.TopElem.start_date_plan = Date();
    taskDoc.TopElem.end_date_plan = Date();
    taskDoc.TopElem.desc = 'Пожалуйста, заполните все поля в <a style="margin: 0px; transition:color 0.3s; text-align: inherit; color: rgb(157, 34, 53); line-height: inherit; font-size: inherit; font-weight: inherit; text-decoration: none; vertical-align: inherit; display: inline-flex; position: relative; box-sizing: border-box; align-items: center; background-color: transparent;" href="https://sdo.gge.ru/_wt/gge_cabinet_external">личном кабинете</a>&nbsp;на вкладке &quot;Общие сведения&quot; и &quot;Дополнительная информация&quot;.';
    taskDoc.Save();
    
    if (sErrMsg == null) {
        if (global_settings.settings.web_banned_self_register.Value) {
            docUser.TopElem.access.web_banned = true;
            sErrMsg = tools_web.get_web_const('uc_message1', curLngWeb);
        }

        docUser.Save();

        if (global_settings.settings.self_register_group_id.HasValue) {
            try {
                var docGroup = OpenDoc(UrlFromDocID(global_settings.settings.self_register_group_id));
                var fldCollaboratorChild = docGroup.TopElem.collaborators.AddChild();
                fldCollaboratorChild.collaborator_id = docUser.DocID;
                docGroup.Save();
            }
            catch (_x_) { }
        }
    }

    RESULT = ({
        command: sCommand,
        msg: (sErrMsg == null ? "Регистрация пройдена успешно, войдите на портал с использованием выбранного логина/пароля" : sErrMsg)
    });
}

function fillingObjectRole(object) {
    var roles = ArraySelect(ArrayDirect(access_roles.access_role), 'StrEnds(id, "_gge", true)');
    for (var i = 0; i < ArrayCount(roles); i++) {
        object.entries.push({ 'name': roles[i].name.Value, "value": roles[i].id.Value })
    }
}


function mainForm_CHECK(aFields) {
    if (!global_settings.settings.eval_post_registration_script || !global_settings.settings.script_create_login) {
        var login = ArrayOptFindByKey(aFields, 'login', 'name');
        if (login == undefined || login.value == '') {
            return ({
                command: "alert",
                msg: StrReplace(tools_web.get_web_const('vc_mess_no_field', curLngWeb), "{PARAM1}", "Логин")
            });
        }
        if (ArrayOptFirstElem(XQuery("for $elem in collaborators where $elem/login = " + XQueryLiteral(login.value) + " return $elem/Fields('id')")) != undefined) {
            return ({
                command: "alert",
                msg: tools_web.get_web_const('uc_error1', curLngWeb)
            });
        }
    }

    if (!global_settings.settings.eval_post_registration_script || !global_settings.settings.script_create_password) {
        var pass = ArrayOptFindByKey(aFields, 'password', 'name');
        if (pass == undefined || pass.value == '') {
            return ({
                command: "alert",
                msg: StrReplace(tools_web.get_web_const('vc_mess_no_field', curLngWeb), "{PARAM1}", "Пароль")
            });
        }

        var passConf = ArrayOptFindByKey(aFields, 'password_confirm', 'name');
        if (passConf == undefined || passConf.value != pass.value) {
            return ({
                command: "alert",
                msg: tools_web.get_web_const('parolinesovpad', curLngWeb)
            });
        }
        if (global_settings.settings.pass_validation_formula.HasValue) {
            try {
                if (SafeEval(global_settings.settings.pass_validation_formula.Value, ([({ "PASSWORD": pass.value, "curUser": null, "curUserID": null })])) !== true) {
                    return ({
                        command: "alert",
                        msg: tools_web.get_web_const('nekorrektnyypa', curLngWeb)
                    });
                    badPassword = tools_web.get_web_const('nekorrektnyypa', curLngWeb);
                }
            }
            catch (_X_) {
                return ({
                    command: "alert",
                    msg: tools_web.get_web_const('oshibkavformule', curLngWeb)
                });
            }
        }
    }

    return null;
}

try {
    curLngWeb;
    throw "error";
}
catch (ex) {
    curLngWeb = lngs.GetChildByKey(global_settings.settings.default_lng.Value).items;
}

if (!global_settings.settings.allow_self_register.Value) {
    RESULT = ({
        command: "alert",
        msg: "Саморегистрация недоступна"
    });
}
else {
    var nextCommand, oFormFields = new Array();
    switch (command) {
        case "eval":
            if (DispLicense == true) {
                RESULT = ({
                    command: "display_form",
                    title: tools_web.get_web_const('polzovatelskoe', curLngWeb),
                    form_fields: [
                        { "name": "__next", "type": "hidden", "value": "first_form" },
                        { "name": "license_text", "type": "paragraph", "label": "", "value": LicenseRichText },
                        { "name": "license_confirm", "type": "bool", "label": tools_web.get_web_const('prinimayuuslovi', curLngWeb), "value": LicenseRichText, "mandatory": true, "validation": "nonempty" },
                    ]
                });

                break;
            }
            else {
                nextCommand = "first_form";
                form_fields = "";
            }
        case "submit_form":

            if (form_fields != "") {
                try {
                    oFormFields = ParseJson(form_fields);
                    nextCommand = ArrayOptFindByKey(oFormFields, "__next", "name").value;
                }
                catch (_x_) {
                }
            }

            switch (nextCommand) {
                case "first_form":

                    if (DispLicense == true) {
                        var licOK = false;
                        try {
                            licOK = ArrayOptFindByKey(oFormFields, "license_confirm", "name").value == true;
                        }
                        catch (_e_) {
                        }

                        if (!licOK) {
                            RESULT = ({
                                command: "alert",
                                msg: "Требуется согласие с лицензией"
                            });
                            break;
                        }
                    }

                    RESULT = ({
                        command: "display_form",
                        title: "Личные данные",
                        form_fields: [
                            { "name": "__next", "type": "hidden", "value": (global_settings.settings.self_register_disp_custom_elems ? "custom_form" : "save") },
                            { "name": "lastname", "type": "string", "label": ("Фамилия"), "mandatory": true, "validation": "nonempty" },
                            { "name": "firstname", "type": "string", "label": ("Имя"), "mandatory": true, "validation": "nonempty" },
                            { "name": "middlename", "type": "string", "label": "Отчество" },
                            { "name": "sex", "type": "select", "label": "Пол", "entries": [{ "name": "Мужской", "value": "m" }, { "name": "Женский", "value": "w" }] },
                            { "name": "birth_date", "type": "date", "label": "Дата рождения" },
                        ]
                    });

                    if (!global_settings.settings.eval_post_registration_script || !global_settings.settings.script_create_login) {
                        RESULT.form_fields.push(({ "name": "login", "type": "string", "label": ("Логин"), "mandatory": true, "validation": "nonempty" }));
                    }
                    if (!global_settings.settings.eval_post_registration_script || !global_settings.settings.script_create_password) {
                        RESULT.form_fields.push(({ "name": "password", "type": "string", "label": ("Пароль"), "mandatory": true, "validation": "nonempty" }));
                        RESULT.form_fields.push(({ "name": "password_confirm", "type": "string", "label": ("Подтверждение пароля"), "mandatory": true, "validation": "nonempty" }));
                    }

                    // if (global_settings.settings.self_register_disp_subs.Value)
                    // {
                    //     RESULT.form_fields.push(({ "name": "self_subdivision_id", "type": "foreign_elem", "label": ("Подразделение"), "mandatory": true, "validation": "nonempty", "catalog": "subdivision" }));
                    //     if (global_settings.settings.self_register_use_position_commons.Value)
                    //         RESULT.form_fields.push(({ "name": "self_position_common_id", "type": "foreign_elem", "label": ("Должность"), "mandatory": true, "validation": "nonempty", "catalog": "position_common" }));
                    //     else
                    //         RESULT.form_fields.push(({ "name": "self_position_name", "type": "string", "label": ("Должность"), "mandatory": true, "validation": "nonempty" }));
                    // }

                    RESULT.form_fields.push(({ "name": "self_position_name", "type": "string", "label": ("Должность"), "mandatory": true, "validation": "nonempty" }));

                    var oField, fldRequiredField = global_settings.settings.required_fields.GetOptChildByKey('email');
                    if (fldRequiredField != undefined && fldRequiredField.is_web_edit) {
                        oField = ({ "name": "email", "type": "string", "label": "E-mail" });
                        if (fldRequiredField.is_required) {
                            oField.SetProperty("mandatory", true);
                            oField.SetProperty("validation", "nonempty");
                        }
                        RESULT.form_fields.push(oField);
                    }

                    fldRequiredField = global_settings.settings.required_fields.GetOptChildByKey('phone');
                    if (fldRequiredField != undefined && fldRequiredField.is_web_edit) {
                        oField = ({ "name": "phone", "type": "string", "label": "Телефон" });
                        if (fldRequiredField.is_required) {
                            oField.SetProperty("mandatory", true);
                            oField.SetProperty("validation", "nonempty");
                        }
                        RESULT.form_fields.push(oField);
                    }

                    var object = { "name": "access.access_role", "type": "select", "mandatory": true, "label": "Цель регистрации", "entries": [] }
                    fillingObjectRole(object);
                    RESULT.form_fields.push(object)

                    break;
                case "custom_form":

                    RESULT = mainForm_CHECK(oFormFields);
                    if (RESULT == null) {
                        RESULT = getCustomForm();
                        var page1
                        for (page1 in ArraySelect(oFormFields, "StrBegins(This.name, '__page')"))
                            RESULT.form_fields.push(page1);

                        RESULT.form_fields.push(({ "name": "__page_custom_prev", "type": "hidden", "value": UrlEncode(EncodeJson(ArraySelect(oFormFields, "!StrBegins(This.name, '__')"))) }));
                        RESULT.form_fields.push(({ "name": "__next", "type": "hidden", "value": "save" }));
                    }

                    break;
                case "save":
                    var page1, bOk = true;

                    var saveFields = [];
                    for (page1 in ArraySelect(oFormFields, "StrBegins(This.name, '__page')")) {
                        if (page1 != undefined && page1.value != "") {
                            try {
                                saveFields = ArrayUnion(saveFields, ParseJson(UrlDecode(page1.value)));
                            }
                            catch (_o_) {
                                bOk = false;
                                RESULT = ({
                                    command: "alert",
                                    msg: "Ошибка данных формы"
                                });
                                break;
                            }
                        }
                    }
                    saveFields = ArrayUnion(saveFields, ArraySelect(oFormFields, "!StrContains(This.name, '__')"));

                    if (bOk) {
                        var saveResult = doSave(saveFields);
                    }

                    break;
                default:
                    RESULT = ({
                        command: "alert",
                        msg: "Ошибка данных формы"
                    });
                    break;
            }
            break;
    }
}