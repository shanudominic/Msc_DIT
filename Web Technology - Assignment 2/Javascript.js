/**
 * @author D14129136
 */

 var userName;
 var password1;
var name1;
var name2;
var email1;
var date;
var month;
var year;
var gender;
var houseNo;
var address1;
var city;
var zip;

/**
*	this function is used to hide page elements upon page load
* 	such that a user will only see them when required
*/
function load(){
	document.getElementById("Login").disabled = false;
	document.getElementById("Register").disabled = false;
	document.getElementById("loginuserName_text").disabled = false;
	document.getElementById("loginpassword_text").disabled = false;
	document.getElementById("userName_text").disabled = false;
	document.getElementById('register').style.display = 'none';
	document.getElementById('clear1').style.display = 'none';
	document.getElementById('clear').click();
	document.getElementById('clear1').click();
	document.getElementById('footer1').style.visibility = 'hidden';
}

/**
 * This function is used to get values from input box (HTML)
 * and store them to a global array, such that they can be used
 * later to do validation and create cookies.
 */
function getValues(){
	userName = document.personal_info.userName_text;
	password1 = document.personal_info.password_text;
	name1 = document.personal_info.name_text;
	name2 = document.personal_info.lastname_text;
	email1 = document.personal_info.email_text;
	date = document.personal_info.day_text;
	month = document.personal_info.month_text;
	year = document.personal_info.year_text;
	gender = document.personal_info.select_gender;
	houseNo = document.personal_info.house_text;
	address1 = document.personal_info.addr1_text;
	address2 = document.personal_info.addr2_text;
	city = document.personal_info.city_text;
	zip = document.personal_info.zip_text;	
}

/**
 * the functionality of this function is to validate all the inputs.
 * if anyone of the validation fails, a corresponding message will appear.
 * once the error is fixed it is validated again.
 * once all validations are passed then only we create the cookie.
 * when we are updating a user cookie, we validate all the input values and then update[re-create] the cookie.
 */
function validateForm() {
	// Insert your form validation code here
	getValues();
	var val =  document.getElementById('done').value;
	if(val != "Update"){
		if(validateUserName(userName) && validatePassword(password1) && isAllLetter(name1,"First Name") && isAllLetter(name2,"Last Name") && validatemail(email1) && validateDOB(date, month, year)){
			if(validateGender(gender) && validateHouseNO(houseNo) && validateText(address1,"Address1") && validateText(city,"city") && validateZIP(zip)){
				if(checkUser(userName)){
					createCookie();
					window.alert("Successfully Created record");
					document.getElementById("clear").click();
					document.getElementById('register').style.display = 'none';
				}
			}
		}
	}else{
		if(validatePassword(password1) && isAllLetter(name1,"First Name") && isAllLetter(name2,"Last Name") && validatemail(email1) && validateDOB(date, month, year)){
			if(validateGender(gender) && validateHouseNO(houseNo) && validateText(address1,"Address1") && validateText(city,"city") && validateZIP(zip)){
				createCookie();
				window.alert("Successfully updated record");
			}
		}
	}
}

/**
 * empty object constructor to create a user object, such that all user values can be grouped on to an object.
 */
function cunstructor(){
	
}

/**
 * create cookie function is used to create the user cookie upon successful validation.
 * it creates a user object using the empty constructor and assigns variables to store the values.
 * once the user object is successfully created, we use JSON to stringify the object and we encode it to remove whitespaces.
 * after this a user cookie is created using the users username and the expiration is 1 month from creating/updating the cookie.
 */
function createCookie(){
/* 	console.log(count);
	console.log(document.getElementById('done').value); */
	var now = new Date();
	now.setMonth( now.getMonth() + 1 );
	
	var user = new cunstructor();
	user.username = document.personal_info.userName_text.value;
	user.password1 = document.personal_info.password_text.value;
	user.firstName = document.personal_info.name_text.value;
	user.lastName = document.personal_info.lastname_text.value;
	user.email1 = document.personal_info.email_text.value;
	user.dobDate = document.personal_info.day_text.value;
	user.dobMonth = document.personal_info.month_text.value;
	user.dobYear = document.personal_info.year_text.value;
	user.gender = document.personal_info.select_gender.value;
	user.houseNo = document.personal_info.house_text.value;
	user.address1 = document.personal_info.addr1_text.value;
	user.address2 = document.personal_info.addr2_text.value;
	user.city = document.personal_info.city_text.value;
	user.zip = document.personal_info.zip_text.value;
	if(document.getElementById('done').value != "Update")
		user.counter = 0;
	else 
		user.counter = count+1;
	
	var jsonString = encodeURI(JSON.stringify(user));
	document.cookie = userName.value + "=" + jsonString+";"+"expires="+now.toUTCString()+";"; 

}

