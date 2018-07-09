jQuery(document).ready(function($) {
    $('#search').multiselect({
        search: {
            left: '<input type="text" name="q" class="form-control" placeholder="Search..." />',
            right: '<input type="text" name="q" class="form-control" placeholder="Search..." />',
        },
        fireSearch: function(value) {
            return value.length > 3;
        }
    });
});


$('#CreateHerdButton').click(function(e) {
	var herdname = $('#herdname').val();
	var herddescription = $('#herddescription').val();
	var create_date = $('#DateCreated').val();
	$('select#search_to option').each(function(i,pageelement){
		var animal_ID = pageelement.value;
		var data={
			name: herdname,
			description : herddescription,
			create_date : create_date,
			AID : animal_ID
		}
		var myJSON = JSON.stringify(data);
		$.ajax({
				url: '/api/herd/create/',
				data: myJSON,
				datatype: 'json',
				type: 'POST',
				success: function(response) {
					console.log(data);
					console.log(response);
					$.notify("Data Saved", "info");
				},
				error: function(error) {
					console.log(error)
					$.notify("Data not saved", "danger");
				}
			});
	});
});


$(document).ready(function () {
		$.ajax({
            url : '/api/test/',
            type : 'GET',
            dataType : 'json',
			async: false,
            success : function(data) {
				$(data).each(function(j,elem){
						$("<option value='"+elem.Animal_ID+"'> "+elem.Animal_ID+"  -  "+ elem.animalname +" </option>").appendTo("#search");
				});
            },
			error: function(response){
				console.log(response);
			}
        });
})