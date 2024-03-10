// 7267896448816008656 - libCustom x-local://wtv/libs/custom_lib.js

/**
 * @function GetCustomElems
 * @memberof Websoft.WT.Main
 * @description Получение коллекции настраиваемых полей объекта.
 * @author BG
 * @param {bigint} iObjectIDParam - ID объекта.
 * @returns {WTCustomElems}
*/
function GetCustomElems(iObjectIDParam) // 6833359738380905518 - libMain - Общая библиотека - x-local://wtv/libs/main_library.js
{
    var oRes = tools.get_code_library_result_object();
    oRes.result = [];

    try
    {
        var iObjectID = OptInt(iObjectIDParam);
        if(iObjectID == undefined )
            throw StrReplace("Некорректный ID объекта: [{PARAM1}]", "{PARAM1}", iObjectIDParam);
        
        var docObject = tools.open_doc(iObjectID);
        if(docObject == undefined )
            throw StrReplace("Не найден объект с ID: [{PARAM1}]", "{PARAM1}", iObjectID);
        
        var teObject = docObject.TopElem;
        
        var sCatalogName = teObject.Name;

        if(!teObject.ChildExists("custom_elems"))
            throw StrReplace("У объекта с типом [{PARAM1}] не может быть настраиваемых полей", "{PARAM1}", sCatalogName);	
        
        var curCustomElems = teObject.custom_elems;

        var curCustomTemplate = custom_templates.OptChild(sCatalogName);
        if(curCustomTemplate == undefined )
            throw StrReplace("Не найден шаблон настраиваемых полей для объектов типа: [{PARAM1}]", "{PARAM1}", sCatalogName);
        
        var fieldsCustomElemTemplate = [];
        if(curCustomTemplate.ChildExists("fields"))
        {
            fieldsCustomElemTemplate = curCustomTemplate.fields;
        }
        else if(curCustomTemplate.ChildExists("template_field"))
        {
            var sChildFieldType = curCustomTemplate.template_field.Value;
            var fldChildField = teObject.OptChild(sChildFieldType);
            if(fldChildField == undefined)
            {
                fldChildField = teObject.OptChild(sChildFieldType + "_id");
                if(fldChildField == undefined)
                    throw StrReplace(StrReplace("В форме данных исходного объекта с ID: [{PARAM1}] нет поля с именем [{PARAM2}]", "{PARAM1}", iObjectID), "{PARAM2}", sChildFieldType);
            }
            var iChildFieldID = fldChildField.Value;

            var curChildCustomTemplate = custom_templates.OptChild(sChildFieldType);
            if(curChildCustomTemplate == undefined )
                throw StrReplace("Не найден шаблон настраиваемых полей для объектов типа: [{PARAM1}]", "{PARAM1}", sChildFieldType);

            if(curChildCustomTemplate.ChildExists("items"))
            {
                fieldsCustomElemTemplate = curChildCustomTemplate.items.GetOptChildByKey(iChildFieldID, "id");
                if(fieldsCustomElemTemplate == undefined)
                    throw StrReplace(StrReplace("Не найден MULTIPLE-шаблон настраиваемых полей для объектов типа: [{PARAM1}] с ID [{PARAM2}]", "{PARAM1}", sCatalogName), "{PARAM2}", iChildFieldID);
                fieldsCustomElemTemplate = fieldsCustomElemTemplate.fields;
            }
        }
        else if(curCustomTemplate.ChildExists("items"))
        {
            fieldsCustomElemTemplate = curCustomTemplate.items.GetOptChildByKey(iObjectID, "id");
            if(fieldsCustomElemTemplate == undefined)
                throw StrReplace(StrReplace("Не найден MULTIPLE-шаблон настраиваемых полей для объектов типа: [{PARAM1}] с ID [{PARAM2}]", "{PARAM1}", sCatalogName), "{PARAM2}", iObjectID);
            fieldsCustomElemTemplate = fieldsCustomElemTemplate.fields;
        }
        
        
        var fldCurCustomElem, sName, oCustomElem;
        for(itemCTField in fieldsCustomElemTemplate)
        {
            if (itemCTField.disp_web.Value == true) {
                sName = itemCTField.name.Value;
                oCustomElem = {
                        id: tools_web.get_md5_id(sName),
                        name: sName,
                        title: itemCTField.title.Value,
                        value: ""
                    };
                
                fldCurCustomElem = curCustomElems.GetOptChildByKey(sName, "name");
                if(fldCurCustomElem != undefined) {
                    
                    if (ArrayCount(fldCurCustomElem.value.Value.split(";")) > 1) {
                        try {
                            ar = []
                            for (el in fldCurCustomElem.value.Value.split(";")) {
                                if (sCatalogName == "collaborator") {
                                    ar.push(tools.open_doc(el).TopElem.fullname);
                                } else if (sCatalogName == "education_org") {
                                    ar.push(tools.open_doc(el).TopElem.disp_name);
                                } else {
                                    ar.push(tools.open_doc(el).TopElem.name);
                                }
                            }
                            oCustomElem.value = ArrayMerge(ar, "This", ", ")
                        } catch (er) {
                            oCustomElem.value = fldCurCustomElem.value.Value
                        }
                    } else {
                        try {
                            if (sCatalogName == "collaborator") {
                                oCustomElem.value = tools.open_doc(fldCurCustomElem.value.Value).TopElem.fullname;
                            } else if (sCatalogName == "education_org") {
                                oCustomElem.value = tools.open_doc(fldCurCustomElem.value.Value).TopElem.disp_name;
                            } else {
                                oCustomElem.value = tools.open_doc(fldCurCustomElem.value.Value).TopElem.name;
                            }
                        } catch (e) {
                            oCustomElem.value = fldCurCustomElem.value.Value
                        }
                    }
                    if (StrBegins(oCustomElem.value, "https://", false) || StrBegins(oCustomElem.value, "http://", false)) {
                        oCustomElem.value = '<a href="' + oCustomElem.value + '" target="_blank">' + oCustomElem.value + '</a>'
                    }
                    foundRes = ArrayOptFirstElem(XQuery("for $e in resources where name='" + String(oCustomElem.value) + "' return $e"))
                    if (foundRes != undefined) {
                        oCustomElem.value = '<a href="/download_file.html?file_id=' + foundRes.id.Value + '" target="_blank">' + oCustomElem.value + '</a>'
                    }
                }
                oRes.result.push(oCustomElem);
            }
        }
    }
    catch(err)
    {
        alert(err)
        oRes.error = 502;
        oRes.errorText = err;
    }
    return oRes;
}

