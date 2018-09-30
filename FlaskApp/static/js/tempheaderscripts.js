<<<<<<< HEAD
function getQueryVariable(variable)
	{
	   var query = window.location.search.substring(1);
	   var vars = query.split("&");
	   for (var i=0;i<vars.length;i++) {
			   var pair = vars[i].split("=");
			   if(pair[0] == variable){return pair[1];}
	   }
	   return false;
	};	
	
	function StringToDate(string)
	{
		var dateString = string;
		var dateObj = new Date(dateString);
		var momentObj = moment(dateObj);
		var momentString = momentObj.format('YYYY-MM-DD'); // 2016-07-15
		return momentString;
	};
=======
function getQueryVariable(variable)
{
   var query = window.location.search.substring(1);
   var vars = query.split("&");
   for (var i=0;i<vars.length;i++) {
		   var pair = vars[i].split("=");
		   if(pair[0] == variable){return pair[1];}
   }
   return false;
};

function alertbox(txt) {
	var r = confirm(txt);
	return r;
}
function promptbox(txt) {
    var txt;
    var person = prompt(txt);
    if (person == null || person == "") {
        txt = "User cancelled the prompt.";
    } else {
        txt = "Hello " + person + "! How are you today?";
    }
    document.getElementById("demo").innerHTML = txt;
}

function StringToDate(string)
{

	if (string==null){return null;}
	else{
		var date = moment.utc(string).format('YYYY-MM-DD');
		// var dateString = string;
		// var dateObj = new Date(dateString);
		// var curr_date = dateObj.getDate() + 1; //Converting GMT to CDT causes datebacking so +1
		// var curr_month = dateObj.getMonth() + 1; //Months are zero based
		// var curr_year = dateObj.getFullYear();
		// var date = curr_year + "-" + curr_month + "-" + curr_date
	return date;
	}
};

function SubmitStringToDate(string)
{
	if (string==null){return null;}
	else{
		var date = moment.utc(string).format('YYYY-MM-DD');
		// var dateString = string;
		// var dateObj = new Date(dateString);
		// var curr_date = dateObj.getDate(); //Converted already from GMT to CDT to just need to change the format
		// var curr_month = dateObj.getMonth() + 1; //Months are zero based
		// var curr_year = dateObj.getFullYear();
		// var date = curr_year + "-" + curr_month + "-" + curr_date
		return date;
	}
};
>>>>>>> b9eac74a4a97d951d847caa48459460f6feb848b
