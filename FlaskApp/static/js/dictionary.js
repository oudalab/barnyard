var dictionary = {
		"pasturenumber" : {type: "drop", values:["1","2","3","4","5","6","7"], table:"master_animal"},
		"sex" : {type: "drop", values:["Steer","Heifer","Bull","Cow"], table:"master_animal"},
		"breed" : {type: "text", values:[""], table:"master_animal"},
		"height" : {type: "text", values:[""], table:"master_animal"},
		"weight" : {type: "text", values:[""], table:"master_animal"},
		"animaltype" : {type: "drop", values:["Cow","Steer","Heifer","Calf","Bull"], table:"master_animal"},
		"status" : {type: "drop", values:["Active","Inactive"], table:"master_animal"},
		"herd" : {type: "text", values:[""], table:"master_animal"},
		"trial" : {type: "text", values:[""], table:"master_animal"},
		"animalname" : {type: "text", values:[""],table:"master_animal"},
		"animalgroup" : {type: "text", values:[""],table:"master_animal"},
		"breeder" : {type: "text", values:[""],table:"master_animal"},
		"currentframescore" : {type: "text", values:[""],table:"master_animal"},
		"damframescore" : {type: "text", values:[""],table:"master_animal"},
		"comments" : {type: "text", values:[""],table:"master_animal"},
		"species" : {type: "text", values:[""],table:"master_animal"},
		"brand" : {type: "text", values:[""], table:"animal_inventory"},
		"brandlocation" : {type: "drop", values:["Left Hip","Right Hip"], table:"animal_inventory"},
		"tattooleft" : {type: "text", values:[""], table:"animal_inventory"},
		"tattooright" : {type: "text", values:[""], table:"animal_inventory"},
		"alternativeid" : {type: "text", values:[""], table:"animal_inventory"},
		"registration" : {type: "text", values:[""], table:"animal_inventory"},
		"herdnumberlocation" : {type: "text", values:[""], table:"animal_inventory"},
		"herdstatus" : {type: "text", values:[""], table:"animal_inventory"},
		"managementcode" : {type: "text", values:[""], table:"animal_inventory"},
		"howconceived" : {type: "text", values:[""], table:"animal_inventory"},
		"ownerID" : {type: "text", values:[""], table:"animal_inventory"},
		"springfall" : {type: "drop", values:["Spring","Fall"], table:"animal_inventory"},
		"includeinlookups" : {type: "drop", values:["Yes","No"], table:"animal_inventory"},
		"color" : {type: "text", values:[""], table:"animal_inventory"},
		"hornstatus" : {type: "drop", values:["Polled","Scurred","Horned","De-horned"], table:"animal_inventory"},
		"dam" : {type: "text", values:[""], table:"animal_inventory"},
		"sire" : {type: "text", values:[""], table:"animal_inventory"},
		"dob" : {type: "date", values:[""], table:"animal_inventory"},
		"howacquired" : {type: "drop", values:["Raised","Purchased","Leased"], table:"animal_inventory"},
		"dateacquired" : {type: "date", values:[""], table:"animal_inventory"},
		"howdisposed" : {type: "drop", values:["Sold","Died","Euthanized","Returned"], table:"animal_inventory"},
		"datedisposed" : {type: "date", values:[""], table:"animal_inventory"},
		"disposalreason" : {type: "text", values:[""], table:"animal_inventory"},
		"dam" : {type: "text", values:[""], table:"experiment"},
		"sire" : {type: "text", values:[""], table:"experiment"},
		"animaltype" : {type: "drop", values:["Cow","Steer","Heifer","Calf","Bull"], table:"experiment"},
		"sireframescore" : {type: "text", values:[""], table:"experiment"},
		"dobexperiment" : {type: "date", values:[""], table:"experiment"},
		"weanheight" : {type: "text", values:[""], table:"exeriment"},
		"weandate" : {type: "date", values:[""], table:"experiment"},
		"weanweight" : {type: "text", values:[""], table:"experiment"},
		"birthweight" : {type: "text", values:[""], table:"experiment"},
		"birthweightadj" : {type: "text", values:[""], table:"experiment"},
		"weangpd" : {type: "text", values:[""], table:"experiment"},
		"weanhipht" : {type: "text", values:[""], table:"experiment"},
		"weanwda" : {type: "text", values:[""], table:"experiment"},
		"weanweightdate" : {type: "text", values:[""], table:"experiment"},
		"conditionscoreweaning2015" : {type: "text", values:[""], table:"experiment"},
		"conditionscoreweaning2016" : {type: "text", values:[""], table:"experiment"},
		"currentwtcow" : {type: "text", values:[""], table:"experiment"},
		"currentwtheifer" : {type: "text", values:[""], table:"experiment"},
		"adj365dht" : {type: "text", values:[""], table:"experiment"},
		"bcsrecent" : {type: "text", values:[""], table:"experiment"},
		"bcsprevious" : {type: "text", values:[""], table:"experiment"},
		"bcsdifference" : {type: "text", values:[""], table:"experiment"},
		"damwtatwean" : {type: "text", values:[""], table:"experiment"},
		"yearlingheight" : {type: "text", values:[""], table:"experiment"},
		"adj205w" : {type: "text", values:[""], table:"experiment"},
		"adj205h" : {type: "text", values:[""], table:"experiment"},
		"weanframescore" : {type: "text", values:[""], table:"experiment"},
		"ageatwean" : {type: "text", values:[""], table:"experiment"},
		"yearlingweight" : {type: "text", values:[""], table:"experiment"},
		"yearlingdate" : {type: "date", values:[""], table:"experiment"},
		"customweight" : {type: "text", values:[""], table:"experiment"},
		"customheight" : {type: "text", values:[""], table:"experiment"},
		"customweightdate" : {type: "date", values:[""], table:"experiment"},
		"customheightdate" : {type: "date", values:[""], table:"experiment"},
		"blockpen" : {type: "text", values:[""], table:"experiment"},
		"adjyearlingw" : {type: "text", values:[""], table:"experiment"},
		"adjyearlingh" : {type: "text", values:[""], table:"experiment"},
		"yearlingframescore" : {type: "text", values:[""], table:"experiment"},
		"ageatyearling" : {type: "text", values:[""], table:"experiment"},
		"backfat" : {type: "text", values:[""], table:"experiment"},
		"replicate" : {type: "text", values:[""], table:"experiment"},
		"treatment" : {type: "drop", values:["Steer","Heifer","Bull","Cow"], table:"experiment"},
		"breeding" : {type: "drop", values:["Bull-1","Bull-2","Bull-3","Bull-4","Bull-5"], table:"reproduction"},
		"pregnancy" : {type: "drop", values:["Pregnant","open"], table:"reproduction"},
		"pasturenumberreproduction" : {type: "text", values:[""], table:"reproduction"},
		"siblingcode" : {type: "drop", values:["Single","Twin"], table:"reproduction"},
		"calfatside" : {type: "text", values:[""], table:"reproduction"},
		"totalcalves" : {type: "text", values:[""], table:"reproduction"},
		"previouscalf" : {type: "text", values:[""], table:"reproduction"},
		"damageatbirth" : {type: "text", values:[""], table:"reproduction"},
		"currentcalf" : {type: "text", values:[""], table:"reproduction"},
		"calfdob" : {type: "date", values:[""], table:"reproduction"},
		"calfsex" : {type: "drop", values:["Steer","Heifer","Bull","Cow"], table:"reproduction"},
		"calfbirthweight" : {type: "text", values:[""], table:"reproduction"},
		"damcalvingdisposition" : {type: "drop", values:["1","2","3","4","5"], table:"reproduction"},
		"calvingease" : {type: "drop", values:["1","2","3","4","5"], table:"reproduction"},
		"udderscore" : {type: "text", values:[""], table:"reproduction"},
		"conditionscorecalving" : {type:"text", values:[""], table:"reproduction"},
		"hiphtbreeding2016" : {type: "text", values:[""], table:"reproduction"},		
		"hiphtweaning2015" : {type: "text", values:[""], table:"reproduction"},
		"hiphtweaning2016" : {type: "text", values:[""], table:"reproduction"},
		"damdisposition" : {type: "drop", values:["1","2","3","4","5"], table:"reproduction"},
		"cowframescore" : {type: "text", values:[""], table:"reproduction"},
		"cowwtbreeding" : {type: "text", values:[""], table:"reproduction"},
		"cowhtbreeding" : {type: "text", values:[""], table:"reproduction"},
		"cowwtweaning" : {type: "text", values:[""], table:"reproduction"},
		"cowhtweaning" : {type: "text", values:[""], table:"reproduction"},
		"cowhtcalving" : {type: "text", values:[""], table:"reproduction"},
		"cowwtcalving" : {type: "text", values:[""], table:"reproduction"},
		"bcsweaning" : {type: "text", values:[""], table:"reproduction"},
		"bcsweaning" : {type: "text", values:[""], table:"reproduction"},
		"bcscalving" : {type: "text", values:[""], table:"reproduction"},
		"customcowwt" : {type: "text", values:[""], table:"reproduction"},
		"customcowht" : {type: "text", values:[""], table:"reproduction"},
		"bulldisposition" : {type: "drop", values:["1","2","3","4","5"], table:"reproduction"},
		"bullframescore" : {type: "text", values:[""], table:"reproduction"},
		"bullwtprebreeding" : {type: "text", values:[""], table:"reproduction"},
		"bullhtprebreeding" : {type: "text", values:[""], table:"reproduction"},
		"fertility" : {type: "text", values:[""], table:"reproduction"},
		"mobility" : {type: "text", values:[""], table:"reproduction"},
		"conc" : {type: "text", values:[""], table:"reproduction"},
		"deadabnormal" : {type: "text", values:[""], table:"reproduction"},
		"reasonforprocedure" : {type: "text", values:[""], table:"medical"},
		"notificationofvmo" : {type: "drop", values:["None","Site Visit","Email","Phone","Text"], table:"medical"},
		"recommendationofvmo" : {type: "text", values:[""], table:"medical"},
		"treatmentprotocol" : {type: "text", values:[""], table:"medical"},
		"animallocationpreresolution" : {type: "text", values:[""], table:"medical"},
		"followupexam" : {type: "text", values:[""], table:"medical"},
		"resolution" : {type: "text", values:[""], table:"medical"},
		"dateoffollowupexam" : {type: "date", values:[""], table:"medical"},
		"animallocation" : {type: "text", values:[""], table:"medical"},
		"dateofaction" : {type: "date", values:[""], table:"medical"},
		"pastureacres" : {type: "text", values:[""], table:"grazing"},
		"animalspresent" : {type: "text", values:[""], table:"grazing"},
		"datein" : {type: "date", values:[""], table:"grazing"},
		"dateout" : {type: "date", values:[""], table:"grazing"},
		"pasturenumbergrazing" : {type: "text", values:[""], table:"grazing"},
		"sample" : {type: "text", values:[""], table:"grazing"},
		"biomass" : {type: "text", values:[""], table:"grazing"},
		"DMavailable" : {type: "text", values:[""], table:"grazing"},
		"cp" : {type: "text", values:[""], table:"grazing"},
		"cp1" : {type: "text", values:[""], table:"grazing"},
		"cp2" : {type: "text", values:[""], table:"grazing"},
		"cp3" : {type: "text", values:[""], table:"grazing"},
		"cp4" : {type: "text", values:[""], table:"grazing"},
		"pasturenumberburning" : {type: "text", values:[""], table:"grazing"},
		"dateburned" : {type: "date", values:[""], table:"grazing"},
		"qualityofburn" : {type: "text", values:[""], table:"grazing"},
		"pasturenumberpesticide" : {type: "text", values:[""], table:"grazing"},
		"chemicalname" : {type: "text", values:[""], table:"grazing"},
		"applicationrate" : {type: "text", values:[""], table:"grazing"},
		"applicationdate" : {type: "date", values:[""], table:"grazing"},
		"stockingrate" : {type: "text", values:[""], table:"grazing"}
	};