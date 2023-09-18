// js components were originally snaffled from https://github.com/alphagov/govuk-design-system/blob/main/src/javascripts/components/

//todo: swap to a components folder?

declare global {
    interface Window {
        GDS_CONSENT_COOKIE_VERSION: number;
        GA_CONTAINER_ID: string;
        GA_COOKIE_NAME: string;
        dataLayer: any[];
        FamilyHubsFrontend: any;
    }
}

import CookieBanner from './components/cookie-banner'
import CookiesPage from './components/cookies-page'
import initAnalytics from './components/analytics';
import { initializeBackButtons } from './components/back-links';

//todo: consistency in module/proto/class style

window.FamilyHubsFrontend = window.FamilyHubsFrontend || {};
window.FamilyHubsFrontend.initAll = () => {

    // Initialise cookie banner
    const $cookieBanner = document.querySelector('[data-module="govuk-cookie-banner"]') as HTMLElement | null;
    new CookieBanner($cookieBanner).init();

    var gaMeasurementId =
        document.querySelector('meta[name="ga-measurement-id"]').getAttribute('content') as string | null;

    //todo: messy, but simplest way for now
    window.GA_CONTAINER_ID =
        document.querySelector('meta[name="ga-container-id"]').getAttribute('content');
    window.GA_COOKIE_NAME =
        document.querySelector('meta[name="ga-cookie-name"]').getAttribute('content');
    window.GDS_CONSENT_COOKIE_VERSION =
        +document.querySelector('meta[name="gds-consent-cookie-version"]').getAttribute('content');

    initAnalytics(gaMeasurementId);

    //todo: move this into scripts section on cookie page
    // Initialise cookie page
    var $cookiesPage = document.querySelector('[data-module="fh-cookies-page"]');
    new CookiesPage($cookiesPage).init();

    initializeBackButtons();
};
