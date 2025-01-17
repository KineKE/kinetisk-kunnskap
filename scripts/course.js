import { fetchCourseData, getCourseFromURL} from "./utils.js";

export async function updateDOM(){
    const courseId = getCourseFromURL();
    console.log("Course: " + courseId);
    const courseFetch = await fetchCourseData();
    console.log(courseFetch);

    const title = document.querySelector("title");
    const header = document.querySelector("h1");

    try {
        // Check if the courses exist in the JSON file
        console.log("I am inside the try-block")
        if (courseFetch[courseId]) {
            console.log("I have found the course information")
            const courseData = courseFetch[courseId];
            console.log("courseData-title: " + courseData.title);
            console.log("courseData-h1: " + courseData.h1);

            // Update the page with course data
            title.textContent = courseData.title;
            header.textContent = courseData.h1;


        } else {
            console.log("I am in the else-section")
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
