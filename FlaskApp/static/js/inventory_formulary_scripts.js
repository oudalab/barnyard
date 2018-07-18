$(document).ready(function () {
	$.ajax({
		url : '/api/inventory/formulary/',
		type : 'GET',
		dataType : 'json',
		async: false,
		success : function(data) {
			console.log(data);
			$(data).each(function(i,elem){
				elem.date = StringToDate(elem.date);
				elem.expirydate = StringToDate(elem.expirydate);
				elem.purchasedate = StringToDate(elem.purchasedate);
			})
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

$('#submit_button_pharma').click(function() {
	var json = {
		date : $('#adddate').val(),
		drug : $('#adddrug').val(),
		email_id:"test",
		vial_size : $('#addvialsize').val(),
		Lot_no : $('#addlotno').val(),
		expirydate : $('#addexpdate').val(),
		location : $('#addlocation').val(),
		roa : $('#addroa').val(),
		purchasedate : $('#addpurchasedate').val(),
		total_quantity : $('#addquantity').val(),
		qty_in_stock:$('#addquantity').val()
	}
	var myJSON = JSON.stringify(json);
	$.ajax({
		url: '/api/inventory/formulary/',
		data: myJSON,
		datatype: 'json',
		type: 'POST',
		success: function(response) {
			console.log(response);
			$.notify("Data Saved", "info");
		},
		error: function(error) {
			console.log(error)
			$.notify("Data not saved", "danger");
		}
	});

	// setTimeout(location.reload(), 2000);
});

$('#edit').click(function() {
  var log= $('#table').bootstrapTable('getSelections');
  console.log(log);
  $("#date").val(log[0].date);
  $("#drug").val(log[0].drug);
  $("#lotno").val(log[0].Lot_no);
  $("#vialsize").val(log[0].vial_size);
  $("#expdate").val(log[0].expirydate);
  $("#location").val(log[0].location);
  $("#roa").val(log[0].roa);
  $("#purchasedate").val(log[0].purchasedate);
  $("#quantity").val(log[0].total_quantity);
  $("#FormularyEditModal").modal("show");
  console.log(log);
  console.log(log);
});
$('#Edit_Pasture_Modal_Yes').click(function() {
	var json = {
		date : $("#date").val(),
		drug : $("#drug").val(),
		email_ID : "test",
		Lot_no : $("#lotno").val(),
		vial_size : $("#vialsize").val(),
		expirydate : $("#expdate").val(),
		location : $("#location").val(),
		roa : $("#roa").val(),
		purchasedate : $("#purchasedate").val(),
		total_quantity : $("#quantity").val(),
		qty_in_stock : $("#total_quantity").val(),
	}
	var myJSON = JSON.stringify(json);
	$.ajax({
		url: '/api/inventory/formulary/',
		data: myJSON,
		datatype: 'json',
		type: 'PATCH',
		success: function(response) {
			console.log(response);
			alert("Data Saved");
			$.notify("Data Saved", "info");
		},
		error: function(error) {
			console.log(error)
			$.notify("Data not saved", "danger");
		}
	});
	setTimeout(location.reload(), 2000);
});

$('#Delete').click(function() {
  var log= $('#table').bootstrapTable('getSelections');
  $('#pasturenumberDelete').val(log[0].drug);
  $('#DateDelete').val(log[0].date);
  $("#FormularyDeleteModal").modal("show");
});
$('#Delete_Yes').click(function() {
	var pasturenumber= $('#pasturenumberDelete').val();
	var date = $('#DateDelete').val();
	$('#Delete_Pasture').empty();
	$.ajax({
		url: '/api/inventory/formulary/'+pasturenumber+'/'+date,
		type : 'DELETE',
		async: false,
		success : function(data) {
			alert("Event data Deleted");
			setTimeout(location.reload(), 2000);
			$.notify("Event Data Deleted.");
		},
		error: function(response){
			$.notify("Not Deleted. Please contact IT");
		}
	});
});