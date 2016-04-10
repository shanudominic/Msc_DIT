function load(){
	var type = window.sessionStorage.getItem("type");
	var option = window.sessionStorage.getItem("SEoption");
	//alert(type +" "+option);
	
	 if(type=="1"){
		window.location.replace("http://localhost:8080/maven_Project/Admin.html");
	}else if(type=="2"){
		window.location.replace("http://localhost:8080/maven_Project/CustomerServiceRep.html");
	}else if(type=="3"){
		window.location.replace("http://localhost:8080/maven_Project/SupportEngineerAccess.html");
	}else if(type=="4"){
		
	}else{
		window.location.replace("http://localhost:8080/maven_Project/");
	}
}

$(function() {

	function close_window(currentURL, newURL){
	    var newWindow = window.open(newURL, '_self', ''); //open the new window
	    window.close(currentURL); //close the current window
	}
	$('#logout').on('click', function(){
		var currentURL = "http://localhost:8080/maven_Project/NetworkManagement.html";
		var newURL = "http://localhost:8080/maven_Project/";
		close_window(currentURL, newURL);
	});
	
	// user story 12 NM
	$('#submitTopTen').on('click',function() {

			var my_arr = [];
			my_arr.push($("#TopTenStart").val());
			my_arr.push($("#TopTenEnd").val());
			var jsonString = JSON.stringify(my_arr);

			$("#myIMSICountTable tr:gt(0)").remove();
			$.ajax({
					async : false,
					type : 'POST',
					url : 'rest/NetworkManagementEngineer/findTop10IMSI/',
					contentType : "application/json",
					data : jsonString,

					success : function(data) {
						if(data === undefined){
							alert("Entered data doesn't exist in DataBase \nPlease check input & try again.");
						}
						else{
								document.getElementById("myIMSICountTable").style.visibility = "visible";
								for (i = 0; i < data.length; i++) {
									var row = $("<tr><td>" + data[i][0]
												+ "</td><td>" + data[i][1]
												+ "</td></tr>");

									$("#myIMSICountTable").append(row);

								}
						}
					},
					error : function() {
						alert('ERROR \nPlease check input & try again.');
					}
			})
	});

	// userstory 9
	$('#submitNoOfFailureAndTotalDuration').on('click',function() {

			var my_arr = [];
			my_arr.push($("#NoOfFailureAndTotalDurationStart").val());
			my_arr.push($("#NoOfFailureAndTotalDurationEnd").val());
			var jsonString = JSON.stringify(my_arr);

			$("#myNoOfFailureAndTotalDurationTable tr:gt(0)").remove();
			$.ajax({
					async : false,
					type : 'POST',
					url : 'rest/NetworkManagementEngineer/getNoOfFailuresTotalDurationsForEachImsiByPeriod/',
					contentType : "application/json",
					data : jsonString,
					success : function(data) {
						if(data === undefined){
							alert("Entered data doesn't exist in DataBase \nPlease check input & try again.");
						}
						else {	
							document.getElementById("myNoOfFailureAndTotalDurationTable").style.visibility = "visible";
							for (i = 0; i < data.length; i++) {

								var row = $("<tr><td>" + data[i][0]
											+ "</td><td>" + data[i][1]
											+ "</td><td>" + data[i][2]
											+ "</td></tr>");

								$("#myNoOfFailureAndTotalDurationTable").append(row);

							}
						}
					},
					error : function() {
						alert('ERROR \nPlease check input & try again.');
					}
			})
	});

	// user stroy 10
	$('#submitModel').on('click',function() {

		var jsonString = JSON.stringify($("#myModel").val());

		$("#myModelTable tr:gt(0)").remove();
		$.ajax({
				async : false,
				type : 'POST',
				url : 'rest/NetworkManagementEngineer/findFailureCauseCodeAndOccurrences/',
				contentType : "application/json",
				data : jsonString,

				success : function(data) {
					document.getElementById("myModelTable").style.visibility = "visible";
					for (i = 0; i < data.length; i++) {
						var row = $("<tr><td>" + data[i][0]
									+ "</td><td>" + data[i][1]
									+ "</td><td>" + data[i][2]
									+ "</td><td>" + data[i][3]
									+ "</td></tr>");
						$("#myModelTable").append(row);
					}
				},
				error : function() {
						alert('error');
				}
		})
	});

	$('#submitMarket').on('click',function() {
		var my_arr = [];
		
		my_arr.push($("#StartMarketTime").val());
		my_arr.push($("#EndMarketTime").val());
		var jsonString = JSON.stringify(my_arr);

		$("#myMarketTable tr:gt(0)").remove();
		$.ajax({
			async : false,
			type : 'POST',
			url : 'rest/NetworkManagementEngineer/findTop10MarketOperatorCellCombo/',
			contentType : "application/json",
			data : jsonString,
			success : function(data) {
				if(data ==""){
					alert("Entered data doesn't exist in DataBase \nPlease check input & try again.");
				}
				else {	
					document.getElementById("myMarketTable").style.visibility = "visible";
					for (i = 0; i < data.length; i++) {
						var row = $("<tr><td>" + data[i][0]
									+ "</td><td>" + data[i][1]
									+ "</td><td>" + data[i][2]
									+ "</td></tr>");
						$("#myMarketTable").append(row);
					}
				}
			},
			error : function() {
				alert('ERROR \nPlease check input & try again.');
			}
		})
	});

	$('#datetimepicker6').datetimepicker({
		// useCurrent: false,
		locale : 'en-gb'// Important! See issue #1075
	});
	$('#datetimepicker7').datetimepicker({
		useCurrent : false,
		locale : 'en-gb'// Important! See issue #1075
	});
	$("#datetimepicker6").on("dp.change", function(e) {
		$('#datetimepicker7').data("DateTimePicker").minDate(e.date);
	});
	$("#datetimepicker7").on("dp.change", function(e) {
		$('#datetimepicker6').data("DateTimePicker").maxDate(e.date);
	});

	$('#datetimepicker16').datetimepicker({
		// useCurrent: false,
		locale : 'en-gb'// Important! See issue #1075
	});
	$('#datetimepicker17').datetimepicker({
		useCurrent : false,
		locale : 'en-gb'// Important! See issue #1075
	});
	$("#datetimepicker16").on("dp.change", function(e) {
		$('#datetimepicker17').data("DateTimePicker").minDate(e.date);
	});
	$("#datetimepicker17").on("dp.change", function(e) {
		$('#datetimepicker16').data("DateTimePicker").maxDate(e.date);
	});

	$('#datetimepicker26').datetimepicker({
		// useCurrent: false,
		locale : 'en-gb'// Important! See issue #1075
	});
	$('#datetimepicker27').datetimepicker({
		useCurrent : false,
		locale : 'en-gb'// Important! See issue #1075
	});
	$("#datetimepicker26").on("dp.change", function(e) {
		$('#datetimepicker27').data("DateTimePicker").minDate(e.date);
	});
	$("#datetimepicker27").on("dp.change", function(e) {
		$('#datetimepicker26').data("DateTimePicker").maxDate(e.date);
	});

	$('#semenu1').on('click',function() {
		$("#myNoOfFailureAndTotalDurationTable tr:gt(0)").remove();
		document.getElementById("myNoOfFailureAndTotalDurationTable").style.visibility = "hidden";
	});
	$('#semenu2').on('click',function() {
		$("#myIMSICountTable tr:gt(0)").remove();
		document.getElementById("myIMSICountTable").style.visibility = "hidden";
	});
	$('#semenu3').on('click', function() {
		$("#myModelTable tr:gt(0)").remove();
		document.getElementById("myModelTable").style.visibility = "hidden";
	});
	$('#semenu4').on('click', function() {
		$("#myMarketTable tr:gt(0)").remove();
		document.getElementById("myMarketTable").style.visibility = "hidden";
	});

	$('#logout').on('click', function(){
		window.sessionStorage.setItem("SEoption","0");
		window.sessionStorage.setItem("type","0");
		window.sessionStorage.setItem("UserName", "");
		window.location.replace("http://localhost:8080/maven_Project/");
	});
	
	$('#back').on('click', function(){
		window.location.replace("http://localhost:8080/maven_Project/NetworkManagementAccess.html");
	});
});