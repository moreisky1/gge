

var template = {
    id: 
};

var template_xml = "<item>" + tools.object_to_text(template, "xml") + "</item>"; 
var item = custom_templates.request_type.items.ObtainChildByKey(template.id); 
item.Clear(); 
item.LoadData(template_xml); 
custom_templates.Doc.Save();