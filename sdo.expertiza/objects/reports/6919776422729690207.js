// 6919776422729690207 - Общий отчет по оценке 360 (группа)

var role  = " ";
var space = " ";
var divider  = " ";
var new_mark_text_value1 = " ";
var omps_indicator_value1 = " ";
var new_mark_text_value2 = " ";
var omps_indicator_value2 = " ";
var new_mark_text_value3 = " ";
var omps_indicator_value3 = " ";
var new_mark_text_value4 = " ";
var omps_indicator_value4 = " ";
var new_mark_text_value5 = " ";
var omps_indicator_value5 = " ";
var new_mark_text_value6 = " ";
var omps_indicator_value6 = " ";
var new_mark_text_value7 = " ";
var omps_indicator_value7 = " ";
var new_mark_text_value8 = " ";
var omps_indicator_value8 = " ";

var condArray = ["1=1"];
if ({PARAM1} != null && {PARAM1} != "") {
    condArray.push("$elem/end_date >= " + XQueryLiteral({PARAM1}));
}
if ({PARAM2} != null && {PARAM2} != "") {
    condArray.push("$elem/end_date <= " + XQueryLiteral({PARAM2}));
}
var cond = ArrayMerge(condArray, "This", " and ")

arrFilteredAss = new Array();
arr_ASSESSM = XQuery("for $elem in assessment_appraises where MatchSome($elem/role_id, (7249616588246769367)) and " + cond + " return $elem");
// arr_ASSESSM = XQuery("assessment_appraises");

         for (elem_ASS in arr_ASSESSM) {
            ASS_doc = OpenDoc(UrlFromDocID(elem_ASS.id));
            elem_ASS_X =  ASS_doc.TopElem;
                 for (group in elem_ASS_X.groups)
	            {
	    person_assessm_group_ID = group.group_id;
                      arr_group = XQuery("for $gr in groups where $gr/id= "+person_assessm_group_ID+" return $gr");
                      for ( elem_group in  arr_group){
                                group_DOC = OpenDoc(UrlFromDocID(elem_group.id));
                                elem_TOP = group_DOC.TopElem;
                                group_ID = elem_TOP.id;
                                ///
                                for (collaborator in  elem_TOP.collaborators) {
                                         collab_group_ID = collaborator.collaborator_id;
                                         mygroupCol = ArrayOptFirstElem(XQuery("for $elem in group_collaborators where $elem/group_id=7250511083601225837 and $elem/collaborator_id=" + collaborator.collaborator_id.Value + " return $elem"))
                                        // if (mygroupCol != undefined) {
                                           arr_PAS = XQuery ("for $p in pas where  $p/person_id = "+collab_group_ID+" and  $p/assessment_appraise_id  = "+elem_ASS.id+" return $p");
                                           for (elem_PA in arr_PAS){
                                                 PA_doc = OpenDoc(UrlFromDocID(elem_PA.id));
                                                 elem_PA_X = PA_doc.TopElem;
                                                 Competences = elem_PA_X.competences;

           obj = new Object();
           obj.PrimaryKey = Int(elem_PA.id);
           obj.personName = Trim(elem_PA_X.person_id.sd.fullname);
           obj.expert_personName = Trim(elem_PA_X.expert_person_id.sd.fullname);
           obj.status = Trim(elem_PA_X.status);
            _AVERAGE = String(elem_PA_X.overall);
           obj.average= _AVERAGE.replace('.', ',');
               if(obj.status =='self'){
                  obj.role = 'cамооценка';
                  obj.status = 'самооценка';
                 }
                else if(obj.status =='manager'){
                  obj.role = 'подчиненный';
                  obj.status = 'руководитель';
                 }
                else if(obj.status =='coll'){
                  obj.role = ' кроссфункциональный коллега';
                  obj.status = 'кроссфункциональный коллега';
                 }
                 else if(obj.status =='staff'){
                  obj.role = 'руководитель';
                  obj.status = 'подчиненный';
                 }
for (competence in  Competences) {
    if (competence.competence_id == 5535258993959986278) {
        value_comps1 = String(competence.mark_value);
        obj.comps_samorazvitie= value_comps1.replace('.', ',');
        for(indicator in competence.indicators){
            indicator_value1 =String(indicator.mark_text);
            new_mark_text_value1 = indicator_value1.substr(indicator_value1.indexOf('&lt;/') + 19);
            final_value1 = new_mark_text_value1.slice(0,1);                     
            omps_indicator_value1 = omps_indicator_value1 +divider+ final_value1;                                                
            new_mark_text_value1 = " ";                       
        }
        obj.comps_indicator_value1 = omps_indicator_value1;  
        omps_indicator_value1 = " ";    
    }
    if (competence.competence_id == 7378697629483820561) {
        value_comps2 = String(competence.mark_value);
        obj.comps_innovazionnost= value_comps2.replace('.', ',');
        for(indicator in competence.indicators) {
            indicator_value2 =String(indicator.mark_text);
            new_mark_text_value2 = indicator_value2.substr(indicator_value2.indexOf('&lt;/') + 19);
            final_value2 = new_mark_text_value2.slice(0,1);                     
            omps_indicator_value2 = omps_indicator_value2 +divider+ final_value2;                                                
            new_mark_text_value2 = " ";                       
        }
        obj.comps_indicator_value2 = omps_indicator_value2;  
        omps_indicator_value2 = " ";    
    }
    if (competence.competence_id == 5984609489549809424) {
        value_comps3 = String(competence.mark_value);
        obj.comps_orientazia_na_relultat= value_comps3.replace('.', ',');
        for(indicator in competence.indicators){
            indicator_value3 =String(indicator.mark_text);
            new_mark_text_value3 = indicator_value3.substr(indicator_value3.indexOf('&lt;/') + 19);
            final_value3 = new_mark_text_value3.slice(0,1);                     
            omps_indicator_value3 = omps_indicator_value3 +divider+ final_value3;                                                
            new_mark_text_value3 = " ";                       
        }
        obj.comps_indicator_value3 = omps_indicator_value3;  
        omps_indicator_value3 = " ";    
    }
    if(competence.competence_id == 7378697629483820557){
        value_comps4 = String(competence.mark_value);
        obj.comps_analis_problem_prinjatie_resheniy= value_comps4.replace('.', ',');
        for (indicator in competence.indicators) {
            indicator_value4 =String(indicator.mark_text);
            new_mark_text_value4 = indicator_value4.substr(indicator_value4.indexOf('&lt;/') + 19);
            final_value4 = new_mark_text_value4.slice(0,1);                     
            omps_indicator_value4 = omps_indicator_value4 +divider+ final_value4;                                                
            new_mark_text_value4 = " ";                       
        }
        obj.comps_indicator_value4 = omps_indicator_value4;  
        omps_indicator_value4 = " ";    
    }
    if(competence.competence_id == 5535258993959986262){
        value_comps5 = String(competence.mark_value);
        obj.comandnost = value_comps5.replace('.', ',');
        for(indicator in competence.indicators){
            indicator_value5 =String(indicator.mark_text);
            new_mark_text_value5 = indicator_value5.substr(indicator_value5.indexOf('&lt;/') + 19);
            final_value5 = new_mark_text_value5.slice(0,1);                     
            omps_indicator_value5 = omps_indicator_value5 +divider+ final_value5;                                                
            new_mark_text_value5 = " ";                       
        }
        obj.comps_indicator_value5 = omps_indicator_value5;  
        omps_indicator_value5 = " ";    
    }
    //--------------------------------------------------------------------------------------------------
    if (competence.competence_id ==5733060818528599491) {
        value_comps6 = String(competence.mark_value);
        obj.postroenie_effectivnoy_comandy= value_comps6.replace('.', ',');
        for(indicator in competence.indicators){
            indicator_value6 =String(indicator.mark_text);
            new_mark_text_value6 = indicator_value6.substr(indicator_value6.indexOf('&lt;/') + 19);
            final_value6 = new_mark_text_value6.slice(0,1);                     
            omps_indicator_value6 = omps_indicator_value6 +divider+ final_value6;                                                
            new_mark_text_value6 = " ";                       
        }
        obj.comps_indicator_value6 = omps_indicator_value6;  
        omps_indicator_value6 = " ";
    }
    if (competence.competence_id ==5984609489549809428) {
        value_comps7 = String(competence.mark_value);
        obj.upravlenie_effectivnostiu= value_comps7.replace('.', ',');
        for (indicator in competence.indicators) {
            indicator_value7 =String(indicator.mark_text);
            new_mark_text_value7 = indicator_value7.substr(indicator_value7.indexOf('&lt;/') + 19);
            final_value7 = new_mark_text_value7.slice(0,1);                     
            omps_indicator_value7 = omps_indicator_value7 +divider+ final_value7;                                                
            new_mark_text_value7 = " ";                       
        }
        obj.comps_indicator_value7 = omps_indicator_value7;  
        omps_indicator_value7 = " ";
    }
        
    if (competence.competence_id ==5984609489549809432) {
        value_comps8 = String(competence.mark_value);
        obj.strategichescoe_myshlenie  = value_comps8.replace('.', ',');

        for (indicator in competence.indicators) {
            indicator_value8 =String(indicator.mark_text);
            new_mark_text_value8 = indicator_value8.substr(indicator_value6.indexOf('&lt;/') + 19);
            final_value8 = new_mark_text_value8.slice(0,1);                     
            omps_indicator_value8 = omps_indicator_value8 +divider+ final_value8;                                                
            new_mark_text_value8 = " ";                       
        }
        obj.comps_indicator_value8 = omps_indicator_value8;  
        omps_indicator_value8 = " ";    
    }
}
                      arrFilteredAss.push(obj);
                     }
               }
            // }
               ///
          }
     }
}

return arrFilteredAss;