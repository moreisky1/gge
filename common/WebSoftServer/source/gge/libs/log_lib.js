function clear() {
    var url = "x-local://source/gge/libs/log_lib.js";
    DropFormsCache(url);
    return OpenCodeLib(url);
}

function initLogger(logger) {
    var dlib = OpenCodeLib("x-local://source/gge/libs/develop.js");
    var isOk = false;
    var isValidLogType = false;
    var isValidLogName = false;
    var isValidExcelUrl = false;
    if (dlib.isValidObjField(logger, "logType", "String")) {
        if (ArrayCount(ArrayIntersect([logger.logType], ["system", "ext", "excel", "report"])) != 0) isValidLogType = true;
    }
    if (isValidLogType) {
        isValidLogName = dlib.isValidObjField(logger, "logName", "String");
        if (dlib.isValidObjField(logger, "excelUrl", "String")) {
            if (StrBegins(logger.excelUrl, "x-local://")) isValidExcelUrl = true;
        }
        if (logger.logType == "ext") {
            if (isValidLogName) {
                docOpened = tools.open_doc(logger.logName);
                if (docOpened != undefined) logger.logName = "logger/" + docOpened.TopElem.name.Value + " - " + logger.logName;
            } else {
                logger.logName = "logger/ext_log";
            }
        }
        if (logger.logType == "excel") {
            if (isValidLogName) {
                docOpened = tools.open_doc(logger.logName);
                if (docOpened != undefined) logger.logName = docOpened.TopElem.name.Value + " - " + logger.logName;
            } else {
                logger.logName = "excel_log";
            }
            if (!isValidExcelUrl) logger.excelUrl = "x-local://Logs/logger/";
        }
        if (logger.logType == "report") {
            if (isValidLogName) {
                docOpened = tools.open_doc(logger.logName);
                if (docOpened != undefined) logger.logName = docOpened.TopElem.name.Value + " - " + logger.logName;
            } else {
                logger.logName = "report_log";
            }
        }
        isOk = true;
    }
    logger.isLog = dlib.isValidObjField(logger, "isLog", "Bool") ? isOk && logger.isLog : isOk;
}

/*
logger = {
    isLog: true, // вести логирование выполнения агента
    logType: "ext", // метод вывода в лог - system, ext, excel, report
    logName: "ext_log", // префикс файла журнала (для logType = "ext", "report")
    excelUrl: "x-local://Logs/", // директория для сохранения файла на сервер (logType = "excel")
    docReport: undefined, // doc (для logType = "report")
    sLogStr: "" // (для logType = "report", "excel")
}
*/
function open(logger) {
    initLogger(logger);
    if (logger.isLog) {
        if (logger.logType == "ext") {
            EnableLog(logger.logName, true);
        } else if (logger.logType == "excel") {
            logger.sLogStr = "<HTML><META HTTP-EQUIV=\"Content-Type\" CONTENT=\"text/html; charset=utf-8\"/><BODY><TABLE BORDER=\"1\" CELLPADDING=\"2\" CELLSPACING=\"0\"><TR><TD><B>" + Date() + " |</B> ОТЧЕТ ЗАПУЩЕН</TD></TR>";
        } else if (logger.logType == "report") {
            docReport = tools.new_doc_by_name("action_report", false);
            docReport.BindToDb(DefaultDb);
            docReport.TopElem.create_date = Date();
            docReport.TopElem.type = "result";
            docReport.TopElem.completed = false;
            // docReport.TopElem.object_id = curObjectID;
            docReport.TopElem.data_file_url = logger.logName;
            docReport.TopElem.report_text = Date() + ": begin\n";
            docReport.TopElem.report_text += Date() + ": " + logger.logName + "\n";
            docReport.Save();
            logger.sLogStr = docReport.TopElem.report_text;
            logger.docReport = docReport;
        }
    }
}

function close(logger) {
    if (logger.isLog) {
        if (logger.logType == "ext") {
            EnableLog(logger.logName, false);
        } else if (logger.logType == "excel") {
            logger.sLogStr = logger.sLogStr + "<TR><TD><B>" + Date() + " |</B> ОТЧЕТ ЗАВЕРШЕН</TD></TR></TABLE></BODY></HTML>";
            if (LdsIsServer) {
                filename = logger.excelUrl + (logger.logName + "_" + Year(Date()) + "_" + Month(Date()) + "_" + Day(Date()) + "_" + Hour(Date()) + "_" + Minute(Date())) + ".xls";
                PutUrlText(filename, logger.sLogStr);
            } else {
                // filename = ObtainTempFile(".xls");
                filename = logger.excelUrl + (logger.logName + "_" + Year(Date()) + "_" + Month(Date()) + "_" + Day(Date()) + "_" + Hour(Date()) + "_" + Minute(Date())) + ".xls";
                PutUrlText(filename, logger.sLogStr);
                ShellExecute("open", filename);
            }
        } else if (logger.logType == "report") {
            logger.docReport.TopElem.completed = true;
            logger.docReport.TopElem.report_text = logger.sLogStr + Date() + ": end\n";
            logger.docReport.Save();
        }
    }
}

function write(logger, text) {
    if (logger.isLog) {
        if (logger.logType == "system") {
            alert(text);
        } else if (logger.logType == "ext") {
            LogEvent(logger.logName, text);
        } else if (logger.logType == "excel") {
            logger.sLogStr = logger.sLogStr + "<TR><TD><B>" + Date() + " |</B> " + text + "</TD></TR>";
        } else if (logger.logType == "report") {
            logger.sLogStr = logger.sLogStr + Date() + ": " + text + "\n";
        }
    }
}
