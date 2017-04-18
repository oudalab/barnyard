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
	$('#headersearch').click(function(){
		var cownumber = $('#headerSearchbox').val();
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
				$("<li><a onclick='callall("+cownumber+")'> "+ cownumber + "</a></li>").prependTo( "#latestcow");
				$('#headerSearchbox').val('');
			},
			error: function(error) {
				console.log(error);
				$.notify("Cow number doesnt exist", "danger");
			}	
		})
		return false;
	});

	


