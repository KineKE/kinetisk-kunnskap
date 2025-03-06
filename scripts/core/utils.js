/**
 * @module utils
 * @description
 * This module provides utility functions for:
 * - DOM manipulation (toggle visibility)
 * - URL parsing (extracting course ID)
 * - Fetching course data from a JSON file
 *
 * These functions are used throughout the application to handle UI interactions and retrieve course-related
 * inforamtion dynamically.
 *
 * @author Kine Kragl Engseth
 * @version 1.0.0
 */


/**
 * Toggles the visibility of an HTML element by adding or removing the `hidden` class
 *
 * @param {string | HTMLElement} element - The target element of its ID.
 * @param {boolean | null} [show=null] - Determines visibility:
 *  <ul>
 *      <li><code>true</code>: Show the element.</li>
 *      <li><code>false</code>: Hide the element. </li>
 *      <li><code>null</code>: Toggle visibility. </li>
 *
 * @returns {void}
 *
 * @example
 * // Toggle visibility
 * toggleVisibility("myElement");
 *
 * // Ensure element is shown
 * toggleVisibility(document.getElementById("myElement"), true);
 */
export function toggleVisibility(element, show = null) {
    if (typeof element === "string") element = document.getElementById(element);
    if (!element) return;

    if (show === null) {
        // If no explicit value is provided, toggle the class
        element.classList.toggle("hidden");
    } else {
        // If show is true, remove 'hidden'; if false, add 'hidden'
        element.classList.toggle("hidden", !show);
    }
}

/**
 * Extracts the course ID from the URL query string.
 *
 * @returns {string | null} - The course ID if found, otherwise `null`.
 *
 * @example
 * // URL: course.html?course=DATA2500
 * console.log(getCourseIdFromURL()); // Outputs: "DATA2500"
 */
export function getCourseIdFromURL() {
    return new URLSearchParams(window.location.search).get('course');
}


/**
 * Fetches course data from a JSON file based on the provided course ID.
 *
 * @async
 * @param {string} courseId - The unique identifier of the course (e.g.,"DATA2500").
 * @returns {Promise<Object|null>} A promise that resolves to the course data object if found, or `null` if not found
 * or on error.
 *
 * @example
 * fetchCourseData("DATA2500")
 *          .then(course => {
 *              if (course) {
 *                  console.log("Course found:", course);
 *              } else {
 *                  console.log("Course not found.");
 *              }
 *          })
 *          .catch(error => console.error("Error fetching course data:", error));
 */
export async function fetchCourseData(courseId){
    try{
        const response = await fetch("scripts/data/courses.json");
        if (!response.ok) throw new Error("Kunne ikke hente data");

        const courses = await response.json();
        return courses[courseId] ?? null; // Return specific course data, or null
    } catch (error) {
        console.error("Feil med å fetche JSON:", error);
        alert("Kunne ikke laste data");
        return null; // Ensure it always returns a safe value
    }
}
