//let questions = []; // Stores the questions being fetched from the JSON files
let questions =
    [
        {
            question: "What does Agile emphasize?",
            options: ["Processes", "Tools", "Individuals", "Documentation"],
            answer: 2,
        },
        {
            question: "Which methodology is most closely associated with Agile?",
            options: ["Scrum", "Waterfall", "Lean", "Six Sigma"],
            answer: 0,
        },
        {
            question: "What does UML stand for?",
            options: [
                "Unified Modeling Language",
                "Universal Markup Language",
                "Unique Model Logic",
                "Universal Modeling Language",
            ],
            answer: 0,
        },
    ];

let currentQuestionIndex = 0; // Tracks the current question being displayed
let score = 0; // Tracks the user's current score

// Loading

function showQuestion() {
    console.log("showQuestion function called");


    // Hide the start screen (hero section)
    const heroSection = document.querySelector(".hero-content");
    heroSection.classList.add("hidden");

    // Show the quiz container
    const questionContainer = document.getElementById("quiz-container");
    questionContainer.classList.remove("hidden");


    const questionTitle = document.getElementById("question-title");
    const optionsContainer = document.getElementById("options");

    // Clear any previous options
    optionsContainer.innerHTML = "";

    // Get the current question
    const currentQuestion = questions[currentQuestionIndex];
    questionTitle.textContent = currentQuestion.question;


    document.getElementById("question-title").textContent = currentQuestion.question;
    document.getElementById("current-question").textContent = currentQuestionIndex + 1;
    document.getElementById("total-questions").textContent = questions.length;




    // Create buttons for each option
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("btn");
        button.addEventListener("click", () => checkAnswer(index)); // Attach click event
        optionsContainer.appendChild(button);
    });
}

document.querySelector(".start-quiz-btn").addEventListener("click", () => {
    console.log("Start button clicked!"); // Check if this logs in the console
    showQuestion();
});


function checkAnswer(selectedOptionIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const feedback = document.getElementById("feedback");

    // Remove previous feedback classes
    feedback.classList.remove("correct", "wrong");

    // Show feedback for the user's answer
    if (selectedOptionIndex === currentQuestion.answer) {
        score++;
        feedback.textContent = "Riktig!";
        feedback.classList.add("correct");
    } else {
        feedback.textContent = "Feil!";
        feedback.classList.add("wrong");
    }

    feedback.classList.add("show");
    feedback.style.display = "block"; // Make feedback visible


    // Show the "Next" button
    const nextButton = document.getElementById("next-button");
    nextButton.classList.remove("hidden");
}

document.getElementById("next-button").addEventListener("click", () => {
    const feedback = document.getElementById("feedback");
    feedback.style.display = "none"; // Hide feedback

    // Move to the next question
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
});

function endQuiz() {
    const questionContainer = document.getElementById("quiz-container");
    questionContainer.classList.add("hidden");

    const mainContent = document.getElementById("content");
    mainContent.innerHTML = `
        <h1>Quiz Completed!</h1>
        <p>Your score: ${score}/${questions.length}</p>
        <button onclick="restartQuiz()">Restart Quiz</button>
    `;
}





