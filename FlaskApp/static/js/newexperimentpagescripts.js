	$(function retriveCowNumber () {
	$('#submit_newexperimentadd').click(function(e) {
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
		groupaddchecks(parsed_list);	
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
		groupaddchecks(parsed_list);	
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
		groupaddchecks(parsed_list);		
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
		groupaddchecks(parsed_list);	
		}
		return false;	
	});
	
});
	
	
	
	
function groupaddchecks(parsed_list){
	var jsonattributes = [];	
	var newattributes;			
	$(".groupaddinput").each(function(i, elem){
		if($(this).is(":checked")){
			newattributes = $(elem).val();
			jsonattributes.push(newattributes);
		}
	});
	var groupname1 = $('#groupname').val();
	var	groupnumber1 = $('#groupnumber').val();
	var	groupdescription1 = $('#groupdescription').val();
	var attributes = JSON.stringify(jsonattributes);
	var emaillabel = get_email();	
	var cownumbers = JSON.stringify(parsed_list);
	var group = {
		cownumber : cownumbers,
		attributes : attributes,
		user : emaillabel,
		groupname : groupname1,
		groupnumber : groupnumber1,
		groupdescription : groupdescription1
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
				window.location.href = '/experiment?groupnumber='+groupnumber1
			}, 2000); 
		},
		error: function(error) {
			console.log(error)
			$.notify("Group Add is facing some Issues", "danger");
		}
	});
};