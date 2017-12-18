	$(document).ready(function(e){
			var emaillabel = get_email();
			$.ajax({
					url: '/api/users_s_email/'+emaillabel,
					data: {},
					type: 'GET',
					datatype : 'json',
					async: false,
					success: function(data) {
						var userid = data.data.attributes.userid;
						var firstname = data.data.attributes.firstname;
						var lastname = data.data.attributes.lastname;
						var email = data.data.attributes.email;
						
						$('#firstname').val(firstname);
						$('#lastname').val(lastname);
						$('#email').val(email);
						$('#userid').val(userid);
					},
					error: function(error) {
						console.log(error)
						$.notify("User Info get Failed", "error")
					}
				});
		});
		
		
$('#submituserdata').click(function(e) {
	var userid = $('#userid').val()
	var user_info = {
		firstname : $('#firstname').val(),
		lastname : $('#lastname').val(),
		email : $('#email').val()
	}
	$.ajax({
		url: '/api/users_s/'+userid,
		data: user_info,
		datatype: 'json',
		type: 'PATCH',
		success: function(response) {
			console.log(response);
			$.notify("User Data Saved", "info");
		},
		error: function(error) {
			console.log(error)
			$.notify("User Data already exist", "danger");
		}
	});
	e.preventDefault();
});


$('#submitpassword').click(function(e){
	var userid = $('#userid').val()
	var newuser = {
		password : $('#newpassword').val()
	};
	if (validatePassword()) { 
		$.ajax({
			url: '/api/users_s/'+userid,
			data: newuser,
			type: 'PATCH',
			datatype: 'json',
			success: function(response) {
				console.log(response);
				$.notify("User Data Saved", "info");
			},
			error: function(error) {
				console.log(error);
				$.notify("Database Error", "error");					
			}
		});
	}else{
		$.notify("Password wrong Error", "error");
	}
});

		
function validateEmail(){
	var email = $('#email').val();
	//Email verification using regex
	var re = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

	if (!re.test(email)){
		alert("Please check the Email");
		return false;
	}
	else {
		return true;
	}
}

function validatePassword(){
	var newpassword = $('#newpassword').val();
	var confirmpassword = $('#confirmpassword').val();

	if (newpassword != confirmpassword){
		alert("Please check the password");
		return false;
	}else {
		return true;
	}
}

//Password Matching Functions
$('#newpassword, #confirmpassword').on('keyup', function () {
  if ($('#newpassword').val() == $('#confirmpassword').val()) {
    $('#message').html('Matching').css('color', 'green');
  } else 
    $('#message').html('Not Matching').css('color', 'red');
});