	$(function newherdchange() {
		$('#submit_newherdchange').click(function(e) {
			var jsonattributes = [];	
			var newattributes;			
			$(".herdchangeinput").each(function(i, elem){
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
			var herdchange = {
				cownumber : cownumber,
				attributes : attributes,
				eid : eid,
				eartag : eartag,
				groupnumber : $('#groupnumber').val()
			};
			$.ajax({
				url: '/api/herd_change/',
				data: herdchange,
				datatype: 'json',
				type: 'POST',
				success: function(response) {
					console.log(response);
					$.notify("Group Add data saved", "info");
					setTimeout(function() {
						window.location.href = '/herdchange'
					}, 2000); 
				},
				error: function(error) {
					console.log(error)
					$.notify("Group Add is facing some Issues", "danger");
				}
			});
		});
	});