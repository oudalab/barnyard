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