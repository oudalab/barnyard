	$(function groupaddchecks() {
		$('#submit_newexperimentadd').click(function(e) {
			var jsonattributes = [];	
			var newattributes;			
			$(".groupaddinput").each(function(i, elem){
				if($(this).is(":checked")){
					newattributes = $(elem).val();
					jsonattributes.push(newattributes);
				}
			});
			var groupnumber = $('#groupnumber').val();
			var attributes = JSON.stringify(jsonattributes);
			var cownumber1 = $('#cownumber').val().split(",");
			var cownumber = JSON.stringify(cownumber1);
			var group = {
				cownumber : cownumber,
				attributes : attributes,
				groupname : $('#groupname').val(),
				groupnumber : $('#groupnumber').val(),
				groupdescription : $('#groupdescription').val()
			};
			$.ajax({
				url: '/api/group/',
				data: group,
				datatype: 'json',
				type: 'POST',
				success: function(response) {
					console.log(response);
					$.notify("Group Add data saved", "info");
					setTimeout(function() {
						window.location.href = '/experiment?groupnumber='+groupnumber
					}, 2000); 
				},
				error: function(error) {
					console.log(error)
					$.notify("Group Add is facing some Issues", "danger");
				}
			});
		});
	});