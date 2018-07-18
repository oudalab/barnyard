$(document).ready(function () {
	$.ajax({
		url : '/api/test/',
		type : 'GET',
		dataType : 'json',
		async: false,
		success : function(data) {
			console.log(data);
			$(data).each(function(i,elem){
				elem.DOB = StringToDate(elem.DOB);
				elem.dateacquired = StringToDate(elem.dateacquired);
				elem.datedisposed = StringToDate(elem.datedisposed);
			});
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


$('#UploadCSV').click(function() {
  $("#UploadCSVModal").modal("show");
});
$('#Upload_Done').click(function() {
	location.reload();
});


$(function () {
    $("#upload").bind("click", function () {
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
        if (regex.test($("#fileUpload").val().toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                reader.onload = function (e) {
					var data=$.csv.toObjects(e.target.result);
					console.log(data);
					$(data).each(function(i, elem){
							var dataJson = JSON.stringify(elem);
							console.log(dataJson);
							$.ajax({
								url: '/api/animal/add/',
								data: dataJson,
								type: 'post',
								dataType: 'json',
								success: function(response) {
									console.log(response);
									$.notify("Data Saved", "info");
								},
								error: function(response) {
									console.log(response);
									$.notify("Data Not saved", "error");					
								}
							});
					});
					
                    var table = $("<table />");
                    var rows = e.target.result.split("\n");
                    for (var i = 0; i < rows.length; i++) {
                        var row = $("<tr />");
                        var cells = rows[i].split(",");
                        for (var j = 0; j < cells.length; j++) {
                            var cell = $("<td />");
                            cell.html(cells[j]);
                            row.append(cell);
                        }
                        table.append(row);
                    }
                    $("#dvCSV").html('');
                    $("#dvCSV").append(table);
                }
                reader.readAsText($("#fileUpload")[0].files[0]);
            } else {
                alert("This browser does not support HTML5.");
            }
        } else {
            alert("Please upload a valid CSV file.");
        }
    });
});