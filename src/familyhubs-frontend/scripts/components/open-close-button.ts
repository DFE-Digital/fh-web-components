//todo: make it a standard govuk module?
//import { GOVUKFrontendComponent } from '../../govuk-frontend-component.mjs'

export class OpenCloseButton { // extends GOVUKFrontendComponent {

    openCloseButton: HTMLButtonElement;
    targetId: string | null;
    showText: string | null;
    hideText: string | null;

    constructor(openCloseButton: HTMLButtonElement) {
        //super();

        //if (!(openCloseButton instanceof HTMLButtonElement)) {
        //}

        this.openCloseButton = openCloseButton;
        this.targetId = this.openCloseButton.getAttribute('data-open-close-mobile');
        this.showText = this.openCloseButton.getAttribute('data-open-close-mobile-show');
        this.hideText = this.openCloseButton.getAttribute('data-open-close-mobile-hide');
        this.openCloseButton.addEventListener('click', (event) => this.handleClick(event));
    }

    handleClick(event: Event) {
        const target = document.getElementById(this.targetId!) as HTMLElement | null;
        if (target && target.style.display === "none") {
            if (this.hideText) {
                this.openCloseButton.textContent = this.hideText;
            }
            target.style.display = "block";
        } else {
            if (this.showText) {
                this.openCloseButton.textContent = this.showText;
            }
            if (target) {
                target.style.display = "none";
            }
        }
    }

    /**
     * Name for the component used when initialising using data-module attributes.
     */
/*    static moduleName = 'open-close-button';*/
}
