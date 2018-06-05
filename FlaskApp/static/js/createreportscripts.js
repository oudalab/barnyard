$(function retriveCowNumber () {
	$('#submit_createreport').click(function(e) {
		var radioValue = $("input[name='type']:checked").val();
		if(radioValue == "animalname"){
			var animalname_split = $('#animalname').val().split(",");
			var parsed_list = [];
			$(animalname_split).each(function(i, elem){
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
			var eid_split = $('#eid').val().split(",");
			var parsed_list = [];
			$(eid_split).each(function(i, elem){
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
			var eartag_split = $('#eartag').val().split(",");
			var parsed_list = [];
			$(eartag_split).each(function(i, elem){
				$.ajax({
					url: '/api/eartag/'+elem,
					data: $('form').serialize(),
					type: 'GET',
					async : false,
					success: function(data) {
						parsed_list.push(String(data.data.attributes.cownumber));
					},
					error: function(error) {
						console.log(error);
						$.notify("Group number doesnt exist", "danger");
					}
				});
			});
		newherdchange(parsed_list);	
		}
		return false;	
	});
	
});
	
function newherdchange(parsed_list) {
		var jsonattributes = ["cownumber"];	
		var radioValue = $("input[name='type']:checked").val();
		if(radioValue == "animalname"){
			jsonattributes.push("animalname");
		}
		else if(radioValue == "eid") {
			jsonattributes.push("eid");
		}
		else if(radioValue == "eartag") {
			jsonattributes.push("eartag");
		}
		var newattributes;			
		$(".createreportinput").each(function(i, elem){
			if($(this).is(":checked")){
				newattributes = $(elem).val();
				jsonattributes.push(newattributes);
			}
		});
		var attributes = JSON.stringify(jsonattributes);
		var groupnumber = $('#groupnumber').val();
		var reportnumber = $('#report_number').val();
		var emaillabel = get_email();	
		var cownumbers = JSON.stringify(parsed_list)
		var start_date = $('#start_date').val();
		var end_date = $('#end_date').val();
		var createreport = {
			cownumber : cownumbers,
			reportnumber: reportnumber,
			attributes : attributes,
			start_date : start_date,
			end_date : end_date,
			user: emaillabel
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
					window.location.href = '/reporting?reportnumber='+reportnumber
				}, 2000); 
			},
			error: function(error) {
				console.log(error)
				$.notify("Something went wrong :p", "danger");
			}
		});	
return false;		
};	
