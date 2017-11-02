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
				dom: 'Bfrtip',
				//order: [ 1, 'desc' ],
				buttons: [
					'copyHtml5',
					'excelHtml5',
					'csvHtml5',
					'pdfHtml5'
				],
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