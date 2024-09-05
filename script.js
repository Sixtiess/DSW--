$(document).ready(function() {
	$(".result").text("");
	
	//An array of all the possible questions
	const allQuestions = [
		"What is point-slope form?",
		"What is the derivative of a function where f(x) = x^n?",
		"Find the derivative: f(x) = sqrt(x)",
		"What is the value of sin(0)?",
		"What is one kind of nonremoveable discontinuity?",
		"What does a derivative define?",
		"How many pieces can a piecewise function have?",
		"Find the derivative: f(x) = sin(x)"
	];
	
	//An array that contains the answers to those questions, in order
	//The answer is not stored as the actual answer to the question, but as the number corresponding to the answer a through d (0 = a, 1 = b, 2 = c, 3 = d);
	//Make sure to make the first entry the correct one! The order of the questions will be shuffled when they are displayed but the 
	const answers = [
		{answerText: "y-y1=m(x-x1)", correct: "true"}, 
		{answerText: "y=a(x-h)+k", correct: "false"}, 
		{answerText: "y=mx+b", correct: "false"}, 
		{answerText: "x=nx^n-1", correct: "false"}, 
	
	
		{answerText: "f'(x) = nx^(n-1)", correct: "true"}, 
		{answerText: "f'(x) = x^(n-2)", correct: "false"}, 
		{answerText: "f'(x) = 1/(x^n)", correct: "false"}, 
		{answerText: "f'(x) = nx", correct: "false"},
		
		
		{answerText: "f'(x) = 1/2*sqrt(x)", correct: "true"}, 
		{answerText: "f'(x) = 1/sqrt(x)", correct: "false"}, 
		{answerText: "f(x) = 1/2*sqrt(x)", correct: "false"}, 
		{answerText: "f(x) = 1/sqrt(x)", correct: "false"},
		
		
		{answerText: "0", correct: "true"}, 
		{answerText: "1", correct: "false"}, 
		{answerText: "1/2", correct: "false"}, 
		{answerText: "sqrt(3)/2", correct: "false"},
		
		
		{answerText: "Hole", correct: "true"}, 
		{answerText: "Euclidian", correct: "false"}, 
		{answerText: "Asymptotic", correct: "false"}, 
		{answerText: "Triangular", correct: "false"},
		
		
		{answerText: "Slope", correct: "true"}, 
		{answerText: "Area under a function", correct: "false"}, 
		{answerText: "Volume", correct: "false"}, 
		{answerText: "Domain", correct: "false"},
		
		
		{answerText: "Infinite", correct: "true"}, 
		{answerText: "10", correct: "false"}, 
		{answerText: "5", correct: "false"}, 
		{answerText: "2", correct: "false"},
		
		
		{answerText: "f'(x) = cos(x)", correct: "true"}, 
		{answerText: "f'(x) = tan(x)", correct: "false"}, 
		{answerText: "f'(x) = csc(x)", correct: "false"}, 
		{answerText: "f'(x) = sec(x)", correct: "false"},
		
		
	];
	
		
	
	
	//An array that contains question objects that have an answer and a question, allows for the questions to be scrambled in a random order, and can also allow a set number of random questions to be chosen
	const questions = [];
	
	//Adding the answers and questions into the array of questions
	for (i = 0; i < 10; i++) {
		if (allQuestions[i] != null && answers[i] != null) {
			if (answers[(4 * i) + 3] != null) {
				const question = {
					qText: allQuestions[i],
					answerArray: [answers[(4 * i)], answers[(4 * i) + 1], answers[(4 * i) + 2], answers[(4 * i) + 3]]
				};
				questions[i] = question;
			}
		}
	}
	
	//Variable to track the question the user is currently on
	//var qNum = 0;
	
	shuffleArray(questions);
	
	refreshQuestion();
	
	refreshAnswers();
	
	//When a card is clicked, checks if the card had the correct answer or not, then displays the appropriate result message and moves to the next question
	$(".card").click(function() {
		var userIndex = parseInt(this.dataset.answer);
		
		let userAnswer = $(this).text();
		let correctAnswer = questions[0].answerArray[0].answerText;
		
		console.log(userAnswer);
		console.log(correctAnswer);
		
		//checking if the user got the question right (and if they haven't already answered this question correctly, so that the result text won't say "Incorrect!" if the user tries to choose another incorrect answer after answering correctly)
		if (userAnswer == correctAnswer && $(".result").text() != "Incorrect!") {
			$(".result").text("Correct!");
			
			//Checks if there is another question after the current question, and goes to that question if the user gets the current question correct
			if (questions[1] != null) {
				questions.splice(0, 1);
				setTimeout(function() {
					//qNum++;
					refreshQuestion();
					refreshAnswers();
				}, 1500);
			}
		} else {
			//checking if the user hasn't already answered this question correctly so that the result will still say "Correct!" even if they click on another card
			if ($(".result").text() != "Correct!") {
				
				var temp = questions[0];
				questions.splice(0, 1);
				questions.push(temp);
				
				$(".result").text("Incorrect!");
				
				setTimeout(function() {
					refreshQuestion();
					refreshAnswers();
				}, 500);
			}
		}
		
	});
	
	function refreshQuestion() {
		$(".question").text(questions[0].qText);
		$(".result").text("");
	}
	
	function refreshAnswers() {
		const indices = ["0", "1", "2", "3"];
		shuffleArray(indices);
		
		$(".card").each(function() {
			
			
			var index = parseInt(indices[0]);
			
			$(this).text(questions[0].answerArray[index].answerText);
			
			indices.splice(0, 1);
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
			// generate random number between 0 and i
			var j = Math.floor(Math.random() * (i + 1));	
			
			// swap the array at the current index with the array at the index of the random number generated
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	}
	
});