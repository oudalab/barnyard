// This is the page that consists all the scripts for Pharma Page

// Submit button AJAX
	$('#submit_button_pharma').click(function(e) {
		var drug = $('#drug').val();
		var pharma = {
			drug : $('#drug').val(),
			location: $('#location').val(),
			roa : $('#roa').val(),
			vialsize : $('#vialsize').val(),
			units : $('#units').val()
			}
			$.ajax({
				url: '/api/drug_inventory_dic_s/',
				data: pharma,
				datatype: 'json',
				type: 'POST',
				success: function(pharma) {
					console.log(pharma);
					alert("Data saved")
					location.reload()
				},
				error: function(error) {
					console.log(error)
					alert("This med already exist");
				}
			});
			e.preventDefault();
	});