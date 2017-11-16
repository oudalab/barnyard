	$(function retriveCowNumber () {
		$('#submit_newherdchange').click(function(e) {
			var radioValue = $("input[name='type']:checked").val();
			if(radioValue == "animalnumber"){
				var cownumber_split = $('#cownumber').val().split(",");
				//var cownumber = JSON.stringify(cownumber_split);
				var parsed_list = [];
				$(cownumber_split).each(function(i, elem){
					$.ajax({
						url: '/api/animalname/'+elem,
						data: $('form').serialize(),
						type: 'GET',
						async: false,
						success: function(data) {
							parsed_list.push(String(data.data.attributes.cownumber));
						},
						error: function(error) {
							console.log(error);
							$.notify("Cow number doesnt exist", "danger");
						}
					});
				});
			newherdchange(parsed_list);	
			}
			else if(radioValue == "eid") {
				var cownumber_split = $('#eid').val().split(",");
				var parsed_list = [];
				$(cownumber_split).each(function(i, elem){
					$.ajax({
						url: '/api/eid/'+elem,
						data: $('form').serialize(),
						type: 'GET',
						async: false,
						success: function(data) {
							parsed_list.push(String(data.data.attributes.cownumber));
						},
						error: function(error) {
							console.log(error);
							$.notify("Cow number doesnt exist", "danger");
						}
					});
				});
			newherdchange(parsed_list);	
			}
			else if(radioValue == "groupnumber") {
				var searchboxvalue = $('#groupnumber').val();
				var parsed_list;
				$.ajax({
						url: '/api/group/'+searchboxvalue,
						data: {},
						type: 'GET',
						datatype : 'json',
						async : false,
						success: function(data) {
							console.log(data);
							var cownumber = data.data[0].attributes.cownumber;
							parsed_list = JSON.parse(cownumber);
						},
						error: function(error) {
							console.log(error);
							$.notify("EID does not exist", "danger");
						}	
				});
			newherdchange(parsed_list);		
			}
			else {
				var searchboxvalue = $('#eartag').val();
				$.ajax({
					url: '/api/eartag/'+searchboxvalue,
					data: $('form').serialize(),
					type: 'GET',
					async : false,
					success: function(data) {
						console.log(data);
					},
					error: function(error) {
						console.log(error);
						$.notify("Group number doesnt exist", "danger");
					}
				});
			}
			return false;	
		});
		
	});
	function newherdchange(parsed_list) {
		var jsonattributes = [];	
		var newattributes;	
		var emaillabel = get_email();	
		var cownumbers = JSON.stringify(parsed_list)
		var checked_item = $("input[name='type']:checked").val();		
		$(".herdchangeinput").each(function(i, elem){
			if($(this).is(":checked")){
				newattributes = $(elem).val();
				jsonattributes.push(newattributes);
			}
		});
		var attributes = JSON.stringify(jsonattributes);
		var herdchange = {
			cownumber : cownumbers,
			attributes : attributes,
			user : emaillabel,
			identifier : checked_item
		};
		console.log(herdchange);
		$.ajax({
			url: '/api/herdchange/',
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
	};