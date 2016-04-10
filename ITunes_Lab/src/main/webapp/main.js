var User = function(id, username, password, usertype) {
		    this.id = id;
		    this.username = username;
		    this.password = password;
		    this.usertype = usertype;
		    }



$(function (){
	
	var $print = $('#print');
	var $users = $('#users');
	var $id = $('#Id');
	var $username = $('#UserName');
	var $password = $('#Password');
	var $usertype = $('#UserType');
	var $loginusername = $('#LoginUserName');
	var $loginpassword = $('#LoginPassword');
	var $basedatas = $('#basedatas');
	var $logout = $('logout');
	var $logout1 = $('logout1');
	var $logout2 = $('logout2');
	
	function close_window(currentURL, newURL){
	    var newWindow = window.open(newURL, '_self', ''); //open the new window
	    window.close(url); //close the current window
	 }
	
	function addUser(user) {
		var row = $("<tr><td>" + user.id
				+ "</td><td>" + user.username 
				+ "</td><td>" + user.password 
				+ "</td><td>" + user.usertype			
				+"</td></tr>");
        $("#userData").append(row);        
	}
	function addmyDataIMSI(newUser) {
		alert(newUser[1].imsi);    
		/*$.each(newUser, function(i, basedatas){
        $.each(basedatas, function(i,basedatas){
			var row = $("</td><td>" + basedatas.imsi
					+ "</td><td>" + basedatas.failure.failureId
					+"</td></tr>");
            $("#myDataIMSI").append(row);
		})
		})*/
		for(var i =0;i < newUser.length-1;i++)
		{
		  var item = newUser[i];
		  alert(item.imsi);
		}
		alert(newUser);  
	}
        
	
	
	$.ajax({
	async:false,
	type: 'GET',
	url: 'rest/basedata/getAllBaseData',
	success: function(data){

		$.each(data, function(i, basedatas){
			
			$.each(basedatas, function(i,basedata){
				var row = $("<tr><td>" + basedata.dataId
						+ "</td><td>" + basedata.dateTime 
						+ "</td><td>" + basedata.eventCause.eventId 
						+ "</td><td>" + basedata.failure.failureId
						+ "</td><td>" + basedata.userEquipment.userEquipmentId
						+ "</td><td>" + basedata.operator.mcc
						+ "</td><td>" + basedata.operator.mnc
						+ "</td><td>" + basedata.cellId
						+ "</td><td>" + basedata.duration
						+ "</td><td>" + basedata.eventCause.causeCode
						+ "</td><td>" + basedata.neVersion
						+ "</td><td>" + basedata.imsi
						+ "</td><td>" + basedata.hier3Id
						+ "</td><td>" + basedata.hier32Id
						+ "</td><td>" + basedata.hier321Id
						+"</td></tr>");
                $("#myData").append(row);
			})
	})
	},
	
	error: function(){
		alert('error loading users');
	}
	
});
	

	
	$.ajax({
		async:false,
		type: 'GET',
		url: 'rest/users',
		success: function(data){
			$.each(data, function(i, users){
				
					$.each(users, function(i,user){
						addUser(user);
					})
			})
		},
		
		error: function(){
			alert('error loading users');
		}
		
	});
	
	
	$('#add-user').on('click', function(){	
		
		var user = new User ($id.val(), $username.val(), $password.val(),$usertype.val());		
		
		$.ajax({
			type: 'POST',
			url: 'rest/users',
			contentType: "application/json",
			data: JSON.stringify(user),
			success: function(newUser){
				addUser(user);
			},
			error: function(){
				alert('error saving user');
			}
		})
	});
	
$('#submitTIME').on('click', function(){	
		
		//var user = new User ($id.val(), $username.val(), $password.val(),$usertype.val());	
	
	     var my_arr = new Array(startTime, endTime);
         var jsonString = JSON.stringify(my_arr)
         $.ajax({
        	async:false, 
 			type: 'GET',
 			url: 'rest/users',
 			contentType: "application/json",
 			data: jsonString,
 			success: function(data){
 				 $.each(data, function(index,item) {
                     var label = item.label;
                     var value = item.value;
                     $('#results').append('<p>' + label + '</p>' + '<p>' + value + '</p>');
                 });
 	        
 			},
 			error: function(){
 				alert('error');
 			}
 		})
 	});

//User Story 4 CS
$('#submitIMSI').on('click', function(){	

     var jsonString = JSON.stringify($("#myIMSI").val());
    // alert(jsonString);
  
     $("#myEventID tr:gt(0)").remove();
     $.ajax({
    	async:false, 
			type: 'POST',
			url: 'rest/customer/findEventandCausecodeByIMSI/',
			contentType: "application/json",
			data: jsonString,
			success: function(data){
				//alert(data.length);
				
				
				$.each(data, function(i, basedatas){
					
					$.each(basedatas, function(i,basedata){
						var row = $("<tr><td>"  + basedata.causeCode
								+"</td><td>" + basedata.eventId
								+"</td></tr>");
								
		                $("#myEventID").append(row);
					})
			})
				
			
	        
			},
			error: function(){
				alert('error');
			}
		})
	});


//user story 5 CS
$('#submitFailureCount').on('click', function(){	

	var my_arr = [];
	my_arr.push($("#x").val());
	my_arr.push($("#y").val());
	my_arr.push($("#FmyIMSI").val());
    var jsonString = JSON.stringify(my_arr);
    // alert(jsonString);
    $("#myFailureCount tr:gt(0)").remove();
    
     $.ajax({
    	async:false, 
			type: 'POST',
			url: 'rest/customer/findFailurebyTimeandIMSI/',
			contentType: "application/json",
			data: jsonString,
			success: function(data){
			//	alert(data);
				// $("#myFailureCount").append(data);
				var row = $("<tr><td>"  + data +"</td></tr>");
			
				 $("#myFailureCount").append(row);
			},
			error: function(){
				alert('error');
			}
		})
	});

//user story 12 NM
$('#submitTopTen').on('click', function(){	

	var my_arr = [];
	my_arr.push($("#TopTenStart").val());
	my_arr.push($("#TopTenEnd").val());
    var jsonString = JSON.stringify(my_arr);
 
    $("#myIMSICountTable tr:gt(0)").remove();
    $.ajax({
   	async:false, 
			type: 'POST',
			url: 'rest/NetworkManagementEngineer/findTop10IMSI/',
			contentType: "application/json",
			data: jsonString,
			
				success: function(data){
					for(i =0; i<data.length; i++){
				     
						var row = $("<tr><td>" + data[i][0]
						         +"</td><td>" + data[i][1]
								+"</td></tr>");
						
		                $("#myIMSICountTable").append(row);
		                
					}					
					},
			
			error: function(){
				alert('error');
			}
		})
	});











		
	
	
	$('#load-excel-user').on('click', function(){
			
			$.ajax({
				
				url: 'rest/users/excel',
//				success: function(){	
//					alert('success');
//				},
//				error: function(){
//					alert('error saving user');
//				}
			})
		});


	$('#login').on('click', function(){
			
		$.ajax({
			type: 'POST',
			url: 'rest/users/login',
			contentType: "application/json",
			data: JSON.stringify({username: $loginusername.val(), password: $loginpassword.val()}),
			success: function(data){	
					if(data){
						
						$print.text('');
						
						var currentURL = "http://localhost:8080/maven_Project/login.html";
						var newURL = "http://localhost:8080/maven_Project/selectusertype.html";
						
						close_window(currentURL, newURL);
					}
					else
						$print.text('User Does Not Exist!!!');	
			}
		})
	});

	$('#admin').on('click', function(){
		
		$.ajax({
			type: 'POST',
			url: 'rest/users/selecttype',
			contentType: "application/json",
			data: "admin",
			success: function(data){
				
					if(data){
						
						var currentURL = "http://localhost:8080/maven_Project/selectusertype.html";
						var newURL = "http://localhost:8080/maven_Project/try1.html";
						
						close_window(currentURL, newURL);
						
					}
					else
						alert('wrong');			
			}
		})
	});
	
	
	$('#user').on('click', function(){

				var currentURL = "http://localhost:8080/maven_Project/selectusertype.html";
				var newURL = "http://localhost:8080/maven_Project/try3.html";
//				var newURL ="http://localhost:8080/maven_Project/rest/basedata/getAll"
				
				close_window(currentURL, newURL);
		
	});
	
	$('#Imsi').on('click', function(){

		var currentURL = "http://localhost:8080/maven_Project/selectusertype.html";
		var newURL = "http://localhost:8080/maven_Project/IMSI.html";
//		var newURL ="http://localhost:8080/maven_Project/rest/basedata/getAll"
		
		close_window(currentURL, newURL);

});
	
	
	$('#logout').on('click', function(){

		var currentURL = "http://localhost:8080/maven_Project/selectusertype.html";
		var newURL = "http://localhost:8080/maven_Project/";
//		var newURL ="http://localhost:8080/maven_Project/rest/basedata/getAll"
		
		close_window(currentURL, newURL);

});
	$('#logout1').on('click', function(){

		var currentURL = "http://localhost:8080/maven_Project/try1.html";
		var newURL = "http://localhost:8080/maven_Project/";
//		var newURL ="http://localhost:8080/maven_Project/rest/basedata/getAll"
		
		close_window(currentURL, newURL);

});
	$('#logout2').on('click', function(){

		var currentURL = "http://localhost:8080/maven_Project/try3.html";
		var newURL = "http://localhost:8080/maven_Project/";
//		var newURL ="http://localhost:8080/maven_Project/rest/basedata/getAll"
		
		close_window(currentURL, newURL);

});
});
