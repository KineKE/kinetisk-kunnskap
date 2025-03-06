

// =========== IMPORTS, VARIABLES ETC ============

// Import statements
import { QuizModel } from "./QuizModel.js";
//import {} from "./quizView";

import { toggleVisibility } from "../core/utils.js";

// Creating an instance of the quizModel class
const quizModel = new QuizModel();




// ------------------------------------------

function getDOMElements() {
    return {
        title: document.querySelector("title"),
        header: document.querySelector("h1"),
        heroContainer: document.getElementById('hero-container'),
        quizContainer: document.getElementById('quiz-container'),
        startQuizBtn: document.getElementById('start-quiz-btn'),
        feedback: document.getElementById('feedback'),
        nextButton: document.getElementById('next-button'),
        endContainer: document.getElementById('end-container'),
        questionTitle: document.getElementById('question-title'),
        optionsContainer: document.getElementById('options'),
        questionContainer: document.getElementById('question-container'),
        restartButton: document.getElementById("restart-quiz-btn")
    };
}


export function showQuestion() {

    const currentQuestion = quizModel.getCurrentQuestion();

    document.getElementById("question-title").textContent = quizModel.questions[quizModel.currentQuestionIndex].question;
    document.getElementById("current-question").textContent = quizModel.currentQuestionIndex + 1;
    document.getElementById("total-questions").textContent = quizModel.questions.length;

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