$(document).ready(function(){
	
	//Variable to track the question the user is currently on
	var qNum = 1;
	
	//Array of the answers to each question, in order
	//Used to check if the user answered the question correctly or incorrectly
	const answers = ["a", "b", "c"]; 
	
	//When a card is clicked, checks if the card had the correct answer or not
	$(".card").click(function() {
		// $(".result").text($(this).getAttribute("data-answer"));
		$(this).text("test");
		$(".result").css("visibility", "visible");
	});
});