/**
 * this method is used to read/get all the content inside the cookie.
 * once the value is read, they are put onto the corresponding input fields such that the user can update the record.
 *//*
function readCookies(){
	var allCookies = document.cookie;
	if(allCookies!=""){

	//window.alert("All Cookies: "+allCookies);
	
	// Get all the cookies pairs in an array 
	cookiearray= document.cookie.split(';'); 
	
	// Now take key value pair out of this array 
	for(var i=0; i<cookiearray.length; i++){
		key = cookiearray[i].split('=')[0];
		value1 = decodeURI(cookiearray[i].split('=')[1]);
		//window.alert("Key is : " + key + " and Value is : " + value1);
		if(i == 0){
			document.getElementById("name_text").value = value1;
		}else if(i == 1){
			document.getElementById("email_text").value = value1;
		}else if(i == 2){
			document.getElementById("day_text").value = value1;
		}else if(i == 3){
			document.getElementById("month_text").value = value1;
		}else if(i == 4){
			document.getElementById("year_text").value = value1;
		}else if(i == 5){
			document.getElementById("select_gender").value = value1;
		}else if(i == 6){
			document.getElementById("addr1_text").value = value1;
		}else if(i == 7){
			document.getElementById("addr2_text").value = value1;
		}else if(i == 8){
			document.getElementById("city_text").value = value1;
		}else if(i == 9){
			document.getElementById("zip_text").value = value1;
		}
	}
	}
	else
		window.alert("no cookies stored");
}*/

/**
 * this function is used to determine if the entered date is in a leap year or not.
 * this functionality is mainly used for the month February.
 */
function isLeapYear(year) {
	if(year==""){
		window.alert("Year can't be empty");
		return false;
	}
	else{
		var return_value = true;
	
		// There is no leap year if the year is not divisible by 4
		if ((year % 4) != 0)
			return_value = false;
	
		// There is no leap year if the year is divisible by 100 but not 400
		else if (((year % 100) == 0) & ((year % 400) != 0))
			return_value = false;
		return return_value;
	}
}

/**
 * To get a string contains only letters (both uppercase or lowercase), we use a regular expression (/^[A-Za-z]+$/) which allows only letters
 * Next the match() method of string object is used to match the said, regular expression against the input value
 */
function validateUserName(input){
	// To get a string contains only letters (both uppercase or lowercase) 
	// we use a regular expression (/^[A-Za-z]+$/) which allows only letters.
	var letters = /^[a-zA-z0-9]+$/;
	if(input.value==""){
		window.alert("Username can't be empty \nPlease enter a Username");
		input.focus();
		return false;
	}
	else{
		//  Next the match() method of string object is used to match the said 
		// regular expression against the input value
		if(letters.test(input.value))
			return true;
		else{
			window.alert('\t\tError \nUsername can only conatain alphanumeric characters. \nPlease Try again');
			input.focus();
			return false;
		}
	}
}

/**
 * To check a password between 7 to 15 characters, which contain at least one numeric digit and a special character.
 * @param input
 * @returns {Boolean}
 */
function validatePassword(input){
	// To check a password between 7 to 15 characters
	// which contain at least one numeric digit and a special character.
	
	var letters =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
	if(input.value==""){
		window.alert("Password can't be empty \nPlease enter a Password");
		input.focus();
		return false;
	}
	else{
		//  Next the match() method of string object is used to match the said 
		// regular expression against the input value
		if(letters.test(input.value))
			return true;
		else{
			alert('\t\tError \nPlease enter a password between 7 to 15 characters \nwhich contain at least one numeric digit and a special character');
			input.focus();
			return false;
		}
	}
}

/**
 * this function is mainly used to check whether the user cookie exists or not. It is mainly used to check if username is already been used or not as well.
 * @param cname
 * @returns
 */
