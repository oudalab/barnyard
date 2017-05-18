$(document).ready(function(e){
		// var herdattributes = herdchangeparse("string");
		// var variable = groupnumber;
		$.ajax({
				url: '/api/herd_change/',
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