

function InitVaForm(roleEditorId) {
    require.ensure(["../../../../modules/vaform.js"],
        function () {
            var vaform = require("../../../../modules/vaform.js");
            vaform.for($("#"+roleEditorId+" form",
                function () {
                    alert("保存成功");
                }));
        });
}


function CreateEditor(strEditorId)
{
    var editor = avalon.define({
	    $id: 'roleEditor',
	    role: { Id: "", Name: "", Remark: "" },
	    save: function () {
	        $("form", $editorDialog).submit();
	    },
	    cancel: function () {
	
	    }
	});
    return editor;
}

module.exports={
    create:function(editorId){
		InitVaForm(editorId);
		return CreateEditor(editorId);

	} //editorId 也是form的Id，也是controller的Id
}