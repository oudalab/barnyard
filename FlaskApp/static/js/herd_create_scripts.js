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
	var selected = "";
	$('select#search_to option').each(function(i,pageelement){
		selected += pageelement.value;
		selected += ",";
	});
	selected = selected.slice(0, -1);
	alert(selected);
	var herdname = $('#herdname').val();
	var herddescription = $('#herddescription').val();
	data={
		selected : selected,
		herdname : herdname,
		herddescription : herddescription
	}
	console.log(data);
	console.log(data);
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