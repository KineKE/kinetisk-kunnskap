


// ============== IMPORTS AND VARIABLES ===============

import { startQuiz } from "../quiz/quizController.js";
import { toggleVisibility, fetchCourseData, getCourseIdFromURL } from "./utils.js";


// ============== DOM ELEMENT SELECTION ==============

    const DOMElements= {
        title: document.querySelector("title"),
        header: document.querySelector("h1"),
        heroContainer: document.getElementById('hero-container'),
        quizContainer: document.getElementById('quiz-container'),
        startQuizBtn: document.getElementById('start-quiz-btn'),
    };


// ============== UPDATE DOM =================

async function updateDOM(){

    // setting DOM elements
    const { title, header } = DOMElements;
    const courseId = getCourseIdFromURL();

    if (!courseId) {
        console.error("No course ID found in URL.");
        return;
    }

    try {
        const courseData = await fetchCourseData(courseId);

        // Check if the courses exist in the JSON file
        if (courseData) {
            title.textContent = courseData.title;
            header.textContent = courseData.h1;
        } else {
            title.textContent = "Fag ikke funnet";
            header.textContent = "Faget eksisterer ikke"
        }
    } catch (error) {
        title.textContent = "Problemer med å laste inn tittel";
        header.textContent = "Problemer med å laste inn emneinfo";
        console.error("Feil med å fetche JSON:", error);
    }
}


// ================= STARTING QUIZ ================

function initiateQuiz() {

    const { heroContainer, quizContainer } = DOMElements;

    // Switch UI: hide hero, show quiz container
    toggleVisibility(heroContainer, false);
    toggleVisibility(quizContainer, true);

    // Start the quiz with course content
    startQuiz();
}


// ================= EVENT LISTENERS ================

document.addEventListener('DOMContentLoaded', async () => {
    await updateDOM();
});
document.getElementById('start-quiz-btn').addEventListener('click', initiateQuiz);



