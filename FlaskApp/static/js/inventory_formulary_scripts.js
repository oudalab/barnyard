$(document).ready(function () {
		$.ajax({
            url : '/api/inventory/formulary/',
            type : 'GET',
            dataType : 'json',
			async: false,
            success : function(data) {
				console.log(data);
                tablecall(data);
            },
			error: function(response){
				console.log(response);
			}
        });
})

function tablecall(data) {
    $('#table').bootstrapTable({
		filterControl: true,
		disableUnusedSelectOptions: true,
		singleSelect: true,
        data: data
    });
};