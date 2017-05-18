    // SCRIPTS FROM HEADER
	$(document).ready(function(){
        var date_input=$('input[name="date"]'); //our date input has the name "date"
        var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
        date_input.datepicker({
            format: 'mm/dd/yyyy',
            container: container,
            todayHighlight: true,
            autoclose: true,
        })
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
			var cownumber = $('#headerSearchbox').val();
			var exists = false;
			$("#latestcow li a").each(function( i, val ) {
				if ($.trim(val.text) == cownumber){ 
					exists = true;
					basicget(val.text);
					animal_inventoryget(val.text);
					experimentget(val.text);
					reproductionget(val.text);
					medicalget(val.text);
					grazingget(val.text);
					$.notify("Cow number "+cownumber+" is already on the list", "info");
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
						basicget(cownumber);
						animal_inventoryget(cownumber);
						experimentget(cownumber);
						reproductionget(cownumber);
						medicalget(cownumber);
						grazingget(cownumber);
						console.log("this is the cownumber" +response);
						$("<li><a onclick='callall("+cownumber+")'> "+cownumber+"</a></li>").prependTo("#latestcow");
						$('#headerSearchbox').val('');
					},
					error: function(error) {
						console.log(error);
						$.notify("Cow number doesnt exist", "danger");
					}	
				})
			}
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
						var damframescore = data.data[0].attributes.damframescore;
						var sireframescore = data.data[0].attributes.sireframescore;
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
						$('#birthweight').val(birthweight);
						$('#damframescore').val(damframescore);
						$('#sireframescore').val(sireframescore);
						$('#weanheight').val(weanheight);
						$('#weanweight').val(weanweight);
						$('#weandate').val(weandate);
						$('#adj205w').val(adj205w);
						$('#adj205h').val(adj205h);
						$('#weanframescore').val(weanframescore);
						$('#ageatwean').val(ageatwean);
						$('#yearlingheight').val(yearlingheight);
						$('#yearlingweight').val(yearlingweight);
						$('#yearlingdate').val(yearlingdate);
						$('#adjyearlingh').val(adjyearlingh);
						$('#adjyearlingw').val(adjyearlingw);
						$('#yearlingframescore').val(yearlingframescore);
						$('#ageatyearling').val(ageatyearling);
						$('#customweight').val(customweight);
						$('#customheight').val(customheight);
						$('#weanframescore').val(weanframescore);
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
						var comments = data.data[0].attributes.comments;
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
						$('#comments').val(comments);
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


