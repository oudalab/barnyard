//Connected to Reporting.html

//Necessary global variables to bring informations into several functions 
var attributes="";
var start_date = "";
var end_date = "";
var table_create= "";
var identifier = "";
var emptylist=[];

//GET request to get the latest submitted create_report request
	$(document).ready(function(e){
		var reportnumber = getQueryVariable("reportnumber")
		$.ajax({
				url: '/api/reporting/'+reportnumber,
				data: {},
				type: 'GET',
				datatype : 'json',
				async: false,
				success: function(data) {
					attributes = $.parseJSON(data.data[0].attributes.attributes);
					createHeaderandFooter(attributes);
					start_date = data.data[0].attributes.start_date;
					end_date = data.data[0].attributes.end_date;
					var cownumber = data.data[0].attributes.cownumber;
					var cownumberlist = $.parseJSON(cownumber);
					$('#cownumber').val(cownumberlist);
					$(cownumberlist).each(function(i,elem){
							$.ajax({
								url: '/api/report_view/'+elem+'/'+start_date+'/'+end_date,
								data: {},
								type: 'GET',
								datatype : 'json',
								async: false,
								success: function(data) {
									fnClickAddRow(data, emptylist);
								},
								error: function(error) {
									console.log(error)
									$.notify("Views GET failed", "error")
									
								}	
							});		
					});
				},
				error: function(error) {
					console.log(error)
					$.notify("Report data GET Failed", "error")
					
				}
			});
	});


	
	function createHeaderandFooter(inputattributes){
		$(document).ready(function(e){
			var toappend = "<tr>";
			toappend += addattributes(inputattributes);
			toappend += "</tr>";
			$(toappend).appendTo("#reporttableheader");
			$(toappend).appendTo("#reporttablefooter");	
		});
		
	};

	
	function addattributes(inputattributes){
		var options="";
		$(inputattributes).each(function(i,elem){
			options += "<th>"+elem+"</th>";
			
		});
		return options;
		
	};
	
	//called from table initalization to creates the column names
	function addAttributesColumns(inputattributes){
		var options= [];
		$(inputattributes).each(function(i,elem){
			options.push({'"data"': ""+elem+""})
		});
		//console.log(options);
		return options;
		
	};
	
	// Add data to the DataTable called below
	function fnClickAddRow(data, emptylist){
		//First go through the data[0], data[1], ...., etc
		$(data).each(function(i,list){
			var attributelist = [];
			//Go through the attributes we want from the data.
			$(attributes).each(function(j,elem){
				
				if(typeof data[i][elem] === 'undefined') {
					//do nothing
				}
				else {
					// does exist
					attributelist.push(""+data[i][elem]+"");
				}	
			});
			emptylist.push(attributelist);
		});
		
	};	

$(document).ready( function() {
 initTable();
 tableActions();
} );

function initTable () {
 return table_create = $('#report_table').DataTable({
				"bSort": false,
				"retrieve": true,
				"bAutoWidth" : true,
				dom: 'Bfrtip',
				buttons: [
					'copyHtml5',
					'excelHtml5',
					'csvHtml5',
					'pdfHtml5'
				],
				"lengthMenu": [ [10, 25, 50, -1], [10, 25, 50, "All"]],
				"columns": addAttributesColumns(attributes)
			});
}

function tableActions () {
 var table = initTable();
	table.rows.add(emptylist).draw();
 // perform API operations with `table`
 // ...
}















	
	
	// $(document).ready(function(e){
		// $.ajax({
				// url: '/api/report_view/1/' +start_date +'/' +end_date,
				// data: {},
				// type: 'GET',
				// datatype : 'json',
				// async: false,
				// success: function(data) {
					// console.log(data);
				// },
				// error: function(error) {
					// console.log(error)
					// $.notify("Master_Animal Failed", "error")
					
				// }
			// });
	// });	
		

