function clear() {
    var url = "x-local://source/gge/libs/personal_lib.js";
    DropFormsCache(url);
    return OpenCodeLib(url);
}

function checkID(ID, catalog) {
    var dlib = OpenCodeLib("x-local://source/gge/libs/develop.js");
    if (OptInt(ID) != undefined && dlib.checkDataType(OptInt(ID), "Integer")) {
        if (!dlib.existInCatalogByID(catalog, ID)) throw ID + " NOT IN " + catalog;
    } else {
        throw ID + " IS NOT ID";
    }
}

function addColsToGroups(collaboratorIDs, groupIDs) {
    for (groupID in groupIDs) {
        checkID(groupID, "group");
        docGroup = tools.open_doc(groupID);
        teGroup = docGroup.TopElem;
        for (collaboratorID in collaboratorIDs) {
            checkID(collaboratorID, "collaborator");
            if (!teGroup.collaborators.ChildByKeyExists(collaboratorID)) {
                teGroup.collaborators.ObtainChildByKey(collaboratorID);
            }
        }
        docGroup.Save();
    }
}

function getPersonFmIDsByPerson(personID) {
    checkID(personID, "collaborator");
    var xq = "for $e in func_managers where catalog = 'collaborator' and object_id = " + personID + " return $e";
    return ArrayExtractKeys(XQuery(xq), "person_id");
}

function getPersonFmIDsBySubdivision(personID) {
    checkID(personID, "collaborator");
    var subdivisionID = tools.get_doc_by_key("collaborator", "id", personID).TopElem.position_parent_id.Value;
    var xq = "for $e in func_managers where catalog = 'subdivision' and object_id = " + subdivisionID + " return $e";
    return ArrayExtractKeys(XQuery(xq), "person_id");
}

function getPersonFmIDsByPosition(personID) {
    checkID(personID, "collaborator");
    var subdivisionID = tools.get_doc_by_key("collaborator", "id", personID).TopElem.position_parent_id.Value;
    var xq = "for $e in func_managers where catalog = 'position' and parent_id = " + subdivisionID + " return $e";
    return ArrayExtractKeys(XQuery(xq), "person_id");
}

function isUserPersonFmByPerson(userID, personID) {
    // return ArrayCount(ArrayIntersect([userID], getPersonFmIDsByPerson(personID))) != 0
    checkID(userID, "collaborator");
    checkID(personID, "collaborator");
    var xq = "for $e in func_managers where catalog = 'collaborator' and object_id = " + personID +
    " and person_id = " + userID + " return $e";
    return ArrayCount(XQuery(xq)) != 0;
}

function isUserPersonFmBySubdivision(userID, personID) {
    checkID(userID, "collaborator");
    checkID(personID, "collaborator");
    var subdivisionID = tools.get_doc_by_key("collaborator", "id", personID).TopElem.position_parent_id.Value;
    var xq = "for $e in func_managers where catalog = 'subdivision' and object_id = " + subdivisionID +
    " and person_id = " + userID + " return $e";
    return ArrayCount(XQuery(xq)) != 0;
}

function isUserPersonFmByPosition(userID, personID) {
    checkID(userID, "collaborator");
    checkID(personID, "collaborator");
    var subdivisionID = tools.get_doc_by_key("collaborator", "id", personID).TopElem.position_parent_id.Value;
    var xq = "for $e in func_managers where catalog = 'position' and parent_id = " + subdivisionID +
    " and person_id = " + userID + " return $e";
    return ArrayCount(XQuery(xq)) != 0;
}

function getGroupCollaboratorIDs(groupID) {
    checkID(groupID, "group");
    var xq = "for $e in group_collaborators where group_id = " + groupID + " return $e";
    return ArrayExtractKeys(XQuery(xq), "collaborator_id");
}

function isPersonInGroup(personID, groupID) {
    checkID(personID, "collaborator");
    checkID(groupID, "group");
    var xq = "for $e in group_collaborators where collaborator_id = " + personID + " and group_id = " + groupID + " return $e";
    return ArrayCount(XQuery(xq)) != 0;
}

