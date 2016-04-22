var User = function(username, password) {
		    this.username = username;
		    this.password = password;
}


$(function() {

	$('#login').on('click',function() {
				var $loginusername = $('#inputEmail');
				var $loginpassword = $('#inputPassword');

				if ($loginusername.val() == "" && $loginpassword.val() == "") {
					alert("Please enter user name and password to login");
				} else if ($loginusername.val() == "") {
					alert("Please enter your user name!");
					$loginusername.focus();
				}else if ($loginpassword.val() == "") {
					alert("Please enter your password!");
					$loginpassword.focus();
				}else{
					username = $loginusername.val();
					password = $loginpassword.val();
					$.ajax({
						type : 'GET',
						url : 'rest/user/login/'+username+"/"+password,
						contentType : "application/json",
//						data : JSON.stringify({
//							username : $loginusername.val(),
//							password : $loginpassword.val()
//						}),
						success : function(data) {
							if(data){
								window.sessionStorage.setItem("UserName", $loginusername.val());
								window.sessionStorage.setItem("greeting", "true");
								window.location.replace("http://"+document.location.host+"/ITunes_Lab/ITunes.html");
							
							}else{
								alert("Invalid User. \nPlease check username & Try again.")
								$('#inputEmail').focus();
							}
								
						},
						error: function(){
							window.alert('error loading users');
						}
					})
				}
			});
	
	$('#register1').on(	'click',function() {
		var $username = $('#inputEmail1').val();
		var $password = $('#inputPassword1').val();
		if ($username == "" && $password == "") {
			alert("Please enter user name and password to login");
		} else if ($username == "") {
			alert("Please enter your user name!");
		}else if ($password == "") {
			alert("Please enter your password!");
		}else{
			
			$.ajax({
				type: 'GET',
				url : 'rest/user/checkUserExistence/'+$username,
				contentType: "application/json",
//				data: $username,
				success: function(data){
					console.log(data);
					if(data){
						var user = new User ($username, $password);		
					    var jsonString = JSON.stringify(user);
					    $.ajax({
							type : 'PUT',
							url : 'rest/user/register/'+$username+"/"+$password,
							contentType : "application/json",
//							data : jsonString,
							success : function(newUser) {
								window.alert("user has been successfully created. \nPlease login...");
								window.location.replace("http://localhost:8080/ITunes_Lab");
							},
							error: function(){
								alert('ERROR saving user.\nPlease Check input & try agin');
							}
					    })
					}
					else{
						window.alert("The Entered username has been taken! \nPlease try " +
						"with a different username.");
						$('#inputEmail1').focus();
					}
				},
				error: function(){
					window.alert('error loading users');
				}
			})
		}
	});
	
	$('#register').on('click',function() {
		document.getElementById('login1').style.display="none";
		document.getElementById('login2').style.display="block";
		
	});
});