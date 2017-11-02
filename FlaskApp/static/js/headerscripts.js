    // SCRIPTS FROM HEADER
	var allaroundcownumber = getQueryVariable("cownumber");
	
	$(document).ready(function(){
        var date_input=$('input[name="date"]'); //our date input has the name "date"
        var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
        date_input.datepicker({
            format: 'yyyy-mm-dd',
            container: container,
            todayHighlight: true,
            autoclose: true,
        })
    });
	function difference2days(date1,date2){
		var a = moment(date2, 'yyyy-mm-dd');
		var b = moment(date1, 'yyyy-mm-dd');
		var days = b.diff(a, 'days');
		return days;
	return false;
	}
	function adjusted205wtandht(data,days){
		var answer = (data/days)*205;
		return answer;
	}
	function adjusted365wtandht(data,days){
		var answer = (data/days)*365;
		return answer;
	}
	function framescorecalculate(days,hipht,animaltype){
		if(days >=150 && days <=650){
			if(animaltype == "bull" || animaltype == "Bull"){
				var framescore = -11.548+((0.4878*(hipht +1)))-(0.0289*days)+(0.00001947*(days*days))+((0.0000334*((hipht+1)*days)));
				return framescore;
			} else if(animaltype == "steer" || animaltype == "Steer"){
				var framescore = -11.548+((0.4878*(hipht)))-(0.0289*days)+(0.00001947*(days*days))+((0.0000334*((hipht)*days)));
				return framescore;
			} else if(animaltype == "heifer" || animaltype == "Heifer"){
				var framescore= -11.7086+(0.4723*hipht)-(0.0239*days)+(0.0000146*(days*days))+(0.0000759*(hipht*days));
				return framescore;
			} else if(animaltype == "cow" || animaltype == "Cow"){
				var framescore= -11.7086+(0.4723*hipht)-(0.0239*days)+(0.0000146*(days*days))+(0.0000759*(hipht*days));
				return framescore;
			} else if(animaltype == "calf" || animaltype == "Calf"){
				var framescore= -11.7086+(0.4723*hipht)-(0.0239*days)+(0.0000146*(days*days))+(0.0000759*(hipht*days));
				return framescore;
			} else{
				console.log("Invalid Selection");
			}
		} else{
			if(days>=651 && days<=1095){
				var framescore = (-11.7086+(0.4723*hipht)-(0.0239*730)+(0.0000146*(730*730))+(0.0000759*(hipht*730)))-0.4;
				return framescore;
			}
			else if(days>=1096 && days<=1460){
				var framescore =(-11.7086+(0.4723*hipht)-(0.0239*730)+(0.0000146*(730*730))+(0.0000759*(hipht*730)))-0.9;
				return framescore;
			}
			else{
				var framescore =(-11.7086+(0.4723*hipht)-(0.0239*730)+(0.0000146*(730*730))+(0.0000759*(hipht*730)))-1.1;
				return framescore;
			}
		}
	}
	function framescoreget(variable){
		$.ajax({
			url: '/api/animalname/'+variable,
			data: {},
			type: 'GET',
			datatype : 'json',
			success: function(data) {
				var cownumber = data.data.attributes.cownumber;
				console.log(cownumber);
				$.ajax({
					url: '/api/master_animal/'+cownumber,
					data: {},
					type: 'GET',
					datatype : 'json',
					success: function(data) {
						var currentframescore = data.data.attributes.currentframescore;
						document.getElementById('sireframescore').value=currentframescore;
						console.log(currentframescore);
					}
					,
					error: function(error) {
						console.log(error);
						document.getElementById('sireframescore').value='0';
						$.notify("Current Frame Score doesnt Exist does not exist", "danger");
					}	
				});
			}
			,
			error: function(error) {
				console.log(error);
				$.notify("Sire Frame Score does not exist", "danger");
			}	
		});
	};
	$('body').on('focus',".datepicker_recurring_start", function(){
		$(this).datepicker();
	});
	function getQueryVariable(variable)
	{
	   var query = window.location.search.substring(1);
	   var vars = query.split("&");
	   for (var i=0;i<vars.length;i++) {
			   var pair = vars[i].split("=");
			   if(pair[0] == variable){return pair[1];}
	   }
	   return false;
	};	
	jQuery(document).ready(function()
		{
			jQuery('.alert').delay(3000).fadeOut();
		});
	$(document).ready(function(){	
		$('#headersearch').click(function(){
			var searchboxvalue = $('#headerSearchbox').val();
			$.ajax({
					url: '/api/animalname/'+searchboxvalue,
					data: {},
					type: 'GET',
					datatype : 'json',
					success: function(data) {
						var cownumber = data.data.attributes.cownumber;
						$.ajax({
							url: '/api/master_animal/'+cownumber,
							data: $('form').serialize(),
							type: 'GET',
							success: function(data) {
								var exists = false;
								$("#latestcow li a").each(function( i, val ) {
									if ($.trim(val.text) == searchboxvalue){ 
										exists = true;
										basicget(val.text);
										animal_inventoryget(val.text);
										experimentget(val.text);
										reproductionget(val.text);
										medicalget(val.text);
										grazingget(val.text);
										datatablescall(val.text);
										$.notify("Cow number "+searchboxvalue+" - "+cownumber+" is already on the list", "info");
										$('#headerSearchbox').val('');
										// break;
									}
								});
								if (exists == false)
								{
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
											console.log("this is the cownumber" +response);
											$("<li><a onclick='callall("+cownumber+")'> "+animalname+" - "+cownumber+"</a></li>").prependTo("#latestcow");
											$('#headerSearchbox').val('');
										},
										error: function(error) {
											console.log(error);
											$.notify("Cow number doesnt exist", "danger");
										}	
									})
								}
							},
							error: function(error) {
								console.log(error);
								$.notify("Animal number doesnt exist", "danger");
							}
						});
					},
					error: function(error) {
						console.log(error);
						$.notify("Animal Name doesnt exist", "danger");
					}
			});
			return false;
		});
	});
	function callall(cownumber){
		console.log("this is the cownumber" +cownumber);
		basicget(cownumber);
		animal_inventoryget(cownumber);
		experimentget(cownumber);
		reproductionget(cownumber);
		medicalget(cownumber);
		grazingget(cownumber);
		datatablescall(cownumber);
	};
	
	// Code to Load Data 
	function basicget( variable) 
	{
		$(document).ready(function(e){
			$.ajax({
					url: '/api/master_animal/'+variable,
					data: {},
					type: 'GET',
					datatype : 'json',
					success: function(data) {
						console.log(data);
						var height = data.data.attributes.height;
						var weight = data.data.attributes.weight;
						var eartag = data.data.attributes.eartag;
						var eid = data.data.attributes.eid;
						var sex = data.data.attributes.sex;
						var pasturenumber = data.data.attributes.pasturenumber;
						var breed = data.data.attributes.breed;
						var status = data.data.attributes.status;
						var trial = data.data.attributes.trial;
						var herd = data.data.attributes.herd;
						var animaltype = data.data.attributes.animaltype;
						var animalname = data.data.attributes.animalname;
						var animalgroup = data.data.attributes.animalgroup;
						var breeder = data.data.attributes.breeder;
						var currentframescore = data.data.attributes.currentframescore;
						var damframescore = data.data.attributes.damframescore;
						var comments = data.data.attributes.comments;
						var species = data.data.attributes.species;
						$('#cownumber').val(variable);
						$('#height').val(height);
						$('#weight').val(weight);
						$('#eartag').val(eartag);
						$('#eid').val(eid);
						$('#sex option:selected').text(sex);
						$('#pasturenumber option:selected').text(pasturenumber);
						$('#breed').val(breed);
						$('#status option:selected').text(status);
						$('#trial option:selected').text(trial);
						$('#herd').val(herd);
						$('#animaltype option:selected').text(animaltype);
						$('#animalname').val(animalname);
						$('#animalgroup').val(animalgroup);
						$('#breeder').val(breeder);
						$('#currentframescore').val(currentframescore);
						$('#damframescore').val(damframescore);
						$('#comments').val(comments);
						$('#species').val(species);
					},
					error: function(error) {
						console.log(error)
						$.notify("Master_Animal Failed", "error")
						
					}
				});
		});
	return false;
	};
	function animal_inventoryget(variable) 
	{
		$(document).ready(function(e){
			$.ajax({
					url: '/api/animal_inventory/'+variable,
					data: {},
					type: 'GET',
					datatype : 'json',
					success: function(data) {
						console.log(data);	
						var brand = data.data[0].attributes.brand;
						var brandlocation = data.data[0].attributes.brandlocation;
						var tattooleft = data.data[0].attributes.tattooleft;
						var tattooright = data.data[0].attributes.tattooright;
						var alternativeid = data.data[0].attributes.alternativeid;
						var registration = data.data[0].attributes.registration;
						var color  = data.data[0].attributes.color;
						var hornstatus  = data.data[0].attributes.hornstatus;
						var dam  = data.data[0].attributes.dam;
						var sire  = data.data[0].attributes.sire;
						var dob  = data.data[0].attributes.dob;
						var howacquired  = data.data[0].attributes.howacquired;
						var dateacquired  = data.data[0].attributes.dateacquired;
						var howdisposed  = data.data[0].attributes.howdisposed;
						var datedisposed  = data.data[0].attributes.datedisposed;
						var disposalreason  = data.data[0].attributes.disposalreason;
						var herdnumberlocation = data.data[0].attributes.herdnumberlocation;
						var herdstatus = data.data[0].attributes.herdstatus;
						var howconceived = data.data[0].attributes.howconceived;
						var managementcode = data.data[0].attributes.managementcode;
						var ownerID = data.data[0].attributes.ownerID;
						var springfall = data.data[0].attributes.springfall;
						var includeinlookups = data.data[0].attributes.includeinlookups;
						$('#brand').val(brand);
						$('#brandlocation option:selected').text(brandlocation);
						$('#tattooleft').val(tattooleft);
						$('#tattooright').val(tattooright);
						$('#alternativeid').val(alternativeid);
						$('#registration').val(registration);
						$('#color').val(color);
						$('#hornstatus option:selected').text(hornstatus);
						$('#howacquired option:selected').text(howacquired);
						$('#dateacquired').val(dateacquired);
						$('#howdisposed option:selected').text(howdisposed);
						$('#datedisposed').val(datedisposed);
						$('#disposalreason').val(disposalreason);
						$('#springfall option:selected').text(springfall);
						$('#includeinlookups option:selected').text(includeinlookups);
						$('#herdnumberlocation').val(herdnumberlocation);
						$('#herdstatus').val(herdstatus);
						$('#managementcode').val(managementcode);
						$('#ownerID').val(ownerID);
						$('#howconceived').val(howconceived);
					},
					error: function(error) {
						console.log(error)
						$.notify("Animal_Inventory Failed", "error")
					}
				});
		});

	};
	function experimentget(variable) 
	{
		$(document).ready(function(e){
			$.ajax({
					url: '/api/experiment/'+variable,
					data: {},
					type: 'GET',
					datatype : 'json',
					success: function(data) {
						console.log(data);
						
						var birthweight = data.data[0].attributes.birthweight;
						var birthweightadj = data.data[0].attributes.birthweightadj;
						var sireframescore = data.data[0].attributes.sireframescore;
						var conditionscoreweaning2015 = data.data[0].attributes.conditionscoreweaning2015;
						var conditionscoreweaning2016 = data.data[0].attributes.conditionscoreweaning2016;
						var bcsrecent = data.data[0].attributes.bcsrecent;
						var bcsprevious = data.data[0].attributes.bcsprevious;
						var bcsdifference = data.data[0].attributes.bcsdifference;
						var damwtatwean = data.data[0].attributes.damwtatwean;
						var weangpd = data.data[0].attributes.weangpd;
						var weanhipht = data.data[0].attributes.weanhipht;
						var weanwda = data.data[0].attributes.weanwda;
						var weanweightdate = data.data[0].attributes.weanweightdate;
						var weanheight = data.data[0].attributes.weanheight;
						var weanweight = data.data[0].attributes.weanweight;
						var weandate = data.data[0].attributes.weandate;
						var adj205w  = data.data[0].attributes.adj205w;
						var adj205h  = data.data[0].attributes.adj205h;
						var weanframescore  = data.data[0].attributes.weanframescore;
						var ageatwean  = data.data[0].attributes.ageatwean;
						var yearlingweight  = data.data[0].attributes.yearlingweight;
						var yearlingheight  = data.data[0].attributes.yearlingheight;
						var yearlingdate  = data.data[0].attributes.yearlingdate;
						var adjyearlingw  = data.data[0].attributes.adjyearlingw;
						var adjyearlingh  = data.data[0].attributes.adjyearlingh;
						var yearlingframescore  = data.data[0].attributes.yearlingframescore;
						var ageatyearling  = data.data[0].attributes.ageatyearling;
						var currentwtcow = data.data[0].attributes.currentwtcow;
						var currentwtheifer = data.data[0].attributes.currentwtheifer;
						var adj365dht = data.data[0].attributes.adj365dht;
						var customweight  = data.data[0].attributes.customweight;
						var customheight  = data.data[0].attributes.customheight;
						var customweightdate  = data.data[0].attributes.customweightdate;
						var customheightdate  = data.data[0].attributes.customheightdate;
						var backfat  = data.data[0].attributes.backfat;
						var treatment  = data.data[0].attributes.treatment;
						var blockpen  = data.data[0].attributes.blockpen;
						var replicate  = data.data[0].attributes.replicate;
						var dam  = data.data[0].attributes.dam;
						var sire  = data.data[0].attributes.sire;
						var dob  = data.data[0].attributes.dob;
						var animaltype = data.data[0].attributes.animaltype;
						//var framescoregot = framescoreget(dam);
						var weandays = difference2days(weandate,dob);
						var yearlingdays = difference2days(yearlingdate,dob);
						$('#birthweight').val(birthweight);
						//$('#sireframescore').val(framescoreget(sire));
						$('#sireframescore').val('0');
						$('#weanheight').val(weanheight);
						$('#weanweight').val(weanweight);
						$('#weandate').val(weandate);
						$('#adj205w').val(adjusted205wtandht(weanweight,weandays));
						$('#adj205h').val(adjusted205wtandht(weanhipht,weandays));
						$('#weanframescore').val(framescorecalculate(weandays,weanhipht,animaltype));
						$('#ageatwean').val(difference2days(weandate,dob));
						$('#yearlingheight').val(yearlingheight);
						$('#yearlingweight').val(yearlingweight);
						$('#yearlingdate').val(yearlingdate);
						$('#adjyearlingh').val(adjusted365wtandht(yearlingheight,yearlingdays));
						$('#adjyearlingw').val(adjusted365wtandht(yearlingweight,yearlingdays));
						$('#yearlingframescore').val(framescorecalculate(yearlingdays,yearlingheight,animaltype));
						$('#ageatyearling').val(ageatyearling);
						$('#customweight').val(customweight);
						$('#customheight').val(customheight);
						$('#customheightdate').val(customheightdate);
						$('#customweightdate').val(customweightdate);
						$('#backfat').val(backfat);
						$('#blockpen').val(blockpen);
						$('#replicate').val(replicate);
						$('#dam').val(dam);
						$('#sire').val(sire);
						$('#dob').val(dob);
						$('#damexperiment').val(dam);
						$('#sireexperiment').val(sire);
						$('#dobexperiment').val(dob);
						$('#treatment option:selected').text(treatment);
						$('#birthweightadj').val(birthweightadj);
						$('#conditionscoreweaning2015').val(conditionscoreweaning2015);
						$('#conditionscoreweaning2016').val(conditionscoreweaning2016);
						$('#bcsrecent').val(bcsrecent);
						$('#bcsprevious').val(bcsprevious);
						$('#bcsdifference').val(bcsdifference);
						$('#damwtatwean').val(damwtatwean);
						$('#weangpd').val(weangpd);
						$('#weanhipht').val(weanhipht);
						$('#weanwda').val(weanwda);
						$('#weanweightdate').val(weanweightdate);
						$('#currentwtcow').val(currentwtcow);
						$('#currentwtheifer').val(currentwtheifer);
						$('#adj365dht').val(adj365dht);
					},
					error: function(error) {
						console.log(error)
						$.notify("Experiment GET Failed", "error")
					}
				});
		});

	};
	function reproductionget( variable) 
	{
		$(document).ready(function(e){
			$.ajax({
					url: '/api/reproduction/'+variable,
					data: {},
					type: 'GET',
					datatype : 'json',
					success: function(data) {
						console.log(data);
						var breeding = data.data[0].attributes.breeding;
						var pregnancy = data.data[0].attributes.pregnancy;
						var calfatside = data.data[0].attributes.calfatside;
						var totalcalves = data.data[0].attributes.totalcalves;
						var previouscalf = data.data[0].attributes.previouscalf;
						var damageatbirth = data.data[0].attributes.damageatbirth;
						var currentcalf = data.data[0].attributes.currentcalf;
						var calfdob = data.data[0].attributes.calfdob;
						var calfsex = data.data[0].attributes.calfsex;
						var calfbirthweight = data.data[0].attributes.calfbirthweight;
						var pasturenumberreproduction = data.data[0].attributes.pasturenumberreproduction;
						var damcalvingdisposition = data.data[0].attributes.damcalvingdisposition;
						var calvingease = data.data[0].attributes.calvingease;
						var udderscore = data.data[0].attributes.udderscore;
						var siblingcode = data.data[0].attributes.siblingcode;
						var conditionscorecalving = data.data[0].attributes.conditionscorecalving;
						var hiphtbreeding2016 = data.data[0].attributes.hiphtbreeding2016;
						var hiphtweaning2015 = data.data[0].attributes.hiphtweaning2015;
						var hiphtweaning2016 = data.data[0].attributes.hiphtweaning2016;
						var damdisposition = data.data[0].attributes.damdisposition;
						var cowframescore = data.data[0].attributes.cowframescore;
						var cowwtbreeding = data.data[0].attributes.cowwtbreeding;
						var cowwtweaning = data.data[0].attributes.cowwtweaning;
						var cowwtcalving = data.data[0].attributes.cowwtcalving;
						var cowhtbreeding = data.data[0].attributes.cowhtbreeding;
						var cowhtweaning = data.data[0].attributes.cowhtweaning;
						var cowhtcalving = data.data[0].attributes.cowhtcalving;
						var bcsweaning = data.data[0].attributes.bcsweaning;
						var bcscalving = data.data[0].attributes.bcscalving;
						var bcsbreeding = data.data[0].attributes.bcsbreeding;
						var customcowht = data.data[0].attributes.customcowht;
						var customcowwt = data.data[0].attributes.customcowwt;
						var bullframescore = data.data[0].attributes.bullframescore;
						var bulldisposition = data.data[0].attributes.bulldisposition;
						var bullwtprebreeding = data.data[0].attributes.bullwtprebreeding;
						var bullhtprebreeding = data.data[0].attributes.bullhtprebreeding;
						var fertility = data.data[0].attributes.fertility;
						var mobility = data.data[0].attributes.mobility;
						var conc = data.data[0].attributes.conc;
						var deadabnormal = data.data[0].attributes.deadabnormal;
						$('#breeding option:selected').text(breeding);
						$('#pregnancy option:selected').text(pregnancy);
						$('#calfatside').val(calfatside);
						$('#totalcalves').val(totalcalves);
						$('#previouscalf').val(previouscalf);
						$('#damageatbirth').val(damageatbirth);
						$('#currentcalf').val(currentcalf);
						$('#calfdob').val(calfdob);
						$('#calfsex option:selected').text(calfsex);
						$('#calfbirthweight').val(calfbirthweight);
						$('#pasturenumberreproduction').val(pasturenumberreproduction);
						$('#damcalvingdisposition option:selected').text(damcalvingdisposition);
						$('#calvingease option:selected').text(calvingease);
						$('#udderscore').val(udderscore);
						$('#siblingcode option:selected').text(siblingcode);
						$('#conditionscorecalving').val(conditionscorecalving);
						$('#hiphtweaning2015').val(hiphtweaning2015);
						$('#hiphtweaning2016').val(hiphtweaning2016);
						$('#hiphtbreeding2016').val(hiphtbreeding2016);
						$('#damdisposition option:selected').text(damdisposition);
						$('#cowframescore').val(cowframescore);
						$('#cowwtbreeding').val(cowwtbreeding);
						$('#cowhtbreeding').val(cowhtbreeding);
						$('#cowwtcalving').val(cowwtcalving);
						$('#cowhtcalving').val(cowhtcalving);
						$('#cowwtweaning').val(cowwtweaning);
						$('#cowhtweaning').val(cowhtweaning);
						$('#bcsbreeding').val(bcsbreeding);
						$('#bcscalving').val(bcscalving);
						$('#bcsweaning').val(bcsweaning);
						$('#customcowht').val(customcowht);
						$('#customcowwt').val(customcowwt);
						$('#bullframescore').val(bullframescore);
						$('#bulldisposition option:selected').text(bulldisposition);
						$('#bullwtprebreeding').val(bullwtprebreeding);
						$('#bullhtprebreeding').val(bullhtprebreeding);
						$('#fertility').val(fertility);
						$('#mobility').val(mobility);
						$('#conc').val(conc);
						$('#deadabnormal').val(deadabnormal);
					},
					error: function(error) {
						console.log(error)
						$.notify("Reproduction Failed", "error")
						
					}
				});
		});
	return false;
	};
	function medicalget( variable) 
	{
		$(document).ready(function(e){
			$.ajax({
					url: '/api/medical/'+variable,
					data: {},
					type: 'GET',
					datatype : 'json',
					success: function(data) {
						console.log(data);
						var reasonforprocedure = data.data[0].attributes.reasonforprocedure;
						var notificationofvmo = data.data[0].attributes.notificationofvmo;
						var recommendationofvmo = data.data[0].attributes.recommendationofvmo;
						var treatmentprotocol = data.data[0].attributes.treatmentprotocol;
						var animallocationpreresolution = data.data[0].attributes.animallocationpreresolution;
						var followupexam = data.data[0].attributes.followupexam;
						var resolution = data.data[0].attributes.resolution;
						var dateoffollowup = data.data[0].attributes.dateoffollowup;
						var animallocation = data.data[0].attributes.animallocation;
						var dateofaction = data.data[0].attributes.dateofaction;
						$('#reasonforprocedure').val(reasonforprocedure);
						$('#notificationofvmo option:selected').text(notificationofvmo);
						$('#recommendationofvmo').val(recommendationofvmo);
						$('#treatmentprotocol').val(treatmentprotocol);
						$('#animallocationpreresolution').val(animallocationpreresolution);
						$('#followupexam').val(followupexam);
						$('#resolution').val(resolution);
						$('#dateoffollowup').val(dateoffollowup);
						$('#animallocation').val(animallocation);
						$('#dateofaction').val(dateofaction);
					},
					error: function(error) {
						console.log(error)
						$.notify("Medical data Failed", "error")
						
					}
				});
		});
	return false;
	};
	function grazingget( variable) 
	{
		$(document).ready(function(e){
			$.ajax({
					url: '/api/grazing/'+variable,
					data: {},
					type: 'GET',
					datatype : 'json',
					success: function(data) {
						console.log(data);
						var pastureacres = data.data[0].attributes.pastureacres;
						var animalspresent = data.data[0].attributes.animalspresent;
						var datein = data.data[0].attributes.datein;
						var dateout = data.data[0].attributes.dateout;
						var stockingrate = data.data[0].attributes.stockingrate;
						var pasturenumbergrazing = data.data[0].attributes.pasturenumbergrazing ;
						var sample = data.data[0].attributes.sample ;
						var biomass = data.data[0].attributes.biomass ;
						var DMavailable = data.data[0].attributes.DMavailable ;
						var cp = data.data[0].attributes.cp ;
						var cp1 = data.data[0].attributes.cp1 ;
						var cp2 = data.data[0].attributes.cp2 ;
						var cp3 = data.data[0].attributes.cp3 ;
						var cp4 = data.data[0].attributes.cp4 ;
						var pasturenumberburning = data.data[0].attributes.pasturenumberburning ;
						var dateburned = data.data[0].attributes.dateburned ;
						var qualityofburn = data.data[0].attributes.qualityofburn ;
						var pasturenumberpesticide = data.data[0].attributes.pasturenumberpesticide ;
						var chemicalname = data.data[0].attributes.chemicalname ;
						var applicationrate = data.data[0].attributes.applicationrate ;
						var applicationdate = data.data[0].attributes.applicationdate ;
						pasturenumbergrazing: $('#pasturenumbergrazing').val(pasturenumbergrazing);
						sample: $('#sample').val(sample);
						biomass: $('#biomass').val(biomass);
						DMavailable: $('#DMavailable').val(DMavailable);
						cp: $('#cp').val(cp);
						cp1: $('#cp1').val(cp1);
						cp2: $('#cp2').val(cp2);
						cp3: $('#cp3').val(cp3);
						cp4: $('#cp4').val(cp4);
						pasturenumberburning: $('#pasturenumberburning').val(pasturenumberburning);
						dateburned: $('#dateburned').val(dateburned);
						qualityofburn: $('#qualityofburn').val(qualityofburn);
						pasturenumberpesticide: $('#pasturenumberpesticide').val(pasturenumberpesticide);
						chemicalname: $('#chemicalname').val(chemicalname);
						applicationrate: $('#applicationrate').val(applicationrate);
						pastureacres: $('#pastureacres').val(pastureacres);
						animalspresent : $('#animalspresent').val(animalspresent);
						datein : $('#datein').val(datein);
						dateout : $('#dateout').val(dateout);
						stockingrate : $('#stockingrate').val(stockingrate);
					},
					error: function(error) {
						console.log(error)
						$.notify("Grazing Failed", "error")
						
					}
				});
		});
	return false;
	};
	function datatablescall( variable) 
	{
		$(document).ready(function () {
			$.ajax({
				url : '/api/grazing/'+variable,
				type : 'GET',
				dataType : 'json',
				success : function(data) {
					assignToEventsColumns1(data);
				}
			});
			function assignToEventsColumns1(data) {
				var table = $('#table_P_sampling').dataTable({
					"bAutoWidth" : false,
					data : data.data,
					"columns" : [ {
						"data" : "attributes.pasturenumbergrazing"
					}, {
						"data" : "attributes.sample"
					}, {
						"data" : "attributes.biomass"
					}, {
						"data" : "attributes.DMavailable"
					}, {
						"data" : "attributes.cp"
					}, {
						"data" : "attributes.cp1"
					}, {
						"data" : "attributes.cp2"
					}, {
						"data" : "attributes.cp3"
					}, {
						"data" : "attributes.cp4"
					} ]
				})
			}
			
		});
	return false;
	};
	$(document).ready(function () {
		$.ajax({
            url : '/api/grazing/'+allaroundcownumber,
            type : 'GET',
            dataType : 'json',
            success : function(data) {
                assignToEventsColumns2(data);
            }
        });
        function assignToEventsColumns2(data) {
            var table = $('#table_burning').dataTable({
                "bAutoWidth" : false,
                data : data.data,
                "columns" : [ {
                    "data" : "attributes.pasturenumberburning"
                }, {
                    "data" : "attributes.dateburned"
                }, {
                    "data" : "attributes.qualityofburn"
                } ]
            });
        }
		
	});
	$(document).ready(function () {
		$.ajax({
            url : '/api/grazing/'+allaroundcownumber,
            type : 'GET',
            dataType : 'json',
            success : function(data) {
                assignToEventsColumns3(data);
            }
        });
        function assignToEventsColumns3(data) {
            var table = $('#table_pesticide').dataTable({
                "bAutoWidth" : false,
                data : data.data,
				//order: [ 1, 'desc' ],
                "columns" : [ {
                    "data" : "attributes.pasturenumberpesticide"
                }, {
                    "data" : "attributes.chemicalname"
                }, {
                    "data" : "attributes.applicationrate"
                }, {
                    "data" : "attributes.applicationdate"
                } ]
            });
        }	
	});	
	$(document).ready(function () {
		$.ajax({
            url : '/api/experiment/'+allaroundcownumber,
            type : 'GET',
            dataType : 'json',
            success : function(data) {
                assignToEventsColumns4(data);
            }
        });
        function assignToEventsColumns4(data) {
            var table = $('#experiment_table').dataTable({
                "bAutoWidth" : false,
                data : data.data,
				//order: [ 1, 'desc' ],
                "columns" : [ {
                    "data" : "attributes.cownumber"
                }, {
                    "data" : "attributes.weandate"
                }, {
                    "data" : "attributes.weanframescore"
                } ]
            });
        }	
	});

