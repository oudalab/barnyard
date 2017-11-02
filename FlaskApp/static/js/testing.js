$(document).ready(function(e){
	$.ajax({
			url: '/api/report_animal_inventory/1/2017-07-01/2017-08-01',
			data: {},
			type: 'GET',
			datatype : 'json',
			success: function(data) {
				console.log(data);
				console.log(data);
			},
			error: function(error) {
				console.log(error)
				$.notify("Animal_Inventory Failed", "error")
			}
		});
});