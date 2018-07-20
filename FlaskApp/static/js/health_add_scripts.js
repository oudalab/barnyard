$(document).ready(function () {
	$.ajax({
		url : '/api/inventory/formulary/',
		type : 'GET',
		dataType : 'json',
		async: false,
		success : function(data) {
			console.log(data);
			$(data).each(function(j,elem){
				$("<option value='"+elem.Medicine_ID+"'>"+ elem.drug +" </option>").appendTo("#Medical_ID");
			});
		},
		error: function(response){
			console.log(response);
		}
	});
});

$('#Add_Button').click(function() {
	var animalname = $("#animalname").val();
	var Animal_ID;
	$.ajax({
		url : '/api/health/add/'+animalname,
		type : 'GET',
		dataType : 'json',
		async: false,
		success : function(data) {
			console.log(data);
			Animal_ID = data[0].Animal_ID;
		},
		error: function(response){
			console.log(response);
		}
	});
	
	var data = {
		Animal_id : Animal_ID,
		create_date : $("#create_date").val(),
		email_id : "test",
		Medicine_ID : $("#Medical_ID").val(),
		medical_notes : $("#medical_notes").val(),
		location : $("#location").val(),
		Amt_given : $("#Amt_given").val(),
		route : $("#route").val(),
		water_feed : $("#water_feed").val(),
		result : $("#result").val(),
		withdraw_time : $("#withdraw_time").val()
	}
	var dataJson = JSON.stringify(data);
	console.log(dataJson);
	$.ajax({
		url: '/api/health/add/',
		data: dataJson,
		type: 'POST',
		dataType: 'json',
		success: function(response) {
			console.log(response);
			$.notify("Data Saved", "info");
		},
		error: function(response) {
			console.log(response);
			$.notify("Data Not saved", "error");					
		}
	});
});