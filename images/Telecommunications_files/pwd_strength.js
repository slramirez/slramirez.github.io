// Password strength meter v2.0
// Matthew R. Miller - 2007
// www.codeandcoffee.com
// Based off of code from:
//  http://www.intelligent-web.co.uk
//  http://www.geekwisdom.com/dyn/passwdmeter

/*
	Password Strength Algorithm:
	
	Password Length:
		5 Points: Less than 4 characters
		10 Points: 5 to 7 characters
		25 Points: 8 or more
		
	Letters:
		0 Points: No letters
		10 Points: Letters are all lower case
		20 Points: Letters are upper case and lower case

	Numbers:
		0 Points: No numbers
		10 Points: 1 number
		20 Points: 3 or more numbers
		
	Characters:
		0 Points: No characters
		10 Points: 1 character
		25 Points: More than 1 character

	Bonus:
		2 Points: Letters and numbers
		3 Points: Letters, numbers, and characters
		5 Points: Mixed case letters, numbers, and characters
		
	Password Text Range:
	
		>= 90: Very Secure
		>= 80: Secure
		>= 70: Very Strong
		>= 60: Strong
		>= 50: Average
		>= 25: Weak
		>= 0: Very Weak
		
*/


// Settings
// -- Toggle to true or false, if you want to change what is checked in the password
var m_strUpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var m_strLowerCase = "abcdefghijklmnopqrstuvwxyz";
var m_strNumber = "0123456789";
var m_strCharacters = "!@#$%^&*?_~"

// Check password
function checkPassword(strPassword)
{
	// Reset combination count
	var nScore = 0;
	
	// Password length
	// -- Less than 4 characters
	if (strPassword.length < 5)
	{
		nScore += 5;
	}
	// -- 5 to 7 characters
	else if (strPassword.length > 4 && strPassword.length < 8)
	{
		nScore += 10;
	}
	// -- 8 or more
	else if (strPassword.length > 7)
	{
		nScore += 25;
	}

	// Letters
	var nUpperCount = countContain(strPassword, m_strUpperCase);
	var nLowerCount = countContain(strPassword, m_strLowerCase);
	var nLowerUpperCount = nUpperCount + nLowerCount;
	// -- Letters are all lower case
	if (nUpperCount == 0 && nLowerCount != 0) 
	{ 
		nScore += 10; 
	}
	// -- Letters are upper case and lower case
	else if (nUpperCount != 0 && nLowerCount != 0) 
	{ 
		nScore += 20; 
	}
	
	// Numbers
	var nNumberCount = countContain(strPassword, m_strNumber);
	// -- 1 number
	if (nNumberCount == 1)
	{
		nScore += 10;
	}
	// -- 3 or more numbers
	if (nNumberCount >= 3)
	{
		nScore += 20;
	}
	
	// Characters
	var nCharacterCount = countContain(strPassword, m_strCharacters);
	// -- 1 character
	if (nCharacterCount == 1)
	{
		nScore += 10;
	}	
	// -- More than 1 character
	if (nCharacterCount > 1)
	{
		nScore += 25;
	}
	
	// Bonus
	// -- Letters and numbers
	if (nNumberCount != 0 && nLowerUpperCount != 0)
	{
		nScore += 2;
	}
	// -- Letters, numbers, and characters
	if (nNumberCount != 0 && nLowerUpperCount != 0 && nCharacterCount != 0)
	{
		nScore += 3;
	}
	// -- Mixed case letters, numbers, and characters
	if (nNumberCount != 0 && nUpperCount != 0 && nLowerCount != 0 && nCharacterCount != 0)
	{
		nScore += 5;
	}
	
	
	return nScore;
}
 
// Runs password through check and then updates GUI 
function runPassword(strPassword, strFieldID) 
{
	// Check password
	var nScore = checkPassword(strPassword);
	
	 // Get controls
    	//var ctlBar = document.getElementById(strFieldID + "_bar"); 
    	var ctlText = document.getElementById(strFieldID + "_text");
    	//var ctlIcon = document.getElementById(strFieldID + "_icon"); 
    	//if (!ctlBar || !ctlText)
    		//return;
    	
    	// Set new width
    	//ctlBar.style.width = nScore + "%";

 	// Color and text
 	// -- Short
 	if (strPassword.length<6)
 	{
 		var strText = "Too short";
 		var strColor = "#FF00FF";
 		var strColor_light = "#f2f2f2";
 		var strColor_border = "#dbdbdb";
 		var str_icon = "signup_check_short.gif";
 	}
	// -- Very Secure
 	/*else if (nScore >= 90)
 	{
 		var strText = "Very Secure";
 		var strColor = "#0ca908";
 		var strColor_light = "#0ca908";
 		var strColor_border = "#e71a1a";
 	}
 	// -- Secure
 	else if (nScore >= 80)
 	{
 		var strText = "Secure";
 		vstrColor = "#7ff67c";
 		var strColor_light = "#0ca908";
 		var strColor_border = "#e71a1a";
	}
	// -- Very Strong
 	else if (nScore >= 70)
 	{
 		var strText = "Very Strong";
 		var strColor = "#1740ef";
 		var strColor_light = "#0ca908";
 		var strColor_border = "#e71a1a";
	}*/
	// -- Strong
 	else if (nScore >= 60)
 	{
 		var strText = "Very Strong";
 		//var strColor = "#2a801b";
 		var strColor = "#00BB00";
 		var strColor_light = "#f0fee9";
 		var strColor_border = "#e1efdb";
 		var str_icon = "signup_check_verygood.gif";
	}
	// -- Average
 	else if (nScore >= 50)
 	{
 		var strText = "Strong";
 		//var strColor = "#78801b";
 		var strColor = "#00BB00";
 		var strColor_light = "#f5ffcf";
 		var strColor_border = "#e3e5a3";
 		var str_icon = "signup_check_strong.gif";
	}
	// -- Weak
 	else if (nScore >= 25)
 	{
 		var strText = "Good";
 		//var strColor = "#80621b";
 		var strColor = "#00BB00";
 		var strColor_light = "#fff0cf";
 		var strColor_border = "#e5d5a3";
 		var str_icon = "signup_check_good.gif";
	}
	// -- Very Weak
 	else
 	{
 		var strText = "Weak";
 		//var strColor = "#80461b";
 		var strColor = "#00BB00";
 		var strColor_light = "#ffe2cf";
 		var strColor_border = "#e5bda3";
 		var str_icon = "signup_check_weak.gif";
	}
	//ctlBar.style.backgroundColor = strColor_light;
	//ctlBar.style.borderColor = strColor_border;
	ctlText.innerHTML = "<span style='color: " + strColor + "; font-weight:bold'>" + strText + "</span>"; //+ " - " + nScore
	//ctlIcon.src = 'img/'+str_icon;
}
 
// Checks a string for a list of characters
function countContain(strPassword, strCheck)
{ 
	// Declare variables
	var nCount = 0;
	
	for (i = 0; i < strPassword.length; i++) 
	{
		if (strCheck.indexOf(strPassword.charAt(i)) > -1) 
		{ 
	        	nCount++;
		} 
	} 
 
	return nCount; 
} 
 
 
 
 
 


