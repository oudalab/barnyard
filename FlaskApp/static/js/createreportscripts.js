	$('#submit_createreport').click(function(e) {
		var jsonattributes = [];	
		var newattributes;			
		$(".createreportinput").each(function(i, elem){
			if($(this).is(":checked")){
				newattributes = $(elem).val();
				jsonattributes.push(newattributes);
			}
		});
		var attributes = JSON.stringify(jsonattributes);
		
		var groupnumber = $('#groupnumber').val();
		var cownumber = $('#cownumber').val().split(",");
		var cownumber = JSON.stringify(cownumber);
		var eid = $('#eid').val().split(",");
		var eid = JSON.stringify(eid);
		var eartag = $('#eartag').val().split(",");
		var eartag = JSON.stringify(eartag);
		var start_date = $('#start_date').val();
		var str_date = Date.parse(start_date);
		console.log(str_date.toString('yyyy-MM-dd')); // 2012-02-09
		var end_date = $('#end_date').val();
		var ende_date = Date.parse(end_date);
		console.log(ende_date.toString('yyyy-MM-dd')); // 2012-02-09
		var createreport = {
			cownumber : cownumber,
			attributes : attributes,
			eid : eid,
			eartag : eartag,
			groupnumber : $('#groupnumber').val(),
			start_date : $('#start_date').val(),
			end_date : $('#end_date').val()
		};
		$.ajax({
			url: '/api/reporting/',
			data: createreport,
			datatype: 'json',
			type: 'POST',
			success: function(response) {
				console.log(response);
				$.notify("Report Coming up", "info");
				setTimeout(function() {
					window.location.href = '/reporting'
				}, 2000); 
			},
			error: function(error) {
				console.log(error)
				$.notify("Something went wrong :p", "danger");
			}
		});
	});