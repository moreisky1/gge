function clear() {
    var url = "x-local://source/gge/libs.js";
    DropFormsCache(url);
    return OpenCodeLib(url);
}

function clearAllLibs() {
    var dirLibs = [
        "x-local://source/gge/libs/develop.js"
        , "x-local://source/gge/libs/notif_lib.js"
        , "x-local://source/gge/libs/personal_lib.js"
        , "x-local://source/gge/libs/temp_lib.js"
        , "x-local://source/gge/libs/log_lib.js"
        , "x-local://source/gge/libs/event_outlook_lib.js"
    ]
    var lib;
    for (lib in dirLibs) {
        DropFormsCache(lib);
    }
}

function clearLib(libName) {
    var url = "x-local://source/gge/libs/" + libName + ".js";
    // if (FilePathExists(UrlToFilePath(url)))
        DropFormsCache(url);
}

function getAllLibs() {
    var libs = {};
    var lib;
    var dirLibs = [
        "x-local://source/gge/libs/develop.js"
        , "x-local://source/gge/libs/notif_lib.js"
        , "x-local://source/gge/libs/personal_lib.js"
        , "x-local://source/gge/libs/temp_lib.js"
        , "x-local://source/gge/libs/log_lib.js"
        , "x-local://source/gge/libs/event_outlook_lib.js"
    ]
    for (lib in dirLibs) {
        if (UrlFileName(lib).split(".")[1] == "js") {
            libs.SetProperty(UrlFileName(lib).split(".")[0], OpenCodeLib(lib));
        }
    }
    return libs;
}

function getLib(libName) {
    var res = undefined;
    var url = "x-local://source/gge/libs/" + libName + ".js";
     //if (FilePathExists(UrlToFilePath(url)))
        res = OpenCodeLib(url);
    return res;
}
