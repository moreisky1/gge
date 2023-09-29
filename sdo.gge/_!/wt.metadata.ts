type Integer = number;
type Real = number;
type bool = boolean;
type Bool = boolean;
type XmlElem = spXmlElem;
type ScreenItem = spScreenItem;
type Session = Object;
type x = Object;
type XmlCatalog = object;
type HttpResponse = object;
type SpXml = object;
type XmlDoc = object;
type Stream = spStream;
type MailMessageMailMessage = object;
type XmlDatabase = String;
type FileStream = Stream;
type BufStream = Stream;
type tools = wttools;
var tools: tools = {};
type tools_web = wttools_web;
var tools_web: tools_web = {};

class spStream {
    /**
          * Читает следующую строку из потока. Если данных для чтения 
  не осталось, возвращается undefined.
  Строка может отделяться последовательностями LF, CR или CRLF.
          
          * @link http://docs.datex.ru/article.htm?id=5665465792879477151
          */
    ReadLine(): String;

    /**
                 * Записывает содержимое бинарного объекта в поток.
                 
                 * @link http://docs.datex.ru/article.htm?id=5665465792879477153
                 */
    WriteBinary(binaryObj: any): undefined;

    /**
                 * Записывает содержимое строки в поток.
                 
                 * @link http://docs.datex.ru/article.htm?id=5665465792879477152
                 */
    WriteStr(str: String): undefined;
}

class ActiveXObject {
    constructor(object: string) {
        switch (object) {
            case "Websoft.Office.Excel.Document":
                return;
                break;

            default:
                break;
        }
    }
}

class JsObject {
    /**
    Возвращает значение атрибута объекта. Если атрубут отсутствует, выдает undefined.
    * @param propName наименование атрибута объекта.
    * @param defaultVal значение по умолчани, возращаемое в случае отстутвия атрибута (Any). Необязятельный аргумент. По умолчанию равен undefined.
    */
    GetOptProperty(propName: string, defaultVal?: string = undefined): any {
        return "";
    }
    /**
     * Устанавливает значение атрибута объекта. Если атрубут отсутствует, добавляет его.
     * @param  {string} propname  наименование атрибута объекта
     * @param  {any} propval значение атрибута объекта.
     */
    SetProperty(propname: string, propval: any) { }
}

/**
  * Преобразует значение аргумента к целому числу.
  * @example Int( 123 )
     
Int( '123' )
     
Int( 123.45 )
* @link http://docs.datex.ru/article.htm?id=5620276892448878640
*/
function Int(arg: any): Integer {
    return;
}

function OptInt(arg: any, defArg: any): Integer {
    return;
}

/**
              * Преобразует значение аргумента к вещественному 
      числу.
              * @example Real( 12.6 )
           
      Real( '12.6' )
              * @link http://docs.datex.ru/article.htm?id=5620276892448878734
              */
function Real(arg: any): Real {
    return;
}

/**
              * Возвращает скалярное значение аргумента, 
      если в качестве аргумента передан объект. Если передано скалярное 
      значение, возращается оно же.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878749
              */
function RValue(arg: any): any {
    return;
}

/**
              * Преобразует 10 обозначение цвета (RGB) в 
      шестнадцатиричное, принятое в формате html.
              * @example Пример: StrHexColor( '128,128,128' ) вернет '#808080'
              * @link http://docs.datex.ru/article.htm?id=5620276892448878782
              */
function StrHexColor(color: String): String {
    return;
}

/**
              * Возвращает строку, содержащую аргумент в 
      шестнадцатиричном виде (64 бита).
              * @example StrHexInt( 1000 ) вернет '00000000000003E8'
              * @link http://docs.datex.ru/article.htm?id=5620276892448878783
              */
function StrHexInt(num: Integer): String {
    return;
}

/**
              * Преобразует целочисленный аргумент в строку.
              * @example StrInt( 11500 ) вернет '11500'
           
      StrInt( 11500, 6 ) вернет '011500' 
           
      StrInt( 11500, 0, true ) вернет '11 500'
              * @link http://docs.datex.ru/article.htm?id=5620276892448878785
              */
function StrInt(arg: Integer): String {
    return;
}

/**
              * Если значение целочисленного аргумента = 0 
      преобразует его в "-", иначе в строку (аналогично функции StrInt 
      ())
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878786
              */
function StrIntZero(arg: Integer): String {
    return;
}

/**
              * Преобразует вещественный аргумент в строку.
              * @example StrReal( 
      90154.249 ) вернет '90154.249'
          StrReal( 
      90154.249, 2 ) вернет '90154.25'
          StrReal( 
      90154.249, 2, true ) вернет '90 154.25'
              * @link http://docs.datex.ru/article.htm?id=5620276892448878797
              */
function StrReal(arg: Real): String {
    return;
}

/**
              * Преобразует вещественный аргумент в строку.
              * @example StrRealFixed( 90154.2 ) вернет '90154.20'
          StrRealFixed( 90154.2, 2, true ) вернет '90 
      154.20'
              * @link http://docs.datex.ru/article.htm?id=5620276892448878798
              */
function StrRealFixed(arg: Real): String {
    return;
}

/**
              * Преобразует целое число в словесное строковое 
      представление. Только для русского языка.
              * @example TextInt( 121 ) возвращает 'сто двадцать один'
           
      TextInt( 121, 1 ) возвращает 'сто двадцать одна'
              * @link http://docs.datex.ru/article.htm?id=5620276892448878818
              */
function TextInt(arg: Integer): String {
    return;
}

/**
              * Проверяет, начинается ли строка на другую 
      строку.
              * @example StrBegins(str, subStr, ignoreCase)
              * @link http://docs.datex.ru/article.htm?id=5620276892448878778
              */
function StrBegins(str: String): Bool {
    return;
}

/**
              * Возвращает количество символов в строке.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477143
              */
function StrCharCount(str: String): Integer {
    return;
}

/**
              * Проверяет, содержит ли строка другую строку в 
      качестве подстроки.
              * @example StrContains(str, subStr, ignoreCase)
              * @link http://docs.datex.ru/article.htm?id=5620276892448878779
              */
function StrContains(str: String): Bool {
    return;
}

/**
              * Проверяет, оканчивается ли строка на другую 
      строку.
              * @example StrEnds(str, subStr, ignoreCase)
              * @link http://docs.datex.ru/article.htm?id=5620276892448878781
              */
function StrEnds(str: String): Bool {
    return;
}

/**
              * Проверяет состоит ли строка только из цифр или 
      латинских символов.
              * @example StrIsAlphaNum(str)
              * @link http://docs.datex.ru/article.htm?id=5620276892448878787
              */
function StrIsAlphaNum(str: String): Bool {
    return;
}

/**
              * Возвращает часть строки str, длиной length, начиная с первого символа 
      переданной строки.
      Если второй аргумент больше 
      длины передаваемой строки, возвращается str
              * @example StrLeftRange(str, length)
              * @link http://docs.datex.ru/article.htm?id=5620276892448878788
              */
function StrLeftRange(str: String): String {
    return;
}

/**
              * Возвращает длину строки в байтах.
      Данная длина может быть больше количества символов, если приложение 
      использует кодировку UTF-8. Для определения количества символов в строке 
      необходимо использовать функцию StrCharCount.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878789
              */
function StrLen(str: String): Integer {
    return;
}

/**
              * Переводит все символы строки в нижний 
      регистр.
              * @example StrLowerCase(str)
              * @link http://docs.datex.ru/article.htm?id=5620276892448878791
              */
function StrLowerCase(str: String): String {
    return;
}

/**
              * Проверяет, удовлетворяет ли строка одной из масок. 
      Маски перечисляются через запятую вторым аргументом.
              * @example StrMatchesMultiPattern( str, 'aaa*bbb,ccc*ddd*eee' 
      )
              * @link http://docs.datex.ru/article.htm?id=5620276892448878792
              */
function StrMatchesMultiPattern(str: String): Bool {
    return;
}

/**
              * Проверяет, удовлетворяет ли строка маске поиска, 
      использующей симолы '*'
              * @example StrMatchesPattern( str, 'aaa*bbb' )
              * @link http://docs.datex.ru/article.htm?id=5620276892448878793
              */
function StrMatchesPattern(str: String): Bool {
    return;
}

/**
 * Переводит первую букву строки в нижний регистр.
 * @example StrNonTitleCase(str)
 * @link http://docs.datex.ru/article.htm?id=5620276892448878795
 */
function StrNonTitleCase(str: String): String {
    return;
}

/**
 * Возвращает часть строки по заданным позициям.
 * @example StrRangePos( str, pos1, pos2 )
 * @link http://docs.datex.ru/article.htm?id=5620276892448878796
 */
function StrRangePos(str: String): String {
    return;
}

/**
              * Заменяет все вхождения одной подстроки на другую в 
      заданной строке, если такие имеются. Возвращает измененную строку.
              * @example StrReplace(str, subStr, newSubStr)
              * @link http://docs.datex.ru/article.htm?id=5620276892448878799
              */
function StrReplace(str: String): String {
    return;
}

/**
 * Заменяет первое вхождение строки на указанную подстроку.
 * @example StrReplaceOne(str1, str2)
 * @link http://docs.datex.ru/article.htm?id=5620276892448878800
 */
function StrReplaceOne(str: String): String {
    return;
}

/**
              * Возвращает часть строки, начиная с указанной позиции 
      до конца строки.
              * @example StrRightRangePos(str, pos)
              * @link http://docs.datex.ru/article.htm?id=5620276892448878801
              */
function StrRightRangePos(str: String): String {
    return;
}

/**
              * Извлекает из строки фрагменты в соответствии с 
      заданным шаблоном. Шаблоны могут содержать элементы:
      %s - вхождение подстроки (возращаемое)
      %*s - вхождение подстроки (невозвращаемое)
              * @example obj = StrScan( 
      str, '%*s/vacancy/%s.htm' );
      vacancyID = obj[0];
              * @link http://docs.datex.ru/article.htm?id=5620276892448878802
              */
function StrScan(str: String): Array<any> {
    return;
}

/**
 * Преобразует первую букву строки в заглавную.
 * @example StrTitleCase(str)
 * @link http://docs.datex.ru/article.htm?id=5620276892448878807
 */
function StrTitleCase(str: String): String {
    return;
}

/**
 * Преобразует строку в нижний регистр.
 * @example StrUpperCase(str)
 * @link http://docs.datex.ru/article.htm?id=5620276892448878808
 */
function StrUpperCase(str: String): String {
    return;
}

/**
              * Экспериментальная.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878809
              */
function StrWordMatchRating(): undefined {
    return;
}

/**
              * Удаляет символы пробела, перевода строк и табуляции 
      в начале и конце строки.
              * @example Trim(str)
              * @link http://docs.datex.ru/article.htm?id=5620276892448878821
              */
function Trim(str: String): String {
    return;
}

/**
              * Заменяет повторяющиеся последовательности символов 
      пробела, перевода строк и табуляции в строке на одиночные пробелы.
              * @example UnifySpaces(str)
              * @link http://docs.datex.ru/article.htm?id=5620276892448878824
              */
function UnifySpaces(str: String): String {
    return;
}

/**
              * Возвращает разницу между 2-мя датами в 
      секундах. Если первая дата меньше второй, разница будет отрицательным 
      числом.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911753
              */
function DateDiff(date: Date): Integer {
    return;
}

/**
              * Изменяет значение времени в заданной дате. Возвращает измененную дату. Если указан 
      только первый аргумент, функция возвращает дату без времени.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911754
              */
function DateNewTime(date: Date): Date {
    return;
}

/**
              * Конструктор стандартного объекта JavaScript 
      Date.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911752
              */
function Date(date: String): Date {
    return;
}

/**
              * Сдвигает дату на указанное число секунд. Если значение второго аргумента 
      отрицательное, дата сдвигается назад.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911755
              */
function DateOffset(date: Date): Date {
    return;
}

/**
              * Возвращает количество секунд, прошедших с 1970 года 
      до заданной даты.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911756
              */
function DateToRawSeconds(date: Date): Integer {
    return;
}

/**
              * Возвращает значение дня (1-31) для заданной 
      даты.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911757
              */
function Day(date: Date): Integer {
    return;
}

/**
              * Возвращает время в милисекундах, прошедшее с момента 
      запуска операционной системы.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878597
              */
function GetCurTicks(): Integer {
    return;
}

/**
              * Возвращает значение часа для заданной даты. Если 
      дата не содержит времени, возращается undefined.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878629
              */
function Hour(date: Date): Integer {
    return;
}

/**
              * Возвращает значение минуты для заданной даты. Если 
      дата не содержит времени, возращается undefined.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878674
              */
function Minute(date: Date): Integer {
    return;
}

/**
              * Возвращает номер месяца (1-12) для заданной 
      даты.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878677
              */
function Month(date: Date): Integer {
    return;
}

/**
              * Преобразует строку с датой в большинсве изветных 
      форматов в дату.
      В отличие от функции Date() понимает дату 
      со словесным указанием месяца, например '1 ноября 2011 года'
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878704
              */
function ParseDate(date: String): Date {
    return;
}

/**
              * Преобразует количество секунд, прошедших с 1970 года 
      в дату.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878721
              */
function RawSecondsToDate(seconds: Integer): Date {
    return;
}

/**
              * Возвращает значение секунд для заданной даты. Если 
      дата не содержит значения секунд, возращается undefined.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878753
              */
function Second(date: Date): Integer {
    return;
}

/**
              * Преобразует дату в строку в формате, используемом по 
      умолчанию в операционной системе.
      Если в качестве аргумента 
      передается null или пустая строка, функция возвращает пустую 
      строку.
              * @example StrDate(Date, ShowTime, ShowSeconds) Преобразует дату в 
      строку.
              * @link http://docs.datex.ru/article.htm?id=5620276892448878780
              */
function StrDate(date: Date): String {
    return;
}

/**
              * Преобразует дату в строку в "длинном" формате (со 
      словесным написанием месяца).
      Если в качестве аргумента 
      передается null или пустая строка, функция возвращает пустую 
      строку.
              * @example StrLongDate( Date( '26.12.2011' ) ) вернет '26 декабря 
      2011 г.'
              * @link http://docs.datex.ru/article.htm?id=5620276892448878790
              */
function StrLongDate(date: Date): String {
    return;
}

/**
              * Пребразует дату в формат MIME.
              * @example StrMimeDate( Date( '26.12.2011 10:45' ) ) вернет 'Mon, 26 Dec 2011 10:45:00 
      +0400'
              * @link http://docs.datex.ru/article.htm?id=5620276892448878794
              */
function StrMimeDate(Date: Date): Date {
    return;
}

/**
              * Преобразует дату в строку, с двухсимвольным форматом 
      года.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878803
              */
function StrShortDate(date: Date): String {
    return;
}

/**
              * Преобразует значение времени внутри даты в 
      строку.
      Если время не содержится внутри 
      даты, возвращается пустая строка.
              * @example StrTime( Date( '26.12.2011 10:45' ) ) вернет 
      '10:45'
              * @link http://docs.datex.ru/article.htm?id=5620276892448878806
              */
function StrTime(date: Date): String {
    return;
}

/**
              * Преобразует дату в строку в 
      формате, используемом в XML. Данный формат не зависит от региональных 
      настроек в системе.
              * @example StrXmlDate( Date( '26.12.2011' ) ) вернет '2011-12-26'
           StrXmlDate( Date( '26.12.2011 10:45' ) ) вернет 
      '2011-12-26T10:45'
              * @link http://docs.datex.ru/article.htm?id=5620276892448878810
              */
function StrXmlDate(date: Date): undefined {
    return;
}

/**
              * Преобразует дату из универсального часового пояса в 
      текущий часовой пояс.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592513
              */
function UtcToLocalDate(date: Date): Date {
    return;
}

/**
              * Возвращает номер дня недели для заданной даты. (0 - 
      Воскресенье, 1 - Понедельник и т.д.)
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592515
              */
function WeekDay(date: Date): Integer {
    return;
}

/**
              * Возвращает значение года для заданной даты.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592525
              */
function Year(date: Date): Integer {
    return;
}

/**
              * Возвращает путь к директории, из которой запущено 
      приложение.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911686
              */
function AppDirectoryPath(): String {
    return;
}

/**
              * Создает новую директорию внутри существующей 
      директории.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911745
              */
function CreateDirectory(path: String): undefined {
    return;
}

/**
              * Создает ярлык на указанный файл.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911746
              */
function CreateShellLink(linkPath: String): undefined {
    return;
}

/**
              * Удаляет директорию, включая все вложенные файлы и 
      директории.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911765
              */
function DeleteDirectory(path: String): undefined {
    return;
}

/**
              * Удаляет файл.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911767
              */
function DeleteFile(path: String): void {
    return;
}

/**
              * Проверяет открыт ли файл в другом приложении.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911790
              */
function FileIsBusy(path: String): Bool {
    return;
}

/**
              * Извлекает имя файла из пути, переданного в качестве 
      аргумента.
              * @example FileName( 'work\data\doc.pdf' ) вернет 'doc.pdf'
          FileName( 
      'work\data\' ) вернет 'data'
              * @link http://docs.datex.ru/article.htm?id=5620250451197911791
              */
function FileName(url: String): String {
    return;
}

/**
              * Проверяет существует ли файл (или 
      директория) по указанному пути.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911792
              */
function FilePathExists(path: String): Bool {
    return;
}

/**
              * Возвращает дату модификации файла.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878603
              */
function GetFileModDate(path: String): Date {
    return;
}

/**
              * Возвращает путь к одной из стандартных директорий 
      Shell.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454892
              */
function GetShellFolderPath(folderID: String): String {
    return;
}

/**
              * Проверяет является ли путь к файлу, переданный в 
      качестве аргумента.
      Существование файла по данному пути не проверяется.
              * @example IsAbsoluteFilePath( 'c:\temp\1.ddd' ) вернет 
      true
           IsAbsoluteFilePath( 'temp\1.ddd' ) вернет 
      false
              * @link http://docs.datex.ru/article.htm?id=5620276892448878642
              */
function IsAbsoluteFilePath(path: String): Bool {
    return;
}

/**
              * Проверяет, является ли указанный путь 
      (или url) директорией.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878646
              */
function IsDirectory(path: String): Bool {
    return;
}

/**
              * Загружает содержимое файла по заданному пути, 
      результат возвращается в виде строки, содержащей бинарные данные.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878660
              */
function LoadFileData(path: String): String {
    return;
}

/**
              * Перемещает или переименовывает файл.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878678
              */
function MoveFile(path: String): undefined {
    return;
}

/**
              * Проверяет, существует ли указанная директория, если 
      нет - создает ее.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878688
              */
function ObtainDirectory(path: String): undefined {
    return;
}

/**
              * Возвращает url для временного файла, который будет 
      автоматически удален при следующем запуске приложения.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878689
              */
function ObtainSessionTempFile(suffix?: String): String {
    return;
}

/**
              * Возвращает url для временного файла.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878690
              */
function ObtainTempFile(suffix?: String): String {
    return;
}

/**
              * Возвращает путь к родительской директории.
      Фактическое существование директорий не проверяется.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878702
              */
function ParentDirectory(path: String): String {
    return;
}

/**
              * Проверяет, существует ли директория по указанному 
      пути.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878707
              */
function PathIsDirectory(path: String): Bool {
    return;
}

/**
              * Сохраняет содержимое строки в файл. 
      Содержимое строки интерпретируется как бинарные данные.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878715
              */
function PutFileData(path: String): undefined {
    return;
}

/**
              * Возвращает массив, содержащий список файлов 
      и вложенных директорий внутри указанной директории.
      Каждый элемент массива будет содержать url вложенного файла или 
      директории.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878725
              */
function ReadDirectory(dirUrl: String): Array<any> {
    return;
}

/**
              * Возвращает массив, содержащий список файлов 
      и вложенных директорий внутри указанной директории.
      Каждый элемент массива будет содержать полный путь ко вложенному файлу или 
      директории.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878726
              */
function ReadDirectoryByPath(path: String): Array<any> {
    return;
}

/**
              * Возвращает путь к директории для хранении данных 
      пользователя.
      По умолчанию директория 
      совпадает с установочной, если специальными настройками не установлено 
      иное.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878847
              */
function UserDataDirectoryPath(): String {
    return;
}

/**
              * Декодирует данные из формата 
      Base64. Данные возвращаются в виде строки, которая может содержать 
      бинарные данные.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911716
              */
function Base64Decode(str: String): String {
    return;
}

/**
              * Кодирует строку в формат Base64.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911717
              */
function Base64Encode(str: String): String {
    return;
}

/**
              * Переводит строку из заданной кодировки в кодировку, 
      используемой в программе по умолчанию.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911758
              */
function DecodeCharset(str: String): String {
    return;
}

/**
              * Переводит строку из кодировки, используемой  в 
      программе по умолчанию, в заданную кодировку.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911776
              */
function EncodeCharset(str: String): String {
    return;
}

/**
 * Преобразует массив байт в 16-ое представление.
 * @example HexData( 'апрол' ) вернет 'E0EFF0EEEB'
 * @link http://docs.datex.ru/article.htm?id=5620276892448878628
 */
function HexData(arg: String): String {
    return;
}

/**
              * Кодирует строку, содержащую текст, для использования 
      внутри HTML. В результате символы & и < 
      заменяются на &amp; и &lt;, 
      соответственно, а переводы строк - на <br/>.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878630
              */
function HtmlEncode(str: String): String {
    return;
}

/**
              * Преобразует строку, содержащую обычный текст в 
      полный HTML-документ. Действие функции аналогично действию функции HtmlEncode(), 
      но, в отличие от последней, HtmlEncodeDoc() формирует завершенный 
      HTML-документ, содержащий теги <html>, <body> и др.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878631
              */
function HtmlEncodeDoc(str: String): String {
    return;
}

/**
              * Преобразует строку, содержащую HTML, в простой 
      текст.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878633
              */
function HtmlToPlainText(html: String): String {
    return;
}

/**
              * Формирует тело http запроса для последующей отправки 
      методом POST в формате multipart/form-data.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878679
              */
function MultipartFormEncode(obj: Object): String {
    return;
}

/**
              * Кодирует обычный текст в формат rtf.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878747
              */
function RtfEncode(str: String): String {
    return;
}

/**
              * Переводит текст в формате rtf в обычный 
      текст.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878748
              */
function RtfToPlainText(str: String): String {
    return;
}

/**
              * Кодирует значение как константу 
      (литерал) языка SQL. Функция используется при генерированиия выражений на 
      SQL из программы.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878773
              */
function SqlLiteral(arg: any): String {
    return;
}

/**
              * Дешифрует строку, зашифрованную простым встроенным 
      алгоритмом.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878804
              */
function StrSimpleDecrypt(str: String): String {
    return;
}

/**
              * Шифрует строку простым встроенным алгоритмом 
      шифрования.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878805
              */
function StrSimpleEncrypt(str: String): String {
    return;
}

/**
              * Декодирует строчку по стандартным правилам 
      декодирования url, т.е. заменяет 
      знак "%код" на соответствующий символ.
              * @example UrlDecode( 'qwerty%2D%E0%EF%F0%EE%EB%2Ehtm' ) вернет 
      'qwerty-апрол.htm'
              * @link http://docs.datex.ru/article.htm?id=5620276892448878829
              */
function UrlDecode(url: String): String {
    return;
}

/**
              * Кодирует строку символов для использования в 
      качестве параметра url.
              * @example UrlEncode( 'qwerty-апрол.htm' ) вернет 
      'qwerty%2D%E0%EF%F0%EE%EB%2Ehtm'
              * @link http://docs.datex.ru/article.htm?id=5620276892448878831
              */
function UrlEncode(str: String): String {
    return;
}

/**
              * Кодирует строку символов для использования в 
      качестве параметра url, используя UTF-16.
              * @example UrlEncode( 'qwerty-апрол.htm' ) вернет 
      'qwerty%2D%u0430%u043F%u0440%u043E%u043B%2Ehtm'
              * @link http://docs.datex.ru/article.htm?id=5620276892448878832
              */
function UrlEncode16(str: String): String {
    return;
}

/**
              * Преобразут объект типа Object в строку вида 
      'name1=value1&name2=value2&...' для использования в качестве запроса в 
      url.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878833
              */
function UrlEncodeQuery(obj: Object): String {
    return;
}

/**
              * Преобразут объект типа Object в строку вида 
      'name1=value1&name2=value2&...' для использования в качестве запроса в 
      url.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878834
              */
function UrlEncodeQueryExt(obj: Object): String {
    return;
}

/**
              * Маскирует аргумент для вставки в xml в качестве 
      значения атрибута. В результате действия функции символы перевода строки, 
      табуляции, симводы & и < и двойные 
      кавычки маскируются последовательностями &#10;, 
      &#09;, &lt;, 
      &amp; и &quot;
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592518
              */
function XmlAttrEncode(str: String): String {
    return;
}

/**
              * Формирует строку с xml тегом.
              * @example XmlStr( 'text', 'Hotel "Ariana"' ) возвращает '<text>'Hotel 
      &quot;Ariana&quot;</text>'
              * @link http://docs.datex.ru/article.htm?id=5620276905286592519
              */
function XmlStr(name: String): String {
    return;
}

/**
              * Кодирует аргумент как константу XQuery. Функция 
      используется при генерированиия выражений XQuery из программы.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592521
              */
function XQueryLiteral(arg: String): String {
    return;
}

/**
              * Создает новый элемент формы. Созданный элемент формы не имеет родительского 
      элемента.
      Функция используется в редких случаях, например для динамической генерации 
      форм данных.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592615
              */
function CreateFormElem(name: String): XmlFormElem {
    return;
}

/**
              * Удаляет все зарегистрированные при помощи фукции RegisterFormMapping() 
      перенаправления форм.
      Функция обычно используется при конвертации баз данных из предыддущих версий 
      программы.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592626
              */
function DeleteAllFormMappings(): void {
    return;
}

/**
              * Удаляет определенные форму из кэша. Функция 
      используется в редких случаях при изменении структур данных на лету.
              * @example DropFormsCache( '*candidate*' )
              * @link http://docs.datex.ru/article.htm?id=5620276905286592630
              */
function DropFormsCache(urlPattern: String): undefined {
    return;
}

/**
              * Загружает 
      форму из XMD-файла и помещает его в кэш форм.  
      
      Если форма с данным url уже находится в кэше, возвращается уже 
      загруженный вариант.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592616
              */
function FetchForm(formUrl: String): void {
    return;
}

/**
              * Находит зарегистрированный AutoDoc (т.е пару url документа - url формы, 
      смотри так же функцию RegisterAutoDoc ) в 
      списке зарегистрированных автоматически документов, и возвращает ссылку на 
      форму. Если соответствующая пара в списке отсутствует, возвращает 
      undefined.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592623
              */
function GetOptAutoDocForm(): XmlForm {
    return;
}

/**
              * Пытается найти форму в кэше загруженных форм 
      по заданному url. Если такая форма была загружена в кэш, возвращает объект 
      ссылка на форму, если нет - возвращает undefined.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592617
              */
function GetOptCachedForm(): XmlForm {
    return;
}

/**
              * Регистрирует пару (url  документа) - (url формы) для автоматически 
      создаваемого документа. Если где-то из программы будет обращение к этому 
      документу с попыткой его открыть, а документ еще не создан, то он будет создан 
      по форме и открыт. Если документ на момент обращения уже будет существовать, то 
      он будет открыт по той же форме. Используется для регистрации в программе 
      каких-либо файлов, содержащих настройки, которых изначально нет, но при первой 
      попытки обращения к ним она фактически созадются в базе данных.
              * @example RegisterAutoDoc( 'x-local://static/global-settings.xml', 
      'x-app://rcr/rcr_global_settings.xmd' )
              * @link http://docs.datex.ru/article.htm?id=5620276905286592622
              */
function RegisterAutoDoc(docUlr: String): undefined {
    return;
}

/**
              * Регистрирует XML-форму, описанную в строке. Используется для программной 
      генерации форм "на лету".
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592618
              */
function RegisterFormFromStr(formUrl: String): XmlForm {
    return;
}

/**
              * Регистрирует отображение (mapping) одной формы в другую. 
      Mapping - это таблица, в которой содрежит соответствия между старыми и 
      новыми формами документов. При попытке открыть документ по старой форме, будет 
      автоматически вызвана новая форма, на которую указывает элемент 
      таблицы.
      Функция используется  вредких случаях, обычно при 
      конвертации данных из предыддыщих версий программы.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592625
              */
function RegisterFormMapping(formUrl: String): undefined {
    return;
}

/**
              * Региструрует фрагмент (элемент) существующий формы под 
      новым url. Новый url состоит из url формы и полного наименования элемента 
      формы, которое включает в себя путь внутри формы от корня до этого 
      элемента. Возвращает url новой формы.
      Редко используемая функция.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592619
              */
function RegisterSubForm(): String {
    return;
}

/**
              * Преобразует заданный url в абсолютный.
      Если заданный url и так является абсолютным, возвращается он же.
              * @example AbsoluteUrl( 'zz/1.htm', 'x-local://data/static' ) вернет 
      'x-local://data/static/zz/1.htm' 
           
      AbsoluteUrl( 'zz/1.htm' ), вызванный в библиотеке 
      x-app://rcr/rcr_lib_recruit.js, вернет 'x-app://rcr/zz/1.htm'
              * @link http://docs.datex.ru/article.htm?id=5620250451197911677
              */
function AbsoluteUrl(url: String): String {
    return;
}

/**
              * Регистрирует автоматическую подмену одного url 
      другим.
      После вызова функции при 
      попытке любого обращения к url, являющегося дочерним, по отношению к исходному 
      базовому, будет происходить обращение к новому url, полученному путем замены 
      исходной базовой части на новую базовую часть.
      Функция как правило 
      используется для конвертации данных из предыдущих версий программ в новую, при 
      которой старые формы .xmd более не существуют и заменяются на 
      новые.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911683
              */
function AddUrlMapping(baseUrl: String): undefined {
    return;
}

/**
              * Копирует содержимое под заданным url в новый 
      url.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911743
              */
function CopyUrl(destUrl: String): undefined {
    return;
}

/**
              * Удаляет объект с заданным url.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911769
              */
function DeleteUrl(url: String): undefined {
    return;
}

/**
              * Преобразует путь файловой системы в локальный url 
      типа file: или x-local:
              * @example FilePathToUrl( 'C:\\Temp\\1.htm' ) вернет 'file:///C:/Temp/1.htm'
              * @link http://docs.datex.ru/article.htm?id=5620250451197911793
              */
function FilePathToUrl(filePath: String): String {
    return;
}

/**
              * Проверяет является ли 
      строка абсолютным URL.
      Существование объекта под указанным url не проверяется.
              * @example IsAbsoluteUrlStr( 'http://www.ya.ru/search.htm' ) вернет 
      true
          
      IsAbsoluteUrlStr( 'search.htm' ) вернет false
              * @link http://docs.datex.ru/article.htm?id=5620276892448878643
              */
function IsAbsoluteUrlStr(url: String): Bool {
    return;
}

/**
              * Загружает содержимое заданного url и возвращает его 
      в виде строки, содержащей бинарные данные.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878664
              */
function LoadUrlData(url: String): String {
    return;
}

/**
              * Сохраняет содержимое строки, содержащей бинарные 
      данные, в заданном url.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878717
              */
function PutUrlData(url: String): undefined {
    return;
}

/**
              * Заменяет суффикс (расширение) имени файла в заданном 
      url. Если заданный url имеет другой суффикс в имени файла, возвращается исходный 
      url.
      Функция не осуществляет фактического обращения к файловой системе.
              * @example ReplaceUrlPathSuffix( 
      'http://news.websoft.ru/tree.html?query', 'html', 'asp' ) вернет 
      'http://news.websoft.ru/tree.asp?query'
              * @link http://docs.datex.ru/article.htm?id=5620276892448878739
              */
function ReplaceUrlPathSuffix(url: String): String {
    return;
}

/**
              * Добавляет фрагмент пути к заданному 
      url.
              * @example UrlAppendPath( 'http://www.lin.ru/service', 'z/1.htm' ) вернет 
      'http://www.lin.ru/service/z/1.htm'
              * @link http://docs.datex.ru/article.htm?id=5620276892448878828
              */
function UrlAppendPath(url: String): String {
    return;
}

/**
              * Извлекает имя файла из заданного url.
              * @example UrlHost( 
      'http://news.websoft.ru/db/kb/0939DD37D1C5F9B8C3257403003E8F4F/tree.html?query=xxx' 
      ) вернет 'tree.html'
              * @link http://docs.datex.ru/article.htm?id=5620276892448878835
              */
function UrlFileName(url: String): String {
    return;
}

/**
              * Определяет размер файла в байтах по локальному 
      url, переданному в качестве аргумента.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878836
              */
function UrlFileSize(url: String): Integer {
    return;
}

/**
              * Возвращает хост из переданного в качестве аргумента 
      URL.
              * @example UrlHost( 
      'http://news.websoft.ru/db/kb/0939DD37D1C5F9B8C3257403003E8F4F/tree.html?query=xxx' 
      ) вернет 'news.websoft.ru'
              * @link http://docs.datex.ru/article.htm?id=5620276892448878838
              */
function UrlHost(url: String): String {
    return;
}

/**
              * Возвращает дату изменения файла, находящегося по 
      локальному пути типа file: или x-local:.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878839
              */
function UrlModDate(url: String): Date {
    return;
}

/**
              * Извлекает из url, переданного в качестве 
      аргумента, строку запроса в исходном виде.
              * @example UrlHost( 
      'http://news.websoft.ru/db/kb/0939DD37D1C5F9B8C3257403003E8F4F/tree.html?query=xxx' 
      ) вернет 'query=xxx'
              * @link http://docs.datex.ru/article.htm?id=5620276892448878840
              */
function UrlParam(url: String): String {
    return;
}

/**
              * Извлекает url родительской директории из заданного 
      url.
              * @example UrlParent( 
      'http://news.websoft.ru/db/kb/0939DD37D1C5F9B8C3257403003E8F4F/tree.html?query=xxx' 
      ) вернет 
      'http://news.websoft.ru/db/kb/0939DD37D1C5F9B8C3257403003E8F4F/'
              * @link http://docs.datex.ru/article.htm?id=5620276892448878841
              */
function UrlParent(url: String): String {
    return;
}

/**
              * Извлекает из URL, переданного в качестве аргумента, путь.
              * @example UrlPath( 
      'http://news.websoft.ru/db/kb/0939DD37D1C5F9B8C3257403003E8F4F/tree.html' ) 
      вернет '/db/kb/0939DD37D1C5F9B8C3257403003E8F4F/tree.html'
              * @link http://docs.datex.ru/article.htm?id=5620276892448878842
              */
function UrlPath(url: String): String {
    return;
}

/**
              * Возвращает расширение файла, укахзанного через 
      url.
              * @example UrlPathSuffix( 
      'http://news.websoft.ru/db/kb/0939DD37D1C5F9B8C3257403003E8F4F/tree.html' ) 
      вернет '.html'
              * @link http://docs.datex.ru/article.htm?id=5620276892448878843
              */
function UrlPathSuffix(url: String): String {
    return;
}

/**
              * Извлекает из URL, переданного в качестве аргумента, 
      параметры запроса с разбивкой их на пары "имя - значение".
              * @example obj = UrlQuery( 
      'http://news.websoft.ru/en?x=1&y=2&z=3' );alert( obj.x );
      alert( obj.y 
      );
              * @link http://docs.datex.ru/article.htm?id=5620276892448878844
              */
function UrlQuery(url: String): JsObject {
    return;
}

/**
              * Возвращает схему URL (file, http, mailto, ftp, 
      x-local).
              * @example UrlSchema( 'http://news.websoft.ru/' ) вернет 'http'
              * @link http://docs.datex.ru/article.htm?id=5620276892448878845
              */
function UrlSchema(url: String): String {
    return;
}

/**
              * Преобразует локальный url типа file: или x-local: в 
      путь файловой системы..
              * @example UrlToFilePath( 'file:///d:/work/Temp.rar' ) вернет 
      'd:\\work\\Temp.rar'
              * @link http://docs.datex.ru/article.htm?id=5620276892448878846
              */
function UrlToFilePath(url: String): String {
    return;
}

/**
              * Преобразует имя каталога в имя объекта. Фактически 
      функция преобразует имя существительное множественного числа в имя 
      существительное единственного числа по правилам английского языка.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592598
              */
function CatalogNameToObjectName(catalogName: String): String {
    return;
}

/**
              * Открывает базу 
      данных и помещает ее в список открытых баз. Если база уже открыта, 
      возвращается ссылка на открытую базу из списка.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592613
              */
function FetchDb(dbName: String): XmlDatabase {
    return;
}

/**
              * Ищет каталог по имени во всех используемых базах данных. 
      Если не находит - возврашает undefined.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477148
              */
function FindOptCatalog(catalogName: String): XmlCatalog {
    return;
}

/**
              * Ищет каталог по имени во всех используемых базах данных. 
      Если не находит - выдает ошибку.
       
      Функция по историческим причнам называется не совсем 
      корректно. Ее ближайший эквивалент - FindOptCatalog() имеет правильное 
      название.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592629
              */
function FindSharedCatalog(catalogName: String): XmlCatalog {
    return;
}

/**
              * На основании наименования зашифрованной базы данных (модуля) выдает полный 
      путь до зашифрованного модуля базы данных (XFP - файл).
      Функция не проверяет фактическое существование файла по указанному пути.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592610
              */
function GetDbFilePath(): String {
    return;
}

/**
              * Выдает true, если указанная база данных находится  в 
      зашифрованном модуле (XFP - файл), и false, если не содержит.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592611
              */
function IsPackageDb(dbName: String): Bool {
    return;
}

/**
              * Аналог функции LoadUrlData(), 
      позволящий явно указать адрес сервера приложения, с котрого будут загружаться 
      данные.
      Используется как правило для синхронизации данных или 
      обмена данными между несколькими серверами приложений.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592600
              */
function LoadLdsUrlData(url: String): String {
    return;
}

/**
              * Осуществляет загрузку в указанную зашифрованную базу данных 
      (модуль) информации из объекта. Используется, например, при подгрузке 
      интернет-модулей в E-Staff c сайта производителя. Объект, информация из которого 
      может быть загуржена в базу данных, создается специальной командой new 
      FilePackage, после чего в объект помещается информация, например, при 
      помощи метода LoadFromStr.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592612
              */
function SetDbFilePackage(dbName: String): undefined {
    return;
}

/**
              * Устанавливает директорию, которую программа будет считать 
      местом расположения базы данных. По умолчанию директория называется так же, как 
      и база И располагается в программной директории. Функция используется, если 
      нужно поместить базу в другую директорию.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592609
              */
function SetDbHostDir(dbName: String): undefined {
    return;
}

/**
              * Выполняет заданный запрос XQuery. В сетевой версии приложения запрос 
      выполняется на сервере.
              * @example XQuery( 'for $elem in candidates order by $elem/fullname return $elem', 
      'preload-foreign-data=1' )
              * @link http://docs.datex.ru/article.htm?id=5620276905286592520
              */
function XQuery(query: String): Array<any> {
    return;
}

/**
              * Выполняет заданный запрос XQuery на клиентской 
      машине. Используется для запроса данных из каталогов локальных баз данных.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592524
              */
function XQueryLocal(query: String): Array<any> {
    return;
}

/**
              * Возвращает число элементов массива.
      Для массивов прямого доступа функция срабатывает мгновенно, для сложных 
      массивов (например результатов XQuery) вызов этой функции может повлечь за собой 
      обращение к серверу либо другую длительную по времени операцию, поэтому не 
      следует использовать данную функцию внутри циклов.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911690
              */
function ArrayCount(array: any): Integer {
    return;
}

/**
 * хз что делает
 * @param array
 */
function StrToCharCodesArray(str: String): Array<string> {
    return;
}

/**
 * Возвращает массив
 * @param json
 */
function ParseJson(json: string): Array<any> {
    return;
}

/**
              * Преобразует заданный массив к массиву с прямым 
      индексированием.
      Если заданный массив и так поддерживает прямое 
      индексирование, функция возвращает сам исходный массив. В противном случае функция работает аналогично ArraySelectAll() и 
      возвращает массив типа Array, содержащий копию исходного массива.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911691
              */
function ArrayDirect(array: any): Array<any> {
    return;
}

/**
              * Выбирает определенное значение из каждого 
      элемента массива. Возвращает новый массив той же длинны, содержащий выбранные 
      элементы.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911692
              */
function ArrayExtract(array: any): Array<any> {
    return;
}

/**
              * Выбирает определенное поле (атрибут) из каждого 
      элемента массива. Возвращает новый массив той же длинны, содержащий выбранные 
      элементы.
      Функция аналогична более универсальной функции ArrayExtract(), но 
      работает быстрее.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477144
              */
function ArrayExtractKeys(array: any): Array<any> {
    return;
}

/**
              * Находит первый элемент массива, удовлетворяющий 
      заданному условию.
      Если элемент, удовлетворяющий условию, не найден, функция завершается с 
      исключением.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911693
              */
function ArrayFind(array: any): any {
    return;
}

/**
              * Возвращает первый элемент заданного 
      массива.
      Если массив не содержит ни одного элемента, функция завершается с 
      исключением.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911694
              */
function ArrayFirstElem(array: any): any {
    return;
}

/**
              * Возвращает массив, содержащий элементы массива 1, у 
      которых значение ключевого поля совпадает хотя бы в с одним 
      элементом массива 2.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454894
              */
function ArrayIntersect(array: any): Array<any> {
    return;
}

/**
              * Возвращает элемент заданного массива, 
      содержащий максимальное значение определенного поля среди его 
      элементов.
      Если массив не содержит ни одного элемента, функция завершается с 
      исключением.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911695
              */
function ArrayMax(array: any): any {
    return;
}

/**
              * Возвращает строку, полученную путем 
      склеивания данных из элементов массива.
                 @param array   - массив
      
           @param elemExpr   - выражение, вычисляющее значение, используемое для склейки, относительно элемента массива (String).
      
           @param delim   - строка-разделитель (String). Необязательный аргумент.
      
              * @link http://docs.datex.ru/article.htm?id=5620250451197911696
              */
function ArrayMerge(
    array: Array<any>,
    elemExpr: string,
    delim?: string
): String {
    return;
}

/**
              * Возвращает элемент заданного массива, 
      содержащий минимальное значение определенного поля среди его элементов.
      Если массив не содержит ни одного элемента, функция завершается с 
      исключением.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911697
              */
function ArrayMin(array: any): any {
    return;
}

/**
              * Находит первый элемент массива, удовлетворяющий 
      заданному услов��ю.
      Если элемент, удовлетворяющий условию, не найден, возвращается 
      undefined.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911698
              */
function ArrayOptFind(array: any): any {
    return;
}

/**
              * Ищет первый элемент массива с заданным значением 
      определнного поля (ключа).
      Если такой элемент не найден, возвращается undefined.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911699
              */
function ArrayOptFindByKey(array: any): any {
    return;
}

/**
              * Ищет первый элемент массива с заданным значением 
      определенного поля (ключа). 
      Если такой элемент не найден, возвращается undefined.
      Предполагается, что массив предварительно отсортирован по ключевому полю по 
      возрастанию, что значительно повышает скорость поиска по сравнению с функцией ArrayOptFindByKey(). Функцию 
      имеет смысл использовать для частого поиска в каком-либо фиксированном 
      справочнике большого размера, который необходимо заранее отсортировать.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911700
              */
function ArrayOptFindBySortedKey(array: any): any {
    return;
}

/**
              * Возвращает первый элемент заданного 
      массива.
      Если массив не содержит ни одного элемента, функция возвращает 
      undefined.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911701
              */
function ArrayOptFirstElem(array: Array<any>): any | undefined {
    return;
}

/**
              * Возвращает элемент заданного массива, 
      содержащий максимальное значение определенного поля среди его 
      элементов.
      Если массив не содержит ни одного элемента, функция возвращает 
      undefined.
                
              * @link http://docs.datex.ru/article.htm?id=5620250451197911702
              */
function ArrayOptMax(array: any, elemExpr: string): any {
    return;
}

/**
              * Возвращает элемент заданного массива, 
      содержащий минимальное значение определенного поля среди его элементов.
      Если массив не содержит ни одного элемента, функция возвращает 
      undefined.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911703
              */
function ArrayOptMin(array: any): any {
    return;
}

/**
              * Возвращает фрагмент массива с определенной 
      позиции.
      Данная функция как правило используется для реализации постраничного 
      простомотра (paging) результатов запроса XQuery.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911704
              */
function ArrayRange(array: any): Array<any> {
    return;
}

/**
              * Выбирает элементы массива, удовлетворяющие заданному 
      критерию.
              @param {Array<any>} array массив
              @param {string} qulExpr выражение, определяющее соответствие элемента массива критерию. Вычисляется относительно элемента массива. (Bool).
              * @link http://docs.datex.ru/article.htm?id=5620250451197911705
              */
function ArraySelect(array: any, qulExpr): Array<any> {
    return;
}

/**
              * Возвращает массив, содержащий все элементы исходного 
      массива в виде стандартного массива Array.
      Функция, как правило, используется в двух случаях:
      1. Для сложной либо многократной обработки (особенно с прямым 
      индексированием) "медленных" массивов, таких как результаты XQuery
      2. Когда в цикле, осуществляющем проход по массиву, происходит выборочное 
      удаление его элементов.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911706
              */
function ArraySelectAll(array: any): Array<any> {
    return;
}

/**
              * Выбирает элементы массива, с определенным значением 
      заданного поля (ключа) внутри элемента.
      Функция аналогична более универсальной функции ArraySelect(), но 
      работает быстрее.
               @param {Array<any>}array  Массив
               @param {String}keyValue  значение ключа 
               @param {String}keyName  имя элемента, являющегося ключом (String). Необязательный аргумент. Если имя ключа не указано, используется первичный ключ.
      
       
           keyName   - 
              * @link http://docs.datex.ru/article.htm?id=5620250451197911707
              */
function ArraySelectByKey(
    array: any,
    keyValue: String,
    keyName?: String
): Array<any> {
    return;
}

/**
              * Возвращает массив уникальных значений элементов 
      заданного массива.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911708
              */
function ArraySelectDistinct(array: any): Array<any> {
    return;
}

/**
              * Сортирует массив по заданным полям. Возвращает новый 
      массив отсортированных значений. Функция требует нечетного чилса аргументов (не 
      менее 3-х), для каждого нового уровня сортировки добаляется 2 новых 
      аргумента.
              * @example ArraySort( array, 'name', '+', 'date', '-' )
              * @link http://docs.datex.ru/article.htm?id=5620250451197911709
              */
function ArraySort(array: any): Array<any> {
    return;
}

/**
              * Возвращает сумму значений определенного поля по всем 
      элементам массива.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911710
              */
function ArraySum(array: any): Integer | Real {
    return;
}

/**
              * Последовательное объединение нескольких массивов в 
      один.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911711
              */
function ArrayUnion(array: any): Array<any> {
    return;
}

/**
              * Проверяет, является ли аргумент массивом.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878644
              */
function IsArray(arg: any): Bool {
    return;
}

/**
 * Удаляет документ с заданным url.
 * @example DeleteDoc( 'x-db-obj://data/candidate/0x4DF75B9F13FE5160.xml' )
 * @link http://docs.datex.ru/article.htm?id=5620250451197911766
 */
function DeleteDoc(url: String): undefined {
    return;
}

/**
              * Открывает XML-документ и помещает его в кэш документов.
      Если документ с заданным url 
      уже находится в кэше, возвращается уже загруженный в кэш 
      документ.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911789
              */
function FetchDoc(url: String): XmlDoc {
    return;
}

/**
              * Возвращает документ с заданным url из кэша.
           Если 
      документ с заданным url в кэше отсутствует, функция завершается с 
      ошибкой.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878592
              */
function GetCachedDoc(url: any): XmlDoc {
    return;
}

/**
              * Удаляет на сервере приложения документ 
      с заданным url.   Используется в специализированном коде, 
         предназначенном для синхронизации баз данных 
      или обмена данными между базами.
       
      Аргуметы:
      docUrl - url документа 
      (String)
      options - опции, необязательный 
      аргумент (String)
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592603
              */
function LdsDeleteDoc(): undefined {
    return;
}

/**
              * Перемещает XML-документ из одного url в другой 
      url. В отличие от обычного перемещиня файла, действие этой функции 
      сопровождается выполнением стандартных свойств OnSave, OnBeforeSave и 
      т.д. Документ сначала пересохраняется по новому url, затем удаляется 
      из предыдущей. Редко используемая функция.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592590
              */
function MoveDoc(url: String): void {
    return;
}

/**
              * Возвращает url объектного документа 
      по имени базы, типа объекта и ID документа.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592594
              */
function ObjectDocUrl(dbName: Integer | String): String {
    return;
}

/**
              * Выдает ID объектного документа по его url. 
      Смотри так же ObjectDocUrl 
      .
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592596
              */
function ObjectIDFromUrl(url: string): Integer | String {
    return;
}

/**
              * Выдает наименование типа объекта по его url. 
      Смотри так же ObjectDocUrl и ObjectIDFromUrl .
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592595
              */
function ObjectNameFromUrl(url: string): String {
    return;
}

/**
              * Пытается найти открытую в пользовательском интерфейсе карточку XML-документа. 
      Если таковая карточка найдена, функция возвращает ссылку на документ из 
      этой карточки. В противном случае действие функции аналогично OpenDoc().
      Чтобы сохранить измененный документ, необходимо использовать 
      функцию UpdateUiDoc (а не 
      вызвать метод Doc.Save, как при открытии документа при помощи OpenDoc). Если 
      документ был открыт пользователем на экране, то при выполнении функции 
      UpdateUiDoc документ будет изменен прямо на экране, если открытого документа 
      небыло - то документ будет просто сохранен.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592591
              */
function ObtainUiDoc(docUrl: String): XmlDoc {
    return;
}

/**
              * Открывает XML-документ. Возвращает объект типа 
      XmlDoc.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878691
              */
function OpenDoc(url: String): XmlDoc {
    return;
}

/**
              * Открывает XML-документ, содержащийся к строке.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878692
              */
function OpenDocFromStr(dataStr: String): XmlDoc {
    return;
}

/**
              * Создает новый XML-документ по заданной форме.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878694
              */
function OpenNewDoc(formUrl: String): XmlDoc {
    return;
}

/**
              * Загружает xml документ в кэш документов и делает его корневой элемент видимым 
      в списке глобальных имен.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878735
              */
function RegisterSharedDoc(docUrl: String): XmlDoc {
    return;
}

/**
              * Сохраняет изменения в документе, открытом при помощи 
      функции ObtainUiDoc . Если 
      это был документ, открытый пользователем на экране, то фукнция устанавливает 
      аргумент метода Doc.SetChanged(true), 
      и больше ничего не делает. Установка этого аргумента необходима, чтобы при 
      закрытии документа  пользователю было предложено сохранить изменения. 
      Если это был документ, открытый программой без участия пользователя, действие 
      функции аналогично действию метода Doc.Save().
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592592
              */
function UpdateUiDoc(): undefined {
    return;
}

/**
              * Создает динамический (без привязки к форме) XML-элемент. Созданный элемент не 
      имеет родительского элемента.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592589
              */
function CreateDynamicElem(name: String): XmlElem {
    return;
}

/**
              * Создает XML-элемент заданному по фрагменту формы. Созданный 
      элемент не имеет родительского элемента.
      Функция используется для управления сложными структурами в оперативной памяти 
      компьютера (как альтернатива javascript object), а так же для формирования XML 
      для внешнего использования.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592636
              */
function CreateElem(formUrl: String): XmlElem {
    return;
}

/**
              * Загружает массив XML-элементов в строку. Используется для передачи 
      параметров в плагины и другие внешние процедуры. Смотри так же LoadElemsFromStr.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592638
              */
function ExportElemsToStr(arg: Array<Object>): string {
    return;
}

/**
              * Создает новый пустой элемент массива, не добавляя его в в сам массив. 
      Используется для отработки "битых ссылок" на элементы массива и ссылок на 
      удаленные элементы массива. Смотри так же GetOptForeignElem и 
      GetForeignElem 
      .
      В текущей реализации массив может быть только каталогом.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592635
              */
function GetFailedForeignElem(array: any): XmlElem {
    return;
}

/**
              * Выдает целевой элемент массива по значению первичного ключа. 
      Смотри так же GetOptForeignElem.
       
      Действие функции несколько отличается от функции ArrayOptFindByKey() 
      за счет поддержки рекурсивных массивов XML-элементов.
      Кроме этого, в новой объектной модели функция никогда не завершается с 
      ошибкой, если соотвевтвующей элемент не найден, а возвращает пустой 
      псевдо-элемент (режим терпимости к незаполенным и битым ссылкам).
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592633
              */
function GetForeignElem(array: any): XmlElem {
    return;
}

/**
              * Выдает целевой элемент массива по значению первичного ключа. 
      Если соответсвующей элемент не найден, возвращается undefined.
      Смотри так же GetForeignElem().
       
      Действие функции несколько отличается от функции ArrayOptFindByKey() 
      за счет поддержки рекурсивных массивов XML-элементов.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592634
              */
function GetOptForeignElem(array: any): XmlElem {
    return;
}

/**
              * Загружает строку в массив XML-элементов. Используется при 
      обработке параметров, полученных от внешних процедур и плагинов. Смотри 
      также ExportElemsToStr .
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592637
              */
function LoadElemsFromStr(arg: string): Array<any> {
    return;
}

/**
              * Возвращает массив имен дочерних ключей 
      заданного ключа реестра Windows.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454871
              */
function GetSysRegKeyChildNames(path: String): Array<any> {
    return;
}

/**
              * Возвращает значение строкового из реестра Windows. 
      Если элемент не существует, возвращается пустая строка.
              * @example GetSysRegStrValue( 'HKEY_CURRENT_USER\\Software\\Clients\\Mail\\', '' 
      )
              * @link http://docs.datex.ru/article.htm?id=5620276892448878618
              */
function GetSysRegStrValue(path: String): undefined {
    return;
}

/**
              * Удаляет ключ реестра Windows, если он пустой. Если 
      ключ содержит другие ключи, функция завершается с ошибкой.
              * @example RemoveEmptySysRegKey( 'HKEY_CURRENT_USER\\Software\\Datex\\' )
              * @link http://docs.datex.ru/article.htm?id=5620276892448878737
              */
function RemoveEmptySysRegKey(path: String): undefined {
    return;
}

/**
              * Удаляет ключ реестра Windows, включая все вложенные 
      ключи.
              * @example RemoveSysRegKey( 'HKEY_LOCAL_MACHINE\\Software\\Datex\\EStaff' )
              * @link http://docs.datex.ru/article.htm?id=5620276892448878738
              */
function RemoveSysRegKey(path: String): undefined {
    return;
}

/**
              * Устанавливает целочисленное значение ключа реестра 
      Windows.
              * @example SetSysRegIntegerValue( 
      'HKEY_LOCAL_MACHINE\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\EStaff', 
      'NoModify', 1 )
              * @link http://docs.datex.ru/article.htm?id=5620276892448878760
              */
function SetSysRegIntegerValue(path: String): undefined {
    return;
}

/**
              * Устанавливает строковое значение ключа реестра 
      Windows.
              * @example SetSysRegStrValue( 'HKEY_LOCAL_MACHINE\\Software\\Datex\\EStaff', 
      'Sn', 'AHYC-52DG-87RT' )
              * @link http://docs.datex.ru/article.htm?id=5620276892448878761
              */
function SetSysRegStrValue(path: String): undefined {
    return;
}

/**
              * Проверяет существует ли ключ реестра Windows.
              * @example SysRegKeyExists( 'HKEY_LOCAL_MACHINE\\Software\\Microsoft\\Office\\Word' 
      )
              * @link http://docs.datex.ru/article.htm?id=5620276892448878814
              */
function SysRegKeyExists(path: String): Bool {
    return;
}

/**
              * Определяет статус зарегистрированного сервера 
      приложения (службы Windows).
      Значения статуса: 0 - сервер 
      выключен 1 - сервер включен 2 - сервер начинает работу 3 - сервер завершает 
      работу
              * @example DaemonGetState( 'EStaff_Server' )
              * @link http://docs.datex.ru/article.htm?id=5620250451197911748
              */
function DaemonGetState(serverID: String): Integer {
    return;
}

/**
              * Возвращает значение параметра, обозначающее текущй статус задачи, 
      выполняемой при старте сервера, например перестройки фалов каталога или 
      конвертации данных из предыдущей версии программы.
              * @example DaemonGetStateParam( 'EStaff_Server', 'CurTask' )
              * @link http://docs.datex.ru/article.htm?id=5620250451197911749
              */
function DaemonGetStateParam(serverID: String): String {
    return;
}

/**
 * Включает установленный сервер.
 * @example DaemonStart(id)
 * @link http://docs.datex.ru/article.htm?id=5620250451197911750
 */
function DaemonStart(id: String): undefined {
    return;
}

/**
 * Выключает установленный сервер.
 * @example DaemonStop(id)
 * @link http://docs.datex.ru/article.htm?id=5620250451197911751
 */
function DaemonStop(id: String): undefined {
    return;
}

/**
              * (статья не завершена) 
                
              
              
      
      Экспериментальная функция.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592627
              */
function CreateDocWebScreen(): void {
    return;
}

/**
              * Очишает кэш от загруженного зашифрованного модуля 
      .
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592631
              */
function DropDbPackage(arg: string): void {
    return;
}

/**
              * (статья не завершена) 
                
              
              
      
           Экспериментальная функция.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911785
              */
function EvalRichCodePageUrl(): void {
    return;
}

/**
              * Динамически подключает к программе дополнительный модуль. Если модуль уже 
      подключен, функция не производит никаких действий.
      Редко используемая функция.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592639
              */
function FetchAppModule(moduleName: String): undefined {
    return;
}

/**
              * Редко используемая фукнция.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477142
              */
function GetScreenFormTitle(): void {
    return;
}

/**
              * (статья не завершена) 
                
              
              
      
      
      
      Экспериментальная функция.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592602
              */
function LdsGetModDeletedObjects(): void {
    return;
}

/**
              * (статья не завершена) 
                
              
              
      
      Экспериментальная функция.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592601
              */
function LdsGetModObjects(): void {
    return;
}

/**
              * Загружает приложение по имени корневого модуля, не 
      открывая его главную страницу.
      Функция используется  в редких случаях, например для 
      выбора запускаемого приложения при старте.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592624
              */
function LoadAppSpec(): undefined {
    return;
}

/**
              * Выдает наименование модуля, в котором находится 
      файл, по заданному url со схемой x-app.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592597
              */
function ModuleNameFromUrl(url: string): string {
    return;
}

/**
 * Возвращает обработанное условное наименование юридического лица, предназначенное для показа пользователю..
 * @example OrgDispName(orgName, orgShortName)
 * @link http://docs.datex.ru/article.htm?id=5620276892448878698
 */
function OrgDispName(orgName?: String): String {
    return;
}

/**
              * Разбирает поле типа OLE объект, хранящееся в MS Access.
              * @example ParseStoredOleObject(str)
      
      объект типа JS содержит следующие поля:
      Class
      FileName - имя файла
      Data - содержимое файла
              * @link http://docs.datex.ru/article.htm?id=5620276892448878705
              */
function ParseStoredOleObject(str: String): JsObject {
    return;
}

/**
              * .
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878708
              */
function PersonGender(): undefined {
    return;
}

/**
              * Добавляет объект, содержащий набор методов или свойств, в список глобальных объектов окружения. После вызова данной функции все свойства и метода объекта становятся доступны всему приложению в качестве глобальных переменных и функций. При совпадении имен свойств или методов с существующими приоритет будет за именами, находящимися в объекте, добавленном последним. Экспериментальная функция.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454885
              */
function RegisterGlobalEnvObject(obj: any): void {
    return;
}

/**
              * Экспериментальная функция.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878741
              */
function ReportToHtml(): void {
    return;
}

/**
              * Экспериментальная функция.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878742
              */
function ReportToRtf(): void {
    return;
}

/**
              * Функция вызывает падение приложения.
      Используется для тестирования целостности данных к падению 
      сервера.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592560
              */
function SimulateCrash(): void {
    return;
}

/**
              * Приводит список телефонов к стандартному виду. 
      Экспериментальная функция.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878823
              */
function UnifyPhones(str: String): String {
    return;
}

/**
              * Делает объединение двух экранных форм. Используется для регистрации 
      дополнительных (пользовательских) полей, открываемых дополнительной 
      (пользовательской) экранной формой. Редко используемая функция. Смотри 
      также MergeScreenForm.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477140
              */
function AppendScreenForm(): void {
    return;
}

/**
              * Создает экран для заданного документа.
              * @example screen = CreateDocScreen( doc, 'base1_csd.xms' 
      )
              * @link http://docs.datex.ru/article.htm?id=5665465792879477119
              */
function CreateDocScreen(xmlDoc: String): void {
    return;
}

/**
              * Если есть какой-либо большой глобальный документ (как правило - это общие 
      настройки или персональные настройки), и требуется, чтобы он редактировался не в 
      одном гигинтском окне, а в нескольких маленьких разделах, в этом случае 
      открывает один большой документ, но в окне показыватся его маленький кусочек. 
      Редко используемая функция. См. также ObtainSubDocScreen.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477120
              */
function CreateSubDocScreen(docElem: String): void {
    return;
}

/**
              * Редко используемая фукнция. Сбрасыает данные из кэша. 
      Используется, когда программа сама модифицирует какие-то формы, и чтобы 
      обновления вступили в силу необходимо сбросить данные из 
      кэша.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477132
              */
function DropScreenFormsCache(): void {
    return;
}

/**
              * Вычисляет (относительно самого элемента) значение 
      параметра, если у этого параметра стоит атрибут EXPR.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477052
              */
function EvalSampleParam(): void {
    return;
}

/**
              * Вычисляет (относительно самого элемента) значение 
      параметра, если у этого параметра стоит атрибут EXPR.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477053
              */
function EvalSampleParamRec(paramName: String): void {
    return;
}

/**
              * Ищет экран с заданным url документа, если экран не найден, возвращает 
      undefined. См. также FindScreenByDocUrl и 
      ObtainDocScreen.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477130
              */
function FindOptScreenByDocUrl(docUrl: any): void {
    return;
}

/**
              * Ищет экран с заданным именем среди всех существующих (т.е. открытых) экранов.
              * @example list = FindScreen( 'FrameMain' ).FindItemByType( 
      'LIST' );
              * @link http://docs.datex.ru/article.htm?id=5665465792879477128
              */
function FindScreen(screenName: String): void {
    return;
}

/**
              * Ищет экран с заданным url документа, если экран не найден, возвращает 
      исключение. См. также FindOptScreenByDocUrl и 
      ObtainDocScreen.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477129
              */
function FindScreenByDocUrl(docUrl: String): void {
    return;
}

/**
              * Для сложных составных элементов, описанных в виде шаблона (SAMPLE 
      ="1"), таких как, например, object_setector, voc_elem_selector, 
      date_selector, возвращает сам этот элемент из любого места кода внутри 
      экземпляра этого элемента. Функция используется для написания сложных составных 
      элементов.
              * @example <IF 
      EXPR="GetSampleItem().IsEnabled">
              * @link http://docs.datex.ru/article.htm?id=5665465792879477049
              */
function GetSampleItem(): void {
    return;
}

/**
              * Возвращает заданный параметр для элементов, заданных в виде шаблона (SAMPLE), имеющих 
      параметры.
              * @example <LABEL 
      TITLE-EXPR="lib_voc.foreign_voc_title( Ps, GetSampleParam( 'usage' ) )" 
      READ-ONLY="1"  WIDTH="100%" HEIGHT="100"/>
              * @link http://docs.datex.ru/article.htm?id=5665465792879477050
              */
function GetSampleParam(paramName: String): void {
    return;
}

/**
              * Объединяет две формы. Смотри также функцию AppendScreenForm.
              * @example MergeScreenForm( '//base2/base2_access_role.xms', 
      'rcr_fields_access_role.xms', 'AccessFieldsAnchor' );
              * @link http://docs.datex.ru/article.htm?id=5665465792879477141
              */
function MergeScreenForm(mainFormUrl: String): void {
    return;
}

/**
              * Находит экран по url документа, открытого в этом экране. Проверяет, не открыт 
      ли экран с заданным url, если открыт, то поднимает его на верх, если не открыт, 
      то создает экран и открывает документ. Обычно эта фукнция вызывается, когда 
      пользователь открывает из списка что-либо двойным щелчком.
              * @example screen = ObtainDocScreen( ObjectDocUrl( 'trash', 
      'trash_object', ListElem.id ) );
      screen = ObtainDocScreen( 
      event.candidate_id.ForeignObjectUrl );
              * @link http://docs.datex.ru/article.htm?id=5665465792879477121
              */
function ObtainDocScreen(docUrl: String): void {
    return;
}

/**
              * Вызывает открытие экрана для объектого документа. Редко 
      используемая функция.
              * @example ObtainObjectDocScreen( DefaultDb, 'vacancy', 
      ListElem.vacancy_id )
              * @link http://docs.datex.ru/article.htm?id=5665465792879477122
              */
function ObtainObjectDocScreen(base: Integer): void {
    return;
}

/**
              * Если есть какой-либо большой глобальный документ (как правило - это общие 
      настройки или персональные настройки), и требуется, чтобы он редактировался не в 
      одном гигинтском окне, а в нескольких маленьких разделах, в этом случае 
      открывает один большой документ, но в окне показыватся его маленький 
      кусочек. См. также CreateSubDocScreen.
              * @example ObtainSubDocScreen( ListElem.site_settings, 
      'imod_settings_site.xms' );
              * @link http://docs.datex.ru/article.htm?id=5665465792879477123
              */
function ObtainSubDocScreen(xmlElem: String): void {
    return;
}

/**
              * Редко используемая функция. Используется в комбининованных формах *.xmc для 
      добавления новых элементов списка.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477048
              */
function OpenInnerPage(addElem: XmlElem): void {
    return;
}

/**
              * Регистрирует экранную форму, переданную в виде строки.
              * @example RegisterScreenFormFromStr( ReplaceUrlPathSuffix( 
      formUrl, '.xmd', '.xms' ), screenFormData );
      RegisterScreenFormFromStr( 
      vocInfo.object_screen_form_url, LoadUrlData( 'base1_voc_object.xms' ) 
      );
              * @link http://docs.datex.ru/article.htm?id=5665465792879477139
              */
function RegisterScreenFormFromStr(xmsUrl: SpXml): void {
    return;
}

/**
              * Отображает на экране указанное почтовое сообщение, с использование выбранного 
      способа отображения.
              * @example ShowMailMessage( message, 
      local_settings.mail_method_id );
              * @link http://docs.datex.ru/article.htm?id=5665465792879477114
              */
function ShowMailMessage(msg: String): void {
    return;
}

/**
              * Вызывает обновление экрана с заданными параметрами. Эту функцию можно 
      вызывать из других потоков, она безопасная.
              * @example UpdateScreens( '*', '*view*' ); //обновление всех 
      экранов, наименование файла экранной формы которых содержит 'view'.
      UpdateScreens( '*', '*' ); //обновление всех 
      экранов.
              * @link http://docs.datex.ru/article.htm?id=5665465792879477131
              */
function UpdateScreens(maskScreen: String): void {
    return;
}

/**
              * (статья не завершена) 
                
              
              
      
      Устаревшая функция.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592605
              */
function AddCatalogEntry(): void {
    return;
}

/**
              * (статья не завершена) 
                
              
              
      
      Устаревшая функция.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911682
              */
function AddOutlookEvent(): void {
    return;
}

/**
              * (статья не завершена) 
                
              
              
      
      Устаревшая функция.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911684
              */
function AdjustHtml(): void {
    return;
}

/**
              * Устаревшая функция.
      Заменена на глобальную переменную AppSn.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911689
              */
function AppSerialNumber(): void {
    return;
}

/**
              * (статья не завершена) 
                
              
              
      
      Устаревшая функция.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911720
              */
function BuildCompoundHtml(): void {
    return;
}

/**
              * Устаревшая функция.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911721
              */
function BuildFullReport(): void {
    return;
}

/**
              * (статья не завершена) 
                
              
              
      
      Устаревшая функция.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911722
              */
function BuildWebHtml(): void {
    return;
}

/**
              * (статья не завершена) 
                
              
              
      
      Устаревшая функция.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911726
              */
function ChangeAppSn(): void {
    return;
}

/**
              * (статья не завершена) 
                
              
              
      
      Устаревшая функция.
      Использовалась в старой объектной модели.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592607
              */
function DeleteCatalogEntries(): void {
    return;
}

/**
              * Извлекает id из заданного url объектного документа типа x-local.
      Используется только в старой объектной модели.
              * @example DocIDFromUrl( 
      'x-app://data/objects/0x4DF75B9F13FE51/60.xml ) вернет 
      0x4DF75B9F13FE5160
              * @link http://docs.datex.ru/article.htm?id=5620250451197911773
              */
function DocIDFromUrl(url: string): Integer {
    return;
}

/**
              * (статья не завершена) 
                
              
              
      
      Устаревшая функция.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911786
              */
function ExcelCodePageExecute(): void {
    return;
}

/**
              * Устаревшая функция.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477137
              */
function FontDescription(): void {
    return;
}

/**
              * (статья не завершена) 
                
              
              
      
      Устаревшая функция.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878632
              */
function HtmlNewCharset(): void {
    return;
}

/**
              * (статья не завершена) 
                
              
              
      
      Устаревшая функция.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878665
              */
function LoadUrlPlainText(): void {
    return;
}

/**
              * Загружает содержимое файла MS Word и возвращает его 
      содержимое в виде HTML. Устаревшая функция, не рекомендуется к использованию, с 
      момента появления поддержки OLE.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878666
              */
function LoadWordHtml(url: String): String {
    return;
}

/**
              * (статья не завершена) 
                
              
              
      
      Устаревшая функция.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878718
              */
function PutWordHtml(): void {
    return;
}

/**
              * (статья не завершена) 
                
              
              
      
      Устаревшая функция, используемая во времена, когда запросы XQuery 
      по множественным ключевым значения выполнялись неэффективно.
      В настоящий момент конструкция вида
      QueryCatalogByKeys( 'persons', 'id', [12359841651, 
      8498132581, 68496313181] )
      просто транслируется в
      XQuery( 'for $elem in persons where MatchSome( $elem/id, 
      (12359841651, 8498132581, 68496313181) ) return $elem' );
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878719
              */
function QueryCatalogByKeys(cataloName: String): Array<any> {
    return;
}

/**
              * Вызывает 
      принудительную перестройку каталога основных объектных файлов. Устаревшая и 
      редко используемая функция. Современный способ принудительной 
      перестройки каталога основных объектных файлов - удаление каталога 
      'secondary' при условии, что программа (сервер или локальная) остановлена.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592628
              */
function RebuildAllCatalogs(): void {
    return;
}

/**
              * Регистрирует новый каталог в базе данных. Устаревшая 
      функция, в новой 
      объектной моделе базы данных не используется, т.к. в новой объектной 
      моделе  каталог и форма жестко связаны.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592621
              */
function RegisterCatalog(): undefined {
    return;
}

/**
              * Извлекает корневой элемент из url формы каталога базы данных, и создает 
      и регистрирует аналогичную форму для объекта. Выдает url созданной формы 
      объекта. Устаревшая функция, не используемая в новой объектной 
      модели.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592620
              */
function RegisterCatalogSubForm(formUrl: any): String {
    return;
}

/**
              * Используется 
      для синхронизации (репликации) одной базы данных в другую, например 
      автономного рабочего места и сервера, или двух серверов. Устаревшая функция, в 
      новой объектной модели не используется, т.к. функция синхронизации (реплкации) в 
      новой объектной модели реализована на javascript.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592632
              */
function ReplicateDb(): void {
    return;
}

/**
              * (статья не завершена) 
                
              
              
      
      Устаревшая функция.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878740
              */
function ReportCodePageExecute(): void {
    return;
}

/**
              * (статья не завершена) 
                
              
              
      
      Устаревшая функция.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878744
              */
function RichCodePageExecute(): void {
    return;
}

/**
              * Устаревшая функция.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477117
              */
function SetDefaultPrintAlign(): void {
    return;
}

/**
              * Устаревшая функция.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477116
              */
function SetDefaultPrintFont(): void {
    return;
}

/**
              * Устаревшая функция.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477133
              */
function SetMultipageLayout(): void {
    return;
}

/**
              * (статья не завершена) 
                
              
              
      
      Устаревшая функция.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878777
              */
function StorageDateStr(): void {
    return;
}

/**
              * Предназначена для принудительной записи в каталоги. 
      Устаревшая функция. В новой объктной модели не 
      используется.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592606
              */
function StoreCatalogEntry(): void {
    return;
}

/**
              * Устаревшая функция.
      Выполняет синхронизацию базы данных. Использовалась в E-Staff 
      3.x.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592614
              */
function SyncDb(): void {
    return;
}

/**
              * (статья не завершена) 
                
              
              
      
      Устаревшая функция. Рекомендуется использовать UrlDecode()
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878830
              */
function UrlDecode16(): void {
    return;
}

/**
              * Возвращает url объектного документа с заданным 
      id.
      Устаревшая функция, используемая в старой объектной модели.
              * @example UrlFromDocID( 123502899940580 ) вернет 
      'x-local://data/objects/00007053427ACC/E4.xml'
              * @link http://docs.datex.ru/article.htm?id=5620276892448878837
              */
function UrlFromDocID(docID: Integer): String {
    return;
}

/**
              * (статья не завершена) 
                
              
              
      
      Устаревшая функция.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592516
              */
function WordExecute(): void {
    return;
}

/**
              * Вызывает модальный диалог.
              * @example ActiveScreen.ModalDlg( dlgDoc 
      );
              * @link http://docs.datex.ru/article.htm?id=5665465792879477118
              */

/**
              * Выдает сообщение, содержащее 
      значение параметра. На сервере сообщение записывается в журнал 'xhttp', на 
      рабочем месте - в  виде всплывающего окна (MgBox).
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911685
              */
function alert(val: any): any {
    return;
}

/**
              * Выдает true, если модуль, наименование которого указано в качестве аргумента, 
      используется программой, и false, если указанный модуль программой не 
      используется. Наименования стандартных модулей считывается из файла описания структуры 
      приложения, наименование  подключаемого модуля считывается из файла первичных 
      настроек при запуске исполнимого файла. 
      Функция используется, например, в ядре программы, если необходимо 
      по-разному его настраивать для работы с различными подключаемыми 
      модулями.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592640
              */
function AppModuleUsed(moduleName: String): Bool {
    return;
}

/**
              * Вызывает исключение специального типа, аналогичное 
      нажатию кнопки "Cancel" пользователями. Позволяет генерировать исключение, на 
      которое не будет выдаваться ссобщение об ошибке.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911724
              */
function Cancel(): undefined {
    return;
}

/**
              * Проверяет не должен ли текущий поток 
      завершиться (обычно после прерывания его пользователем). Если да, вызывает 
      исключение аналогично функции Cancel().
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911729
              */
function CheckCurThread(): undefined {
    return;
}

/**
              * Проверяет строку на соответствие контрольной сумме.
              * @example CheckPamMd5(str,arg)
      Проверяет строку на соответствие контрольной сумме, вычисленной по алгоритму PamMd5
              * @link http://docs.datex.ru/article.htm?id=5620250451197911730
              */
function CheckPamMd5(str: String): Bool {
    return;
}

/**
              * Возвращает true, если пользователем в буфер (Clipboard) скопировано нечто 
      заданного формата. Возвращает false, если нет (буфер пуст или его содержимое не 
      того формата). Обычно формат 'text/plain' или 'text/html'.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477134
              */
function ClipboardFormatAvailable(arg: string): void {
    return;
}

/**
              * Увеличивает яркость цвета, переданного в качестве 
      аргумента.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911742
              */
function ColorNewBrightness(color: String): String {
    return;
}

/**
              * Вычисляет контрольную сумму по алгоритму CRC.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911744
              */
function CRC(arg: String): Integer {
    return;
}

/**
 * Включает/выключает заданный журнал.
 * @example EnableLog( 'xquery', true )
 * @link http://docs.datex.ru/article.htm?id=5620250451197911774
 */
function EnableLog(name: Bool): undefined {
    return;
}

/**
              * Включает заданный журнал. В отличие от функции 
      EnableLog() позволяет 
      задать дополнительные опции ведения журнала.
              * @example EnableLogExt( 'web-request', 'header-str=date\turl\tquery;use-std-event-prefix=0' )
         
      Возможные опции:
      life-time - период, на котрый заводится 
      новый файла журнала ('day', 'month', 'permanent' ) (String). По 
      умолчанию свой файл журнала заводится на каждую дату ('day')
      base-dir - директория, в которой будут 
      заводиться журнал (String). По умолчанию используется директория Logs в 
      установочной директории
      use-std-event-prefix - Включать в начало 
      каждой строки журнала стандартный префикс (дата, время, ID потока) (Bool). По 
      умолчанию true.
      header-str - строка заголовка, 
      добавляемая в начало каждого нового файла журнала (String). По умолчанию строка 
      заголовка не добавляется.
              * @link http://docs.datex.ru/article.htm?id=5620250451197911775
              */
function EnableLogExt(name: String, param: String): void {
    return;
}

/**
              * Выполняет заданный код в основном потоке на следующее системное событие. 
      Обычно, если код выполняется в отдельном потоке, из него нельзя обращатьтся к 
      поль��овательскому интерфейсу. Если же нужно сделать, например, обновление 
      экрана, то этот код нужно вызывать через EvalAsync. Функция помещает этот код в 
      очередь, и на следующем системном событии он выполняется. См. также EvalSync.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477124
              */
function EvalAsync(arg: string): void {
    return;
}

/**
              * Выполняет заданный код в основном потоке на следующее системное 
      событие.  Функция помещает этот код в очередь, и на следующем системном 
      событии он выполняется. Эта функция блокирует поток, и дожидается окончания 
      выполнения вызванного кода. См. также EvalAsync.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477125
              */
function EvalSync(arg: string): void {
    return;
}

/**
              * Извлекает содержимое составного документа html (с вложенными файлами в 
      формате <compound-attc/>) в файл, сохраняя все вложенные файлы 
      относительно него.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911787
              */
function ExtractCompoundHtml(html: String): undefined {
    return;
}

/**
              * Сигнализирует о завершении длительного процесса 
      с упрощенным индикатором, начатым при помощи функции StartModalTask().
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911795
              */
function FinishModalTask(): undefined {
    return;
}

/**
              * Возвращает данные заданого формата из буфера (Clipboard).
              * @example resumeText = GetClipboard( 'text/html' ); 
      //выгрузка данных в формате 'text/html' resumeText = GetClipboard(); //выгрузка данных в любом 
      формате
              * @link http://docs.datex.ru/article.htm?id=5665465792879477135
              */
function GetClipboard(arg: string): void {
    return;
}

/**
              * Возвращает имя пользователя операционной системы под 
      которым выполняется текущий процесс.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878619
              */
function GetSysUserName(): String {
    return;
}

/**
              * Выполняет HTTP-запрос.
              * @example HttpRequest( 
      'http://reg.datex-soft.com/' )
      HttpRequest( 
      'http://reg.datex-soft.com/login.htm', 'post', UrlEncodeQuery( 
      {login:'xxx',password:'xxx'} ) )
      HttpRequest( 
      'http://reg.datex-soft.com/login.htm', 'post', '<xxx>111</xxx>', 
      'Content-type: text/xmlIgnore-Errors: 1\n' )
       
      Среди списка дополнительных полей заголовка возможно использование следующих 
      опций, которые обрабатываются отдельно и не попадают в передаваемый 
      заголовок:
      Ignore-Errors - Игнорировать наличие кода ошибки HTTP в 
      ответе. Если указана эта опция, код ошибки можно получить через атрибут RespCode возвращаемого 
      объекта. По умолчанию функция завершается с ошибкой в случае получения кода 
      ошибки по HTTP.
      Auto-Redirect - Автоматически следовать редиректам HTTP 
      303, HTTP 304. По умолчанию true.
              * @link http://docs.datex.ru/article.htm?id=5620276892448878634
              */
function HttpRequest(url: String): HttpResponse {
    return;
}

/**
              * Редко используемая функция.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477127
              */
function InitAppConsole(): void {
    return;
}

/**
              * Возвращает тип склонения существительного в русском языке для заданного числа.
              * @example IntModType(num)
      
      Возвращает тип склонения существительного в русском языке (0,1,2) для заданного числа. (0 - "штук", 1 - "штука", 2 - "штуки")
              * @link http://docs.datex.ru/article.htm?id=5620276892448878641
              */
function IntModType(num: Integer): Integer {
    return;
}

/**
              * Проверяет, не нажата ли какая-либо клавиша в данный 
      момент. Обычно проверятся Ctrl или Shift.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477138
              */
function IsKeyPressed(arg: Integer): void {
    return;
}

/**
 * Делает запись в файл лога определенного типа.
 * @example LogEvent(type, text)
 * @link http://docs.datex.ru/article.htm?id=5620276892448878667
 */
function LogEvent(type: String, text: String): void {
    return;
}

/**
              * Конструктор объекта MailMessage, предназначенной для хранения E-mail - 
      сообщения. Объект строится по форме x-app://app/sx_mail_message.xmd и является 
      обычным объектом типа XmlElem
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592641
              */
function MailMessage(): XmlElem {
    return;
}

/**
              * Создает объект типа MailMessage на основании почтового сообщения в формате 
      MIME.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592642
              */
function MailMessageFromMimeStr(mimeData: String): MailMessageMailMessage {
    return;
}

/**
              * Максимальное значение из нескольких аргументов.
              * @example Max(arg1,arg2...)
      Возвращает максимальное значение из нескольких аргументов
              * @link http://docs.datex.ru/article.htm?id=5620276892448878669
              */
function Max(arg?: Real): Real {
    return;
}

/**
              * Вычисляет контрольную сумму по алгоритму Md5 и 
      возвращает результат в бинарном формате (массив байт).
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878670
              */
function Md5(data: String): String {
    return;
}

/**
              * Вычисляет контрольную сумму по алгоритму Md5 и 
      возвращает результат в виде HEX-строки.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878671
              */
function Md5Hex(data: String): String {
    return;
}

/**
              * Минимальное значение из нескольких аргументов.
              * @example Min(arg1,arg2,...)
      Возвращает минимальное значение из нескольких аргументов    :
      _a = Min(2,5,10,15);
      
      Вернет:
              * @link http://docs.datex.ru/article.htm?id=5620276892448878673
              */
function Min(arg?: Real): Real {
    return;
}

/**
              * Смешивает два цвета в заданной пропорции.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878675
              */
function MixColors(color: String): String {
    return;
}

/**
              * Вычисляет контрольную сумму по алгоритму PamMd5.
              * @example PamMd5(arg)
      Вычисляет контрольную сумму по алгоритму PamMd5
              * @link http://docs.datex.ru/article.htm?id=5620276892448878699
              */
function PamMd5(arg: String): String {
    return;
}

/**
              * Возвращает Полное имя человека в виде "Фамилия 
      И.О."
              * @example PersonShortName( lastname, firstname, middlename )
              * @link http://docs.datex.ru/article.htm?id=5620276892448878709
              */
function PersonShortName(lastname: String): String {
    return;
}

/**
              * Вызывает выполнение процесса.
              * @example ProcessExecute( 'C:\Temp\pkzipc.exe', ' -add -rec 
      -path=current xxx.zip 1.htm 2.htm', 'wait=1;hidden=1;work-dir=C:\Temp' 
      );
              * @link http://docs.datex.ru/article.htm?id=5620276892448878713
              */
function ProcessExecute(path: String): Integer | undefined {
    return;
}

/**
              * Вызывает завершение текущего приложения. Редко 
      используемая функция. Используется в конвертерах, программах 
      обновления.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477126
              */
function QuitApp(): void {
    return;
}

/**
              * Возвращает случайное целое число в заданном 
      диапазоне.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878720
              */
function Random(minVal: Integer): Integer {
    return;
}

/**
              * Вызывает отправку почтового сообщения через тот способ, который был выбран в 
      настройках, как правило - Simple MAPI. В качестве параметра 
      передается объект, созданный функцией MailMessage.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477115
              */
function SendMailMessage(arg: SpXml): void {
    return;
}

/**
              * Вызывает копирование указанной информации в буфер (Clipboard).
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477136
              */
function SetClipboard(): void {
    return;
}

/**
              * Устанавливает авторизацию, используемую клиентом по умолчанию.
              * @example SetHttpDefaultAuth(log, pass)
      
      Можно использовать только на spxml т.к. он не делает одновременных запросов по разным адресам
              * @link http://docs.datex.ru/article.htm?id=5620276892448878758
              */
function SetHttpDefaultAuth(log: String): undefined {
    return;
}

/**
              * Вычисляет hash функцию по алгоритму SHA1.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878762
              */
function SHA1(str: String): String {
    return;
}

/**
              * Вычисляет hash функцию по алгоритму SHA1  и возвращает строку, закодированную в 
      Base64
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878763
              */
function SHA1Base64(str: String): String {
    return;
}

/**
              * Вызывает действие для Windows Shell.
              * @example ShellExecute( 
      'open', 'calc.exe' )
      ShellExecute( 'print', 'C:\\Temp\\xxx.doc' )
      ShellExecute( 'open', 'http://www.e-staff.ru/' )
      ShellExecute( 
      'open', 'mailto:support@e-staff.ru' )
              * @link http://docs.datex.ru/article.htm?id=5620276892448878764
              */
function ShellExecute(action: String): undefined {
    return;
}

/**
              * Создает временную задержку, не загружая 
      процессор.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878769
              */
function Sleep(ticks: Integer): undefined {
    return;
}

/**
              * Записывает текст в сроку состояния в главном окне 
      программы. Обычно используется для показа количества найденных объектов в 
      списке.
              * @example StatusMsg( 'Записей в списке: ' + n );
              * @link http://docs.datex.ru/article.htm?id=5620276892448878776
              */
function StatusMsg(msg: String): undefined {
    return;
}

/**
 * .
 * @example UserError(str)
 * @link http://docs.datex.ru/article.htm?id=5620276905286592512
 */
function UserError(str: String): String {
    return;
}

/**
              * Создает zip архив.
              * @example ZipCreate( 'C:\\Temp\1.zip', ['app','base','SpXml.exe'], { BaseDir: 'C:\\Program 
      Files\\EStaff' } );
              * @link http://docs.datex.ru/article.htm?id=5620276905286592526
              */
function ZipCreate(archivePath: String): undefined {
    return;
}

/**
              * Распаковывает архив.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592527
              */
function ZipExtract(archivePath: String): undefined {
    return;
}

/**
              * Загружает код на JavaScript из заданного url и 
      выполняет его.
              * @example EvalCodeUrl( 'rcr_lib_backup.js', 'RunBackup()' )
       
      Использование данной функции для вызова функций, описанных в файле, не 
      рекомендуется после появления функции OpenCodeLib(), предлагающей 
      более понятные правила области видимости переменных:
           
      OpenCodeLib( 'rcr_lib_backup.js' ).RunBackup()
              * @link http://docs.datex.ru/article.htm?id=5620250451197911782
              */

/**
              * Кодирует аргумент как константу JScript. 
      Используется для генерации выражений.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911741
              */
function CodeLiteral(value: any, quoteChar: String = "'"): String {
    return;
}

/**
              * Выполняет код JScript в текущем окружении. 
      Аналогична стандартной функции JScript с таким же именем, но, в отличие от нее 
      выполяняет код на отдельном уровне (переменные, объявленные внутри кода, не 
      будут видны снаружи).
      См. также InPlaceEval
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911778
              */
function eval(code: String): any {
    return;
}

/**
              * Интерпретирует содержимое страницы по правилам 
      ASP.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911779
              */
function EvalCodePage(pageData?: Bool): String {
    return;
}

/**
              * Интерпретирует содержимое страницы по правилам 
      ASP.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911780
              */
function EvalCodePageUrl(pageUrl?: string): String {
    return;
}

/**
              * Выполняет код JScript аналогично функции eval(), но внутри 
      т.н. критической секции, что исключает одновременнео выполнение кода из разных 
      потоков.
      Функция как правило используется для доступа к данным, не являющимся 
      thread-safe, например к глобальным XML-документам.
       
      Данной функцией следуетт пользоваться с осторожностью, поскольку глобальная 
      секция является общей для всего приложения. Не следует выполянть внтури 
      кртической секции код, который может занять продолжительное время (обращения к 
      диску, сети и д.р.)
              * @example EvalCs( 'global_agents.agent_completed = true' )
              * @link http://docs.datex.ru/article.htm?id=5620250451197911783
              */
function EvalCs(codeString: String): any {
    return;
}

/**
              * Извлекает из объекта типа Error пользовательскую 
      часть сообщения об ошибке. Если объект не содержит выделенно пользовательской 
      части, возвращается полное описание ошибки.
              * @example try
      {
          HttpRequest( .... );
      }
      catch ( e )
      {
          alert( 'Невозможно активировать 
      программу: ' + ExtractUserError( e ) );
      }
              * @link http://docs.datex.ru/article.htm?id=5620250451197911788
              */
function ExtractUserError(e: Error): String {
    return;
}

/**
              * Выполняет код JScript в текущем окружении. В 
      отличие от функции eval() выполяняет 
      код на том же уровне (переменные, объявленные внутри кода, будут 
      видны снаружи), и не позволяет возвращать значение.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477150
              */
function InPlaceEval(code: String): undefined {
    return;
}

/**
              * Проверяет, является ли заданный объект типа Error 
      ошибкой отменой операции .
              * @example try
      {
          HttpRequest( .... );
      }
      catch ( e )
      {
          if ( ! IsCancelError( e ) 
      )    
              alert( 
      'Невозможно активировать программу: ' + ExtractUserError( e ) 
      );
      }
              * @link http://docs.datex.ru/article.htm?id=5620276892448878645
              */
function IsCancelError(e: any): Bool {
    return;
}

/**
              * Обозначает текущий статус выполения фрагмент 
      кода с упрощенной индикацией пользователю, начатого путем вызова функции StartModalTask()
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878676
              */
function ModalTaskMsg(msg: String): undefined {
    return;
}

/**
              * Открывает документ либо с расширением XML, содержащий 
      набор методов, и возвращает его корневой элемент, либо с расширением .JS, 
      содержащий функции, возвращает псевдо-документ (псевдо-форму), содержащую те же 
      функции. Действие этой функции похоже на действие функции EvalCodeUrl, но 
      не тождествены ей. Если мы выполняем сторонние функции при помощи  EvalCodeUrl, то 
      переменные из нашего кода видны внутри сторонних функций, что может привести к 
      разрушению кода при совпадении названий переменных. OpenCodeLib лишен этого 
      недостатка, т.к. приводит к загрузке функций из внешнего источника как 
      независимых методов, каждый из которых выполняется в собственном окружении. Но в 
      этом случае, в отличие от EvalCodeUrl, 
      загружаемый js-файл не может содержать глобальных переменных, а только 
      функции.
       
      Аргуент
      url - url 
      загружаемого документа с расширением XML или JS (string).
              * @example OpenCodeLib( 'lib_backup.js' ).RunBackup()
              * @link http://docs.datex.ru/article.htm?id=5620276905286592593
              */
function OpenCodeLib(): XmlDoc {
    return;
}

/**
              * Выполняет код JS, который, возможно, завершится 
      с ошибкой, с возвратом заданного значения по умолчанию в случае ошибки.
              * @example OptEval( 'doc.TopElem.xxx', '' )
              * @link http://docs.datex.ru/article.htm?id=5620276892448878696
              */
function OptEval(code: String): any {
    return;
}

/**
              * Выполняет заданный код на сервере, и возвращает 
      результат. undefined
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592599
              */
function ServerEval(code: String): String | undefined {
    return undefined;
}

/**
              * Обозначает запуск длительного фрагмент 
      кода с упрощенной индикацией пользователю.
      Прогресс выполнения будет обозначаться путем перидического вызова функции  ModalTaskMsg()
              * @example ModalTaskMsg( 'Импорт данных' 
      );
      for ( ... )
      {
          
      ModalTaskMsg( 'Объект ' + i );
      }
      FinishModalTask();
       
      В часто вызываемом коробочном коде данную функцию использовать не 
      рекомендуется, ввиду наличия более удобного для пользователя механизма методов с 
      прогресс-индикаторами. Функцию хорошо использовать в одноразовом или редко 
      используемом коде ввиду его простоты.
              * @link http://docs.datex.ru/article.htm?id=5620276892448878775
              */
function StartModalTask(taskTitle: String): undefined {
    return undefined;
}

class spXmlForm {
    /**
          * Возвращает url картинки корневого элемента формы. Вычисляет значение 
  атрибутов элемента IMAGE-URL или IMAGE-URL-EXPR, 
  описанных в корневом элементе XMD-формы.
          
          * @link http://docs.datex.ru/article.htm?id=5791375928854454850
          */
    ImageUrl: String;

    /**
              * Проверяет, является ли форма описанием элемента 
      иерерхического католога (см. атрибут XMD- 
      формы HIER) . Если является, возвращает true, иначе - false.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454849
              */
    IsHier: bool;

    /**
              * Возвращает корневой элемент XMD-формы. Если корневого элемента нет, 
      возвращается undefined.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454865
              */
    OptTopElem: XmlFormElem;

    /**
              * Возвращает заголовок корневого элемента 
       XMD-формы, который был описан атрибутом TITLE или 
      TITLE-EXPR.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454847
              */
    Title: String;

    /**
              * Возвращает корневой элемент XMD-формы. Также к можно обратиться к корневому 
      элементу, используя его имя, но TopElem - более универсальный способ.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454852
              */
    TopElem: XmlFormElem;

    /**
              * Возвращает url XMD-формы. Форма может не иметь url (если она, 
      например,  создана динамически), в таком случае возвращается пустая 
      строка. Атрибут доступен на запись.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454851
              */
    Url: String;

    /**
              * Возвращает содержимое текущего элемента, включая дочерние элементы, 
      если они есть, в виде строки в "каноническом" формате XML.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454848
              */
    Xml: String;
}

class spXmlFormMultiElem {
    /**
                 * Возвращает массив, указанный в атрибуте 
         FOREIGN-ARRAY текущего элемента.
                 
                 * @link http://docs.datex.ru/article.htm?id=5620250451197911797
                 */
    ForeignArray: Object;

    /**
              * Возвращает документ, к которому относится данный 
      объект.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911771
              */
    Doc: XmlDoc;

    /**
              * Возвращает true если существует хоть один 
      соответствующий множественный элемент.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878627
              */
    HasValue: Bool;

    /**
              * Возвращает массив всех соответствующих 
      множественных элементов.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878639
              */
    Instances: Array<any>;

    /**
              * Всегда возвращает false.
      Аналогичный метод объекта XmlElem всегда возвращает false. Это 
      позволяет по конструкции вида candidate.profession_id.IsMultiElem 
      определять
      был ли элемент profession_id описан 
      c атрибутом MULTIPLE="1".
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878650
              */
    IsMultiElem: Bool;

    /**
              * Возвращает имя ссответствующего 
      множественного элемента.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878681
              */
    Name: String;

    /**
              * Возвращает константу на языке XQuery в виде последовательности из значений соответствующих
      множественных элементов.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592523
              */
    XQueryLiteral: String;

    /**
              * Возвращает родительский элемент текущего 
      элемента.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878701
              */
    Parent: XmlDoc;

    /**
              * Проверяет существует ли соответствующий 
      множественный элемент с заданным значением.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911723
              */
    ByValueExists(value: any): Bool;

    /**
              * Удаляет все соответствующие множественные 
      элементы.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911738
              */
    Clear(): void;

    /**
              * Добавляет новый соответствующий множественный 
      элемент к родительскому элементу и возвращает ссылку на него.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911678
              */
    Add(): XmlElem;

    /**
              * Удаляет все соответствующие множественные 
      элементы.
      Устаревшее название метода Clear().
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911760
              */
    DeleteAll(): void;

    /**
              * Удаляет соответствующий множественный элемент с 
      заданным значением. Если таких элементов несколько, удаляет первый. В случае 
      отсутствия таких элементов возвращает ошибку.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911761
              */
    DeleteByValue(val: any): void;

    /**
              * Находит соответствующий множественный элемент с 
      заданным значением ключевого поля. Если такой элемент не найден, возвращает 
      ошибку.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911807
              */
    GetByKey(keyValue?: String): XmlElem;

    /**
              * Ищет соответствующий множественный элемент с заданным ключевым 
      элементом. Если не находит, то добавляет новый дочерний элемент, и 
      его ключевому полю присваивает заданное значение. Возвращает ранее 
      существовавший или вновь созданный дочерний элемент.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878684
              */
    ObtainByKey(keyValue?: String): XmlElem;

    /**
              * Находит элемент, относящийся к данному объекту по 
      ключу. В случае его отсутствия, добавляет элемент в соответствующую позицию по 
      возрастанию ключа.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878685
              */
    ObtainByKeySorted(keyValue?: String): XmlElem;

    /**
              * Ищет соответствующий множественный элемент 
      с заданным значением. Если не находит, добавляет новый элемент и присваивает ему 
      заданное значение.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878686
              */
    ObtainByValue(value: any): XmlElem;
}

class spXmlElem {
    /**
              * Возвращает массив названий атрибутов элемента.
      Элемент должен быть динамическим, поскольку для статических элементов 
      атрибуты не поддерживаются.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911715
              */
    AttrNames: Array<any>;

    /**
              * Идет "по цепочке" элементов вверх, и возвращает первый элемент с атрибутом 
      MULTIPLE="1". Если такого элемента нет, возвращается ошибка.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592743
              */
    BaseMultipleElem: XmlElem;

    /**
              * Возвращает индекс текущего элемента внутри родительского элемента, начиная с 
      "0". Если родительского элемента нет - возвращается ошибка.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911735
              */
    ChildIndex: Integer;

    /**
              * Возвращает количество дочерних элементов.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911736
              */
    ChildNum: Integer;

    /**
              * Возвращает документ, в состав которого входит текущий 
      элемент. Если документа нет - возвращает ошибку.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592744
              */
    Doc: XmlElem;

    /**
              * Возвращает основное
      отображаемое значение элемента для внешнего использования, например, для
      внешних ссылок. Обычно используется для элементов каталога. Для простых
      элементов совпадет с PrimaryDispName,
      если элемент иерархический - возвращает всю цепочку имен по иерархии.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592748
              */
    ExternalDispName: String;

    /**
              * Возвращает целевой массив (вычисляет выражение, описанное в атрибуте 
      FOREIGN-ARRAY). Если атрибут FOREIGN-ARRAY в форме элемент не описан, 
      возвращается ошибка.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911796
              */
    ForeignArray: Object;

    /**
              * Возвращает значение атрибута FOREIGEN-ARRAY в том виде, в котором оно был 
      описан в форме.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592752
              */
    ForeignArrayCodeStr: String;

    /**
              * Возвращает внешнее первичное отображаемое значение того 
      объекта, на который ссылается атрибут FOREIGN-ELEM.
       
      Для обычных элементов конструкция
      person.org_id.ForeignDispName
      эквивалентна
      person.org_id.ForeignElem.ExternalDispName 
  
       
      Для элементов типа MULTIPLE результат составляется из всех значений 
      одиночных элементов, разделенных через запятую.
      Таки образом конструкция
      candidate.profession_id.ForeignDispName
      эквивалентна
      ArrayMerge( 
      candidate.profession_id, 'ForeignElem.ExternalDispName', ', ' 
      )
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592756
              */
    ForeignDispName: String;

    /**
              * Возвращает соответтвующий элемент цеелвого 
      массива (описанного в атрибуте FOREIGN-ARRAY). Если элемент не найден - 
      возвращает ошибку.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911798
              */
    ForeignElem: Object;

    /**
              * Атрибут возвращает url объекта, на который ссылается атрибут ForeignElem из текущего 
      элемента. Целевой массив должен быть каталогом.
      Конструкция используется, когда необходимо быстро открыть документ, на 
      который ссылается  атрибут ForeignElem. 
  
       
      В новой объектной модели конструкция
      person.org_id.ForeignObjectUrl
      эквивалентна
      person.org_id.ForeignElem.ObjectUrl
      но, в отличие от последней, не осуществляет поиск целевого элемента, а 
      только использует имя каталога из FOREIGN-ELEM.
       
      В старой объектной модели конструкция
      person.org_id.ForeignObjectUrl
      эквивалентна
      UrlFromDocID( person.org_id 
      )
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592754
              */
    ForeignObjectUrl: String;

    /**
              * Атрибут аналогичен ForeignObjectUrl, но, 
      в случае, если от целевого объекта могут существовать наследуемые 
      объекты, пытается найти конечный элемент в цепочке наследования, и 
      возвращает его объектный url.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592755
              */
    ForeignPrimaryObjectUrl: String;

    /**
              * Возвращает ссылку на форму, по которой был открыт 
      документ. Если документ открыт без формы, возвращается ошибка.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592738
              */
    Form: XmlForm;

    /**
              * Возвращает полный путь до текущего элемента относительно корня формы.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911799
              */
    FormPath: String;

    /**
              * Возвращает ссылку на элемент
      формы текущего элемент. Причем такая ссылка возвращается независимо от
      того, был документ открыт по форме или нет. Если элемент был
      создан по форме, выдается ссылка на элемент формы, по которой он был
      открыт. Если нет - на динамический элемент формы, созданный специально для
      данного элемента.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592736
              */
    FormElem: XmlFormElem;

    /**
              * Возвращает true, если элемент содержит значение, и false, если не содержит. 
      Этот универсальный атрибут позволяет создавать единый код для всех типов 
      элементов. Так, например, если элемент имеет тип string, то при отсутствии 
      значения элемент будет равен пустой строке.  Если же элемент имеет 
      тип, например, integer, то при отсуствии значения элемент будет равен null. 
      Атрибут HasValue работает с элементами любого типа, в т.ч. "variant".
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878626
              */
    HasValue: Bool;

    /**
              * Возвращает url картинки элемента. Атрибут доступен для записей в каталоге или 
      для корневых элементов документа, и вычисляет значение атрибутов  
      элемента IMAGE-URL или IMAGE-URL-EXPR, описанных в XMD-форме.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592739
              */
    ImageUrl: String;

    /**
              * Возвращает массив из одного текущего элемента.
      Аналогичный атрибут объекта XmlMultiElem возвращает массив из всех 
      относящихся к нему фактических элементов. Позволяет создавать один и тот же код, 
      пригодный как для обработки одиночных элементов, так и множественных элементов 
      типа MULTIPLE.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878638
              */
    Instances: Array<any>;

    /**
              * Проверяет, является ли данный элемент первым среди дочерних элементов своего 
      родительского элемента.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878647
              */
    IsFirstSibling: Bool;

    /**
              * Проверяет, является ли данный элемент последним среди дочерних элементов 
      своего родительского элемента.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878648
              */
    IsLastSibling: Bool;

    /**
              * Всегда возвращает false.
  
      Аналогичный метод объекта
      XmlMultiElem всегда возвращает true. Это позволяет по конструкции вида
      candidate.profession_id.IsMultiElem определять
  
      был ли элемент profession_id
      описан c атрибутом MULTIPLE="1".
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878649
              */
    IsMultiElem: Bool;

    /**
              * Содержит значение
      true, если элемент является вторичным (т.е. элемент формы, по которой был
      открыт текущий элемент, содержит атрибут SECONDARY="1"). Вторичный
      элемент не вводится пользователем, а вычисляется, как правило при выполнении
      метода OnSave.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592742
              */
    IsSecondary: Bool;

    /**
              * Содержит значение true, если элемент является временным 
      (т.е. элемент формы, по которой был открыт текущий элемент, содержит атрибут 
      TEMP="1").
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592741
              */
    IsTemp: Bool;

    /**
              * Возвращает true, если элемент является корневым элементом документа.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878652
              */
    IsTopElem: Bool;

    /**
              * Возвращает имя элемента.
  
      Для динамических элементов
      атрибут доступен на запись.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878680
              */
    Name: String;

    /**
              * Возвращает элемент, следующий по порядку за текущим в списке дочерних 
      элементов родительского элемента. если текущий элемент является последним, 
      возвращается ошибка.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878682
              */
    NextSibling: XmlElem;

    /**
              * Работает только для
      записей в каталоге, или корневых элементов объектных документов. Возвращает url
      объекта.
  
      Использование этого
      атрибута позволяет применять быстрые конструкции, например OpenDoc(
      record.ObjectUrl ). Атрибут берет элемент id от данной записи, имя объекта, и
      формирует правильный url автоматически.
  
      Атрибут также
      работает в старой объектной модели.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592749
              */
    ObjectUrl: String;

    /**
              * Возвращает документ, в состав которого входит текущий 
      элемент. Если элемента не относится к документу - возвращает 
      undefined.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592745
              */
    OptDoc: XmlDoc;

    /**
              * Возвращает соответствующий элемент целевого массива (описанного в 
      атрибуте FOREIGN-ARRAY). Если элемент не найден - возвращает  
      undefined.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592753
              */
    OptForeignElem: Object;

    /**
              * В случае если элемент находится в документе, открытом в экране, возвращает 
      ссылку на экран, иначе - undefined.
      Смотри также атрибут Screen.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592758
              */
    OptScreen: Screen;

    /**
              * Возвращает родительский элемент текущего элемента, если таковой есть. Если 
      родительского элемента нет, возвращает ошибку.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878700
              */
    Parent: XmlElem;

    /**
              * Возвращает предыдущий
      относительно текущего элемент в списке дочерних элементов родительского
      элемента. Если элемент является первым, возвращает ошибку.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878711
              */
    PrevSibling: XmlElem;

    /**
              * Возвращает первичное отображаемое 
      имя объекта. Метод доступен для записей в каталоге, либо для корнвых 
      элементов объектных документов.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592747
              */
    PrimaryDispName: null;

    /**
              * Возвращает элемент - первичный
      ключ текущего элемента. Первичный ключ должен быть описан в форме
      как PRIMARY-KEY. Для записи в каталоге первичным ключом автоматически
      считается элемент <id>.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878712
              */
    PrimaryKey: any;

    /**
              * Атрибут работает
      аналогично ObjectUrl,
      но учитывает возможность наследования. Атрибут проверяет наличие наследуемого
      элемента, и, если таковой есть, возвращает последний объект в цепочке наследования.
  
      Например, в E-staff
      candidate наследуется от person. Если в этом случае применить атрибут
      PrimaryObjectUrl к объекту candidate, то будет возвращен url объекта candidate.
      Если применить атрибут PrimaryObjectUrl к объекту person, и person является
      кандидатом, то будет возвращен url объекта candidate.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592750
              */
    PrimaryObjectUrl: String;

    /**
              * Флаг, обозначающей, что элемент доступен только на чтение. Если данные 
      элемент установить в true, то последующие попытки изменить содержимое элемента 
      или его дочерних элементов вызовут ошибку.
      При помещении ссылки на какой-либо элемент в объект 
      web-сервера Session, у такого 
      элемента флаг ReadOnly автоматически устанавливается в true, для предотвращения 
      возможных одновременных изменений элемента из разных потоков, что является не 
      thread-safe операцией.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454879
              */
    ReadOnly: Bool;

    /**
              * В случае если элемент находится в документе, открытом в экране, 
      возвращает ссылку на экран, иначе - выдает ошибку.
      Смотри  также атрибут OptScreen.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878752
              */
    Screen: Screen;

    /**
              * Атрибут применим только к
      элементам типа "string". Возвращает длину строки в байтах.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878765
              */
    Size: Integer;

    /**
              * Возвращает заголовок элемента, который был описан в 
      XMD-форме атрибутом TITLE или TITLE-EXPR.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592737
              */
    Title: String;

    /**
              * Возвращает тип данных элемента: 'string', 'integer' и т.д.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878822
              */
    Type: String;

    /**
              * Означает, что текущий элемент будет сохраняться не как обычный 
      XML-элемент, а как CData. Этот атрибут может быть использован, например, при 
      экспорте атрибута во внешние системы.
      Атрибут доступен только на запись.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592759
              */
    UseCData: Bool;

    /**
              * Значение элемента. Явно вызывать
      его не обязательно, т.к. это свойство по умолчанию, т.е. при чтении значения
      элемента  выражения 'elem.Value' и просто 'elem' тождественны.
      Однако, при записи значения иногда требуется вызывать этот атрибут в явном
      виде. Если вызывается функция или метод, которая возвращает элемент
      (например, метод AddChild), то для установки значения нужно в явном виде
      указывать атрибут Value.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592514
              */
    Value: null;

    /**
              * Возвращает содержимое
      текущего элемента, включая дочерние элементы, если они есть, в виде строки
      в формате XML.
  
      Смотри также XmlValue.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592517
              */
    Xml: String;

    /**
              * Возвращает значение текущего
      элемента, оформленное по правилам XML,  в том виде, в котором оно
      включается между тэгами.
  
      Строка (string) будет замаскирована
      знаками <&, число (integer) останется без изменений, логическое значение
      (boolean) будет представлено как 0 или 1, дата будет записана в виде даты в
      формате XML.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592757
              */
    XmlValue: String;

    /**
              * Формирует константу в языке XQuery со значением текущего элемента, в 
      зависимости от типа значения. Действует аналогично функции XQueryLiteral().
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592522
              */
    XQueryLiteral: String;

    /**
              * Добавляет атрибут к текущему элементу. Метод работает только для динамических 
      элементов.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911679
              */
    AddAttr(): void;

    /**
              * Добавляет дочерний элемент и возвращает указатель на него.
      Если текущий элемент создан по форме, то он должен быть простым массивом. При 
      этом аргументы для вызова функции не требуются.
      Если текущий элемент является динамическим (т.е. построенным без формы), то 
      добавляется дочерний динамический элемент с именем и типом, указанных в качестве 
      аргументов.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911680
              */
    AddChild(name?: String): XmlElem;

    /**
              * Добавляет уже созданный элемент в качестве в качестве 
      дочернего по отношению к текущему элементу .
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592765
              */
    AddChildElem(): void;

    /**
              * Добавляет динамический дочерний элемент к текущему элементу и возвращает 
      ссылку на внов созданный элемент. Текущий элемент при этом не обязан быть 
      динамическим.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911681
              */
    AddDynamicChild(name: String, type?: String): XmlElem;
    /**
              * Копирует в текущий элемент данные из другого элемента, включая дочерние 
      элементы. Значения всех совпадающим по имени элементов копируются, элементы с 
      атрибутом MULTIPLE при этом синхронизируются по количеству. 
      Если присваиваемый и текущий элементы были созданы по разным формам - 
      присваивются значения только по совпадающим полям.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911713
              */
    AssignElem(srcElem: XmlElem): void;

    /**
              * Действует аналогично AssignElem(), но 
      текущему элементу присваиваются значения только по тем полям, которые в 
      текущем элементе не заполнены.
              
              * @link http://docs.datex.ru/article.htm?id=5652176266853304326
              */
    AssignExtraElem(srcElem: object): void;

    /**
              * Возвращает дочерний элемент либо по индексу, либо по имени. Если элемента с 
      заданным именем нет, выдает ошибку.
      Смотри также методы OptChild() и EvalPath().
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911731
              */
    Child(arg: Integer): XmlElem;

    /**
              * Проверяет, существует ли дочерний элемент с заданным значением ключевого 
      поля.
      Смотри также ChildByKeyExistsRec().
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911732
              */
    ChildByKeyExists(keyValue?: String): Bool;

    /**
              * Специализированный аналог также ChildByKeyExists() с 
      поддержкой рекурсивных массивов.
      Позволяет искать только по первиному ключу.
              
              * @link http://docs.datex.ru/article.htm?id=5652176266853304323
              */
    ChildByKeyExistsRec(keyValue: any): Bool;

    /**
              * Проверяет, существует ли дочерний элемент с заданым значением.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911733
              */
    ChildByValueExists(elemVal: any): Bool;

    /**
              * Проверяет, существует ли дочерний элемент с заданым именем.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911734
              */
    ChildExists(name: String): Bool;

    /**
              * Если аргумент - обычный дочерний элемент, то метод просто возвращает его 
      значение. Если аргумент - метод или атрибут с таким наименованием, то метод 
      вычисляет его и возвращает вычисленное значение.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592762
              */
    ChildValue(name: String): null;

    /**
              * Очищает значение данного элемента и его дочерних элементов. Поля типа string 
      становятся пустыми строками, поля других основных типов - становятся равны null. 
      Если у полей есть значения по умолчанию - присваиваются значения по умолчанию. 
      Элементы типа MULTIPLE удаляются.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911737
              */
    Clear(): void;

    /**
              * Создает клон текущего элемента и возвращает ссылку на него. Новый элемент не 
      имеет родительского элемента.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911739
              */
    Clone(): XmlElem;

    /**
              * Удаляет элемент. Элемент должен либо иметь атрибут MULTIPLE, либо быть 
      динамическим элементом.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911759
              */
    Delete(): void;

    /**
              * Удаляет атрибут с заданным именем. Метод работает только для динамических 
      элементов. Если атрибута с зданным именем нет, функция возвращает ошибку.
      Смотри также DeleteOptAttr().
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592766
              */
    DeleteAttr(attrName: String): void;

    /**
              * Удаляет первый найденный дочерний элемент с заданным 
      значением ключевого поля.
      Если дочерний элемент не найден, возвращается ошибка.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911762
              */
    DeleteChildByKey(keyValue?: String): void;

    /**
              * Удаляет все дочерние элементы, удовлетворяющие заданому условию.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911763
              */
    DeleteChildren(qualExpr?: String): void;

    /**
              * Удаляет атрибут с заданным именем. Метод работает только для динамических 
      элементов.
      Если атрибута с зданным именем нет, метод не производит никаких действий. 
      Смотри также DeleteAttr().
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592767
              */
    DeleteOptAttr(attrName: String): void;

    /**
              * Выполняет поэлементное, рекурсивное сравнение текущего элемента с другим 
      заданным элементом. Возвращает true, если все поля всех подэлементов совпадают, 
      false - если не совпадают.
      Сравнение производится по тем же правилом, по которым работает метод AssignElem(), т есть 
      элементы, которые есть в форме одного элемент, но которых нет в форме другого, в 
      сравнении не участвуют. Массивы сравниваются поэлементно, при этом требуется 
      совпаденеи как количества лементов в массиве так и порядка их следования.
              
              * @link http://docs.datex.ru/article.htm?id=5652176266853304327
              */
    EqualToElem(elem: XmlElem): void;

    /**
              * Возвращает все подчиненные (ниже лежащий по иерархии относительно 
      текущего элемента) элементы, у которых путь относительно текущего элемента 
      совпадает с заданным.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592764
              */
    EvalMultiPath(path: String): Array<any>;

    /**
              * Возвращает внутренний (т.е. ниже лежащий по иерархии относительно текущего 
      элемента) элемент по заданному пути. Если путь неверный, возвращается 
      ошибка.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911784
              */
    EvalPath(path: String): XmlElem;

    /**
              * Проверяет, существует ли в форме текущего элемента дочерний элемент с таким 
      именем, не являющийся методом.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592763
              */
    FormChildExists(name: String): Bool;

    /**
              * Находит дочерний элемент с заданным значением 
      определенного атрибута. Если такой элемент не найден - возвращается 
      ошибка.
              
              * @link http://docs.datex.ru/article.htm?id=5652176266853304325
              */
    GetChildByAttrValue(attrName: String): XmlElem;

    /**
              * Возвращает дочерний элемент с заданным значением ключевого поля. Если 
      дочерний элемент не найден, возвращает ошибку.
      Смотри также GetOptChildByKey().
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878593
              */
    GetChildByKey(keyValue?: String): XmlElem;

    /**
              * Возвращает дочерний элемент с заданным значением ключевого поля. Если 
      дочерний элемент не найден, возвращает undefined.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878615
              */
    GetOptChildByKey(keyValue?: String): XmlElem;

    /**
              * Возвращает дочерний элемент с заданным значением ключевого поля. Если 
      дочерний элемент не найден, возвращает undefined.
              
              * @link http://docs.datex.ru/article.htm?id=5652176266853304322
              */
    GetOptChildByKey(keyValue?: String): XmlElem;

    /**
              * Возвращает текстовое прдставление значения элемента.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878616
              */
    GetStr(): String;

    /**
              * Возвращает содержимое текущего элемента, включая дочерние элементы, 
      если они есть, в виде строки в формате XML.
      Действие метода аналогично действию атрибута Xml, но позволяет 
      задать дополнительные опции вывода.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454874
              */
    GetXml(options?: String): String;

    /**
              * Добавляет новый дочерний элемент перед существующим дочерним элементом и 
      возвращает указатель на него.
      Если текущий элемент создан по форме, то он должен быть простым массивом. При 
      этом аргументы для вызова функции не требуются.
      Если текущий элемент является динамическим (т.е. построенным без формы), то 
      добавляется дочерний динамический элемент с именем итипом, указанных в качестве 
      аргументов.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878637
              */
    InsertChild(index?: String): XmlElem;

    /**
              * Загружает значение элемента и его дочерних элементов из строки, содержащей 
      данные в формате XML.
      Из строки подгружаются только те данные, которые присутствуют в исходном 
      XML. Если необходимо полностью синхронизировать элемент с данными из 
      строки, перед вызовом данного метода необходимо вызывать метод Clear().
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878658
              */
    LoadData(data: String): void;

    /**
              * Загружает значение элемента и его дочерних элементов из url, содержащего 
      данные в формате XML.
      Из строки подгружаются только те данные, которые присутствуют в исходном 
      XML. Если необходимо полностью синхронизировать элемент с данными из 
      строки, перед вызовом данного метода необходимо вызывать метод Clear().
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878659
              */
    LoadDataFromUrl(url: String): void;

    /**
              * Загружает содержимое элемента из url. Метод работает только 
      для элементов типа "string".
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878661
              */
    LoadFromFile(url: String): void;

    /**
              * Загружает содержимое элемента из строки. Работате только для элементов 
      типа "string".
      Устаревший метод, использововшийся когда элементы "binary" и "string" были 
      разными элементами.
      В настоящий момент можно использовать обычное присваивание.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878662
              */
    LoadFromStr(data: String): void;

    /**
              * Добавляет атрибут к текущему элементу, если его в элементе не существует. 
      Если атрибут с таким именем существует, то просто заменяет его значение на 
      новое. Метод работает только для динамических 
      элементов.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878683
              */
    ObtainAttr(attrName: String): void;

    /**
              * Ищет дочерний элемент с заданным ключевым элементом. Если не находит, то 
      добавляет новый дочерний элемент, и его ключевому полю присваивает заданное 
      значение. Возвращает ранее существовавший или вновь созданный дочерний 
      элемент.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878687
              */
    ObtainChildByKey(keyValue?: String): XmlElem;

    /**
              * Метод пытается найти среди дочерних элементов элемент с заданным значением 
      определенного поля, если находит - возвращает ссылку на найденный элемент. Если 
      не находит - добавляет новый дочерний элемент, присваивает ему заданное 
      значение, и возвращает вновь созданный элемент.
              
              * @link http://docs.datex.ru/article.htm?id=5652176266853304324
              */
    ObtainChildByValue(elemVal: any): XmlElem;

    /**
              * Возвращает значение атрибута текущего элемента. Если атрибута с заданным 
      именем нет, возвращает значенеи второго аргумента, если втрой аргумент не 
      указан - возвращает пустую строку.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878695
              */
    OptAttrValue(attrName?: String): String;

    /**
              * Возвращает дочерний элемент. Находит 
      дочерний элемент по имени. Если элемента с заданным именем нет, выдает 
      undefined.
      Смотри также метод Child().
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592761
              */
    OptChild(name: String): XmlElem;

    /**
              * Метод находит (среди дочерних элементов текущего элемента) элемент, имеющий 
      атрибут с заданным именем, и возвращает значение другого заданного атрибута у 
      найденного элемент. Если такого элемент или такого атрибута нет, возвращается 
      пустая строка.
      Редко используемый метод.
              
              * @link http://docs.datex.ru/article.htm?id=5652176266853304320
              */
    OptChildAttrValue(attrName: String): String;

    /**
              * Проверяет существует ли вложенный
      (т.е. ниже лежащий по иерархии относительно текущего элемента) элемент по заданному
      пути относительно текущего.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878706
              */
    PathExists(path: String): Bool;

    /**
              * Проверяет, существует ли у текущего элемента атрибут (метод) с 
      таким именем.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878714
              */
    PropertyExists(arg: string): Bool;

    /**
              * Возвращает путь до заданного элемента, относительно заданного 
      базового элемента, находящегося на один или несколько уровней 
      выше.
      Если заданный базовый элемент не является вышестоящим для текущего 
      элемента, возвращается ошибка.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878736
              */
    RelativePath(): Bool;

    /**
              * Сохраняет содержимое элемента в
      файл по заданному url. Метод работает только для элементов типа
      "string".
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878751
              */
    SaveToFile(url: String): void;

    /**
              * Переставляет данный элемент на другую позицию среди дочерних элементов его 
      родительского элемента. Элемент должен либо иметь атрибут MULTIPLE, либо быть 
      динамически созданным элементом.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878757
              */
    SetChildIndex(newPos: Integer): void;

    /**
              * Устанавливает значение атрибута с
      заданным именем, если значение атрибута отличается от его требуемого значения
      по умолчанию. Метод работает только для динамических элементов.
  
      Если атрибут с заданным именем
      существует, то, если новое значение не совпадает со значением по умолчанию,
      устанавливает новое значение атрибута. Если новое значение совпадает со
      значением по умолчанию, атрибут удаляется.
  
      Если атрибут не существует, то он
      добавляется, если новое значение не совпадает со значением по умолчанию.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878759
              */
    SetOptAttrValue(attrName?: String): void;

    /**
              * Сортирует дочерние элементы в заданном
      порядке. Метод должен содержать четное число
      аргументов. Каждая пара аргументов соответствует параметрам сортировки.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878771
              */
    Sort(elemExp: String): void;

    /**
              * (статья не завершена) 
                                          	
                                  	
                                  	
  
  
  
      Устаревший метод из тупиковой
      технологической ветки.
              
              * @link http://docs.datex.ru/article.htm?id=5652176266853304329
              */
    UpdateSecondaryData(): null;

    /**
              * Вызывает принудительный пересчет всех подэлементов текущего элемента. 
      Пересчет производится по полям, имеющим атрибут EXPR или EXPR-INIT.
              
              * @link http://docs.datex.ru/article.htm?id=5652176266853304328
              */
    UpdateValues(): void;
}

class spXmlDoc {
    /**
          * Если атрибут имеет значение true, это означает, что при 
  выходе из системы или при остановке сервера документы, которые были изменены, 
  будут сохраняться автоматически.
  Обычно установлен у документов, содержащих настройки 
  пользователя.
          
          * @link http://docs.datex.ru/article.htm?id=5620276905286592714
          */
    AutoSave: Bool;

    /**
              * Возвращает id документа (только для объектных документов). Id вычисляется на 
      основании url документа. Если это не объектный документ, атрибут возвращает 
      ошибку.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911772
              */
    DocID: Integer | String;

    /**
              * Указатель на форму, по которой был открыт документ. Если 
      документ не имеет формы, возвращается ошибка.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592709
              */
    Form: XmlForm;

    /**
              * Возвращает url формы, по которой был открыт документ. Если документ не 
      имеет формы, возвращается пустая строка.
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911800
              */
    FormUrl: String;

    /**
              * Флаг, обозначающий что документ был изменен. Как правило, этот флаг 
      автоматически устанавливается при изменении пользователм данных в 
      пользовательском интерфейсе, но так же его можно читать и изменять 
      программно.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592710
              */
    IsChanged: Bool;

    /**
              * По умолчанию имеет значение false. Может иметь значение 
      true, если документ был открыт с опцией Separated, в таком 
      случае документ открывается как независимый документ, не привязанный к базе 
      данных. При его сохранении не вызывается OnSave и т.д.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592719
              */
    IsSeparated: null;

    /**
              * Если для формы документа установлен 
      параметр USE-LAST-SAVED-DATA="1", то данный атрибут доступен в методе 
      OnSave() документа. Он устанавливается в соответствии с предыдущей сохраненной 
      копией коневого элемента документа. Атрибут используется, если нужно 
      сравнить предыдущее значение  с текущим, и определить, что значение было 
      изменено. Для документа, который еще не был ни разу сохранен, атрибут вернет 
      пустой корневой элемент, созданный по той же форме, что и текущий 
      документ.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592715
              */
    LastSavedData: XmlDoc;

    /**
              * Флаг, обозначающий, что документ был только что создан, и еще ни разу не 
      сохранялся.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592711
              */
    NeverSaved: Bool;

    /**
              * Возвращает id объектного документа. Это новая версия атрибута DocID, разработанная 
      для новой объектной модели. В отлчиие от DocID доступна на чтение и запись и 
      поддерживает как челочисленные так и строковые ID.
      Для документа, не являющегося объектным, выдается ошибка.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592708
              */
    ObjectID: Integer | String;

    /**
              * В случае если документ открыт в экране, возвращает ссылку на 
      экран, иначе - undefined.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477226
              */
    OptScreen: Screen;

    /**
              * По умолчанию имеет значение true, означающие, что при сохранении документа 
      следует исполнить описанный в форме документа  метод OnSave. 
      Может быть переведн в значение false, например для оптимизации массовой 
      обработки документов.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592718
              */
    RunActionOnSave: null;

    /**
              * В случае если документ открыт в экране, возвращает ссылку на экран, 
      иначе - выдает ошибку.
      Смотри  также атрибут OptScreen.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477225
              */
    Screen: Screen;

    /**
              * Возвращает корневой элемент в  документе. Так же к можно обратиться 
      к корневому элементу, используя его имя, но TopElem - более универсальный 
      способ.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878820
              */
    TopElem: XmlElem;

    /**
              * Возвращает url документа. Документ может не иметь url, в таком случае 
      возвращается пустая строка.
      Атрибут доступен на запись.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878827
              */
    Url: String;

    /**
              * Если свойство имеет значение false (по умолчанию), то при 
      сохранении документов будет использована сокращенная форма записи, т.е. поля 
      документа, не содержащие значений, экспортироваться не будут. Это 
      необходимо для сокращения размера документа. Однако, при выгрузке (экспорте) 
      документов обычно требуется сохранять документы в полном формате, для чего 
      данному атрибуту следует присвоить значение true. В этом случае будут 
      сохраняться все поля документа.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592712
              */
    WriteAllNodes: Bool;

    /**
              * (статья не завершена) 
                          
                      
                      
      Экспериментальный 
      атрибут. Не поддерживается.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592717
              */
    WriteAsync: null;

    /**
              * По умолчанию имеет значение true, что означает, что при 
      сохранении документа будет записываться структура doc_info, содержащее дату 
      создания (из поля creation_date документа), дату изменения (из поля 
      last_mod_date документа), логин пользователя, создавшего документ, логин 
      пользователя, изменившего документ. В отдельных случаях целесообразно 
      присваивать значение false, если происходит массовая обработка документов 
      программным способом, например, при помощи агента.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592570
              */
    WriteDocInfo: Bool;

    /**
              * По умолчанию имеет значение true, которое означает, что 
      документ будет занесен в полнотекстовый индекс при сохранении. Может быть 
      приведен в состояение false, полнотекстовое индексирование по данному документу 
      при этом будет отключено. Это может быть использовано для оптимизации массовой 
      обработки документов, например, в конвертерах.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592716
              */
    WriteFt: null;

    /**
              * По умолчанию имеет значение true, что означает, что сохраняющиеся в 
      XML-документах переносы строк маскируются последовательностью 
      символов '&#10&#13'. Выставлять этот атрибут в значение false имеет 
      смысл, если производится выгрузка (экспорт) документов. В этом случае переносы 
      строк будут выгружаться как есть, без маскировки.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592713
              */
    WriteMaskLineBreaks: Bool;

    /**
              * Преобразует документ (как правило, вновь созданный) в объектный с присвоением 
      нового id (и соответственно url). Устаревший метод. В новой объектной модели 
      используется метод DefaultDb.OpenNewObjectDoc(), который сразу и создает новый 
      объектный документ, и присваивает ему id и url. Также в новой объектной модели 
      используется метод BindToDbObjectType().
              
              * @link http://docs.datex.ru/article.htm?id=5620250451197911719
              */
    BindToDb(arg?: string): undefined;

    /**
              * Преобразует документ (как правило, вновь созданный) в объектный с присвоением 
      нового id (и соответственно url).
              * @example doc = OpenNewDoc( 'x-app://rcr/rcr_candidate.xmd' );
      doc.BindToDbObjectType( 'data', 'candidate' 
      )
              * @link http://docs.datex.ru/article.htm?id=5620276905286592729
              */
    BindToDbObjectType(dbName: String): void;

    /**
              * Запускает выполнение отдельного потока относительно данного документа. 
      В отличие от обычного объекта Thread, этот метод позволяет более удобно 
      работать с потоками. Созданный поток получает документ в качестве базового 
      указателя This. Т.е. можно создать документ с набором полей, содержащих 
      какие-либо методы. На основании этого документа можно запустить поток, который 
      будет видеть по умолчанию все поля этого документа. По завершении потока этот 
      документ автоматически освободится.
              * @example doc = OpenNewDoc( 
      'rcr_publich_vacancy.xmd' );
      doc.EvalThread( 
      'run()' );
       
      Содержимое документа не является thread-safe, 
      поэтому код, вызывающий данную функцию, не должен 
      обращаться к содержимому документа после запуска потока в том 
      случае, если поток изменяет содержимое 
      документа.
              * @link http://docs.datex.ru/article.htm?id=5620276905286592731
              */
    EvalThread(code: String): void;

    /**
              * Находит в документе элемент внешнего хранения с заданным внешним ID. Если 
      элемент не найден, возвращается undefined.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592721
              */
    FindExtDataElemByFieldID(): XmlElem;

    /**
              * Дает сигнал потоку, запущенному через EvalThread() 
      относительно данного документа, прекратить исполнение.
      Вызов данного метода не означает, что поток завершится мгновенно, но 
      как только он дойдет до ближайшей контрольной точки, которая поддерживает 
      ликвидацию потока, исполнение кода этого потока завершится с ошибкой 
      Cancel, т.е. операция отменена пользователем.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592732
              */
    KillActiveThread(): void;

    /**
              * (статья не завершена) 
                          
                      
                      
      
      Экспериментальная функция. Используется для синхронизации документов. 
      Загружает документ сервера приложений.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592727
              */
    LoadFromLds(): SpXml;

    /**
              * (статья не завершена) 
                          
                      
                      
      Устаревший 
      метод.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592730
              */
    MakeReport(): null;

    /**
              * (статья не завершена) 
                          
                      
                      
      
      Экспериментальный метод.
      Принудительно приготавливает предыдущую 
      сохраненную версию документа. Смотри также атрибут LastSavedData.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592726
              */
    PrepareLastSavedData(): void;

    /**
              * Сохраняет документ. Если аргумент не указан, то сохраняет документ под 
      существующим url. Если аргумент указан, устаналиват url 
      документа и сохраняет его.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878750
              */
    Save(docUrl?: String): void;

    /**
              * (статья не завершена) 
                          
                      
                      
      
      Экспериментальный метод.
      Сохраняет документ принудительно на сервере приложений. Используется для 
      синхронизации, когда, например, документ открывается или создается локально, а 
      сохраняется на сервере.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592728
              */
    SaveToLds(): null;

    /**
              * Сохраняет содержимое документа в поток.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592725
              */
    SaveToStream(): void;

    /**
              * Сохраняет содержимое документа под заданным url. Текущий 
      url при этом не изменяется.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592724
              */
    SaveToUrl(destUrl?: String): void;

    /**
              * Добавляет документ в кэш 
      документов.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592722
              */
    SetCached(): void;

    /**
              * Устанавливает флаг модификации документа.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878756
              */
    SetChanged(isChanged?: Bool): void;

    /**
              * Добавляет документ в список документов, чьи имена доступны в глобальном 
      окружении.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592723
              */
    SetShared(): void;

    /**
              * Возвращает элемент документа с полным путем относительно документа.
              * @example doc.SubElem( 
      'person.view.last_state_id' )
              * @link http://docs.datex.ru/article.htm?id=5620276892448878811
              */
    SubElem(path: String): XmlElem;

    /**
              * Если аргумент совпадает с именем корневого элемента, то 
      возвращается корневой элемент. Если аргумент совпадает с именем дочернего 
      элемента, выдается дочерний элемент. Редко используемая функция.
              
              * @link http://docs.datex.ru/article.htm?id=5620276905286592720
              */
    TopOrChildElem(elemName: string): XmlElem;

    /**
              * Вызывает принудительный пересчет всех вычисляемых элементов документа, т.е. 
      тех полей, в описании которых есть атрибут EXPR или EXPR-INIT.
              
              * @link http://docs.datex.ru/article.htm?id=5620276892448878826
              */
    UpdateValues(): void;
}

class spXmlFormElem {
    /**
          * Возвращает значение атрибута DEFAULT, описанного в 
  XMD-форме. Атрибут доступен на запись.
          
          * @link http://docs.datex.ru/article.htm?id=5791375928854454830
          */
    DefaultValue: String;

    /**
              * Экспериментальный атрибут.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454835
              */
    AllowHide: null;

    /**
              * Возвращает значение атрибута COL-ALIGN, описанного 
      в XMD-форме.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454828
              */
    ColAlign: String;

    /**
              * Возвращает значение атрибута COL-TITLE, описанного 
      в XMD-форме.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454827
              */
    ColTitle: String;

    /**
              * Возвращает значение атрибута EXPR, описанного в 
      XMD-форме. Атрибут доступен на запись.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454841
              */
    Expr: String;

    /**
              * Возвращает значение атрибута EXP-MAX-LEN, 
      описанного в XMD-форме.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454831
              */
    ExpMaxLen: Integer;

    /**
              * Возвращает исходное выражение, описанное в атрибуте FOREIGN-ARRAY. Исходное 
      выражение восстанавливается из разобранного выражения, и из-за этого может 
      несущественно отличаться от описанного в атрибуте FOREIGN-ARRAY. Например, 
      могут быть утрачены пробелы и комментарии. Если атрибут FOREIGN-ARRAY в форме 
      элемент не описан, возвращается ошибка. Атрибут доступен на 
      запись.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454829
              */
    ForeignArrayExpr: String;

    /**
              * Возвращает true, если элемент XMD-формы содержит атрибут INDEXED="1", и false 
      в любом другом случае. Атрибут доступен на 
      запись.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454836
              */
    IsIndexed: bool;

    /**
              * Проверяет, является ли текущий элемент методом, или нет. 
      Если является, возвращает true, если нет - false.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454819
              */
    IsMethod: bool;

    /**
              * Проверяет, является ли элемент множественным, т.е. 
      содержит ли XMD-форма атрибут MULTIPLE="1". Если 
      является, возвращает true, если нет - false. Атрибут доступен на 
      запись.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454811
              */
    IsMultiple: bool;

    /**
              * Возвращает значение атрибута EXPR-INIT, описанного 
      в XMD-форме. Атрибут доступен на запись.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454823
              */
    ExprInit: String;

    /**
              * Позволяет установить заначение атрибута FT у элемента 
      XMD-формы. Атрибут доступен только на запись.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454825
              */
    FtUseValue: null;

    /**
              * Возварщает имя элемента, описанное в XMD-форме. Атрибут доступен на запись, 
      но эта возможность, как правило, не используется, т.к. элемент получает имя при 
      создании, и потом нет смысла изменять имя элемента.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454817
              */
    Name: String;

    /**
              * Проверяет, содржит ли текущий элемент XMD-формы атрибут 
      NULL-FALSE="1". 
      Атрибут доступен на запись.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454818
              */
    NullFalse: Bool;

    /**
              * Если это обычный элемент, возващает его тип. А если это метод, то возвращает 
      то, что стоит в поле RESULT-DATA-TYPE.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454833
              */
    ResultDataType: String;

    /**
              * Возвращает исходное выражение, описанное в атрибуте PRIMARY-DISP-NAME.  
      Исходное выражение восстанавливается из разобранного выражения. Если атрибут 
      PRIMARY-DISP-NAME в форме элемент не описан, возвращается undefined.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454814
              */
    OptPrimaryDispName: String;

    /**
              * Возвращает заголовок элемента XMD-формы, который был 
      описан атрибутом TITLE. Атрибут 
      доступен на запись.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454820
              */
    Title: String;

    /**
              * Проверяет, содржит ли текущий элемент XMD-формы атрибут 
      TEMP="1". Атрибут 
      доступен на запись.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454832
              */
    IsTemp: Bool;

    /**
              * Возвращает корневой элемент XMD-формы. Если корневой 
      элемент установить невозможно, возвращается ошибка.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454837
              */
    TopElem: XmlFormElem;

    /**
              * Возвращает тип элемента, который был описан в XMD-форме в атрибуте 
      TYPE.
       
      Типа атрибута
      String
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454816
              */
    Type: null;

    /**
              * Возвращает содержимое текущего элемента, включая дочерние элементы, 
      если они есть, в виде строки в "каноническом" формате XML.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454834
              */
    Xml: String;

    /**
              * Добавляет дочерний элемент и возвращает указатель на него. Используется для 
      динамической генерации форм "на лету". Используется, например, в генераторе 
      отчетов и видов.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454838
              */
    AddChild(name?: String): null;

    /**
              * Проверяет, существует ли дочерний элемент с заданым именем.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454840
              */
    ChildExists(name: String): null;

    /**
              * Возвращает дочерний элемент либо по индексу, либо по имени. Если элемента с 
      заданным именем нет, выдает ошибку.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454812
              */
    Child(arg: Integer): null;

    /**
              * Работает с только с дополнительными 
      атрибутами элемента формы. Выводит значение дополнительного атрибута 
      булевского типа, в том виде, как он был описан в XMD-форме.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454813
              */
    GetBoolAttr(): null;

    /**
              * Используется при динамической генерации форм. Добавляет определенное 
      количество дочерних элементов, описанных в элементе-образце. Выполняет "на лету" 
      действие конструции INHERIT. При этом, 
      если в форме методом Inherit изменяется элемент, от которого наследуются 
      другие элементы при помощи конструкции INHERIT, то изменений 
      в этих наследуемых элементах не происходит.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454842
              */
    Inherit(): null;

    /**
              * В качестве аргумента этот метод принимает такой же 
      элемент типа XmlFormElem, и далее проверяет, является ли текущий элемент его 
      дочерним элементом (через один или несколько уровней), и стоит ли на одном или 
      нескольких уровнях конструкция MULTIPLE. Редко используемый метод.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454822
              */
    IsMultipleRecChild(elem: any): null;

    /**
              * Добавляет к данному элементу дочерние элементы, которые 
      были описаны в виде строки в "каноническом" виде XML.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454854
              */
    LoadChildTags(strXml: any): null;

    /**
              * Возвращает дочерний элемент по имени. Если элемента с заданным именем нет, 
      возвращает undefined.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454877
              */
    OptChild(name: String): null;

    /**
              * Проверяет существует ли вложенный (т.е. ниже лежащий по иерархии 
      относительно текущего элемента) элемент по заданному пути относительно 
      текущего.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454821
              */
    PathExists(path: String): null;

    /**
              * Работает с только с дополнительными 
      атрибутами элемента формы. Выводит значение дополнительного атрибута, в том 
      виде, как он был описан в XMD-форме.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454815
              */
    GetOptAttr(): null;

    /**
              * Возвращает внутренний (т.е. ниже лежащий по иерархии относительно текущего 
      элемента) элемент по заданному пути. Если путь неверный, возвращается 
      ошибка.
              
              * @link http://docs.datex.ru/article.htm?id=5791375928854454824
              */
    EvalPath(path: String): null;
}

class spScreen {
    /**
          * Вызывает стандатрый диалог Windows по выбору файла "сохранить как".
          
          * @link http://docs.datex.ru/article.htm?id=5665465792879477098
          */
    AskFileSave: null;

    /**
              * Возвращает документ, открытый при помощи данного экрана.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477059
              */
    Doc: XmlDoc;

    /**
              * Значение по умолчанию - true. Означает, что документ, открытый в текущем 
      экране можно редактировать. Можно вручную (обычно в BeforeInitAction) поставить 
      значение false, и экран становится недоступным для редактирования, все его 
      элементы становятся доступными только для чтения (read only).
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477064
              */
    EditMode: boolean;

    /**
              * В качестве аргумента передается некоторый элемент экрана, метод пытается 
      найти соответсвующий ему визуальный элемент, высветить его на экране, и 
      поставить на него фокус. Срабатывает не всегда, т.к. не всегда можно найти 
      визуальный элемент, соответствующий элементу экрана. При этом может происходить 
      переход на нужную страницу, скроллинг (если элемент находится где-то внизу 
      страницы), выбор (подсвечивание) элемента. Метод может использоваться при 
      поиске, при действиях, связанных с добавлением чего-либо. 
      Например, это может быть добавление еще одного предыдущего места 
      работы в "кандидате" в E-Staff. При этом удобно, чтобы пользователь сразу 
      перескочил на нужный раздел, а не искал его в "дереве" слева.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477082
              */
    ExposeItemBySource: null;

    /**
     * Элемент (ScreenItem), на который установлен фокуc текущей сессии Windows.
     * @example edit = Screen.FocusItem;
     * @link http://docs.datex.ru/article.htm?id=5665465792879477066
     */
    FocusItem: ScreenItem;

    /**
              * Возвращает имя текущего экрана. Для экранов, в которых открыты объектные 
      документы, имя экрана совпадает с url документа. Для остальных экранов имя может 
      задавтья явно. Обычно имя задается у фрейма (FRAME).
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477058
              */
    FrameName: null;

    /**
              * Устаревший атрибут экрана. Не рекомендуется к 
      использованию.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477062
              */
    HolderElem: null;

    /**
              * Устаревший атрибут экрана. Не рекомендуется к 
      использованию. 
      Обычно одному экрану соответствует один документ. При 
      помощи атрибута LinkedDocs можно на один экран повесить несколько 
      документов.  Это использовалось, например, при inline редактировании 
      карточки события внутри карточки кандидата в E-Staff. В значении атрибута 
      указывается массив документов, который должен редактироваться вместе с основным 
      документом. Смотри также AddLinkedDoc 
      .
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477060
              */
    LinkedDocs: Array<XmlDoc>;

    /**
              * Устаревший атрибут экрана. Не рекомендуется к 
      использованию.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477063
              */
    OptHolderElem: null;

    /**
              * Корневой элемент экрана. Указывается при обращении к 
      различным дочерним элементам экрана.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477057
              */
    Ps: null;

    /**
              * Добавляет к экрану внешний 
      редактор. Экран ведет список текущих открытых редакторов, и по таймеру 
      вызывает для них соответсвующие методы (Check, Init  и др.), которые 
      показывают заваршил внешний редактор свою работу или нет. Для некоторых 
      редкторов невозможно понять, завершили они своюработу или нет. Напрмер, если 
      редактируется картинка, открытая в MS Paint. Если пользователь попытается 
      закрыть текущий экран, прогрмма вызывет соответвтвующий меотд, закрывающий 
      внешний редактор.
              * @example editor = OpenNewDoc( 
      'base1_card_attachment_editor.xmd' ).TopElem;
      editor.init( attachment ); 
      
      screen.AddExternalEditor( editor 
      );
              * @link http://docs.datex.ru/article.htm?id=5665465792879477087
              */
    AddExternalEditor(arg: object): null;

    /**
              * Добавляет ссылку на еще один дополнительный документ, "привязанный" к экрану. 
      Смотри также LinkedDocs.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477072
              */
    AddLinkedDoc(): null;

    /**
     * Выдает стандартный диалог Windows по выбору цвета.
     * @example Screen.AskColor();
     * @link http://docs.datex.ru/article.htm?id=5665465792879477102
     */
    AskColor(): null;

    /**
     * Вызывает стандатрый диалог windows по выбору директории.
     * @example Screen.AskDirectory();
     * @link http://docs.datex.ru/article.htm?id=5665465792879477100
     */
    AskDirectory(): null;

    /**
              * Вызывает стандатрый диалог Windows по выбору директории.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477101
              */
    AskDirectoryPath(): null;

    /**
     * Вызывает меню открытия файла. Возвращает url открытого файла.
     * @example fileUrl = Screen.AskFileOpen();
     * @link http://docs.datex.ru/article.htm?id=5665465792879477096
     */
    AskFileOpen(): null;

    /**
              * Вызывает стандатрый диалог Windows по выбору сразу нескольких файлов.
              * @example fileList = Screen.AskFilesOpen( '', 
      lib_base.all_files_suffix_pattern );
              * @link http://docs.datex.ru/article.htm?id=5665465792879477097
              */
    AskFilesOpen(): null;

    /**
     * Выдает стандартный диалог Windows по выбору шрифта.
     * @example Screen.AskFont();
     * @link http://docs.datex.ru/article.htm?id=5665465792879477103
     */
    AskFont(): null;

    /**
              * Вызывает перемещение текущего окна "на верх" по отношению к другим открытым 
      окнам. Так же разворачивает окно, если оно было свернуто. Редко 
      используемый метод. Как правило, исползуется функция ObtainDocScreen. Смотри 
      также SetWindowTopmost.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477092
              */
    BringWindowToFront(): null;

    /**
              * Вызывает проверку правописания с использованием Microsoft Word в текущем 
      экране. Метод "вываливает" содержимое экрана в файл Microsoft Word и запускает 
      проверку правописания. Метод имеет некоторые недостатки: затруднен процесс 
      обратного исправления текста, не работает для элементов типа HYPER.
              * @example Screen.CheckSpelling()
              * @link http://docs.datex.ru/article.htm?id=5665465792879477108
              */
    CheckSpelling(): null;

    /**
              * Закрывает экран.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477075
              */
    Close(): null;

    /**
              * Ищет элемент экрана по типу. Если элементов одного типа 
      несколько, возващает первый.  Если не находит, возвращает исключение. 
      Смотри также FindOptItemByType.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477079
              */
    FindItemByType(str: string): null;

    /**
              * Находит экранный элемент по имени. Редко используемый метод.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477078
              */
    FindItemRec(name: string): null;

    /**
              * Ищет по имени экранный элемент внутри текущего экрана. Если не находит, 
      возварщает indefined.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477077
              */
    FindOptItem(name: string): null;

    /**
              * Ищет элемент экрана по типу. Если элементов одного типа несколько, возващает 
      первый. Если не находит, возвращает "undefined". Смотри также FindItemByType.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477080
              */
    FindOptItemByType(type: string): null;

    /**
              * Вызывает стандатрое уведомление Windows пользователю о том, что что-то 
      случилось. Вызывает мерацание окна в Панели задач (TaskBar). Не рекомендуется к 
      использованию, т.к. под Windows 7 этого мерцания уже невидно.
              * @example ActiveScreen.FlashWindow();
              * @link http://docs.datex.ru/article.htm?id=5665465792879477090
              */
    FlashWindow(): null;

    /**
              * Выдает стандартный диалог Windows с сообщением относительно текущего 
      экрана.
              * @example Screen.MsgBox( 
      UiText.messages.operation_will_be_cancelled, UiText.messages.warning_msg_title, 
      'question', 'yes,no' );
      Screen.MsgBox( 
      UiText.messages.changes_require_server_restart, UiText.messages.info_msg_title, 
      'info' );
              * @link http://docs.datex.ru/article.htm?id=5665465792879477093
              */
    MsgBox(txt: string): null;

    /**
              * Вызывает модальный диалог относительно текущего экрана. Ему в качестве 
      аргумента передается документ, отрытый или созданный, с содержимым 
      модального диалога.
              * @example ActiveScreen.ModalDlg( dlgDoc 
      );
              * @link http://docs.datex.ru/article.htm?id=5665465792879477095
              */
    ModalDlg(doc: XmlDoc): null;

    /**
              * Вызывает загрузку в экран другого документа или другого 
      объекта. Редко используемый метод. Основное его применение - в главном окне 
      программы из дерева слева можно сделать Navigate во фрейм справа.  Обычно 
      делается Navigate именно на фрейм.
              * @example ActiveScreen.Navigate( lib_view.obtain_view_url( 
      'events_reminder' ), 'FrameReminder', true );
              * @link http://docs.datex.ru/article.htm?id=5665465792879477070
              */
    Navigate(url: boolean): null;

    /**
              * Вызывает печать текущего экрана. Редко используемый метод.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477104
              */
    Print(): null;

    /**
              * Удаляет из формы один из "дополнительных" документов, указанных при 
      помощи атрибута LinkedDocs по 
      его url.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477073
              */
    RemoveLinkedDocByUrl(url: string): null;

    /**
              * Выполняет принудительный вызов указанной 
      команды.
              * @example Screen.RunCommand( 'RunSearch' )
      Screen.RunCommand( 'RunSearchNext' 
      )
              * @link http://docs.datex.ru/article.htm?id=5665465792879477088
              */
    RunCommand(): null;

    /**
              * Вызывает принудительно выполнение команды в паралльлельном поттока. См. также 
      RunSearch и 
      RunSearchNext.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477089
              */
    RunCommandAsync(comm: string): null;

    /**
              * Вызывает сохранение текущего документа в экране. При этом у этого 
      документа сбрасывается флажок "сhanged".
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477074
              */
    SaveDoc(): null;

    /**
              * В явном виде устанавливает документ для экрана. Используется в редких 
      случаях, когда документ создается отдельно, экран открывается отдельно, а потом 
      экрану "подсовывается" документ. Смотри также Navigate.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477071
              */
    SetDoc(doc?: string): null;

    /**
              * Вызывает подсветку последующего вхождения текста. 
      Экранный аналог FindNext. Работает не всегда хорошо, т.к. не всегда по элементу 
      данных можно определить соответсвующий элемент экранной формы. Не вызывает 
      пользовательского диалога. Смотри также RunSearchNext.
              * @example screen.SetInitSearch( Ps.filter.fulltext 
      );
              * @link http://docs.datex.ru/article.htm?id=5665465792879477107
              */
    SetInitSearch(str: string): null;

    /**
              * Устанавливает некоторое действие, которое будет для данного экрана 
      выполняться через заданное количество миллисекунд. Не приводит к блокировке 
      выполнения потока, вызвавшего данный метод (в отличие от функции Sleep). Обычно 
      используется в атибутах INIT-ACTION и BEFORE-INIT-ACTION. 
      Не следует вызвать с использованием этого метода функций alert или MessageBox, 
      т.к. это может привести к каскадированию модальных окон.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477086
              */
    SetTimer(str: Integer): null;

    /**
              * Вызывает перемещение текущего окна "на верх" по отношению к другим 
      открытым окнам. Редко используемый метод. Как правило, исползуется функция 
      ObtainDocScreen. Смотри также BringWindowToFront.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477091
              */
    SetWindowTopmost(): null;

    /**
              * Выдвает стандартное сообщение о некой ошибке. В качестве аргемента передается 
      сам объект, выдавший ошибку.
              * @example Screen.ShowErrorMsg( 
      ListElem.result.error_ref.Object );
              * @link http://docs.datex.ru/article.htm?id=5665465792879477094
              */
    ShowErrorMsg(object: any): null;

    /**
              * Вызывает перерисовку экрана сразу. Этот метод не следует вызвать из 
      другого потока, он сработает не безопасно. Смотри также UpdateAcync.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477083
              */
    Update(): null;

    /**
              * Вызывает перерисовку экрана, только не сразу, а при следующем 
      интерфейсном событии. Этот метод можно вызвать из другого потока, он безопасно 
      отработает. Смотри также Update.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477084
              */
    UpdateAsync(): null;

    /**
              * Вызывает обновление (перерисовку) экрана, за исключением того элемента, 
      наименование которого передан в качестве аргумента. Позволяет перерисовать весь 
      экран, не перерисовывая его самый сложный элемент, обычно LIST. Это применяется 
      для оптимизации работы программы.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477085
              */
    UpdateExcpt(str: String): null;

    /**
              * Возвращает размер клиентской области окна (ширину окна) в пикселях. 
      Редко использумый метод.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477068
              */
    WindowClientWidth(): null;
}

class spScreenItem {
    /**
          * Работает только для элементов типа SELECTOR, и 
  возвращает элемент,  который в этот SELECTOR сейчас 
  загружен.
          
          * @link http://docs.datex.ru/article.htm?id=5665465792879477024
          */
    ActiveElem: ScreenItem;

    /**
              * Возвращает объект, содрежащий экранное окружение для данного элемента. 
      Экранное окружение содрежит переменные всех LOOP, внутри которых 
      данный элемент не находится. Используется, например,  для определения, к 
      какому элементу относится выделенная строка в списке.
              * @example curElem = 
      List.SelRow.Env.ListElem;
              * @link http://docs.datex.ru/article.htm?id=5665465792879477019
              */
    Env: null;

    /**
              * Узкоспециализированный, редко используемый атрибут. 
      Возвращает true, если у экранного элемента в форме 
      описаны CHECK-VALUE-ACTION или SET-VALUE-ACTION, и false, если 
      нет. Используется для построения сложных элементов управления, например 
      object_selector, где нужно решить, делать или не делать обновление экрана.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477013
              */
    HasSetValueAction: boolean;

    /**
              * Возвращает url картинки, определенной в том или ином элементе экрана.
              * @example <ROW IMAGE-URL-EXPR="ListElem.ImageUrl" 
      DELETE-ACTION="">
              * @link http://docs.datex.ru/article.htm?id=5665465792879477011
              */
    ImageUrl: string;

    /**
              * Возвращает true, если ENABLE-EXPR 
      возрващает true, и false - если нет. Если атрибута ENABLE-EXPR нет у 
      данного элемента, то IsEnabled всегда возвращает true.
              * @example <EDIT SOURCE="Ps" 
      ENABLE-EXPR="GetSampleItem().IsEnabled" DIR-PATH="1"/>
       <EDIT SOURCE="Ps.length" WIDTH="6zr" 
      UPDATE-ACTION="   Parent.ExecUpdateAction(); " 
      ENABLE-EXPR="Parent.IsEnabled"/>
              * @link http://docs.datex.ru/article.htm?id=5665465792879477016
              */
    IsEnabled: boolean;

    /**
              * Работает только для элемента типа LOOP, и возвращает 
      массив элементов, который используется для организации цикла. Массив, который 
      вычисляется в атрибуте EXPR.
       
      Тип атирбута:
      Array
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477022
              */
    LoopArray: null;

    /**
              * Возваращает имя (NAME) элемента.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477007
              */
    Name: null;

    /**
              * Родительский элемент данного элемента экрана.
       
      объект ScreenItem или
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477009
              */
    Parent: ScreenItem | Screen;

    /**
              * Возвращает корневой объект элемента экрана.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477005
              */
    Ps: null;

    /**
              * Узкоспециализированный, редко используемый атрибут.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477014
              */
    PsStrict: null;

    /**
              * Возвращает экран, к которому относится данный элемент.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477008
              */
    Screen: Screen;

    /**
              * Возвращает источник (SOURCE) 
      элемента.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477012
              */
    Source: null;

    /**
              * Возвращает заголовок (LABEL-TITLE или 
      LABEL-TITLE-EXPR) 
      элемента.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477010
              */
    Title: null;

    /**
              * Возваращает тип (TYPE) 
      элемента.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477006
              */
    Type: null;

    /**
              * Вызывает принудительное выполнение кода, описанного у элемента в 
      атрибуте UPDATE-ACTION.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477038
              */
    ExecUpdateAction(): null;

    /**
              * Находит вышестоящий элемент (любого уровня) с заданным типом. Если такого 
      элемента нет - возвращется undefined.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477034
              */
    FindOptUpperItemByType(strType: String): ScreenItem;

    /**
              * Возвращает подчиненный элемент (любого уровня вложенности) с указанным 
      именем. Если элемент не найден - возвращается ошибка.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477030
              */
    FindSubItem(itemName: String): ScreenItem;

    /**
              * Экспериментальный метод.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477033
              */
    FindSubItemByKey(): null;

    /**
              * Возвращает подчиненный элемент (любого уровня вложенности) с указанным 
      значением атрибута SOURCE. Если элемент 
      не найден - возвращается ошибка.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477032
              */
    FindSubItemBySource(strSoure: String): SpXml;

    /**
              * Возвращает подчиненный элемент (любого уровня вложенности) с указанным типом. 
      Если элемент не найден - возвращается ошибка.
              * @example label = GetSampleItem().FindSubItemByType( 'LABEL' 
      );
              * @link http://docs.datex.ru/article.htm?id=5665465792879477031
              */
    FindSubItemByType(strType: String): ScreenItem;

    /**
              * Работает только у элементов типа HYPER, осуществляет 
      вставку заданной строки текста в текущую позицию курсора.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477042
              */
    InsertHtml(str: String): null;

    /**
              * Работает только у элементов типа EDIT, осуществляет 
      вставку заданной строки текста в текущую позицию курсора.
              * @link http://docs.datex.ru/article.htm?id=5665465792879477041
              */
    InsertText(strTxt: String): null;

    /**
              * Возвращает true, если у элмента PASSIVE="1", и false 
      - если нет. Если атрибута PASSIVE нет у данного 
      элемента, то IsPassive  возвращает true.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477018
              */
    IsPassive(): boolean;

    /**
              * Возвращает true, если  READ-ONLY  или 
      READ-ONLY-EXPR возрващает 
      true, и false - если нет. Если атрибутов READ-ONLY и READ-ONLY-EXPR  нет 
      у данного элемента, то IsReadOnly всегда возвращает true.
              * @link http://docs.datex.ru/article.htm?id=5665465792879477017
              */
    IsReadOnly(): boolean;

    /**
              * Экспериментальный метод.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477035
              */
    MakeReport(): null;

    /**
              * Работает только для элемента типа EDIT с атибутом 
      RICH-EDIT, 
      устанавливает флаг измененности.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477036
              */
    SetChanged(isChanged: boolean): null;

    /**
              * Устанавливает экранный фокус на данный элемент экрана. Работает на тех 
      элементах, на которые можно ставить фокус.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477029
              */
    SetFocus(): null;

    /**
              * Вызывает изменение значение источника (SOURCE) у 
      элемента.
              * @example GetSampleItem().SetSourceValue( newValue 
      );
              * @link http://docs.datex.ru/article.htm?id=5665465792879477037
              */
    SetSourceValue(newValue: any): null;

    /**
              * Экспериментальный метод.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477040
              */
    UpdateStyle(): null;

    /**
              * Экспериментальный метод.
              
              * @link http://docs.datex.ru/article.htm?id=5665465792879477039
              */
    UpdateText(): null;
}

class Request {
    /**
      * Экспериментальный атрибут. Возвращает массив стандартный объектов типа Object, содержащий копии данных всех действующих web-сессий (объектов Session). Копируются только поля, содержащие скалярные значения, поля, содержащие объекты, копируются как undefined.
      
      * @link http://docs.datex.ru/article.htm?id=5791375928854454789
      */
    AllSessions: Array<any>;

    /**
          * Возвращает логин пользователя авторизованного 
      запроса. Если запрос не авторизованный, или атрибут вызывается до 
      авторизации, возвращается пустая строка.
          
          * @link http://docs.datex.ru/article.htm?id=5665465792879477244
          */
    AuthLogin: String;

    /**
          * Возвращает объект, соответствующий пользователю авторизованного запроса от клиентской части (SpXml.exe).
          
          * @link http://docs.datex.ru/article.htm?id=5791375928854454785
          */
    AuthObject: XmlElem;

    /**
          * Возвращает пароль пользователя авторизованного запроса (для 
      basic-авторизации). Если запрос не авторизованный, или атрибут 
      вызывается до авторизации, или используется метод авторизации без передачи 
      пароля в открытом виде, возвращается пустая строка.
          
          * @link http://docs.datex.ru/article.htm?id=5665465792879477245
          */
    AuthPassword: String;

    /**
          * Возвращает ID пользователя авторизованного запроса. Для запросов от клиентской части (SpXml.exe) переменная устанавливается автоматически исходя из результата вызова OnCheckAuth(). Для запросов к Web-страницы переменная может быть установлена вручную авторизационным кодом Web-страницы. При сохранении на сервере документа, содержащего элемент, содержимое переменной автоматически записывается в поля creation.user_id и modification.user_id структуры doc_info, если такие поля присутствуют в документе.
          
          * @link http://docs.datex.ru/article.htm?id=5665465792879477247
          */
    AuthUserID: Integer;

    /**
          * Возвращает тело HTTP-запроса в виде строки.
          
          * @link http://docs.datex.ru/article.htm?id=5665465792879477239
          */
    Body: String;

    /**
          * Возвращает содержимое web-формы запроса, передаваемого через метод POST, разобранное по полям, в виде стандартного объекта javascript Object. Если запрос не содержит web-форму, атрибут возвращает ошибку.
          
          * @link http://docs.datex.ru/article.htm?id=5665465792879477240
          */
    Form: Object;

    /**
          * Возвращает список полей заголовка HTTP-запроса в виде стандартного объекта javascript Object.
          
          * @link http://docs.datex.ru/article.htm?id=5791375928854454786
          */
    Header: Object;

    /**
          * Возвращает метод ('GET' или 'POST') текущего 
      HTTP-запроса.
          
          * @link http://docs.datex.ru/article.htm?id=5665465792879477234
          */
    Method: String;

    /**
          * Возвращает стандартный объект javascript Object, содержащий 
      объединенный набор полей из атрибутов Form и QueryString.
          
          * @link http://docs.datex.ru/article.htm?id=5665465792879477242
          */
    Query: Object;

    /**
          * Возвращает содержимое строки параметров url запроса, разобранное по полям, в виде стандартного объекта javascript Object. Если url не содержит параметров, возвращаемый пустой объект.
          
          * @link http://docs.datex.ru/article.htm?id=5665465792879477241
          */
    QueryString: Object;

    /**
          * Возвращает IP адрес, с которого отправлен запрос, в виде 
      строки.
          
          * @link http://docs.datex.ru/article.htm?id=5665465792879477243
          */
    RemoteIP: String;

    /**
          * Более современный эквивалент атрибута ContentType объекта 
      Response.
      Атрибут доступен как на чтение так и на запись. Содержит значение заголовка 
      "Content-Type" ответа на текущий запрос. HTTP. Если заголовок уже был 
      отправлен, попытка изменения атрибута возвращает ошибку.
          
          * @link http://docs.datex.ru/article.htm?id=5791375928854454801
          */
    RespContentType: String;

    /**
          * Возвращает объект типа Stream, в который 
      можно писать данные ответа HTTP. Если заголовок ответа еще не был отправлен 
      к моменту первого обращения к атрибуту, отправляется ответ HTTP 
      200.
          
          * @link http://docs.datex.ru/article.htm?id=5791375928854454787
          */
    RespStream: Stream;

    /**
          * Возвращает объект Session, привязанный к текущему 
      запросу. Если в коде Web-страницы объект Session доступен через глобальную 
      переменную с таким же именем, то, например, внутри OnWebRequest() единственный 
      способ получить ссылку на этот объект - это обратиться 
      через Request.Session
          
          * @link http://docs.datex.ru/article.htm?id=5791375928854454788
          */
    Session: Session;

    /**
          * Возвращает запрашиваемый url текущего 
      HTTP-запроса.
          
          * @link http://docs.datex.ru/article.htm?id=5665465792879477235
          */
    Url: String;

    /**
          * Возвращает хост (адрес сервера и, если есть - порт) запрашиваемого 
      url текущего HTTP-запроса.
       
      Данный атрибут доступен также на запись, что используется, как 
      правило, внутри вызова OnWebRequest() для 
      внутреннего перенаправления старых url на новые.
          
          * @link http://docs.datex.ru/article.htm?id=5665465792879477236
          */
    UrlHost: String;

    /**
          * Возвращает строку параметров 
      (param1=value1&param2=value2&...) запрашиваемого url текущего 
      HTTP-запроса.     
       
      Данный атрибут доступен также на запись, что используется, как 
      правило, внутри вызова OnWebRequest() для 
      внутреннего перенаправления старых url на новые.
          
          * @link http://docs.datex.ru/article.htm?id=5665465792879477238
          */
    UrlParam: String;

    /**
          * Возвращает путь запрашиваемого url текущего HTTP-запроса.
       
      Данный атрибут доступен также на запись, что используется, как 
      правило, внутри вызова OnWebRequest() для 
      внутреннего перенаправления старых url на новые.
          
          * @link http://docs.datex.ru/article.htm?id=5665465792879477237
          */
    UrlPath: String;

    /**
          * Добавляет или заменяет поле заголовка HTTP-ответа.
      Если заголовок уже был отправлен, метод возвращает ошибку.
          
          * @link http://docs.datex.ru/article.htm?id=5791375928854454790
          */
    AddRespHeader(fieldName?: Boolean): void;

    /**
          * Вызывает проверку авторизации запроса по стандартному методу авторизации для 
      рабочего места (через вызов OnCheckAuth).
          
          * @link http://docs.datex.ru/article.htm?id=5791375928854454878
          */
    CheckLdsAuth(): void;

    /**
          * Выполняет код указанного фрагмента Web-страницы с записью результата в 
      текущий HTTP-ответ. Метод используется для включений фрагментов, общих для 
      различных видов страниц.
          
          * @link http://docs.datex.ru/article.htm?id=5791375928854454792
          */
    Execute(path: any): void;

    /**
          * Вызывает отправку статуса HTTP 404 "Not found" (объект не найден).
      Если заголовок уже был отправлен, метод возвращает ошибку.
          
          * @link http://docs.datex.ru/article.htm?id=5791375928854454797
          */
    HandleNotFound(): void;

    /**
          * Вызывает отправку статуса HTTP 301 "Object Moved" (постоянное 
      перенаправление).
      Если заголовок уже был отправлен, метод возвращает ошибку.
          
          * @link http://docs.datex.ru/article.htm?id=5791375928854454796
          */
    PermanentRedirect(redirectUrl: String): void;

    /**
          * Вызывает отправку статуса HTTP 302 "Object Moved" (перенаправление).
      Если заголовок уже был отправлен, метод возвращает ошибку.
          
          * @link http://docs.datex.ru/article.htm?id=5791375928854454795
          */
    Redirect(redirectUrl: String): void;

    /**
          * Возвращает статус HTTP-ответа.
      Если заголовок уже был отправлен, метод возвращает ошибку.
          * @example Request.SetRespStatus( 500, 
      'Invalid server state' );
          * @link http://docs.datex.ru/article.htm?id=5791375928854454791
          */
    SetRespStatus(statusCode: String): void;

    /**
          * Используется для проверки авторизации внутри Web-страницы. Вызывает отправку статуса HTTP 401 "Authorization required". Код Web-страницы обычно вызывает данный метод, если Request.AuthLogin возвращает пустую строку, либо указаны неверные авторизационные данные. Если заголовок уже был отправлен, метод возвращает ошибку.
          
          * @link http://docs.datex.ru/article.htm?id=5791375928854454798
          */
    SetWrongAuth(options: String): void;
}

class wttools {
    /**
     * Получение адреса сервера WebTutor
     * Входные параметры нет.
     * @return адрес сервера WebTutor (строка).
     * @example tools.lds_address
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    lds_address?(): String;
    /**
     * Загрузка курса из архива в базу. Курс создается если его нет или обновляется существующий.
     * Входные параметры:
     * @param fileUrl (string) адрес до файла (архива) с курсом;
     * @param sFileCharsetParam (string) необязательный кодировка (по умолчанию utf-8);
     * @param docCourseParam (Doc) необязательный Doc документ курса.
     * @return документ загруженного курса. Если загрузка не удалась, вернет строку с описанием ошибки.
     * @example tools.load_course( TopElem.file_import, TopElem.file_charset, docCourseParam );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    load_course?(
        fileUrl: String,
        sFileCharsetParam?: String,
        docCourseParam?: XmlDoc
    ): void;
    /**
     * Копирует ресурсы из указанного в файле manifest списка в папку получатель.
     * Входные параметры:
     * @param fileUrl (string) адрес до файла manifest;
     * @param baseUrl (string) адрес до папки получателя относительно wt/web ;
     * @return нет.
     * @example tools.copy_manifest_resources( TopElem.file_import, teCourse.base_url );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    copy_manifest_resources?(fileUrl: String, baseUrl: String): void;
    /**
     * Обновляет данные о количестве дочерних элементов в родительском форуме. Если задан iNewForumIDParam, то дочерним записям форума с iParentForumEntryIDParam,  проставляется новое значение форума.
     * Входные параметры:
     * @param doc (Doc) необязательный, если задан iParentForumEntryIDParam Doc записи форума, родителя которого нужно обновить;
     * @param iNewForumIDParam (int) необязательный ID форума, к которому нужно привязать элементы ;
     * @param iParentForumEntryIDParam (int) необязательный, если задан doc ID родительской записи форума.
     * @return целое число (int), количество дочерних элементов вниз по иерархии в документе определяемом iParentForumEntryIDParam.
     * @example
     * tools.update_forum_entry( null, null, iParentForumEntryID );
     * tools.update_forum_entry( TopElem.Doc, TopElem.forum_id );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    update_forum_entry?(
        doc?: XmlDoc,
        iNewForumIDParam?: Integer,
        iParentForumEntryIDParam?: Integer
    ): Integer;
    /**
     * Обновляет данные о количестве дочерних элементов в родительском комментарии к разделу портала. Если задан iNewPortalDocIDParam, то дочерним записям,  проставляется новое значение документа портала, к которому они привязаны.
     * Входные параметры:
     * @param doc (Doc)  Doc документ записи комментария к разделу портала, родителя которого нужно обновить;
     * @param iNewPortalDocIDParam (int) необязательный– ID раздела портала к которому нужно привязать дочерние комментарии.
     * @return целое число (int), количество дочерних элементов вниз по иерархии в определяемом doc.
     * @example
     * tools.update_document_comment_entry( TopElem.Doc, TopElem.portal_doc_id );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    update_document_comment_entry?(
        doc: XmlDoc,
        iNewPortalDocIDParam?: Integer
    ): Integer;
    /**
     * Добавляет строку к событию базы, определяемому _report_id или документом _source_doc.
     * Входные параметры:
     * @param _report_id (int) необязательный, если задан _source_doc ID события базы, к которому нужно добавить строку.
     * @param _str (string) строка, которую нужно добавить к событию базы.
     * @param _source_doc (Doc) необязательный, если задан _report_id - Doc документ события базы, к которому нужно добавить строку.
     * @return сохраненный документ (Doc)  события базы с добавленной строкой.
     * @example
     * docReport = tools.add_report( docReport.DocID, 'Execution start...', docReport );
     * tools.add_report( _report_id, 'Saving archive: OK.' );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    add_report?(_report_id?: Integer, _str: String, _source_doc?: XmlDoc): XmlDoc;
    /**
     * Загрузка данных на сервер обмена данными.
     * Входные параметры:
     * @param _server_id (int) ID сервера обмена данными, на который нужно отправить данные.
     * @param _date (date) необязательный дата, начиная с которой нужно грузить данные.
     * @param _type (string) необязательный описание типа отправки.
     * @return строка с ошибкой или пустая строка в случае успеха (string).
     * @example
     *             _str = tools.upload_data( curExchangeServerID, tools.get_exchange_date( serverDoc.TopElem.upload, serverDoc.TopElem.last_upload_date ), 'quick' );
     *             _str = tools.upload_data( curExchangeServerID, '', 'full' );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    upload_data?(_server_id: Integer, _date?: Date, _type?: String): String;
    /**
     * Получение данных с сервера обмена данными.
     * Входные параметры:
     * @param _server_id (int) ID сервера обмена данными, с которого нужно получить данные.
     * @return строка с ошибкой или пустая строка в случае успеха (string).
     * @example
     *             _str = tools.download_data( _exchange_server_id );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    download_data?(_server_id: Integer): String;
    /**
     * Создание пакета данных для отправки на сервер обмена данными.
     * Входные параметры:
     * @param _server_id (int) ID сервера обмена данными, для которого формируется пакет.
     * @param _report_id (int) ID документа событий базы, в который будут записываться отчет.
     * @param sPackIDParam (string) строка с ID загружаемого пакета.
     * @param _date (date) необязательный дата, начиная с которой нужно грузить данные.
     * @return строка с адресом до сформированного пакета(string).
     * @example
     *             _filename = ServerEval( 'tools.create_data_package(' + curExchangeServerID + ',' + _report_id + ',' + _package_id + ',\'\')');
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    create_data_package?(
        _server_id: Integer,
        _report_id: Integer,
        sPackIDParam: String,
        _date?: Date
    ): String;
    /**
     * Возвращает последнюю дату обмена данными (отправки или получения) для указанного сервера обмена данными.
     * Входные параметры:
     * @param _source (xml element) xml элемент, в котором храниться дата (download, upload) .
     * @param _date (date) дата последней отправки .
     * @return дата последнего обмена (date).
     * @example
     * _exa2wx5nutv7 = tools.get_exchange_date( curServerDoc.download, curServerDoc.last_download_date );
     * _exa2wx5nutv7 = tools.get_exchange_date( curServerDoc.upload, curServerDoc.last_upload_date );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_exchange_date?(_source: XmlDoc, _date: Date): Date;
    /**
     * Разворачивает базу данных XML из backup файла.
     * Входные параметры:
     * @param _backup_file (string) путь до файла с _backup_file относительно папки сервера WebTutor .
     * @return число с результатом выполнения (int). Если больше 0, значит возникла ошибка.
     * @example
     * tools.recovery_process( \'' + StrReplace( _filepath, '\\', '\\\\' ) + '\' )
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    recovery_process?(_backup_file: String): Integer;
    /**
     * Сохраняет базу данных XML в backup файл.
     * Входные параметры:
     * @param _backup_file (string) путь до файла с _backup_file относительно папки сервера WebTutor .
     * @return число с результатом выполнения (int). Если больше 0, значит возникла ошибка.
     * @example
     * _res = tools.backup_process( \'' + _backup_file + '\' );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    backup_process?(_backup_file: String): Integer;
    /**
     * Сохраняет базу данных XML в backup файл. Обновляет дату последнего backup в настройках системы.
     * Входные параметры нет.
     * @return строка до файла с архивом.
     * @example
     * _str = tools.backup_data();
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    backup_data?(): any;
    /**
     * Создает для базы данных XML backup файл и отправляет его на сервер.
     * Входные параметры:
     * @param _server_id (int) ID сервера обмена данными, на который отправляется файл.
     * @return нет.
     * @example
     *             _str = tools.send_backup_data( curExchangeServerID );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    send_backup_data?(_server_id: Integer): void;
    /**
     * Отправляет файл на указанный сервер обмена данными. Отправление идет как письмо по протоколу Smtp. Поэтому возможно указать тему и тело сообщения.
     * Входные параметры:
     * @param _subject (string) строка с темой отправляемого сообщения.
     * @param _body(string) строка с телом отправляемого сообщения.
     * @param _send_file (string) строка с адресом до отправляемого файла.
     * @param _server_id (int) ID сервера обмена данными, для которого формируется пакет.
     * @param _report_id (int) ID документа событий базы, в который будут записываться отчет.
     * @return строка с адресом до сформированного пакета(string).
     * @example
     *             tools.send_file_to_server(\'data [' + _server_doc.code + ']' + ( _type == 'full' ? ' - full' : '' ) + '\', \'ID: ' + _package_id + '\', \'' + _filename + '\', ' + _server_id + ', ' + _report_id + ');
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    send_file_to_server?(
        _subject: String,
        _body: String,
        _send_file: String,
        _server_id: Integer,
        _report_id: Integer
    ): String;
    /**
     * Отправляет файл на указанный сервер обмена данными. Отправление идет Post по http протоколу.
     * Входные параметры:
     * @param _send_file (string) строка с адресом до отправляемого файла.
     * @param _server_id (int) ID сервера обмена данными, для которого формируется пакет.
     * @param _report_id (int) ID документа событий базы, в который будут записываться отчет.
     * @return нет.
     * @example
     *             tools.post_file_to_server(\'' + _filename + '\', ' + _server_id + ', ' + _report_id + ' );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    post_file_to_server?(
        _send_file: String,
        _server_id: Integer,
        _report_id: Integer
    ): void;
    /**
     * Преобразует дату в строку разделенную символом _. Например дата 01.02.1999 12:34:15 будет преобразована в 1999_02_01_12_23.
     * Входные параметры:
     * @param _cur_date (date)  необязательный  дата которую нужно преобразовать, если не указан, то будет преобразовываться текущая дата и время.
     * @return дата преобразованная в строку (string).
     * @example
     *             _pak_name = 'update_' + tools.date_str() + '_' + _cur_id + '.zip';
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    date_str?(_cur_date?: Date): String;
    /**
     * Возвращает  строку с названием всех файлов с расширением zip из указной папки. Строка это разделенные символом | названия фалов. Название это разделённые символом ; дата, тип, размер и название файла.
     * Входные параметры:
     * @param _dir (string)  адрес до папки.
     * @return строка (string).
     * @example
     *             ServerEval( 'tools.fill_backup_files_list( \'' + ( Ps.recovery_dir == '' ? 'x-local://backup_data/' : Ps.recovery_dir ) + '\' )' )
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    fill_backup_files_list?(_dir: String): String;
    /**
     * Возвращает  ошибку формы, переданной как параметр.
     * Входные параметры:
     * @param _param_form (Doc)  Doc формы, из которой нужно взять ошибку.
     * @return строка с описанием ошибки(string).
     * @example
     * errorText = tools.get_param_error_text( paramForm );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_param_error_text?(_param_form: XmlDoc): String;
    /**
     * Загружает пакеты с указанного сервера обмена данными с указанного расположения
     * Входные параметры:
     * @param _server_id (int) необязательный (если не указан, считается, что сервер локальный) ID сервера обмена данным, к которого загружаются пакеты.
     * @param _package_id (int) ID пакета, который нужно загрузить.
     * @param _temp_url (string) путь до файла с пакетом.
     * @return строка с локальным адресом до пакета (string).
     * @example
     *             tools.download_package( ' + Ps.exchange_server_id + ', ' + Ps.Doc.DocID + ' );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    download_package_list?(
        _server_id?: Integer,
        _package_id: Integer,
        _temp_url: String
    ): String;
    /**
     * Обрабатывает пакет с данными и загружает содержимое в базу данных.
     * Входные параметры:
     * @param _path (string) путь до файла с пакетом.
     * @param _type (string) тип загрузки. Возможный значения:
     * objects и std_objects загружает объекты  в базу. std_objects применяется для загрузки стандартных объектов из первоначальной установки.
     * code_update выгружает файлы из архива в папку wtv сервера WebTutor.
     * web выгружает файлы из архива в папку wt/web сервера WebTutor.
     * @param _source (Xml document) необязательный (если не указан, то берутся все типы объектов в системе) источник данных о типах загружаемых объектов, и других параметров загрузки объектов.
     * @param _report_id (int) ID документа событий базы, в который будут записываться отчет.
     * @param _exchange_server_id (int) необязательный ID сервера обмена данным, из которого берутся параметры для фильтрации данных из пакета.
     * @param iDownloadPackageIDParam (int) необязательный ID пакета, из которого нужно загрузить данные.
     * @return успешная или не успешная загрузка данных (bool). В случае типа объектов objects и std_objects. Возвращается форма открытого документа пакета.
     * @example
     *             common_variables.len_flag = ( tools.package_process( \'' + Ps.local_file_url + '\', \'' + Ps.type + '\', \'' + Ps.Doc.DocID + '\' ) != null );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    package_process?(
        _path: String,
        _type: String,
        _source?: XmlDoc,
        _report_id: Integer,
        _exchange_server_id?: Integer,
        iDownloadPackageIDParam?: Integer
    ): Bool;
    /**
     * Загружает пакет с данными с указного сервера обмена. После загрузки пакет обрабатывается функций tools.package_process и данные попадают в базу. Загрузка происходит по протоколу http.
     * Входные параметры:
     * @param _server_id (int) ID сервера обмена данными, с которого скачивается пакет.
     * @param _report_id (int) ID документа событий базы, в который будут записываться отчет.
     * @return строка с адресом до загруженного пакета(string).
     * @example
     *             ServerEval( 'tools.download_data_package(' + _server_id + ',' + _report_id + ')' );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    download_data_package?(_server_id: Integer, _report_id: Integer): String;
    /**
     * Назначает курс сотруднику.
     * Входные параметры:
     * @param oPersonID структура параметров. В простейшем случае это ID сотрудника, которому назначается курс. Но может быть объектом со следящими полями.
     *
     * iPersonID (int) обязательный, если передается структура -  ID сотрудника, которому назначается курс.
     *
     * iCourseID (int) обязательный, если передается структура ID курса, который необходимо назначить.
     *
     * sEID (string) необязательный - код записи в каталоге active_learnings. Если он указан, то при назначении курса, когда производится проверка на уже существующий активный курс данного сотрудника в каталоге active_learnings, проверяется еще что у данной записи должен быть указанный в параметре код.
     *
     * iEventID (int) необязательный ID мероприятия, в рамках которого назначается курс.
     *
     * teCollaborator (TopElem) необязательный TopElem карточки сотрудника, которому назначается курс.
     *
     * teCourse (TopElem) необязательный TopElem карточки курса.
     *
     * iDuration (int) необязательный длительность курса в днях. Определяет дату планируемого завершения.
     *
     * dtLastLearningDate (date) необязательный Если параметр задан, то при назначении курса, проверяется, существует ли завершённый курс в каталоге learnings завершенный после указанной в параметре даты. Если существует, то эта запись возвращается как результат работы функции.
     *
     * dtStartLearningDate (date) необязательный дата начала обучения. Если задана, то обучение невозможно будет начать раньше указанной даты.
     *
     * iEducationPlanID (int) необязательный ID плана обучения в рамках которого назначен курс.
     *
     * iGroupID (int) необязательный ID группы, которой назначен курс.
     *
     * bCommenting необязательный если свойство задано, то сотрудник может комментировать курс в плеере курса.
     *
     * bLogging необязательный если свойство задано, то ведется подробный лог курса.
     * @param _course_id (int) необязательный если передается структура oPersonID  ID курса, который необходимо назначить.
     * @param _event_id (int) необязательный ID мероприятия, в рамках которого назначается курс.
     * @param _person_doc (TopElem) необязательный TopElem карточки сотрудника, которому назначается курс.
     * @param _education_plan_id (int) необязательный ID плана обучения в рамках которого назначен курс.
     * @param _duration (int) необязательный длительность курса в днях. Определяет дату планируемого завершения.
     * @param _start_learning_date (date) необязательный дата начала обучения. Если задана, то обучение невозможно будет начать раньше указанной даты.
     * @param dtLastLearningDateParam(date) необязательный Если параметр задан, то при назначении курса, проверяется, существует ли завершённый курс в каталоге learnings завершенный после указанной в параметре даты. Если существует, то эта запись возвращается как результат работы функции.
     * @param _group_id (int) необязательный ID группы, которой назначен курс.
     * @param sEIDParam (string) необязательный - код записи в каталоге active_learnings. Если он указан, то при назначении курса, когда производится проверка на уже существующий активный курс данного сотрудника в каталоге active_learnings, проверяется еще что у данной записи должен быть указанный в параметре код.
     * @return документ незавершенного курса active_learning  который назначен сотруднику (Doc). Если курс был назначен раньше, то новый объект не создастся, а будет возвращен ранее созданный.
     * @example
     * var iLearning = tools.activate_course_to_person(Child(0).Parent.id.Value, iCourseIDPARAM, iEventIDPARAM, Child(0).Parent, null, null, dStartPARAM, dEndPARAM);
     * _course_learning = tools.activate_course_to_person( TopElem.person_id, Ps.object_id );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    activate_course_to_person?(
        oPersonID: Object | Integer,
        _course_id?: Integer,
        _event_id?: Integer,
        _person_doc?: spXmlDoc,
        _education_plan_id?: Integer,
        _duration?: Integer,
        _start_learning_date?: Date,
        dtLastLearningDateParam?: Date,
        _group_id?: Integer,
        sEIDParam?: string
    ): spXmlDoc;
    /**
     * Назначение теста сотруднику.
     * Входные параметры:
     * @param _person_id (int) ID сотрудника, которому назначается тест.
     * @param _test_id (int) ID теста, который необходимо назначить.
     * @param _event_id (int) необязательный ID мероприятия, в рамках которого назначается тест.
     * @param _person_doc (TopElem) необязательный TopElem карточки сотрудника, которому назначается тест.
     * @param _test_doc (TopElem) необязательный TopElem карточки теста.
     * @param _event_doc (TopElem) необязательный TopElem карточки мероприятия.
     * @param _duration (int) необязательный длительность теста в днях. Определяет дату планируемого завершения.
     * @param _start_learning_date (date) необязательный дата начала обучения. Если задана, то обучение невозможно будет начать раньше указанной даты.
     * @param dtLastLearningDateParam(date) необязательный Если параметр задан, то при назначении теста, проверяется, существует ли завершённый тест в каталоге test_learnings завершенный после указанной в параметре даты. Если существует, то эта запись возвращается как результат работы функции.
     * @param _group_id (int) необязательный ID группы, которой назначен тест.
     * @return документ незавершенного теста active_test_learning  который назначен сотруднику (Doc). Если тест был назначен раньше, то новый документ не создастся, а будет возвращен ранее созданный.
     * @example
     *             _test_learning = tools.activate_test_to_person( TopElem.person_id, Ps.object_id );
     * var iLearning = tools.activate_test_to_person(Child(0).Parent.id.Value, iTestIDPARAM, iEventIDPARAM, Child(0).Parent, null, null, null, dStartPARAM, dEndPARAM);
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    activate_test_to_person?(
        _person_id: Integer,
        _test_id: Integer,
        _event_id?: Integer,
        _person_doc?: XmlElem,
        _test_doc?: XmlElem,
        _event_doc?: XmlElem,
        _duration?: Integer,
        _start_learning_date?: Date,
        dtLastLearningDateParam?: Date,
        _group_id?: Integer
    ): XmlDoc;
    /**
     * Назначение теста участникам указанного мероприятия.
     * Входные параметры:
     * @param _event_id (int) ID мероприятия, в рамках которого назначается тест.
     * @param _test_id (int) ID теста, который необходимо назначить.
     * @param _doc_event (Doc) необязательный –документ карточки мероприятия.
     * @param _duration (int) необязательный длительность теста в днях. Определяет дату планируемого завершения.
     * @param _start_learning_date (date) необязательный дата начала обучения. Если задана, то обучение невозможно будет начать раньше указанной даты.
     * @param _last_learning_date (date) необязательный Если параметр задан, то при назначении теста, проверяется, существует ли завершённый тест в каталоге test_learnings завершенный после указанной в параметре даты. Если существует, то эта запись возвращается как результат работы функции.
     * @param sActTypeParam (string) необязательный строка указывающая кому назначать тесты. Возможные значения.
     *             all тесты назначаются всем участникам мероприятия.
     * post тесты назначаются участникам мероприятия у которых проставлен флаг «присутствовал на мероприятии».
     * @return количество назначенных тестов  (int).
     * @example
     *             _eval_str = 'tools.activate_test_to_event(' + TopElem.Doc.DocID + ',' + _value.key + ',null,&quot;' + _duration + '&quot;,&quot;' + _start_learning_date + '&quot;,&quot;' + _last_learning_date + '&quot;)';
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    activate_test_to_event?(
        _event_id: Integer,
        _test_id: Integer,
        _doc_event?: XmlDoc,
        _duration?: Integer,
        _start_learning_date?: Date,
        _last_learning_date?: Date,
        sActTypeParam?: String
    ): Integer;
    /**
     * Назначение курса участникам указанного мероприятия.
     * Входные параметры:
     * @param _event_id (int) ID мероприятия, в рамках которого назначается тест.
     * @param _course_id (int) ID курса, который необходимо назначить.
     * @param _doc_event (Doc) необязательный –документ карточки мероприятия.
     * @param _duration (int) необязательный длительность курса в днях. Определяет дату планируемого завершения.
     * @param _start_learning_date (date) необязательный дата начала обучения. Если задана, то обучение невозможно будет начать раньше указанной даты.
     * @param _last_learning_date (date) необязательный Если параметр задан, то при назначении курса, проверяется, существует ли завершённый курс в каталоге learnings завершенный после указанной в параметре даты. Если существует, то эта запись возвращается как результат работы функции.
     * @return количество назначенных курсов  (int).
     * @example
     *             _eval_str = 'tools.activate_course_to_event(' + TopElem.Doc.DocID + ',' + _value.key + ',null,&quot;' + _duration + '&quot;,&quot;' + _start_learning_date + '&quot;,' + ( _last_learning_date == null ? 'null' : '&quot;' + _last_learning_date + '&quot;' ) + ')';
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    activate_course_to_event?(
        _event_id: Integer,
        _course_id: Integer,
        _doc_event?: XmlDoc,
        _duration?: Integer,
        _start_learning_date?: Date,
        _last_learning_date?: Date
    ): Integer;
    /**
     * Назначение учебной программы сотруднику. Если в учебной программе указаны учебные программы, содержащие дистанционное обучение (курсы), то эти курсы будут назначены сотруднику.
     * Входные параметры:
     * @param _person_id (int) ID сотрудника, которому назначается программа.
     * @param _education_program_id (int) ID учебной программы.
     * @param _person_doc (TopElem) необязательный TopElem карточки сотрудника, которому назначается тест.
     * @param _education_program_doc (TopElem) необязательный TopElem карточки учебной программы.
     * @return количество назначенных курсов в рамках учебной программы  (int).
     * @example
     *             _R02847 = tools.activate_education_program_to_person(_s, _e);
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    activate_education_program_to_person?(
        _person_id: Integer,
        _education_program_id: Integer,
        _person_doc?: XmlElem,
        _education_program_doc?: XmlElem
    ): Integer;
    /**
     * Возвращаете время (часы, минуты и секунды) из строки с разделителем T, например вида 2015-06-02T07:51:44. Используется для разбора результатов теста.
     * Входные параметры:
     * @param _duration (date) - дата вида 2015-06-02T07:51:44.
     * @return время (часы, минуты и секунды) в строке вида 07:51:44 (string), если передано время или все что стоит после T, если передана строка с таким разделителем.
     * @example
     *             _section.duration = tools.get_time_from_duration( qtiSection.duration );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_time_from_duration?(_duration: Date): String;
    /**
     * Возвращаете время (часы, минуты и секунды) в виде часыHминутыMсекундыS полученное из числа секунд. Используется для разбора результатов теста.
     * Входные параметры:
     * @param _seconds (string)- количество секунд, которые нужно преобразовать в часы, минуты и секунды.
     * @return время в виде часыHминутыMсекундыS в строке или пустая строка  если не удалось преобразовать входной параметр в число (string).
     * @example
     *             _section.timer = tools.get_time_from_seconds( _section.timer );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_time_from_seconds?(_seconds: String): String;
    /**
     * Отменяет транзакцию. Используется в модуле геймификация.
     * Входные параметры:
     * @param _transaction_id (int) ID транзакции, которую нужно отменить.
     * @return ID новой транзакции отменяющей указанную (int).
     * @example
     *             tools.delete_transaction( Ps.Doc.DocID );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    delete_transaction?(_transaction_id: Integer): Integer;
    /**
     * Создает транзакцию по списанию указной суммы в указанной валюте с указанного счета. Используется в модуле геймификация. Совершает оплату по выбранному объекту.
     * Входные параметры:
     * @param iAccountObjectIDParam (int) - ID объекта, к которому прикреплен счет, с которого будет происходить списание.
     * @param sAccountCurrencyParam (string) необязательный - строка валюты счета, содержащая id валюты из списка валют в системе.
     * @param rSumParam (real) сумма.
     * @param sCommentParam (string) необязательный комментарий к транзакции.
     * @param iObjectIDParam (int) необязательный-  ID объекта по которому происходит транзакция.
     * @return документ созданной новой транзакции  (Doc).
     * @example
     *             tools.pay_new_transaction_by_object( personID, fldBonusElem.currency_type_id, fldBonusElem.sum, 'Bonus by qualification &quot;' + teQualification.name + '&quot;.', qualificationID );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    pay_new_transaction_by_object?(
        iAccountObjectIDParam: Integer,
        sAccountCurrencyParam?: String,
        rSumParam: Real,
        sCommentParam?: String,
        iObjectIDParam?: Integer
    ): XmlDoc;
    /**
     * Создает транзакцию зачислению суммы из указанной оплаты на счет.
     * Входные параметры:
     * @param _invoice_id (int) - ID документа Оплат.
     * @param _doc_invoice (TopElem) необязательный TopElem карточки оплаты.
     * @return документ оплаты invoice  или null в случае неудачи (Doc).
     * @example
     *             _doc = tools.pay_invoice( Ps.Doc.DocID, Ps.Doc );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    pay_invoice?(_invoice_id: Integer, _doc_invoice?: XmlElem): XmlDoc;
    /**
     * Создает транзакцию по списанию указной суммы со счета указанной организации.
     * Входные параметры:
     * @param _org_id (int) - ID организации.
     * @param _amount (real) сумма списания.
     * @param _comment (string) необязательный комментарий к транзакции.
     * @return id транзакции  или null в случае неудачи (int).
     * @example
     *             tools.pay_courses( personDoc.org_id, courseDoc.price, '' );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    pay_courses?(_org_id: Integer, _amount: Real, _comment?: String): Integer;
    /**
     * Создает документ об оплате (invoice).
     * Входные параметры:
     * @param _org_id (int) - ID организации.
     * @param _amount (real) сумма списания.
     * @return id оплаты (int).
     * @example
     *             _invoce_id = tools.set_account( Int( Request.Form.org_id ), Real( Request.Form.sum ) );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    set_account?(_org_id: Integer, _amount: Real): Integer;
    /**
     * Создает документ об оплате (invoice) для курса из заявки.
     * Входные параметры:
     * @param _org_id (int) - ID организации.
     * @param _request_id (int) –ID заявки сотрудника на курс по которой происходит списание.
     * @return id оплаты (int).
     * @example
     *             _invoce_id = tools.personal_pay( Int( _org_arr[0] ), Int( _req ) );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    personal_pay?(_org_id: Integer, _request_id: Integer): Integer;
    /**
     * Создает новое неотправленное уведомление. В теле уведомления (шаблоне уведомления) обращение к первому параметру идет через objDocID, к документу, открываемому автоматически при вызове функции по отправке уведомления, objDoc. objDoc- это TopElem документа. Обращение ко второму параметру идет через objDocSecID, к документу, открываемому автоматически при вызове функции по отправке уведомления objDocSec. objDocSec- это TopElem документа. Если документ отрыт ранее, то для ускорения работы функции отправки уведомления, можно передать открытый документ в функцию, что позволит избежать его повторного открытия. Для этого вместо tools.create_notification( code, id1, '', id2) вызывается функция, куда передаются дополнительные параметр tools.create_notification( code, id1, '', id2, TopElem1,TopElem2 )
     * Входные параметры:
     * @param oTypeParam (string) код типа уведомления, которое будет отправляться. Если параметр пустой, или равен 0, то нужно в параметр teSourceParam передавать структуру, из которой будут заполняться типы получателей (recipients), тип отправителя (sender_selector) , тема сообщения (subject), тип текста в теле сообщения (body_type), тело сообщения (body) и адрес отправителя (sender_email). Если oTypeParam это реальный код типа уведомления, то типы получателей (recipients), тип отправителя (sender_selector) и адрес отправителя (sender_email) будут браться из указанного объекта. А тема сообщения (subject), тип текста в теле сообщения (body_type), тело сообщения (body) из шаблона уведомления, прикрепленного к типу сообщения с указанным в параметре кодом. Если в существующих в системе типах уведомления не найдено типа с указанным кодом, то функция возвратит false.
     * @param iObjectIDParam (int) - ID документа, относительного которого идет поиск ID сотрудников, которым нужно отправить сообщение. В теле уведомления (шаблоне уведомления) обращение этому параметру идет через objDocID
     * @param sTextParam(string) необязательный строка, к которой можно обращаться в теле шаблона уведомления как к Text.
     * @param iSecondObjectIDParam (int) необязательный  - ID документа, который передается, как второй прикреплённый к уведомлению документ. В теле уведомления (шаблоне уведомления) обращение этому параметру идет через objDocSecID
     * @param oObjectParam (TopElem) необязательный TopElem карточки первого объекта, определяемого iObjectIDParam.
     * @param oSecondObjectParam (TopElem) необязательный TopElem карточки первого объекта, определяемого iSecondObjectIDParam.
     * @param teSourceParam (Doc) обязательный, если  oTypeParam пустой, или равен 0– структура, позволяющая создать собственное уведомление в run time. Из нее будут заполняться типы получателей (recipients), тип отправителя (sender_selector) , тема сообщения (subject), тип текста в теле сообщения (body_type), тело сообщения (body) и адрес отправителя (sender_email).
     * @return флаг успешного или не успешного создания уведомления (bool).
     * @example
     *             tools.create_notification( '66', docRequest.TopElem.person_id, '', docRequest.DocID, null, docRequest.TopElem );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    create_notification?(
        oTypeParam: String,
        iObjectIDParam: Integer,
        sTextParam?: String,
        iSecondObjectIDParam?: Integer,
        oObjectParam?: XmlElem,
        oSecondObjectParam?: XmlElem,
        teSourceParam: XmlDoc
    ): Bool;
    /**
     * Создает уведомление на основе данных из шаблона уведомления и отправляет это уведомление с помощью функции tools.create_notification. Используется для отправки уведомлений из диалога в интерфейсе администратора и на портале.
     * Входные параметры:
     * @param oTypeParam (string) код типа уведомления, которое будет отправляться.
     * @param iObjectIDParam (int) - ID документа, относительного которого идет поиск ID сотрудников, которым нужно отправить сообщение. В теле уведомления (шаблоне уведомления) обращение этому параметру идет через objDocID
     * @param sSubjectParam (string) необязательный строка, в которой содержится тема сообщения.
     * @param sBodyParam (string) необязательный строка, в которой содержится тело сообщения.
     * @param oObjectParam (TopElem) необязательный TopElem карточки первого объекта, определяемого iObjectIDParam.
     * @param teSourceParam (Xml document) необязательный, структура из которой будут заполняться типы получателей (recipients), тип отправителя (sender_selector) , тип текста в теле сообщения (body_type), адрес отправителя (sender_email).
     * @param iObjectSecondIDParam (int) необязательный  - ID документа, который передается, как второй прикреплённый к уведомлению документ. В теле уведомления (шаблоне уведомления) обращение этому параметру идет через objDocSecID
     * @return флаг успешного или не успешного создания уведомления (bool).
     * @example
     *             tools.create_template_notification( 0, _person_id, dlgDoc.TopElem.subject, dlgDoc.TopElem.body, null, dlgDoc.TopElem, iSecondID )
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    create_template_notification?(
        oTypeParam: String,
        iObjectIDParam: Integer,
        sSubjectParam?: String,
        sBodyParam?: String,
        oObjectParam?: XmlElem,
        teSourceParam?: XmlDoc,
        iObjectSecondIDParam?: Integer
    ): Bool;
    /**
     * Отправляет создание с помощью функции tools.create_notification  неотправленное уведомление.
     * Входные параметры:
     * @param iActiveNotificationIDParam (int) - ID неотправленного уведомления, которое должно быть отправлено.
     * @return флаг успешной или не успешной отправки уведомления (bool).
     * @example
     *             tools.send_notification( catActiveNotificationElem.id );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    send_notification?(iActiveNotificationIDParam: Integer): Bool;
    /**
     * Формирует форму сертификата из стандартного шаблона templates/certificate_template.html на основе завершенного курса.  Используется в карточке завершенного курса.
     * Входные параметры:
     * @param _learning_id (int) - ID завершенного курса, для которого формируется сертификат.
     * @return  сформированный Html сертификат (html).
     * @example
     *             _text = tools.save_certificate( _id );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    save_certificate?(_learning_id: Integer): String;
    /**
     * Возвращает строку символов указанной длинны, сформированной случайным образом.
     * Входные параметры:
     * @param _digit_num (int) количество символов в указанной строке. Длинна возвращаемой строки.
     * @param _dict (string) необязательный набор символов, из которого формируется строка. Если не указан, то символы берутся из набора qwertyuiopasdfghjklzxcvbnm1234567890.
     * @return  сформированный Html сертификат (html).
     * @example
     *             docPerson.TopElem.password = tools.random_string( Ps.password_digits_num );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    random_string?(_digit_num: Integer, _dict?: String): String;
    /**
     * Загрузка данных по сотрудникам из Xml структуры. Используется для импорта сотрудников.
     * Входные параметры:
     * @param sParamsXml (Xml) Xml документ с данными для загрузки.
     * @return  ID документа события базы с отчетом о загрузке (int).
     * @example
     *             local_settings.temp.import_excel_persont_action_report_id = OptInt( ServerEval( 'tools.import_excel_persons(' + CodeLiteral( fldTE.GetXml( { 'tabs': false } ) ) + ')' ), null );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    import_excel_persons?(sParamsXml: XmlDoc): Integer;
    /**
     * Используется для проверки заполнения схемы импорта перед импортом сотрудников в интерфейсе администратора.
     * Входные параметры:
     * @param Ps– TopElem Xml документа с настройками для загрузки.
     * @return  строка с ошибкой или пустая строка в случае успеха (string).
     * @example
     *             sErr = tools.start_import_excel_persons( TopElem );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    start_import_excel_persons?(Ps: XmlDoc): String;
    /**
     * Устаревшая функция. Больше не используется. Возвращает непосредственного руководителей подразделения указанного сотрудника.
     * Входные параметры:
     * @param _person_id (int) –ID сотрудника для подразделения, которого производится поиск руководителей.
     * @param _person_doc (TopElem) необязательный TopElem карточки сотрудника.
     * @return  массив с ID сотрудников, являющихся руководителями подразделения указанного сотрудника (array).
     * @example
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_sub_boss_by_person_id?(_person_id: Integer, _person_doc?: XmlElem): Array;
    /**
     * Возвращает непосредственных руководителей организации указанного сотрудника.
     * Входные параметры:
     * @param _person_id (int) –ID сотрудника для организации, которого производится поиск руководителей.
     * @return  массив с ID сотрудников, являющихся непосредственными руководителями организации указанного сотрудника (array).
     * @example
     * for ( iBossIDElem in tools.get_main_boss_by_person_id( cnf_temp_iPersonID ) )
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_main_boss_by_person_id?(_person_id: Integer): Array;
    /**
     * Добавляет новый язык в список используемых в системе языков. Загрузка происходит из XML файла с константами. Используется в администраторе в общих настройках, для установки новых языков или обновления существующих.
     * Входные параметры:
     * @param sLngUrlParam (string) пусть до XML файла с константами.
     * @param bDoObtainParam (bool) необязательный используется при вызове функции на сервере. Если true, то существующие значения констант языка перезаписываются новыми из файла.
     * @return  количество обновленных констант (int).
     * @example
     * tools.add_lng( _url );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    add_lng?(sLngUrlParam: String, bDoObtainParam?: Bool): Integer;
    /**
     * Возвращает текстовое значение константы для текущего языка (текущего языка, используемого в интерфейсе).
     * Входные параметры:
     * @param sNameParam (string) ID константы в XML структуре текущего языка.
     * @return  строка со значением константы или строка вида 'UNDEFINED - ' + sNameParam, если такой константы не найдено (string).
     * @example
     * tools.get_web_str('vfb_anonymous_author');
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_web_str?(sNameParam: String): String;
    /**
     * Проверяет, является ли указанный сотрудник (первый параметр функции) непосредственным руководителем, сотрудника, который указан в качестве второго параметра функции.
     * Входные параметры:
     * @param iUserIDParam (int) необязательный  ID сотрудника, для которого нужно осуществить проверку. То есть проверяется, является ли он непосредственным руководителем, сотрудника, который указан в качестве второго параметра функции. Если первый параметр не указан, то проверка происходит относительно текущего пользователя (curUserID), если он определен в окружении, в котором вызывается функция.
     * @param iPersonIDParam (int) необязательный  ID сотрудника руководитель, для которого проверяется. Если параметр не указан, то проверка происходит относительно поля curObject.person_id, если curObject определен в окружении, в котором вызывается функция.
     * @return флаг да, если первый сотрудник, является непосредственным руководителем второго сотрудника. Или нет, если проверка не удалась или первый сотрудник, не является непосредственным руководителем второго сотрудника  (bool).
     * @example
     * bAllowCreate = tools.is_boss();
     * ! tools.is_boss( null, curUserID )
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    is_boss?(iUserIDParam?: Integer, iPersonIDParam?: Integer): Bool;
    /**
     * Проверяет, является ли указанный сотрудник (первый параметр функции) руководителем указанного типа у сотрудника, который указан в качестве второго параметра функции.  При этом можно указать, нужно определить непосредственного или любого функционального руководителя.
     * Входные параметры:
     * @param iManagerIdParam (int)  ID сотрудника, для которого нужно осуществить проверку. То есть проверяется, является ли он непосредственным руководителем, указанного типа, сотрудника, который указан в качестве второго параметра функции.
     * @param iUserIdParam (int)  ID сотрудника руководитель, для которого проверяется.
     * @param _catalog_names (string) необязательный. native поиск только непосредственного руководителя по должности. not_native руководитель любого типа группы, сотрудника, подразделения, организации.
     * vBossType (variant) true поиск только непосредственного руководителя. False поиск только функционального руководителя без признака непосредственный. Если передать ID нужного типа руководителя, то будет проверятся руководитель указанного типа.
     * @return флаг да, если первый сотрудник, является руководителем второго сотрудника. Или нет, если проверка не удалась или первый сотрудник, не является непосредственным руководителем второго сотрудника  (bool).
     * @example
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    is_user_boss?(
        iManagerIdParam: Integer,
        iUserIdParam: Integer,
        _catalog_names?: String
    ): Bool;
    /**
     * Используется для работы в документообороте по процедуре оценки и по заявкам. Проверяет, является ли указанный сотрудник тем, от чьего имени подана заявка или на кого создана форма оценки (где он оцениваемый).
     * Входные параметры:
     * @param iUserIDParam (int) необязательный  ID сотрудника, для которого нужно осуществить проверку. Если параметр не указан, то проверка происходит относительно текущего пользователя (curUserID), если он определен в окружении, в котором вызывается функция.
     * @return флаг да или нет (bool).
     * @example
     * tools.is_self_cur_user()
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    is_self_cur_user?(iUserIDParam?: Integer): Bool;
    /**
     * Используется для работы в документообороте по заявкам и в процедуре оценки. Проверяет, является ли текущий пользователь  руководителем самого высокого уровня (подразделения первого уровня сверху или руководителем организации) по должности для сотрудника, подавшего заявку или для сотрудника на которого создан анкета или план оценки.  Проверка происходит относительно текущего пользователя (curUserID), если он определен в окружении, в котором вызывается функция, и для поля текущего объекта curObject.person_id, если он определен в окружении.
     * Входные параметры- нет.
     * @return флаг да или нет (bool).
     * @example
     * tools.is_main_boss ()
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    is_main_boss?(): Bool;
    /**
     * Используется для работы в документообороте по заявкам в процедуре оценки. Проверяет, является ли текущий пользователь  непосредственным руководителем для сотрудника, подавшего заявку или для сотрудника на которого создан анкета или план оценки.   Проверка происходит относительно текущего пользователя (curUserID), если он определен в окружении, в котором вызывается функция, и для текущего объекта curObject.person_id, если он определен в окружении.
     * Входные параметры- нет.
     * @return флаг да или нет (bool).
     * @example
     * tools.is_real_boss ()
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    is_real_boss?(): Bool;
    /**
     * Используется для работы в документообороте по заявкам в процедуре оценки. Проверяет, является ли текущий пользователь  руководителем центра затрат  для сотрудника, подавшего заявку или для сотрудника на которого создан анкета или план оценки.  Проверка происходит относительно текущего пользователя (curUserID), если он определен в окружении, в котором вызывается функция, и для текущего объекта curObject.person_id, если он определен в окружении.
     * Входные параметры - нет.
     * @return флаг да или нет (bool).
     * @example
     * tools.is_cost_center_boss()
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    is_cost_center_boss?(): Bool;
    /**
     * Используется для работы в документообороте по заявкам в процедуре оценки. Проверяет, является ли текущий пользователь  непосредственным руководителем вышестоящего подразделения (текущее подразделение сотрудника +1)  для сотрудника, подавшего заявку или для сотрудника на которого создан анкета или план оценки.  Проверка происходит относительно текущего пользователя (curUserID), если он определен в окружении, в котором вызывается функция, и для текущего объекта curObject.person_id, если он определен в окружении.
     * Входные параметры - нет.
     * @return флаг да или нет (bool).
     * @example
     * tools.is_next_boss ()
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    is_next_boss?(): Bool;
    /**
     * Используется для работы в документообороте по заявкам в процедуре оценки. Проверяет, является ли текущий пользователь  непосредственным руководителем указанного подразделения.  Проверка происходит относительно текущего пользователя (curUserID), если он определен в окружении, в котором вызывается функция.
     * Входные параметры:
     * @param _sub_id (int)  ID подразделения, для которого происходит проверка.
     * @return флаг да или нет (bool).
     * @example
     * _eval_str = _eval_str + 'tools.is_boss_by_subdivision_id(' + _condition.cur_parent_object_id + ')';
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    is_boss_by_subdivision_id?(_sub_id: Integer): Bool;
    /**
     * Используется для работы в документообороте по заявкам в процедуре оценки. Проверяет, занимает ли текущий пользователь указанную должность.  Проверка происходит относительно текущего пользователя (curUserID), если он определен в окружении, в котором вызывается функция.
     * Входные параметры:
     * @param _position_id (int)  ID должности для которой происходит проверка.
     * @return флаг да или нет (bool).
     * @example
     * _eval_str = _eval_str + 'tools.is_by_position_id(' + _condition.cur_position_id + ')';
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    is_by_position_id?(_position_id: Integer): Bool;
    /**
     * Используется для работы в документообороте по заявкам в процедуре оценки. Проверяет, входит ли текущий пользователь в указанную группу.  Проверка происходит относительно текущего пользователя (curUserID), если он определен в окружении, в котором вызывается функция.
     * Входные параметры:
     * @param is_by_group_id (int)  ID должности для которой происходит проверка.
     * @return флаг да или нет (bool).
     * @example
     * _eval_str = _eval_str + 'tools.is_by_position_id(' + _condition.cur_position_id + ')';
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    is_by_group_id?(is_by_group_id: Integer): Bool;
    /**
     * Используется для работы в документообороте по заявкам в процедуре оценки. Проверяет, является ли текущий пользователь  функциональным руководителем любого типа в карточке  сотрудника, подавшего заявку или сотрудника на которого создан анкета или план оценки.  Проверка происходит относительно текущего пользователя (curUserID), если он определен в окружении, в котором вызывается функция, и для текущего объекта curObject.person_id, если он определен в окружении.
     * Входные параметры нет.
     * @return флаг да или нет (bool).
     * @example
     * tools.is_person_func_manager()
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    is_person_func_manager?(): Bool;
    /**
     * Используется для работы в документообороте по заявкам в процедуре оценки. Проверяет, является ли текущий пользователь  функциональным руководителем любого типа в карточке  организации сотрудника, подавшего заявку или сотрудника на которого создан анкета или план оценки.  Проверка происходит относительно текущего пользователя (curUserID), если он определен в окружении, в котором вызывается функция, и для текущего объекта curObject.person_id, если он определен в окружении.
     * Входные параметры - нет.
     * @return флаг да или нет (bool).
     * @example
     * tools.is_person_org_func_manager()
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    is_person_org_func_manager?(): Bool;
    /**
     * Используется для работы в документообороте по заявкам в процедуре оценки. Проверяет, является ли текущий пользователь  функциональным руководителем любого типа и любого уровня для сотрудника, подавшего заявку или для сотрудника на которого создан анкета или план оценки. Проверка происходит относительно текущего пользователя (curUserID), если он определен в окружении, в котором вызывается функция, и для текущего объекта curObject.person_id, если он определен в окружении.
     * Входные параметры - нет.
     * @return флаг да или нет (bool).
     * @example
     * tools.is_func_manager()
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    is_func_manager?(): Bool;
    /**
     * Функция заполняет поля workflow_id, object_name, object_code, object_start_date в приёмнике данных на основе значений из объекта источника данных. Источник данных это TopElem документа источника данных. Приемником может быть элемент любого уровня в xml структуре содержащий  нужные поля.
     * Входные параметры:
     * @param _type (string) необязательный  строка, содержащая название типа источника объекта.
     * @param _source  (Xml element) приемник данных.
     * @param _object_id (int) ID документа источника данных.
     * @param _object_doc (TopElem) необязательный TopElem источника данных.
     * @return  флаг да или нет (bool). “Да” если при заполнении не произошло ошибок, “нет” если заполнение произошло с ошибкой. Если в приемнике  данных не было полей для заполнения или в источнике данных не было необходимых данных, функция вернет да (true).
     * @example
     * tools.object_filling( 'event', curProgram, docEvent.DocID, docEvent.TopElem );
     * tools.object_filling( docRequest.TopElem.type, docRequest.TopElem, Int( program_id) );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    object_filling?(
        _type?: String,
        _source: XmlDoc,
        _object_id: Integer,
        _object_doc?: XmlElem
    ): Bool;
    /**
     * Функция заполняет поля в приёмнике данных на основе значений из объекта источника данных. Источник данных это TopElem документа источника данных. Приемником может быть элемент любого уровня в xml структуре содержащий  нужные поля. В зависимости от типа источника заполняются разные поля в приемнике.
     * Для источника subdivision заполняется поле subdivision_name.
     * Для источника event заполняются поля event_name, event_start_date, event_result_type_id (если в мероприятии задан default_event_result_type_id).
     * Для источника course заполняются поля course_name, course_code, duration, no_encoding_core_lesson.
     * Для источника assessment заполняются поля assessment_name, assessment_code, duration, attempts_num.
     * Для источника request_type заполняются поля request_type_id, type, workflow_id, is_group.
     * Для источника response_type заполняются поля response_type_id, type.
     * Для источника education_method заполняются поля duration_plan, duration_fact, duration_days_plan, duration_days_fact, max_person_num, name, default_response_type_id, mandatory_fill_response, cost, currency, cost_type, education_org_id, event_form, lectors (массив), prev_testing.assessments (массив), post_testing (массив), expense_items (массив).
     * Для источника education_org заполняется поле education_org_name.
     * Для источника collaborator заполняются поля person_fullname, collaborator_fullname, person_name, person_position_name, position_name, person_org_name, person_instance_id, person_current_state, person_code.
     * Для источника item заполняются поля title, question_text, type_id, question_points.
     * Для источника submission_type заполняются поля submission_type_name.
     * Для источника activity заполняются поля activity_code, activity_name.
     * Для источника verb заполняются поля verb_code, verb_name.
     * Для источника object заполняются поля object_type, object_name, object_code, object_start_date.
     * Для источника tag заполняются поля tag_name.
     * Входные параметры:
     * @param _type (string)  строка, содержащая название типа источника объекта.
     * @param _source  (Xml element) приемник данных.
     * @param _object_id (int) ID документа источника данных.
     * @param _object_doc (TopElem) необязательный TopElem источника данных.
     * @param _custom_flag (bool) необязательный если true, и type = event, то выводит сообщение в интерфейс администратора о количестве преподавателей в мероприятии.
     * @return  флаг да или нет (bool). “Да” если при заполнении не произошло ошибок, “нет” если заполнение произошло с ошибкой. Если в приемнике  данных не было полей для заполнения или в источнике данных не было необходимых данных, функция вернет да (true).
     * @example
     * tools.common_filling( 'request_type', doc.TopElem, _request_type_first_elem.PrimaryKey );
     * tools.common_filling( 'education_method', doc.TopElem, TopElem.Doc.DocID, TopElem );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    common_filling?(
        _type: String,
        _source: XmlDoc,
        _object_id: Integer,
        _object_doc?: XmlElem,
        _custom_flag?: Bool
    ): Bool;
    /**
     * Функция очищает поля в приёмнике данных на основе указанного типа объекта источника данных. Приемником может быть элемент любого уровня в xml структуре содержащий  нужные поля. В зависимости от типа источника очищаются разные поля в приемнике.
     * Для источника event очищаются поля event_name, event_start_date.
     * Для источника education_org очищается поле education_org_name.
     * Для источника course очищаются поля course_name, course_code.
     * Для источника assessment очищаются поля assessment_name, assessment_code.
     * Для источника request_type очищаются поля request_type_id, type, workflow_id, is_group.
     * Для источника response_type заполняются поля response_type_id, type.
     * Для источника collaborator заполняются поля person_fullname, collaborator_fullname, person_name, person_position_name, position_name, person_org_name, person_instance_id, person_current_state, person_code.
     * Для источника object заполняются поля object_type, object_name, object_code, object_start_date.
     * Входные параметры:
     * @param _type (string)  строка, содержащая название типа источника объекта.
     * @param _source  (Xml element) приемник данных.
     * @param _ps  (Xml element) необязательный елемен, с дочерним элементом sd, если указан, то элемент sd очишается.
     * @return  флаг да (bool).
     * @example
     * tools.common_clear( _cur_catalog_name, TopElem, Ps );
     * tools.common_clear( 'collaborator', Child(0).Parent, person_id );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    common_clear?(_type: String, _source: XmlDoc, _ps?: XmlDoc): Bool;
    /**
     * Функция завершает указанный активный электронный курс и создает карточку завершенного электронного курса.
     * Входные параметры:
     * @param _learning_id (int)  ID активного электронного курса, который необходимо завершить.
     * @param _source  (TopElem) необязательный TopElem активного электронного курса, который необходимо завершить.
     * @param _course_doc (TopElem) необязательный TopElem электронного курса, который необходимо завершить.
     * @return  ID нового завершенного курса (int).
     * @example
     * iLearningId = tools.active_learning_finish(iActiveLearnId,'',teCourse);
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    active_learning_finish?(
        _learning_id: Integer,
        _source?: XmlElem,
        _course_doc?: XmlElem
    ): Integer;
    /**
     * Функция завершает указанный активный тест и создает карточку завершенного теста.
     * Входные параметры:
     * @param _learning_id (int)  ID активного теста, который необходимо завершить.
     * @param _source  (TopElem) необязательный TopElem активного тест, который необходимо завершить.
     * @param _assessment_doc (TopElem) необязательный TopElem теста, который необходимо завершить.
     * @param iPersonIDParam(int) необязательный  ID сотрудника, для которого необходимо завершить тест.
     * @return  TopElem нового завершенного теста.
     * @example
     * docTestLearning = tools.active_test_learning_finish(iActiveTestId,'',teAssessment);
     * tools.active_test_learning_finish( _doc_id );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    active_test_learning_finish?(
        _learning_id: Integer,
        _source?: XmlElem,
        _assessment_doc?: XmlElem,
        iPersonIDParam?: Integer
    ): any;
    /**
     * Функция завершает указанную попытку для теста и создает карточку завершенного теста.
     * Входные параметры:
     * @param _learning_id (int)  ID активного теста, который необходимо завершить.
     * @param _learning_code (string) необязательный код раздела теста, который нужно завершить.
     * @param _assessment_doc (TopElem) необязательный TopElem теста, который необходимо завершить.
     * @param _flag_create_learning  (bool) необязательный  создавать или нет завершенный тест.
     * @param docActiveLearning (Doc) необязательный Doc документ активного тест, который необходимо завершить.
     * @return  флаг да или нет (bool). Показывает успешно завершена попытка или нет.
     * @example
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    active_test_learning_finish_attempt?(
        _learning_id: Integer,
        _learning_code?: String,
        _assessment_doc?: XmlElem,
        _flag_create_learning?: Bool,
        docActiveLearning?: XmlDoc
    ): Bool;
    /**
     * Устаревшая функция. Представляет результаты теста в XML формате.
     * Входные параметры:
     * @param _core  (string)  –результаты для дешифровки.
     * @param _qti_path (string) необязательный путь до файла со структурой теста в формате qti.
     * @param _qti_text (string) необязательный  структура  теста в формате qti.
     * @param _learning_doc (TopElem) необязательный  TopElem карточки завершенного теста для дешифровки.
     * @return  Xml структура содержащая результаты в теге annals.
     * @example
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    core_decrypt?(
        _core: String,
        _qti_path?: String,
        _qti_text?: String,
        _learning_doc?: XmlElem
    ): XmlDoc;
    /**
     * Представляет результаты завершенного теста в XML формате.
     * Входные параметры:
     * @param sSourceParam  (string)  –результаты для дешифровки.
     * @return  Xml структура содержащая результаты в теге annals.
     * @example
     * sReport = tools.get_annals_from_core( Trim( StrSimpleDecrypt( oSourceParam.core_lesson ) ) );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_annals_from_core?(sSourceParam: String): XmlDoc;
    /**
     * Возвращает XML документ, без отступов, но со стандартным XML заголовком на основе, переданной в функцию XML структуры. То есть передано
     * <t>
     *             <i>Text</i>
     * </t>
     * Вернется <?xml version=”1.0”encoding=” utf-8”?><t><i>Text</i></t>
     * Входные параметры:
     * @param fldAnnalsParam  (XML)  –параметр для перобразования.
     * @return  Xml документ.
     * @example
     * TopElem.lesson_report = tools.get_annals_text_from_annals( TopElem.annals_variant.Object );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_annals_text_from_annals?(fldAnnalsParam: XmlDoc): XmlDoc;
    /**
     * Возвращает путь до файла со структурой теста/курса в формате qti.
     * Входные параметры:
     * @param oSource (object)  либо ID карточки теста/курса, либо TopElem карточки теста/курса, либо TopElem карточки объекта в котором есть поле course_id или assessment_id для получения ID теста/курса.
     * @param fldPartParam (string) необязательный код модуля электронного курса, для которого нужно получить  _qti_path .
     * @return  путь до файла со структурой теста/курса в формате qti (string).
     * @example
     * path = tools.get_qti_path( courseDoc, _part );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_qti_path?(oSource: Object, fldPartParam?: String): String;
    /**
     * Возвращает стандартный заголовок для XML документ вида
     *  <?xml version=”1.0”encoding=” utf-8”?>
     * Входные параметры нет.
     * @return  строка (string) вида <?xml version=”1.0”encoding=” utf-8”?>.
     * @example
     * respStr = tools.xml_header() + resp.Body
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    xml_header?(): String;
    /**
     * Представляет результаты теста в XML структуре.
     * Входные параметры:
     * @param oSourceParam  (Xml element)  –элемент, в котором содержится либо непустое поле lesson_report , либо непустое поле objects (массив с элементами), либо непустое поле core_lesson, для разбора.
     * @param sQtiPathParam (string) необязательный путь до файла со структурой теста в формате qti.
     * @param sQtiTextParam (string) необязательный структура  теста в формате qti.
     * @return  Xml структура содержащая результаты.
     * @example
     * TopElem.annals_variant = tools.annals_decrypt( oSource, sQtiPath );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    annals_decrypt?(
        oSourceParam: XmlDoc,
        sQtiPathParam?: String,
        sQtiTextParam?: String
    ): XmlDoc;
    /**
     * Устаревшая функция. Представляет результаты теста в XML формате.
     * Входные параметры:
     * @param _core  (string)  –результаты для дешифровки.
     * @param _qti_path (string) необязательный путь до файла со структурой теста в формате qti.
     * @param _qti_text (string) необязательный  структура  теста в формате qti.
     * @return  XML документ, без отступов, но со стандартным XML заголовком на основе.
     * @example
     * tools.report_decrypt( Ps )
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    report_decrypt?(
        _core: String,
        _qti_path?: String,
        _qti_text?: String
    ): XmlDoc;
    /**
     * Заполняет структуру annals  результатами теста в XML формате.
     * Входные параметры:
     * @param fldAnnalsObjectsTarget (Xml element)  структура для заполнения.
     * @param sQtiPathParam (string) необязательный путь до файла со структурой теста в формате qti.
     * @param sQtiTextParam (string) необязательный структура  теста в формате qti.
     * @return  нет.
     * @example
     * tools.fill_annals_text( fldAnnals.au.history.objects, sQtiPathParam, sQtiTextParam );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    fill_annals_text?(
        fldAnnalsObjectsTarget: XmlDoc,
        sQtiPathParam?: String,
        sQtiTextParam?: String
    ): void;
    /**
     * Заполняет структуру annals  результатами теста в XML формате.
     * Входные параметры:
     * @param _annals (Xml element) необязательный, если передана oAnnalsTarget– структура для заполнения.
     * @param _qti_path (string) необязательный путь до файла со структурой теста в формате qti.
     * @param _qti_text (string) необязательный структура  теста в формате qti.
     * @param _learning_doc (TopElem) необязательный  TopElem карточки теста.
     * @param oAnnalsTarget (Xml element) необязательный, если передана _annals структура для заполнения.
     * @return  заполненный XML документ, без отступов.
     * @example
     * TopElem.lesson_report = tools.get_annals_text_from_annals( TopElem.annals_variant.Object );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_annals_text?(
        _annals?: XmlDoc,
        _qti_path?: String,
        _qti_text?: String,
        _learning_doc?: XmlElem,
        oAnnalsTarget?: XmlDoc
    ): XmlDoc;
    /**
     * Закрывает заявку. При закрытии заявки вызывается код, обрабатывающий ее закрытие. Статус заявки не меняется в самой функции.
     * Входные параметры:
     * @param _request_id (int)  ID заявки для закрытия.
     * @return - нет.
     * @example
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    close_request?(_request_id: Integer): void;
    /**
     * Вызов действия документооборота.
     * Входные параметры:
     * @param _source (Doc)  документ (Doc) объекта, относительно которого вызывается действие.
     * _action_code (sting) код действия документооборота.
     * @param _workflow_id (int) ID документооборота, действие которого выполняется.
     * @param _workflow_doc (TopElem) необязательный –TopElem документооборота.
     * @param _alterCurObjectID (int) необязательный. Если действие документооборота, это печать печатной формы, то можно передать в этот параметр ID объекта, который будет передаваться в печатную форму как object_id.
     * @return структура со следующими полями
     * 'result' флаг да/нет (bool) успешное или неуспешное выполнение действия. 'workflow_success_action' – строка с XAML кодом, выполняющимся при успешном выполнении действия (обрабатывается в карточке заявки на портале)
     *  'workflow_action_message' - строка текстом сообщения при успешном выполнении действия, (обрабатывается в карточке заявки на портале)
     * 'workflow_create_break': флаг да/нет (bool). Прерывать или нет выполнения действия (обрабатывается в карточке заявки на портале).
     * @example
     *             tools.workflow_action_process(docAssessmentPlan, curObject.fire_wf_action, curObject.workflow_id, curWorkflow);
     * oWorkflowActionResult = tools.workflow_action_process( curObjectDoc, CONTEXT.action_id, curObject.workflow_id, curWorkflow );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    workflow_action_process?(
        _source: XmlDoc,
        _workflow_id: Integer,
        _workflow_doc?: XmlElem,
        _alterCurObjectID?: Integer
    ): any;
    /**
     * Добавляет в системные lists новый список(списки) со значениям или обновляет старый.
     * Входные параметры:
     * _url (sting) путь до файла со Lists.
     * _list_name (sting) необязательный –названия списка, значения которого будут обновлены на основе данных из файла.
     * @return флаг да (bool) при любом (успешном или неуспешном) выполнение действия.
     * @example
     *             tools.obtain_lists( UrlAppendPath( 'x-local://custom/', temp_doc.lists_url ) );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    obtain_lists?(): Bool;
    /**
     * Устаревшая функция. Больше не используется. Функционал перенесен в объект мероприятие в функцию set_status. Меняет статус мероприятия на завершено.
     * Входные параметры:
     * @param _event_id (ID)  –ID мероприятия, которое нужно завершить.
     * @param _event_doc (Doc) необязательный –Doc мероприятия.
     * @return  Doc мероприятия.
     * @example
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    event_finish?(_event_id: Integer, _event_doc?: XmlDoc): any;
    /**
     * Устаревшая функция. Больше не используется. Функционал перенесен в объект мероприятие в функцию set_status. Меняет статус мероприятия на проводится.
     * Входные параметры:
     * @param _event_id (ID)  –ID мероприятия, которое нужно завершить.
     * @param _event_doc (Doc) необязательный –Doc мероприятия.
     * oScreenParam (Screen) необязательный –экран, куда выводится сообщения (работает только при вызове из администратора WebTutor).
     * @return  Doc мероприятия.
     * @example
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    event_start?(_event_id: Integer, _event_doc?: XmlDoc): any;
    /**
     * Проверяет разрешение на доступ к указанному объекту для указанного пользователя. Проверка идет по уровню доступа, роли доступа, группам доступа и условиям доступа, если в карточке объекта есть соответствующие настройки.
     * Входные параметры:
     * @param _source_doc (TopElem) TopElem объекта, доступ к которому нужно проверить.
     * @param _user_id (int)  –ID сотрудника, для которого нужно проверить доступ.
     * @return флаг да/нет (bool), доступ разрешен или запрещен.
     * @example
     *             tools.check_access(curCourse, curUserID)
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    check_access?(_source_doc: XmlElem, _user_id: Integer): Bool;
    /**
     * Возвращает путь до xmd формы каталога или объекта каталога.
     * Входные параметры:
     * @param sCatalogNameParam (string) название каталога (без s на конце).
     * @param bIsCatalogParam (bool)  флаг указывающий, нужно возвращать форму каталога (true), или форму объекта (false).
     * @return пусть до формы (string) начинающийся с «x-local:».
     * @example
     *             sObjectFormUrl = tools.get_object_form_url( fldSourceObjectElem.Name, false );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_object_form_url?(
        sCatalogNameParam: String,
        bIsCatalogParam: Bool
    ): String;
    /**
     * Создает новый объект в указанном каталоге.
     * Входные параметры:
     * @param sCatalogNameParam (string) название каталога. Обычно указывается без s на конце.
     * @param bIsCatalogParam (bool)  флаг указывающий, что создается новая запись в каталоге (true), или создается новый объект (false). Обычно передается false
     * @return Doc нового объекта.
     * @example
     *             docObject = tools.new_doc_by_name( Ps.catalog_name, false );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    new_doc_by_name?(sCatalogNameParam: String, bIsCatalogParam: Bool): any;
    /**
     * Создает новый объект в указанном каталоге.
     * Входные параметры:
     * @param _pak_url (string) пусть в файловой системе, куда нужно сохранить пакет.
     * @param _report_id (int)  ID события базы, в которое будет записываться отчет о процессе генерации.
     * @param _param_source (XML element) XML, который содержит поля process_custom_templates (bool) и process_access_roles (bool). process_custom_templates – в пакет добалуются выбранные настраиваемые поля. process_access_roles - в пакет добалуются роли доступа.
     * @param sPackIDParam (string) строка с ID пакета для создания
     * @return количество добавленных в пакет объектов (int).
     * @example
     *             counter = tools.create_package( _file_url, _report_id, Ps, _cur_id );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    create_package?(
        _pak_url: String,
        _report_id: Integer,
        _param_source: Bool,
        sPackIDParam: String
    ): Integer;
    /**
     * Возвращает Doc документа по указанным условиям или null, если документ не найден.
     * Входные параметры:
     * @param sObjectNameParam (string) название каталога для поиска объекта (без s на конце).
     * oKeyParam (variant)  если передается строка, то это название поля в каталоге, по которому происходит поиск значения, заданного oKeyValueParam. Если это массив свойств, то будет создано условие поиска. Где название свойства это название поля в каталоге, по которому происходит поиск значения. А значение это значение указанного свойства.
     * @param oKeyValueParam (string) значение поля в каталоге, по которому происходит поиск.
     * @return Doc документа по указанным условиям или null, если документ не найден.
     * @example
     *             docObject = tools.get_doc_by_key( sObjectNameParam, oKeyParam, oKeyValueParam );
     * docUserData = tools.get_doc_by_key( 'user_data', 'code', String( oConditionsParam ) );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_doc_by_key?(sObjectNameParam: String, oKeyValueParam: String): any;
    /**
     * Возвращает Doc документа по указанным условиям, если документ не найден, то создает новый документ.
     * Входные параметры:
     * @param sObjectNameParam (string) название каталога для поиска объекта (без s на конце).
     * oKeyParam (variant)  если передается строка, то это название поля в каталоге, по которому происходит поиск значения, заданного oKeyValueParam. Если это массив свойств, то будет создано условие поиска. Где название свойства это название поля в каталоге, по которому происходит поиск значения. А значение это значение указанного свойства.
     * @param oKeyValueParam (string) значение поля в каталоге, по которому происходит поиск.
     * @return Doc документа.
     * @example
     * docItem = tools.obtain_doc_by_key( 'item', 'code', _item.ident.Value );docUserData = docExchangeServer = tools.obtain_doc_by_key( 'exchange_server', 'code', String( _cur_code ) );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    obtain_doc_by_key?(sObjectNameParam: String, oKeyValueParam: String): any;
    /**
     * Получает длительность в секундах из строки формата по стандарту ISO 8601 вида P3Y6M4DT12H30M17S (это отрезок времени в 3 года 6 месяцев 4 суток 12 часов 30 минут и 17 секунд).
     * Входные параметры:
     * @param _duration (string) длительность в формате ISO 8601 вида P3Y6M4DT12H30M17S
     * @return длительность в секундах (int).
     * @example
     * _dur = tools.get_seconds_from_duration( qtiDoc.duration );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_seconds_from_duration?(_duration: String): Integer;
    /**
     * Заполняет карточку теста и создает вопросы к нему на основе qti описания теста
     * Входные параметры:
     * @param _assessment_id (int) необязательный, если передается _source ID теста.
     * @param _source (TopElem) TopElem теста.
     * @param _qti_text (string) структура  теста в формате qti.
     * @return нет.
     * @example
     * tools.assessment_filling_from_qti( docAssessment.DocID, docAssessment.TopElem, _event.test.qti_text );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    assessment_filling_from_qti?(
        _assessment_id?: Integer,
        _source: XmlElem,
        _qti_text: String
    ): void;
    /**
     * Отправляет письмо об изменении в блоке, форуме, сообщении форума или документе портала, всем подписанным на изменения пользователям, или конкретному пользователю.
     * Входные параметры:
     * @param _document_id  (int) необязательный, если передается _source ID объекта, для рассылки изменений.
     * @param _source (TopElem) TopElem объекта.
     * @param iPersonIDParam (int) ID сотрудника, которому нужно отправить сообщение.
     * @return массив каталожных записей с подписками, по которым произошла рассылка.
     * @example
     * tools.submit_subscriptions( TopElem.blog_id, _cur_blog );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    submit_subscriptions?(
        _document_id?: Integer,
        _source: XmlElem,
        iPersonIDParam: Integer
    ): any;
    /**
     * Создает строку условий для использования в выражении where в XQuery запросе на основе структуры с описанием условий.
     * Входные параметры:
     * @param _conditions (XML element) условия выборки. Структура вида.
     *                         <condition MULTIPLE="1">
     *                                    <field TYPE="string"/>
     *             <title TYPE="string"/>
     *             <value TYPE="string "/>
     *             <type TYPE="string" NOT-NULL="1" DEFAULT="string"/>
     *             <option_type TYPE="string" NOT-NULL="1" DEFAULT="eq" FOREIGN-ARRAY="common.all_option_types"/>
     *             <is_custom_field TYPE="bool" NULL-FALSE="1" DEFAULT="false"/>
     *             <and_or TYPE="string" NOT-NULL="1" DEFAULT="and"/>
     *             <is_multiple TYPE="bool" NULL-FALSE="1" DEFAULT="false"/>
     *             <value_multiple TYPE="string" MULTIPLE="1"/>
     *             <bracket TYPE="string"/>
     *                         </condition>
     *             С заданными условиями.
     * @param _cond (string) необязательный строка, которая может быть использована как префикс к формируемой функцией строке.
     * @param _elem_name (string) необязательный название переменной в формируемой строке. По умолчанию elem. ( $elem)
     * @return строка условий для использования в выражении where в XQuery запросе.
     * @example
     * tools.create_filter_xquery( Ps.conditions );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    create_filter_xquery?(
        _conditions: XmlDoc,
        _cond?: String,
        _elem_name?: String
    ): any;
    /**
     * Создает строку условий для использования в выражении типа eval в коде администратора WebTutor или в серверном коде на основе структуры с описанием условий.
     * Входные параметры:
     * @param _conditions (XML element) условия выборки. Структура вида.
     *                         <condition MULTIPLE="1">
     *                                    <field TYPE="string"/>
     *             <title TYPE="string"/>
     *             <value TYPE="string "/>
     *             <type TYPE="string" NOT-NULL="1" DEFAULT="string"/>
     *             <option_type TYPE="string" NOT-NULL="1" DEFAULT="eq" FOREIGN-ARRAY="common.all_option_types"/>
     *             <is_custom_field TYPE="bool" NULL-FALSE="1" DEFAULT="false"/>
     *             <and_or TYPE="string" NOT-NULL="1" DEFAULT="and"/>
     *             <is_multiple TYPE="bool" NULL-FALSE="1" DEFAULT="false"/>
     *             <value_multiple TYPE="string" MULTIPLE="1"/>
     *             <bracket TYPE="string"/>
     *                         </condition>
     *             С заданными условиями.
     * @param _first_cond (string) необязательный строка, которая может быть использована как префикс к формируемой функцией строке.
     * @param _elem_name (string) необязательный название переменной в формируемой строке. По умолчанию «curObject.».
     * @return строка условий для использования в выражении eval.
     * @example
     * tools.create_filter_javascript( Ps.conditions, null, '' );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    create_filter_javascript?(
        _conditions: XmlDoc,
        _first_cond?: String,
        _elem_name?: String
    ): any;
    /**
     * Обновляет значения текущих настраиваемых полей в системе на основе списка, указанного в параметрах.
     * Входные параметры:
     * @param _url (string) необязательный, если передан _source.  Путь до файла с структурой списка (List) из которого будут загружаться данные.
     * @param _source (TopElem) необязательный list для обновления.
     * @return количество обновленных элементов списка.
     * @example
     * iCounter = tools.obtain_custom_templates( UrlAppendPath( 'x-local://custom/', temp_doc.custom_templates_url ) );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    obtain_custom_templates?(_url?: String, _source?: XmlElem): any;
    /**
     * Обновляет значения ролей в системе на основе списка, указанного в параметрах.
     * Входные параметры:
     * @param _url (string) необязательный, если передан _source.  Путь до файла с структурой списка (List) из которого будут загружаться данные.
     * @param _source (TopElem) необязательный list для обновления.
     * @return количество обновленных элементов списка.
     * @example
     * iCounter = tools.obtain_custom_templates( UrlAppendPath( 'x-local://custom/', temp_doc.custom_templates_url ) );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    obtain_access_roles?(_url?: String, _source?: XmlElem): any;
    /**
     * Импортирует курс в систему из указанного файла.
     * Входные параметры:
     * @param _file (string) путь до файла.
     * @return флаг (bool) да (true) в любом случае.
     * @example
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    import_course?(_file: String): Bool;
    /**
     * Устаревшая функция. Больше не используется. Применялась для распределенной системы для проставления необходимых для настройки обмена параметров.
     * Входные параметры:
     * @param Нет.
     * @return нет.
     * @example
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    process_skk?(): void;
    /**
     * Возвращает значение параметра, переданного в функцию, в зашифрованном виде. Вид шифрования указывается в общих настройках (Формат хранения и проверки пароля): md5, sha1, sha1_base64 .
     * Входные параметры:
     * @param PASSWORD (string) строка для преобразования.
     * @param CHECK (bool) флаг, показывающий, что получаемая в результате преобразования строка будет использоваться для проверки пароля (true). Это значит, что их строки будут удалены открывающаяся “(” и закрывающаяся “)” скобки для  md5, sha1, sha1_base64. В противном случае (false), будет возвращена строка в () в указанном в настройках формате md5, sha1, sha1_base64 или без скобок для формата Plain.
     * @return строка (string), преобразованная в соответствие с параметрами вызова.
     * @example
     * Ps.password = tools.make_password( NewValue, true );
     * if ( tools.make_password( curUser.password, true ) != tools.make_password( formDoc.user.password, false ) )
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    make_password?(PASSWORD: String, CHECK: Bool): String;
    /**
     * Возвращает версию и дату модификации из файла history . Поиск файла history может происходить в разных местоположениях в зависимости от параметров функции.
     * Входные параметры:
     * @param _type (string) необязательный  строка, указывающая какой именно файл history нужно открыть для получения версии и даты модификации. По умолчанию wtv.
     * @param wtv - history из файла history.xml папка wtv.
     * @param qti - history из файла history.xml папка qti.
     * @param assessment - history из файла history_ass.xml папка wtv.
     * @param last - history из файла history.xml папка last.
     * @return строка (string) строка вида “версия (дата модификации)”.
     * @example
     * lastVersion = tools.get_version( 'last' );
     * newVersion = tools.get_version();
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_version?(
        _type?: String,
        wtv: XmlDoc,
        qti: XmlDoc,
        assessment: XmlDoc,
        last: XmlDoc
    ): String;
    /**
     * Функция возвращает набор заполненных настраиваемых полей для данного каталога  и данного документа. Если указан только первый параметр, вернет список полей без значений.
     * Входные параметры:
     * @param _catalog (string) - строка с названием каталога без ‘s’ на конце.
     * @param _top_id (int) необязательный ID документа, для которого нужно вернуть набор полей.
     * @param _source  (TopElem) необязательный TopElem документа, для которого нужно вернуть набор полей.
     * @return XML с набором заполненных настраиваемых полей для данного каталога  и данного документа.
     * @example
     * fldCustomTemplate = tools.get_custom_template( 'collaborator', null, null ); fldCustomElems = tools.get_custom_template('request_type',filRequestType.id);
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_custom_template?(
        _catalog: String,
        _top_id?: Integer,
        _source?: XmlElem
    ): XmlDoc;
    /**
     * Функция меняет статус указанного сотрудника у поля «Временно запрещен доступ на портал». Функция отправляет уведомления сотруднику об изменении доступа.
     * Входные параметры:
     * @param _person_id (int) ID сотрудника для установки значения поля «Временно запрещен доступ на портал».
     * @param _status (bool) доступ запрещен (true), доступ разрешен (false).
     * @param _source (Doc) необязательный –Doc документа, для которого поменять значение в поле.
     * @param _check_admin (bool) необязательный если значение параметра (true) менять значение можно только у сотрудников не являющихся администраторами.
     * @return флаг да/нет (bool) успех или неуспех смены статуса доступа на портал.
     * @example
     * if ( tools.set_web_ban( eval( '_env' + Ps.row_list_field + Ps.row_key_field ), false ) )
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    set_web_ban?(
        _person_id: Integer,
        _status: Bool,
        _source?: XmlDoc,
        _check_admin?: Bool
    ): Bool;
    /**
     * Заполняет данные для отображения списка объектов в блоке в разделах администратора. Используется для отображения таких настраиваемых отчетов, настраиваемых типов документов, типов заявок и типов отзывов в нужных разделах администратора WebTutor через функцию tools.disp_block_filling.
     * Входные параметры:
     * @param _source (TopElem) TopElem объекта, который нужно отобразить в блоке.
     * @param _disp_block (Xml element)  –Xml структура вида.
     * <disp_block>
     *             <access_block_type TYPE="string"/> Код блока в который нужно добавить объект
     *             <obj_title TYPE="string"/> Название объекта, под которым он будет отображаться
     *             <custom_flag TYPE="bool"/> Стандартный или настраиваемый объект (нужно передавать true)
     * </disp_block>
     * Если передать <disp_block> </disp_block>, то список объетов будет удален их описания соответствующего раздела.
     * @param _disp_object_blocks (Xml element) существующие блоки для отображения
     * @param _source_id (int) объекта, который нужно отобразить в блоке.
     * @return нет.
     * @example
     * tools.disp_block_filling_by_source( _source, _disp_block, disp_object_blocks, _source.Doc.DocID );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    disp_block_filling_by_source?(
        _source: XmlElem,
        _disp_block: XmlDoc,
        _disp_object_blocks: XmlDoc,
        _source_id: Integer
    ): void;
    /**
     * Заполняет данные для отображения списка объектов в блоке в разделах администратора. Используется для отображения таких настраиваемых отчетов, настраиваемых типов документов, типов заявок и типов отзывов в нужных разделах администратора WebTutor.
     * Входные параметры:
     * @param _source (TopElem) TopElem объекта, который нужно отобразить в блоке.
     * @param _disp_block (Xml element)  –Xml структура вида.
     * <disp_block>
     *             <access_block_type TYPE="string"/> Код блока в который нужно добавить объект
     *             <obj_title TYPE="string"/> Название объекта, под которым он будет отображаться
     *             <custom_flag TYPE="bool"/> Стандартный или настраиваемый объект (нужно передавать true)
     * </disp_block>
     * Если передать <disp_block> </disp_block>, то список объетов будет удален их описания соответствующего раздела.
     * @return нет.
     * @example
     * tools.disp_block_filling( TopElem, TopElem.disp_block );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    disp_block_filling?(_source: XmlElem, _disp_block: XmlDoc): void;
    /**
     * Конструирует строку для использования в запросе XQuery на основе указанных параметров.
     * Входные параметры:
     * @param _catalog_name (string) строка с названием каталога без ‘s’ на конце, по которому будет происходить поиск в запросе.
     * @param _xquery_qual (string) необязательный строка с текстом условий поиска, который используется в конструкции where. Они будут добавлены к условиям заданными в других параметрах функции (_filter_xquery и _ft_filter)
     * @param _filter_xquery (string)  необязательный  - строка с текстом условий поиска, который используется в конструкции where. Они будут добавлены к условиям заданными в других параметрах функции (_xquery_qual  и _ft_filter)
     * @param _ft_filter (string)  необязательный  - строка с текстом для полнотекстового поиска в документе, который используется в конструкции where. Они будут добавлены к условиям заданными в других параметрах функции (_xquery_qual  и _filter_xquery).
     * @param _order_str (string)  необязательный  - строка названий полей разделенных (,) по которым будет происходить сортировка в запросе.
     * @param _order_dir (string) необязательный  - строка, указывающая направление сортировки (по умолчанию +, то есть asсending). Для указания descending, значение параметра может быть '-' или  'descending' или 'desc'.
     * @param _is_hier (bool)  необязательный  по умолчанию false. Нужно ли создавать иерархию в результате запроса. Если параметр будет true, то в строку запроса будет добавлен  $elem/Hier().
     * @param _foreign_field (string)  необязательный, по умолчанию ‘id’. Если в запросе будет использоваться полнотекстовый поиск (параметр _ft_filter), то можно указать поле отличное от id, которое содержит id документа.
     * @param oColumnsParam (Xml element) необязательный колонки, например, из view_types.xml для возврата по результатам запроса.
     * @return строка (string)  для использования в запросе XQuery на основе указанных параметров.
     * @example
     * query = tools.create_xquery( 'event_collaborator', xqueryQualExpr , '', _ft_filter, _cur_view_type.columns.Child( List.GetCurSortColumnIndex() ).order, List.GetCurSortDir(), false, primaryKeyExpr );
     * query = tools.create_xquery( Ps.catalog_name, Ps.xquery_qual, sFilterXquery, Ps.filter.fulltext, ( Ps.use_common_columns ? _cur_column.order : '$elem/' + _cur_column.name ), List.GetCurSortDir(), Ps.is_hier, null, Ps );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    create_xquery?(
        _catalog_name: String,
        _xquery_qual?: String,
        _filter_xquery?: String,
        _ft_filter?: String,
        _order_str?: String,
        _order_dir?: String,
        _is_hier?: Bool,
        _foreign_field?: String,
        oColumnsParam?: XmlDoc
    ): String;
    /**
     * Осуществляет обработку заявки. Выполняет стандартную обработку заявки по типу прикреплённого объекта (если в типе заявки не снят признак «Использовать стандартную обработку для данного типа объекта»). Выполняет код обработки заявки из типа заявки. Меняет статус у заявки на «закрыта» и проставляет дату закрытия заявки. Если стандартная обработка включает отправку уведомлений, то будут отправлены уведомления.
     * Входные параметры:
     * @param iRequestID (int) ID заявки для обработки.
     * @param docRequest (Doc) необязательный –Doc заявки для обработки.
     * @return Doc обработанной и сохраненной заявки.
     * @example
     * tools.request_processing( docRequest.DocID, docRequest );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    request_processing?(iRequestID: Integer, docRequest?: XmlDoc): any;
    /**
     * Осуществляет отмену (отклонение) заявки. Выполняет действия по отклонению заявки по типу прикреплённого объекта (если в типе заявки не снят признак «Использовать стандартную обработку для данного типа объекта»). Выполняет код отмены заявки из типа заявки. Меняет статус у заявки на «отмена» и проставляет дату закрытия заявки. Если стандартная обработка включает отправку уведомлений, то будут отправлены уведомления.
     * Входные параметры:
     * @param iRequestID (int) ID заявки для отмены.
     * @param docRequest (Doc) необязательный –Doc заявки для обработки.
     * @param iPersonID (int) необязательный ID сотрудника. Если будет совпадать с id подавшего заявку, то руководителю будет отправлено уведомление, что подчиненный сотрудник отменил заявку.
     * @return Doc обработанной и сохраненной заявки.
     * @example
     * tools.request_rejecting( _source.DocID, _source );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    request_rejecting?(
        iRequestID: Integer,
        docRequest?: XmlDoc,
        iPersonID?: Integer
    ): any;
    /**
     * Добавляет участника в мероприятие.
     * Входные параметры:
     * @param iPersonIDParam (int) ID сотрудника для добавления.
     * @param iEventIDParam (int) ID мероприятия для добавления сотрудника.
     * @param tePersonParam (TopElem) необязательный –TopElem сотрудника для добавления.
     * @param docEventParam (Doc) необязательный Doc мероприятия для добавления сотрудника.
     * @param iEducationPlanIDParam (int) ID плана обучения добавляемого сотрудника. Если указан, то ссылка на план сохранится в результате мероприятия сотрудника.
     * @param iRequestPersonIDParam (int)  ID сотрудника, подавшего заявку на добавление  сотрудника в мероприятие. Если указан, то ссылка на сотрудника, подавшего заявку, сохранится в результате мероприятия сотрудника.
     * @param iRequestIDParam (int) ID заявки на включение сотрудника в состав участников мероприятия. Если указан, то ссылка на заявку сохранится в результате мероприятия сотрудника.
     * @return Doc мероприятия, к которое добавлялся сотрудник.
     * @example
     * tools.add_person_to_event( _source.TopElem.person_id, _source.TopElem.object_id, null, docObject );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    add_person_to_event?(
        iPersonIDParam: Integer,
        iEventIDParam: Integer,
        tePersonParam?: XmlElem,
        docEventParam?: XmlDoc,
        iEducationPlanIDParam: Integer,
        iRequestPersonIDParam: Integer,
        iRequestIDParam: Integer
    ): any;
    /**
     * Удаляет участника из мероприятия.
     * Входные параметры:
     * @param _person_id (int) ID сотрудника для удаления.
     * @param _event_id (int) ID мероприятия для удаления сотрудника.
     * @param _doc_event (Doc) необязательный Doc мероприятия для удаления сотрудника.
     * @param _flag_save (bool) необязательный, по умолчанию  true. true сохранять, false –не сохранять карточку мероприятия после добавления сотрудника.
     * @return Doc мероприятия, к которое добавлялся сотрудник.
     * @example
     * _doc = tools.del_person_from_event( _person.PrimaryKey, curObjectID, curObjectDoc, false );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    del_person_from_event?(
        _person_id: Integer,
        _event_id: Integer,
        _doc_event?: XmlDoc,
        _flag_save?: Bool
    ): any;
    /**
     * Пересохраняет объекты указанного каталога.
     * Входные параметры:
     * @param _catalog_name (string) название каталога без ‘s’ на конце, объекты которого нужно пересохранить.
     * @param _data_flag (bool) необязательный, по умолчанию  false. true проставлять, false –не проставлять текущую дату в качестве даты модификации объекта.
     * @param _id_flag (bool) необязательный, по умолчанию  false. true (значение присваивается только если _data_flag равен true)– проставлять, false –не проставлять текущий под сервера для не присвоенных объектов.
     * @return нет.
     * @example
     * ServerEval('tools.catalog_resave(\'' + _screen.catalog_name + '\',' + _save_flag + ',' + _id_flag + ')');
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    catalog_resave?(
        _catalog_name: String,
        _data_flag?: Bool,
        _id_flag?: Bool
    ): void;
    /**
     * Шифрует указанный курс для его использования в Personal WebTutor.
     * Входные параметры:
     * @param iCourseIDParam (int) ID курса.
     * @return нет.
     * @example
     * ServerEval( 'tools.encrypt_content(' + TopElem.Doc.DocID + ')' );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    encrypt_content?(iCourseIDParam: Integer): void;
    /**
     * Преобразует материал библиотеки, к которому приложен файл типа pdf в формат, доступный для чтения на портале WebTutor.
     * Входные параметры:
     * @param iMaterialId (int) ID материала библиотеки.
     * @return Doc материала библиотеки.
     * @example
     * ServerEval( 'tools.encrypt_content(' + TopElem.Doc.DocID + ')' );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    convert_pdf_libratry_material?(iMaterialId: Integer): any;
    /**
     * Инициализирует библиотеку для работы с лицензиями и зашифрованными с помощью этих лицензий объектами.
     * Входные параметры нет
     * @return нет.
     * @example
     * нет
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    init_encrypt_lib?(): void;
    /**
     * Свойство. Возвращает ссылку на объект библиотеки инициализированную функцией init_encrypt_lib.
     * Входные параметры нет
     * @return ссылка.
     * @example
     * tools.encrypt_lib.Object;
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    encrypt_lib?(): any;
    /**
     * Свойство. Возвращает объект библиотеки инициализированную функцией init_encrypt_lib.
     * Входные параметры нет
     * @return ссылка.
     * @example
     * tools.encrypt_lib_obj.Encrypt_Init();
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    encrypt_lib_obj?(): any;
    /**
     * Создает файл с объектом, зашифрованным с использованием указанной лицензией.
     * Входные параметры:
     * @param iLicenseId (int) ID лицензии для создания файла.
     * @param sOutPath (string) необязательный  строка пути до файла, по умолчанию это папка temp администратора или сервера WebTutor.
     * @return: (string) строка пути до файла.
     * @example
     * ServerEval('tools.create_license(' + TopElem.Doc.DocID + ', \'' + StrReplace(UrlToFilePath(sServerTempUrl), '\\', '\\\\') + '\')');
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    create_license?(iLicenseId: Integer, sOutPath?: String): String;
    /**
     * Восстанавливает значение для пустых констант в системе.
     * Входные параметры:
     * @param _lng_id (string) ID языка, для которого нужно восстановить значения констант.
     * @param _source (XML element) элемент, в дочерних элементах которого происходит поиск язык по _lng_id  для восстановления значений.
     * @return: (int) количество восстановленных элементов.
     * @example
     * iResCount = tools.recovery_empty_lng_const( fldLngChild.PrimaryKey, fldLngChild );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    recovery_empty_lng_const?(_lng_id: String, _source: XmlDoc): Integer;
    /**
     * Запускает системный агент на выполнение.
     * Входные параметры:
     * @param _agent_id (int) ID агента для запуска.
     * @param _element_id (int) необязательный  ID объекта, над которым запускается агента (например, в списке).
     * @param _elems_id_str(string) необязательный  ID объектов разделенных «;», над которым запускается агента (например, в списке).
     * @param dDateParam (data) необязательный  дата запуска агента, по умолчанию текущая дата.
     * @param sTenancyNameParam(string) необязательный  код экземпляра системы в multitenant системе, в котором нужно запустить агент.
     * @return флаг да/нет (bool) успех или неуспех выполнения агента.
     * @example
     * tools.start_agent( _agent_id, _element_id, _elems_id_str, dDate, sTenancyName );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    start_agent?(
        _agent_id: Integer,
        _element_id?: Integer,
        _elems_id_str?: String,
        dDateParam?: Date,
        sTenancyNameParam?: String
    ): Bool;
    /**
     * Импортирует данные, полученные из Personal WebTutor. Если в данных указан пользователь, который есть в системе, или ID пользователя передан в параметрах функции, то данные по обучению привязываются к нему.
     * Входные параметры:
     * @param _xml (string) –файл с данными XML.
     * @param _user_id (int) необязательный  ID пользователя для привязки полученных данных.
     * @param _report_id (int) необязательный  ID объекта событий базы, в которой добавится отчет о загрузке (если не указан, то будет создан новый отчет).
     * @param _file_url (string) необязательный  путь до файла с данными.
     * @return строка (string) с ERROR=1 если произошла ошибка, или строка вида ERROR=0\nPROCESS_NUM=Количество загруженных\nFAILED_NUM=количество не загруженных результатов.
     * @example
     * alert(tools.import_pwt_data_xml( LoadUrlData( _url ), null, null, _url ));
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    import_pwt_data_xml?(
        _: String,
        _user_id?: Integer,
        _report_id?: Integer,
        _file_url?: String
    ): String;
    /**
     * Используется в функции import_pwt_data_xml. Дешифрует XML с данные, полученные из Personal WebTutor.
     * Входные параметры:
     * @param _str (string) –строка для преобразования.
     * @return дешифрованная строка (string).
     * @example
     * _xml = tools.decript_pwt_data_str( _xml );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    decript_pwt_data_str?(_str: String): String;
    /**
     * Обновляет структуру разделов активных электронных курсов.
     * Входные параметры:
     * @param _learning_id (int) –– ID активного электронного курса структуру, которого нужно обновить.
     * @param _course_doc (TopElem) TopElem электронного курса, структура которого обновляется.
     * @param _doc_learning (Doc) необязательный  Doc активного электронного курса структуру, которого нужно обновить.
     * @return флаг (bool) да (true) в любом случае.
     * @example
     * tools.update_course_parts_structure( _learning.PrimaryKey, TopElem );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    update_course_parts_structure?(
        _learning_id: Integer,
        _course_doc: XmlElem,
        _doc_learning?: XmlDoc
    ): Bool;
    /**
     * Возвращает массив каталожных записей сотрудников, состоящий из непосредственных подчиненных указанного сотрудника.
     * Входные параметры:
     * @param iUserId (int) –– ID сотрудника, для которого идет поиск подчиенных.
     * @return массив каталожных записей сотрудников, состоящий из непосредственных подчиненных указанного сотрудника.
     * @example
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_direct_sub_person_ids?(iUserId: Integer): any;
    /**
     * Возвращает массив ID сотрудников указанного подразделения и дочерних подразделений.
     * Входные параметры:
     * @param _subdivision_id (int)  ID подразделения, сотрудников которого нужно найти.
     * @param sConditionsParam (string) необязательный  дополнительное условие для поиска сотрудников. Будет добавлено в условия поиска с использованием and в запросе.
     * @return массив ID сотрудников указанного подразделения и дочерних подразделений.
     * @example
     * _ids_array = tools.get_sub_person_ids_by_subdivision_id( _subdivision_id, sConditionsParam );
     * arrPersonID = tools.get_sub_person_ids_by_subdivision_id( curNodeID );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_sub_person_ids_by_subdivision_id?(
        _subdivision_id: Integer,
        sConditionsParam?: String
    ): any;
    /**
     * Возвращает массив каталожных записей сотрудников указанного подразделения и дочерних подразделений.
     * Входные параметры:
     * @param _subdivision_id (int)  ID подразделения, сотрудников которого нужно найти.
     * @param sConditionsParam (string) необязательный  дополнительное условие для поиска сотрудников. Будет добавлено в условия поиска с использованием and в запросе.
     * @return массив каталожных записей сотрудников указанного подразделения и дочерних подразделений.
     * @example
     *             array = tools.get_sub_persons_by_subdivision_id( ListElem.id );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_sub_persons_by_subdivision_id?(
        _subdivision_id: Integer,
        sConditionsParam?: String
    ): any;
    /**
     * Возвращает массив ID подчинённых сотрудников (как непосредственных, так и подчинённых подчиненных) указанного сотрудника.
     * Входные параметры:
     * @param _manager_id (int)  ID сотрудника, для которого нужно найти подчиненных.
     * @param _catalog_names (string) необязательный  native поиск только непосредственного руководителя по должности. not_native руководитель любого типа группы, сотрудника, подразделения, организации. Можно передать любой набор из следующих каталогов (collaborator, group, org,position, subdivision) , разделенных запятой. Тогда поиск будет происходить только среди объектов указанных каталогов.
     * vBossType (variant) true поиск только непосредственного руководителя. False поиск только функционального руководителя без признака непосредственный. Если передать ID нужного типа руководителя, то будет осуществлен поиск подчинённых сотрудников только для руководителя указанного типа.
     * @param iLimitParam (int) необязательный так как массив подчиненных может быть очень большим для руководителя высокого уровня и процесс поиска может быть достаточно долгим, то в этом параметре можно указать максимальное количество подчиненных для поиска. Если будет найдено больше записей, чем указанно, то будет возвращено только указанное количество, а процесс поиска будет остановлен.
     * @param sSearchParam (string) необязательный. Если задан, то ФИО подчиненных сотрудников должны  содержать указанные в параметре символы.
     * @return массив ID подчинённых сотрудников.
     * @example
     * personArray = tools.get_sub_person_ids_by_func_manager_id( curUserID );
     * curSubPersonIDsByManagerIDSearch = tools.get_sub_person_ids_by_func_manager_id( curUserID, null, null, null, search_fullname );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_sub_person_ids_by_func_manager_id?(
        _manager_id: Integer,
        _catalog_names?: String,
        iLimitParam?: Integer,
        sSearchParam?: String
    ): any;
    /**
     * Возвращает массив каталожных записей подчинённых сотрудников (как непосредственных, так и подчинённых подчиненных) указанного сотрудника.
     * Входные параметры:
     * @param iManagerIDParam (int)  ID сотрудника, для которого нужно найти подчиненных.
     * @param sCatalogNamesParam (string) необязательный  native поиск только непосредственного руководителя по должности. not_native руководитель любого типа группы, сотрудника, подразделения, организации. Можно передать любой набор из следующих каталогов (collaborator, group, org,position, subdivision) , разделенных запятой. Тогда поиск будет происходить только среди объектов указанных каталогов.
     * vBossType (variant) true поиск только непосредственного руководителя. False поиск только функционального руководителя без признака непосредственный. Если передать ID нужного типа руководителя, то будет осуществлен поиск подчинённых сотрудников только для руководителя указанного типа.
     * @return массив каталожных записей подчинённых сотрудников.
     * @example
     *             _res = tools.get_sub_persons_by_func_manager_id(initiator_person_id,'not_native');
     *             _res = tools.get_sub_persons_by_func_manager_id(initiator_person_id,'native');
     *             _res = tools.get_sub_persons_by_func_manager_id(initiator_person_id);
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_sub_persons_by_func_manager_id?(
        iManagerIDParam: Integer,
        sCatalogNamesParam?: String
    ): any;
    /**
     * Возвращает массив каталожных записей подчинённых подразделений (как непосредственных, так и дочерних) указанного сотрудника. Сотрудник может быть руководителем любого типа.
     * Входные параметры:
     * @param _manager_id (int)  ID сотрудника, для которого нужно найти подразделения.
     * @return массив каталожных записей подчинённых подразделений.
     * @example
     *             arrDepSubs=tools.get_all_subs_by_func_manager_id(iUserID)
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_all_subs_by_func_manager_id?(_manager_id: Integer): any;
    /**
     * Назначает тест в рамках тестирования с ДУ для участников указанного мероприятия.
     * Входные параметры:
     * @param _event_id (int) –– ID мероприятия, участникам которого назначается тест.
     * @param _doc_event (Doc) необязательный  Doc мероприятия.
     * @return измененный и сохраненный Doc мероприятия.
     * @example
     * ServerEval( 'tools.start_real_test(' + Ps.Doc.DocID + ')' );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    start_real_test?(_event_id: Integer, _doc_event?: XmlDoc): any;
    /**
     * Заполняет информацию о прохождении теста (annals) в карточке незавершённого теста, назначенного в рамках тестирования с ДУ для участников указанного мероприятия. Тест завершается. Действия производятся со всеми участниками мероприятия, которым был назначен данный тест.
     * Входные параметры:
     * @param _text (Xml) Xml  с данными о прохождении теста участниками.
     * @param _assessment_id (int) –– ID теста.
     * @param _assessment_doc (TopElem) необязательный  –TopElem теста.
     * @return количество (int) участников мероприятия, для которых была внесена информация по тесту.
     * @example
     * ServerEval( 'tools.put_collaborator_annals(\'' + formDoc.Xml + '\',' + TopElem.assessment_id + ')' );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    put_collaborator_annals?(
        _text: XmlDoc,
        _assessment_id: Integer,
        _assessment_doc?: XmlElem
    ): Integer;
    /**
     * Завершает тест, назначенный в рамках тестирования с ДУ для участников указанного мероприятия. Тест завершается. Действия производятся со всеми участниками мероприятия, которым был назначен данный тест.
     * Входные параметры:
     * @param _event_id (int) необязательный,  если передан _doc_event –– ID мероприятия.
     * @param _doc_event (Doc) необязательный  –Doc мероприятия теста.
     * @param _assessment_id (int) необязательный –– ID теста.
     * @param _assessment_doc (TopElem) необязательный  –TopElem теста.
     * @return нет.
     * @example
     * ServerEval( 'tools.finish_real_test(' + Ps.Doc.DocID + ')' );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    finish_real_test?(
        _event_id?: Integer,
        _doc_event?: XmlDoc,
        _assessment_id?: Integer,
        _assessment_doc?: XmlElem
    ): void;
    /**
     * Выполняет eval указного в параметрах функции файла.
     * Входные параметры:
     * @param _url (string) –– путь до файла.
     * @param _doc_id (int) необязательный  если указан, то будет открыт объект по указанному id. В этом случае в коде файла, открытый объект будет доступен в коде. docObject – Doc открытого объекта, TopElem – TopElem открытого объекта, Ps – TopElem открытого объекта.
     * @param _rnd_id (string) необязательный ––  строка с названием файла. Если указана, то после выполнения eval файла, результат будет сохранен в папку trash/temp/  с названием указанным в переменной.
     * @return –строка (string), полученная после eval файла.
     * @example
     *             ServerEval( 'tools.eval_code_page_url(\'x-local://templates/poll_results_report.html\',' + TopElem.Doc.DocID + ',' + _rnd_id + ')' );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    eval_code_page_url?(
        _url: String,
        _doc_id?: Integer,
        _rnd_id?: String
    ): String;
    /**
     * Свойство. ID текущего пользователя WebTutor администратор.
     * @example
     * tools.cur_user_id
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    cur_user_id?(): void;
    /**
     * Свойство. TopElem текущего пользователя WebTutor администратор.
     * @example
     * return cur_user.Object
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    cur_user?(): void;
    /**
     * Свойство. Список каталожных записей из групп текущего пользователя WebTutor администратор.
     * @example
     * cur_user_groups.Object
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    cur_user_groups?(): void;
    /**
     * Возвращает TopElem текущего пользователя WebTutor администратор из свойства cur_user.
     * Входные параметры нет.
     * @return TopElem текущего пользователя.
     * @example
     *             curUser = tools.get_cur_user();
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_cur_user?(): any;
    /**
     * Обновляет  текущего пользователя WebTutor администратор в свойстве cur_user и ID в cur_user_id.
     * Входные параметры нет.
     * @return TopElem текущего пользователя или null если заполнение не удалось.
     * @example
     *             tools.update_cur_user();
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    update_cur_user?(): any;
    /**
     * Возвращает список каталожных записей из групп текущего пользователя WebTutor администратор из свойства cur_user_groups.
     * Входные параметры нет.
     * @return список каталожных записей из групп текущего пользователя.
     * @example
     *             for ( _group in tools.get_cur_user_groups() )
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_cur_user_groups?(): any;
    /**
     * Обновляет  список каталожных записей из групп текущего пользователя WebTutor администратор в свойстве cur_user_groups.
     * Входные параметры нет.
     * @return список каталожных записей из групп текущего пользователя или null если заполнение не удалось.
     * @example
     *             tools.update_cur_user_groups();
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    update_cur_user_groups?(): any;
    /**
     * Обновляет указанный фильтр в администраторе WebTutor.
     * Входные параметры:
     * @param _source_conditions (Xml) –– структура, содержащая текущие условия поиска.
     * @param _catalog_name (string) ––  строка с названием каталога, для которого используется фильтр.
     * @param _scheme_id (string) необязательный  ID фильтра для обновления.
     * @param _set_flag (bool) необязательный. Если укащанный фильтр проставляется в качестве выбранного для каталога в администраторе WebTutor.
     * @return нет.
     * @example
     *             tools.update_filter_conditions( Ps.conditions, _filter_catalog, Ps.scheme_id );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    update_filter_conditions?(
        _source_conditions: XmlDoc,
        _catalog_name: String,
        _scheme_id?: String,
        _set_flag?: Bool
    ): void;
    /**
     * Проверяет доступ к объекту на основе настроек в «Отображении каталогов» для текущего пользователя в WebTutor администратор.
     * Входные параметры:
     * @param teObjectParam (TopElem) –– TopElem объекта, к которому проверяется доступ.
     * @return флаг (bool) да (true)  -доступ разрешен, нет (false) - доступ запрещен.
     * @example
     *             tools.admin_access_filling( TopElem );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    admin_access_filling?(teObjectParam: XmlElem): Bool;
    /**
     * Копирует параметры доступа к объекту  из одного объекта в другой.
     * Входные параметры:
     * @param _to_obj_id (int) необязательный,  если передан _to_obj_doc–– ID объекта, в который нужно скопировать параметры доступа.
     * @param _to_obj_doc (TopElem) необязательный  TopElem объекта, в который нужно скопировать параметры доступа.
     * @param _from_obj_id (int) необязательный,  если передан _from_obj_doc –– ID объекта, из которого нужно скопировать параметры доступа.
     * @param _from_obj_doc (TopElem) необязательный  объекта, из которого нужно скопировать параметры доступа.
     * @return нет.
     * @example
     *             tools.admin_access_copying('', docEventResult.TopElem, '', topElem);
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    admin_access_copying?(
        _to_obj_id?: Integer,
        _to_obj_doc?: XmlElem,
        _from_obj_id?: Integer,
        _from_obj_doc?: XmlElem
    ): void;
    /**
     * Используется в процессе выгрузке/загрузки данных в WebTutor при интеграции с другими системами. Заменяет в строке символы определенные символы в [].
     * [yyyy] меняется на 4 символа года из даты.
     * [yy] меняется на 2 последних символа года из даты.
     * [mm] и [m] меняется на месяц из даты.
     * [dd] и [d] меняется на день из даты.
     * [hh] и [h] меняется на часы из даты.
     * [mimi] и [mi] меняется на минуты из даты.
     * [ss] и [s] меняется на секунды из даты.
     * [AppDirectoryPath] меняется на функцию AppDirectoryPath().
     * Входные параметры:
     * @param _str (string) стока для преобразования.
     * @param _date (date) необязательный  дата, данные из которой берутся для замены символов в строке, по умолчанию текущая дата и время.
     * @return преобразованная строка (string).
     * @example
     *             var _path = tools.replace_temlate_tags( _source.db_path );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    replace_temlate_tags?(_str: String, _date?: Date): String;
    /**
     * Используется в администраторе в форме редактирования условий документооборота. Формирует на основе стандартных значений, доступных в выпадающем списке условий документооборота, строку. Эта строка в дальнейшем выполняется в eval для определения видимости/редактирования объектов по документообороту.
     * Входные параметры:
     * @param _conditions (Xml element) структура с условиями документооборота.
     *             <conditions>
     *                         <condition MULTIPLE="1">
     *             <type TYPE="string"/>
     *             <workflow_field_id TYPE="string"/>
     *             <workflow_field_value TYPE="string"/>
     *             <workflow_state_id TYPE="string"/>
     *             <cur_user_type TYPE="string"/>
     *             <and_or TYPE="string" NOT-NULL="1" DEFAULT="&amp;&amp;"/>
     *             <begin_bracket TYPE="string"/>
     *             <finish_bracket TYPE="string"/>
     *             <usl TYPE="string"/>
     *             <person_id TYPE="integer" FOREIGN-ARRAY="collaborators"/>
     *             <eval_str TYPE="string"/>
     *             <cur_access_role TYPE="string" FOREIGN-ARRAY="access_roles"/>
     *             <cur_parent_object_id TYPE="integer" FOREIGN-ARRAY="subdivisions"/>
     *             <org_id TYPE="integer" FOREIGN-ARRAY="orgs"/>
     *             <cur_position_id TYPE="integer" FOREIGN-ARRAY="positions"/>
     *             <cur_group_id TYPE="integer" FOREIGN-ARRAY="groups"/>
     *                         </condition>
     *             </conditions>
     * @param iWorkflowIDParam (int) необязательный,  если не используется условие с типом проверки определенного поля в документообороте (type =‘if_workflow_field_value ‘) или если передан параметр teWorkflowParam  ID документооборота.
     * @param teWorkflowParam (TopElem) необязательный,  если не используется условие с типом проверки определенного поля в документообороте (type =‘if_workflow_field_value ‘) TopElem документооборота.
     * @return –строка (string), которая может использоваться в eval для определения видимости/редактирования объектов по документообороту .
     * @example
     *             _action.condition_eval_str = tools.build_condition_eval_str( _action.conditions, TopElem.Doc.DocID, TopElem );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    build_condition_eval_str?(
        _conditions: XmlDoc,
        iWorkflowIDParam?: Integer,
        teWorkflowParam?: XmlElem
    ): String;
    /**
     * Используется для обновления данных по редактированию разделов на закладке «Редактирование разделов» в администраторе в разделе портала. Обновления происходят во всех дочерних элементов портала.
     * Входные параметры:
     * @param _obj_id (int)  ID измененного документа.
     * @param _obj_doc (TopElem) необязательный TopElem измененного документа.
     * @return количество изменённых дочерних элементов (int).
     * @example
     * tools.update_document_persons( TopElem.Doc.DocID, TopElem )
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    update_document_persons?(_obj_id: Integer, _obj_doc?: XmlElem): Integer;
    /**
     * Возвращает длительность в миллисекундах из xml тега period. Время в теге задано в формате P5Y2M10DT15H30M45S. Используется для разбора результатов курса
     * Входные параметры:
     * @param _period (string) строка с датой вида P5Y2M10DT15H30M45S.
     * @return длительность в миллисекундах (int).
     * @example
     *             tools.get_period_from_iso( _int.latency );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_period_from_iso?(_period: String): Integer;
    /**
     * Возвращает ID самого верхнего иерархии документа портала, на который разрешена подписка, относительно текущего документа. Используется для отправки сообщений об изменении документа портала.
     * Входные параметры:
     * oDocumentParam (variant) содержит либо ID документа для которого происходит поиск документов верхнего уровня, либо TopElem этого документа.
     * @return ID  (int) самого верхнего иерархии документа портала, на который разрешена подписка, относительно текущего документа или Null если такой документ не найден.
     * @example
     *             iDocumentID = tools.get_notification_document( TopElem );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_notification_document?(): Integer;
    /**
     * Возвращает ID центра затрат указанного сотрудника. Если не найден, то возвращает ID центра затрат, указного в общих настройках.
     * Входные параметры:
     * @param _person_id (int) необязательный, если передан параметр _person_doc ID сотрудника, для которого происходит поиск центра затрат.
     * @param _person_doc (TopElem) необязательный TopElem сотрудника, для которого происходит поиск центра затрат.
     * @return ID (int) центра затрат указанного сотрудника. Если не найден, то возвращает ID центра затрат, указного в общих настройках.
     * @example
     * fldPersonElem.cost_center_id = tools.get_cost_center_id_by_person_id( fldPersonElem.PrimaryKey );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_cost_center_id_by_person_id?(
        _person_id?: Integer,
        _person_doc?: XmlElem
    ): Integer;
    /**
     * Возвращает массив руководителей (руководителей по должности) центра затрат указанного сотрудника. Если не найдены, то возвращает пустой массив.
     * Входные параметры:
     * @param _person_id (int)  необязательный, если передан параметр _person_doc ID сотрудника, для которого происходит поиск руководителей центра затрат.
     * @param _person_doc (TopElem) необязательный TopElem сотрудника, для которого происходит поиск руководителей центра затрат.
     * @return массив каталожных записей сотрудников, являющихся руководителями центра затрат указанного сотрудника
     * @example
     * fldPersonElem.cost_center_id = tools.get_cost_center_id_by_person_id( fldPersonElem.PrimaryKey );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_cost_center_boss_by_person_id?(
        _person_id?: Integer,
        _person_doc?: XmlElem
    ): any;
    /**
     * Возвращает массив руководителей (руководителей по должности) указанного подразделения. Если не найдены, то возвращает пустой массив.
     * Входные параметры:
     * @param _sub_id (int)  ID подразделения, для которого происходит поиск руководителей.
     * @return массив руководителей (руководителей по должности) указанного подразделения.
     * @example
     * iBossID = ArrayOptFirstElem(tools.get_sub_boss_by_sub_id(fldOrphanSubElem.PrimaryKey));
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_sub_boss_by_sub_id?(_sub_id: Integer): any;
    /**
     * Возвращает сороку со временем (часами и/или минутами и/или секундами) из строки разделенную «:». Принимается строка вида 23:58:56. Если строка будет вида, например, 33:58:56, вернет null. Если нужно возвращать минуты и секунды, то вернет сроку вида 23:58:56.
     * Входные параметры:
     * @param _str (string)  строка для разбора.
     * @param _minite_flag (bool) необязательный возвращает минуты или нет. По умолчанию false.
     * @param _second_flag (bool)  необязательный возвращает секунды или нет. По умолчанию false.
     * @return строка (string) со временем.
     * @example
     * _start_time = tools.get_time( intervalArray[0] );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_time?(_str: String, _minite_flag?: Bool, _second_flag?: Bool): String;
    /**
     * Включает или выключает журнал веб запросов.
     * Входные параметры:
     * @param _flag (bool)  включит журнал веб запросов (true), или выключить (false).
     * @return нет.
     * @example
     * sLogEval = 'tools.enable_log_web_request(' + global_settings.settings.disp_log_web_request + ');'
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    enable_log_web_request?(_flag: Bool): void;
    /**
     * Прообразовывает содержание строки для сохранение в теге. Предназначено, преобразования тегов и ссылок на файлы в описании (тег desc).
     * Входные параметры:
     * @param _desc (string)  строка для преобразования.
     * @param _temp_dir (string) необязательный строка с путем до папки с файлами, указанными в теге.
     * @return преобразованная строка (string).
     * @example
     * TopElem.text_area = tools.desc_cleanup( TopElem.text_area );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    desc_cleanup?(_desc: String, _temp_dir?: String): String;
    /**
     * Возвращает название поле из тега TITLE xmd или xml формы для указанного языка. Если в теге есть «const=», то производится поиск значения указанного после «=» среди констант языка. Если в константах значение не найдено, то возвращается, то, что указано после «const=». Если «const=» не указано, то возвращается значение тега TITLE.
     * Входные параметры:
     * @param _field (XML element)  объект, представляющий собой XML поле, для которого нужно взять название.
     * @param curLngWeb (XML element) необязательный текущий язык, если не указан, берется язык пользовательского интерфейса в администраторе. При вызове на портале параметр обязателен.
     * @return название поле из тега TITLE xmd или xml формы для указанного языка (string).
     * @example
     * tools.get_field_title( fldReqFieldElem, curLngWeb )
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_field_title?(_field: XmlDoc, curLngWeb?: XmlDoc): String;
    /**
     * Заполняет структуру полей для использования в формах выбора условий относительно полей объекта или каталога. Применяется в диалогах построения фильтров, настраиваемых отчетах и т.д.
     * Входные параметры:
     * @param FIELD_NAMES (XML element)  структура полей вида.
     *             <field_names TEMP="1">
     *                                    <field_name MULTIPLE="1" PRIMARY-KEY="name" TEMP="1">
     *                                                <INHERIT TYPE="field_name_base" TEMP="1"/>
     *                                                <level TYPE="integer" DEFAULT="0" TEMP="1"/>
     *                                                <field_names TEMP="1">
     *                                                            <field_name MULTIPLE="1" PRIMARY-KEY="name" TEMP="1">
     *                                                                        <INHERIT TYPE="field_name_base" TEMP="1"/>
     *                                                                        <level TYPE="integer" DEFAULT="1" TEMP="1"/>
     *                                                                        <field_names TEMP="1">
     *                                                                                   <field_name MULTIPLE="1" PRIMARY-KEY="name" TEMP="1">
     *                                                                                               <INHERIT TYPE="field_name_base" TEMP="1"/>
     *                                                                                               <level TYPE="integer" DEFAULT="2" TEMP="1"/>
     *                                                                                   </field_name>
     *                                                                        </field_names>
     *                                                            </field_name>
     *                                                </field_names>
     *                                    </field_name>
     *             </field_names>
     * Где field_name_base структура вида:
     * <field_name_base SAMPLE="1" TEMP="1">
     *             <name TYPE="string" TEMP="1"/>
     *             <title TYPE="string" TEMP="1"/>
     *             <type TYPE="string" TEMP="1"/>
     *             <foreign_array TYPE="variant" TEMP="1"/>
     *             <foreign_catalog TYPE="string" TEMP="1"/>
     *             <value_int TYPE="integer" FOREIGN-ARRAY="foreign_array.Object" TEMP="1"/>
     *             <is_custom_field TYPE="bool" NOT-NULL="1" DEFAULT="false" TEMP="1"/>
     *             <is_multiple TYPE="bool" NOT-NULL="1" DEFAULT="false" TEMP="1"/>
     *             <is_array TYPE="bool" NOT-NULL="1" DEFAULT="false" TEMP="1"/>
     *             <value_multiple TYPE="string" MULTIPLE="1" FOREIGN-ARRAY="foreign_array.Object" TEMP="1"/>
     * </field_name_base>
     * @param FORM (XML element) форма (объект, каталог), из которой нужно заполнить данные.
     * @param ISCATALOG (bool) необязательный, по умолчанию true. Флаг показывающий использовать поля каталога (true), или объекта (false).
     * @param EVALPATH (XML элемент) необязательный. XML элемент в структуре FIELD_NAMES до элемента, который нужно заполнять. Задается в случае, если нужно заполнить один из дочерних элементов field_names, вложенных в элемент первого уровня field_names.
     * @param PRETITLE (string) необязательный. Префикс поля в FORM, из которой заполняется структура FIELD_NAMES. Передается, если нужно, например, заполнить данными из дочернего элемента типа multiple из FORM, значения по ключу.
     * @return нет.
     * @example
     * tools.fill_field_names( _child.field_names, TopElem.catalog_name, false, _field_part.field, _field_part.title + '[' + _field_part.array_key + ']' );
     * tools.fill_field_names(TopElem.field_names, TopElem.object_name);
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    fill_field_names?(
        FIELD_NAMES: XmlDoc,
        FORM: XmlDoc,
        ISCATALOG?: Bool,
        EVALPATH?: XmlDoc,
        PRETITLE?: String
    ): void;
    /**
     * Возвращает результат выполнения eval, определяемый формулой и параметрами вызова функции. SRC 1,2 - два поля-источника.            Если передать в качестве источника пустую строку: '' , то результатом будет текущая дата и время.
     * Входные параметры:
     * @param SRC1 (date)  необязательный,  по умолчанию текущая дата.
     * @param SRC2 (date)  необязательный,  по умолчанию текущая дата.
     * @param EVALSTR (string) -  формула, в которой источники (SRC1, SRC2) указываются как #1 и #2 соответственно.
     * @param PARAM1 (string) необязательный  - параметр, в который можно записать промежуточное значение, а потом вызвать его в другом месте написав @1. В параметре можно использовать источники (SRC1, SRC2) как #1 и #2 соответственно.
     * @param PARAM2 (string) необязательный  - параметр, в который можно записать промежуточное значение, а потом вызвать его в другом месте написав @2. В параметре можно использовать источники (SRC1, SRC2) как #1 и #2 соответственно.
     * @param PARAM3 (string) необязательный  - параметр, в который можно записать промежуточное значение, а потом вызвать его в другом месте написав @3. В параметре можно использовать источники (SRC1, SRC2) как #1 и #2 соответственно.
     * @return результат выполнения EVALSTR.
     * @example
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    DateFunc?(
        SRC1?: Date,
        SRC2?: Date,
        EVALSTR: String,
        PARAM1?: String,
        PARAM2?: String,
        PARAM3?: String
    ): any;
    /**
     * Сдвигает указанную дату на количество секунд заданное параметрами функции. Можно передать дни, часы, минуты и секунды для сдвига даты. Дни, часы, минуты будут пересчитаны в секунды.
     * Входные параметры:
     * @param DATE_VAL (date)  необязательный,  по умолчанию текущая дата.
     * @param DAYS (int)  необязательный,  по умолчанию 0.  Количество дней, на которое нужно сдвинуть текущую дату.
     * @param HOURS (int)  необязательный,  по умолчанию 0.  Количество часов, на которое нужно сдвинуть текущую дату.
     * @param MINUTES (int)  необязательный,  по умолчанию 0.  Количество минут, на которое нужно сдвинуть текущую дату.
     * @param SECONDS (int)  необязательный,  по умолчанию 0.  Количество секунд, на которое нужно сдвинуть текущую дату.
     * @return дата (date), полученная сдвигом указанной даты на необходимое количество дней, часов, минут и секунд.
     * @example
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    AdjustDate?(
        DATE_VAL?: Date,
        DAYS?: Integer,
        HOURS?: Integer,
        MINUTES?: Integer,
        SECONDS?: Integer
    ): Date;
    /**
     * Используется в настраиваемых отчетах для возврата названия тега, в котором хранится значение по типу данных этого значение. Значение затем будет показано пользователю  в ячейке отчета.
     * Входные параметры:
     * @param sDatatype (string)  тип данных.
     * @return строка (string), названия тега, в котором хранится значение по типу данных этого значение.
     * @example
     *             ArrayExtract(Ps.columns, 'tools.get_report_storage_field(This.datatype.Value)')
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_report_storage_field?(sDatatype: String): String;
    /**
     * Запускает построение настраиваемого отчета.
     * Входные параметры:
     * @param REPORT_ID (int) необязательный, если передан docReportParam. ID отчета для построения.
     * @param PS (Doc) необязательный Doc карточки отчета, если она открыта в интерфейсе администратора WebTutor. Данные (полсдение изменения) будут браться из нее.
     * @param docReportParam (Doc) необязательный Doc отчета.
     * @return Doc сохраненного отчета.
     * @example
     *             tools.build_report_remote(null, null, docCustomReport);
     * ServerEval('tools.build_report_remote(' + _cur_custom_report_id + ')');
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    build_report_remote?(
        REPORT_ID?: Integer,
        PS?: XmlDoc,
        docReportParam?: XmlDoc
    ): any;
    /**
     * Возвращает массив каталожных записей всех дочерних объектов указанного объекта, включая его самого.
     * Входные параметры:
     * @param NODE_ID (int) - ID объекта, для которого происходит поиск дочерних объектов.
     * @param NODE_CATALOG (string) название каталога без ‘s’ на конце, в котором нужно искать.
     * @param NODE_PARENT_FIELD (string) необязательны название поле, в котором указывается ID родительского элемента. По умолчанию parent_object_id.
     * @return - массив каталожных записей всех дочерних объектов указанного объекта, включая его самого.
     * @example
     * _elems_full = tools.get_sub_hierarchy(curUser.position_id.ForeignElem.parent_object_id ,'subdivision');
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_sub_hierarchy?(
        NODE_ID: Integer,
        NODE_CATALOG: String,
        NODE_PARENT_FIELD: String
    ): any;
    /**
     * Возвращает сформированный на основе кода печатной формы текст печатной формы.
     * Входные параметры:
     * oFormParam (variant) либо ID печатной формы, либо путь до файла печатной формы к папке templates.
     * @return - текст печатной формы (string).
     * @example
     * _result = tools.process_print_form( _cur_print_form_card.PrimaryKey );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    process_print_form?(): String;
    /**
     * Устаревшая функция. Вместо нее нужно использовать функцию tools.get_uni_user_boss. Возвращает каталожную запись непосредственного руководителя указанного объекта (подразделение, должность, сотрудник) либо по должности, либо функционального с типом «непосредственный» из карточки объекта или вышестоящего подразделения сотрудника.
     * Входные параметры:
     * OBJECT (variant) либо ID объекта либо TopElem объекта, для которого происходит поиск.
     * @return - каталожная запись непосредственного руководителя указанного объекта.
     * @example
     * COLLABORATOR_EXPERT_ID  = tools.get_user_boss(COLLABORATOR_USER_ID);
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_user_boss?(): any;
    /**
     * Функция, которая заполняет структуру path_subs в карточке преподавателя, для отображения пути штатного расписания на основе карточки сотрудника для внутренних преподавателей
     * Входные параметры:
     * @param _path_subs (XML element) структура для заполнения вида:
     *             <path_subs>
     *                         <path_sub MULTIPLE="1" PRIMARY-KEY="id">
     *                                    <id TYPE="integer" FOREIGN-ARRAY="subs"/>
     *                                    <type TYPE="string"/>
     *                                    <name TYPE="string"/>
     *                                    <parent_id TYPE="integer" FOREIGN-ARRAY="subs"/>
     *                         </path_sub>
     *             </path_subs>
     * @param _person_id (int) необязательный, если передан _person_doc. ID сотрудника.
     * @param _person_doc (TopElem) необязательный. TopElem сотрудника.
     * @return заполненная структура path_subs.
     * @example
     * tools.path_subs_filling( TopElem.path_subs, TopElem.person_id, null );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    path_subs_filling?(
        _path_subs: XmlDoc,
        _person_id?: Integer,
        _person_doc?: XmlElem
    ): any;
    /**
     * Функция возвращает строку вида «часы : минуты : секунды . миллисекунды», полученную из параметра функции (миллисекунды). Миллисекунды после «.» в результирующей строке передаются, если их значение больше нуля.
     * Входные параметры:
     * @param _mseconds (int)  количество миллисекунд.
     * @return строку вида «часы : минуты : секунды . миллисекунды» (string).
     * @example
     * tools.str_time_from_mseconds( Ps.time );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    str_time_from_mseconds?(_mseconds: Integer): String;
    /**
     * Функция возвращает строку с полным штатным расписанием (без должности). Штатное расписание разделено указанным в параметрах функции разделителем.
     * Входные параметры:
     * @param _personID (int) необязательный, если передан _personDoc. ID сотрудника.
     * @param _personDoc (TopElem) необязательный. TopElem сотрудника.
     * @param _depth (int) необязательный  - глубина штатного расписания, число, показывающее длину цепочки штатного расписания. Если 0, то показывается полная цепочка штатного расписания. По умолчанию 0.
     * @param _top (int) необязательный  - параметр направления показа штатного расписания. Если 1, то штатное расписание рассчитывается 'сверху', то есть от организации. Если 0, то штатное расписание рассчитывается 'снизу', то есть от должности сотрудника. По умолчанию 1.
     * @param _separator (string) необязательный  - разделитель. Если указана пустая строка '', по умолчанию используется разделитель ' -> '.
     * @return строка (string) с полным штатным расписанием (без должности).
     * @example
     * trSubsPath=tools.person_list_staff_by_person_id( fldPerson.id,fldPerson,9 )
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    person_list_staff_by_person_id?(
        _personID?: Integer,
        _personDoc?: XmlElem,
        _depth?: Integer,
        _top?: Integer,
        _separator?: String
    ): String;
    /**
     * Функция возвращает строку вида login@domainтекст письма на основе данных записи об адресе в стандарте X.400.
     * Входные параметры:
     * @param _x40_email (string) строка адреса в стандарте X.400.
     * @param _end_mail (string) - текст письма который будет добавлен к login@domain.
     * @return строка (string) вида login@domainтекст письма.
     * @example
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    convert_email_from_x40?(_x40_email: String, _end_mail: String): String;
    /**
     * Функция добавляет сотрудника в список оцениваемых в процедуре оценки. Планы и анкеты при этом не создаются.
     * Входные параметры:
     * @param _person_id (int) необязательный, если передан _person_doc. ID сотрудника.
     * @param _assessment_appraise_id (int) необязательный, если передан _doc_assessment_appraise. ID процедуры оценки, в которую нужно добавить сотрудника.
     * @param _person_doc (TopElem) необязательный. TopElem сотрудника.
     * @param _doc_assessment_appraise (Doc) необязательный. Doc процедуры оценки, в которую нужно добавить сотрудника.
     * @return изменённый и сохраненный документ (Doc) процедуры оценки.
     * @example
     * tools.add_person_to_assessment_appraise( iPersonID, iObjectID, null, docObject )
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    add_person_to_assessment_appraise?(
        _person_id?: Integer,
        _assessment_appraise_id?: Integer,
        _person_doc?: XmlElem,
        _doc_assessment_appraise?: XmlDoc
    ): XmlDoc;
    /**
     * Функция возвращает массив уникальных строк, состоящий из ID тегов из карточки значений классификаторов знаний. То есть в результате работы функции получаем только теги, которые привязаны хотя бы к одному значению.
     * Входные параметры нет.
     * @return массив уникальных строк, состоящий из ID тегов из карточки значений классификаторов знаний.
     * @example
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_tag_cloud?(): any;
    /**
     * Проверяет, что переданная строка не пустая и не содержит русские буквы или другие недопустимые в названии тегов XML символы. Функция используется для проверки правильности названия полей, создаваемых пользователем в интерфейсе (настраиваемые поля, настраиваемые типы документов).
     * Входные параметры:
     * @param FIELD (string) строка с названием поля (то что содержится в поле name, а не title).
     * @param IS_STRICT_BEGIN (bool) необязательный, по умолчанию false. Если true, то строка проверяется на наличие русских буквы или другие недопустимых в названии тегов XML символов.
     * @return флаг (bool) да – строка прошла проверку, нет не прошла проверку.
     * @example
     * tools.check_field_name( NewValue, true )
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    check_field_name?(FIELD: String, IS_STRICT_BEGIN?: Bool): Bool;
    /**
     * На основе указанного типа настраиваемого документа создает объект, содержащий в своих полях строковое описание XMD формы документа и XMD формы каталога, а так поле, по которому строится иерархия данного документа.
     * Входные параметры:
     * @param iDocTypeIDParam (int) необязательный, если передан teDocTypeParam. ID типа настраиваемого документа.
     * @param teDocTypeParam (TopElem) необязательный. TopElem типа настраиваемого документа.
     * @return объект  (object) , содержащий в поле object_form_str строковое описание XMD формы документа, в поле catalog_form_str описание XMD формы каталога, а так поле, по которому строится иерархия данного документа, в поле hier_field.
     * @example
     * oXmds = tools.get_doc_type_xmds( DOC_ID, TopElem );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_doc_type_xmds?(
        iDocTypeIDParam?: Integer,
        teDocTypeParam?: XmlElem
    ): Object;
    /**
     * На основе указанного типа настраиваемого документа проверяет возможность создания настраиваемого документа указанного типа и создает XMD формы документа и XMD формы каталога. При вызове функции в интерфейсе администратора будут выводится всплывающее сообщения об ошибках.
     * Входные параметры:
     * @param DOC_TOPELEM (TopElem) необязательный. TopElem типа настраиваемого документа.
     * @param DOC_ID (int) необязательный, если передан DOC_TOPELEM. ID типа настраиваемого документа.
     * @return флаг (bool) true – настраиваемый тип заполнен правильно, и можно создавать документ на его основе. False- настраиваемый тип заполнен неправильно, и создавать документ на его основе нельзя.
     * @example
     * tools.generate_doc_type_xmds(TopElem, TopElem.Doc.DocID);
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    generate_doc_type_xmds?(DOC_TOPELEM?: XmlElem, DOC_ID?: Integer): Bool;
    /**
     * На основе указанного типа настраиваемого документа регистрирует в базе объект по XMD форме документа и XMD форме каталога. После вызова функции объекты настраиваемого типа документа доступны в базе.
     * Входные параметры:
     * @param docDocTypePARAM (Doc) необязательный. Doc типа настраиваемого документа.
     * @param iDocIDParam (int) необязательный, если передан docDocTypePARAM. ID типа настраиваемого документа.
     * @return объект (object) содержащий следующие поля success (успешная или неуспешная регистрация нового объекта базы), object_form_url (url до XMD формы документа), catalog_form_url (url до XMD формы каталога), catalog_form_hash (Hash XMD формы каталога), catalog (названия нового типа документов).
     * @example
     * oReturnValue = tools.register_doc_type(null, catDocTypeElem.id);
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    register_doc_type?(docDocTypePARAM?: XmlDoc, iDocIDParam?: Integer): Object;
    /**
     * Создает сертификаты указанного типа для всех участников указанного мероприятия.
     * Входные параметры:
     * @param _even_id (int) необязательный, если передан _doc_event. ID мероприятия.
     * @param _type_id (int) ID типа сертификата.
     * @param _doc_event (Doc) необязательный. Doc мероприятия.
     * @return количество созданных сертификатов (int).
     * @example
     * counter_act = counter_act + Int(ServerEval( 'tools.create_certificate_to_event(' + TopElem.Doc.DocID + ',' + _value.key + ')' ));
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    create_certificate_to_event?(
        _even_id?: Integer,
        _type_id: Integer,
        _doc_event?: XmlDoc
    ): Integer;
    /**
     * Создает сертификаты указанного типа для указанного сотрудника. Если указанно мероприятие, то сертификат привязывается к  указанному мероприятию.
     * Входные параметры:
     * @param _person_id (int) необязательный, если передан _person_doc. ID сотрудника.
     * @param _type_id (int) необязательный, если передан _type_doc. ID типа сертификата.
     * @param _even_id (int) необязательный, если передан _event_doc или если в сертификате не указывается мероприятие. ID мероприятия.
     * @param _person_doc (TopElem) необязательный. TopElem сотрудника.
     * @param _type_doc (TopElem) необязательный. TopElem типа сертификата.
     * @param _event_doc (TopElem) необязательный. TopElem мероприятия.
     * @return документ созданного сертификата (Doc).
     * @example
     * tools.create_certificate_to_person( _person.PrimaryKey, _type_id, Doc.DocID, null, serttypeDoc, Child(0).Parent ).TopElem;
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    create_certificate_to_person?(
        _person_id?: Integer,
        _type_id?: Integer,
        _even_id?: Integer,
        _person_doc?: XmlElem,
        _type_doc?: XmlElem,
        _event_doc?: XmlElem
    ): XmlDoc;
    /**
     * Возвращает ID самой верхней в иерархии родительской статьи форума.
     * Входные параметры:
     * @param iForumEntryParam (int) необязательный, если передан teForumEntryParam. ID статьи форума.
     * @param _ teForumEntryParam (TopElem) необязательный. TopElem статьи форума.
     * @return ID самой верхней в иерархии родительской статьи форума (int).
     * @example
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_main_forum_entry_by_forum_entry_id?(
        iForumEntryParam?: Integer,
        _?: XmlElem
    ): Integer;
    /**
     * Создает объект присвоенной квалификации для указанного сотрудника.
     * Входные параметры:
     * @param _person_id (int) ID сотрудника.
     * @param _even_id (int) необязательный, если в квалификации не указывается мероприятие. ID мероприятия.
     * @param _qualification_id (int) ID квалификации, которая присваивается.
     * @param _assignment_date (date) необязательный, дата присвоения квалификации.
     * @param _expiration_date (date) необязательный, дата истечения квалификации.
     * _qualification_test_array необязательный массив id тестов, на основе которых присваивается квалификация.
     * _qualification_course_array необязательный массив id курсов, на основе которых присваивается квалификация.
     * @param _send_mail (int) необязательный отправлять (1) или нет (0) уведомление о присвоении квалификации. Отправляется только при изменении статуса (параметр _in_process).
     * @param _in_process (int) необязательный проставлять статус в процессе (1) или присвоена (0) по умолчанию 1.
     * @return документ созданной присвоенной квалийикации (Doc).
     * @example
     * docQualificationAssignment = tools.assign_qualification_to_person( iPersonID, null, curObjectID,DateNewTime(Date(),00,00,00),null,[],[],0,1 );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    assign_qualification_to_person?(
        _person_id: Integer,
        _even_id?: Integer,
        _qualification_id: Integer,
        _assignment_date?: Date,
        _expiration_date?: Date,
        _send_mail?: Integer,
        _in_process?: Integer
    ): XmlDoc;
    /**
     * Создает объект присвоенной квалификации для всех участников указанного мероприятия.
     * Входные параметры:
     * @param _even_id (int) необязательный, если передан _doc_event. ID мероприятия.
     * @param _doc_event (Doc) необязательный. Doc мероприятия.
     * @param _qualification_id (int) ID квалификации.
     * @param _date (date) необязательный, дата присвоения квалификации.
     * @return количество созданных присвоенных квалификаций (int).
     * @example
     * _eval_str = 'tools.assign_qualification_to_event(' + TopElem.Doc.DocID + ',null,' + _value.key + ',&quot;' + Date() + '&quot;)';
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    assign_qualification_to_event?(
        _even_id?: Integer,
        _doc_event?: XmlDoc,
        _qualification_id: Integer,
        _date?: Date
    ): Integer;
    /**
     * Создает xms форму пользовательского интерфейса.
     * Входные параметры:
     * TEMPLATE (variant) ID или TopElem объекта пользовательский интерфейс.
     * @return флаг true – создание успешно завершено, false создание неуспешно (bool).
     * @example
     * tools.save_custom_ui_form(TopElem)
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    save_custom_ui_form?(): Bool;
    /**
     * Возвращает xms форму для указанного каталога, создаваемого из типа настраиваемого документа. Если для типа документа создан свой пользовательский интерфейс, то документ откроется с его использованием. В противном случае откроется с использованием формы по умолчанию.
     * Входные параметры:
     * @param CATALOG_NAME (string) название каталога, создаваемого из типа настраиваемого документа.
     * @return SPXML-SCREEN.
     * @example
     * CreateDocScreen( docObject, tools.get_custom_document_form( TopElem.catalog_name ) );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_custom_document_form?(CATALOG_NAME: String): XmlDoc;
    /**
     * Устаревшая функция. Больше не используется. Возвращает путь до XMD формы для указанного каталога или объекта, создаваемого из типа настраиваемого документа
     * Входные параметры:
     * @param sCatalogNameParam (string) название каталога с ‘s’ на конце, создаваемого из типа настраиваемого документа, если нужен путь до формы каталога.  Или название объекта без ‘s’ на конце, создаваемого из типа настраиваемого документа, если нужен путь до формы объекта.
     * @return путь до формы (string).
     * @example
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_custom_document_data_form_url?(sCatalogNameParam: String): String;
    /**
     * Функция возвращает строку с полным путем из родительских элементов карты знаний (значений) без классификатора. Путь разделен указанным в параметрах функции разделителем.
     * Входные параметры:
     * @param _knowledge_partID (int)  необязательный, если передан_knowledge_partDoc. ID значения, для которого нужно найти пусть.
     * @param _knowledge_partDoc  (TopElem) необязательный. TopElem значения, для которого нужно найти пусть.
     * @param _depth (int) необязательный  - глубина пути, число, показывающее длину цепочки в пути. Если 0, то показывается полная цепочка пути. По умолчанию 0.
     * @param _top (int) необязательный  - параметр направления показа пути. Если 1, то путь  рассчитывается 'сверху', то есть от классификатора. Если 0, то путь рассчитывается 'снизу', то есть от текущего значения. По умолчанию 1.
     * @param _separator (string) необязательный  - разделитель. Если указана пустая строка '', по умолчанию используется разделитель ' -> '.
     * @return строка (string) полным путем из родительских элементов карты знаний (значений) без классификатора.
     * @example
     * _kp.full_path = tools.knowledge_part_path_by_knowledge_part_id(_value.key)
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    knowledge_part_path_by_knowledge_part_id?(
        _knowledge_partID?: Integer,
        _knowledge_partDoc?: XmlElem,
        _depth?: Integer,
        _top?: Integer,
        _separator?: String
    ): String;
    /**
     * Возвращает список каталожных записей из сотрудников, являющихся непосредственными руководителями указанного объекта (организации, подразделение, должности, сотрудника) либо по должности, либо функционального с типом «непосредственный» из карточки объекта или вышестоящего подразделения, организации (если они определены для данного типа объекта). Для сотрудника, так же учитывается функциональный руководитель группы.
     * Входные параметры:
     * objectParam (variant)  либо ID объекта, либо Doc объекта, либо TopElem объекта, для которого идет поиск руководителей.
     * @param oParams (object)  необязательный. Объект, который может содержать следующие поля
     * @param object_id (int) - ID объекта, для которого идет поиск руководителей.
     * @param return_object_type (string) строка, задающая тип возвращаемых данных, если collaborator, то возвращаются каталожные записи каталога collaborator иначе каталога func_managers.
     * @param return_object_value(string) строка, задающая тип возвращаемых данных, если id, то возвращаются не каталожные записи, а id из каталога collaborator или  каталога func_managers в зависимости от параметра return_object_type.
     * @return список каталожных записей из сотрудников, являющихся непосредственными руководителями указанного объекта.
     * @example
     * for ( iBossIDElem in tools.get_uni_user_bosses( objDoc.person_id, { 'return_object_type': 'collaborator', 'return_object_value': 'id' } ) )
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_uni_user_bosses?(
        oParams?: Object,
        object_id: Integer,
        return_object_type: String,
        return_object_value: String
    ): any;
    /**
     * Возвращает каталожную запись сотрудника, являющегося непосредственными руководителями указанного объекта (организации, подразделение, должности, сотрудника) либо по должности, либо функционального с типом «непосредственный» из карточки объекта или вышестоящего подразделения, организации (если они определены для данного типа объекта). Для сотрудника, так же учитывается функциональный руководитель группы. По сути возвращается первый руководитель из массива, полученного из функции tools.get_uni_user_bosses.
     * Входные параметры:
     * objectParam (variant)  либо ID объекта, либо Doc объекта, либо TopElem объекта, для которого идет поиск руководителей.
     * @return каталожную запись сотрудника, являющегося непосредственными руководителями указанного объекта.
     * @example
     * _expert_person = tools.get_uni_user_boss(USER_PERSON_ID);
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_uni_user_boss?(): any;
    /**
     * Вызов эскалации по документообороту.
     * Входные параметры:
     * @param _source (Doc)  документ (Doc) объекта, относительно которого вызывается действие.
     * _escalation_code (sting) код эскалации документооборота.
     * @param _workflow_id (int) ID документооборота.
     * @param _workflow_doc (TopElem) необязательный –TopElem документооборота.
     * @param _alterCurObjectID (int) необязательный. Если эскалация документооборота, это печать печатной формы, то можно передать в этот параметр ID объекта, который будет передаваться в печатную форму как object_id.
     * @return флаг (bool) всегда true
     * @example
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    workflow_escalation_process?(
        _source: XmlDoc,
        _workflow_id: Integer,
        _workflow_doc?: XmlElem,
        _alterCurObjectID?: Integer
    ): Bool;
    /**
     * Свойство (string), содержит url’ы всех каталогов, в которых есть значения карты значений, разделенных “;”.
     * @example
     * StrContains(tools.knowledge_form_list, UrlFileName(SrcDoc.FormUrl));
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    knowledge_form_list?(): void;
    /**
     * Возвращает список каталожных записей из профилей компетенции, указанного сотрудника. Данные собираются из кодов профилей, указных в должности сотрудника и из профиля компетенции, указанного в должности сотрудника. Если в должности сотрудника не найдены профили компетенции, то берется профиль из типовой должности, привязанной к должности сотрудника (если связь есть).
     * Входные параметры:
     * objectParam (variant)  либо ID сотрудника, либо Doc сотрудника, либо TopElem сотрудника.
     * @return список каталожных записей из профилей компетенции, указанного сотрудника.
     * @example
     * arrProfiles=tools.get_user_comp_profiles(TopElem.person_id)
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_user_comp_profiles?(): any;
    /**
     * Заполняет пакет данными из пакета источника. Возвращает количество обработанных объектов в пакете.
     * Входные параметры:
     * @param fldPackageTarget (TopElem)  TopElem  пакета, в который нужно копировать данные.
     * @param fldSourceParam (TopElem)  TopElem  пакета, из которого нужно копировать данные.
     * @return количество скопированных элементов (int).
     * @example
     * tools.package_log_filling( fldPackageChild, teUpdate );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    package_log_filling?(
        fldPackageTarget: XmlElem,
        fldSourceParam: XmlElem
    ): Integer;
    /**
     * Функция, которая формирует строку на основе переменных элемента шаблона, шаблона документа, удаленного действия, выгрузки и т.д. Эту строку затем используют в выражении типа eval вместе с кодом элемента шаблона, шаблона документа, удаленного действия, выгрузки и т.д. Таким образом, инициализируются переменные нужного типа и им присваиваются значения, которые затем видны в коде элемента шаблона, шаблона документа, удаленного действия, выгрузки и т.д.
     * Входные параметры:
     * @param listWVarsPARAM (XML element) структура описывающая переменные вида:
     *             <wvars>
     *                         <wvar MULTIPLE="1" PRIMARY-KEY="name">
     *                                    <name TYPE="string"/>
     *                                    <parent_wvar_name TYPE="string" FOREIGN-ARRAY="BaseMultipleElem"/>
     *                                    <value TYPE="string"/>
     *                                    <type TYPE="string" NOT-NULL="1" DEFAULT="string" FOREIGN-ARRAY="common.template_field_types"/>
     *                                    <catalog TYPE="string" FOREIGN-ARRAY="common.exchange_object_types"/>
     *                                    <entries>
     *                                                <entry MULTIPLE="1" PRIMARY-KEY="id">
     *                                                            <id TYPE="string"/>
     *                                                            <name TYPE="string"/>
     *                                                </entry>
     *                                    </entries>
     *                                    <description TYPE="string" TITLE="1"/>
     *                                    <is_modify TYPE="bool" NOT-NULL="1" DEFAULT="false" TEMP="1"/>
     *                                    <position TYPE="integer" NOT-NULL="1" DEFAULT="0"/>
     *                         </wvar>
     *             </wvars>
     * @param bWarily (bool) необязательный по умолчанию false. Если передается true, то при вычислении первоначального значение переменной, код будет помещен в try{}catch{}. То есть если произойдет ошибка вычисления, то код не прервет свое выполнение, а переменной  будет присвоено значение по умолчанию соответствующего типа.
     * @return строка (string), полученная на основе переменных элемента шаблона, шаблона документа, удаленного действия, выгрузки и т.д..
     * @example
     * var s_anti_str = tools.wvars_to_script(TopElem.wvars, false);
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    wvars_to_script?(listWVarsPARAM: XmlDoc, bWarily?: Bool): String;
    /**
     * Функция, которая формирует объект на основе переменных элемента шаблона, шаблона документа, удаленного действия, выгрузки и т.д. Объект будет иметь следующий вид. Свойство(property) это название переменной. Значение свойства это value переменной, как оно заполнено в структуре параметров (listWVarsPARAM).
     * Входные параметры:
     * @param listWVarsPARAM (XML element) структура описывающая переменные вида:
     *             <wvars>
     *                         <wvar MULTIPLE="1" PRIMARY-KEY="name">
     *                                    <name TYPE="string"/>
     *                                    <parent_wvar_name TYPE="string" FOREIGN-ARRAY="BaseMultipleElem"/>
     *                                    <value TYPE="string"/>
     *                                    <type TYPE="string" NOT-NULL="1" DEFAULT="string" FOREIGN-ARRAY="common.template_field_types"/>
     *                                    <catalog TYPE="string" FOREIGN-ARRAY="common.exchange_object_types"/>
     *                                    <entries>
     *                                                <entry MULTIPLE="1" PRIMARY-KEY="id">
     *                                                            <id TYPE="string"/>
     *                                                            <name TYPE="string"/>
     *                                                </entry>
     *                                    </entries>
     *                                    <description TYPE="string" TITLE="1"/>
     *                                    <is_modify TYPE="bool" NOT-NULL="1" DEFAULT="false" TEMP="1"/>
     *                                    <position TYPE="integer" NOT-NULL="1" DEFAULT="0"/>
     *                         </wvar>
     *             </wvars>
     * @return объект (object), полученный  на основе переменных элемента шаблона, шаблона документа, удаленного действия, выгрузки и т.д..
     * @example
     * oCollectionParam = tools.wvars_to_object( TopElem.wvars );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    wvars_to_object?(listWVarsPARAM: XmlDoc): Object;
    /**
     * Копирует папку с файлами, включая все подпапки из указанного источника в указанный преемник. Если преемник не существует, то он создается по указанному адресу.
     * Входные параметры:
     * @param sSourceDirPARAM (stirng) путь до папки источника.
     * @param sDestDirPARAM (stirng) путь до папки преемника.
     * @return флаг (bool) true – копирование удалось, false – копирована не удалось.
     * @example
     * tools.copy_directory(sFileName, sTempDir)
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    copy_directory?(sSourceDirPARAM: String, sDestDirPARAM: String): Bool;
    /**
     * Отправляет уведомления участникам мероприятия (участникам мероприятия, руководителям участников, преподавателям, ответственным за проведения, ответственным за подготовку) в соответствии с настройками мероприятия и типом отправки (всем участникам, новым участникам, тем участникам, кому не было отправлено).
     * Входные параметры:
     * @param _event_id (int)  необязательны, если передан _doc_event ID мероприятия.
     * @param _doc_event (Doc) необязательный Doc документ карточки мероприятия. send_type send_type  (stirng) необязательный, по умолчанию all. Задает способ отправки уведомления для участников мероприятия (руководители участников, преподаватели, ответственные за проведения, ответственные за подготовку не учитываются в этом параметре). Значения all - отправка всем участникам, new - отправка новым участникам, not_send  отправка тем участникам, кому не было отправлено.
     * @return флаг (bool) true – в любом случае.
     * @example
     * tools.send_event_notifications(TopElem.Doc.DocID,TopElem.Doc,sending_type)
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    send_event_notifications?(_event_id: Integer, _doc_event?: String): Bool;
    /**
     * Преобразует строку в объект. Например, строку в формате json в объект. Или строку, содержащую XML, в объект.
     * Входные параметры:
     * @param sSomeObjectPARAM (stirng) строка в формате json или строка, содержащая XML.
     * @return полученный объекта (object).
     * @example
     * oUrlResult = tools.read_object(call_method(  'getSaveFileUrl', oParam, 'json' ));
     * oResult = tools.read_object(sResult);
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    read_object?(sSomeObjectPARAM: String): Object;
    /**
     * Преобразует массив в строку указанного формата (json, xml).
     * Входные параметры:
     * @param _aArrayPARAM (array) массив для преобразования.
     * @param _sFormatPARAM (string) необязательный по умолчанию XML. Возможны два значения (json, xml). Задает формат возвращаемой строки.
     * @param _sNamePARAM (string) необязательный по умолчанию data. Если формируется строка в формате XML, то параметр указывает название корневого (root) тега. По умолчанию <data></data>.
     * @return строка (string) полученная из массива.
     * @example
     * oResulter.result = tools.array_to_text(RESULT, sDataTypePARAM);
     * var sSerialized = '(' + tools.array_to_text(aCatalogsToRegPARAM, 'json') + ')';
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    array_to_text?(
        _aArrayPARAM: Array,
        _sFormatPARAM?: String,
        _sNamePARAM?: String
    ): String;
    /**
     * Преобразует массив или объект в строку указанного формата (json, xml).
     * Входные параметры:
     * @param _aDataPARAM (variant) массив array или объект (object) для преобразования.
     * @param _sName (string) необязательный по умолчанию null. Если не null, то параметр указывает название тега (для XML) или свойства (json), в который будут заключены данные, полученные из _aDataPARAM.
     * @param _bObj (bool) флаг true преобразуется объект, false – преобразуется массив.
     * @param _sFormatPARAM (string) необязательный по умолчанию XML. Возможны два значения (json, xml). Задает формат возвращаемой строки.
     * @return строка (string) полученная из массива или объекта.
     * @example
     * return tools.merge_text_array(_aPairs, (_sFormatPARAM == 'json' ? null: _sNamePARAM), false, _sFormatPARAM);
     * return tools.merge_text_array(_aSubPairs, null, (_iObjType == 1 || _iObjType == 2), _sFormatPARAM);
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    merge_text_array?(
        _aDataPARAM: Object,
        _sName?: String,
        _bObj: Bool,
        _sFormatPARAM?: String
    ): String;
    /**
     * Преобразует объект в строку указанного формата (json, xml).
     * Входные параметры:
     * @param _vObjectPARAM (object) объект (object) для преобразования.
     * @param _sFormatPARAM (string) по умолчанию XML. Возможны два значения (json, xml). Задает формат возвращаемой строки.
     * @param __iDepth (int) необязательный по умолчанию 0. Глубина дочерних свойств объекта, до которой можно спускаться. Должна быть не больше 5.
     * @param _sName (string) необязательный. Параметр указывает название тега (для XML), в который будут заключены данные, полученные из _vObjectPARAM. По умолчанию <value></value>.
     * @return строка (string) полученная из объекта.
     * @example
     * docElem.TopElem.result = tools.object_to_text(RESULT,'json');
     * _vValue = tools.object_to_text(_vValue, _sFormatPARAM, iDepth + 1, _sName);
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    object_to_text?(
        _vObjectPARAM: Object,
        _sFormatPARAM: String,
        __iDepth?: Integer,
        _sName?: String
    ): String;
    /**
     * Сохраняет версию объекта для объекта каталога, для которого проставлен флаг сохранения версий в администраторе. При этом создается объект в каталоге «Версии объекта».
     * Входные параметры:
     * @param oDocParam (Doc) объекта, версия которого сохраняется.
     * @return нет.
     * @example
     * tools.create_object_version( Doc );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    create_object_version?(oDocParam: XmlDoc): void;
    /**
     * Возвращает массив из обязательных обучений сотрудника, в которые входит переданный объект. Обязательные обучения указываются в требованиях к следящим объектам сотрудника должность, типовая должность, группа подразделений, семейство должностей, группа.   Массив состоит из следующих полей.
     * source_object_id ID Объекта, в котором указано необходимое обучение (должность, типовая должность, группа подразделений, семейство должностей, группа)
     * source_object_type тип объекта (каталог объекта), в котором указано необходимое обучение (должность, типовая должность, группа подразделений, семейство должностей, группа).
     * source_object_name название конкретного объекта (должность, типовая должность, группа подразделений, семейство должностей, группа).
     * object_id id объекта обучения, в который входит переданный объект. Если переданный объект это курс, то это Id учебной программы. Если переданный объект это тест, то это Id теста. Если переданный объект это модульная программ, то это Id модульной программы. Если переданный объект это учебная программа, то это Id учебной программы.
     * object_type - тип объекта (каталог объекта) обучения, в который входит переданный объект. Если переданный объект это курс, то это учебная программа. Если переданный объект это тест, то это тест. Если переданный объект это модульная программ, то это модульная программы. Если переданный объект это учебная программа, то это учебная программа.
     * object_name название конкретного объекта обучения, в который входит переданный объект. Если переданный объект это курс, то это название учебной программы. Если переданный объект это тест, то это название теста. Если переданный объект это модульная программа, то это название модульной программы. Если переданный объект это учебная программа, то это название учебной программы.
     * Входные параметры:
     * @param iPersonIDParam (int)  ID сотрудника.
     * @param iObjectIDParam (int)  ID объекта обучения.
     * @param tePersonParam (TopElem) TopElem сотрудника.
     * @param teObjectParam (TopElem) TopElem объекта обучения.
     * @return массив из обязательных обучений сотрудника, в которые входит переданный объект.
     * @example
     * arrRecommendation = tools.get_mandatory_learnings( curUserID, curObjectID, curUser, curObject );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_mandatory_learnings?(
        iPersonIDParam: Integer,
        iObjectIDParam: Integer,
        tePersonParam: XmlElem,
        teObjectParam: XmlElem
    ): any;
    /**
     * Возвращает массив из каталожных записей функциональных руководителей (func_managers). Отбираются те функциональные руководители, где сотрудник, переданный в качестве первого параметра, является руководителем сотрудника (сотрудников, подразделений, организаций, групп), переданных во втором параметре. Руководитель может быть любого типа для объектов должность, группа, подразделение, организация, сотрудник.
     * Входные параметры:
     * objectParam (variant)  либо ID объекта, либо Doc объекта, либо TopElem объекта, для которого идет поиск руководителей относительно сотрудника (сотрудников), переданных во втором параметре.
     * oPersonParam (variant)  либо ID сотрудника для которого ищется руководителя, либо массив элементов (сотрудников, подразделений, организаций, групп).
     * @return Возвращает массив из каталожных записей функциональных руководителей (func_managers).
     * @example
     * arrBossTypes =  tools.get_relative_boss_types( curUserID, iSubdivId );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_relative_boss_types?(): any;
    /**
     * Возвращает массив из каталожных записей операций, определяемых типами руководителей из массива функциональных руководителей (func_managers), который передается в функцию. Возвращает объединение операций доступных отдельному типу руководителя.
     * Входные параметры:
     * @param oManagerParam (array)  массив из каталожных записей функциональных руководителей (func_managers).
     * @return –массив из каталожных записей операций (operations).
     * @example
     * xarrOperations = tools.get_relative_operations_by_boss_types(xarrBossTypes);
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_relative_operations?(oManagerParam: Array): any;
    /**
     * Проверяет, входит ли указанная операция в массив из операций, определяемых типами руководителей из массива функциональных руководителей (func_managers), который передается в функцию.
     * Входные параметры:
     * @param oManagerParam (array)  массив из каталожных записей функциональных руководителей (func_managers).
     * @param oOperationParam (variant) либо ID операции, либо код (string) действия (action), которое привязано к операции.
     * @return флаг (bool), true, если указанная операция входит в массив из операций, false, если не входит.
     * @example
     * bCheck = tools.check_relative_operation(tools.get_relative_boss_types( curUserID, catCollab.id ), 'block_access_person');
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    check_relative_operation?(
        oManagerParam: Array,
        oOperationParam: String
    ): Bool;
    /**
     * Возвращает массив из каталожных записей типов функциональных руководителей (boss_types), доступных указанному пользователю относительно указанного объекта. То есть возвращает все типы руководителя, относительно указанного объекта
     * Входные параметры:
     * @param iUserIDParam (int)  ID сотрудника, для которого нужно определить список типов функциональных руководителей.
     * @param iObjectIDParam (int) ID объекта, относительно которого нужно определить список типов функциональных руководителей.
     * @return массив из каталожных записей типов функциональных руководителей (boss_types), доступных указанному пользователю относительно указанного объекта.
     * @example
     * xarrBossTypes = tools.get_object_relative_boss_types(curUserID, curObjectID);
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_object_relative_boss_types?(
        iUserIDParam: Integer,
        iObjectIDParam: Integer
    ): any;
    /**
     * Возвращает массив из каталожных записей операций, определяемых типами руководителей  (boss_types), который передается в функцию. Возвращает объединение операций доступных отдельному типу руководителя. При этом возвращаются только операции, привязанные к определённом (заданному параметрами функции) типу объекта (каталога) или все операции, если тип не указан.
     * Входные параметры:
     * @param arrBossTypesParam (array)  массив каталожных записей типов руководителей  (boss_types).
     * @param sCatalogNameParam (string) строка с названием типа объекта (каталога без ‘s’ на конце). Если передана пустая строка, то вернет все операция доступные указанным типам руководителей.
     * @return массив из каталожных записей операций, доступных указанному пользователю относительно указанного объекта.
     * @example
     * arrOperations = tools.get_relative_operations_by_boss_types(xarrBossTypes);
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_relative_operations_by_boss_types?(
        arrBossTypesParam: Array,
        sCatalogNameParam: String
    ): any;
    /**
     * Возвращает массив из каталожных записей операций, доступных указному пользователю относительно указанного объекта, указанного типа. То есть возвращает объединение операций доступных для всех типов руководителей, которыми обладает текущий пользователь для текущего объекта.
     * Входные параметры:
     * @param iUserIDParam (int)  ID сотрудника, для которого нужно определить список операций.
     * @param iObjectIDParam (int) ID объекта, относительно которого нужно определить список операций.
     * @param sCatalogNameParam (string) строка с названием типа объекта (каталога без ‘s’ на конце). Если передана пустая строка, то вернет все операция, заданные типами руководителей пользователя.
     * @return массив из каталожных записей операций, доступных указному пользователю относительно указанного объекта, указанного типа.
     * @example
     * xarrOperations = tools.get_object_relative_operations( curUserID, curObjectID, curObject.Name );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_object_relative_operations?(
        iUserIDParam: Integer,
        iObjectIDParam: Integer,
        sCatalogNameParam: String
    ): any;
    /**
     * Проверяет, есть ли операция, привязанная к переданному в параметрах функции действию (action), в списке переданных операций.
     * Входные параметры:
     * @param arrOperationsParam (array)  массив каталожных записей операций  (operations).
     * @param teCurUserParam (TopElem) TopElem сотрудника. Если передан не пустой и не null, и роль доступа Администратор, то функция всегда будет возвращать true.
     * @param sActionParam (string) код действия, к которому должна быть привязана операция.
     * @return флаг (bool) true, если передан сотрудник с ролью администратор, или если в массиве найдена операция с указанным кодом действия. False в противном случае.
     * @example
     * xarrOperations = tools.get_object_relative_operations( curUserID, curObjectID, curObject.Name );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    check_operation_rights?(
        arrOperationsParam: Array,
        teCurUserParam: XmlElem,
        sActionParam: String
    ): Bool;
    /**
     * Добавляет свойства (properties) объекта источника к свойствам объекта получателя.
     * Входные параметры:
     * @param oObjectRecipient (object)  объект получатель.
     * @param oObjectSource (object)  объект источник.
     * @return объединенный объект (object) из свойств источника и получателя.
     * @example
     * tools.extend_object(_vRedirectQuery, _oUrlQuery);
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    extend_object?(oObjectRecipient: Object, oObjectSource: Object): Object;
    /**
     * Свойство. Содержит ссылку на каталожную запись типа руководителя  с кодом current_user.
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    current_user_boss_type?(): void;
    /**
     * Возвращает массив из каталожных записей операций, доступных типу руководителя «Текущий пользователь» (код current_user).
     * Входные параметры нет .
     * @return массив из каталожных записей операций, доступных типу руководителя «Текущий пользователь» (код current_user).
     * @example
     * xarrOperations = tools.get_current_user_operations();
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_current_user_operations?(): any;
    /**
     * Заполняет свойства объекта получателя из соответствующих свойств объекта источника. Заполняются только те свойства, названия которых указаны в переданном в функцию массиве.
     * Входные параметры:
     * @param fldTarget (object)  объект получатель.
     * @param fldSourceParam (object)  объект источник.
     * @param arrFieldNamesParam (array) массив строк с названиями полей для заполнения.
     * @return нет.
     * @example
     * tools.assign_elems( fldCustomWebTemplate_temp, teCustomWebTemplate0666, ['use_session_cache','out_type','cwt_type','zones'] );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    assign_elems?(
        fldTarget: Object,
        fldSourceParam: Object,
        arrFieldNamesParam: Array
    ): void;
    /**
     * Возвращает значение указанного поля, полученного как ForeignElem поля источника данных, или заданную строку с ошибкой, если ссылка ведет на несуществующий объект.
     * Входные параметры:
     * @param fldForeignFieldParam ( XML field)  поле с типом ForeignElem из которого нужно получить ссылку на объект.
     * @param sFieldParam (string)  название поля в объекте, которое нужно вернуть.
     * @param sErrTextParam (string) строка, которую нужно вернуть, если ссылка ведет на несуществующий объект.
     * @return строка (string) со значением указанного поля или заданная строка с ошибкой.
     * @example
     * org_name = tools.get_foreign_field( org_id, 'disp_name', global_settings.object_deleted_str );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_foreign_field?(
        fldForeignFieldParam: XmlDoc,
        sFieldParam: String,
        sErrTextParam: String
    ): String;
    /**
     * Возвращает каталожную запись сотрудника по логину, в зависимости от типа авторизации или undefined, если не найден.
     * Входные параметры:
     * @param Login (string)   логин сотрудника.
     * @param AuthType (string) тип авторизации (ntlm, basic)
     * @return каталожная запись сотрудника или undefined, если не найден.
     * @example
     * _user = tools.get_user_by_login( _login, curHost.portal_auth_type );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_user_by_login?(Login: String, AuthType: String): any;
    /**
     * Разрешает установки даты сохранения (не modification_date) для объектов каталога для последующего отслеживания версий объекта.
     * Входные параметры:
     * @param sCatalogNameParam (string)   название каталога без ‘s’ на конце.
     * @param bValueParam (bool)  true размещать установку даты, false не разрешать.
     * @return нет.
     * @example
     * tools.set_form_last_seved_data( fldAdminAccessCatalogElem.PrimaryKey, true );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    set_form_last_seved_data?(sCatalogNameParam: String, bValueParam: Bool): void;
    /**
     * Возвращает строку с XML описанием каталогов, на которое наложено ограничение по количеству записей. Строка вида: <?xml version="1.0" encoding="utf-8"?><catalogs><catalog><name>cl_course</name><max_records_num>3</max_records_num></catalog></catalogs>
     * Входные параметры нет
     * @return строка (string) с XML описанием каталогов, на которое наложено ограничение по количеству записей.
     * @example
     * tools.get_catalog_limits()
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_catalog_limits?(): String;
    /**
     * Возвращает массив из каталожных записей значений карты знаний из карточки сотрудника и профиля значений карты знаний из должности сотрудника.
     * Входные параметры:
     * @param person_id (int)   ID сотрудника.
     * @return массив из каталожных записей значений карты знаний.
     * @example
     * tools.get_knowledge_parts_by_person_id(person_id)
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_knowledge_parts_by_person_id?(person_id: Integer): any;
    /**
     * Возвращает массив из каталожных записей экспертов, определенных в значениях карты знаний текущего сотрудника.  Значения карты знаний получают из карточки сотрудника и профиля значений карты знаний из должности сотрудника.
     * Входные параметры:
     * @param person_id (int)   ID сотрудника.
     * @return массив из каталожных записей экспертов.
     * @example нет.
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_experts_by_person_id?(person_id: Integer): any;
    /**
     * Возвращает название объекта из поля, которое его содержит. Например, для курса (course) это значение поля name, а для теста (test) это поле title.
     * Входные параметры:
     * @param teObjectParam (TopElem)   TopElem объекта, название которого нужно показать.
     * @return строка (string) с названием.
     * @example
     * _source.object_name = tools.get_object_name_field_value( objectDoc );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_object_name_field_value?(teObjectParam: XmlElem): String;
    /**
     * Копирует файл из адреса источника данных по адресу получателя данных. Все папки в адресе должны существовать до начала копирования, как в источнике, так и в получателе.
     * Входные параметры:
     * @param sDestDirPARAM (string)  полный путь до файла получателя. Включая название файла.
     * @param sSourceDirPARAM (string)  полный путь до файла источника. Включая название файла.
     * @return нет.
     * @example
     * tools.copy_url( 'x-local://' + DefaultDb + '/history.xml', 'x-local://wtv/history.xml' );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    copy_url?(sDestDirPARAM: String, sSourceDirPARAM: String): void;
    /**
     * Распаковывает архив из адреса источника данных по адресу получателя данных. Все папки в адресе должны существовать до начала распаковки, как в источнике, так и в получателе.
     * Входные параметры:
     * @param sSourceDirPARAM (string)  полный путь до файла источника. Включая название файла.
     * @param sDestDirPARAM (string)  полный путь до файла получателя.
     * @return нет.
     * @example
     * tools.zip_extract( TopElem.package_url, _url_base );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    zip_extract?(sSourceDirPARAM: String, sDestDirPARAM: String): void;
    /**
     * Создает архив по указанному адресу из файлов в папке источнике. Все папки в адресе должны существовать до начала распаковки, как в источнике, так и в получателе.
     * Входные параметры:
     * @param sArchivePathPARAM (string)  полный путь до файла получателя. Включая название файла.
     * @param sContentPathPARAM (string)  полный путь до папки источника с файлами. Или путь до файла, который нужно добавить (в этом случае нужно указать sContentDirPathPARAM).
     * @param sContentDirPathPARAM (string) необязательный, если все файлы лежать в одной папке - полный путь до папки источника с файлами.
     * @return нет.
     * @example
     * tools.zip_create( UrlToFilePath(sPackageFolderUrl + '/' + _pak_name), UrlToFilePath(sTempUrl) );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    zip_create?(
        sArchivePathPARAM: String,
        sContentPathPARAM: String,
        sContentDirPathPARAM?: String
    ): void;
    /**
     * Свойство.  Массив хранит hash форм каталогов. Используется чтобы оценить, изменились ли формы объектов или нет.
     * <doc_types_catalog_hashes>
     *                         <doc_types_catalog_hash MULTIPLE="1" PRIMARY-KEY="object_name">
     *                                    <object_name TYPE="string"/>
     *                                    <object_hash TYPE="string"/>
     *                         </doc_types_catalog_hash>
     *             </doc_types_catalog_hashes>
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    doc_types_catalog_hashes?(): void;
    /**
     * Свойство (bool).  Показывает произошла ли успешная запись hash форм каталогов (true) или нет (false).
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    doc_types_catalog_registered?(): void;
    /**
     * Сравнивает hash в структуре doc_types_catalog_hashes с текущем hash’ем объектов и обновляет его в случае изменения.
     * Входные параметры:
     * @param aCatalogsToRegPARAM (string)  название объекта.
     * @param bServerCheck (bool)  флаг, true – запускать проверку на сервере, или false на локальной машине.
     * @return нет.
     * @example
     * tools.register_doc_types_catalog(regAllDocTypes(), false);
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    register_doc_types_catalog?(
        aCatalogsToRegPARAM: String,
        bServerCheck: Bool
    ): void;
    /**
     * Возвращает название объекта из поля, которое его содержит. Например, для курса (course) это значение поля name, а для теста (test) это поле title. Отличие от функции get_object_name_field_value в том, что если поле содержит путь до элемента через “.”, то поле с названием будет найдено по этому пути, а в get_object_name_field_value будет ошибка.
     * Входные параметры:
     * @param teObjectParam (TopElem)   TopElem объекта, название которого нужно показать.
     * @return строка (string) с названием.
     * @example
     * sDispName = tools.get_disp_name_value( teObject );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_disp_name_value?(teObjectParam: XmlElem): String;
    /**
     * Возвращает объект с полями id и type, полученные из json строки без ведущих и замыкающих []. Если в переданной строке будет “id”:значение и “type”:значение, то вернет эти значения в возвращаемом объекте. Причем значения id и type должны встречаться только один раз.
     * Входные параметры:
     * @param sSomeObjectPARAM (string)   строка.
     * @return объект с указными полями.
     * @example
     * selectObject = tools.read_selected_date(SelectObject);
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    read_selected_date?(sSomeObjectPARAM: String): any;
    /**
     * Устаревшая функция. Вместо нее нужно использовать tools_web.get_sum_sid. Получает уникальный идентификатор, определяющий текущую сессию и объект, для которого этот идентификатор получен.
     * Входные параметры:
     * @param sIdParam (int)   ID объекта, для которого нужно получить уникальный идентификатор.
     * @return уникальный идентификатор (int).
     * @example
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_sum_sid?(sIdParam: Integer): Integer;
    /**
     * Устаревшая функция. Вместо нее нужно использовать tools_web. check_sum_sid. Сравнивает уникальный идентификатор, переданный в нее с уникальным идентификатором, определяющий текущую сессию и объект, для которого этот идентификатор получен.
     * Входные параметры:
     * @param sIdParam (int)   ID объекта, для которого нужно осуществить проверку.
     * @param sSumParam (int)   уникальный идентификатор, с которым идет сравнение.
     * @return флаг (bool) true - уникальные идентификаторы совпадают false - уникальные идентификаторы не совпадают.
     * @example
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    check_sum_sid?(sIdParam: Integer, sSumParam: Integer): Bool;
    /**
     * Заменяет в строке пробел, «(» , «)», «+», «-», на пустую сроку. А символы «,», «;» на пробел.
     * Входные параметры:
     * @param strPhoneParam (string)   строка для изменения.
     * @return преобразованная строка (string) или null, если произошла ошибка.
     * @example
     * str = tools.build_simple_phone( strPhoneParam );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    build_simple_phone?(strPhoneParam: String): String;
    /**
     * Преобразует строку вида «+7-903-508-20-45» или «+7(903)508-20-45» в строку «79035082045 5082045».  Нужно для обеспечения поиска по телефонным номерам.
     * Входные параметры:
     * @param strPhoneParam (string)   строка для изменения.
     * @return преобразованная строка (string) или null, если произошла ошибка.
     * @example
     * str = tools.build_simple_phone( strPhoneParam );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    build_phone?(strPhoneParam: String): String;
    /**
     * Назначает сотруднику материал библиотеки для изучения. При этом создается объект просмотра материала library_material_viewing. Если материал уже назначен, возвращается id назначенного ранее объекта просмотра материла.
     * Входные параметры:
     * @param iPersonIDParam (int) ID сотрудника для назначения.
     * @param iMaterialIDParam (int) ID материала библиотеки.
     * @param tePersonParam (TopElem) необязательный –TopElem сотрудника.
     * @param teMaterialParam (TopElem) необязательный ID материала библиотеки.
     * @param bSendNotification (bool) true- отправляется стандартное уведомление о назначении материала библиотеки, false – не отправляется.
     * @return Doc объект просмотра материала library_material_viewing.
     * @example
     * fldResult = tools.recommend_library_material_to_person( eval( '_env' + Ps.row_list_field + Ps.row_key_field ), fldValue.key, null, null, true);
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    recommend_library_material_to_person?(
        iPersonIDParam: Integer,
        iMaterialIDParam: Integer,
        tePersonParam?: XmlElem,
        teMaterialParam?: XmlElem,
        bSendNotification: Bool
    ): any;
    /**
     * Преобразует в дату первый параметр функции. Если преобразование не удалось, то возвращается второй параметр в таком виде, как он передан в функцию, или undefined, если он не задан.
     * Входные параметры:
     * @param sDateStr (string) строка для преобразования в дату.
     * vDefault (variant) необязательный значение по умолчанию, если преобразование перового параметра не удалось.
     * @return (variant) либо дата, либо второй параметр в таком виде, как он передан в функцию, или undefined, если он не задан.
     * @example
     * vTemp = tools.opt_date(oEvent.GetProperty(oColumns.end), oEvent.GetProperty(oColumns.start));
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    opt_date?(sDateStr: String): any;
    /**
     * Преобразует в строку числовой параметр функции. Если параметр отрицательный, то строка будет начинаться со знака «-».
     * Входные параметры:
     * @param iNumberParam (real) число для преобразования в строку.
     * @return строка (string).
     * @example
     * tools.str_negative_number( TopElem.weight )
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    str_negative_number?(iNumberParam: Real): String;
    /**
     * Возвращает строку с размером файла в байтах. Или в другой размерности в зависимости от размера файла и параметров функции.
     * Входные параметры:
     * @param iByteSizePARAM (int) размер файла в байтах.
     * @param bAddUnitPARAM (bool) добавлять размерность (гигабайты, мегабайты и т.д.) и пересчитывать размер файла в соответствующую размерность – true.
     * @return строка (string) с числом байт и размерностью.
     * @example
     * tools.beautify_file_size(catResourceElem.size.Value)
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    beautify_file_size?(iByteSizePARAM: Integer, bAddUnitPARAM: Bool): String;
    /**
     * Возвращает строку для использования в запросах для поиска по full text индексу. Строка параметр функция преобразуется в строку в зависимости от настроек базы.
     * Входные параметры:
     * @param sValueParam (string) строка для преобразования.
     * @return строка (string) для использования в запросах для поиска по full text индексу.
     * @example
     * tools.get_ft_value( value )
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_ft_value?(sValueParam: String): String;
    /**
     * Создает строку XML для помещения агента с указанным id в очередь на выполнение. Получается строка вида <queue_command><type>run_agent</type><agent_id TYPE="integer">0x4F71ACFB4EF22716</agent_id><element_id/><elems_id_str/><dDateParam>30.05.2115 16:44:07</dDateParam><tenancy_name>dbo</tenancy_name></queue_command>
     * Входные параметры:
     * @param iServerAgentIDParam (int) ID агента.
     * @param sElementIDParam (int) необязательный  ID объекта, над которым запускается агента (например, в списке).
     * @param sElemsIDParam (string) необязательный  ID объектов разделенных «;», над которым запускается агента (например, в списке).
     * @param dDateParam (data) необязательный  дата запуска агента, по умолчанию текущая дата.
     * @param sTenancyNameParam(string) необязательный  код экземпляра системы (tenant) в multitenant системе, в котором нужно запустить агент.
     * @return строка (string).
     * @example
     * tools.get_agent_command_queue_xml( 5724546796725872406, '', '', Date(), 'dbo' )
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_agent_command_queue_xml?(
        iServerAgentIDParam: Integer,
        sElementIDParam?: Integer,
        sElemsIDParam?: String,
        dDateParam?: Date,
        sTenancyNameParam?: String
    ): String;
    /**
     * Формирует строку с уникальным идентификатором на основе параметров функции. Результирующая строка будет вида $$uid_первый параметр_второй параметр.
     * Входные параметры:
     * @param sUIDParam (string) строка формирования идентификатора.
     * @param sUrlParam (string) строка формирования идентификатора.
     * @return строка (string) $$uid_первый параметр_второй параметр.
     * @example
     * sUID = tools.get_uid_cached_doc( tools.uid, sUrlParam );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_uid_cached_doc?(sUIDParam: String, sUrlParam: String): String;
    /**
     * Для типов установки WebTutor, отличных от XML базы, обновляет документ в cache. Документ определяется по url к нему.
     * Входные параметры:
     * @param sUrlParam (string) строка с путем до документа.
     * @return флаг (bool). True – обновление успешно произведено, иначе - false.
     * @example
     * tools.check_and_refresh_cached_docs(url);
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    check_and_refresh_cached_docs?(sUrlParam: String): Bool;
    /**
   * Открывает XML-документ по указанному ID объекта и возвращает ссылку на объект типа XmlDoc.
   * Если XML-документ, ID которого указан в аргументе, не найден, функция выдает значение undefined без прерывания выполняемого кода
   * Входные параметры:
   * @param id (integer | string) ID документа.
   * @return открытый документ (XmlElem | undefined).
   * @example
   * return tools.open_doc(id);
   * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
   */
    open_doc?(id: Integer | String): XmlElem | undefined;
    /**
     * Возвращает сроку с тегами XML, полученную из строки, переданной в параметрах функции. Предполагается, что в функцию передается файл со значениями параметров, потому в результирующей строке будут представлены название параметра и его значение
     * Входные параметры:
     * @param sFileText (string) строка для разбора.
     * @return срока (string) с тегами XML.
     * @example
     * return tools.open_str_win_ini( LoadUrlText( sUrlParam ) );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    open_str_win_ini?(sFileText: String): String;
    /**
     * Возвращает сроку с тегами XML, полученную из файла путь до которого, передан в параметрах функции. Вызывает функцию tools.open_str_win_ini для разбора файла.
     * Входные параметры:
     * @param sUrlParam (string) строка с путем до файла.
     * @return срока (string) с тегами XML.
     * @example
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    open_doc_win_ini?(sUrlParam: String): String;
    /**
     * Функция для записи в лог настраиваемых сообщений с более подробной информацией и возможностью указания типа ошибки и отключения отладочных сообщений, когда режим отладки отключен в общих настройках.
     * Входные параметры:
     * @param sTextParam (string) строка с текстом для записи в лог.
     * @param sMessageTypeParam (string) строка с типом сообщения. Возможные значения:
     *             error ошибка. Сообщения с таким типом всегда пишутся в основной лог системы (xhttp.log) с префиксом 'ERROR:'.  Если в общих настройках включен лог отладки (debug.log), то и в него то же (debug.log).
     * debug отладочное сообщение. Сообщения с таким типом всегда пишутся в лог отладки (debug.log), если в общих настройках он включен с префиксом 'DEBUG: '.
     * по умолчанию тип сообщения info - Сообщения с таким типом всегда пишутся в основной лог системы (xhttp.log) с префиксом ‘INFO: ‘.  Если в общих настройках включен лог отладки (debug.log), то и в него то же (debug.log).
     * @param bShowAdditionalInfoParam (bool) флаг true – показывать дополнительную информацию по сообщению. False - не показывать. Дополнительная информация включает в себя mode, по которому вызывается сообщение, curObjectID, curDocID, curUserID, если их можно получить.
     * @return нет.
     * @example
     *             tools.log("project_actions.bs: " + err, "error");
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    log?(
        sTextParam: String,
        sMessageTypeParam: String,
        bShowAdditionalInfoParam: Bool
    ): void;
    /**
     * Возвращает массив из каталожных записей подписок сотрудника .
     * Входные параметры:
     * @param iPersonIDParam (int) ID  сотрудника.
     * @return массив из каталожных записей подписок сотрудника.
     * @example
     *             arrAllSubscriptions = tools.get_sibscriber_subscriptions( curUserID );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_sibscriber_subscriptions?(iPersonIDParam: Integer): any;
    /**
     * Проверяет, существует ли файл по указанному пути.
     * Входные параметры:
     * @param sFilePathParam (string) строка с путем до файла.
     * @return флаг (bool). True – файл существует, иначе - false.
     * @example
     * if(tools.file_url_exists( sTempUrl ))
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    file_url_exists?(sFilePathParam: String): Bool;
    /**
     * Используется для вариантов установки WebTutor c базой данных отличной от XML. Если в настройках моста связи с базой данных установлена асинхронная обработка катологов, то вызов этой функции позволяет дождаться окончания синхронизации текущего каталога и потом выполнять действия. Ее необходимо вызвать, если произошло изменение объекта, затрагивающее изменение каталожных полей, и сразу после изменения нужно выполнить запрос к каталогу объекта. Без вызова функции запрос к каталогу может вернуть старое значение каталожного поля измененного объекта, если синхронизация еще не закончена. Например, меняется поле логин сотрудника с 1 на 2. И сразу после сохранения идет запрос по поиску логина со значением 2. Если не вызывать функцию, то искомое значение может быть не найдено. Для XML базы функция ничего не делает, так что ее вызов не мешает выполнению программы.
     * Проверяет, существует ли файл по указанному пути.
     * Входные параметры:
     * @param catalogName (string) строка с названием каталога с ‘s’ на конце.
     * @return нет.
     * @example
     * tools. sync_catalog(“pas”)
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    sync_catalog?(catalogName: String): void;
    /**
     * Обновляет список типов мероприятий в системе.
     * Входные параметры:
     * @param bUpdateServersParam (bool) необязательный по умолчанию false  true обновлять данные на сервере (если функция запускается не на сервере) или на локальной машине - false .
     * @param oTarget (TomElem) необязательный по умолчанию common. TomElem документа, дочерний элемен event_types, которого нужно обновить.
     * @return нет.
     * @example
     * tools.update_commons_event_types( true );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    update_commons_event_types?(
        bUpdateServersParam?: Bool,
        oTarget?: XmlElem
    ): void;
    /**
     * Выполняет проверку цифровой подписи и оригинального текста в указном объекте электронно-цифровой подписи. Проверяется, что текст и цифровая подпись теста соответствуют друг другу. То есть что указанный текст действительно подписан этой подписью. Проверка происходит с помощью крипто провайдера указанного в общих настройках.
     * Входные параметры:
     * @param iDocIDParam (int) ID объекта  электронно-цифровой подписи.
     * @return  объект (object) со следующими полями – id ID результата выполнения проверки подписи и strMessage – текстовое сообщение о результате выполнения. Id может быть следующим 0- подпись действительна; 1- подпись не действительна; 2 - номер сертификата не соответствует номеру сертификата, указанному в карточке пользователя; 3 - текст подписанного документа пустой; 4 - электронно-цифровая подпись пустая
     * @example
     * strVerifRes=ServerEval( 'tools.DigitalVerifyDoc(&quot;'+Ps.Doc.DocID +'&quot;)');
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    DigitalVerifyDoc?(iDocIDParam: Integer): Object;
    /**
     * Выполняет проверку цифровой подписи и оригинального текста переданных, как параметры функции. Проверяется, что текст и цифровая подпись теста соответствуют друг другу. То есть что указанный текст действительно подписан этой подписью. Проверка происходит с помощью крипто провайдера указанного в общих настройках.
     * Входные параметры:
     * @param iDocIDParam (int) ID объекта  электронно-цифровой подписи.
     * @return  объект (object) со следующими полями – id ID результата выполнения проверки подписи и strMessage – текстовое сообщение о результате выполнения. Id может быть следующим 0- подпись действительна; 1- подпись не действительна; 2 - номер сертификата не соответствует номеру сертификата, указанному в карточке пользователя; 3 - текст подписанного документа пустой; 4 - электронно-цифровая подпись пустая.
     * @example
     * verifRes=tools.DigitalVerify(teDigitalSignature.sign_open,teDigitalSignature.sign_encrypted)
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    DigitalVerify?(iDocIDParam: Integer): Object;
    /**
     * Устанавливает пакеты со стандартными объектами системы, которые входят в первоначальную поставку WebTutor. При этом проверяется дата последней установки и язык системы по умолчанию.
     * Входные параметры - нет.
     * @return нет.
     * @example
     * tools.process_custom_packs();
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    process_custom_packs?(): void;
    /**
     * На основе настроек профиля редактирования контента в карточке сотрудника проверять возможность загрузки файла указанного размера. Проверяется ограничение на размер загружаемого файла, на общий размер файлов, загруженных пользователем и на максимальное количество загружаемых файлов. Применяется при загрузке файла  в базу с портала.
     * Входные параметры:
     * @param iFileSizeParam (int) размер файла в байтах.
     * @param iPersonIDParam (int) ID сотрудника.
     * @return  строка (string) “ok”- загрузка разрешена или строка с сообщением о причине отказа в загрузке.
     * @example
     * sCheckResult = tools.check_resource_size(StrLen(oFileField), curUserID);
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    check_resource_size?(
        iFileSizeParam: Integer,
        iPersonIDParam: Integer
    ): String;
    /**
     * Включает сотрудника в кадровый резерв. При этом создается объект кадровый резерв и этап развития карьеры к нему. Если объект для данного сотрудника уже созданы, в них сносятся изменения.
     * Входные параметры:
     * @param iPersonIdParam (int) ID сотрудника для включения в резерв.
     * @param teRequestParam (TopElem) необязательный TopElem заявки на включение в резерв. Если в заявке есть настраиваемые поля и в настраиваемых полях есть ссылка на тип кадрового резерва, то этот тип будет приписан создаваемому объекту кадрового резерва.
     * @param iCareerReserveTypeIdParam (int) необязательный ID типа кадрового резерва. Этот тип будет приписан создаваемому объекту кадрового резерва.
     * @param iPositionIdParam(int) необязательный ID должности. Эта должность будет проставлена в этапе развития карьеры, как цель развития. Если должность не указана, но в заявке на включение в резерв была проставлена должность, как объект заявки, то будет использоваться Id должности из заявки.
     * @param strStateParam (string) необязательный по умолчанию candidate статус объекта кадровой резерв, который присваивается по результату работы функции.
     * @param iPositionCommonIdParam (int) необязательный ID типовой должности (используется, если не указана должность iPositionIdParam). Эта типовая должность будет проставлена в этапе развития карьеры, как цель развития. Если типовая должность не указана, но в заявке на включение в резерв была проставлена типовая должность, как объект заявки, то будет использоваться Id типовой должности из заявки.
     * @param sIncludeDateParam (date) необязательный дата включения в резерв. По умолчанию текущая дата.
     * @return  ID (int)  объекта кадровый резерв.
     * @example
     * tools.include_person_to_personnel_reserve_position(_person.PrimaryKey, docRequest.TopElem);
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    include_person_to_personnel_reserve_position?(
        iPersonIdParam: Integer,
        teRequestParam?: XmlElem,
        iCareerReserveTypeIdParam?: Integer,
        iPositionIdParam?: Integer,
        strStateParam?: String,
        iPositionCommonIdParam?: Integer,
        sIncludeDateParam?: Date
    ): Integer;
    /**
     * Возвращает объект, полученный из списка полей указного объекта. Список полей передаётся как параметр функции.
     * Входные параметры:
     * @param fldSPXML (variant) ID объекта, или его TopElem.
     * @param sFieldList (string) строка из названий полей объекта, которые нужно получить, разделенные “;”.
     * @param bNoValidation (bool) необязательный  по умолчанию true проверять что в списке полей, преданных в sFieldList не встречаются ведущие или заключительные знаки /.
     * @return  объект (object) со значениями выбранных полей. Название свойства – название поля в исходном объекте, значение поля – значение поля в исходном объекте
     * @example
     * return tools.extract_bfields_by_list(Child(0).Parent, 'name;type_id;event_type_id;start_date;finish_date;collaborators/collaborator/collaborator_id;collaborators/collaborator/person_fullname', false);
     *   D:\WebTutor2\trunk\WebTutorAdmin\wtv\wtv_tools.xml
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    extract_bfields_by_list?(
        fldSPXML: XmlDoc,
        sFieldList: String,
        bNoValidation?: Bool
    ): Object;
    /**
     * Возвращает Doc объект, переданного в параметрах функции. Если свойство Doc определено, возвращает его. Если нет, то открывает объект по Id и возвращает Doc.
     * Входные параметры:
     * @param teObjectParam (TopElem) TopElem объекта.
     * @return  Doc объекта или null.
     * @example
     * docObject = tools.get_opened_doc( Child(0).Parent );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_opened_doc?(teObjectParam: XmlElem): any;
    /**
     * Преобразовывает html переданный в функцию в файл pdf и сохраняет его по указанному
     * пути.
     * Входные параметры:
     * @param sHtmlText (string) строка с html для преобразования.
     * @param sResourcesDirPath (string)  - путь до папки с ресурсами (изображения, стили и т.д.), которые используются в html.
     * @param sOutFilePath (string) пусть до файла,  в который будет сохранен полученный файл pdf.
     * @return  флаг (bool) true – генерация прошла успешно, false в противном случае.
     * @example
     * tools.html_to_pdf(_str, '', UrlToFilePath(_filename));
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    html_to_pdf?(
        sHtmlText: String,
        sResourcesDirPath: String,
        sOutFilePath: String
    ): Bool;
    /**
     * Устанавливает тип руководителя для участника проекта.
     * Входные параметры:
     * @param iProjectParticipantIDParam (int) необязательный, если передан docProjectParticipantParam ID объекта участник проекта.
     * @param docProjectParticipantParam (Doc) - Doc объекта участник проекта.
     * @param iBossTypeIDParam (int) - ID типа руководителя для присвоения участнику проекта.
     * @return  флаг (bool) true – функция выполнена успешно, false в противном случае.
     * @example
     * tools.set_project_participant_type( iSelectedID, null, iElementID)
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    set_project_participant_type?(
        iProjectParticipantIDParam?: Integer,
        docProjectParticipantParam: XmlDoc,
        iBossTypeIDParam: Integer
    ): Bool;
    /**
     * Создает объект участник проекта для указанного проекта и указанного сотрудника.
     * Входные параметры:
     * @param iProjectParticipantIDParam (int) необязательный, если передан tePersonParam ID объекта участник проекта.
     * @param tePersonParam (TopElem) - TopElem объекта участник проекта.
     * @return  Doc созданного объекта участник проекта.
     * @example
     * tools.create_project_participant(_value.key,null,TopElem.Doc.DocID)
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    create_project_participant?(
        iProjectParticipantIDParam?: Integer,
        tePersonParam: XmlElem
    ): any;
    /**
     * Создает запись в журнале profiling.log. Строка вида sIDParam + '\t' + GetCurTicks() + '\t' + Request.Session.GetOptProperty( 'sid', '' ) + '\t' + Request.Url + '\t' + sTypeParam
     * Входные параметры:
     * @param sIDParam (string) строка идентификатор события.
     * @param Request (Request)- объект Request.
     * @param sTypeParam (string) строка с текстом события.
     * @return - нет.
     * @example
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    set_profile_log?(
        sIDParam: String,
        Request: Request,
        sTypeParam: String
    ): void;
    /**
     * Очищает данные по статусу, сотруднику, дате поставки и оплаты по экземпляру товара.
     * Входные параметры:
     * oSourceGoodInstance (variant ) либо ID экземпляра товара, либо Doc экземпляра товара.
     * @param docProjectParticipantParam (Doc) - Doc объекта участник проекта.
     * @param iBossTypeIDParam (int) - ID типа руководителя для присвоения участнику проекта.
     * @return  флаг (bool) true – функция выполнена успешно, false в противном случае.
     * @example
     * if ( tools.clear_good_instance_status( fldGoodInstanceElem.PrimaryKey ) )
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    clear_good_instance_status?(
        docProjectParticipantParam: XmlDoc,
        iBossTypeIDParam: Integer
    ): Bool;
    /**
     * Получает заполонённую  Xml структуру с данными о выгруженном пакете. Xml структура может быть сохранена как есть, при генерации пакета, или использована для дальнейшего заполнения.
     * Входные параметры:
     * sIDParam (string ) необязательный ID пакета. Если не передано, заполняется случайной строкой
     * @return  XML со следующими полями.
     *             Id ID пакета.
     *             create_date дата создания это текущая дата.
     *             server_version версия сервера.
     * @example
     * docForm = tools.get_form_upload_data();
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_form_upload_data?(): XmlDoc;
    /**
     * Добавляет поля в XML структуру (например, полученную функцией tools.get_form_upload_data)  из указанного объекта. Применяется при создании лицензии на материалы библиотеки или формировании пакетов.
     * Входные параметры:
     * @param fldFormTarget (XML) структура, в которую добавляют информацию.
     * @param fldObjParam (XML) либо XML структура из которой берется информация.
     * @param oObjIDParam (int) необязательный, если передан fldObjParam ID объекта.
     * @param bInvariableParam (bool)
     * @return  нет
     * @example
     * tools.set_field_to_form_upload_data( formDoc, access_roles );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    set_field_to_form_upload_data?(
        fldFormTarget: XmlDoc,
        fldObjParam: XmlDoc,
        oObjIDParam?: Integer,
        bInvariableParam: Bool
    ): void;
    /**
     * Возвращает ID системы отправки уведомлений по умолчанию.
     * Входные параметры нет
     * @return  - int - ID системы отправки уведомлений по умолчанию.
     * @example
     * docActiveNotificationParam.TopElem.notification_system_id = tools.get_default_notification_system_id();
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_default_notification_system_id?(): any;
    /**
     * Возвращает ID системы проведения вебинаров по умолчанию.
     * Входные параметры нет
     * @return  - int - ID системы проведения вебинаров по умолчанию.
     * @example
     * tools.get_default_webinar_system_id()
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_default_webinar_system_id?(): any;
    /**
     * Возвращает TopElem системы отправки уведомлений.
     * Входные параметры:
     * oParam (variant) ID объекта системы отправки уведомлений, или его TopElem. Если передан ID или TopElem объекта отличного от notification_system, то в объекте будет произведен поиск ID системы отправки уведомлений в поле notification_system_id, и возращен TopElem объекта, определяемый ID из этого поля.
     * @return  - TopElem системы отправки уведомлений.
     * @example
     * teNotificationSystem = tools.get_notification_system( oParam );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    get_notification_system?(): any;
    /**
     * Выполняет указный метод системы отправки уведомлений. Значения для переменных системы отправки уведомлений, используемых в методе, можно передать в параметрах функции. Название переменной в передаваемом параметре должно совпадать с названием переменной в списке переменных в объекте системы отправки уведомлений.
     * Входные параметры:
     * oParam (variant) ID объекта системы отправки уведомлений, или его TopElem. Если передан ID или TopElem объекта отличного от notification_system, то в объекте будет произведен поиск ID системы отправки уведомлений в поле notification_system_id и использован TopElem объекта, определяемый ID из этого поля.
     * @param sMethodNameParam (string) название вызываемого метода.
     * @param oArrParam (string) строка в формате json, задающая значения для переменных в списке переменных в объекте системы отправки уведомлений.
     * @return  - (variant) результат выполнения указанного метода, определяется типом указанного метода.
     * @example
     * var oRes = tools.call_notification_system_method( docActiveNotification.TopElem, 'SendNotification', oParam );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    call_notification_system_method?(
        sMethodNameParam: String,
        oArrParam: String
    ): any;
    /**
     * Заполняет в объекте получатель поле type_id кодом типа мероприятия, переданного в параметрах функции. Если при этом в системе есть тип мероприятия с указным кодом, то заполняется ссылка на этот тип в поле event_type_id.
     * Входные параметры:
     * @param ftTarget (TopElem) TopElem для заполнения.
     * @param sEventTypeParam (string) строка с кодом типа мероприятия.
     * @return  - null, если тип мероприятия с указным кодом не найден, или id (int) этого типа мероприятия
     * @example
     * tools.set_event_type_id( doc.TopElem, _event_type );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    set_event_type_id?(ftTarget: XmlElem, sEventTypeParam: String): Integer;
    /**
     * Создает объект элемент очереди скриптов.
     * Входные параметры:
     * @param sScriptParam (string) код для выполнения.
     * @param sCodeParam (string) строка с кодом скрипта.
     * @param bDeleteAutomaticallyParam (bool) флаг, true- автоматически удалять код из очереди, false- нет.
     * @param iDelayParam (int) задержка в секундах перед выполнением кода.
     * @return  - ID (int) созданного объекта.
     * @example
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    add_script_to_queue?(
        sScriptParam: String,
        sCodeParam: String,
        bDeleteAutomaticallyParam: Bool,
        iDelayParam: Integer
    ): Integer;
    /**
     * Ожидает выполнения элемента очереди скриптов.
     * Входные параметры:
     * @param iScriptIdParam (int) ID скрипта.
     * @param bDeleteScript (bool) true удалять объект элемент очереди скриптов после выполнения или нет (false).
     * @return  - объект (object) со следующими полями result содержит объект, который возвращается по результатам выполнения скрипта (если такой есть), error описание ошибки, возникшей при выполнении (если ошибка обрабатывается скриптом). Если элемент очереди скриптов не найден, вернет null.
     * @example
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    wait_script_queue?(iScriptIdParam: Integer, bDeleteScript: Bool): void;
    /**
     * Отрывает указную версию курса в интерфейсе администратора WebTutor.
     * Входные параметры:
     * @param iCourseIdParam (int) ID курса.
     * @param sBaseUrlParam (string)  путь до папок с предыдущий версии курса в файловой систем.
     * @return  - Doc указанного курса.
     * @example
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    open_course_version?(iCourseIdParam: Integer, sBaseUrlParam: String): any;
    /**
     * Заменяет в строке символы ProcessExecute, alert, eval, ShellExecute, Eval. Это позволяет использовать полученную в результате выполнения функции строку в выражении eval и таким образом частично обезопасить выполнение кода от injection.
     * Входные параметры:
     * @param strEvalParam (string)  строка для преобразования.
     * @return  - (string) строка без символов ProcessExecute, alert, eval, ShellExecute, Eval.
     * @example
     * strEval=tools.evalReplace(strEval)
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    evalReplace?(strEvalParam: String): String;
    /**
     * Оптимизированная функция выполнения длинных запросов. Ее предпочтительнее использовать, кода нужно сделать, например запрос с иерархией. И всегда использовать вместо CatalogHierSubset используя функцию IsHierChild.
     * Входные параметры:
     * @param sQueryParam (string)  строка для выполнения запроса.
     * @return  - результат выполнения запроса XQuery по оптимизированной строке sQueryParam.
     * @example
     * docArray = tools.xquery( 'for $elem in documents where IsHierChild( $elem/id, ' + _main_doc.document_id + ' ) order by $elem/Hier() return $elem/id' ); xarrSubdivisions = tools.xquery( 'for $elem in subdivisions where IsHierChild( $elem/id, ' + iLastDepID + ' ) order by $elem/Hier() return $elem/id' );
     * @link https://news.websoft.ru/view_doc.html?mode=doc_type&custom_web_template_id=6180275463021353212&doc_id=6181289497353023487
     */
    xquery?(sQueryParam: String): any;
    /**
     * Криптография
     * @example
     * function encode(sParam)
     * {
     *   sEncodeResult = StrReplace(sParam, "/", "_");
     *   sEncodeResult = StrReplace(sEncodeResult, "=", "");
     *   sEncodeResult = StrReplace(sEncodeResult, "+", "-");
     *   return sEncodeResult;
     * }
     *
     * var oHeader = { "alg": "HS256", "typ": "JWT"};
     *
     * var oPayload = {
     *   "exp": DateToRawSeconds(DateOffset(Date(), 86400)),
     *   "username": 'teUser.login.Value',
     *   "email": 'teUser.email.Value',
     *   "lastname": 'teUser.lastname.Value',
     *   "firstname": 'teUser.firstname.Value',
     *   "role": "student",
     *   "openId": 'String( oParams.iLearningId )',
     *   "subject": 'teLearning.assessment_name.Value',
     *   "invites": 'proctor.user',
     *   "duration": '1',
     *   "url": 'oParams.sHost'
     * };
     *
     * var oCrypto = tools.crypto_obj_init();
     * var sUnsignedToken = encode(Base64Encode(tools.object_to_text(oHeader,"json")) + "." + Base64Encode(tools.object_to_text(oPayload,"json")));
     *
     * var sSecretKey = 'secret'
     * var sSignature = encode(oCrypto.HMAC_SHA256(sUnsignedToken, sSecretKey));
     * var sResult = sUnsignedToken + "." + sSignature;
     */
    crypto_obj_init?(): {
        /**
         * Фукнция для построения JWT токена
         * @param sUnsignedToken
         * @param sSecretKey
         */
        HMAC_SHA256?(sUnsignedToken: String, sSecretKey: String): String;
    };
}

class wttools_web {
    /**
     * Нет описания
     * Инициирует регулярки
     */
    reg_exp_init?(): { Pattern: String; Replace: String };
    /**
     * Получает уникальный идентификатор, определяющий текущую сессию и объект, для которого этот идентификатор получен.
     * Входные параметры:
     * @param sIdParam (int) ID объекта, для которого нужно получить уникальный идентификатор.
     * @param sSessionSid (int) ID сессии Session.sid
     * @return уникальный идентификатор (int).
     * @example
     * var sid = tools_web.get_sum_sid( print_form_id, Session.sid )
     */
    get_sum_sid?(sIdParam: Integer, sSessionSid: Integer): Integer;
    /**
     * Сравнивает уникальный идентификатор, переданный в нее с уникальным идентификатором,
     * определяющий текущую сессию и объект, для которого этот идентификатор получен.
     * Входные параметры:
     * @param sIdParam (int)   ID объекта, для которого нужно осуществить проверку.
     * @param sSumParam (int)   уникальный идентификатор, с которым идет сравнение.
     * @return флаг (bool) true - уникальные идентификаторы совпадают false - уникальные идентификаторы не совпадают.
     * @example
     */
    check_sum_sid?(sIdParam: Integer, sSumParam: Integer): Bool;
    /**
     * Нет описания
     * @param bValue
     * @param sValue
     * @example
     * tools_web.get_query_string( true, "ass_app");
     */
    get_query_string?(bValue: Bool, sValue: String): String;
    /**
     * Нет описания
     * @param sValue
     * @param iValue
     * @example
     * tools_web.set_user_data("excel_html_" + curUserID, {'html': RES_STR}, 10000);
     */
    set_user_data?(sValue: String, oValue: Object, iValue: Integer): void;
    /**
     * Нет описания
     * @param oConditionsParam
     */
    get_user_data?(oConditionsParam: Object): Object;
    /**
     * Нет описания
     * @param sValue
     * @example
     * tools_web.remove_user_data("excel_html_" + curUserID);
     */
    remove_user_data?(sValue: String): void;
    /**
     * Нет описания
     * @param curParams
     * @param curDocObjectWwars
     * @param bValue
     * @example
     * tools_web.set_web_params( curParams, curDocObject.wvars, true );
     */
    set_web_params?(
        curParams: Object,
        curDocObjectWwars: spXmlElem,
        bValue: Bool
    ): void;
    /**
     * Нет описания
     * Функция работает только когда Заявка уже создана, на начальном этапе не работает
     * @param curParams
     * @param sMethodStyle
     * @param sValue
     * @param bValue
     * @example
     * sDevelopmentMethodStyle = tools_web.get_web_param(curParams, "sDevelopmentMethodStyle", "basic", true);
     * curDocObjectID = OptInt( tools_web.get_web_param( curParams, 'doc_body.doc_id', null, true ) );
     * curObject.TopElem.workflow_fields.ObtainChildByKey('fld_param_okaGroupCode').value = tools_web.get_web_param( curParams, "gr_OKA_code", "", true );
     */
    get_web_param?(
        curParams: Object,
        sMethodStyle: String,
        sValue: String,
        bValue: Bool
    ): String;
    /**
     * Проверят числа и строки на наличие булевого значения
     * @param bValue - булевое значение которое небходимо проверить
     * @return результат вычисления bool
     * @example
     * tools_web.is_true('1') или tools_web.is_true(1)
     * tools_web.is_true('0') или tools_web.is_true(0)
     * tools_web.is_true('true')
     * tools_web.is_true('false')
     * tools_web.is_true('')
     * tools_web.is_true('on')
     */
    is_true?(bValue: Boolean | String | Integer): Boolean;
    /**
     * Формирование launch_id для course_launch.html
     * @param alID - идентификатор active_learning
     * @param accessDays дни доступа
     * @return результат вычисления уникальный индентификатор (int)
     * @example
     * /course_launch.html?launch_id=" + tools_web.encrypt_launch_id( alID, DateOffset(Date(), 86400 * accessDays))
     */
    encrypt_launch_id?(alID: Integer, accessDays: Date): Integer;
    /**
     * Нет описания
     * @param sLaunchIDParam
     */
    decrypt_launch_id?(sLaunchIDParam: String): Object;
    /**
     * Программно проверить доступ к шаблону, заданный в админке и/или в условиях видимости этапов документооборота заявок
     * @param templateTopElem TopElem проверяемого элемента
     * @param personID идентификатор сотрудника
     * @param personTopElem TopElem карточки сотрудника
     * @param Session одноименный глобальный объект
     * @return результат проверки доступа (bool)
     * @example
     * tools_web.check_access(templateTopElem, personID, personTopElem, Session);
     */
    check_access?(
        templateTopElem: spXmlDoc,
        personID: Integer,
        personTopElem: spXmlDoc,
        Session: Session
    ): Bool;
    /**
     * Убирает из строки наличие SQL и XQuery injection
     * @param sValue строка для конвертирования
     * @return конвертированя строка (string)
     * @example
     * sSQuery = tools_web.convert_xss(Request.QueryString.slearning_name)
     * curObject.name = tools_web.convert_xss( Request.Form.name );
     */
    convert_xss?(sValue: String): String;
    /**
     * Вставки другого XAML шаблона внутри существующего
     * @param sXamlCode - код шаблона в базе WT
     * @return возвращает xaml шаблон
     * @example
     * <Panel>
     *  <%=tools_web.place_xaml("xaml_my_courses")%>
     * </Panel>
     *
     * Response.Write( tools_web.place_xaml( "desc_body" ) );
     */
    place_xaml?(sXamlCode: String): String;
    /**
     * Нет описания
     * @param iXamlId Идентификатор XAML-шаблона, который надо показать в окне, будем передавать в строке адреса
     * @param uValue неизвестно значение (null)
     * @example
     * <body>
  
     *                 <div>
  
     *                                 <%=tools_web.insert_custom_code(Request.Query.GetOptProperty("xaml_id",""), null)%>
  
     *                 </div>
  
     * </body>
     */
    insert_custom_code?(iXamlId: Integer, uValue: null): String;
    /**
     * Нет описания
     * Выполнение функции tools_web.env_to_script с аргументом Env
     * @param oEnv - объект сессии
     * @return возвращаемый результат неизвестено
     * @example
     * tools_web.env_to_script( Env )
     */
    env_to_script?(oEnv: Object): undefined;
    /**
     * Описание неполное
     * Получение глобальной константы локализации
     * @param sCode код
     * @param curLngWeb
     * @example
     * sConstAllStatuses = tools_web.get_web_const( 'vsestatusy', curLngWeb );
     */
    get_web_const?(sCode: String, curLngWeb: Object): String;
    /**
     * Нет описания
     * @param curObjectDoc
     * @param oEnv - объект сессии Request.Session.Env
     * @example
     * sConstAllStatuses = tools_web.get_web_const( 'vsestatusy', curLngWeb );
     */
    save_cur_object_doc?(curObjectDoc: spXmlDoc, oEnv: Object): void;
    /**
     * Нет описания
     * @param _param_str
     * @param _page_name
     */
    put_query_string?(_param_str: String, _page_name: String): String;
    /**
     * Нет описания
     */
    web_url?(): String;
    /**
     * Нет описания
     * @param oAttributesParam
     */
    doc_link?(oAttributesParam: Object): String;
    /**
     * Нет описания
     * @param oAttributesParam
     */
    get_web_str?(sNameParam: String): String;
    /**
     * Нет описания
     * @param sNameParam
     * @param fldLngParam
     */
    eval_web_column_const?(sNameParam: String, fldLngParam: Object): String;
    /**
     * Нет описания
     * @param sNameParam
     * @param fldLngParam
     */
    get_web_desc?(
        _text: String,
        _url: String,
        _path: String,
        Env: Object
    ): String;
    /**
     * Нет описания
     * @param fldTarget
     * @param oSourceParam
     * @param arrCustomElemsParam
     * @param oParams
     */
    custom_elems_filling?(
        fldTarget: spXmlElem,
        oSourceParam: Object,
        arrCustomElemsParam: Array<any>,
        oParams: Object
    ): Object;
    /**
     * Нет описания
     * @param _catalog
     * @param _top_id
     * @param _source
     * @param _request_form
     * @param _value_flag
     * @param sCharsetParam
     * @param arrFields
     */
    web_custom_elems_filling?(
        _catalog: String,
        _top_id: Integer,
        _source: spXmlDoc,
        _request_form: spXmlDoc,
        _value_flag: Bool,
        sCharsetParam: String,
        arrFields: Array<any>
    ): Object;
    /**
     * Нет описания
     * @param docObjectParam
     * @param oContextParam
     * @param arrFieldNamesParam
     * @param sPrefixParam
     */
    update_object_from_context?(
        docObjectParam: spXmlDoc,
        oContextParam: Object,
        arrFieldNamesParam: Array<any>,
        sPrefixParam: String
    ): void;
    /**
     * Нет описания
     * @param sUrlParam
     * @param _flag
     * @param _params
     */
    get_query_string_from_url?(
        sUrlParam: String,
        _flag: Bool,
        _params: String
    ): String;
    /**
     * Нет описания
     * @param _url
     */
    get_url_protocol?(_url: String): String;
    /**
     * Нет описания
     * @param sTextParam
     */
    get_cur_lng_name?(sTextParam: String): String;
    /**
     * Нет описания
     * @param oCustomWebTemplateParam
     */
    write_custom_web_template?(oCustomWebTemplateParam: Object): Bool;
    /**
     * Нет описания
     * @param iOverrideWebTemplateIDParam
     * @param Session
     * @param curUserID
     * @param curUser
     * @param curAnonymousAccess
     * @param teActiveWebTemplateParam
     */
    get_override_web_template?(
        iOverrideWebTemplateIDParam: Integer,
        Session: Session,
        curUserID: Integer,
        curUser: spXmlDoc,
        curAnonymousAccess: null,
        teActiveWebTemplateParam: spXmlDoc
    ): spXmlDoc | undefined;
    /**
     * Нет описания
     * @param Session
     * @param oZoneParam
     * @param curActiveWebTemplate
     * @param bAddWebTemplate
     */
    get_override_web_templates?(
        Session: Session,
        oZoneParam: Object,
        curActiveWebTemplate: Object,
        bAddWebTemplate: Bool
    ): Array<any>;
    /**
     * Нет описания
     * @param sZoneParam
     */
    place_zone?(sZoneParam: String): String;
    /**
     * Нет описания
     * @param OPERATION_ID
     * @param S_SCRIPT_TYPE
     * @param O_PARAMS
     */
    get_operation_script?(
        OPERATION_ID: Integer,
        S_SCRIPT_TYPE: String,
        O_PARAMS: Object
    ): String;
    /**
     * Нет описания
     * @param OPERATION_ID
     * @param S_SCRIPT_TYPE
     * @param O_PARAMS
     */
    eval_operation_script?(
        OPERATION_ID: Integer,
        S_SCRIPT_TYPE: String,
        O_PARAMS: Object
    ): String;
    /**
     * Нет описания
     * @param iForumIDParam
     * @param iUserIDParam
     * @param teForumParam
     */
    is_moderator_forum?(
        iForumIDParam: Integer,
        iUserIDParam: Integer,
        teForumParam: spXmlDoc
    ): Bool;
    /**
     * Нет описания
     * @param iForumEntryIDParam
     * @param teUserParam
     * @param iUserIDParam
     * @param teForumEntryParam
     */
    is_privilege_collaborator?(
        iForumEntryIDParam: Integer,
        teUserParam: spXmlDoc,
        iUserIDParam: Integer,
        teForumEntryParam: spXmlDoc
    ): Bool;
    /**
     * Узнать прочитан ли форум
     * @param _forum_id id форума
     * @param _user_id id пользователя
     */
    is_forum_readed?(_forum_id: Integer, _user_id: Integer): Bool;
    /**
     * Нет описания
     * @param catForumEntryParam
     * @param teUserParam
     * @param iUserIDParam
     * @param teForumParam
     */
    check_forum_entry_access?(
        catForumEntryParam: String,
        teUserParam: spXmlDoc,
        iUserIDParam: Integer,
        teForumParam: spXmlDoc
    ): Bool;
    /**
     * Нет описания
     * @param iForumEntryIDParam
     */
    remove_forum_entry?(iForumEntryIDParam: Integer): Bool;
    /**
     * Нет описания
     * @param iForumEntryIDParam
     */
    close_forum_entry?(iForumEntryIDParam: Integer): Bool;
    /**
     * Нет описания
     * @param _object_name
     * @param _object_value
     * @param format
     */
    draw_calendar?(
        _object_name: String,
        _object_value: String,
        format: String
    ): String;
    /**
     * Нет описания
     * @param _source_files_doc
     */
    web_files_process?(_source_files_doc: String): void;
    /**
     * Нет описания
     * @param _text_area
     * @param _source_desc
     */
    convert_xhttp_res?(_text_area: String, _source_desc: String): String;
    /**
     * Нет описания
     * @param CATALOG
     * @param USER_ID
     * @param DOC_HIMSELF
     * @param MAKE_NEW_ON_ABSENCE
     */
    get_my_person_object_link_card?(
        CATALOG: String,
        USER_ID: Integer,
        DOC_HIMSELF: Bool,
        MAKE_NEW_ON_ABSENCE: Bool
    ): spXmlDoc | undefined;
    get_person_object_info?();
    set_person_object_info?();
    get_object_owners?();
    insert_custom_code?();
    place_xaml_player?();
    convert_bbcode_to_html?();
    convert_html_to_bbcode?();
    convert_bbtags_to_html?();
    get_bbcode_tag_ids?();
    get_new_request_by_query?();
    update_community_authors?();
    evaluate_remote_action?();
    Unsqueeze?();
    get_collection_param?();
    external_eval?();
    object_init?();
    get_column_width?();
    get_catalog_list_arrays?();
    check_session_user?();
    init_cur_active_web_template?();
    save_cur_active_web_template?();
    drop_active_web_templates?();
    get_session_lng?();
    check_site_access?();
    get_resource_url?();
    get_custom_web_template_url?();
    get_object_source_url?();
    GetTalentPoolObjectsList?();
    GetRequiredQualificationsList?();
    get_recommended_materials?();
    set_var_eval?();
    get_var_eval?();
    convert_desc_to_html?();
    get_user_recommended_learning?();
    obtain_text_area?();
    get_host_name?();
    get_cur_host_name?();
    get_cur_host_path?();
    get_cur_host_path_by_url?();
    get_cur_host?();
    is_correct_question?();
    build_query_url?();
    build_relative_url?();
    set_modified_response_status?();
    str_utc_mime_date?();
    get_tracking_url?();
    create_resource_from_attacment?();
    get_key_positions_list?();
    url_std_content_type?();
    write_url_to_response?();
    get_valid_url?();
    get_active_web_template_hash?();
    build_submatched_string?();
    user_init?();
    GetProjectManagementObjectsList?();
    CheckRelativeFileVisibility?();
    get_date_passed_string?();
    get_date_remain_string?();
    get_host_obj?();
    get_default_lng_web?();
    get_profiling_statistic_rec_id?();
    start_profiling_record?();
    finish_profiling_record?();
    GetVacancyResponseStatus?();
    html_decode?();
    html_to_imput_value?();
    set_st_category?();
    content_types?();
    set_st_category?();
    get_child_by_key_value?();
    get_object_image_url?();
    str_file_size?();
    get_base_url_path?();
    set_base_url_path?();
    get_menu_items?();
    get_secid?();
    check_secid?();
    clear_person_pict_cache?();
    get_item_objectives_value?();
    obtain_item_objectives_value?();
    send_message?();
    replace_condition_operators?();
    get_header_obj?();
    get_multipart_array?();
    /**
     * Нет описания
     * @param curUser пользователь относительно которого строится рейтинг
     * @param bCheckLevel строит рейтинг с учетом последовательности уровней
     * @param sCurrencyTypeID строится рейтинг по сотрудникам с любым уровнем, иначе только по сотрудникам с тем же уровнем что и указанный сотрудник
     * @param bAllLevel валюта по которой строится рейтинг ( обязательный если bCheckLevel=false, иначе не учитывается )
     * @param bDispSub рейтинг только по сотрудникам подразделения указанного пользователя ( необязательный )
     * @param iSubDepth количество подразделений вверх по иерархии ( для bDispSub=true )
     */
    get_game_rating?(
        curUser: Integer,
        bCheckLevel: Bool,
        sCurrencyTypeID: String,
        bAllLevel: Bool,
        bDispSub?: Bool,
        iSubDepth: Integer
    ): Object;
    /**
     * Нет описания
     * @param iObjectId id объекта, по которому определяется timezone
     * @param catObject элемент XQuery или TopElem документа объекта, по которому определяется timezone
     */
    get_timezone?(iObjectId: Integer, catObject: spXmlDoc): Integer | null;
    /**
     * Нет описания
     * @param dDate дата, которую необходимо перевести
     * @param catTimeZone1 временная зона из которой нужно перевести
     * @param catTimeZone2 временная зона в которую нужно перевести
     */
    get_timezone_date?(
        dDate: Date,
        catTimeZone1: String,
        catTimeZone2: String
    ): Date;
    get_class_for_status?();
    transform_fancy_url?();
    get_lng_fullname?();
}
