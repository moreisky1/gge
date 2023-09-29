function clear() {
    var url = "x-local://source/gge/libs/develop.js";
    DropFormsCache(url);
    return OpenCodeLib(url);
}

function getRegExp(pattern) {
    var objRegExp = new ActiveXObject('VBScript.RegExp');
    objRegExp.Global = true;
    objRegExp.IgnoreCase = true;
    objRegExp.MultiLine = true;
    objRegExp.Pattern = pattern;
    return objRegExp;
}

function existInCatalogByID(catalog, id) {
    return existInCatalogByKey(catalog, "id", id);
}

function existInCatalogByKey(catalog, keyName, keyValue) {
    return ArrayCount(XQuery("for $elem in " + catalog + "s where $elem/" + keyName + " = '" + keyValue + "' return $elem")) != 0;
}

function ceValue(teDoc, ceName) {
    var value = undefined;
    if (checkDataType(teDoc, "XmlDoc") && checkDataType(ceName, "String")) {
        var ce = ArrayOptFindByKey(teDoc.custom_elems, ceName, "name");
        if (ce != undefined) value = ce.value.Value;
    }
    return value;
}

function getNameInCatalogByID(catalog, id) {
    return getNameInCatalogByKey(catalog, "id", id);
}

function getNameInCatalogByKey(catalog, keyName, keyValue) {
    var res = "";
    if (existInCatalogByKey(catalog, keyName, keyValue)) {
        if (catalog == "collaborator") {
            res = ArrayOptFirstElem(XQuery("for $e in " + catalog + "s where $e/" + keyName + " = '" + keyValue + "' return $e")).fullname.Value;
        } else if (catalog == "education_org") {
            res = ArrayOptFirstElem(XQuery("for $e in " + catalog + "s where $e/" + keyName + " = '" + keyValue + "' return $e")).disp_name.Value;
        } else {
            res = ArrayOptFirstElem(XQuery("for $e in " + catalog + "s where $e/" + keyName + " = '" + keyValue + "' return $e")).name.Value;
        }
    }
    return res;
}

function getDataType(mData) {
    /* 
        String - getDataType("qwe")
        Object - getDataType({})
        Date - getDataType(Date())
        SimpleArray - getDataType([])
        XqueryArray - getDataType(XQuery("collaborators"))
        BmObject - ?
        XmlDoc - getDataType(tools.open_doc(7241157892942218865))
        Integer - getDataType(1)
        Real - getDataType(1.2)
        Bool - getDataType(true)
        Null - getDataType(null)
        Undefined - getDataType(undefined)
        JSON - getDataType("{q:1}")
    */
    var sRes = "";
    var sDataType = DataType(mData);
    switch (sDataType) {
        case "string":
            sRes = "String";
            if (StrBegins(mData, "[") && StrEnds(mData, "]") || StrBegins(mData, "{") && StrEnds(mData, "}")) {
                try {
                    obj = tools.read_object(mData, "json");
                    text = tools.object_to_text(obj, "json")
                    if (text != "[]" && text != "{}") sRes = "JSON";
                } catch (e) {}
            }
            break;
        case "object":
            if (ObjectType(mData) == "JsArray")
                sRes = "SimpleArray";
            else if (ObjectType(mData) == "XmHookSeq" || ObjectType(mData) == "XmLdsSeq")
                sRes = "XqueryArray";
            else if (ObjectType(mData) == "XmElem")
                sRes = "XmlDoc";
            else if (ObjectType(mData) == "BmObject" ) {
                try {
                    Date(mData);
                    sRes = "Date";
                } catch (err) {
                    try {
                        String(mData);
                        sRes = "String";
                    } catch (err2) {
                        sRes = "BmObject";
                    }
                }
            } else {
                sRes = "Object";
            }
            break;
        default:
            sRes = StrTitleCase(sDataType);
            break;
    }
    return sRes;
}

function checkDataType(mParam, targetDataType) {
    return getDataType(mParam) == targetDataType;
}

function isValidObjField(obj, field, dataType) {
    var res = undefined;
    if (checkDataType(obj, "Object") && checkDataType(field, "String") && checkDataType(dataType, "String")) {
        var val = obj.GetOptProperty(field, undefined);
        res = val == undefined ? false : checkDataType(val, dataType);
    }
    return res;
}
