	// SCRIPTS FOR SEARCH PAGE
	function inputDataBasic() {
		// $(document).ready(function(e) {
			var emaillabel = get_email();
			var basic = {
				height: 0,
				weight : 0,
				eartag : 0,
				eid : 0,
				sex : 0,
				pasturenumber : 0,
				breed : 0,
				status : 0,
				trial : 0,
				herd : 0,
				animaltype : 0,
				animalname : 0,
				breeder : 0,
				currentframescore :0,
				damframescore : 0,
				comments : 0,
				species :0,
				user: emaillabel
			}
			$.ajax({
				url: '/api/master_animal/',
				data: basic,
				datatype: 'json',
				type: 'POST',
				async: false,
				success: function(response, basic) {
					console.log(response)
					var cownumber = response.data[0].attributes.cownumber
					inputDataAnimalInventory(cownumber);
					inputDataExperiment(cownumber);
					inputDataReproduction(cownumber);
					inputDataMedical(cownumber);
					inputDataGrazing(cownumber);
					$.notify("Basic Data Saved", "success");
					setTimeout(function() {
						window.location.href = '/dashboard?cownumber='+cownumber
					}, 3000); 
				},
				error: function(error) {
					console.log(error)
					$.notify("Cow already exists", "error");
				}
			});
		// <!-- }); -->
		return false;
	};
	function inputDataAnimalInventory(cownumber) {
		// <!-- $(document).ready(function(e) { -->
			var emaillabel = get_email();
			var animal_inventory = {
				cownumber : cownumber,
				brand : 0,
				brandlocation: 0,
				tattooleft : 0,
				tattooright : 0,
				alternativeid : 0,
				registration: 0,
				color : 0,
				hornstatus : 0,
				dam : 0,
				sire : 0,
				dob : 0,
				howacquired : 0,
				dateacquired : 0,
				howdisposed : 0,
				datedisposed : 0,
				herdnumberlocation : 0,
				herdstatus : 0,
				howconceived : 0,
				managementcode : 0,
				ownerID : 0,
				springfall : 0,
				includeinlookups : 0,
				disposalreason : 0,
				user: emaillabel
			}
			$.ajax({
				url: '/api/animal_inventory/',
				data: animal_inventory,
				datatype: 'json',
				type: 'POST',
				async: false,
				success: function(animal_inventory) {
					$.notify("Animal Inventory Data Saved", "success");
					console.log(animal_inventory)
					
				},
				error: function(error) {
					console.log(error)
					$.notify("Check Error log", "error")
				}
			});
		// <!-- }); -->
		return false;
	};
	function inputDataExperiment(cownumber) {
		// <!-- $(document).ready(function(e) { -->
			var emaillabel = get_email();
			var experiment = {
				cownumber : cownumber,
				dam : 0,
				sire : 0,
				birthweight : 0,
				birthweightadj : 0,
				sireframescore : 0,
				conditionscoreweaning2015 : 0,
				conditionscoreweaning2016 : 0,
				dob : 0,
				bcsrecent : 0,
				bcsprevious : 0,
				bcsdifference : 0,
				damwtatwean : 0,
				weanheight : 0,
				weanweight : 0,
				weandate : 0,
				weangpd : 0,
				weanweightdate : 0,
				weanwda : 0,
				weanhipht : 0,
				adj205w : 0,
				adj205h : 0,
				weanframescore : 0,
				ageatwean : 0,
				yearlingweight : 0,
				yearlingheight : 0,
				yearlingdate : 0,
				adjyearlingh : 0,
				adjyearlingw : 0,
				yearlingframescore : 0,
				ageatyearling : 0,
				currentwtcow : 0,
				currentwtheifer : 0,
				adj365dht : 0,
				customweight : 0,
				customheight : 0,
				customheightdate : 0,
				customweightdate : 0,
				backfat : 0,
				treatment : 0,
				blockpen : 0,
				replicate : 0,
				animaltype : 0,
				user: emaillabel
			}
			$.ajax({
				url: '/api/experiment/',
				data: experiment,
				datatype: 'json',
				type: 'POST',
				async: false,
				success: function(experiment) {
					$.notify("Experiment Data Saved", "success");
					console.log(experiment)
					
				},
				error: function( error) {
					console.log(error)
					$.notify("Input Experiment, Error log", "error")
				}
			});
		// <!-- }); -->
		return false;
	};
	function inputDataReproduction(cownumber) {
		// <!-- $(document).ready(function(e) { -->
			var emaillabel = get_email();
			var reproduction = {
				cownumber : cownumber,
				breeding : 0,
				pregnancy : 0,
				calfatside : 0,
				totalcalves : 0,
				previouscalf : 0,
				damageatbirth : 0,
				currentcalf : 0,
				calfdob : 0,
				calfsex : 0,
				calfbirthweight : 0,
				pasturenumberreproduction : 0,
				damcalvingdisposition : 0,
				calvingease : 0,
				udderscore : 0,
				siblingcode : 0,
				conditionscorecalving : 0,
				hiphtweaning2015 : 0,
				hiphtweaning2016 : 0,
				hiphtbreeding2016 : 0,
				damdisposition : 0,
				cowframescore : 0,
				cowwtbreeding : 0,
				cowhtbreeding : 0,
				cowwtweaning : 0,
				cowhtweaning : 0,
				cowwtcalving : 0,
				cowhtcalving : 0,
				bcsweaning : 0,
				bcscalving : 0,
				bcsbreeding : 0,
				customcowwt : 0,
				customcowht : 0,
				bulldisposition : 0,
				bullframescore : 0,
				bullwtprebreeding : 0,
				bullhtprebreeding : 0,
				fertility : 0,
				mobility : 0,
				conc : 0,
				deadabnormal : 0,
				user: emaillabel
			}
			$.ajax({
				url: '/api/reproduction/',
				data: reproduction,
				datatype: 'json',
				type: 'POST',
				async: false,
				success: function(reproduction) {
					$.notify("Reproduction Data Saved", "success");
					console.log(reproduction)
					
				},
				error: function(error) {
					console.log(error)
					$.notify("Input Reproduction, Error log", "error")
				}
			});
		// <!-- }); -->
		return false;
	};
	function inputDataMedical(cownumber) {
		// <!-- $(document).ready(function(e) { -->
			var emaillabel = get_email();
			var medical = {
				cownumber : cownumber,
				reasonforprocedure: 0,
				notificationofvmo : 0,
				recommendationofvmo : 0,
				treatmentprotocol : 0,
				animallocationpreresolution : 0,
				followupexam : 0,
				resolution : 0,
				dateoffollowup : 0,
				animallocation : 0,
				dateofaction : 0,
				user: emaillabel
			}
			$.ajax({
				url: '/api/medical/',
				data: medical,
				datatype: 'json',
				type: 'POST',
				async: false,
				success: function(response, medical) {
					$.notify("Medical Data Saved", "success");
				},
				error: function(error) {
					console.log(error)
					$.notify("Medical data error", "error");
				}
			});
		// <!-- }); -->
		return false;
	};
	function inputDataGrazing(cownumber) {
		// <!-- $(document).ready(function(e) { -->
			var emaillabel = get_email();
			var grazing = {
				cownumber : cownumber,
				pastureacres: 0,
				animalspresent : 0,
				datein : 0,
				dateout : 0,
				stockingrate : 0,
				pasturenumbergrazing : 0,
				sample : 0,
				biomass : 0,
				DMavailable : 0,
				cp : 0,
				cp1 : 0,
				cp2 : 0,
				cp3 : 0,
				cp4 : 0,
				pasturenumberburning : 0,
				dateburned : 0,
				qualityofburn : 0,
				pasturenumberpesticide : 0,
				chemicalname : 0,
				applicationrate : 0,
				applicationdate : 0,
				user: emaillabel
				}
			$.ajax({
				url: '/api/grazing/',
				data: grazing,
				datatype: 'json',
				type: 'POST',
				async: false,
				success: function(response, grazing) {
					$.notify("Grazing Data Saved", "success");

				},
				error: function(error) {
					console.log(error)
					$.notify("Grazing data error", "error");
				}
			});
		// <!-- }); -->
		return false;
	};
	
	
