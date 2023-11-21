import { nodeListForEach } from './helpers';
export function initializeBackButtons() {
    // Check if the page wasn't opened in a new tab or a standalone window
    if (history.length > 1) {
        const backLinks = document.querySelectorAll(".fh-back-link");
        nodeListForEach(backLinks, (link) => {
            link.style.display = "block";
            // Add an event listener to handle the back button click
            link.addEventListener("click", () => {
                // Go back to the previous page in the browser's history
                window.history.back();
            });
        });
    }
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYmFjay1saW5rcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sV0FBVyxDQUFBO0FBRTNDLE1BQU0sVUFBVSxxQkFBcUI7SUFFakMsc0VBQXNFO0lBQ3RFLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUVyQixNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDN0QsZUFBZSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQXVCLEVBQUUsRUFBRTtZQUVuRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFFN0Isd0RBQXdEO1lBQ3hELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO2dCQUNoQyx3REFBd0Q7Z0JBQ3hELE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7QUFDTCxDQUFDIiwiZmlsZSI6ImNvbXBvbmVudHMvYmFjay1saW5rcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG5vZGVMaXN0Rm9yRWFjaCB9IGZyb20gJy4vaGVscGVycydcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplQmFja0J1dHRvbnMoKTogdm9pZCB7XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgdGhlIHBhZ2Ugd2Fzbid0IG9wZW5lZCBpbiBhIG5ldyB0YWIgb3IgYSBzdGFuZGFsb25lIHdpbmRvd1xyXG4gICAgaWYgKGhpc3RvcnkubGVuZ3RoID4gMSkge1xyXG5cclxuICAgICAgICBjb25zdCBiYWNrTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZoLWJhY2stbGlua1wiKTtcclxuICAgICAgICBub2RlTGlzdEZvckVhY2goYmFja0xpbmtzLCAobGluazogSFRNTEFuY2hvckVsZW1lbnQpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGxpbmsuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuXHJcbiAgICAgICAgICAgIC8vIEFkZCBhbiBldmVudCBsaXN0ZW5lciB0byBoYW5kbGUgdGhlIGJhY2sgYnV0dG9uIGNsaWNrXHJcbiAgICAgICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIEdvIGJhY2sgdG8gdGhlIHByZXZpb3VzIHBhZ2UgaW4gdGhlIGJyb3dzZXIncyBoaXN0b3J5XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19
