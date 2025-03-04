/*
This module will handle blablabla...
 */

/*
TOC

 */





// =========== IMPORTS, VARIABLES ETC ============

// Import statements
import { QuizModel } from "./QuizModel.js";
import {} from "./quizView";

import { toggleVisibility } from "../core/utils.js";


// Creating an instance of the quizManager class
const quizManager = new QuizModel();

// Gathering DOM elements
const quizContainer = document.getElementById('quiz-container');
const feedback = document.getElementById('feedback');
const nextButton = document.getElementById('next-button');
const endContainer = document.getElementById('end-container');
const questionTitle = document.getElementById('question-title');
const optionsContainer = document.getElementById('options');
const questionContainer = document.getElementById('question-container');
const restartButton = document.getElementById("restart-quiz-btn");


// =================== START QUIZ =====================

export function startQuiz() {

    console.log("Starting quiz....")

    quizManager.loadQuestions([
            {
                "question": "Config 1",
                "options": [
                    "Great",
                    "Fine",
                    "Outstanding",
                    "Whatever"],
                "answer": 1
            },
            {
                "question": "Config 2",
                "options": [
                    "OK",
                    "If you say so",
                    "Gotcha",
                    "Excellent"],
                "answer": 2
            }
        ]
    )

    console.log("Questions have loaded...");
    console.log(quizManager.questions);

    console.log("Trying to reset the quiz..");
    quizManager.reset();
    console.log("Quiz resat!");
    console.log("Trying to show the first question..")
    showQuestion();
}


// =========================
// Question Display
// =========================

function showQuestion() {

    console.log("I am inside of showQuestion...");

    const currentQuestion = quizManager.getCurrentQuestion();

    console.log("I have fetched the first question...it is..");
    console.log(currentQuestion);
    document.getElementById("question-title").textContent = quizManager.questions[quizManager.currentQuestionIndex].question;
    document.getElementById("current-question").textContent = quizManager.currentQuestionIndex + 1;
    document.getElementById("total-questions").textContent = quizManager.questions.length;

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
    const currentQuestion = quizManager.questions[quizManager.currentQuestionIndex];

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


    // Highlight the correct answer
    const correctButton = buttons[currentQuestion.answer];
    correctButton.classList.add("correct-highlight");

    if (selectedOptionIndex !== currentQuestion.answer) {
        const selectedButton = buttons[selectedOptionIndex];
        selectedButton.classList.add("incorrect-highlight");
        console.log("Selected button classes:", selectedButton.classList);
    }


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
// Show next question
// =========================

document.getElementById("next-button").addEventListener("click", () => {
    toggleVisibility(feedback, false);

    // Enable all buttons for the next question
    const buttons = document.querySelectorAll("#options .btn");
    buttons.forEach((button) => {
        button.disabled = false; // Re-enable button
        button.classList.remove("disabled", "correct-highlight", "incorrect-highlight"); // Remove styles
    });

    // Move to the next question
    quizManager.currentQuestionIndex++;
    if (quizManager.currentQuestionIndex < quizManager.questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
});

// =========================
// Restarting Quiz
// =========================


function restartQuiz() {
    // Reset the quiz state
    currentQuestionIndex = 0;
    score = 0;

    // Hide the end screen and show the hero content
    endContainer.classList.add("hidden");
    heroContent.classList.remove("hidden");

    toggleVisibility(endContainer, false);
    toggleVisibility(heroContent, true);

    // Reset and start the quiz
    showQuestion();
}


// =========================
// End of Quiz
// =========================

function endQuiz() {
    // Hide the quiz container and show end container

    toggleVisibility(questionContainer, false);
    toggleVisibility(endContainer, true);

    // Update the score
    document.getElementById("final-score").textContent = quizManager.score;
    document.getElementById("total-questions-end").textContent = quizManager.questions.length;


    // Add event listener to restart the quiz
    restartButton.addEventListener("click", restartQuiz);
}


// ========= EVENT LISTENERS ======



///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

/*



document.getElementById("start-quiz-btn").addEventListener("click", async () => {

    await loadQuestionsFromTopics([]);

    if (questions.length > 0) {
        showQuestion();
    } else {
        alert("2 - There are no questions available in this quiz. Please try again later.");
    }
});




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


*/