//Linked to users_management.html
//Function to get all the users and populate the left column
$.ajax({
	url: '/api/users_a/',
	data: {},
	type: 'GET',
	datatype : 'json',
	success: function(data) {
		console.log(data);
		$(data.data).each(function( i, val ){
			console.log(val.attributes.firstname);
			$("<li><a onclick='calluserinfo("+val.attributes.userid+")'>"+val.attributes.lastname+", "+val.attributes.firstname+" - "+val.attributes.userid+"  </a></li>").appendTo("#userslist");
		})
	},
	error: function(error){
		console.log(error)
	}
});

//Function to Pull Single user Info
function calluserinfo(userid){
	$.ajax({
					url: '/api/users_s/'+userid,
					data: {},
					type: 'GET',
					datatype : 'json',
					success: function(data) {
						var firstname = data.data.attributes.firstname;
						var lastname = data.data.attributes.lastname;
						var email = data.data.attributes.email;
						var roles = data.data.attributes.roles;
						var userid = data.data.attributes.userid;
						$('#firstname').val(firstname);
						$('#lastname').val(lastname);
						$('#email').val(email);
						$('#roles').val(roles);
						$('#userid').val(userid);
					},
					error: function(error){
						console.log(error)
					}
			});
}
$('#user_update').click(function(e) {
	var userid = $('#userid').val()
	var user_info = {
		firstname : $('#firstname').val(),
		lastname : $('#lastname').val(),
		email : $('#email').val(),
		roles : $('#roles').val()
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

