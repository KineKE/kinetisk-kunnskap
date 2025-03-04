// imports
import { loadData, toggleVisibility } from '../core/utils.js';


// global variables
let flashcards = []; // Stores flashcard data
let currentFlashcardIndex = 0; // Tracks the current flashcard being displayed



// laster inn flashcards fra en specifikk hardcoda path
export async function startFlashcards() {
    toggleVisibility('hero-content', false);
    toggleVisibility('flashcard-container', true);

    flashcards = []; // Clear any existing flashcards

    // TODO fiks denne pathen så den ikke er hardcoda
    flashcards = await loadData('../assets/flashcards/DAFE2200/temp_flashcards.json');
    if (flashcards.length > 0) {
        currentFlashcardIndex = 0;
        showFlashcard();
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


const test =

