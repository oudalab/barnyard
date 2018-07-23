$(document).ready(function(){
	$.ajax({
		url : '/api/reproduction/record/',
		type : 'GET',
		dataType : 'json',
		async: false,
		success : function(data) {
			console.log(data);
			tablecall(data, columns);
		},
		error: function(response){
			console.log(response);
		}
	});
});