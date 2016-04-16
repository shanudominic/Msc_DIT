/**
 * @author D14129136
 */

var userName;
var password1;

var userName2;
var password2;

var name1;
var name2;
var email1;
var date;
var month;
var year;
var gender;
var houseNo;
var address1;
var address2;
var city;
var zip;
var count;
 
/**
 * this function is used to delete a cookie by setting the expiry date to 01/01/1970
 */
 function deleteCookie(){
	 document.cookie = userName.value + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
	 window.alert("Successfully deleted your profile");
	 load();
 }
 
 /**
  * this function gets values from the login forms, login name and password
  * and assigns them to the global variable to be used later.
  */
 function getLoginValues(){
	userName = document.login_info.loginuserName_text;
	password1 = document.login_info.loginpassword_text;
 }
 
 /**
  * this function checks whether the user can login successfully or not .
  * if logged in successfully, disable certain buttons and write back to the cookie by updating the user visited value.
  */
 function checkUser2(){
	 getLoginValues();
	 if(validateUserName(userName) && validatePassword(password1)){
		 if(checkUser1(userName)){
			 readCookie1(userName);
			 
			 if(password2==password1.value){
				 updateCookieCount();
				 window.alert("Welcome back, "+name1+" "+name2);
				 document.getElementById("Login").disabled = true;
				 document.getElementById("Register").disabled = true;
				 document.getElementById("loginuserName_text").disabled = true;
				 document.getElementById("loginpassword_text").disabled = true;
				 document.getElementById("userName_text").disabled = true;
				 writeDataBack();
				 document.getElementById('done').value = 'Update';
				 document.getElementById('delete').style.display = 'inherit'
				 document.getElementById('register').style.display = 'block';
				 document.getElementById('footer').innerHTML = 'User: '+userName2+", has visited this page "+(count+1)+" times.";
				 document.getElementById('footer1').style.visibility = 'visible';

			 }else{
				 window.alert("Incorrect password. \nPlease try again");
				 password1.focus();
			 }
		 }
		 else{
			window.alert("ERROR --> invalid username \nUserName doesn't exist \nPlease try again");
		 }
		
	 }
	 
 }
 
 /**
  * this function is used to update the users page visitor count upon successful login.
  */
 function updateCookieCount(){
	var now = new Date();
	now.setMonth( now.getMonth() + 1 );
	
	var user = new cunstructor();
	user.username = userName2;
	user.password1 = password2;
	user.firstName = name1;
	user.lastName = name2;
	user.email1 = email1;
	user.dobDate = date;
	user.dobMonth = month;
	user.dobYear = year;
	user.gender = gender;
	user.houseNo = houseNo;
	user.address1 = address1;
	user.address2 = address2;
	user.city = city;
	user.zip = zip;
	user.counter = count+1;
	
	var jsonString = encodeURI(JSON.stringify(user));
	document.cookie = userName.value + "=" + jsonString+";"+"expires="+now.toUTCString()+";"; 

}
 /**
  * this function is used to write the data back onto the corresponding input fields from the users cookie
  * upon successful login.
  */
 function writeDataBack(){
	 document.getElementById("userName_text").value = userName.value;
	 document.getElementById("password_text").value = password2;
	 document.getElementById("name_text").value = name1;
	 document.getElementById("lastname_text").value = name2;
	 document.getElementById("email_text").value = email1;
	 document.getElementById("day_text").value = date;
	 document.getElementById("month_text").value = month;
	 document.getElementById("year_text").value = year;
	 document.getElementById("select_gender").value = gender;
	 document.getElementById("house_text").value = houseNo;
	 document.getElementById("addr1_text").value = address1;
	 document.getElementById("addr2_text").value = address2;
	 document.getElementById("city_text").value = city;
	 document.getElementById("zip_text").value = zip;
 }
 
 /**
  * this function checks to see if a cookie exists with the typed username.
  * @param input
  * @returns {Boolean}
  */
 function checkUser1(input){
	
	var user=getCookie1(input.value);
	if (user!=""){
		return true;
	}
	else {
		return false;
	}
}
 
 /**
  * this function is used to get a cookie by name.
  * @param cname
  * @returns
  */
 function getCookie1(cname){
	 var name = cname + "=";
     var ca = document.cookie.split(';');
     for(var i=0; i<ca.length; i++) {
         var c = ca[i].trim();
		 if (c.indexOf(name) == 0)
			 return c.substring(name.length,c.length);
	}
    return "";
}

 /**
  * this function is used to read the contents of the cookie by finding the cookie by name, parsing the data and decoding it.
  * @param cname
  */
function readCookie1(cname){
	var name = cname.value + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
		 
         var c = ca[i].trim();
		 if (c.indexOf(name) == 0){
			 var user = JSON.parse(decodeURI(c.split('=')[1]));
			 //alert(user.username);
				userName2 = user.username;
				password2 = user.password1;
				name1 = user.firstName;
				name2 = user.lastName;
				email1 = user.email1;
				date = user.dobDate;
				month = user.dobMonth;
				year = user.dobYear;
				gender = user.gender;
				houseNo = user.houseNo;
				address1 = user.address1;
				address2 = user.address2;
				city = user.city;
				zip = user.zip;	
				count = user.counter;
		 }
			 
	}
}
