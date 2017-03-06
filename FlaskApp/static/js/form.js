$(function() {

$('#submit_button').bind('click', function() {
		var cownumber = $('#cownumber').val();
		var height = $('#height').val();
		var weight = $('#weight').val();
		$.ajax({
			url: '/api/post',
			data: $('form').serialize(),
			type: 'POST',
			success: function(response) {
				console.log(response);
			},
			error: function(error) {
				console.log(error);
			}
		});
	});
});