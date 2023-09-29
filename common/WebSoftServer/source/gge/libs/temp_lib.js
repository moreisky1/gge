function clear() {
    var url = "x-local://source/gge/libs/temp_lib.js";
    DropFormsCache(url);
    return OpenCodeLib(url);
}

function foo() {
    return "foo";
}
