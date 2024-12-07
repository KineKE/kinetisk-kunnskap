// Global variables
let questions = []; // Stores the questions being fetched from the JSON files
let currentQuestionIndex = 0; // Tracks the current question being displayed
let score = 0; // Tracks the user's current score

let flashcards = []; // Stores flashcard data
let currentFlashcardIndex = 0; // Tracks the current flashcard being displayed


// =========================
// Utility Functions
// =========================

/*// Function to fetch questions from a JSON file
async function fetchQuestions() {
    try {
        const response = await fetch('questions.json'); // Adjust the path if needed
        if (!response.ok) {
            throw new Error('Failed to fetch questions.');
        }
        questions = await response.json();
        console.log("Questions loaded:", questions); // For debugging
        showQuestion(); // Start the quiz after fetching questions
    } catch (error) {
        console.error("Error loading questions:", error);
    }
}*/



// Fetch questions based on selected topics
async function loadQuestionsFromTopics(topics) {
    questions = []; // Clear any existing questions

    // temporary code that fetches all questions from questions/temp_questions.json
    try {
        // Fetch questions from temp_questions.json
        const response = await fetch('questions/temp_questions.json');
        if (!response.ok) {
            throw new Error('Failed to fetch questions from temp_questions.json.');
        }
        questions = await response.json();

        console.log("Questions loaded from temp_questions.json:", questions); // Debugging
        if (questions.length === 0) {
            alert("Ingen spørsmål funnet i temp_questions.json.");
            return;
        }
    } catch (error) {
        console.error("Error loading questions from temp_questions.json:", error);
        alert("Det oppsto en feil under lasting av spørsmålene.");
    }


    // Code where the topics are selected
    /*try {
        for (const topic of topics) {
            const response = await fetch(`questions/${topic}`);
            if (!response.ok) {
                throw new Error(`Could not fetch questions from ${topic}`);
            }
            const topicQuestions = await response.json();
            questions = questions.concat(topicQuestions); // Merge questions
        }

        console.log("Questions loaded:", questions); // Debugging
        if (questions.length === 0) {
            alert("Ingen spørsmål funnet for de valgte emnene.");
            return;
        }

    } catch (error) {
        console.error("Error loading questions:", error);
        alert("Det oppsto en feil under lasting av spørsmålene.");
    }*/
}


// =========================
// Quiz Initialization
// =========================


document.getElementById("start-quiz-btn").addEventListener("click", () => {
    console.log("Start button clicked!"); // Check if this logs in the console
    showQuestion();
});


function restartQuiz() {
    // Reset the quiz state
    currentQuestionIndex = 0;
    score = 0;

    // Hide the end screen and show the hero content
    const endContainer = document.getElementById("end-container");
    endContainer.classList.add("hidden");

    const heroContent = document.querySelector(".hero-content");
    heroContent.classList.remove("hidden");

    // Reset and start the quiz
    showQuestion();
}


// =========================
// Question Display
// =========================

function showQuestion() {

    // Logic to display the first question
    const heroSection = document.querySelector(".hero-content");
    heroSection.classList.add("hidden");

    const quizContainer = document.getElementById("quiz-container");
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

/*    function speakMessage(message) {
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.lang = "en-US"; // Set language (e.g., "no-NO" for Norwegian)
        window.speechSynthesis.speak(utterance);
    }*/

/*    // Highlight the correct answer
    const correctButton = buttons[currentQuestion.answer];
    correctButton.classList.add("correct-highlight");

    if (selectedOptionIndex !== currentQuestion.answer) {
        const selectedButton = buttons[selectedOptionIndex];
        selectedButton.classList.add("incorrect-highlight");
        console.log("Selected button classes:", selectedButton.classList);
    }*/


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
    const nextButton = document.getElementById("next-button");
    nextButton.classList.remove("hidden");
}



// =========================
// Navigation Between Questions
// =========================


// =========================
// End of Quiz
// =========================

function endQuiz() {
    const questionContainer = document.getElementById("quiz-container");
    const endContainer = document.getElementById("end-container");

    // Hide the quiz container
    questionContainer.classList.add("hidden");

    // Show the end container
    endContainer.classList.remove("hidden");

    // Update the score
    document.getElementById("final-score").textContent = score;
    document.getElementById("total-questions-end").textContent = questions.length;

    // Add event listener to restart the quiz
    const restartButton = document.getElementById("restart-quiz-btn");
    restartButton.addEventListener("click", restartQuiz);
}

// =========================
// Event Listeners
// =========================

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

/*
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
});*/

/*document.getElementById("start-quiz-btn").addEventListener("click", () => {
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
});*/


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
// Debugging and Testing
// =========================



// _______

async function loadFlashcardsFromTopics(topics) {
    flashcards = []; // Clear any existing flashcards

    try {
        // Temporary: Fetch all flashcards from a file
        const response = await fetch('flashcards/temp_flashcards.json');
        if (!response.ok) {
            throw new Error('Failed to fetch flashcards.');
        }
        flashcards = await response.json();
        console.log("Flashcards loaded:", flashcards);
        if (flashcards.length === 0) {
            alert("No flashcards found.");
        }
    } catch (error) {
        console.error("Error loading flashcards:", error);
        alert("Failed to load flashcards.");
    }
}


function showFlashcard() {
    if (flashcards.length === 0) {
        alert("No flashcards available.");
        return;
    }

    const flashcardFront = document.getElementById("flashcard-front");
    const flashcardBack = document.getElementById("flashcard-back");

    const currentFlashcard = flashcards[currentFlashcardIndex];
    flashcardFront.textContent = currentFlashcard.question; // Question or term
    flashcardBack.textContent = currentFlashcard.answer; // Answer or definition
}


document.getElementById("flip-flashcard").addEventListener("click", () => {
    const flashcard = document.getElementById("flashcard");
    flashcard.classList.toggle("flip");
});


document.getElementById("prev-flashcard").addEventListener("click", () => {
    if (currentFlashcardIndex > 0) {
        currentFlashcardIndex--;
        showFlashcard();
    }
});

document.getElementById("next-flashcard").addEventListener("click", () => {
    if (currentFlashcardIndex < flashcards.length - 1) {
        currentFlashcardIndex++;
        showFlashcard();
    }
});

document.getElementById("back-to-menu").addEventListener("click", () => {
    document.getElementById("flashcard-container").classList.add("hidden");
    document.querySelector(".hero-content").classList.remove("hidden");
});


document.getElementById("start-flashcards-btn").addEventListener("click", async () => {
    document.querySelector(".hero-content").classList.add("hidden");
    document.getElementById("flashcard-container").classList.remove("hidden");

    await loadFlashcardsFromTopics([]); // Load flashcards
    if (flashcards.length > 0) {
        currentFlashcardIndex = 0;
        showFlashcard();
    }
});




