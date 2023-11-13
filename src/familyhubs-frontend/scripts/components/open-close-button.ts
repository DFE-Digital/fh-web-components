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

        let defaultTargetVisibility = this.openCloseButton.getAttribute('data-open-close-mobile-default');
        if (defaultTargetVisibility === "hide") {
            this.hideTarget();
        } else {
            this.showTarget();
        }

        this.openCloseButton.addEventListener('click', (event) => this.handleClick(event));
    }

    handleClick(event: Event) {
        if (this.target && this.target.style.display === "none") {
            this.showTarget();
        } else {
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
    /**
     * Name for the component used when initialising using data-module attributes.
     */
/*    static moduleName = 'open-close-button';*/
}
