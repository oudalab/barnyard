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
			trial : $('#trial').val(),
			herd : $('#herd').val(),
			animalname : $('#animalname').val(),
			animalgroup : $('#animalgroup').val(),
			breeder : $('#breeder').val(),
			currentframescore : $('#currentframescore').val(),
			damframescore : $('#damframescore').val(),
			comments : $('#damframescore').val(),
			species : $('#species').val(),
			animaltype : $('#animaltype option:selected').text()
			}
			$.ajax({
				url: '/api/master_animal/',
				data: basic,
				datatype: 'json',
				// Patch becasue we are using the second version of posting basic data (Has a cow number)
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
			brandlocation : $('#brandlocation').val(),
			tattooleft :$('#tattooleft').val(),
			tattooright : $('#tattooright').val(),
			alternativeid : $('#alternativeid').val(),
			registration : $('#registration').val(),
			color : $('#color').val(),
			hornstatus : $('#hornstatus option:selected').text(),
			dam : $('#damexperiment').val(),
			sire : $('#sireexperiment').val(),
			dob  : $('#dobexperiment').val(),
			howacquired : $('#howacquired option:selected').text(),
			dateacquired : $('#dateacquired').val(),
			howdisposed : $('#howdisposed option:selected').text(),
			datedisposed : $('#datedisposed').val(),
			disposalreason : $('#disposalreason').val(),
			herdnumberlocation : $('#herdnumberlocation').val(),
			herdstatus : $('#herdstatus').val(),
			howconceived : $('#howconceived').val(),
			managementcode : $('#managementcode').val(),
			ownerID : $('#ownerID').val(),
			springfall : $('#springfall option:selected').text(),
			includeinlookups : $('#includeinlookups option:selected').text()
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
					$.notify("Inventory Fail! Check Error log", "error")
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
			birthweightadj : $('#birthweightadj').val(),
			sireframescore : $('#sireframescore').val(),
			conditionscoreweaning2015 : $('#conditionscoreweaning2015').val(),
			conditionscoreweaning2016 : $('#conditionscoreweaning2016').val(),
			dob : $('#dobexperiment').val(),
			bcsrecent : $('#bcsrecent').val(),
			bcsprevious : $('#bcsprevious').val(),
			bcsdifference : $('#bcsdifference').val(),
			damwtatwean : $('#damwtatwean').val(),
			weanheight : $('#weanheight').val(),
			weanweight : $('#weanweight').val(),
			weandate : $('#weandate').val(),
			weangpd : $('#weangpd').val(),
			weanhipht : $('#weanhipht').val(),
			weanwda : $('#weanwda').val(),
			weanweightdate : $('#weanweightdate').val(),
			adj205w : $('#adj205w').val(),
			adj205h : $('#adj205h').val(),
			weanframescore : $('#weanframescore').val(),
			ageatwean : $('#ageatwean').val(),
			yearlingweight : $('#yearlingweight').val(),
			yearlingheight : $('#yearlingheight').val(),
			yearlingdate : $('#yearlingdate').val(),
			adjyearlingw : $('#adjyearlingw').val(),
			adjyearlingh : $('#adjyearlingh').val(),
			yearlingframescore : $('#yearlingframescore').val(),
			ageatyearling : $('#ageatyearling').val(),
			currentwtcow : $('#currentwtcow').val(),
			adj365dht : $('#adj365dht').val(),
			customweight : $('#customweight').val(),
			customheight : $('#customheight').val(),
			customweightdate : $('#customweightdate').val(),
			customheightdate : $('#customheightdate').val(),
			currentwtheifer : $('#currentwtheifer').val(),
			backfat : $('#backfat').val(),
			treatment : $('#treatment').val(),
			blockpen : $('#blockpen').val(),
			replicate : $('#replicate').val(),
			animaltype : $('#animaltype option:selected').text()
			}
			$.ajax({
				url: '/api/experiment/',
				data: experiment,
				datatype: 'json',
				type: 'POST',
				success: function(response) {
					console.log(response)
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
			siblingcode: $('#siblingcode option:selected').text(),
			conditionscorecalving : $('#conditionscorecalving').val(),
			hiphtbreeding2016: $('#hiphtbreeding2016').val(),
			hiphtweaning2015: $('#hiphtweaning2015').val(),
			hiphtweaning2016: $('#hiphtweaning2016').val(),
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
			stockingrate : $('#stockingrate').val(),
			pasturenumbergrazing: $('#pasturenumber').val(),
			sample: $('#sample').val(),
			biomass: $('#biomass').val(),
			DMavailable: $('#DMavailable').val(),
			cp: $('#cp').val(),
			cp1: $('#cp1').val(),
			cp2: $('#cp2').val(),
			cp3: $('#cp3').val(),
			cp4: $('#cp4').val(),
			pasturenumberburning: $('#pasturenumberburning').val(),
			dateburned: $('#dateburned').val(),
			qualityofburn: $('#qualityofburn').val(),
			pasturenumberpesticide: $('#pasturenumberpesticide').val(),
			chemicalname: $('#chemicalname').val(),
			applicationrate: $('#applicationrate').val(),
			applicationdate: $('#applicationdate').val()
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
		$.ajax({
				url: '/api/master_animal/'+cownumber,
				data: $('form').serialize(),
				type: 'GET',
				success: function(response) {
					var animalname = response.data.attributes.animalname;
					basicget(cownumber);
					animal_inventoryget(cownumber);
					experimentget(cownumber);
					reproductionget(cownumber);
					medicalget(cownumber);
					grazingget(cownumber);
					$("<li><a onclick='callall("+cownumber+")'> "+animalname+" - "+cownumber+"</a></li>").prependTo("#latestcow");
				},
				error: function(error) {
					console.log(error);
					$.notify("Cow number doesnt exist", "danger");
				}	
		});
	});
	
