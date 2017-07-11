	$(document).ready(function () {
		$.ajax({
            url : '/api/groupall/',
            type : 'GET',
            dataType : 'json',
            success : function(data) {
                assignToEventsColumns(data);
            }
        });
        function assignToEventsColumns(data) {
            var table = $('#table_allexperiment').dataTable({
                "bAutoWidth" : false,
                data : data,
				//order: [ 1, 'desc' ],
                "columns" : [ {
                    "data" : "groupname"
                }, {
                    "data" : "groupdescription"
                }, {
                    "data" : "groupnumber"
                }, {
                    "data" : "cownumber"
                }]
            });
        }	
	});