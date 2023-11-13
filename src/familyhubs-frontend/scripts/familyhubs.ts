// js components were originally snaffled from https://github.com/alphagov/govuk-design-system/blob/main/src/javascripts/components/

//todo: swap to a components folder?

declare global {
    interface Window {
        GDS_CONSENT_COOKIE_VERSION: number;
        GA_MEASUREMENT_ID: string;
        GA_CONTAINER_ID: string;
        GA_COOKIE_NAME: string;
        dataLayer: any[];
        FamilyHubsFrontend: any;
        GOVUKFrontend: {
            initAll: () => void;
        }
        MOJFrontend: {
            initAll: () => void;
        }
    }
}

import CookieBanner from './components/cookie-banner'
import CookiesPage from './components/cookies-page'
import initAnalytics from './components/analytics';
import { initializeBackButtons } from './components/back-links';
import { initializeVisibilityToggles } from './components/visibility-toggle';
import { OpenCloseButton } from './components/open-close-button';

//todo: consistency in module/proto/class style

window.FamilyHubsFrontend = window.FamilyHubsFrontend || {};
window.FamilyHubsFrontend.initAll = () => {

    // Initialise cookie banner
    const $cookieBanner = document.querySelector('[data-module="govuk-cookie-banner"]') as HTMLElement | null;
    new CookieBanner($cookieBanner).init();

    initAnalytics(window.GA_MEASUREMENT_ID);

    //todo: move this into scripts section on cookie page
    // Initialise cookie page
    var $cookiesPage = document.querySelector('[data-module="fh-cookies-page"]');
    new CookiesPage($cookiesPage).init();

    initializeBackButtons();
    initializeVisibilityToggles();
};

window.GOVUKFrontend.initAll();
window.MOJFrontend.initAll();
window.FamilyHubsFrontend.initAll();

let openCloseButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('button[data-open-close-mobile]');
openCloseButtons.forEach((openCloseButton) => {
    new OpenCloseButton(openCloseButton);
});