// 7260396827121763701 - Дубликаты по ФИО

function isEqual(one, two) {
    return one == two;
}

a = ArraySelectAll(XQuery("for $elem in collaborators where is_dismiss=0 and web_banned=0 order by $elem/fullname return $elem"));
arr = [];
final_arr = [];


var eqPrev = false;
var eqNext = false;

if (isEqual(a[0].fullname.Value, a[1].fullname.Value)) {
    eqPrev = true;
    arr.push(a[0]);
}

var i = 1;
while (i < ArrayCount(a) - 1) {
    eqNext = isEqual(a[i].fullname.Value, a[i+1].fullname.Value);
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
