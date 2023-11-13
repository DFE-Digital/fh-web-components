//todo: make it a standard govuk module?
//import { GOVUKFrontendComponent } from '../../govuk-frontend-component.mjs'

export class OpenCloseButton { // extends GOVUKFrontendComponent {

    openCloseButton: HTMLButtonElement;
    target: HTMLElement | null;
    showText: string | null;
    hideText: string | null;

    constructor(openCloseButton: HTMLButtonElement) {
        //super();

        //if (!(openCloseButton instanceof HTMLButtonElement)) {
        //}

        this.openCloseButton = openCloseButton;
        const targetId = this.openCloseButton.getAttribute('data-open-close-mobile');
        this.target = document.getElementById(targetId!) as HTMLElement | null;

        //todo: better to use content or have data-open-close-mobile-show?
        this.showText = this.openCloseButton.textContent;
        this.hideText = this.openCloseButton.getAttribute('data-open-close-mobile-hide');

        this.target.classList.add('fh-open-close-target');

        let defaultTargetVisibility = this.openCloseButton.getAttribute('data-open-close-mobile-default');
        if (defaultTargetVisibility === "hide") {
            this.hideTarget();
        } else {
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

    handleClick(event: Event) {
        //todo: check for the class instead?
        //if (this.target && getComputedStyle(this.target).display === "none") {
        //if (this.target && this.target.style.display === "none") {

        if (this.target.classList.contains('fh-open-close-target-user-opened')) {
            this.hideTarget();
        } else {
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
    /**
     * Name for the component used when initialising using data-module attributes.
     */
/*    static moduleName = 'open-close-button';*/
}
