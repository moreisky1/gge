// 7288689352305627265 - Персонал / Смена пароля ЭБ

//SORT
bRandomPassword = true;
function sendMess( curUserIDParam )
{
    if ( PasswordResetMode == "password_reset" )
    {
        var sTokenUrl, sToken = tools.random_string( 10 );
        tools_web.set_user_data( "password_reset_" + sToken, ({ "person_id" : Int( curUserIDParam ) }), 3600 );
        sTokenUrl = "https://ef.gge.ru/password_reset.html?t=" + sToken;
        tools.create_notification( '19', curUserIDParam, sTokenUrl );
    }
    else
    {
        tools.create_notification( '9', curUserIDParam );
    }
    return ({
        command: "close_form",
        msg: tools_web.get_web_const("uvedomlenieotp", curLngWeb )
    });
}

switch (command)
{
    case "eval":
        RESULT = ({
                "command": "display_form",
                "title": "Сброс пароля",
                "message": "Если Вы уже зарегистрированы на Портале и хотите сбросить пароль, введите Ваш логин или E-mail. На Вашу электронную почту придет уведомление с инструкцией по сбросу пароля. Если Вы не помните Ваш логин или E-mail, направьте письмо администратору.",
                "form_fields": ([
                    { name: "loginmail", label: "Логин или E-mail", type: "string", value: "", mandatory: true, validation: "nonempty" },
                ])
        });
        break;
    case "submit_form":
        var loginmail = "";
        try
        {
            oFormFields = ParseJson( form_fields );
            loginmail = ArrayOptFindByKey(oFormFields, "loginmail", "name").value;
        }
        catch(_x_)
        {
        }
        
        if (loginmail == "")
        {
            RESULT = ({
                command: "alert",
                msg: "Ошибка данных формы"
            });
        }
        else
        {
            var hostObj = tools_web.get_host_obj(Request);
            var userArray = XQuery("for $elem in collaborators where $elem/" + ( hostObj.curHost.login_case_sensitive ? 'login = ' + XQueryLiteral(loginmail) : 'lowercase_login = ' + StrLowerCase( XQueryLiteral(loginmail) ) ) + " return $elem/Fields('id', 'email')" );
            
            switch (ArrayCount(userArray))
            {
                case 0:
                    var mailArray = XQuery( "for $elem in collaborators where $elem/email = " + XQueryLiteral(loginmail) + " return $elem/Fields('id')" );
                    switch (ArrayCount(mailArray))
                    {
                        case 0:
                        {
                            RESULT = ({
                                command: "alert",
                                msg: tools_web.get_web_const( 'upr_no_user_text', curLngWeb )
                            });
                            break;
                        }
                        case 1:
                        {
                            curUserID = ArrayFirstElem( mailArray ).PrimaryKey;
                            RESULT = sendMess( curUserID );
                            break;
                        }
                        default:
                        {
                            RESULT = ({
                                command: "alert",
                                msg: tools_web.get_web_const( 'upr_many_emails_text', curLngWeb )
                            });
                            break;
                        }
                    }
                    break;
                case 1:
                    var catUser = ArrayFirstElem(userArray);
                    if ( catUser.email.HasValue )
                    {
                        var mailArray = XQuery( "for $elem in collaborators where $elem/email = " + catUser.email.XQueryLiteral + " return $elem/Fields('id')" );
                        if ( ArrayCount( mailArray ) > 1 )
                        {
                            RESULT = ({
                                command: "alert",
                                msg: tools_web.get_web_const( 'upr_many_emails_text', curLngWeb )
                            });
                            break;
                        }
                        
                        RESULT = sendMess( catUser.PrimaryKey );
                    }
                    else
                    {
                        RESULT = ({
                            command: "alert",
                            msg: tools_web.get_web_const( 'upr_no_email_text', curLngWeb )
                        });
                    }
                    break;
                default:
                    RESULT = ({
                        command: "alert",
                        msg: tools_web.get_web_const( 'upr_no_email_text', curLngWeb )
                    });
                    break;
            }
        }
        break;
}