
$('#SearchButton').click(function(e) {
	var searchboxvalue = $('#SearchAnimal').val();
	console.log(searchboxvalue);
	$.notify("Search for Animal:"+ searchboxvalue, "info");
	window.location.href = '/animal/update?animalname='+searchboxvalue;
});

$(document).ready(function(){
		var animalname = getQueryVariable("animalname")
		$.ajax({
				url: '/api/animal/update/'+animalname,
				data: $('form').serialize(),
				type: 'GET',
				success: function(response) {
					console.log(response);
					$('#Animal_ID').val(response[0].Animal_ID);
					$('#height').val(response[0].height);
					$('#weight').val(response[0].weight);
					$('#eartag').val(response[0].eartag);
					$('#eid').val(response[0].eid);
					$('#sex option:selected').text(response[0].sex);
					$('#pasturenumber').val(response[0].pasturenumber);
					$('#breed').val(response[0].breed);
					$('#status option:selected').text(response[0].status);
					$('#trial').val(response[0].trial);
					$('#herd').val(response[0].herd);
					$('#animaltype option:selected').text(response[0].animaltype);
					$('#animalname').val(response[0].animalname);
					$('#animalgroup').val(response[0].animalgroup);
					$('#breeder').val(response[0].breeder);
					$('#currentframescore').val(response[0].currentframescore);
					$('#damframescore').val(response[0].damframescore);
					$('#comments').val(response[0].comments);
					$('#species').val(response[0].species);
					$('#brand').val(response[0].brand);
					$('#brandlocation option:selected').text(response[0].brandlocation);
					$('#tattooleft').val(response[0].tattooleft);
					$('#tattooright').val(response[0].tattooright);
					$('#alternativeid').val(response[0].alternativeid);
					$('#registration').val(response[0].registration);
					$('#color').val(response[0].color);
					$('#dam').val(response[0].dam);
					$('#sire').val(response[0].sire);
					$('#dob').val(response[0].dob);
					$('#hornstatus option:selected').text(response[0].hornstatus);
					$('#howacquired option:selected').text(response[0].howacquired);
					$('#dateacquired').val(response[0].dateacquired);
					$('#howdisposed option:selected').text(response[0].howdisposed);
					$('#datedisposed').val(response[0].datedisposed);
					$('#disposalreason').val(response[0].disposalreason);
					$('#springfall option:selected').text(response[0].springfall);
					$('#includeinlookups option:selected').text(response[0].includeinlookups);
					$('#herdnumberlocation').val(response[0].herdnumberlocation);
					$('#herdstatus').val(response[0].herdstatus);
					$('#managementcode').val(response[0].managementcode);
					$('#ownerID').val(response[0].ownerID);
					$('#howconceived').val(response[0].howconceived);
				},
				error: function(error) {
					console.log(error);
					$.notify("Animal Name doesnt exist", "danger");
				}	
		});
	});