function getCookie(cname){
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
 * this function is used to check whether a username entered by the user is selected or not.
 * @param input
 * @returns {Boolean}
 */
function checkUser(input){
	var user=getCookie(input.value);
	if (user!=""){
		alert('\tError, The username is taken \nPlease try with a different username');
		input.focus();
		return false;
	}
	else {
		return true;
	}
}

/**
 * This function is used to check if the input only contains letters. It is mainly used for validating first & last name, address & city.
 * @param input
 * @param name
 * @returns {Boolean}
 */
function isAllLetter(input,name){
	// To get a string contains only letters (both uppercase or lowercase) 
	// we use a regular expression (/^[A-Za-z]+$/) which allows only letters.
	var letters = /^[A-Za-z]+$/;
	if(input.value==""){
		window.alert(name+" can't be empty \nPlease enter your "+name);
		input.focus();
		return false;
	}
	else{
		//  Next the match() method of string object is used to match the said 
		// regular expression against the input value
		if(letters.test(input.value))
			return true;
		else{
			alert('\tError \nPlease input alphabet characters only');
			input.focus();
			return false;
		}
	}
}

/**
 * this function is used to validate the email input to check whether the input email address is in an email format.
 * @param input
 * @returns {Boolean}
 */
function validatemail(input){
	var letters = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
	if(input.value==""){
		window.alert("Please enter your email id in the following format: \n emailId@email.com");
		input.focus();
		return false;
	}
	else{	
		if(letters.test(input.value))
			return true;
		else{
			window.alert("You have entered an invalid email address! \nPlease enter your email id in the following format: \n\t emailId@email.com");
			input.focus();
			return false;
		}
	}
}

/**
 * this function is used to validate the DOB of the user. Especially it validated whether if the typed date is a valid date for that particular month.
 * it also validated if the entered month is between 1 and 12 inclusive and checks whether the year is a leap year as well,
 * so that the correct date on the leap year February is checked and validated.
 * @param day
 * @param month
 * @param year
 * @returns {Boolean}
 */
function validateDOB(day, month, year){

	if(day.value=="" || month.value=="" || year.value==""){
		window.alert("Date can't be empty. \nPlease enter your Date of Birth");
		day.focus();
		return false;
	}
	else{
		if(isNumber(day.value) && isNumber(month.value) && isNumber(year.value)){
			var day1 = parseInt(day.value);
			var month1 = parseInt(month.value);
			var year1 = parseInt(year.value);
			
			if(month1>0 && month1 <13 && !isLeapYear(year1) && year1>=1900 && year1 <=2015){
				var ListofDays1 = [31,28,31,30,31,30,31,31,30,31,30,31]; 
				//window.alert("non leap year");
				if(day1<=ListofDays1[month1-1] && day1 >0){
					//window.alert("Correct Date on non-leapYear");
					return true;
				}
				else{
					window.alert("invalid date on non-leapYear");
					day.focus();
					return false;
				}
					
			}else if(month1>0 && month1 <13 && isLeapYear(year1) && year1>=1900 && year1 <=2015){
				//window.alert("leap year");
				var ListofDays2 = [31,29,31,30,31,30,31,31,30,31,30,31]; 
				if(day1<=ListofDays2[month1-1]  && day1 >0){
					//window.alert("Correct Date on non-leapYear");
					return true;
				}
				else{
					window.alert("invalid date on leapYear");
					day.focus();
					return false;
				}
					
			}else{
				window.alert("invalid date. \nPlease Check the Date and Try again");
				day.focus();
				return false;
			}
				
		}
		else{
			window.alert("invalid date format. \nPlease Check the Date and Try again");
			day.focus();
			return false;
		}
				
		
	}
}

/**
 * this function is mainly used to check the input for numeric values. It only validates on numeric values.
 * this function is mainly used to check whether the entered DOB conatins numeric values or not.
 * @param input
 * @returns {Boolean}
 */
function isNumber(input){
	var numbers = /^[0-9]+$/;
	if(numbers.test(input))
		return true;
	else
		return false;
}

/**
 * this function is used to validate whether the user used the default value or not
 * @param input
 * @returns {Boolean}
 */
function validateGender(input){
	if(input.value=="None"){
		window.alert("Choose a Gender");
		input.focus();
		return false;
	}else
		return true;
}

/**
 * this function is used to check if the input is contains only letters (both uppercase or lowercase).
 * it is mainly used for validating the address.
 * @param input
 * @param name
 * @returns {Boolean}
 */
function validateText(input,name){
	if(input.value==""){
		window.alert(name + " can't be empty");
		input.focus();
		return false;
	}
	else{
		// To get a string contains only letters (both uppercase or lowercase) 
		// we use a regular expression (/^[A-Za-z]+$/) which allows only letters.
		var letters = /^[A-Za-z]+$/;
		//  Next the match() method of string object is used to match the said 
		// regular expression against the input value
		if(letters.test(input.value))
			return true;
		else{
			window.alert('\t\t ERROR \nPlease input alphabet characters only');
			input.focus();
			return false;
		}
	}
}

/**
 * this function is used to validate whether the entered value is a numerical value for a house number or not.
 * @param input
 * @returns {Boolean}
 */
function validateHouseNO(input){
	if(input.value==""){
		window.alert("House No can't be empty");
		input.focus();
		return false;
	}else{
		if(isNumber(input.value))
			return true;
		else{
			alert('\t\t Error \nHouse No can only conatin numbers only. \nPlease input numeric characters only');
			input.focus();
			return false;
		}
	}
}

/**
 * This function is used to check whether the input has at least one letter followed by a white space, followed by at least one digit.
 * E.g: Dublin 24
 * @param input.
 * @returns {Boolean}
 */
function validateZIP(input){
	var letterNumber = /^[a-zA-Z]+\s[0-9]+$/;
	if(input.value==""){
		window.alert("ZIP can't be empty");
		input.focus();
		return false;
	}
	else{
		
		if(letterNumber.test(input.value)){
			return true;
		}else{
			window.alert("\t\t ERROR \nInvalid Zip \nPlease enter ZIP in the following format: \n\t 'char no'");
			input.focus();
			return false;
		}
	}
}