function getSubdivisionLevel(subdivID) {
    checkID(subdivID, "subdivision");
    var level = 0;
    var curID = subdivID;
    var parentID = ArrayOptFirstElem(XQuery("for $e in subdivisions where id = " + curID + " return $e")).parent_object_id.Value;
    while (parentID != null) {
        curID = parentID;
        parentID = ArrayOptFirstElem(XQuery("for $e in subdivisions where id = " + curID + " return $e")).parent_object_id.Value;
        level++;
    }
    return level;
}

function getRootSubdivisionIDs() {
    var orgID = "6605806129694195679"; // ФАУ «Главгосэкспертиза России»
    var xq = "for $e in subdivisions where org_id = " + orgID + " and parent_object_id = null() and is_disbanded = false() return $e";
    return ArrayExtractKeys(XQuery(xq), "id");
}

function getRootSubdivisionID(subdivID) {
    checkID(subdivID, "subdivision");
    var curID = subdivID;
    var parentID = ArrayOptFirstElem(XQuery("for $e in subdivisions where id = " + curID + " return $e")).parent_object_id.Value;
    while (parentID != null) {
        curID = parentID;
        parentID = ArrayOptFirstElem(XQuery("for $e in subdivisions where id = " + curID + " return $e")).parent_object_id.Value;
    }
    return curID;
}

function getParentSubdivisionID(subdivID) {
    checkID(subdivID, "subdivision");
    return ArrayOptFirstElem(XQuery("for $e in subdivisions where id = " + subdivID + " return $e")).parent_object_id.Value;;
}

function getParentSubdivisionIDs(subdivID) {
    checkID(subdivID, "subdivision");
    var parentSubdivisionIDs = []; 
    var curID = subdivID;
    var parentID = ArrayOptFirstElem(XQuery("for $e in subdivisions where id = " + curID + " return $e")).parent_object_id.Value;
    while (parentID != null) {
        curID = parentID;
        parentID = ArrayOptFirstElem(XQuery("for $e in subdivisions where id = " + curID + " return $e")).parent_object_id.Value;
        parentSubdivisionIDs.push(curID);
    }
    return parentSubdivisionIDs;
}

function getChildSubdivisionIDs(subdivID) {
    checkID(subdivID, "subdivision");
    var xq = "for $e in subdivisions where parent_object_id = " + subdivID + " and is_disbanded = false() return $e";
    return ArrayExtractKeys(XQuery(xq), "id");
}

function getChildSubdivisionIDsByArr(subdivIDs) {
    arr = [];
    for (subdivID in subdivIDs) {
        arr = ArrayUnion(arr, getChildSubdivisionIDs(subdivID));
    }
    return arr;
}

function getAllChildSubdivisionIDs(subdivID) {
    checkID(subdivID, "subdivision");
    var allChildSubdivisionIDs = [];
    var curIDs = [subdivID];
    var childSubdivisionIDs = getChildSubdivisionIDsByArr(curIDs);
    while (ArrayCount(childSubdivisionIDs)) {
        curIDs = childSubdivisionIDs;
        childSubdivisionIDs = getChildSubdivisionIDsByArr(curIDs);
        allChildSubdivisionIDs = ArrayUnion(allChildSubdivisionIDs, curIDs);
    }
    return allChildSubdivisionIDs;
}

function isSubdivisionFromCA(subdivID) {
    checkID(subdivID, "subdivision");
    return String(getRootSubdivisionID(subdivID)) == "7156931433189943821"; // ФАУ "Главгосэкспертиза России"
}

function isPersonFromCA(personID) {
    checkID(personID, "collaborator");
    var subdivID = tools.get_doc_by_key("collaborator", "id", personID).TopElem.position_parent_id.Value;
    return String(getRootSubdivisionID(subdivID)) == "7156931433189943821"; // ФАУ "Главгосэкспертиза России"
}

function isPersonSubdivisionFm(personID, subdivID, bossTypeID) {
    checkID(personID, "collaborator");
    checkID(subdivID, "subdivision");
    var cond = bossTypeID == undefined ? " " : " and boss_type_id = " + bossTypeID + " ";
    var xq = "for $e in func_managers where catalog = 'subdivision' and object_id = " + subdivID +
    " and person_id = " + personID + cond + " return $e";
    return ArrayCount(XQuery(xq)) != 0;
}

