<%
// 132 - Назначение курса сотруднику (уведомление руководителя)
function isInGroup(col_id, gr_id) {
    var xq = "for $e in group_collaborators where group_id=" + gr_id + " and collaborator_id=" + col_id + " return $e";
    return ArrayOptFirstElem(XQuery(xq)) != undefined
}
if (isInGroup(tools.get_uni_user_boss(objDoc.person_id).id, 7261897522649114757)) {
    docActiveNotification = null;
} else {
    docActiveNotification.TopElem.sender.name = "Учебный портал Главгосэкспертизы России";
    TEXT = "Сотруднику " + objDoc.person_id.ForeignElem.fullname + " назначен курс " + objDoc.course_id.ForeignElem.name + ".";
}
%>
<%=TEXT%>
