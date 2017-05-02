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
						$("<label for="+ elem +" class='control-label col-xs-2'>"+elem +"</label><div class='col-xs-2'><input type='text' class='form-control' id="+ elem +" name="+ elem +"></div>").appendTo("#newfields");
					}
					else if(i%2 == 0){
						$("</div>").appendTo("#newfields");
						$("<div class='form-group'>").appendTo("#newfields");							
						$("<label for="+ elem +" class='control-label col-xs-2'>"+elem +"</label><div class='col-xs-2'><input type='text' class='form-control' id="+ elem +" name="+ elem +"></div>").appendTo("#newfields");
					}
					else{
						$("<label for="+ elem +" class='control-label col-xs-2'>"+elem +"</label><div class='col-xs-2'><input type='text' class='form-control' id="+ elem +" name="+ elem +"></div>").appendTo("#newfields");
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