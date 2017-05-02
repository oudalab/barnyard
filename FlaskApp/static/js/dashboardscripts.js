// SCRIPTS FOR DASHBOARD
	$(function postBasic() {
	$('#basic_update').click(function(e) {
		var cownumber = $('#cownumber').val()
		var basic = {
			cownumber : $('#cownumber').val(),
			height: $('#height').val(),
			weight : $('#weight').val(),
			eartag : $('#eartag').val(),
			eid : $('#eid').val(),
			sex : $('#sex option:selected').text(),
			pasturenumber : $('#pasturenumber option:selected').text(),
			breed : $('#breed').val(),
			status : $('#status option:selected').text(),
			trial : $('#trial option:selected').text(),
			herd : $('#herd').val(),
			animaltype : $('#animaltype option:selected').text()
			}
			$.ajax({
				url: '/api/master_animal/',
				data: basic,
				datatype: 'json',
				type: 'PATCH',
				success: function(response) {
					console.log(response);
					$.notify("Basic Data Saved", "info");
				},
				error: function(error) {
					console.log(error)
					$.notify("Cow number already exist", "danger");
				}
			});
			e.preventDefault();
		});
	});
	$(function postAnimalInventory() {

	$('#basic_update').click(function(e) {
		var cownumber = $('#cownumber').val()
		var animal_inventory = {
			cownumber : $('#cownumber').val(),
			brand : $('#brand').val(),
			brandlocation: $('#brandlocation option:selected').text(),
			tattooleft : $('#tattooleft').val(),
			tattooright : $('#tattooright').val(),
			alternativeid : $('#alternativeid').val(),
			registration: $('#registration').val(),
			color : $('#color').val(),
			hornstatus : $('#hornstatus option:selected').text(),
			dam : $('#dam').val(),
			sire : $('#sire').val(),
			dob : $('#dob').val(),
			howacquired : $('#howacquired option:selected').text(),
			dateacquired : $('#dateacquired').val(),
			howdisposed : $('#howdisposed option:selected').text(),
			datedisposed : $('#datedisposed').val(),
			disposalreason : $('#disposalreason').val()
			}
			$.ajax({
				url: '/api/animal_inventory/',
				data: animal_inventory,
				datatype: 'json',
				type: 'POST',
				success: function(animal_inventory) {
					console.log(animal_inventory)
					$.notify("Inventory Data Saved", "info");						
				},
				error: function(error) {
					console.log(error)
					$.notify("Check Error log", "error")
				}
			});
			e.preventDefault();
		});
	});
	$(function postExperiment() {

	$('#basic_update').click(function(e) {
		var cownumber = $('#cownumber').val()
		var experiment = {
			cownumber : $('#cownumber').val(),
			dam : $('#damexperiment').val(),
			sire : $('#sireexperiment').val(),
			birthweight : $('#birthweight').val(),
			damframescore : $('#damframescore').val(),
			sireframescore : $('#sireframescore').val(),
			dob : $('#dobexperiment').val(),
			weanheight : $('#weanheight').val(),
			weanweight : $('#weanweight').val(),
			weandate : $('#weandate').val(),
			adj205w : $('#adj205w').val(),
			adj205h : $('#adj205h').val(),
			weanframescore : $('#weanframescore').val(),
			ageatwean : $('#ageatwean').val(),
			yearlingweight : $('#yearlingweight').val(),
			yearlingheight : $('#yearlingheight').val(),
			yearlingdate : $('#yearlingdate').val(),
			adjyearlingh : $('#adjyearlingh').val(),
			adjyearlingw : $('#adjyearlingw').val(),
			yearlingframescore : $('#yearlingframescore').val(),
			ageatyearling : $('#ageatyearling').val(),
			customweight : $('#customweight').val(),
			customheight : $('#customheight').val(),
			customheightdate : $('#customheightdate').val(),
			customweightdate : $('#customweightdate').val(),
			backfat : $('#backfat').val(),
			treatment : $('#treatment option:selected').text(),
			blockpen : $('#blockpen').val(),
			replicate : $('#replicate').val()
			}
			$.ajax({
				url: '/api/experiment/',
				data: experiment,
				datatype: 'json',
				type: 'POST',
				success: function(experiment) {
					console.log(experiment)
					$.notify("Experiment Data Saved", "info");
				},
				error: function(error) {
					console.log(error)
					$.notify("Input Experiment, Error log", "error")
				}
			});
			e.preventDefault();
		});
	});
	$(function postReproduction() {
	$('#basic_update').click(function(e) {
		var cownumber = $('#cownumber').val()
		var reproduction = {
			cownumber : $('#cownumber').val(),
			breeding: $('#breeding option:selected').text(),
			pregnancy: $('#pregnancy option:selected').text(),
			calfatside : $('#calfatside').val(),
			totalcalves : $('#totalcalves').val(),
			previouscalf : $('#previouscalf').val(),
			damageatbirth : $('#damageatbirth').val(),
			currentcalf : $('#currentcalf').val(),
			calfdob : $('#calfdob').val(),
			calfsex : $('#calfsex option:selected').text(),
			calfbirthweight : $('#calfbirthweight').val(),
			damcalvingdisposition : $('#damcalvingdisposition option:selected').text(),
			calvingease : $('#calvingease option:selected').text(),
			udderscore: $('#udderscore').val(),
			comments: $('#comments').val(),
			damdisposition: $('#damdisposition option:selected').text(),
			cowframescore : $('#cowframescore').val(),
			cowwtbreeding : $('#cowwtbreeding').val(),
			cowwtcalving : $('#cowwtcalving').val(),
			cowwtweaning : $('#cowwtweaning').val(),
			cowhtbreeding : $('#cowhtbreeding').val(),
			cowhtcalving : $('#cowhtcalving').val(),
			cowhtweaning: $('#cowhtweaning').val(),
			bcsbreeding: $('#bcsbreeding').val(),
			bcscalving: $('#bcscalving').val(),
			bcsweaning: $('#bcsweaning').val(),
			customcowht: $('#customcowht').val(),
			customcowwt: $('#customcowwt').val(),
			bulldisposition: $('#bulldisposition').val(),
			bullframescore: $('#bullframescore').val(),
			bullwtprebreeding: $('#bullwtprebreeding').val(),
			bullhtprebreeding: $('#bullhtprebreeding').val(),
			fertility: $('#fertility').val(),
			mobility: $('#mobility').val(),
			conc: $('#conc').val(),
			pasturenumberreproduction: $('#pasturenumberreproduction').val(),
			deadabnormal: $('#deadabnormal').val()
			}
			$.ajax({
				url: '/api/reproduction/',
				data: reproduction,
				datatype: 'json',
				type: 'POST',
				success: function(response) {
					console.log(response);
					$.notify("Reproduction Data Saved", "info");
				},
				error: function(error) {
					console.log(error);
					$.notify("Reproduction Data Error", "danger");
				}
			});
			e.preventDefault();
		});
	});
	$(function postMedical() {
	$('#basic_update').click(function(e) {
		var cownumber = $('#cownumber').val()
		var medical = {
			cownumber : $('#cownumber').val(),
			reasonforprocedure: $('#reasonforprocedure').val(),
			notificationofvmo : $('#notificationofvmo option:selected').text(),
			recommendationofvmo : $('#recommendationofvmo').val(),
			treatmentprotocol : $('#treatmentprotocol').val(),
			animallocationpreresolution : $('#animallocationpreresolution').val(),
			followupexam : $('#followupexam').val(),
			resolution : $('#resolution').val(),
			dateoffollowup : $('#dateoffollowup').val(),
			animallocation : $('#animallocation').val(),
			dateofaction : $('#dateofaction').val()
			}
			$.ajax({
				url: '/api/medical/',
				data: medical,
				datatype: 'json',
				type: 'POST',
				success: function(response) {
					console.log(response);
					$.notify("Medical Data Saved", "info");
				},
				error: function(error) {
					console.log(error)
					$.notify("Cow number already exist", "danger");
				}
			});
			e.preventDefault();
		});
	});
	$(function postGrazing() {
	$('#basic_update').click(function(e) {
		var cownumber = $('#cownumber').val()
		var grazing = {
			cownumber : $('#cownumber').val(),
			pastureacres: $('#pastureacres').val(),
			animalspresent : $('#animalspresent').val(),
			datein : $('#datein').val(),
			dateout : $('#dateout').val(),
			stockingrate : $('#stockingrate').val()
			}
			$.ajax({
				url: '/api/grazing/',
				data: grazing,
				datatype: 'json',
				type: 'POST',
				success: function(response) {
					console.log(response);
					$.notify("Grazing Data Saved", "info");
				},
				error: function(error) {
					console.log(error)
					$.notify("Cow number already exist", "danger");
				}
			});
			e.preventDefault();
		});
	});
	$(document).ready(function(){
		var cownumber = getQueryVariable("cownumber")
		basicget(cownumber);
		animal_inventoryget(cownumber);
		experimentget(cownumber);
		reproductionget(cownumber);
		medicalget(cownumber);
		grazingget(cownumber);
		$("<li><a onclick='callall("+cownumber+")'> "+cownumber+"</a></li>").prependTo( "#latestcow");
	});
	
