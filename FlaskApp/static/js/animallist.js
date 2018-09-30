$(document).ready(function () {
	$.ajax({
		url : '/api/test/',
		type : 'GET',
		dataType : 'json',
		async: false,
		success : function(data) {
			console.log(data);
			tablecall(data);
		},
		error: function(response){
			console.log(response);
		}
	});
})

function tablecall(data) {
    $('#table').bootstrapTable({
		filterControl: true,
		disableUnusedSelectOptions: true,
		singleSelect: true,
        data: data
    });
};

$(function () {
	var $table = $('#table');
	$('#toolbar').find('select').change(function () {
    $table.bootstrapTable('refreshOptions', {
      exportDataType: $(this).val()
    });
  });
});


$('#Edit').click(function() {
  var log= $('#table').bootstrapTable('getSelections');
  console.log(log);
  alert("Selected Animal is : " + log[0].animalname);
  $('#Animal_Data').val(log[0].animalname);
  $("#AnimalEditModal").modal("show");
});
$('#Animal_Add_Modal_Yes').click(function() {
	var animalname= $('#Animal_Data').val()
	setTimeout(function() {
		window.location.href = '/animal/update?animalname=' + animalname
	}, 2000); 
});

$('#Delete').click(function() {
  var log= $('#table').bootstrapTable('getSelections');
  console.log(log);
  $('#Delete_Animal').append(log[0].animalname);
  $("#AnimalDeleteModal").modal("show");
});
$('#Delete_Yes').click(function() {
	var animalname= $('#Delete_Animal')[0].textContent;
	var number = animalname.replace(/['"]+/g, '')
	alert(number);
	$.ajax({
		url: '/api/animal/update/'+animalname,
		type : 'DELETE',
		async: false,
		success : function(data) {
			location.reload();
			$.notify("Animal Data Deleted.")
		},
		error: function(response){
			$.notify("Not Deleted. Please contact IT")
		}
	});
});
