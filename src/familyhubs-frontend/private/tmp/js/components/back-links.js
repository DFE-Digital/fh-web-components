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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYmFjay1saW5rcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sV0FBVyxDQUFBO0FBRTNDLE1BQU0sVUFBVSxxQkFBcUI7SUFFakMsc0VBQXNFO0lBQ3RFLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFFcEIsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzdELGVBQWUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUF1QixFQUFFLEVBQUU7WUFFbkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBRTdCLHdEQUF3RDtZQUN4RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtnQkFDaEMsd0RBQXdEO2dCQUN4RCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7S0FDTjtBQUNMLENBQUMiLCJmaWxlIjoiY29tcG9uZW50cy9iYWNrLWxpbmtzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbm9kZUxpc3RGb3JFYWNoIH0gZnJvbSAnLi9oZWxwZXJzJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemVCYWNrQnV0dG9ucygpOiB2b2lkIHtcclxuXHJcbiAgICAvLyBDaGVjayBpZiB0aGUgcGFnZSB3YXNuJ3Qgb3BlbmVkIGluIGEgbmV3IHRhYiBvciBhIHN0YW5kYWxvbmUgd2luZG93XHJcbiAgICBpZiAoaGlzdG9yeS5sZW5ndGggPiAxKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGJhY2tMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZmgtYmFjay1saW5rXCIpO1xyXG4gICAgICAgIG5vZGVMaXN0Rm9yRWFjaChiYWNrTGlua3MsIChsaW5rOiBIVE1MQW5jaG9yRWxlbWVudCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgbGluay5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG5cclxuICAgICAgICAgICAgLy8gQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIGhhbmRsZSB0aGUgYmFjayBidXR0b24gY2xpY2tcclxuICAgICAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gR28gYmFjayB0byB0aGUgcHJldmlvdXMgcGFnZSBpbiB0aGUgYnJvd3NlcidzIGhpc3RvcnlcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iXX0=
