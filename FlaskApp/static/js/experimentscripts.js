	$('#experiment_update').click(function(e){
		var cownumber = $('#cownumber').val();
		callAllExperiment(cownumber);
		var basic = {
			cownumber: $('#cownumber').val(),
			groupnumber: $('#groupnumber').val()
		}
		newbasic = JSON.stringify(basic) 

		$.ajax({
			url: '/experimentupdate',
			data: newbasic,
			type: 'POST',
			datatype: 'json',
			success: function(response) {
				console.log(response);
				$.notify("Data Sent", "info");
			},
			error: function(error) {
				console.log(error);
				$.notify("Sending Data Failed", "error");					
			}
		});
	});
	function callAllExperiment(cownumber){
	
		basicexperiment(cownumber);
		animal_inventoryexperiment(cownumber);
		experimentexperiment(cownumber);
		reproductionexperiment(cownumber);
		medicalexperiment(cownumber);
		grazingexperiment(cownumber);
	};
	// Code to Load Data 
	function basicexperiment( variable) 
	{
		$(document).ready(function(e){
			$.ajax({
					url: '/api/master_animal/'+variable,
					data: {},
					type: 'GET',
					datatype : 'json',
					success: function(data) {
						
						var masterData = {
							cownumber : variable,
							height : data.data.attributes.height,
							weight :data.data.attributes.weight,
							eartag :data.data.attributes.eartag,
							eid : data.data.attributes.eid,
							sex : data.data.attributes.sex,
							pasturenumber :data.data.attributes.pasturenumber,
							breed :data.data.attributes.breed,
							status :data.data.attributes.status,
							trial :data.data.attributes.trial,
							herd :data.data.attributes.herd,
							animaltype :data.data.attributes.animaltype
						};
						var datadata = $("#experimentform").serializeArray();
						$(datadata).each(function(i,pageelement){
							// This line checks if the elemenent name is within the dictionary data table
							if(typeof masterData[pageelement.name] === 'undefined') {
								//do nothing
							}
							else {
								// does exist
								masterData[pageelement.name] = pageelement.value;
								console.log(masterData[pageelement.name]);
							}
						});
						console.log(masterData);
						$.ajax({
							url: '/api/master_animal/',
							data: masterData,
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
						return false;
					},
					error: function(error) {
						console.log(error)
						$.notify("Master_Animal Failed", "error")
						
					}
				});
		});
	return false;
	};
	function animal_inventoryexperiment(variable) 
	{
		$(document).ready(function(e){
			$.ajax({
					url: '/api/animal_inventory/'+variable,
					data: {},
					type: 'GET',
					datatype : 'json',
					success: function(data) {
						console.log(data);	
						var masterData = {
							cownumber : variable,
							brand : data.data[0].attributes.brand,
							brandlocation : data.data[0].attributes.brandlocation,
							tattooleft : data.data[0].attributes.tattooleft,
							tattooright : data.data[0].attributes.tattooright,
							alternativeid : data.data[0].attributes.alternativeid,
							registration : data.data[0].attributes.registration,
							color  : data.data[0].attributes.color,
							hornstatus  : data.data[0].attributes.hornstatus,
							dam  : data.data[0].attributes.dam,
							sire  : data.data[0].attributes.sire,
							dob  : data.data[0].attributes.dob,
							howacquired  : data.data[0].attributes.howacquired,
							dateacquired  : data.data[0].attributes.dateacquired,
							howdisposed  : data.data[0].attributes.howdisposed,
							datedisposed  : data.data[0].attributes.datedisposed,
							disposalreason  : data.data[0].attributes.disposalreason
						};
						var datadata = $("#experimentform").serializeArray();
						$(datadata).each(function(i,pageelement){
							// This line checks if the elemenent name is within the dictionary data table
							if(typeof masterData[pageelement.name] === 'undefined') {
								// does not exist
							}
							else {
								// does exist
								masterData[pageelement.name] = pageelement.value;
								console.log(masterData[pageelement.name]);
							}
						});
						console.log(masterData);
						$.ajax({
							url: '/api/animal_inventory/',
							data: masterData,
							datatype: 'json',
							type: 'POST',
							success: function(response) {
								console.log(response);
								$.notify("Animal Inventory Data Saved", "info");
							},
							error: function(error) {
								console.log(error)
								$.notify("Animal Inventory Data Save Failed", "danger");
							}
						});
					},
					error: function(error) {
						console.log(error)
						$.notify("Animal_Inventory Failed", "error")
					}
				});
		});

	};
	function experimentexperiment(variable) 
	{
		$(document).ready(function(e){
			$.ajax({
					url: '/api/experiment/'+variable,
					data: {},
					type: 'GET',
					datatype : 'json',
					success: function(data) {
						console.log(data);
						var masterData = {
							cownumber : variable,
							birthweight : data.data[0].attributes.birthweight,
							damframescore : data.data[0].attributes.damframescore,
							sireframescore : data.data[0].attributes.sireframescore,
							weanheight : data.data[0].attributes.weanheight,
							weanweight : data.data[0].attributes.weanweight,
							weandate : data.data[0].attributes.weandate,
							adj205w  : data.data[0].attributes.adj205w,
							adj205h  : data.data[0].attributes.adj205h,
							weanframescore  : data.data[0].attributes.weanframescore,
							ageatwean  : data.data[0].attributes.ageatwean,
							yearlingweight  : data.data[0].attributes.yearlingweight,
							yearlingheight  : data.data[0].attributes.yearlingheight,
							yearlingdate  : data.data[0].attributes.yearlingdate,
							adjyearlingw  : data.data[0].attributes.adjyearlingw,
							adjyearlingh  : data.data[0].attributes.adjyearlingh,
							yearlingframescore  : data.data[0].attributes.yearlingframescore,
							ageatyearling  : data.data[0].attributes.ageatyearling,
							customweight  : data.data[0].attributes.customweight,
							customheight  : data.data[0].attributes.customheight,
							customweightdate  : data.data[0].attributes.customweightdate,
							customheightdate  : data.data[0].attributes.customheightdate,
							backfat  : data.data[0].attributes.backfat,
							treatment  : data.data[0].attributes.treatment,
							blockpen  : data.data[0].attributes.blockpen,
							replicate  : data.data[0].attributes.replicate,
							dam  : data.data[0].attributes.dam,
							sire  : data.data[0].attributes.sire,
							dob  : data.data[0].attributes.dob
						};
						var datadata = $("#experimentform").serializeArray();
						$(datadata).each(function(i,pageelement){
							// This line checks if the elemenent name is within the dictionary data table
							if(typeof masterData[pageelement.name] === 'undefined') {
								// does not exist
							}
							else {
								// does exist
								masterData[pageelement.name] = pageelement.value;
								console.log(masterData[pageelement.name]);
							}
						});
						console.log(masterData);
						$.ajax({
							url: '/api/experiment/',
							data: masterData,
							datatype: 'json',
							type: 'POST',
							success: function(response) {
								console.log(response);
								$.notify("Experiment Data Saved", "info");
							},
							error: function(error) {
								console.log(error)
								$.notify("Experiment Data Save Failed", "danger");
							}
						});
					},
					error: function(error) {
						console.log(error)
						$.notify("Experiment GET Failed", "error")
					}
				});
		});

	};
	function reproductionexperiment( variable) 
	{
		$(document).ready(function(e){
			$.ajax({
					url: '/api/reproduction/'+variable,
					data: {},
					type: 'GET',
					datatype : 'json',
					success: function(data) {
						console.log(data);
						var masterData = {
							cownumber : variable,
							breeding : data.data[0].attributes.breeding,
							pregnancy : data.data[0].attributes.pregnancy,
							calfatside : data.data[0].attributes.calfatside,
							totalcalves : data.data[0].attributes.totalcalves,
							previouscalf : data.data[0].attributes.previouscalf,
							damageatbirth : data.data[0].attributes.damageatbirth,
							currentcalf : data.data[0].attributes.currentcalf,
							calfdob : data.data[0].attributes.calfdob,
							calfsex : data.data[0].attributes.calfsex,
							calfbirthweight : data.data[0].attributes.calfbirthweight,
							pasturenumberreproduction : data.data[0].attributes.pasturenumberreproduction,
							damcalvingdisposition : data.data[0].attributes.damcalvingdisposition,
							calvingease : data.data[0].attributes.calvingease,
							udderscore : data.data[0].attributes.udderscore,
							comments : data.data[0].attributes.comments,
							damdisposition : data.data[0].attributes.damdisposition,
							cowframescore : data.data[0].attributes.cowframescore,
							cowwtbreeding : data.data[0].attributes.cowwtbreeding,
							cowwtweaning : data.data[0].attributes.cowwtweaning,
							cowwtcalving : data.data[0].attributes.cowwtcalving,
							cowhtbreeding : data.data[0].attributes.cowhtbreeding,
							cowhtweaning : data.data[0].attributes.cowhtweaning,
							cowhtcalving : data.data[0].attributes.cowhtcalving,
							bcsweaning : data.data[0].attributes.bcsweaning,
							bcscalving : data.data[0].attributes.bcscalving,
							bcsbreeding : data.data[0].attributes.bcsbreeding,
							customcowht : data.data[0].attributes.customcowht,
							customcowwt : data.data[0].attributes.customcowwt,
							bullframescore : data.data[0].attributes.bullframescore,
							bulldisposition : data.data[0].attributes.bulldisposition,
							bullwtprebreeding : data.data[0].attributes.bullwtprebreeding,
							bullhtprebreeding : data.data[0].attributes.bullhtprebreeding,
							fertility : data.data[0].attributes.fertility,
							mobility : data.data[0].attributes.mobility,
							conc : data.data[0].attributes.conc,
							deadabnormal : data.data[0].attributes.deadabnormal
							
						};
						var datadata = $("#experimentform").serializeArray();
						$(datadata).each(function(i,pageelement){
							// This line checks if the elemenent name is within the dictionary data table
							if(typeof masterData[pageelement.name] === 'undefined') {
								// does not exist
							}
							else {
								// does exist
								masterData[pageelement.name] = pageelement.value;
								console.log(masterData[pageelement.name]);
							}
						});
						console.log(masterData);
						$.ajax({
							url: '/api/reproduction/',
							data: masterData,
							datatype: 'json',
							type: 'POST',
							success: function(response) {
								console.log(response);
								$.notify("Reproduction Data Saved", "info");
							},
							error: function(error) {
								console.log(error)
								$.notify("Reproduction Data Save Failed", "danger");
							}
						});
					},
					error: function(error) {
						console.log(error)
						$.notify("Reproduction Failed", "error")
						
					}
				});
		});
	return false;
	};
	function medicalexperiment( variable) 
	{
		$(document).ready(function(e){
			$.ajax({
					url: '/api/medical/'+variable,
					data: {},
					type: 'GET',
					datatype : 'json',
					success: function(data) {
						console.log(data);
						
						var masterData = {
							cownumber : variable,
							reasonforprocedure : data.data[0].attributes.reasonforprocedure,
							notificationofvmo : data.data[0].attributes.notificationofvmo,
							recommendationofvmo : data.data[0].attributes.recommendationofvmo,
							treatmentprotocol : data.data[0].attributes.treatmentprotocol,
							animallocationpreresolution : data.data[0].attributes.animallocationpreresolution,
							followupexam : data.data[0].attributes.followupexam,
							resolution : data.data[0].attributes.resolution,
							dateoffollowup : data.data[0].attributes.dateoffollowup,
							animallocation : data.data[0].attributes.animallocation,
							dateofaction : data.data[0].attributes.dateofaction
						};
						var datadata = $("#experimentform").serializeArray();
						$(datadata).each(function(i,pageelement){
							// This line checks if the elemenent name is within the dictionary data table
							if(typeof masterData[pageelement.name] === 'undefined') {
								// does not exist
							}
							else {
								// does exist
								masterData[pageelement.name] = pageelement.value;
								console.log(masterData[pageelement.name]);
							}
						});
						console.log(masterData);
						$.ajax({
							url: '/api/medical/',
							data: masterData,
							datatype: 'json',
							type: 'POST',
							success: function(response) {
								console.log(response);
								$.notify("Medical Data Saved", "info");
							},
							error: function(error) {
								console.log(error)
								$.notify("Medical Data Save Failed", "danger");
							}
						});
					},
					error: function(error) {
						console.log(error)
						$.notify("Medical data Failed", "error")
						
					}
				});
		});
	return false;
	};
	function grazingexperiment( variable) 
	{
		$(document).ready(function(e){
			$.ajax({
					url: '/api/grazing/'+variable,
					data: {},
					type: 'GET',
					datatype : 'json',
					success: function(data) {
						console.log(data);

						var masterData = {
							cownumber : variable,
							pastureacres : data.data[0].attributes.pastureacres,
							animalspresent : data.data[0].attributes.animalspresent,
							datein : data.data[0].attributes.datein,
							dateout : data.data[0].attributes.dateout,
							stockingrate : data.data[0].attributes.stockingrate
						};
						var datadata = $("#experimentform").serializeArray();
						$(datadata).each(function(i,pageelement){
							// This line checks if the elemenent name is within the dictionary data table
							if(typeof masterData[pageelement.name] === 'undefined') {
								// does not exist
							}
							else {
								// does exist
								masterData[pageelement.name] = pageelement.value;
								console.log(masterData[pageelement.name]);
							}
						});
						console.log(masterData);
						$.ajax({
							url: '/api/grazing/',
							data: masterData,
							datatype: 'json',
							type: 'POST',
							success: function(response) {
								console.log(response);
								$.notify("Grazing Data Saved", "info");
							},
							error: function(error) {
								console.log(error)
								$.notify("Grazing Data Save Failed", "danger");
							}
						});
					},
					error: function(error) {
						console.log(error)
						$.notify("Grazing Failed", "error")
						
					}
				});
		});
	return false;
	};

	$(document).ready(function(e){
		var groupnumber = getQueryVariable("groupnumber");
		var variable = groupnumber;
		$.ajax({
				url: '/api/group/'+variable,
				data: {},
				type: 'GET',
				datatype : 'json',
				success: function(data) {
					console.log(data);
					var attributes = $.parseJSON(data[0].attributes);
					var groupname = data[0].groupname;
					var cownumber = $.parseJSON(data[0].cownumber);
					var groupdescription = data[0].groupdescription;
					$('#groupnumber').val(groupnumber);
					$('#groupname').val(groupname);
					$('#groupdescription').val(groupdescription);
					$(cownumber).each(function(i,elem){
						$("<li><a onclick='callall("+elem+")'> "+elem+"</a></li>").appendTo("#cowlist");
					});
					$(attributes).each(function(i,elem){
						if(i == 0){
							$("<div class='form-group'>").appendTo("#newfields");
							if(dictionary[elem].type == "drop"){
								var toappend = "<label for="+elem+" class='control-label col-xs-2'>"+elem+"</label>";
								toappend += "<div class='col-xs-2'><select name='"+elem+"' class='form-control' id="+elem+">";
								toappend += "<option></option>";
								toappend += elemvalues(elem);
								toappend += "</select></div>";
								$(toappend).appendTo("#newfields");
							}
							else if(dictionary[elem].type == "date"){
								var toappend = "<label for='date' class='control-label col-xs-2'>"+elem+"</label>";
								toappend += "<div class='input-group col-xs-2'><input class='form-group datepicker_recurring_start' id='"+elem+"' name='date' placeholder='MM/DD/YYYY'  type='text' /></div>";
								$(toappend).appendTo("#newfields");
							}
							else{	
								$("<label for="+ elem +" class='control-label col-xs-2'>"+elem +"</label><div class='col-xs-2'><input type='text' class='form-control' id="+ elem +" name="+ elem +"></div>").appendTo("#newfields");
							}
						}
						else if(i%2 == 0){
							$("</div><br>").appendTo("#newfields");
							$("<div class='form-group'>").appendTo("#newfields");
							if(dictionary[elem].type == "drop"){
								var toappend = "<label for="+elem+" class='control-label col-xs-2'>"+elem+"</label>";
								toappend += "<div class='col-xs-2'><select name='"+elem+"' class='form-control' id="+elem+">";
								toappend += "<option></option>";
								toappend += elemvalues(elem);
								toappend += "</select></div>";
								$(toappend).appendTo("#newfields");
							}
							else if(dictionary[elem].type == "date"){
								var toappend = "<label for='date' class='control-label col-xs-2'>"+elem+"</label>";
								toappend += "<div class='input-group col-xs-2'><input class='form-group datepicker_recurring_start' id='"+elem+"' name='date' placeholder='MM/DD/YYYY'  type='text' /></div>";
								$(toappend).appendTo("#newfields");
							}
							else{							
							$("<label for="+ elem +" class='control-label col-xs-2'>"+elem +"</label><div class='col-xs-2'><input type='text' class='form-control' id="+ elem +" name="+ elem +"></div>").appendTo("#newfields");
							}
						}
						else{
							if(dictionary[elem].type == "drop"){
								var toappend = "<label for="+elem+" class='control-label col-xs-2'>"+elem+"</label>";
								toappend += "<div class='col-xs-2'><select name='"+elem+"' class='form-control' id="+elem+">";
								toappend += "<option></option>";
								toappend += elemvalues(elem);
								toappend += "</select></div>";
								$(toappend).appendTo("#newfields");
							}
							else if(dictionary[elem].type == "date"){
								var toappend = "<label for='date' class='control-label col-xs-2'>"+elem+"</label>";
								toappend += "<div class='input-group col-xs-2'><input class='form-group datepicker_recurring_start' id='"+elem+"' name='date' placeholder='MM/DD/YYYY'  type='text' /></div>";
								$(toappend).appendTo("#newfields");
							}
							else{
								$("<label for="+ elem +" class='control-label col-xs-2'>"+elem +"</label><div class='col-xs-2'><input type='text' class='form-control' id="+ elem +" name="+ elem +"></div>").appendTo("#newfields");
							}
						}
						$("</div>").appendTo("#newfields");
					});
					
					
				},
				error: function(error) {
					console.log(error)
					$.notify("Master_Animal Failed", "error")
					
				}
			});
	});
	function elemvalues(variable){
		var options = "";
		$(dictionary[variable].values).each(function(j,ele1){
			options += "<option>"+ele1+"</option>";
		});
		return options;
	}
	function getQueryVariable(variable){
	   var query = window.location.search.substring(1);
	   var vars = query.split("&");
	   for (var i=0;i<vars.length;i++) {
			   var pair = vars[i].split("=");
			   if(pair[0] == variable){return pair[1];}
	   }
	   return false;
	};	