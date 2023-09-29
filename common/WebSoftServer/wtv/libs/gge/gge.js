"META:ALLOW-CALL-FROM-CLIENT:1"
function clearAllLibs() {
    var dirUrl = "x-local://source/gge/libs";
    var lib;
    for (lib in ReadDirectory(dirUrl)) {
        DropFormsCache(lib);
    }
}

"META:ALLOW-CALL-FROM-CLIENT:1"
function clearLib(libName) {
    var url = "x-local://source/gge/libs/" + libName + ".js";
     if (FilePathExists(UrlToFilePath(url)))
        DropFormsCache(url);
}

"META:ALLOW-CALL-FROM-CLIENT:1"
function getAllLibs() {
    var dirUrl = "x-local://source/gge/libs";
    var libs = {};
    var lib;
    for (lib in ReadDirectory(dirUrl)) {
        if (UrlFileName(lib).split(".")[1] == "js") {
            libs.SetProperty(UrlFileName(lib).split(".")[0], OpenCodeLib(lib));
        }
    }
    return libs;
}

"META:ALLOW-CALL-FROM-CLIENT:1"
function getLib(libName) {
    var res = undefined;
    var url = "x-local://source/gge/libs/" + libName + ".js";
     if (FilePathExists(UrlToFilePath(url)))
        res = OpenCodeLib(url);
    return res;
}
