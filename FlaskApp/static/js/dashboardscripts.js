// SCRIPTS FOR DASHBOARD
	$(function postBasic() {
	$('#basic_update').click(function(e) {
		var cownumber = $('#cownumber').val();
		var emaillabel = get_email();
		var basic = {
			cownumber : $('#cownumber').val(),
			height: $('#height').val(),
			weight : $('#weight').val(),
			eartag : $('#eartag').val(),
			eid : $('#eid').val(),
			sex : $('#sex option:selected').text(),
			pasturenumber : $('#pasturenumber').val(),
			breed : $('#breed').val(),
			status : $('#status option:selected').text(),
			trial : $('#trial').val(),
			herd : $('#herd').val(),
			animalname : $('#animalname').val(),
			breeder : $('#breeder').val(),
			currentframescore : $('#currentframescore').val(),
			damframescore : $('#damframescore').val(),
			comments : $('#damframescore').val(),
			species : $('#species').val(),
			animaltype : $('#animaltype option:selected').text(),
			user : emaillabel
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
		var cownumber = $('#cownumber').val();
		var emaillabel = get_email();
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
			dam : $('#dam').val(),
			sire : $('#sire').val(),
			dob  : $('#dob').val(),
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
			includeinlookups : $('#includeinlookups option:selected').text(),
			user : emaillabel
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
					$.notify("Inventory Fail! Check Error log", "error");
				}
			});
			e.preventDefault();
		});
	});
	$(function postExperiment() {

	$('#basic_update').click(function(e) {
		var cownumber = $('#cownumber').val();
		var emaillabel = get_email();
		var experiment = {
			cownumber : $('#cownumber').val(),//1
			birthweight : $('#birthweight').val(),//2
			birthweightadj : $('#birthweightadj').val(),//3
			sireframescore : $('#sireframescore').val(),//4
			bcsrecent : $('#bcsrecent').val(),//7
			bcsprevious : $('#bcsprevious').val(),//8
			bcsdifference : $('#bcsdifference').val(),//9
			damwtatwean : $('#damwtatwean').val(),//10
			weanheight : $('#weanheight').val(),//11
			weanweight : $('#weanweight').val(),//12
			weandate : $('#weandate').val(),//13
			weangpd : $('#weangpd').val(),//14
			weanhipht : $('#weanhipht').val(),//15
			weanwda : $('#weanwda').val(),//16
			weanweightdate : $('#weanweightdate').val(),//17
			adj205w : $('#adj205w').val(),//18
			adj205h : $('#adj205h').val(),//19
			weanframescore : $('#weanframescore').val(),//20
			ageatwean : $('#ageatwean').val(),//21
			yearlingweight : $('#yearlingweight').val(),//22
			yearlingheight : $('#yearlingheight').val(),//23
			yearlingdate : $('#yearlingdate').val(),//24
			adjyearlingw : $('#adjyearlingw').val(),//25
			adjyearlingh : $('#adjyearlingh').val(),//26
			yearlingframescore : $('#yearlingframescore').val(),//27
			ageatyearling : $('#ageatyearling').val(),//28
			currentwtcow : $('#currentwtcow').val(),//29
			adj365dht : $('#adj365dht').val(),//30
			customweight : $('#customweight').val(),//31
			customheight : $('#customheight').val(),//32
			customweightdate : $('#customweightdate').val(),//33
			customheightdate : $('#customheightdate').val(),//34
			currentwtheifer : $('#currentwtheifer').val(),//35
			backfat : $('#backfat').val(),//36
			treatment : $('#treatment').val(),//37
			blockpen : $('#blockpen').val(),//38
			replicate : $('#replicate').val(),//39
			animaltype : $('#animaltype option:selected').text(),//40
			user : emaillabel//41
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
		var cownumber = $('#cownumber').val();
		var emaillabel = get_email();
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
			deadabnormal: $('#deadabnormal').val(),
			user : emaillabel
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
		var cownumber = $('#cownumber').val();
		var emaillabel = get_email();
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
			dateofaction : $('#dateofaction').val(),
			user : emaillabel
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
		var cownumber = $('#cownumber').val();
		var emaillabel = get_email();
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
			applicationdate: $('#applicationdate').val(),
			user : emaillabel
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
	
