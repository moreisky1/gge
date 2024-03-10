// 7332186538162079861 - Персонал / Саморегистрация для ЦВК

var dlib = gge.getLib("develop");

function SlavaTypeConversion(oField, fldDef)
{
    switch(fldDef.type)
    {
        case "radio":
        case "combo":
            oField.type = "select";

            var entry;
            oField.entries = new Array();
            for (entry in fldDef.entries)
                oField.entries.push(({"name": RValue(entry.name), "value": RValue(entry.value)}));
            break;
        case "list":
            oField.type = "list";

            var entry;
            oField.entries = new Array();
            for (entry in fldDef.entries)
                oField.entries.push(({"name": RValue(entry.name), "value": RValue(entry.value)}));
            
            if (DataType(oField.value) == "string")
            {
                oField.value = String(oField.value).split(";");
            }
            break;
        case "richtext":
            oField.type = "text";
            break;
        case "foreign_elem":
            if ( oFieldDef.catalog != "resource" )
            {
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

function getCustomForm()
{
    var fldReqFieldElem, oFieldDef, sFieldName, sValue, oForm = ({
            "command": "display_form",
            "title": "Дополнительные поля",
            "message": "Измените необходимые данные",
            "form_fields": ([])
    });
    
    for ( fldReqFieldElem in ArraySelectByKey( global_settings.settings.required_fields, true, "is_custom" ) )
        if ( fldReqFieldElem.is_web_edit.Value)
        {
            oFieldDef = custom_templates.collaborator.fields.GetOptChildByKey(fldReqFieldElem.name.Value);
            if (oFieldDef != undefined)
            {
                sFieldName = "custom_elems." + oFieldDef.name;
                
                oFieldDef = ({
                    "name": sFieldName,
                    "type": oFieldDef.type.Value,
                    "title": oFieldDef.title.Value,
                    "catalog": oFieldDef.catalog.Value,
                    "entries": ArrayExtract(oFieldDef.entries, '({"name": This.value.Value, "value": This.value.Value})')
                });
                /*
                sValue = curUser.custom_elems.GetOptChildByKey(oFieldDef.name);
                if (sValue != undefined)
                {
                    sValue = sValue.value.Value
                    
                    if (oFieldDef.type == "date")
                    {
                        if (sValue != "")
                        {
                            sValue = OptDate(sValue);
                            if (sValue != undefined)
                                sValue = StrXmlDate(sValue);
                        }
                    }
                    else if(oFieldDef.type == "bool")
                    {
                        sValue = (sValue == "true" || sValue == "1");
                    }
                }
                else
                */
                    sValue = "";
                
                oField = ({ "name": sFieldName, "label": oFieldDef.title, "type": oFieldDef.type, "value": sValue});
                
                SlavaTypeConversion(oField, oFieldDef);
                
                if (fldReqFieldElem.is_required)
                {
                    oField.mandatory = true;
                    oField.validation = "nonempty";
                }
                
                oForm.form_fields.push(oField);
                
            }
        }
    oForm = {};
    return oForm;
}

function getValidEmail(email) {
    var validEmail = "";
    var pattern = '^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})$';
    var objRegExp = dlib.getRegExp(pattern);
    if (objRegExp.Test(email)) {
        if (StrEnds(email, "gmail.ru", true)) {
            validEmail = StrReplace(email, "gmail.ru", "gmail.com");
        } else if (StrEnds(email, ".rzd", true)) {
            validEmail = StrReplace(email, ".rzd", ".rzd.ru");
        } else {
            validEmail = email;
        }
    }
    return validEmail;
}


function doSave(aFields)
{
    var sErrMsg = null;
    var sCommand = 'close_form';
    var oFld, bCustom, sName, fldField;
    
    if ( global_settings.settings.eval_prev_registration_script && Trim( global_settings.settings.prev_registration_script ) != "" )
        tools.safe_execution( global_settings.settings.prev_registration_script );
    
    var docUser = tools.new_doc_by_name("collaborator", false);
    
    docUser.BindToDb(DefaultDb);
    
    for (oFld in aFields)
    {
        sName = oFld.name;
        if ((bCustom = StrBegins(sName, "custom_elems.")))
        {
            sName = sName.slice(13);
        }
        
        if (bCustom)
        {
            fldField = docUser.TopElem.custom_elems.ObtainChildByKey(sName);
            if ( oFld.type == "file" )
            {
                docResource = OpenNewDoc( 'x-local://wtv/wtv_resource.xmd' );
                docResource.TopElem.person_id = docUser.DocID;
                tools.common_filling( 'collaborator', docResource.TopElem, docUser.DocID, docUser.TopElem );
                docResource.BindToDb();
                docResource.TopElem.put_data( oFld.url, docUser.TopElem );
                docResource.TopElem.file_name = oFld.value;
                docResource.TopElem.name = oFld.value;
                docResource.Save();
                fldField.value = docResource.DocID;
            }
            else
            {
                fldField.value = oFld.value;
            }
        }
        else if (docUser.TopElem.ChildExists(sName))
        {
            fldField = docUser.TopElem.Child(sName);
            if (sName == 'login') {
                if (ArrayOptFirstElem(XQuery("for $elem in collaborators where $elem/login = " + XQueryLiteral(oFld.value) + " return $elem/Fields('id')")) == undefined) {
                    fldField.Value = oFld.value;
                } else {
                    sErrMsg += 'Такой логин уже существует<br>';
                    sCommand = "alert";
                }
            } if (sName == 'email') {
                if (ArrayOptFirstElem(XQuery("for $elem in collaborators where $elem/email = " + XQueryLiteral(oFld.value) + " return $elem/Fields('id')")) == undefined) {
                    
                    if (getValidEmail(oFld.value) != "") {
                        fldField.Value = getValidEmail(oFld.value);
                    } else {
                        sErrMsg += 'email не валидный';
                        sCommand = "alert";
                    }
                    fldField.Value = oFld.value
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
        }
    
    }
    
    if ( global_settings.settings.eval_post_registration_script && Trim( global_settings.settings.post_registration_script ) != "" )
        tools.safe_execution( global_settings.settings.post_registration_script );
    
    if (global_settings.settings.self_register_disp_subs.Value)
    {
        oFld = ArrayOptFindByKey(aFields, "self_subdivision_id", "name");
        
        var catSub = ArrayOptFirstElem(XQuery("for $elem in subdivisions where $elem/id = " + OptInt(oFld.value,0) + " return $elem/Fields('id','name','org_id')"));
        if (catSub == undefined)
        {
            sErrMsg = tools_web.get_web_const('oshibkanemoguop', curLngWeb);
        }
        else
        {
            var docPosition = tools.new_doc_by_name("position", false);
            
            if (global_settings.settings.self_register_use_position_commons.Value)
            {
                oFld = ArrayOptFindByKey(aFields, "self_position_common_id", "name");
                oFld = ArrayOptFirstElem(XQuery("for $elem in position_commons where $elem/id = " + OptInt(oFld.value, 0) + " return $elem/Fields('id','name')"));
                
                docPosition.TopElem.name = oFld.name.Value;
                docPosition.TopElem.position_common_id = oFld.id;
            }
            else
            {
                oFld = ArrayOptFindByKey(aFields, "self_position_name", "name");
                docPosition.TopElem.name = UnifySpaces(oFld.value);
            }
            
            docPosition.TopElem.parent_object_id = catSub.id;
            docPosition.TopElem.org_id = catSub.org_id;
                
            docPosition.TopElem.basic_collaborator_id = docUser.DocID;
            
            tools.common_filling('collaborator', docPosition.TopElem, docUser.DocID, docUser.TopElem);
            
            docPosition.BindToDb(DefaultDb);
            docPosition.Save();
            
            docUser.TopElem.position_id = docPosition.DocID;
            docUser.TopElem.position_name = docPosition.TopElem.name;
            docUser.TopElem.position_parent_id = docPosition.TopElem.parent_object_id;
            docUser.TopElem.position_parent_name = catSub.name;
            docUser.TopElem.org_id = docPosition.TopElem.org_id;
            docUser.TopElem.org_name = tools.get_foreign_field(docPosition.TopElem.org_id, 'disp_name', global_settings.object_deleted_str );
        }
    }
    
    
    if (sErrMsg == null)
    {
        if (global_settings.settings.web_banned_self_register.Value)
        {
            docUser.TopElem.access.web_banned = true;
            sErrMsg = tools_web.get_web_const('uc_message1', curLngWeb);
        }
        
        
        docUser.Save();
        
        
        if (global_settings.settings.self_register_group_id.HasValue)
        {
            try
            {
                var docGroup = OpenDoc(UrlFromDocID(global_settings.settings.self_register_group_id));
                var fldCollaboratorChild = docGroup.TopElem.collaborators.AddChild();
                fldCollaboratorChild.collaborator_id = docUser.DocID;
                docGroup.Save();
            }
            catch(_x_)
            {}
        }
        
        
        
    }
    
    RESULT = ({
        command: sCommand,
        msg: (sErrMsg == null ? "Регистрация пройдена успешно, войдите на портал с использованием выбранного логина/пароля" : sErrMsg)
    });
}

function mainForm_CHECK(aFields)
{
    if ( ! global_settings.settings.eval_post_registration_script || ! global_settings.settings.script_create_login )
    {
        var login = ArrayOptFindByKey(aFields, 'login', 'name');
        if (login == undefined || login.value == '')
        {
            return ({
                command: "alert",
                msg: StrReplace(tools_web.get_web_const('vc_mess_no_field', curLngWeb), "{PARAM1}", "Логин")
            });
        }
        if ( ArrayOptFirstElem( XQuery( "for $elem in collaborators where $elem/login = " + XQueryLiteral(login.value) + " return $elem/Fields('id')" ) ) != undefined )
        {
            return ({
                command: "alert",
                msg: tools_web.get_web_const( 'uc_error1', curLngWeb )
            });
        }
    }
    
    if ( ! global_settings.settings.eval_post_registration_script || ! global_settings.settings.script_create_password )
    {
        var pass = ArrayOptFindByKey(aFields, 'password', 'name');
        if (pass == undefined || pass.value == '')
        {
            return ({
                command: "alert",
                msg: StrReplace(tools_web.get_web_const('vc_mess_no_field', curLngWeb), "{PARAM1}", "Пароль")
            });
        }
        
        var passConf = ArrayOptFindByKey(aFields, 'password_confirm', 'name');
        if (passConf == undefined || passConf.value != pass.value)
        {
            return ({
                command: "alert",
                msg: tools_web.get_web_const( 'parolinesovpad', curLngWeb )
            });
        }
        if (global_settings.settings.pass_validation_formula.HasValue)
        {
            try
            {
                if (SafeEval(global_settings.settings.pass_validation_formula.Value, ([({"PASSWORD": pass.value, "curUser": null, "curUserID": null})])) !== true)
                {
                    return ({
                        command: "alert",
                        msg: tools_web.get_web_const( 'nekorrektnyypa', curLngWeb )
                    });
                    badPassword = tools_web.get_web_const( 'nekorrektnyypa', curLngWeb );
                }
            }
            catch(_X_)
            {
                return ({
                    command: "alert",
                    msg: tools_web.get_web_const( 'oshibkavformule', curLngWeb )
                });
            }
        }
    }
    
    return null;
}

try
{
    curLngWeb;
    throw "error";
}
catch( ex )
{
    curLngWeb = lngs.GetChildByKey( global_settings.settings.default_lng.Value ).items;
}

if (!global_settings.settings.allow_self_register.Value)
{
    RESULT = ({
        command: "alert",
        msg: "Саморегистрация недоступна"
    });
}
else
{
    var nextCommand, oFormFields = new Array();
    switch (command)
    {
        case "eval":
            if (DispLicense == true)
            {
                RESULT = ({
                    command: "display_form",
                    title: tools_web.get_web_const( 'polzovatelskoe', curLngWeb ),
                    form_fields:[
                        {"name": "__next", "type": "hidden", "value": "first_form"},
                        {"name": "license_text", "type": "paragraph", "label": "", "value": LicenseRichText},
                        {"name": "license_confirm", "type": "bool", "label": tools_web.get_web_const('prinimayuuslovi', curLngWeb ), "value": LicenseRichText, "mandatory": true, "validation": "nonempty"},
                    ]
                });
                
                break;
            }
            else
            {
                nextCommand = "first_form";
                form_fields = "";
            }
        case "submit_form":

            if (form_fields != "")
            {
                try
                {
                    oFormFields = ParseJson( form_fields );
                    nextCommand = ArrayOptFindByKey(oFormFields, "__next", "name").value;
                }
                catch(_x_)
                {
                }
            }
            
            switch (nextCommand)
            {
                case "first_form":
                
                    if (DispLicense == true)
                    {	
                        var licOK = false;
                        try
                        {
                            licOK = ArrayOptFindByKey(oFormFields, "license_confirm", "name").value == true;
                        }
                        catch(_e_)
                        {
                        }
                        
                        if (!licOK)
                        {
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
                        form_fields:[
                            // {"name": "__next", "type": "hidden", "value": (global_settings.settings.self_register_disp_custom_elems ? "custom_form" : "save")},
                            {"name": "__next", "type": "hidden", "value": "save"},
                            {"name": "lastname", "type": "string", "label": ("Фамилия"), "mandatory": true, "validation": "nonempty"},
                            {"name": "firstname", "type": "string", "label": ("Имя"), "mandatory": true, "validation": "nonempty"},
                            {"name": "middlename", "type": "string", "label": "Отчество"},
                            // {"name": "sex", "type": "select", "label": "Пол", "entries": [{"name": "Мужской", "value": "m" }, { "name": "Женский", "value": "w" }]},
                            // {"name": "birth_date", "type": "date", "label": "Дата рождения"},
                        ]
                    });
                    RESULT.form_fields.push(({"name": "login", "type": "string", "label": ("Логин"), "mandatory": true, "validation": "nonempty"}));
                    RESULT.form_fields.push(({"name": "password", "type": "string", "label": ("Пароль"), "mandatory": true, "validation": "nonempty"}));
                    RESULT.form_fields.push(({"name": "password_confirm", "type": "string", "label": ("Подтверждение пароля"), "mandatory": true, "validation": "nonempty"}));
                    RESULT.form_fields.push(({"name": "email", "type": "string", "label": ("E-mail"), "mandatory": true, "validation": "nonempty"}));
                    RESULT.form_fields.push(({"name": "phone", "type": "string", "label": ("Телефон")}));
                    RESULT.form_fields.push(({"name": "custom_elems.self_reg_org", "type": "string", "label": ("Организация"), "mandatory": true, "validation": "nonempty"}));
                    RESULT.form_fields.push(({"name": "custom_elems.self_reg_pos", "type": "string", "label": ("Должность"), "mandatory": true, "validation": "nonempty"}));

                    break;
                case "custom_form":
                
                    RESULT = mainForm_CHECK(oFormFields);
                    if (RESULT == null)
                    {
                        RESULT = getCustomForm();
                        var page1
                        for (page1 in ArraySelect(oFormFields, "StrBegins(This.name, '__page')"))
                            RESULT.form_fields.push(page1);
                    
                        RESULT.form_fields.push(({"name": "__page_custom_prev", "type": "hidden", "value": UrlEncode(EncodeJson(ArraySelect(oFormFields, "!StrBegins(This.name, '__')")))}));
                        RESULT.form_fields.push(({"name": "__next", "type": "hidden", "value": "save"}));
                    }
                    
                    break;
                case "save":
                    var page1, bOk = true;
                    
                    var saveFields = [];
                    for (page1 in ArraySelect(oFormFields, "StrBegins(This.name, '__page')"))
                    {
                        if (page1 != undefined && page1.value != "")
                        {
                            try
                            {
                                saveFields = ArrayUnion(saveFields, ParseJson(UrlDecode(page1.value)));
                            }
                            catch(_o_)
                            {
                                bOk = false;
                                RESULT = ({
                                    command: "alert",
                                    msg: "Ошибка данных формы"
                                });
                                break;
                            }
                        }
                    }
                    saveFields = ArrayUnion( saveFields, ArraySelect( oFormFields, "!StrContains(This.name, '__')" ) );
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