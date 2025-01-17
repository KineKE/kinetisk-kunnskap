

//////////////// VI STARTER HER ///////////////

// Import statements
import { QuizManager } from "./QuizManager.js";
import { toggleVisibility } from "./utils.js";

const quizManager = new QuizManager();

// DOM elements
const quizContainer = document.getElementById('quiz-container');
const feedback = document.getElementById('feedback');
const nextButton = document.getElementById('next-button');
const endContainer = document.getElementById('end-container');
const questionTitle = document.getElementById('question-title');
const optionsContainer = document.getElementById('options');



// Start quiz
export function startQuiz() {
    quizManager.loadQuestions([
        { question: "What is 2 +2?", options: ["2", "3", "4", "5"], answer: 1},
        { question: "What is 3 + 3?", options: ["5", "4", "8", "7"], answer: 1}
        ]
    )

    quizManager.reset();
    showQuestion();
}


// Show Current Question
function showQuestion() {
    const currentQuestion = quizManager.getCurrentQuestions();

    // Update question and options in the DOM
}




// Show next question

// Show feedback

// Show next question or end quiz




///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

/*



// Global variables
let questions = []; // Stores the questions being fetched from the JSON files
let currentQuestionIndex = 0; // Tracks the current question being displayed
let score = 0; // Tracks the user's current score


const heroContent = document.querySelector(".hero-content");

const endContainer = document.getElementById("end-container");
const quizContainer = document.getElementById("quiz-container");

const nextButton = document.getElementById("next-button");

const restartButton = document.getElementById("restart-quiz-btn");




/!*

export function startQuiz(){
    // Setting variables
    const currentQuestionIndex = 0;
    const score = 0;

    // Hide the hero and show the quiz
    toggleVisibility(heroContent, false);
    toggleVisibility(quizContainer, true);
}
*!/


function restartQuiz() {
    // Reset the quiz state
    currentQuestionIndex = 0;
    score = 0;

    // Hide the end screen and show the hero content
    endContainer.classList.add("hidden");

    heroContent.classList.remove("hidden");

    // Reset and start the quiz
    showQuestion();
}



document.getElementById("start-quiz-btn").addEventListener("click", () => {
    showQuestion();
});

document.getElementById("start-quiz-btn").addEventListener("click", async () => {
    console.log("Start button clicked!"); // Debugging

    // Clear any existing questions
    questions = [];

    await loadQuestionsFromTopics([]);

    if (questions.length > 0) {
        showQuestion();
    } else {
        alert("2 - There are no questions available in this quiz. Please try again later.");
    }
});


// =========================
// Quiz Initialization
// =========================


function restartQuiz() {
    // Reset the quiz state
    currentQuestionIndex = 0;
    score = 0;

    // Hide the end screen and show the hero content
    endContainer.classList.add("hidden");
    heroContent.classList.remove("hidden");

    // Reset and start the quiz
    showQuestion();
}



// =========================
// Question Display
// =========================

function showQuestion() {

    // Logic to display the first question
    quizContainer.classList.remove("hidden");


    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question-title").textContent = currentQuestion.question;
    document.getElementById("current-question").textContent = currentQuestionIndex + 1;
    document.getElementById("total-questions").textContent = questions.length;

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("btn");
        button.addEventListener("click", () => checkAnswer(index));
        optionsContainer.appendChild(button);
    });
}




// =========================
// Answer Checking
// =========================

function checkAnswer(selectedOptionIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const feedback = document.getElementById("feedback");

    // Remove previous feedback classes
    feedback.classList.remove("correct", "wrong");


    // Disable all buttons to prevent further clicks
    const buttons = document.querySelectorAll("#options .btn");
    console.log("Buttons before disabling:", buttons); // Log the buttons found
    buttons.forEach((button) => {
        button.disabled = true; // Disable the button
        button.classList.add("disabled");
    });

    // Show feedback for the user's answer
    if (selectedOptionIndex === currentQuestion.answer) {
        score++;
        feedback.textContent = "✅ Riktig!";
        feedback.classList.add("correct");
    } else {
        feedback.textContent = "❌ Feil!";
        feedback.classList.add("wrong");
    }

    /!*    function speakMessage(message) {
            const utterance = new SpeechSynthesisUtterance(message);
            utterance.lang = "en-US"; // Set language (e.g., "no-NO" for Norwegian)
            window.speechSynthesis.speak(utterance);
        }*!/

    /!*    // Highlight the correct answer
        const correctButton = buttons[currentQuestion.answer];
        correctButton.classList.add("correct-highlight");

        if (selectedOptionIndex !== currentQuestion.answer) {
            const selectedButton = buttons[selectedOptionIndex];
            selectedButton.classList.add("incorrect-highlight");
            console.log("Selected button classes:", selectedButton.classList);
        }*!/


    // Show feedback for the user's answer
    if (selectedOptionIndex === currentQuestion.answer) {
        score++;
        feedback.textContent = "✅ Riktig!";
        feedback.classList.add("correct");

        // Highlight the selected correct answer
        const correctButton = buttons[selectedOptionIndex];
        correctButton.classList.add("correct-highlight");
    } else {
        feedback.textContent = "❌ Feil!";
        feedback.classList.add("wrong");

        // Highlight the correct answer and the selected wrong answer
        const correctButton = buttons[currentQuestion.answer];
        correctButton.classList.add("correct-highlight");

        const selectedButton = buttons[selectedOptionIndex];
        selectedButton.classList.add("incorrect-highlight");
    }


    feedback.classList.add("show");
    feedback.style.display = "block"; // Make feedback visible


    // Show the "Next" button
    nextButton.classList.remove("hidden");
}




// =========================
// Event Listeners
// =========================


/!*
document.getElementById("start-quiz-btn").addEventListener("click", async () => {
    // Get selected topics
    const selectedTopics = Array.from(
        document.querySelectorAll("input[name='topics']:checked")
    ).map((checkbox) => checkbox.value);

    // Alert if no topics are selected
    if (selectedTopics.length === 0) {
        alert("Vennligst velg minst ett emne!");
        return;
    }

    // Load questions from selected topics
    await loadQuestionsFromTopics(selectedTopics);

    // Show quiz only if questions are successfully loaded
    if (questions.length > 0) {
        showQuestion();
    } else {
        alert("There are no questions available in this quiz. Please try again later.");
    }
});*!/

/!*document.getElementById("start-quiz-btn").addEventListener("click", () => {
    // Get selected topics
    const selectedTopics = Array.from(
        document.querySelectorAll("input[name='topics']:checked")
    ).map((checkbox) => checkbox.value);

    // Alert if no topics are selected
    if (selectedTopics.length === 0) {
        alert("Vennligst velg minst ett emne!");
        return;
    }

    // Load questions from selected topics
    loadQuestionsFromTopics(selectedTopics);
});*!/


document.getElementById("next-button").addEventListener("click", () => {
    const feedback = document.getElementById("feedback");
    feedback.style.display = "none"; // Hide feedback

    // Enable all buttons for the next question
    const buttons = document.querySelectorAll("#options .btn");
    buttons.forEach((button) => {
        button.disabled = false; // Re-enable button
        button.classList.remove("disabled", "correct-highlight", "incorrect-highlight"); // Remove styles
    });

    // Move to the next question
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
});


// =========================
// End of Quiz
// =========================

function endQuiz() {
    // Hide the quiz container and show end container
    questionContainer.classList.add("hidden");
    endContainer.classList.remove("hidden");

    // Update the score
    document.getElementById("final-score").textContent = score;
    document.getElementById("total-questions-end").textContent = questions.length;

    // Add event listener to restart the quiz
    restartButton.addEventListener("click", restartQuiz);
}
*/