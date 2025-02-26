
export function toggleVisibility(elementId, show) {
    if (show) {
        elementId.classList.remove("hidden");
    } else {
        elementId.classList.add("hidden");
    }
}

// Parse the URL to get the course parameter
export function getCourseFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('course');
}

// Fetch course data from JSON
export async function fetchCourseData(){
    try{
        const response = await fetch("courses.json");
        if (!response.ok) throw new Error("Kunne ikke hente data")
        return await response.json();
    } catch (error) {
        console.error("Feil med å fetche JSON:", error);
        alert("Kunne ikke laste data");
    }
}
