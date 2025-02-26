/*
This module will handle starting events, such as the quiz or the flashcards.
Will also handle toggling elements on a large scale
 */

// Import statements

import { startQuiz } from "./quiz.js";
import { toggleVisibility } from "./utils.js";
import { updateDOM } from './course.js';


// Starting MCQ
document.getElementById('start-quiz-btn').addEventListener('click', () => {
    const heroContainer = document.getElementById('hero-container');
    const quizContainer = document.getElementById('quiz-container');

    // Switch UI: hide hero, show quiz container
    toggleVisibility(heroContainer, false);
    toggleVisibility(quizContainer, true);

    // Start the quiz with course content
    startQuiz();
});


document.addEventListener('DOMContentLoaded', async () => {
    await updateDOM();
})
