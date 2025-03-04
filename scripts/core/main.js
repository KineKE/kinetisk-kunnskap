/*
This module will handle starting events, such as the quiz or the flashcards.
Will also handle toggling elements on a large scale
 */


// ============== IMPORT STATEMENTS ===============

// Import statements
import { startQuiz } from "../quiz/quizController.js";
import { toggleVisibility, fetchCourseData, getCourseFromURL } from "./utils.js";


// ============== UPDATE DOM =================

async function updateDOM(){
    const courseId = getCourseFromURL();
    console.log("Course: " + courseId);
    const courseFetch =  await fetchCourseData(); // needs 'await' to resolve the promise from fetchCourseData()
    console.log(courseFetch);

    const title = document.querySelector("title");
    const header = document.querySelector("h1");

    try {
        // Check if the courses exist in the JSON file
        if (courseFetch[courseId]) {
            const courseData = courseFetch[courseId];
            console.log("courseData-title: " + courseData.title);
            console.log("courseData-h1: " + courseData.h1);

            // Update the page with course data
            title.textContent = courseData.title;
            header.textContent = courseData.h1;

        } else {
            // Handle invalid course
            title.textContent = "Fag ikke funnet";
            header.textContent = "Faget eksisterer ikke"
        }
    } catch (error) {
        // Handle fetch or JSON errors
        title.textContent = "Problemer med å laste inn tittel";
        header.textContent = "Problemer med å laste inn emneinfo";
        console.error("Feil med å fetche JSON:", error);
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    await updateDOM();
});

// ================= STARTING MCQ ================

document.getElementById('start-quiz-btn').addEventListener('click', () => {
    const heroContainer = document.getElementById('hero-container');
    const quizContainer = document.getElementById('quiz-container');

    // Switch UI: hide hero, show quiz container
    toggleVisibility(heroContainer, false);
    toggleVisibility(quizContainer, true);

    // Start the quiz with course content
    startQuiz();
});

