// 7405958839451506079 - customer_cabinet - Личный кабинет заказчика

logger = {
    isLog: false,
    logType: "report",
    logName: "7405958839451506079",
}

var libs = OpenCodeLib("x-local://source/gge/libs.js").getAllLibs;

var l = libs.log_lib.clear;
var d = libs.develop;
var n = libs.notif_lib;
var p = libs.personal_lib;

function isAssist (personID, eventID) {
    var res = true;
    var foundER = ArrayOptFirstElem(XQuery('for $elem in event_results where event_id='+eventID+' and person_id='+personID+' return $elem'));
    res = foundER == undefined ? false : foundER.is_assist.Value;
    return res;
}

function assResult (personID, assID) {
    var res = true;
    var xq = 'for $elem in test_learnings where ($elem/state_id=2 or $elem/state_id=4) and $elem/assessment_id=' + assID + 
        ' and $elem/person_id=' + personID + ' return $elem';
    var foundAR = ArrayOptMax(XQuery(xq),"score");
    res = foundAR == undefined ? undefined : foundAR.score.Value;	
    return res;
}

function getName(catalog, id) {
    found = ArrayOptFirstElem(XQuery("for $elem in " + catalog + "s where $elem/id=" + id + " return $elem"));
    event_name = found == undefined ? "" : found.name.Value;
}

function get_attached_object_ids(teDocument, catalogType) {
    try {
        if ( catalogType == 'all' ) {
            return_arr = []
            for ( catalog in teDocument.catalogs ) {
                arr = ArrayExtractKeys( catalog.objects, "object_id" )
                for ( elem in arr ) {
                    return_arr.push( elem )
                }
            }
            return return_arr
        } else {
            foundCatalog = ArrayOptFind( teDocument.catalogs, "This.type == '" + catalogType + "'" )
            if ( foundCatalog == undefined ) {
                return []
            } else {
                return ArrayExtractKeys( foundCatalog.objects, "object_id" )
            }
        }
    } catch ( err ) {
        return []
    }
}

function floatToStr(f) {
    return StrReplace(StrReal(f, 2), '.', ',');
}

function getAverage(arr) {
    var average = 0.0;
    var sum = 0.0;
    count = 0;
    for (elem in arr) {
        if (OptReal(elem) != undefined) {
            sum += OptReal(elem);
            count++;
        }
    }
    if (count != 0) average = sum / count;
    return average;
}

function checkVal(val) {
    var res = true;
    if (val == undefined || val == "" || val == "false") res = false;
    return res;
}

var oRes = tools.get_code_library_result_object();
oRes.context = new Object;

try {
    l.open(logger)

    var count = 0;
    var sum = 0;
    var averageAss1 = 0;
    var averageAss2 = 0;
    var straverageAss1 = '';
    var straverageAss2 = '';
    var straverageassUpgrade = '';
    var Res1,Res2;

    var obj = {};
    var xq = "";
    var role_id = "7370956117463688418" // 2024 (РЖД)
    var gcs = [];
    var root_event_id;
    var child_events = [];
    var assessment_ids = [];
    var foundAss;
    var enterID;
    var exitID;
    var col_id;
    var i = 1;
    for (group in XQuery("for $elem in groups where MatchSome($elem/role_id, (" + role_id + ")) return $elem")) {
        averageAss1 = 0;
        averageAss2 = 0;
        group_id = group.id.Value;
        teGroup = tools.open_doc(group_id).TopElem;
        root_event_id = teGroup.custom_elems.ObtainChildByKey("event_id").value;
        if (root_event_id != null && root_event_id != "") {
            teRootEvent = tools.open_doc(root_event_id).TopElem;
            assessment_ids = get_attached_object_ids(teRootEvent, "assessment");
            if (ArrayCount(assessment_ids)) {
                xq = "for $elem in assessments where MatchSome($elem/id, (" + ArrayMerge(assessment_ids, "This", ", ")+ ")) return $elem"
                assessment_ids = XQuery(xq);
                foundAss = ArrayOptFind(assessment_ids, "StrEnds(This.code, '1')");
                enterID = foundAss.id.Value;
                foundAss = ArrayOptFind(assessment_ids, "StrEnds(This.code, '3')");
                exitID = foundAss.id.Value;
            }
            child_events = XQuery("for $elem in events where parent_event_id=" + root_event_id + " return $elem");
        }

        sum = 0;
        gcs = XQuery("for $elem in group_collaborators where $elem/group_id=" + group_id + " order by $elem/collaborator_fullname return $elem");
        arrEnter = []; // результаты вход
        arrExit = []; // результаты выход
        resEnter = 0; // результат каждого на входном тестировании
        resExit = 0; // результат каждого на выходном тестировании
        registeredColCount = 0;
        for (gc in gcs) {
            count = 0;
            col_id = gc.collaborator_id.Value;
            for (child_event in child_events) {
                if (isAssist(col_id, child_event.id.Value)) count++;
            }
            sum += count;
            resEnter = assResult(col_id, enterID);
            resExit = assResult(col_id, exitID);
            if (resEnter != undefined) {
                arrEnter.push(((resEnter) * 100) / 30);
            }
            if (resExit != undefined) {
                arrExit.push(((resExit) * 100) / 30);
            }
            
            teCol = tools.open_doc(gc.collaborator_id.Value).TopElem;
            if (checkVal(d.ceValue(teCol, "is_registered"))) registeredColCount++;
        }
        obj.SetProperty("event_name" + i, teRootEvent.name.Value);
        obj.SetProperty("colCount" + i, ArrayCount(gcs)); // colCount 
        obj.SetProperty("averageCOR" + i, (sum * 100) / (ArrayCount(child_events) * ArrayCount(gcs)));

        obj.SetProperty("straverageAss1" + i, floatToStr(getAverage(arrEnter)));
        obj.SetProperty("straverageAss2" + i, floatToStr(getAverage(arrExit)));
        obj.SetProperty("straverageassUpgrade" + i, floatToStr(getAverage(arrExit) - getAverage(arrEnter)));
        obj.SetProperty("registeredColCount" + i, registeredColCount); // (registeredColCount * 100) / ArrayCount(gcs)

        // obj.SetProperty("straverageAss1" + i, floatToStr(averageAss1 / countEnterTest) + "%");
        // obj.SetProperty("straverageAss2" + i, floatToStr(averageAss2 / countExitTest) + "%");
        // obj.SetProperty("straverageassUpgrade" + i, floatToStr((averageAss2 / countExitTest) - (averageAss1/countEnterTest)) + "%");
        
        i++;
    }

    l.close(logger);
} catch (error) {
    l.write(logger, error)
    l.close(logger)
}

oRes.context = obj;

// oRes.context = {
//     averageCOR: sum,
//     colCount: ArrayCount(arr), 
//     assResult1: straverageAss1,
//     assResult2: straverageAss2,
//     averageassUpgrade: straverageassUpgrade,
// };

VALUE_STR = EncodeJson(oRes.context);

