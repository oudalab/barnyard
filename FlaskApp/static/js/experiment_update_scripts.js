$(document).ready(function(){
	$.ajax({
		url : '/api/herd/create/',
		type : 'PATCH',
		dataType : 'json',
		async: false,
		success : function(data) {
			$(data).each(function(i,elem){
				elem.create_date = StringToDate(elem.create_date);
				var value = JSON.parse(elem.string);
				var attributes = "";
				$(value).each(function(i,elem){
					var string = elem.split("-");
					attributes += string[1];
					attributes += " ,";
				});
				elem.string = attributes.replace(/,\s*$/, "");
				
				var AIDs = elem.AIDs.split(",");
				var animalnames = "";
				$(AIDs).each(function(i,elem){
					$.ajax({
						url: '/api/animal/add/'+elem,
						data: $('form').serialize(),
						type: 'GET',
						async: false,
						success : function(response) {
							animalnames += response[0].animalname;
							animalnames += " ,";
							
						},
						error: function(response){
							console.log(response);
						}
					});	
				});
				var animalnameslist = animalnames.replace(/,\s*$/ , "");
				elem.animalname = animalnameslist;
			});
			tablecall(data);
		},
		error: function(response){
			console.log(response);
		}
	});
	function tablecall(data) {
		$('#table').bootstrapTable({
			filterControl: true,
			disableUnusedSelectOptions: true,
			singleSelect: true,
			data: data
		});
	};
});

$('#Edit').click(function() {
  var log= $('#table').bootstrapTable('getSelections');
  console.log(log);
  $("#name").val(log[0].name);
  $("#ExperimentEditModal").modal("show");
});
$('#Edit_Experiment_Yes').click(function() {
	var pasture_ID= $('#name').val();
	var myJSON = JSON.stringify(json);
	$.ajax({
		url: '/api/inventory/pasturehistory/',
		data: myJSON,
		datatype: 'json',
		type: 'PATCH',
		success: function(response) {
			console.log(response);
			alert("Data Saved");
			$.notify("Data Saved", "info");
		},
		error: function(error) {
			console.log(error)
			$.notify("Data not saved", "danger");
		}
	});
	setTimeout(location.reload(), 2000); 
});

$('#Delete').click(function() {
  var log= $('#table').bootstrapTable('getSelections');
  $("#nameDelete").val(log[0].name);
  $("#ExperimentDeleteModal").modal("show");
});
$('#Delete_Yes').click(function() {
	var pasturenumber= $('#pasturenumberDelete').val();
	var date = $('#DateDelete').val();
	$('#Delete_Pasture').empty();
	$.ajax({
		url: '/api/inventory/pasturehistory/'+pasturenumber+'/'+date,
		type : 'DELETE',
		async: false,
		success : function(data) {
			alert("Event data Deleted");
			setTimeout(location.reload(), 2000);
			$.notify("Event Data Deleted.");
		},
		error: function(response){
			$.notify("Not Deleted. Please contact IT");
		}
	});
});

$('#Delete_No').click(function() {
	$('#Delete_Pasture').empty();
});

$('#button_Done').click(function() {
  setTimeout(location.reload(), 2000);
});
	