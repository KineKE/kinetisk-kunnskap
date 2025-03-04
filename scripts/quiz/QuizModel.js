

export class QuizModel {

    constructor() {
        this.score = 0; // the score for the quiz
        this.questions = []; // array of questions for the quiz
        this.currentQuestionIndex = 0; // index of current question
    }




    /**
     * Resets the quiz state to start over.
     */
    reset() {
        this.currentQuestionIndex = 0;
        this.score = 0;
    }





    /**
     * Loads a set of questions into the quiz.
     * @param {Array} questions - An array of question objects
     */
    loadQuestions(questions) {
        this.questions = questions;
    }




    /**
     * Gets the current question object.
     * @returns {Object} The current question
     */
    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }




    /**
     * Checks if the selected answer is correct.
     * @param {number} selectedOptionIndex - Index of the selected answer
     * @returns {boolean} True if correct, false otherwise
     */
    checkAnswer(selectedOptionIndex) {
        const currentQuestion = this.getCurrentQuestion();
        const isCorrect = selectedOptionIndex === currentQuestion.answer;

        if (isCorrect) {
            this.score++;
        }

        return isCorrect;
    }




    /**
     * Moves to the next question.
     * @returns {boolean} True if there are more questions, false if the quiz is finished
     */
    moveToNextQuestion() {
        this.currentQuestionIndex++;
        return this.currentQuestionIndex < this.questions.length;
    }



    /**
     * Checks if the quiz is finished.
     * @returns {boolean} True if there are no more questions, false otherwise
     */
    isQuizFinished() {
        return this.currentQuestionIndex >= this.questions.length;
    }
}