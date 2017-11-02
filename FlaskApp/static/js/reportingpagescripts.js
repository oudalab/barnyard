//Connected to Reporting.html

//Necessary global variables to bring informations into several functions 
var attributes="";
var start_date = "";
var end_date = "";
var table_create= "";

//GET request to get the latest submitted create_report request
$(document).ready(function(e){
		$.ajax({
				url: '/api/reporting/',
				data: {},
				type: 'GET',
				datatype : 'json',
				success: function(data) {
					console.log(data);
					attributes = $.parseJSON(data[0].attributes);
					createHeaderandFooter(attributes);
					start_date = data[0].start_date;
					end_date = data[0].end_date;
					var cownumber = data[0].cownumber;
					var cownumberlist = $.parseJSON(data[0].cownumber);
					//Redo the ParseJSON for EID and EARTAG later.
					//Already Done
					var eartag = data[0].eartag;
					var eartaglist = $.parseJSON(data[0].eartag);
					var eid = data[0].eid;
					var eidlist = $.parseJSON(data[0].eid);
					$('#cownumber').val(cownumberlist);
					$('#eartag').val(eartaglist);
					$('#eid').val(eidlist);
					$('#attributes').val(attributes);
					callallReporting(cownumberlist);
					
				},
				error: function(error) {
					console.log(error)
					$.notify("Master_Animal Failed", "error")
					
				}
			});
	});
	//Code to excute GET statements from API 
	function callallReporting(cownumberlist){
		$(cownumberlist).each(function(i,elem){
			basicgetreporting(elem);
			animal_inventorygetreporting(elem);
			experimentgetreporting(elem);
			reproductiongetreporting(elem);
			medicalgetreporting(elem);
			grazinggetreporting(elem);
		});

	};
	
	function createHeaderandFooter(inputattributes){
		$(document).ready(function(e){
			var toappend = "<tr>";
			toappend += addattributes(inputattributes);
			toappend += "</tr>";
			$(toappend).appendTo("#reporttableheader");
			$(toappend).appendTo("#reporttablefooter");	
		});
		$(document).ready( function () {
			table_create = $('#report_table').DataTable(
			{
				"columns": addAttributesColumns(attributes)
			});
		});
	};
	

	//Add data to the DataTable called below
	function fnClickAddRow(data){
		console.log(attributes);
		var emptydictionary={};
		$(attributes).each(function(i,elem){
			if(typeof data[elem] === 'undefined') {
				//do nothing
			}
			else {
				// does exist
				emptydictionary[elem]={name: elem , value: data[elem]};
				console.log(emptydictionary);
			}	
		});
		$(attributes).each(function(i,elem){
			console.log(emptydictionary[elem].name, ":" ,emptydictionary[elem].value);
			table_create.rows.add( {
				"height" : "0",
				"weight" : "0"
			} ).draw();
		});
		var emptydictionary={};
		
	};
	
	function addattributes(inputattributes){
		var options="";
		$(inputattributes).each(function(i,elem){
			options += "<th>"+elem+"</th>";
			
		});
		return options;
		
	};
	//called from table initalization to creates the column names
	function addAttributesColumns(inputattributes){
		var options= [];
		$(inputattributes).each(function(i,elem){
			options.push({'"data"': ""+elem+""})
		});
		console.log(options);
		return options;
		
	};
	// Code to Load Data 
	function basicgetreporting(identifier) 
	{
		$(document).ready(function(e){
			$.ajax({
					url: '/api/report_basic/' +identifier+'/'+start_date +'/'+end_date,
					data: {},
					type: 'GET',
					datatype : 'json',
					success: function(data) {
						console.log(data);
						var masterDataProcessed = {
							cownumber: data.data[0].attributes.cownumber,
							animalgroup: data.data[0].attributes.animalgroup,
							animalname: data.data[0].attributes.animalname,
							animaltype : data.data[0].attributes.animaltype,
							breed: data.data[0].attributes.breed,
							breeder : data.data[0].attributes.breeder,
							comments : data.data[0].attributes.comments,
							currentframescore  : data.data[0].attributes.currentframescore,
							damframescore  : data.data[0].attributes.damframescore,
							eartag : data.data[0].attributes.eartag,
							eid  : data.data[0].attributes.eid,
							height  : data.data[0].attributes.height,
							herd  : data.data[0].attributes.herd,
							pasturenumber  : data.data[0].attributes.pasturenumber,
							sex  : data.data[0].attributes.sex,
							species  : data.data[0].attributes.species,
							status  : data.data[0].attributes.status,
							trial : data.data[0].attributes.trial,
							ts : data.data[0].attributes.ts,
							weight : data.data[0].attributes.weight
							};
						fnClickAddRow(masterDataProcessed);
					},
					error: function(error) {
						console.log(error)
						$.notify("Master_Animal Failed", "error")
						
					}
				});
		});
	return false;
	};
	
	function animal_inventorygetreporting(identifier) 
	{
		$(document).ready(function(e){
			$.ajax({
					url: '/api/report_animal_inventory/' +identifier +'/' +start_date +'/' +end_date,
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
	function experimentgetreporting(identifier) 
	{
		$(document).ready(function(e){
			$.ajax({
					url: '/api/report_experiment/' +identifier +'/' +start_date +'/' +end_date,
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
	function reproductiongetreporting( identifier) 
	{
		$(document).ready(function(e){
			$.ajax({
					url: '/api/report_reproduction/'+identifier+'/'+start_date+'/'+end_date,
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
	function medicalgetreporting( identifier) 
	{
		$(document).ready(function(e){
			$.ajax({
					url: '/api/report_medical/' +identifier +'/' +start_date +'/' +end_date,
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
	function grazinggetreporting( identifier) 
	{
		$(document).ready(function(e){
			$.ajax({
					url: '/api/report_grazing/' +identifier +'/' +start_date +'/' +end_date,
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
	
	
	
