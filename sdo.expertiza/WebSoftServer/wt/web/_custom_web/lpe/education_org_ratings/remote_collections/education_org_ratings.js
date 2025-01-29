// 7447520777900260988 - education_org_ratings - _custom_web/lpe/education_org_ratings/remote_collections/education_org_ratings.js

var oRes = {};
oRes.error = 0;
oRes.errorText = "";
oRes.array = [];
oRes.data = {};

logger = {
    isLog: false,
    logType: "report",
    logName: "7447520777900260988",
}
libs = OpenCodeLib("x-local://source/gge/libs.js").getAllLibs;
l = libs.log_lib
d = libs.develop.clear
p = libs.personal_lib.clear

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

function getAttachedObjectIDs(teDoc, catalogType) {
    foundCatalog = ArrayOptFind(teDoc.catalogs, "This.type == '" + catalogType + "'")
    // l.write(logger, "foundCatalog="+foundCatalog)
    if (foundCatalog == undefined) {
        return [];
    } else {
        return ArrayExtractKeys(foundCatalog.objects, "object_id");
    }
}

function getOptAnswer(tePoll, tePollResult, idQuestion) {
    var answer = undefined;
    var foundAnswer = ArrayOptFind(tePollResult.questions, "This.id==" + idQuestion);
    if (foundAnswer != undefined) {
        answer = ArrayOptFind(ArrayOptFind(tePoll.questions, "This.id==" + idQuestion).entries, "This.id==" + foundAnswer.value).value.Value;
    }
    return answer;
}

function getPollResults(edu_org_id) {
    var teEvent;
    var teEO = tools.open_doc(edu_org_id).TopElem;
    var education_org_ids = ArrayUnion([edu_org_id], ArrayExtractKeys(teEO.education_orgs, "education_org_id"));
    var events_arr = [];
    var poll_ids = [];
    var prs = [];
    var cond = "start_date > date('" + Date(start_date_from) + "') and start_date < date('" + Date(start_date_to) + "')";
    for (education_org_id in education_org_ids) {
        events_arr = ArrayUnion(events_arr, XQuery("for $elem in events where education_org_id=" + education_org_id + " and " + cond + " return $elem"));
    }
    for (ev in events_arr) {
        teEvent = tools.open_doc(ev.id).TopElem;
        poll_ids = ArrayUnion(poll_ids, getAttachedObjectIDs(teEvent, "poll"));
    }
    for (poll_id in poll_ids) {
        prs = ArrayUnion(prs, XQuery("for $elem in poll_results where poll_id = " + poll_id + " and create_date >= Date('01.01.2024') and status = 2 return $elem"));
    }

    return prs;
}

// function getParams() {
//     var oParams = {
//         "novelty": 2, // новизна полученных знаний
//         "applicability": 4, // практическая применимость полученных знаний
//         "presentation": 6, // качество изложения материала
//         "convenience": 9, // удобство графика реализации программы обучения для слушателей
//         // "support": 1, // качество организации и сопровождения обучения
//         // "lms": 9, // удобство использования средств обучения (в т.ч. цифровой образовательной среды)
//         "lectors" : 7 // качество лекторов
//     };

//     return oParams;
// }

