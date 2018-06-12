// Using the DataTables Plugin for displaying the data in the tabular format

$(document).ready(function () {
		$.ajax({
            url : '/api/test/',
            type : 'GET',
            dataType : 'json',
			async: false,
            success : function(data) {
                testdata(data);
            }
        });
        function testdata(data) {
            var table = $('#test_table').dataTable({
                "bAutoWidth" : false,
                data : data,
				//order: [ 1, 'desc' ],
                "columns" : [ {
                    "data" : "Animal_ID"
                }, {
                    "data" : "eartag"
                }, {
                    "data" : "eid"
                }, {
                    "data" : "sex"
                }, {
                    "data" : "pasturenumber"
                }, {
                    "data" : "breed"
                }, {
                    "data" : "status"
                }, {
                    "data" : "current_expt_no"
                }, {
                    "data" : "Herd"
                }, {
                    "data" : "animaltype"
                }, {
                    "data" : "animalname"
                }, {
                    "data" : "breeder"
                }, {
                    "data" : "currentframescore"
                }, {
                    "data" : "damframescore"
                }, {
                    "data" : "comments"
                }, {
                    "data" : "species"
                }, {
                    "data" : "height"
                }, {
                    "data" : "weight"
                }, {
                    "data" : "gender"
                }, {
                    "data" : "email_id"
                } ]
            });
        }	
	});




// $(document).ready(function(e){
	// $.ajax({
			// url: '/api/test',
			// data: {},
			// type: 'GET',
			// datatype : 'json',
			// async: false,
			// success: function(data) {
				// console.log(data);
				// $(data).each(function(i,elem){
					// var options= "";
					// options += "<tr>";
					// $(elem).each(function(i,column){
						// options += "<td>"+column+"</td>";
					// });
					// options +="</tr>";
					// str = options.replace(/^"(.*)"$/, '$1');
					// $(str).appendTo("#add_new_row");
				// });
			// },
			// error: function(error) {
				// console.log(error)
				// $.notify("Animal_Inventory Failed", "error")
			// }
		// });
// });