function SEload(){
	var type = window.sessionStorage.getItem("type");
	var option = window.sessionStorage.getItem("SEoption");
	//alert(type +" "+option);
	
	if(type=="3" && option=="0"){
		window.location.replace("http://localhost:8080/maven_Project/SupportEngineerAccess.html");
	}else if(type=="3"){
		
	}else if(type=="1"){
		window.location.replace("http://localhost:8080/maven_Project/Admin.html");
	}else if(type=="2"){
		window.location.replace("http://localhost:8080/maven_Project/CustomerServiceRep.html");
	}else if(type=="4" && option=="4"){
		
	}else if(type=="4"){
		window.location.replace("http://localhost:8080/maven_Project/NetworkManagementAccess.html");
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
		window.sessionStorage.setItem("SEoption","0");
		window.sessionStorage.setItem("type","0");
		window.sessionStorage.setItem("UserName", "");
		window.location.replace("http://localhost:8080/maven_Project/");
	});
	
	$('#suppSub1').on('click', function() {
		//alert("hi");
		var no = 1;
		var my_arr = [];
		my_arr.push($("#mySTime").val());
		my_arr.push($("#myETime").val());
		if($("#myETime").val()=="" || $("#myETime").val()=="")
			alert("Please Check input & try again");
		else{
			var jsonString = JSON.stringify(my_arr);
			//alert(jsonString);
	
			$("#myIMSI tr:gt(0)").remove();
			$.ajax({
				async : false,
				type : 'POST',
				url : 'rest/supportEngineer/findIMSIandFailurebyTime/',
				contentType : "application/json",
				data : jsonString,
				success : function(data) {
					//alert(data);
					
					
					$.each(data, function(i, basedatas) {
						if(basedatas=="")
							alert("Entered data doesn't exist in DataBase \nPlease check input & try again.");
						else{
							$.each(basedatas, function(i, basedata) {
								//alert(basedata.imsi);
								//var row = $("<tr><td>" + basedata + "</td></tr>");
								var row = $("<tr><td class='active'>"+ +no+"</td><td class='info'>"+basedata+"</td></tr>");
								$("#myIMSI").append(row);
								no+=1;
							})
							document.getElementById("myIMSI").style.visibility = "visible";
						}
							
					})
				},
				error : function() {
					alert('ERROR \nPlease check input & try again.');
				}
			})
		}
	});

	$('#suppSub2').on('click', function() {
		//alert("hi");
		var my_arr = [];
		my_arr.push($("#FstartTime").val());
		my_arr.push($("#FendTime").val());
		my_arr.push($("#FmyModel").val());
		var jsonString = JSON.stringify(my_arr);
		//alert(jsonString);

		$("#myFailureCount tr:gt(0)").remove();
		$.ajax({
			async : false,
			type : 'POST',
			url : 'rest/supportEngineer/findNoOfFailuresByPeriodAndModel/',
			contentType : "application/json",
			data : jsonString,
			success : function(data) {
				if(data=="0"){
					alert("Entered data doesn't exist in DataBase \nPlease check input & try again.");
				}
				else{
					document.getElementById("myFailureCount").style.visibility = "visible";
					var row = $("<tr><td>" + data + "</td></tr>");
					$("#myFailureCount").append(row);
				}
			},
			error : function() {
				alert('ERROR \nPlease check input & try again.');
			}
		})
	});

	$('#suppSub3').on('click', function() {
		var value = ($("#FmyFailID").val());
		var no = 1;
		$("#myIMSIDisplay tr:gt(0)").remove();
		$.ajax({
			async : false,
			type : 'POST',
			url : 'rest/supportEngineer/findIMSIbyFailureId/',
			contentType : "application/json",
			data : value,
			success : function(data) {
				if(data === undefined){
					document.getElementById("myIMSIDisplay").style.visibility = "hidden";
					alert("Entered data doesn't exist in DataBase \nPlease check input & try again.");
				}
				else{
					$.each(data, function(i, string) {
						if(string === undefined || data === undefined)
							document.getElementById("myIMSIDisplay").style.visibility = "hidden";
						else{
							document.getElementById("myIMSIDisplay").style.visibility = "visible";
							//var row = $("<tr><td>" + string + "</td></tr>");
							var row = $("<tr><td class='active'>"+ +no+"</td><td class='info'>"+string+"</td></tr>");
							$("#myIMSIDisplay").append(row);
							no+=1;
						}
					})
				}
				
			},
			error : function() {
				alert('ERROR\nPlease check the INPUT & try again...');
			}
		})
	});

	$('#semenu1').on('click', function() {
		document.getElementById("mySTime").value = "";
		document.getElementById("myETime").value = "";
		$("#myIMSI tr:gt(0)").remove();
		document.getElementById("myIMSI").style.visibility = "hidden";
	});
	$('#semenu2').on('click', function() {
		document.getElementById("FmyModel").value = "";
		document.getElementById("FstartTime").value = "";
		document.getElementById("FendTime").value = "";
		$("#myFailureCount tr:gt(0)").remove();
		document.getElementById("myFailureCount").style.visibility = "hidden";
	});
	$('#semenu3').on('click', function() {
		document.getElementById("FmyFailID").value = "";
		$("#myIMSIDisplay tr:gt(0)").remove();
		document.getElementById("myIMSIDisplay").style.visibility = "hidden";
	});
	
	$('#back').on('click', function(){
		var option = window.sessionStorage.getItem("SEoption");
		if(option < 4)
			window.location.replace("http://localhost:8080/maven_Project/SupportEngineerAccess.html");
		else
			window.location.replace("http://localhost:8080/maven_Project/NetworkManagementAccess.html");
	});
});