function getSubdivisionFmIDs(subdivID, bossTypeID) {
    checkID(subdivID, "subdivision");
    var cond = bossTypeID == undefined ? " " : " and boss_type_id = " + bossTypeID + " ";
    var xq = "for $e in func_managers where catalog = 'subdivision' and object_id = " + subdivID + cond + " return $e";
    return ArrayExtractKeys(XQuery(xq), "person_id");
}

function getSubdivisionPersonIDs(subdivID) {
    checkID(subdivID, "subdivision");
    var cond = " and position_parent_id= " + subdivID + " ";
    var xq = "for $e in collaborators where is_dismiss=false() " + cond + " return $e";
    return ArrayExtractKeys(XQuery(xq), "id");
}

function getAllChildSubdivisionPersonIDs(subdivID) {
    checkID(subdivID, "subdivision");
    var allChildSubdivisionPersonIDs = getSubdivisionPersonIDs(subdivID);
    for (childSubdivisionID in getAllChildSubdivisionIDs(subdivID)) {
        allChildSubdivisionPersonIDs = ArrayUnion(allChildSubdivisionPersonIDs, getSubdivisionPersonIDs(childSubdivisionID)); 
    }
    return allChildSubdivisionPersonIDs;
}

function getUserRolesForPerson(userID, personID, bossTypeID) { // var bossTypeID = "7070444973261573463"; // Ответственный за обучение
    checkID(userID, "collaborator");
    checkID(personID, "collaborator");
    var userRoles = [];
    var isPersonFromCA = isPersonFromCA(personID);
    var subdivisionID = tools.get_doc_by_key("collaborator", "id", personID).TopElem.position_parent_id;
    var isPersonSubdivisionFm = isPersonSubdivisionFm(userID, subdivisionID, bossTypeID);
    var parentSubdivisionID = getParentSubdivisionID(subdivisionID);
    var isPersonParentSubdivisionFm = isPersonSubdivisionFm(userID, parentSubdivisionID, bossTypeID);
    var subdivisionLevel = getSubdivisionLevel(subdivisionID);
    if (isPersonFromCA) {
        if (subdivisionLevel == 2) {
            if (isPersonSubdivisionFm) {
                userRoles.push("department_boss");
            }
            if (isPersonParentSubdivisionFm) {
                userRoles.push("subdivision_boss");
            }
        } else if (subdivisionLevel == 1) {
            if (isPersonSubdivisionFm) {
                userRoles.push("subdivision_boss");
            }
        }
    } else {
        if (subdivisionLevel == 1) {
            if (isPersonSubdivisionFm) {
                userRoles.push("department_boss");
            }
            if (isPersonParentSubdivisionFm) {
                userRoles.push("subdivision_boss");
            }
        } else if (subdivisionLevel == 0) {
            if (isPersonSubdivisionFm) {
                userRoles.push("subdivision_boss");
            }
        }
    }
    return userRoles;
}

function getSubdivisionRole(subdivID) {
    checkID(subdivID, "subdivision");
    var subdivisionRole = "";
    var isSubdivisionFromCA = isSubdivisionFromCA(subdivID);
    var subdivisionLevel = getSubdivisionLevel(subdivID);
    if (isSubdivisionFromCA) {
        if (subdivisionLevel == 2) {
            subdivisionRole = "department";
        } else if (subdivisionLevel == 1) {
            subdivisionRole = "subdivision";
        }
    } else {
        if (subdivisionLevel == 1) {
            subdivisionRole = "department";
        } else if (subdivisionLevel == 0) {
            subdivisionRole = "subdivision";
        }
    }
    return subdivisionRole;
}

function getSubdivisionBudget(subdivID) {
    checkID(subdivID, "subdivision");
    var budget;
    var costCenterID = tools.get_doc_by_key("subdivision", "id", subdivID).TopElem.cost_center_id.Value;
    if (costCenterID != null) budget = tools.get_doc_by_key("budget", "cost_center_id", costCenterID).TopElem.cost.Value;
    return budget;
}
