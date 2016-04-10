function load(){
	var type = window.sessionStorage.getItem("type");
	//alert(type);
	if(type=="1"){
		window.location.replace("http://localhost:8080/maven_Project/Admin.html");
	}
	else if(type=="2"){
		window.location.replace("http://localhost:8080/maven_Project/CustomerServiceRep.html");
	}else if(type=="3"){
		if(window.sessionStorage.getItem("greeting") == "true"){
			alert("Welcome back "+window.sessionStorage.getItem("UserName"));
			window.sessionStorage.setItem("greeting", "false");
		}
	}else if(type=="4"){
		window.location.replace("http://localhost:8080/maven_Project/NetworkManagementAccess.html");
	}else {
		window.location.replace("http://localhost:8080/maven_Project/");
	}
		
}

$(function() {
	
	function close_window(currentURL, newURL){
	    var newWindow = window.open(newURL, '_self', ''); //open the new window
	    window.close(currentURL); //close the current window
	}
	

	$('#SupportEngineer').on('click', function() {
		//alert(window.sessionStorage.getItem("lastname"));
		window.sessionStorage.setItem("SEoption", "1");
		window.location.replace("http://localhost:8080/maven_Project/SupportEngineer.html");
	});
	
	$('#CustomerServiceRep').on('click', function() {
		window.sessionStorage.setItem("SEoption", "2");
		window.location.replace("http://localhost:8080/maven_Project/CustomerServiceRep.html");
	});
	
	$('#logout').on('click', function() {
		window.sessionStorage.setItem("UserName", "");
		window.sessionStorage.setItem("type", "0");
		window.sessionStorage.setItem("SEoption", "0");
		window.location.replace("http://localhost:8080/maven_Project/");
	});
	
});