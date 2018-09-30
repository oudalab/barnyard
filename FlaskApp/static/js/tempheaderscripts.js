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