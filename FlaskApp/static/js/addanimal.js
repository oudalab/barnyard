$(function () {
	$('#basic_update').click(function(e) {
		
		var basic = {
			animalname : $('#animalname').val(),
			email_ID : $('#animalnumber').val(),
			height: $('#height').val(),
			weight : $('#weight').val(),
			eartag : $('#eartag').val(),
			eid : $('#eid').val(),
			sex : $('#sex option:selected').text(),
			pasture_ID : $('#pasturenumber').val(),
			breed : $('#breed').val(),
			status : $('#status option:selected').text(),
			current_expt_no : $('#trial').val(),
			Herd : $('#herd').val(),
			breeder : $('#breeder').val(),
			currentframescore : $('#currentframescore').val(),
			damframescore : $('#damframescore').val(),
			comments : $('#comments').val(),
			species : $('#species').val(),
			animaltype : $('#animaltype option:selected').text(),
			brand : $('#brand').val(),
			brandlocation: $('#brandlocation').val(),
			tattooleft : $('#tattooleft').val(),
			tattooright : $('#tattooright').val(),
			alternativeid : $('#alternativeid').val(),
			registration : $('#registration').text(),
			color : $('#color').val(),
			hornstatus : $('#hornstatus').val(),
			dam : $('#dam').text(),
			sire : $('#sire').val(),
			DOB : $('#DOB').val(),
			howacquired : $('#howacquired').val(),
			dateacquired : $('#dateacquired').val(),
			howdisposed : $('#howdisposed').val(),
			datedisposed : $('#datedisposed').val(),
			disposalreason : $('#disposalreason').val(),
			herdnumberlocation : $('#herdnumberlocation').val(),
			herdstatus : $('#herdstatus').text(),
			howconceived : $('#howconceived').val(),
			managementcode : $('#managementcode').val(),
			ownerID: $('#ownerID').val(),
			springfall : $('#springfall').val(),
			includeinlookups : $('#includeinlookups').val()
			}
			$.ajax({
				url: '/animal/addanimal',
				data: basic,
				datatype: 'json',
				type: 'POST',
				success: function(response) {
					console.log(basic);
					console.log(response);
					$.notify("Data Saved", "info");
				},
				error: function(error) {
					console.log(error)
					$.notify("Data not saved", "danger");
				}
			});
			e.preventDefault();
		});
	});
	
	
/*$(document).ready(function(){
		var animalname = getQueryVariable("animalname")
		// $.ajax({
				// url: '/api/master_animal/'+cownumber,
				// data: $('form').serialize(),
				// type: 'GET',
				// success: function(response) {
					// var animalname = response.data.attributes.animalname;
					// basicget(cownumber);
					// animal_inventoryget(cownumber);
					// experimentget(cownumber);
					// reproductionget(cownumber);
					// medicalget(cownumber);
					// grazingget(cownumber);
					// $("<li><a onclick='callall("+cownumber+")'> "+animalname+" - "+cownumber+"</a></li>").prependTo("#latestcow");
				// },
				// error: function(error) {
					// console.log(error);
					// $.notify("Cow number doesnt exist", "danger");
				// }	
		// });
	});*/