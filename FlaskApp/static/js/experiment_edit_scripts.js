
$(document).ready(function(){
	var herdname = getQueryVariable("herdname");
	console.log(herdname);
	$.ajax({
		url : '/api/herd/name/'+herdname,
		type : 'POST',
		dataType : 'json',
		async: false,
		success : function(data) {
			console.log(data);
			$(data).each(function(j,elem){
				$("<li><a onclick='callall("+elem.animalname+")'> "+elem.AID+" -- "+elem.animalname+"</a></li>").prependTo("#animallist");
			});
			var value = JSON.parse(data[0].string);
			$(value).each(function(i,elem){
				var each = elem.split("-");
				console.log(each[0]+"=>"+each[1]);
				if(i == 0){
					$("<div class='form-group'>").appendTo("#newfields");
					if(each[0] == "drop"){
						var toappend = "<label for="+each[1]+" class='control-label col-xs-2'>"+each[1]+"</label>";
						toappend += "<div class='col-xs-2'><select name='"+each[1]+"' class='form-control' id="+each[1]+">";
						toappend += "<option></option>";
						toappend += elemvalues(each[1]);
						toappend += "</select></div>";
						$(toappend).appendTo("#newfields");
					}
					else if(each[0] == "date"){
						var toappend = "<label for='date' class='control-label col-xs-2' style='align-right'>"+each[1]+"</label>";
						toappend += "<div class='input-group col-xs-2'><input class='date' id="+each[1]+" name="+each[1]+" placeholder='YYYY-MM-DD' type='text'/></div>";
						toappend += "<script>$('#"+ each[1] +"').flatpickr({});</script>";
						$(toappend).appendTo("#newfields");
					}
					else{	
						$("<label for="+ each[1] +" class='control-label col-xs-2'>"+each[1] +"</label><div class='col-xs-2'><input type='text' class='form-control' id="+ each[1] +" name="+ each[1] +"></div>").appendTo("#newfields");
					}
				}
				else if(i%2 == 0){
					$("</div><br>").appendTo("#newfields");
					$("<div class='form-group'>").appendTo("#newfields");
					if(each[0] == "drop"){
						var toappend = "<label for="+each[1]+" class='control-label col-xs-2'>"+each[1]+"</label>";
						toappend += "<div class='col-xs-2'><select name='"+each[1]+"' class='form-control' id="+each[1]+">";
						toappend += "<option></option>";
						toappend += elemvalues(each[1]);
						toappend += "</select></div>";
						$(toappend).appendTo("#newfields");
					}
					else if(each[0] == "date"){
						var toappend = "<label for='date' class='control-label col-xs-2' style='align-right'>"+each[1]+"</label>";
						toappend += "<div class='input-group col-xs-2'><input class='date' id="+each[1]+" name="+each[1]+" placeholder='YYYY-MM-DD' type='text'/></div>";
						toappend += "<script>$('#"+ each[1] +"').flatpickr({});</script>";
						$(toappend).appendTo("#newfields");
					}
					else{							
					$("<label for="+ each[1] +" class='control-label col-xs-2'>"+each[1] +"</label><div class='col-xs-2'><input type='text' class='form-control' id="+ each[1] +" name="+ each[1] +"></div>").appendTo("#newfields");
					}
				}
				else{
					if(each[0] == "drop"){
						var toappend = "<label for="+each[1]+" class='control-label col-xs-2' style='align-right'>"+each[1]+"</label>";
						toappend += "<div class='col-xs-2'><select name='"+each[1]+"' class='form-control' id="+each[1]+">";
						toappend += "<option></option>";
						toappend += elemvalues(each[1]);
						toappend += "</select></div>";
						$(toappend).appendTo("#newfields");
					}
					else if(each[0] == "date"){
						var toappend = "<label for='date' class='control-label col-xs-2' style='align-right'>"+each[1]+"</label>";
						toappend += "<div class='input-group col-xs-2'><input class='date' id="+each[1]+" name="+each[1]+" placeholder='YYYY-MM-DD' type='text'/></div>";
						toappend += "<script>$('#"+ each[1] +"').flatpickr({});</script>";
						$(toappend).appendTo("#newfields");
					}
					else{
						$("<label for="+ each[1] +" class='control-label col-xs-2' style='align-right'>"+each[1] +"</label><div class='col-xs-2'><input type='text' class='form-control' id="+ each[1] +" name="+ each[1] +"></div>").appendTo("#newfields");
					}
				}
				$("</div>").appendTo("#newfields");
			});
		},
		error: function(response){
			console.log(response);
		}
	});
	
});


