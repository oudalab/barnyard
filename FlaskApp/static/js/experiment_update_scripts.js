$(document).ready(function(){
	$.ajax({
		url : '/api/herd/create/',
		type : 'GET',
		dataType : 'json',
		async: false,
		success : function(data) {
			$(data).each(function(i,elem){
				elem.create_date = StringToDate(elem.create_date);
				var value = JSON.parse(elem.string);
				var attributes = "";
				$(value).each(function(i,elem){
					var string = elem.split("-");
					attributes += string[1];
					attributes += " ,";
				});
				elem.string = attributes.replace(/,\s*$/, "");
				
				var AIDs = JSON.parse(elem.AID_string);
				elem.AIDs = AIDs;
				var animalnames = "";
				$(AIDs).each(function(i,elem){
					$.ajax({
						url: '/api/animal/add/'+elem,
						data: $('form').serialize(),
						type: 'GET',
						async: false,
						success : function(response) {
							animalnames += response[0].animalname;
							animalnames += " ,";
							
						},
						error: function(response){
							console.log(response);
						}
					});	
				});
				var animalnameslist = animalnames.replace(/,\s*$/ , "");
				elem.animalname = animalnameslist;
			});
			tablecall(data);
		},
		error: function(response){
			console.log(response);
		}
	});
	function tablecall(data) {
		$('#table').bootstrapTable({
			filterControl: true,
			disableUnusedSelectOptions: true,
			singleSelect: true,
			data: data
		});
	};
});

$('#Edit').click(function() {
  var log= $('#table').bootstrapTable('getSelections');
  console.log(log);
  $("#name").val(log[0].name);
  $("#ExperimentEditModal").modal("show");
});
$('#Edit_Experiment_Yes').click(function() {
	var name= $('#name').val();
		setTimeout(function() {
		window.location.href = '/experiment/edit?herdname=' +name
	}, 2000); 
});

$('#Delete').click(function() {
  var log= $('#table').bootstrapTable('getSelections');
  $("#nameDelete").val(log[0].name);
  $("#ExperimentDeleteModal").modal("show");
});
$('#Delete_Yes').click(function() {
	var pasturenumber= $('#pasturenumberDelete').val();
	var date = $('#DateDelete').val();
	$('#Delete_Pasture').empty();
	$.ajax({
		url: '/api/inventory/pasturehistory/'+pasturenumber+'/'+date,
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

$('#Delete_No').click(function() {
	$('#Delete_Pasture').empty();
});

$('#button_Done').click(function() {
  setTimeout(location.reload(), 2000);
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
	