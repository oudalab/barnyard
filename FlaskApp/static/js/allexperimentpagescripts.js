	$(document).ready(function () {
		$.ajax({
            url : '/api/groupall/',
			data:{},
            type : 'GET',
            dataType : 'json',
            success : function(data) {
                assignToEventsColumns(data);
            }
        });
	
	
		function assignToEventsColumns(data) {
			$('#table_allexperiment').DataTable( {
				data: data.data,
				columns: [
					{ "data": "attributes.groupname" },
					{ "data": "attributes.groupdescription" },
					{ "data": "attributes.groupnumber" },
					{ "data": "attributes.cownumber" }
				]
			});
		};
	});