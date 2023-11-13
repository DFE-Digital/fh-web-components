//todo: make it a standard govuk module?
//import { GOVUKFrontendComponent } from '../../govuk-frontend-component.mjs'
export class OpenCloseButton {
    constructor(openCloseButton) {
        //super();
        //if (!(openCloseButton instanceof HTMLButtonElement)) {
        //}
        this.openCloseButton = openCloseButton;
        const targetId = this.openCloseButton.getAttribute('data-open-close-mobile');
        this.target = document.getElementById(targetId);
        //todo: better to use content or have data-open-close-mobile-show?
        this.showText = this.openCloseButton.textContent;
        this.hideText = this.openCloseButton.getAttribute('data-open-close-mobile-hide');
        this.target.classList.add('fh-open-close-target');
        let defaultTargetVisibility = this.openCloseButton.getAttribute('data-open-close-mobile-default');
        if (defaultTargetVisibility === "hide") {
            this.hideTarget();
        }
        else {
            this.showTarget();
        }
        //let defaultTargetVisibility = this.openCloseButton.getAttribute('data-open-close-mobile-default');
        //const isTablet = window.matchMedia("(max-width: 640px)").matches;
        //if (isTablet) {
        //    if (defaultTargetVisibility === "hide") {
        //        this.hideTarget();
        //    } else {
        //        this.showTarget();
        //    }
        //}
        this.openCloseButton.addEventListener('click', (event) => this.handleClick(event));
    }
    handleClick(event) {
        //todo: check for the class instead?
        //if (this.target && getComputedStyle(this.target).display === "none") {
        //if (this.target && this.target.style.display === "none") {
        if (this.target.classList.contains('fh-open-close-target-user-opened')) {
            this.hideTarget();
        }
        else {
            this.showTarget();
        }
    }
    showTarget() {
        if (this.target) {
            /*todo: add a class instead of manipulating display directly, can then ensure it only has an effect in mobile/tablet*/
            //this.target.style.display = "block";
            if (!this.target.classList.contains('fh-open-close-target-user-opened')) {
                this.target.classList.add('fh-open-close-target-user-opened');
            }
        }
        if (this.hideText) {
            this.openCloseButton.textContent = this.hideText;
        }
    }
    hideTarget() {
        if (this.target) {
            //this.target.style.display = "none";
            this.target.classList.remove('fh-open-close-target-user-opened');
        }
        if (this.showText) {
            this.openCloseButton.textContent = this.showText;
        }
    }
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvb3Blbi1jbG9zZS1idXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsd0NBQXdDO0FBQ3hDLDZFQUE2RTtBQUU3RSxNQUFNLE9BQU8sZUFBZTtJQU94QixZQUFZLGVBQWtDO1FBQzFDLFVBQVU7UUFFVix3REFBd0Q7UUFDeEQsR0FBRztRQUVILElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVMsQ0FBdUIsQ0FBQztRQUV2RSxrRUFBa0U7UUFDbEUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQztRQUNqRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFFakYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFFbEQsSUFBSSx1QkFBdUIsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQ2xHLElBQUksdUJBQXVCLEtBQUssTUFBTSxFQUFFO1lBQ3BDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNyQjthQUFNO1lBQ0gsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3JCO1FBRUQsb0dBQW9HO1FBRXBHLG1FQUFtRTtRQUVuRSxpQkFBaUI7UUFDakIsK0NBQStDO1FBQy9DLDRCQUE0QjtRQUM1QixjQUFjO1FBQ2QsNEJBQTRCO1FBQzVCLE9BQU87UUFDUCxHQUFHO1FBRUgsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQVk7UUFDcEIsb0NBQW9DO1FBQ3BDLHdFQUF3RTtRQUN4RSw0REFBNEQ7UUFFNUQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsa0NBQWtDLENBQUMsRUFBRTtZQUNwRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckI7YUFBTTtZQUNILElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNyQjtJQUNMLENBQUM7SUFFRCxVQUFVO1FBQ04sSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2Isc0hBQXNIO1lBQ3RILHNDQUFzQztZQUV0QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGtDQUFrQyxDQUFDLEVBQUU7Z0JBQ3JFLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO2FBQ2pFO1NBQ0o7UUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ3BEO0lBQ0wsQ0FBQztJQUNELFVBQVU7UUFDTixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDYixxQ0FBcUM7WUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7U0FDcEU7UUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ3BEO0lBQ0wsQ0FBQztDQUtKIiwiZmlsZSI6ImNvbXBvbmVudHMvb3Blbi1jbG9zZS1idXR0b24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL3RvZG86IG1ha2UgaXQgYSBzdGFuZGFyZCBnb3Z1ayBtb2R1bGU/XHJcbi8vaW1wb3J0IHsgR09WVUtGcm9udGVuZENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2dvdnVrLWZyb250ZW5kLWNvbXBvbmVudC5tanMnXHJcblxyXG5leHBvcnQgY2xhc3MgT3BlbkNsb3NlQnV0dG9uIHsgLy8gZXh0ZW5kcyBHT1ZVS0Zyb250ZW5kQ29tcG9uZW50IHtcclxuXHJcbiAgICBvcGVuQ2xvc2VCdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgdGFyZ2V0OiBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICBzaG93VGV4dDogc3RyaW5nIHwgbnVsbDtcclxuICAgIGhpZGVUZXh0OiBzdHJpbmcgfCBudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9wZW5DbG9zZUJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgICAvL3N1cGVyKCk7XHJcblxyXG4gICAgICAgIC8vaWYgKCEob3BlbkNsb3NlQnV0dG9uIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpKSB7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIHRoaXMub3BlbkNsb3NlQnV0dG9uID0gb3BlbkNsb3NlQnV0dG9uO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldElkID0gdGhpcy5vcGVuQ2xvc2VCdXR0b24uZ2V0QXR0cmlidXRlKCdkYXRhLW9wZW4tY2xvc2UtbW9iaWxlJyk7XHJcbiAgICAgICAgdGhpcy50YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXRJZCEpIGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcclxuXHJcbiAgICAgICAgLy90b2RvOiBiZXR0ZXIgdG8gdXNlIGNvbnRlbnQgb3IgaGF2ZSBkYXRhLW9wZW4tY2xvc2UtbW9iaWxlLXNob3c/XHJcbiAgICAgICAgdGhpcy5zaG93VGV4dCA9IHRoaXMub3BlbkNsb3NlQnV0dG9uLnRleHRDb250ZW50O1xyXG4gICAgICAgIHRoaXMuaGlkZVRleHQgPSB0aGlzLm9wZW5DbG9zZUJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtb3Blbi1jbG9zZS1tb2JpbGUtaGlkZScpO1xyXG5cclxuICAgICAgICB0aGlzLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdmaC1vcGVuLWNsb3NlLXRhcmdldCcpO1xyXG5cclxuICAgICAgICBsZXQgZGVmYXVsdFRhcmdldFZpc2liaWxpdHkgPSB0aGlzLm9wZW5DbG9zZUJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtb3Blbi1jbG9zZS1tb2JpbGUtZGVmYXVsdCcpO1xyXG4gICAgICAgIGlmIChkZWZhdWx0VGFyZ2V0VmlzaWJpbGl0eSA9PT0gXCJoaWRlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlVGFyZ2V0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93VGFyZ2V0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2xldCBkZWZhdWx0VGFyZ2V0VmlzaWJpbGl0eSA9IHRoaXMub3BlbkNsb3NlQnV0dG9uLmdldEF0dHJpYnV0ZSgnZGF0YS1vcGVuLWNsb3NlLW1vYmlsZS1kZWZhdWx0Jyk7XHJcblxyXG4gICAgICAgIC8vY29uc3QgaXNUYWJsZXQgPSB3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDY0MHB4KVwiKS5tYXRjaGVzO1xyXG5cclxuICAgICAgICAvL2lmIChpc1RhYmxldCkge1xyXG4gICAgICAgIC8vICAgIGlmIChkZWZhdWx0VGFyZ2V0VmlzaWJpbGl0eSA9PT0gXCJoaWRlXCIpIHtcclxuICAgICAgICAvLyAgICAgICAgdGhpcy5oaWRlVGFyZ2V0KCk7XHJcbiAgICAgICAgLy8gICAgfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgICAgdGhpcy5zaG93VGFyZ2V0KCk7XHJcbiAgICAgICAgLy8gICAgfVxyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICB0aGlzLm9wZW5DbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4gdGhpcy5oYW5kbGVDbGljayhldmVudCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNsaWNrKGV2ZW50OiBFdmVudCkge1xyXG4gICAgICAgIC8vdG9kbzogY2hlY2sgZm9yIHRoZSBjbGFzcyBpbnN0ZWFkP1xyXG4gICAgICAgIC8vaWYgKHRoaXMudGFyZ2V0ICYmIGdldENvbXB1dGVkU3R5bGUodGhpcy50YXJnZXQpLmRpc3BsYXkgPT09IFwibm9uZVwiKSB7XHJcbiAgICAgICAgLy9pZiAodGhpcy50YXJnZXQgJiYgdGhpcy50YXJnZXQuc3R5bGUuZGlzcGxheSA9PT0gXCJub25lXCIpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZmgtb3Blbi1jbG9zZS10YXJnZXQtdXNlci1vcGVuZWQnKSkge1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVUYXJnZXQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dUYXJnZXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1RhcmdldCgpIHtcclxuICAgICAgICBpZiAodGhpcy50YXJnZXQpIHtcclxuICAgICAgICAgICAgLyp0b2RvOiBhZGQgYSBjbGFzcyBpbnN0ZWFkIG9mIG1hbmlwdWxhdGluZyBkaXNwbGF5IGRpcmVjdGx5LCBjYW4gdGhlbiBlbnN1cmUgaXQgb25seSBoYXMgYW4gZWZmZWN0IGluIG1vYmlsZS90YWJsZXQqL1xyXG4gICAgICAgICAgICAvL3RoaXMudGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZmgtb3Blbi1jbG9zZS10YXJnZXQtdXNlci1vcGVuZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZmgtb3Blbi1jbG9zZS10YXJnZXQtdXNlci1vcGVuZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5oaWRlVGV4dCkge1xyXG4gICAgICAgICAgICB0aGlzLm9wZW5DbG9zZUJ1dHRvbi50ZXh0Q29udGVudCA9IHRoaXMuaGlkZVRleHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaGlkZVRhcmdldCgpIHtcclxuICAgICAgICBpZiAodGhpcy50YXJnZXQpIHtcclxuICAgICAgICAgICAgLy90aGlzLnRhcmdldC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2ZoLW9wZW4tY2xvc2UtdGFyZ2V0LXVzZXItb3BlbmVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnNob3dUZXh0KSB7XHJcbiAgICAgICAgICAgIHRoaXMub3BlbkNsb3NlQnV0dG9uLnRleHRDb250ZW50ID0gdGhpcy5zaG93VGV4dDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIE5hbWUgZm9yIHRoZSBjb21wb25lbnQgdXNlZCB3aGVuIGluaXRpYWxpc2luZyB1c2luZyBkYXRhLW1vZHVsZSBhdHRyaWJ1dGVzLlxyXG4gICAgICovXHJcbi8qICAgIHN0YXRpYyBtb2R1bGVOYW1lID0gJ29wZW4tY2xvc2UtYnV0dG9uJzsqL1xyXG59XHJcbiJdfQ==
