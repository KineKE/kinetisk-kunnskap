// Global variables
let questions = []; // Stores the questions being fetched from the JSON files
let currentQuestionIndex = 0; // Tracks the current question being displayed
let score = 0; // Tracks the user's current score



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


