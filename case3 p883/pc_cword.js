"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 11
   Case Problem 3

   Crossword Puzzle Script
   
   Author: Lourdes Linares
   Date:   10.9.2022
   
   Global Variables
   ================
   allLetters
      References all of the letter cells in the crossword table#crossword
   
   currentLetter
      References the letter currently selected in the puzzleLetter
      
   wordLetters
      References the across and down letters in the word(s) associated with the current letter
   
   acrossClue
      References the across clue associated with the current letter
      
   downClue
      References the down clue associated with the current letter
*/

var allLetters, currentLetter, wordLetters, acrossClue, downClue;

var typeDirection = "right";

window.onload = init;

function init()
{
	allLetters = document.querySelectorAll("table#crossword span");
	
	currentLetter = allLetters[0];
	
	var acrossID = currentLetter.dataset.clueA;
	var downID = currentLetter.dataset.clueD;
	
	acrossClue = document.getElementById(acrossID); //Check Syntax -- set var to reference element?
	downClue = document.getElementById(downID);
	
	formatPuzzle(currentLetter);
	for(var i = 0; i < allLetters.length; i++)
	{
		allLetters[i].style.cursor = "pointer";
		allLetters[i].onmousedown = function(e) {
      formatPuzzle(e.target);
	}
	}
	
	// run selectLetter() in response to keydown event
	//window.addEventListener("keydown", selectLetter); // Not sure if this works
	document.onkeydown = selectLetter;
    
	
	var typeImage = document.getElementById("directionImg");
	typeImage.style.cursor = "pointer";
	typeImage.addEventListener("click", switchTypeDirection);
	
	document.getElementById("showErrors").addEventListener("click", 
	function() 
	{
		for(var i = 0; i < allLetters.length; i++)
		{
			if(allLetters[i].text != currentLetter.dataset.letter)
			{
				allLetters[i].style.color = "red";
				setTimeout(function(){allLetters[i].style.color = "";}, 3000);
				
			}
		}
	});
	document.getElementById("showSolution").addEventListener("onclick", 
	function(){
		for(var i = 0; i < allLetters.length; i++)
		{
			allLetters[i].text = currentLetter.dataset.letter;
		}
	});
}

function formatPuzzle(puzzleLetter)
{
	currentLetter = puzzleLetter;
	for(var i = 0; i < allLetters.length; i++)
	{
		allLetters[i].style.backgroundColor = "";
	}
	acrossClue.style.color = "";
	downClue.style.color = "";
	
	if(typeof currentLetter.dataset.clueA !== undefined)
	{
		acrossClue = document.getElementById(currentLetter.dataset.clueA);//reference element with ID value of currentLetter.dataset.clueA
		//acrossClue.style.color = 'blue';
		acrossClue.style.backgroundColor = "blue";
		wordLetters = document.querySelectorAll("[data-clue-a = " + currentLetter.dataset.clueA + "]");
		//wordLetters.style.backgroundColor = "rgb(231, 231, 255)"; change background-color style of each item in this to rgb(231,231,255)
		for(var i = 0; i < wordLetters.length; i++)
		{
		wordLetters[i].style.backgroundColor = "rgb(231, 231, 255)";
		}
		
	}
	if(typeof currentLetter.dataset.clueD !== undefined)
	{
		acrossClue = document.getElementById(currentLetter.dataset.clueD);
		acrossClue.style.color = "red";
		wordLetters = document.querySelectorAll("[data-clue-d = " + currentLetter.dataset.clueD + "]");
		for(var i = 0; i < wordLetters.length; i++)
		{
		wordLetters[i].style.backgroundColor = "rgb(255, 231, 231)";
		}
		
	}
	if(typeDirection == "right")
	{
		currentLetter.style.backgroundColor = "rgb(191, 191, 255)";
	}
	else
	{
		currentLetter.style.backgroundColor = "rgb(255, 191, 191)";
	}
}

function selectLetter(e)
{
	var leftLetter = document.getElementById(currentLetter.dataset.left);
	var upLetter = document.getElementById(currentLetter.dataset.up);
	var rightLetter = document.getElementById(currentLetter.dataset.right);
	var downLetter = document.getElementById(currentLetter.dataset.down);
	
	var userKey = e.keyCode;
	
	if(userKey == 37)
	{
		formatPuzzle(leftLetter);
	}
	else if(userKey == 38)
	{
		formatPuzzle(upLetter);
	}
	else if(userKey == 39 || userKey == 9)
	{
		formatPuzzle(rightLetter);
	}
	else if(userKey == 40 || userKey == 13)
	{
		formatPuzzle(downLetter);
	}
	else if(userKey == 8 || userKey == 46)
	{
		currentLetter = "";
	}
	else if(userKey == 32)
	{
		switchTypeDirection();
	}
	else if(userKey >= 65 && userKey <= 90)
	{
		currentLetter = getChar(userKey);
		if(typeDirection == "right")
		{
			formatPuzzle(rightLetter);
		}
		else
		{
			formatPuzzle(downLetter);
		}
	}
	e.preventDefault(); // Not sure
	
}

function switchTypeDirection()
{
	var typeImage = document.getElementById("directionImg").innerHTML;
	
	if(typeDirection == "right")
	{
		typeDirection = "down";
		typeImage.src = "pc_right.png";
		currentLetter.style.backgroundColor = "rgb(255, 191, 191)";
	}
	else
	{
		typeDirection = "right";
		typeImage.src = "pc_down.png";
		currentLetter.style.backgroundColor = "rgb(191, 191, 255)";
	}
}
   
         
/*   Functions
   =========
   
   init()
      Initializes the puzzle, setting up the event handlers and the variable values
       
   formatPuzzle(puzzleLetter)
      Formats the appearance of the puzzle given the selected puzzle letter
      
   selectLetter(e)
      Applies keyboard actions to select a letter or modify the puzzle navigation
      
   switchTypeDirection()
      Toggles the typing direction between right and down
      
   getChar(keyNum)
      Returns the text character associated with the key code value, keyNum


*/





   





/*====================================================*/

function getChar(keyNum) {
   return String.fromCharCode(keyNum);
}
