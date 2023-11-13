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
        this.showText = this.openCloseButton.textContent;
        this.hideText = this.openCloseButton.getAttribute('data-open-close-mobile-hide');
        let defaultTargetVisibility = this.openCloseButton.getAttribute('data-open-close-mobile-default');
        if (defaultTargetVisibility === "hide") {
            this.hideTarget();
        }
        else {
            this.showTarget();
        }
        this.openCloseButton.addEventListener('click', (event) => this.handleClick(event));
    }
    handleClick(event) {
        if (this.target && this.target.style.display === "none") {
            this.showTarget();
        }
        else {
            this.hideTarget();
        }
    }
    showTarget() {
        if (this.target) {
            this.target.style.display = "block";
        }
        if (this.hideText) {
            this.openCloseButton.textContent = this.hideText;
        }
    }
    hideTarget() {
        if (this.target) {
            this.target.style.display = "none";
        }
        if (this.showText) {
            this.openCloseButton.textContent = this.showText;
        }
    }
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvb3Blbi1jbG9zZS1idXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsd0NBQXdDO0FBQ3hDLDZFQUE2RTtBQUU3RSxNQUFNLE9BQU8sZUFBZTtJQU94QixZQUFZLGVBQWtDO1FBQzFDLFVBQVU7UUFFVix3REFBd0Q7UUFDeEQsR0FBRztRQUVILElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVMsQ0FBdUIsQ0FBQztRQUV2RSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDO1FBQ2pELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUVqRixJQUFJLHVCQUF1QixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFDbEcsSUFBSSx1QkFBdUIsS0FBSyxNQUFNLEVBQUU7WUFDcEMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3JCO2FBQU07WUFDSCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckI7UUFFRCxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBWTtRQUNwQixJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLE1BQU0sRUFBRTtZQUNyRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckI7YUFBTTtZQUNILElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNyQjtJQUNMLENBQUM7SUFFRCxVQUFVO1FBQ04sSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztTQUN2QztRQUNELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDcEQ7SUFDTCxDQUFDO0lBQ0QsVUFBVTtRQUNOLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7U0FDdEM7UUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ3BEO0lBQ0wsQ0FBQztDQUtKIiwiZmlsZSI6ImNvbXBvbmVudHMvb3Blbi1jbG9zZS1idXR0b24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL3RvZG86IG1ha2UgaXQgYSBzdGFuZGFyZCBnb3Z1ayBtb2R1bGU/XHJcbi8vaW1wb3J0IHsgR09WVUtGcm9udGVuZENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2dvdnVrLWZyb250ZW5kLWNvbXBvbmVudC5tanMnXHJcblxyXG5leHBvcnQgY2xhc3MgT3BlbkNsb3NlQnV0dG9uIHsgLy8gZXh0ZW5kcyBHT1ZVS0Zyb250ZW5kQ29tcG9uZW50IHtcclxuXHJcbiAgICBvcGVuQ2xvc2VCdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgdGFyZ2V0OiBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICBzaG93VGV4dDogc3RyaW5nIHwgbnVsbDtcclxuICAgIGhpZGVUZXh0OiBzdHJpbmcgfCBudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9wZW5DbG9zZUJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgICAvL3N1cGVyKCk7XHJcblxyXG4gICAgICAgIC8vaWYgKCEob3BlbkNsb3NlQnV0dG9uIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpKSB7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIHRoaXMub3BlbkNsb3NlQnV0dG9uID0gb3BlbkNsb3NlQnV0dG9uO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldElkID0gdGhpcy5vcGVuQ2xvc2VCdXR0b24uZ2V0QXR0cmlidXRlKCdkYXRhLW9wZW4tY2xvc2UtbW9iaWxlJyk7XHJcbiAgICAgICAgdGhpcy50YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXRJZCEpIGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5zaG93VGV4dCA9IHRoaXMub3BlbkNsb3NlQnV0dG9uLnRleHRDb250ZW50O1xyXG4gICAgICAgIHRoaXMuaGlkZVRleHQgPSB0aGlzLm9wZW5DbG9zZUJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtb3Blbi1jbG9zZS1tb2JpbGUtaGlkZScpO1xyXG5cclxuICAgICAgICBsZXQgZGVmYXVsdFRhcmdldFZpc2liaWxpdHkgPSB0aGlzLm9wZW5DbG9zZUJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtb3Blbi1jbG9zZS1tb2JpbGUtZGVmYXVsdCcpO1xyXG4gICAgICAgIGlmIChkZWZhdWx0VGFyZ2V0VmlzaWJpbGl0eSA9PT0gXCJoaWRlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlVGFyZ2V0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93VGFyZ2V0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm9wZW5DbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4gdGhpcy5oYW5kbGVDbGljayhldmVudCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNsaWNrKGV2ZW50OiBFdmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRhcmdldCAmJiB0aGlzLnRhcmdldC5zdHlsZS5kaXNwbGF5ID09PSBcIm5vbmVcIikge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dUYXJnZXQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVUYXJnZXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1RhcmdldCgpIHtcclxuICAgICAgICBpZiAodGhpcy50YXJnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaGlkZVRleHQpIHtcclxuICAgICAgICAgICAgdGhpcy5vcGVuQ2xvc2VCdXR0b24udGV4dENvbnRlbnQgPSB0aGlzLmhpZGVUZXh0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGhpZGVUYXJnZXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc2hvd1RleHQpIHtcclxuICAgICAgICAgICAgdGhpcy5vcGVuQ2xvc2VCdXR0b24udGV4dENvbnRlbnQgPSB0aGlzLnNob3dUZXh0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogTmFtZSBmb3IgdGhlIGNvbXBvbmVudCB1c2VkIHdoZW4gaW5pdGlhbGlzaW5nIHVzaW5nIGRhdGEtbW9kdWxlIGF0dHJpYnV0ZXMuXHJcbiAgICAgKi9cclxuLyogICAgc3RhdGljIG1vZHVsZU5hbWUgPSAnb3Blbi1jbG9zZS1idXR0b24nOyovXHJcbn1cclxuIl19
