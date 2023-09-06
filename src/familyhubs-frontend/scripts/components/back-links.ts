import { nodeListForEach } from './helpers'

export function initializeBackButtons(): void {

    // Check if the page wasn't opened in a new tab or a standalone window
    if (history.length > 1) {

        const backLinks = document.querySelectorAll(".fh-back-link");
        nodeListForEach(backLinks, (link: HTMLAnchorElement) => {

            link.style.display = "block";

            // Add an event listener to handle the back button click
            link.addEventListener("click", () => {
                // Go back to the previous page in the browser's history
                window.history.back();
            });
        });
    }
}