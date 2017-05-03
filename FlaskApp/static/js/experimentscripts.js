	var dictionary = {
		"pasturenumber" : {type: "drop", values:["1","2","3","4","5","6","7"], table:"master_animal"},
		"sex" : {type: "drop", values:["Steer","Heifer","Bull","Cow"], table:"master_animal"},
		"breed" : {type: "text", values:[""], table:"master_animal"},
		"height" : {type: "text", values:[""], table:"master_animal"},
		"weight" : {type: "text", values:[""], table:"master_animal"},
		"animaltype" : {type: "drop", values:["Cow","Steer","Heifer","Calf","Bull"], table:"master_animal"},
		"status" : {type: "drop", values:["Active","Inactive"], table:"master_animal"},
		"herd" : {type: "text", values:[""], table:"master_animal"},
		"brand" : {type: "text", values:[""], table:"animal_inventory"},
		"brandlocation" : {type: "drop", values:["Left Hip","Right Hip"], table:"animal_inventory"},
		"tattooleft" : {type: "text", values:[""], table:"animal_inventory"},
		"tattooright" : {type: "text", values:[""], table:"animal_inventory"},
		"alternativeid" : {type: "text", values:[""], table:"animal_inventory"},
		"registration" : {type: "text", values:[""], table:"animal_inventory"},
		"color" : {type: "text", values:[""], table:"animal_inventory"},
		"hornstatus" : {type: "drop", values:["Polled","Scurred","Horned","De-horned"], table:"animal_inventory"},
		"dam" : {type: "text", values:[""], table:"animal_inventory"},
		"sire" : {type: "text", values:[""], table:"animal_inventory"},
		"dob" : {type: "text", values:[""], table:"animal_inventory"},
		"howacquired" : {type: "drop", values:["Raised","Purchased","Leased"], table:"animal_inventory"},
		"dateacquired" : {type: "text", values:[""], table:"animal_inventory"},
		"howdisposed" : {type: "drop", values:["Sold","Died","Euthanized","Returned"], table:"animal_inventory"},
		"datedisposed" : {type: "text", values:[""], table:"animal_inventory"},
		"disposalreason" : {type: "text", values:[""], table:"animal_inventory"},
		"dam" : {type: "text", values:[""], table:"experiment"},
		"sire" : {type: "text", values:[""], table:"experiment"},
		"damframescore" : {type: "text", values:[""], table:"experiment"},
		"sireframecore" : {type: "text", values:[""], table:"experiment"},
		"dobexperiment" : {type: "text", values:[""], table:"experiment"},
		"weanheight" : {type: "text", values:[""], table:"exeriment"},
		"weandate" : {type: "text", values:[""], table:"experiment"},
		"weanweight" : {type: "text", values:[""], table:"experiment"},
		"birthweight" : {type: "text", values:[""], table:"experiment"},
		"yearlingheight" : {type: "text", values:[""], table:"experiment"},
		"adj205w" : {type: "text", values:[""], table:"experiment"},
		"adj205h" : {type: "text", values:[""], table:"experiment"},
		"weanframescore" : {type: "text", values:[""], table:"experiment"},
		"ageatwean" : {type: "text", values:[""], table:"experiment"},
		"yearlingweight" : {type: "text", values:[""], table:"experiment"},
		"yearlingdate" : {type: "text", values:[""], table:"experiment"},
		"customweight" : {type: "text", values:[""], table:"experiment"},
		"customheight" : {type: "text", values:[""], table:"experiment"},
		"customweightdate" : {type: "text", values:[""], table:"experiment"},
		"customheightdate" : {type: "text", values:[""], table:"experiment"},
		"blockpen" : {type: "text", values:[""], table:"experiment"},
		"adjyearlingw" : {type: "text", values:[""], table:"experiment"},
		"adjyearlingh" : {type: "text", values:[""], table:"experiment"},
		"yearlingframescore" : {type: "text", values:[""], table:"experiment"},
		"ageatyearling" : {type: "text", values:[""], table:"experiment"},
		"backfat" : {type: "text", values:[""], table:"experiment"},
		"replicate" : {type: "text", values:[""], table:"experiment"},
		"treatment" : {type: "drop", values:["Steer","Heifer","Bull","Cow"], table:"experiment"},
		"breeding" : {type: "drop", values:["Bull-1","Bull-2","Bull-3","Bull-4","Bull-5"], table:"reproduction"},
		"pregnancy" : {type: "drop", values:["Pregnant","open"], table:"reproduction"},
		"pasturenumberreproduction" : {type: "text", values:[""], table:"reproduction"},
		"calfatside" : {type: "text", values:[""], table:"reproduction"},
		"totalcalves" : {type: "text", values:[""], table:"reproduction"},
		"previouscalf" : {type: "text", values:[""], table:"reproduction"},
		"damageatbirth" : {type: "text", values:[""], table:"reproduction"},
		"currentcalf" : {type: "text", values:[""], table:"reproduction"},
		"calfdob" : {type: "text", values:[""], table:"reproduction"},
		"calfsex" : {type: "drop", values:["Steer","Heifer","Bull","Cow"], table:"reproduction"},
		"calfbirthweight" : {type: "text", values:[""], table:"reproduction"},
		"damcalvingdisposition" : {type: "drop", values:["1","2","3","4","5"], table:"reproduction"},
		"calvingease" : {type: "drop", values:["1","2","3","4","5"], table:"reproduction"},
		"udderscore" : {type: "text", values:[""], table:"reproduction"},
		"comments" : {type: "text", values:[""], table:"reproduction"},
		"damdisposition" : {type: "drop", values:["1","2","3","4","5"], table:"reproduction"},
		"cowframescore" : {type: "text", values:[""], table:"reproduction"},
		"cowwtbreeding" : {type: "text", values:[""], table:"reproduction"},
		"cowhtbreeding" : {type: "text", values:[""], table:"reproduction"},
		"cowwtweaning" : {type: "text", values:[""], table:"reproduction"},
		"cowhtweaning" : {type: "text", values:[""], table:"reproduction"},
		"cowhtcalving" : {type: "text", values:[""], table:"reproduction"},
		"cowwtcalving" : {type: "text", values:[""], table:"reproduction"},
		"bcsweaning" : {type: "text", values:[""], table:"reproduction"},
		"bcsweaning" : {type: "text", values:[""], table:"reproduction"},
		"bcscalving" : {type: "text", values:[""], table:"reproduction"},
		"customcowwt" : {type: "text", values:[""], table:"reproduction"},
		"customcowht" : {type: "text", values:[""], table:"reproduction"},
		"bulldisposition" : {type: "drop", values:["1","2","3","4","5"], table:"reproduction"},
		"bullframescore" : {type: "text", values:[""], table:"reproduction"},
		"bullwtprebreeding" : {type: "text", values:[""], table:"reproduction"},
		"bullhtprebreeding" : {type: "text", values:[""], table:"reproduction"},
		"fertility" : {type: "text", values:[""], table:"reproduction"},
		"mobility" : {type: "text", values:[""], table:"reproduction"},
		"conc" : {type: "text", values:[""], table:"reproduction"},
		"deadabnormal" : {type: "text", values:[""], table:"reproduction"},
		"reasonforprocedure" : {type: "text", values:[""], table:"medical"},
		"notificationofvmo" : {type: "drop", values:["None","Site Visit","Email","Phone","Text"], table:"medical"},
		"recommendationofvmo" : {type: "text", values:[""], table:"medical"},
		"treatmentprotocol" : {type: "text", values:[""], table:"medical"},
		"animallocationpreresolution" : {type: "text", values:[""], table:"medical"},
		"followupexam" : {type: "text", values:[""], table:"medical"},
		"resolution" : {type: "text", values:[""], table:"medical"},
		"dateoffollowupexam" : {type: "text", values:[""], table:"medical"},
		"animallocation" : {type: "text", values:[""], table:"medical"},
		"dateofaction" : {type: "text", values:[""], table:"medical"},
		"pastureacres" : {type: "text", values:[""], table:"grazing"},
		"animalspresent" : {type: "text", values:[""], table:"grazing"},
		"datein" : {type: "text", values:[""], table:"grazing"},
		"dateout" : {type: "text", values:[""], table:"grazing"},
		"stockingrate" : {type: "text", values:[""], table:"grazing"}
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
								toappend += "<div class='col-xs-2'><select class='form-control' id="+elem+">";
								toappend += "<option></option>";
								toappend += elemvalues(elem);
								toappend += "</select></div>";
								$(toappend).appendTo("#newfields");
							}
							else{	
								$("<label for="+ elem +" class='control-label col-xs-2'>"+elem +"</label><div class='col-xs-2'><input type='text' class='form-control' id="+ elem +" name="+ elem +"></div>").appendTo("#newfields");
							}
						}
						else if(i%2 == 0){
							$("</div>").appendTo("#newfields");
							$("<div class='form-group'>").appendTo("#newfields");
							if(dictionary[elem].type == "drop"){
								var toappend = "<label for="+elem+" class='control-label col-xs-2'>"+elem+"</label>";
								toappend += "<div class='col-xs-2'><select class='form-control' id="+elem+">";
								toappend += "<option></option>";
								toappend += elemvalues(elem);
								toappend += "</select></div>";
								$(toappend).appendTo("#newfields");
							}
							else{							
							$("<label for="+ elem +" class='control-label col-xs-2'>"+elem +"</label><div class='col-xs-2'><input type='text' class='form-control' id="+ elem +" name="+ elem +"></div>").appendTo("#newfields");
							}
						}
						else{
							if(dictionary[elem].type == "drop"){
								var toappend = "<label for="+elem+" class='control-label col-xs-2'>"+elem+"</label>";
								toappend += "<div class='col-xs-2'><select class='form-control' id="+elem+">";
								toappend += "<option></option>";
								toappend += elemvalues(elem);
								toappend += "</select></div>";
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