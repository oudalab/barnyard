// Using the DataTables Plugin for displaying the data in the tabular format

$(document).ready(function () {
		$.ajax({
            url : '/api/test/',
            type : 'GET',
            dataType : 'json',
			async: false,
            success : function(data) {
				console.log(data);
                testdata(data);
            }
        });
        function testdata(data) {
            var table = $('#test_table').dataTable({
                "bAutoWidth" : false,
                data : data,
				//order: [ 1, 'desc' ],
                "columns" : [ {
                    "data" : "Animal_ID"
                }, {
                    "data" : "eartag"
                }, {
                    "data" : "eid"
                }, {
                    "data" : "sex"
                }, {
                    "data" : "pasture_ID"
                }, {
                    "data" : "breed"
                }, {
                    "data" : "status"
                }, {
                    "data" : "current_expt_no"
                }, {
                    "data" : "Herd"
                }, {
                    "data" : "animaltype"
                }, {
                    "data" : "animalname"
                }, {
                    "data" : "breeder"
                }, {
                    "data" : "currentframescore"
                }, {
                    "data" : "damframescore"
                }, {
                    "data" : "comments"
                }, {
                    "data" : "species"
                }, {
                    "data" : "height"
                }, {
                    "data" : "weight"
                }, {
                    "data" : "gender"
                }, {
                    "data" : "email_id"
                } , {
                    "data" : "brand"
                }
				, {
                    "data" : "brandlocation"
                }
				, {
                    "data" : "tattooleft"
                }
				, {
                    "data" : "tattooright"
                }
				, {
                    "data" : "alternativeid"
                }
				, {
                    "data" : "registration"
                }
				, {
                    "data" : "color"
                }
				, {
                    "data" : "hornstatus"
                }
				, {
                    "data" : "dam"
                }
				, {                                               
                    "data" : "sire"
                }
				, {
                    "data" : "DOB"
                }
				, {
                    "data" : "howacquired"
                }
				, {
                    "data" : "dateacquired"
                }
				, {
                    "data" : "howdisposed"
                }
				, {
                    "data" : "datedisposed"
                }
				, {
                    "data" : "disposalreason"
                }
				, {
                    "data" : "herdnumberlocation"
                }
				, {
                    "data" : "herdstatus"
                }
				, {
                    "data" : "howconceived"
                }
				, {
                    "data" : "managementcode"
                }
				, {
                    "data" : "ownerID"
                }
				, {
                    "data" : "springfall"
                } ,{
					"data": "includeinlookups"
				}
				]
            });
        }	
	});