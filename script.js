$(document).ready(function() {
	$(".result").text("");
	
	//An array of all the possible questions
	const allQuestions = [
		"What is 1 + 1?", 
		"What is 2 + 2?"
	];
	
	//An array that contains the answers to those questions, in order (so answers[0] = the answer to allQuestions[0], answers[1] = right answer to allQuestions[1], etc.)
	//The answer is not stored as the actual answer to the question, but as the number corresponding to the answer a through d (0 = a, 1 = b, 2 = c, 3 = d);
	const answers = [
		"2", 
		"0"
	];
	
	//An array to hold the text for the answer cards to show, this array should have 4 entries for each question (the 4 possible answers)
	const answersText = [
		"1", "87", "2", "idk",
		"4", "12094124", "sqrt(43)", "e"
	];
	
	//An array that contains question objects that have an answer and a question, allows for the questions to be scrambled in a random order, and can also allow a set number of random questions to be chosen
	const questions = [];
	
	//Adding the answers and questions into the array of questions
	for (i = 0; i < 10; i++) {
		if (allQuestions[i] != null && answers[i] != null) {
			if (answersText[(4 * i) + 3] != null) {
				const question = {
					qText: allQuestions[i],
					answer: answers[i],
					answerText: [answersText[(4 * i)], answersText[(4 * i) + 1], answersText[(4 * i) + 2], answersText[(4 * i) + 3]]
				};
				questions[i] = question;
			}
		}
	}
	
	//Variable to track the question the user is currently on
	var qNum = 0;
	
	refreshQuestion();
	
	refreshAnswers();
	
	//When a card is clicked, checks if the card had the correct answer or not, then displays the appropriate result message and moves to the next question
	$(".card").click(function() {
		let userAnswer = this.dataset.answer;
		let correctAnswer = questions[qNum].answer;
		
		
		//checking if the user got the question right (and if they haven't already answered this question correctly, so that the result text won't say "Incorrect!" if the user tries to choose another incorrect answer after answering correctly)
		if (userAnswer == correctAnswer) {
			$(".result").text("Correct!");
			
			//Checks if there is another question after the current question, and goes to that question if the user gets the current question correct
			if (questions[qNum + 1] != null) {
				setTimeout(function() {
					qNum++;
					refreshQuestion();
					refreshAnswers();
				}, 1500);
			}
		} else {
			//checking if the user hasn't already answered this question correctly so that the result will still say "Correct!" even if they click on another card
			if ($(".result").text() != "Correct!") {
				$(".result").text("Incorrect! Try again.");
			}
		}
		
	});
	
	function refreshQuestion() {
		console.log(questions[qNum].qText);
		$(".question").text(questions[qNum].qText);
		$(".result").text("");
	}
	
	function refreshAnswers() {
		$(".card").each(function() {
			$(this).text(questions[qNum].answerText[parseInt(this.getAttribute("data-answer"))]);
		}); 
	}
	
	
	$("#startButton").click(function() {
		startQuiz();
	});
	
	function startQuiz() {
		$(".startPage").hide();	
		$(".question").css("visibility", "visible");
		$(".card").css("visibility", "visible");
	}
	
	function shuffleArray(array) {
		for (var i = array.length - 1; i >= 0; i--) {
			//generate random number between 0 and i
			var j = Math.floor(Math.random() * (i + 1));	
			
			//swap the array at the current index with the array at the index of the random number generated
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	}
	
});