/**
 * @function GetSubordinatesCourseLearningHistory
 * @memberof Websoft.WT.Learning
 * @description Получение истории обучения по курсу подчинёнными сотрудниками.
 * @param {bigint} iCourseID ID электронного курса.
 * @param {bigint} iCurUserID ID текущего пользователя.
 * @param {oSort} oSort - Информация из рантайма о сортировке
 * @param {oPaging} oPaging - Информация из рантайма о пейджинге
 * @returns {ReturnSubordinatesCourses}
*/

function GetSubordinatesCourseLearningHistory( iCourseID, iCurUserID, oSort, oPaging ) // 6857362540981551019 - libLearning - Библиотека дистанционного обучения - x-local://wtv/libs/learning_library.js
{
    oRes = new Object();
    oRes.error = 0;
    oRes.errorText = "";
    oRes.result = true;
    oRes.array = [];
    oRes.data = {};
    oRes.paging = oPaging;

    try
    {
        iCourseID = Int( iCourseID );
    }
    catch( ex )
    {
        oRes.error = 1;
        oRes.errorText = "Передан некорректный ID электронного курса";
        return oRes;
    }

    try
    {
        iCurUserID = Int( iCurUserID );
    }
    catch( ex )
    {
        oRes.error = 1;
        oRes.errorText = "Передан некорректный ID текущего пользователя";
        return oRes;
    }

    var sCondSort = " order by $elem/last_usage_date descending";
    if ( ObjectType( oSort ) == 'JsObject' && oSort.FIELD != null && oSort.FIELD != undefined && oSort.FIELD != "" )
    {
        switch ( oSort.FIELD )
        {
            case "fullname":
                sCondSort = " order by $elem/person_fullname" + ( StrUpperCase( oSort.DIRECTION ) == "DESC" ? " descending" : "" );
                break;
            case "last_learning_date":
                sCondSort = " order by $elem/last_usage_date" + ( StrUpperCase( oSort.DIRECTION ) == "DESC" ? " descending" : "" );
                break;
            case "status":
                sCondSort = " order by $elem/state_id" + ( StrUpperCase( oSort.DIRECTION ) == "DESC" ? " descending" : "" );
                break;
            case "state_code":
            case "score":
            case "link":
                break;
            default:
                sCondSort = " order by $elem/" + oSort.FIELD + ( StrUpperCase( oSort.DIRECTION ) == "DESC" ? " descending" : "" );
        }
    }

    xarrLearnings = XQuery( "for $elem in learnings where $elem/course_id = " + iCourseID + sCondSort + " return $elem" );
    xarrActiveLearnings = XQuery( "for $elem in active_learnings where $elem/course_id = " + iCourseID + sCondSort + " return $elem" );
    xarrAll = ArrayUnion(xarrLearnings, xarrActiveLearnings);

    arrCurUserSubordinateEmployees = ArrayExtract( tools.call_code_library_method( "libMain", "get_user_collaborators", [ iCurUserID, "all_subordinates", false, "", null, [] ] ), "This.id.Value" );
    fmArr = ArraySelect(ArrayExtractKeys(XQuery("for $e in func_managers where catalog = 'collaborator' and person_id = " + iCurUserID + " return $e"), "object_id"), "!tools.open_doc(This).TopElem.is_dismiss");
    arrCurUserSubordinateEmployeesALL = ArrayUnion(arrCurUserSubordinateEmployees, fmArr);

    for ( oCourse in xarrAll )
    {
        if ( ArrayOptFind( arrCurUserSubordinateEmployeesALL, 'This == oCourse.person_id' ) != undefined )
        {
            obj = new Object();
            obj.id = oCourse.id.Value;
            obj.person_id = oCourse.person_id.Value;
            obj.fullname = oCourse.person_fullname.Value;
            obj.last_learning_date = oCourse.last_usage_date.HasValue ? StrDate( oCourse.last_usage_date.Value, true, false ) : '';

            oStatus = common.learning_states.GetOptChildByKey( oCourse.state_id.Value );
            obj.status = oStatus.name.Value;
            obj.state_code = StrReplace( oStatus.long_descriptor.Value, " ", "_" );

            obj.score = oCourse.score.Value;
            obj.link = tools_web.get_mode_clean_url( null, oCourse.id );

            oRes.array.push( obj );
        }
    }

    return oRes;
}