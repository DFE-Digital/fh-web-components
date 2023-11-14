//todo: make it a standard govuk module?
//import { GOVUKFrontendComponent } from '../../govuk-frontend-component.mjs'
/*todo: rename fh-open-close-target-user-opened fh-open-close-target-open-non-desktop or somesuch */
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
        this.target.classList.add('fh-open-close-target');
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
        if (this.target.classList.contains('fh-open-close-target-user-opened')) {
            this.hideTarget();
        }
        else {
            this.showTarget();
        }
    }
    showTarget() {
        if (this.target) {
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
            this.target.classList.remove('fh-open-close-target-user-opened');
        }
        if (this.showText) {
            this.openCloseButton.textContent = this.showText;
        }
    }
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvb3Blbi1jbG9zZS1idXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsd0NBQXdDO0FBQ3hDLDZFQUE2RTtBQUU3RSxvR0FBb0c7QUFFcEcsTUFBTSxPQUFPLGVBQWU7SUFPeEIsWUFBWSxlQUFrQztRQUMxQyxVQUFVO1FBRVYsd0RBQXdEO1FBQ3hELEdBQUc7UUFFSCxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUN2QyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFTLENBQXVCLENBQUM7UUFFdkUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQztRQUNqRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFFakYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFFbEQsSUFBSSx1QkFBdUIsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQ2xHLElBQUksdUJBQXVCLEtBQUssTUFBTSxFQUFFO1lBQ3BDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNyQjthQUFNO1lBQ0gsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3JCO1FBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQVk7UUFDcEIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsa0NBQWtDLENBQUMsRUFBRTtZQUNwRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckI7YUFBTTtZQUNILElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNyQjtJQUNMLENBQUM7SUFFRCxVQUFVO1FBQ04sSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxrQ0FBa0MsQ0FBQyxFQUFFO2dCQUNyRSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsa0NBQWtDLENBQUMsQ0FBQzthQUNqRTtTQUNKO1FBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUNwRDtJQUNMLENBQUM7SUFDRCxVQUFVO1FBQ04sSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7U0FDcEU7UUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ3BEO0lBQ0wsQ0FBQztDQUtKIiwiZmlsZSI6ImNvbXBvbmVudHMvb3Blbi1jbG9zZS1idXR0b24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL3RvZG86IG1ha2UgaXQgYSBzdGFuZGFyZCBnb3Z1ayBtb2R1bGU/XHJcbi8vaW1wb3J0IHsgR09WVUtGcm9udGVuZENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2dvdnVrLWZyb250ZW5kLWNvbXBvbmVudC5tanMnXHJcblxyXG4vKnRvZG86IHJlbmFtZSBmaC1vcGVuLWNsb3NlLXRhcmdldC11c2VyLW9wZW5lZCBmaC1vcGVuLWNsb3NlLXRhcmdldC1vcGVuLW5vbi1kZXNrdG9wIG9yIHNvbWVzdWNoICovXHJcblxyXG5leHBvcnQgY2xhc3MgT3BlbkNsb3NlQnV0dG9uIHsgLy8gZXh0ZW5kcyBHT1ZVS0Zyb250ZW5kQ29tcG9uZW50IHtcclxuXHJcbiAgICBvcGVuQ2xvc2VCdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgdGFyZ2V0OiBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICBzaG93VGV4dDogc3RyaW5nIHwgbnVsbDtcclxuICAgIGhpZGVUZXh0OiBzdHJpbmcgfCBudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9wZW5DbG9zZUJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgICAvL3N1cGVyKCk7XHJcblxyXG4gICAgICAgIC8vaWYgKCEob3BlbkNsb3NlQnV0dG9uIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpKSB7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIHRoaXMub3BlbkNsb3NlQnV0dG9uID0gb3BlbkNsb3NlQnV0dG9uO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldElkID0gdGhpcy5vcGVuQ2xvc2VCdXR0b24uZ2V0QXR0cmlidXRlKCdkYXRhLW9wZW4tY2xvc2UtbW9iaWxlJyk7XHJcbiAgICAgICAgdGhpcy50YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXRJZCEpIGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5zaG93VGV4dCA9IHRoaXMub3BlbkNsb3NlQnV0dG9uLnRleHRDb250ZW50O1xyXG4gICAgICAgIHRoaXMuaGlkZVRleHQgPSB0aGlzLm9wZW5DbG9zZUJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtb3Blbi1jbG9zZS1tb2JpbGUtaGlkZScpO1xyXG5cclxuICAgICAgICB0aGlzLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdmaC1vcGVuLWNsb3NlLXRhcmdldCcpO1xyXG5cclxuICAgICAgICBsZXQgZGVmYXVsdFRhcmdldFZpc2liaWxpdHkgPSB0aGlzLm9wZW5DbG9zZUJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtb3Blbi1jbG9zZS1tb2JpbGUtZGVmYXVsdCcpO1xyXG4gICAgICAgIGlmIChkZWZhdWx0VGFyZ2V0VmlzaWJpbGl0eSA9PT0gXCJoaWRlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlVGFyZ2V0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93VGFyZ2V0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm9wZW5DbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4gdGhpcy5oYW5kbGVDbGljayhldmVudCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNsaWNrKGV2ZW50OiBFdmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2ZoLW9wZW4tY2xvc2UtdGFyZ2V0LXVzZXItb3BlbmVkJykpIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlVGFyZ2V0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93VGFyZ2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dUYXJnZXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdmaC1vcGVuLWNsb3NlLXRhcmdldC11c2VyLW9wZW5lZCcpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdmaC1vcGVuLWNsb3NlLXRhcmdldC11c2VyLW9wZW5lZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmhpZGVUZXh0KSB7XHJcbiAgICAgICAgICAgIHRoaXMub3BlbkNsb3NlQnV0dG9uLnRleHRDb250ZW50ID0gdGhpcy5oaWRlVGV4dDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBoaWRlVGFyZ2V0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRhcmdldCkge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdmaC1vcGVuLWNsb3NlLXRhcmdldC11c2VyLW9wZW5lZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zaG93VGV4dCkge1xyXG4gICAgICAgICAgICB0aGlzLm9wZW5DbG9zZUJ1dHRvbi50ZXh0Q29udGVudCA9IHRoaXMuc2hvd1RleHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBOYW1lIGZvciB0aGUgY29tcG9uZW50IHVzZWQgd2hlbiBpbml0aWFsaXNpbmcgdXNpbmcgZGF0YS1tb2R1bGUgYXR0cmlidXRlcy5cclxuICAgICAqL1xyXG4vKiAgICBzdGF0aWMgbW9kdWxlTmFtZSA9ICdvcGVuLWNsb3NlLWJ1dHRvbic7Ki9cclxufVxyXG4iXX0=