$('#search').click(function(e) {
	var searchboxvalue = $('#cowSearch').val();
	var radioValue = $("input[name='identifier']:checked").val();
	if(radioValue == "animalname"){
		console.log("This is working AnimalName");
	}
	else{
		console.log("This is not working AnimalName");
	}
	if(radioValue == "cownumber"){
		$.ajax({
			url: '/api/master_animal/'+searchboxvalue,
			data: $('form').serialize(),
			type: 'GET',
			async: false,
			success: function(data) {
				window.location.href = '/dashboard?cownumber='+searchboxvalue;
				console.log(data);
			},
			error: function(error) {
				console.log(error);
				$.notify("Cow number doesnt exist", "danger");
			}
		});
	}
	else if(radioValue == "animalname") {
		var searchboxvalue = $('#cowSearch').val();
		$.ajax({
				url: '/api/animalname/'+searchboxvalue,
				data: {},
				type: 'GET',
				datatype : 'json',
				async: false,
				success: function(data) {
					var cownumber = data.data.attributes.cownumber;
					window.location.href = '/dashboard?cownumber='+cownumber;
				},
				error: function(error) {
					console.log(error);
					$.notify("Cow number doesnt exist", "danger");
				}
			});
	}
	else if(radioValue == "eid") {
		var searchboxvalue = $('#cowSearch').val();
		$.ajax({
				url: '/api/eid/'+searchboxvalue,
				data: {},
				type: 'GET',
				datatype : 'json',
				async: false,
				success: function(data) {
					var cownumber = data.data.attributes.cownumber;
						$.ajax({
							url: '/api/master_animal/'+cownumber,
							data: $('form').serialize(),
							type: 'GET',
							success: function(data) {
								window.location.href = '/dashboard?cownumber='+cownumber;
								console.log(data);
							},
							error: function(error) {
								console.log(error);
								$.notify("Group number doesnt exist", "danger");
							}
						});
				},
				error: function(error) {
					console.log(error);
					$.notify("EID does not exist", "danger");
				}	
		});
	}
	else if(radioValue == "reportnumber"){
		var reportnumber = $('#cowSearch').val();
		$.ajax({
			url: '/api/reporting/'+reportnumber,
			data: $('form').serialize(),
			type: 'GET',
			async: false,
			success: function(data) {
				window.location.href = '/reporting?reportnumber='+reportnumber;
				console.log(data);
			},
			error: function(error) {
				console.log(error);
				$.notify("Group number doesnt exist", "danger");
			}
		});
	}
	else {
		var searchboxvalue = $('#cowSearch').val();
		$.ajax({
			url: '/api/group/'+searchboxvalue,
			data: $('form').serialize(),
			type: 'GET',
			success: function(data) {
				window.location.href = '/experimentedit?groupnumber='+searchboxvalue;
				console.log(data);
			},
			error: function(error) {
				console.log(error);
				$.notify("Group number doesnt exist", "danger");
			}
		});
	}
});