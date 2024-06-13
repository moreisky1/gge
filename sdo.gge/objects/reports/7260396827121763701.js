function isEqual(one, two) {
    return StrLowerCase(one) == StrLowerCase(two);
}

var eqField = "fullname";
if ({PARAM1} != null && {PARAM1} != "") {
    eqField = {PARAM1};
}

var condArray = ["1=1"];
// condArray.push("is_dismiss=false()");
// condArray.push("web_banned=false()");
condArray.push("$elem/" + eqField + "!=null()");
var cond = ArrayMerge(condArray, "This", " and ")
var a = ArraySelectAll(XQuery("for $elem in collaborators where " + cond + " order by $elem/" + eqField + " return $elem"));
var arr = [];
var final_arr = [];

var eqPrev = false;
var eqNext = false;

if (isEqual(a[0].ChildValue(eqField), a[1].ChildValue(eqField))) {
    eqPrev = true;
    arr.push(a[0]);
}

var i = 1;
while (i < ArrayCount(a) - 1) {
    eqNext = isEqual(a[i].ChildValue(eqField), a[i+1].ChildValue(eqField));
    if (eqPrev || eqNext) {
        arr.push(a[i]);
    }
    eqPrev = eqNext;
    i++;
}

if (eqPrev) {
    arr.push(a[ArrayCount(a) - 1]);
}

for (elem in arr) {
    obj = {};
    for (fldElem in elem) {
        if (fldElem.Name != "id") {
            obj.SetProperty(fldElem.Name, String(fldElem));
        }
    }
    obj.SetProperty("PrimaryKey", String(elem.id));
    final_arr.push(obj);
}

return final_arr;