function getCSI(tePoll, edu_org_id) {
    var oRes = {};
    // var tePoll = tools.open_doc(poll.poll_id).TopElem;
    
    var idNoveltyQuestion = tePoll.questions[1].id.Value;
    var noveltyAnswers = [];
    var idApplicabilityQuestion = tePoll.questions[3].id.Value;
    var applicabilityAnswers = [];
    var idPresentationQuestion = tePoll.questions[5].id.Value;
    var presentationAnswers = [];
    var idConvenienceQuestion = tePoll.questions[8].id.Value;
    var convenienceAnswers = [];
    // var idSupportQuestion = tePoll.questions[poll.support - 1].id.Value;
    // var supportAnswers = [];
    // var idLmsQuestion = tePoll.questions[poll.lms - 1].id.Value;
    // var lmsAnswers = [];
    var idLectorsQuestion = tePoll.questions[6].id.Value;
    var lectorsAnswers = [];
    var pollResult;
    var pollResults = getPollResults(edu_org_id);
    var tePollResult;
    var foundAnswer;
    for (pollResult in pollResults) {
        tePollResult = tools.open_doc(pollResult.id.Value).TopElem;
        
        foundAnswer = getOptAnswer(tePoll, tePollResult, idNoveltyQuestion);
        if (foundAnswer != undefined) noveltyAnswers.push(foundAnswer);
        
        foundAnswer = getOptAnswer(tePoll, tePollResult, idApplicabilityQuestion);
        if (foundAnswer != undefined) applicabilityAnswers.push(foundAnswer);
        
        foundAnswer = getOptAnswer(tePoll, tePollResult, idPresentationQuestion);
        if (foundAnswer != undefined) presentationAnswers.push(foundAnswer);
        
        foundAnswer = getOptAnswer(tePoll, tePollResult, idConvenienceQuestion);
        if (foundAnswer != undefined) convenienceAnswers.push(foundAnswer);
        
        foundAnswer = getOptAnswer(tePoll, tePollResult, idLectorsQuestion);
        if (foundAnswer != undefined) lectorsAnswers.push(foundAnswer);
    }
    
    oRes.id = tePoll.id.Value;
    oRes.name = tePoll.name.Value;
    oRes.novelty = getAverage(noveltyAnswers);
    oRes.applicability = getAverage(applicabilityAnswers);
    oRes.presentation = getAverage(presentationAnswers);
    oRes.convenience = getAverage(convenienceAnswers);
    // oRes.support = getAverage(supportAnswers);
    // oRes.lms = getAverage(lmsAnswers);
    oRes.lectors = getAverage(lectorsAnswers);
    oRes.csi = getAverage([oRes.novelty, oRes.applicability, oRes.presentation, oRes.convenience, oRes.lectors]);
    
    return oRes;
}

function getNumber(num) {
    var str = "";
    if (StrContains(String(num), ".")) {
        str = StrReplace(String(StrReal(num, 1, true)), ".", ",");
    } else {
        str = num + ",0";
    }
    return str;
}

try {
l.open(logger)

var cond = "start_date > date('" + Date(start_date_from) + "') and start_date < date('" + Date(start_date_to) + "')";

var object_data_type_id = 7441577045918571630 // Рейтинг обучающей организации
var arr = XQuery("for $elem in object_datas where object_data_type_id = " + object_data_type_id + " and " + cond + " order by $elem/create_date descending return $elem");

var i = 0;
var convenience, edo, stability, courses, online;
var tePoll = tools.open_doc(7381860442502410013).TopElem; // Опрос по итогам внешнего обучения
for (elem in arr) {
    // l.write(logger, elem.id);
    teDoc = tools.open_doc(elem.id.Value).TopElem
    obj = {}
    obj.id = i;
    obj.object_name = teDoc.object_id.ForeignElem.name.Value;
    obj.amount = d.ceValue(teDoc, "amount");
    // obj.edo = d.ceValue(teDoc, "edo") == "true" ? "Да" : "Нет";
    convenience = StrLeftCharRange(d.ceValue(teDoc, "convenience"), 1);
    edo = d.ceValue(teDoc, "edo") == "true" ? 3 : 1;
    stability = StrLeftCharRange(d.ceValue(teDoc, "stability"), 1);
    courses = StrLeftCharRange(d.ceValue(teDoc, "courses"), 1);
    online = StrLeftCharRange(d.ceValue(teDoc, "online"), 1);

    obj.rating = getNumber(getAverage([convenience, edo, stability, courses, online]));

    if (getCSI(tePoll, teDoc.object_id.Value).csi != 0) {
        obj.csi = getNumber(getCSI(tePoll, teDoc.object_id.Value).csi);
    } else {
        obj.csi = "";
    }
    

    obj.link = "/_wt/education_org_rating/" + elem.id.Value;
    // obj.btn = '';
    oRes.array.push(obj)
    i++;
}


l.close(logger);
} catch (error) {
l.write(logger, error);
l.close(logger);
}

SORT.FIELD = "rating";
SORT.DIRECTION = "DESC";
oRes.array = ArraySort(oRes.array, SORT.FIELD, ((SORT.DIRECTION == "DESC") ? "-" : "+"));
if (ObjectType(PAGING) == 'JsObject' && PAGING.SIZE != null) {
    PAGING.MANUAL = true;
    PAGING.TOTAL = ArrayCount(oRes.array);
    oRes.array = ArrayRange(oRes.array, OptInt(PAGING.INDEX, 0) * PAGING.SIZE, PAGING.SIZE);
}

RESULT = oRes.array;
DATA = oRes.data;
ERROR = oRes.error;
MESSAGE = oRes.errorText;