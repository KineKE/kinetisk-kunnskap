/**
 * @jest-environment jsdom
 */
import { toggleVisibility, getCourseIdFromURL, fetchCourseData } from "../scripts/core/utils.js";

// ✅ Mocking `fetch`
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () =>
            Promise.resolve({
                DATA2500: { title: "DATA2500 - Operativsystemer", h1: "Velkommen til DATA2500" },
            }),
    })
);

describe("toggleVisibility", () => {
    let element;

    beforeEach(() => {
        document.body.innerHTML = '<div id="testElement" class="hidden"></div>';
        element = document.getElementById("testElement");
    });

    test("toggles visibility", () => {
        toggleVisibility(element);
        expect(element.classList.contains("hidden")).toBe(false);

        toggleVisibility(element);
        expect(element.classList.contains("hidden")).toBe(true);
    });

    test("shows element when explicitly passed true", () => {
        toggleVisibility(element, true);
        expect(element.classList.contains("hidden")).toBe(false);
    });

    test("hides element when explicitly passed false", () => {
        toggleVisibility(element, false);
        expect(element.classList.contains("hidden")).toBe(true);
    });

    test("does nothing if element does not exist", () => {
        expect(() => toggleVisibility(null)).not.toThrow();
    });
});

describe("getCourseIdFromURL", () => {
    test("extracts course ID from URL", () => {
        Object.defineProperty(window, "location", {
            value: new URL("http://localhost/course.html?course=DATA2500"),
            writable: true,
        });

        expect(getCourseIdFromURL()).toBe("DATA2500");
    });

    test("returns null if no course ID is present", () => {
        Object.defineProperty(window, "location", {
            value: new URL("http://localhost/course.html"),
            writable: true,
        });

        expect(getCourseIdFromURL()).toBeNull();
    });
});

describe("fetchCourseData", () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test("fetches correct course data", async () => {
        const course = await fetchCourseData("DATA2500");
        expect(course).toEqual({
            title: "DATA2500 - Operativsystemer",
            h1: "Velkommen til DATA2500",
        });
    });

    test("returns null for non-existent course", async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve({}) }));
        const course = await fetchCourseData("INVALID");
        expect(course).toBeNull();
    });

    test("handles fetch errors gracefully", async () => {
        fetch.mockImplementationOnce(() => Promise.reject(new Error("Network error")));
        const course = await fetchCourseData("DATA2500");
        expect(course).toBeNull();
    });
});
