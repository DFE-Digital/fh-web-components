import * as CookieFunctions from './cookie-functions.js';
/*todo: we don't meed a pollyfill for bind, as long as we server up the non js version of the site for ie8 (https://caniuse.com/?search=bind) */
/*import 'govuk-frontend/govuk/vendor/polyfills/Function/prototype/bind'*/
/*todo: i think we're ok for this too (see above about ie8), but we _might_ need it for >8 ie (use? https://www.npmjs.com/package/events-polyfill)*/
/*import 'govuk-frontend/govuk/vendor/polyfills/Event'*/
import { nodeListForEach } from './helpers';
import { sendPageViewEvent, sendFilterPageCustomEvent, sendAnalyticsCustomEvent, updateAnalyticsStorageConsent } from './analytics';
const cookieBannerAcceptSelector = '.js-cookie-banner-accept';
const cookieBannerRejectSelector = '.js-cookie-banner-reject';
const cookieBannerHideButtonSelector = '.js-cookie-banner-hide';
const cookieMessageSelector = '.js-cookie-banner-message';
const cookieConfirmationAcceptSelector = '.js-cookie-banner-confirmation-accept';
const cookieConfirmationRejectSelector = '.js-cookie-banner-confirmation-reject';
export default function CookieBanner($module) {
    this.$module = $module;
}
CookieBanner.prototype.init = function () {
    this.$cookieBanner = this.$module;
    this.$acceptButton = this.$module.querySelector(cookieBannerAcceptSelector);
    this.$rejectButton = this.$module.querySelector(cookieBannerRejectSelector);
    this.$cookieMessage = this.$module.querySelector(cookieMessageSelector);
    this.$cookieConfirmationAccept = this.$module.querySelector(cookieConfirmationAcceptSelector);
    this.$cookieConfirmationReject = this.$module.querySelector(cookieConfirmationRejectSelector);
    this.$cookieBannerHideButtons = this.$module.querySelectorAll(cookieBannerHideButtonSelector);
    // Exit if no cookie banner module
    // or if we're on the cookies page to avoid circular journeys
    if (!this.$cookieBanner || this.onCookiesPage()) {
        return;
    }
    // Show the cookie banner to users who have not consented or have an
    // outdated consent cookie
    var currentConsentCookie = CookieFunctions.getConsentCookie();
    if (!currentConsentCookie || !CookieFunctions.isValidConsentCookie(currentConsentCookie)) {
        // If the consent cookie version is not valid, we need to remove any cookies which have been
        // set previously
        CookieFunctions.resetCookies();
        this.$cookieBanner.removeAttribute('hidden');
    }
    this.$acceptButton.addEventListener('click', this.acceptCookies.bind(this));
    this.$rejectButton.addEventListener('click', this.rejectCookies.bind(this));
    nodeListForEach(this.$cookieBannerHideButtons, function ($cookieBannerHideButton) {
        $cookieBannerHideButton.addEventListener('click', this.hideBanner.bind(this));
    }.bind(this));
};
CookieBanner.prototype.hideBanner = function () {
    this.$cookieBanner.setAttribute('hidden', true);
};
CookieBanner.prototype.acceptCookies = function () {
    // Do actual cookie consent bit
    CookieFunctions.setConsentCookie({ analytics: true });
    updateAnalyticsStorageConsent(true);
    sendAnalyticsCustomEvent(true, 'banner');
    sendPageViewEvent();
    sendFilterPageCustomEvent();
    // Hide banner and show confirmation message
    this.$cookieMessage.setAttribute('hidden', true);
    this.revealConfirmationMessage(this.$cookieConfirmationAccept);
};
CookieBanner.prototype.rejectCookies = function () {
    updateAnalyticsStorageConsent(true);
    sendAnalyticsCustomEvent(false, 'banner');
    updateAnalyticsStorageConsent(false);
    //setTimeout(CookieFunctions.setConsentCookie.bind({ analytics: false }), 250);
    CookieFunctions.setConsentCookie({ analytics: false });
    // Hide banner and show confirmation message
    this.$cookieMessage.setAttribute('hidden', true);
    this.revealConfirmationMessage(this.$cookieConfirmationReject);
};
CookieBanner.prototype.revealConfirmationMessage = function (confirmationMessage) {
    confirmationMessage.removeAttribute('hidden');
    // Set tabindex to -1 to make the confirmation banner focusable with JavaScript
    if (!confirmationMessage.getAttribute('tabindex')) {
        confirmationMessage.setAttribute('tabindex', '-1');
        confirmationMessage.addEventListener('blur', function () {
            confirmationMessage.removeAttribute('tabindex');
        });
    }
    confirmationMessage.focus();
};
CookieBanner.prototype.onCookiesPage = function () {
    return window.location.pathname === '/cookies/';
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY29va2llLWJhbm5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssZUFBZSxNQUFNLHVCQUF1QixDQUFBO0FBQ3hELGdKQUFnSjtBQUNoSiwwRUFBMEU7QUFDMUUsb0pBQW9KO0FBQ3BKLHdEQUF3RDtBQUN4RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sV0FBVyxDQUFBO0FBQzNDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSx5QkFBeUIsRUFBRSx3QkFBd0IsRUFBRSw2QkFBNkIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVwSSxNQUFNLDBCQUEwQixHQUFHLDBCQUEwQixDQUFBO0FBQzdELE1BQU0sMEJBQTBCLEdBQUcsMEJBQTBCLENBQUE7QUFDN0QsTUFBTSw4QkFBOEIsR0FBRyx3QkFBd0IsQ0FBQTtBQUMvRCxNQUFNLHFCQUFxQixHQUFHLDJCQUEyQixDQUFBO0FBQ3pELE1BQU0sZ0NBQWdDLEdBQUcsdUNBQXVDLENBQUE7QUFDaEYsTUFBTSxnQ0FBZ0MsR0FBRyx1Q0FBdUMsQ0FBQTtBQUVoRixNQUFNLENBQUMsT0FBTyxVQUFVLFlBQVksQ0FBQyxPQUFvQjtJQUNyRCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztBQUMzQixDQUFDO0FBRUQsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUc7SUFDMUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsMEJBQTBCLENBQUMsQ0FBQTtJQUMzRSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLDBCQUEwQixDQUFDLENBQUE7SUFDM0UsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO0lBQ3ZFLElBQUksQ0FB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LENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUE7QUFDbEUsQ0FBQyxDQUFBO0FBRUQsWUFBWSxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsR0FBRyxVQUFVLG1CQUFtQjtJQUM1RSxtQkFBbUIsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUE7SUFFN0MsK0VBQStFO0lBQy9FLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztRQUNoRCxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBRWxELG1CQUFtQixDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtZQUN6QyxtQkFBbUIsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDbkQsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsbUJBQW1CLENBQUMsS0FBSyxFQUFFLENBQUE7QUFDL0IsQ0FBQyxDQUFBO0FBRUQsWUFBWSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEdBQUc7SUFDbkMsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsS0FBSyxXQUFXLENBQUE7QUFDbkQsQ0FBQyxDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvY29va2llLWJhbm5lci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIENvb2tpZUZ1bmN0aW9ucyBmcm9tICcuL2Nvb2tpZS1mdW5jdGlvbnMuanMnXG4vKnRvZG86IHdlIGRvbid0IG1lZWQgYSBwb2xseWZpbGwgZm9yIGJpbmQsIGFzIGxvbmcgYXMgd2Ugc2VydmVyIHVwIHRoZSBub24ganMgdmVyc2lvbiBvZiB0aGUgc2l0ZSBmb3IgaWU4IChodHRwczovL2Nhbml1c2UuY29tLz9zZWFyY2g9YmluZCkgKi9cbi8qaW1wb3J0ICdnb3Z1ay1mcm9udGVuZC9nb3Z1ay92ZW5kb3IvcG9seWZpbGxzL0Z1bmN0aW9uL3Byb3RvdHlwZS9iaW5kJyovXG4vKnRvZG86IGkgdGhpbmsgd2UncmUgb2sgZm9yIHRoaXMgdG9vIChzZWUgYWJvdmUgYWJvdXQgaWU4KSwgYnV0IHdlIF9taWdodF8gbmVlZCBpdCBmb3IgPjggaWUgKHVzZT8gaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvZXZlbnRzLXBvbHlmaWxsKSovXG4vKmltcG9ydCAnZ292dWstZnJvbnRlbmQvZ292dWsvdmVuZG9yL3BvbHlmaWxscy9FdmVudCcqL1xuaW1wb3J0IHsgbm9kZUxpc3RGb3JFYWNoIH0gZnJvbSAnLi9oZWxwZXJzJ1xuaW1wb3J0IHsgc2VuZFBhZ2VWaWV3RXZlbnQsIHNlbmRGaWx0ZXJQYWdlQ3VzdG9tRXZlbnQsIHNlbmRBbmFseXRpY3NDdXN0b21FdmVudCwgdXBkYXRlQW5hbHl0aWNzU3RvcmFnZUNvbnNlbnQgfSBmcm9tICcuL2FuYWx5dGljcyc7XG5cbmNvbnN0IGNvb2tpZUJhbm5lckFjY2VwdFNlbGVjdG9yID0gJy5qcy1jb29raWUtYmFubmVyLWFjY2VwdCdcbmNvbnN0IGNvb2tpZUJhbm5lclJlamVjdFNlbGVjdG9yID0gJy5qcy1jb29raWUtYmFubmVyLXJlamVjdCdcbmNvbnN0IGNvb2tpZUJhbm5lckhpZGVCdXR0b25TZWxlY3RvciA9ICcuanMtY29va2llLWJhbm5lci1oaWRlJ1xuY29uc3QgY29va2llTWVzc2FnZVNlbGVjdG9yID0gJy5qcy1jb29raWUtYmFubmVyLW1lc3NhZ2UnXG5jb25zdCBjb29raWVDb25maXJtYXRpb25BY2NlcHRTZWxlY3RvciA9ICcuanMtY29va2llLWJhbm5lci1jb25maXJtYXRpb24tYWNjZXB0J1xuY29uc3QgY29va2llQ29uZmlybWF0aW9uUmVqZWN0U2VsZWN0b3IgPSAnLmpzLWNvb2tpZS1iYW5uZXItY29uZmlybWF0aW9uLXJlamVjdCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29va2llQmFubmVyKCRtb2R1bGU6IEhUTUxFbGVtZW50KSB7XG4gICAgdGhpcy4kbW9kdWxlID0gJG1vZHVsZTtcbn1cblxuQ29va2llQmFubmVyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJGNvb2tpZUJhbm5lciA9IHRoaXMuJG1vZHVsZVxuICAgIHRoaXMuJGFjY2VwdEJ1dHRvbiA9IHRoaXMuJG1vZHVsZS5xdWVyeVNlbGVjdG9yKGNvb2tpZUJhbm5lckFjY2VwdFNlbGVjdG9yKVxuICAgIHRoaXMuJHJlamVjdEJ1dHRvbiA9IHRoaXMuJG1vZHVsZS5xdWVyeVNlbGVjdG9yKGNvb2tpZUJhbm5lclJlamVjdFNlbGVjdG9yKVxuICAgIHRoaXMuJGNvb2tpZU1lc3NhZ2UgPSB0aGlzLiRtb2R1bGUucXVlcnlTZWxlY3Rvcihjb29raWVNZXNzYWdlU2VsZWN0b3IpXG4gICAgdGhpcy4kY29va2llQ29uZmlybWF0aW9uQWNjZXB0ID0gdGhpcy4kbW9kdWxlLnF1ZXJ5U2VsZWN0b3IoY29va2llQ29uZmlybWF0aW9uQWNjZXB0U2VsZWN0b3IpXG4gICAgdGhpcy4kY29va2llQ29uZmlybWF0aW9uUmVqZWN0ID0gdGhpcy4kbW9kdWxlLnF1ZXJ5U2VsZWN0b3IoY29va2llQ29uZmlybWF0aW9uUmVqZWN0U2VsZWN0b3IpXG4gICAgdGhpcy4kY29va2llQmFubmVySGlkZUJ1dHRvbnMgPSB0aGlzLiRtb2R1bGUucXVlcnlTZWxlY3RvckFsbChjb29raWVCYW5uZXJIaWRlQnV0dG9uU2VsZWN0b3IpXG5cbiAgICAvLyBFeGl0IGlmIG5vIGNvb2tpZSBiYW5uZXIgbW9kdWxlXG4gICAgLy8gb3IgaWYgd2UncmUgb24gdGhlIGNvb2tpZXMgcGFnZSB0byBhdm9pZCBjaXJjdWxhciBqb3VybmV5c1xuICAgIGlmICghdGhpcy4kY29va2llQmFubmVyIHx8IHRoaXMub25Db29raWVzUGFnZSgpKSB7XG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIFNob3cgdGhlIGNvb2tpZSBiYW5uZXIgdG8gdXNlcnMgd2hvIGhhdmUgbm90IGNvbnNlbnRlZCBvciBoYXZlIGFuXG4gICAgLy8gb3V0ZGF0ZWQgY29uc2VudCBjb29raWVcbiAgICB2YXIgY3VycmVudENvbnNlbnRDb29raWUgPSBDb29raWVGdW5jdGlvbnMuZ2V0Q29uc2VudENvb2tpZSgpXG5cbiAgICBpZiAoIWN1cnJlbnRDb25zZW50Q29va2llIHx8ICFDb29raWVGdW5jdGlvbnMuaXNWYWxpZENvbnNlbnRDb29raWUoY3VycmVudENvbnNlbnRDb29raWUpKSB7XG4gICAgICAgIC8vIElmIHRoZSBjb25zZW50IGNvb2tpZSB2ZXJzaW9uIGlzIG5vdCB2YWxpZCwgd2UgbmVlZCB0byByZW1vdmUgYW55IGNvb2tpZXMgd2hpY2ggaGF2ZSBiZWVuXG4gICAgICAgIC8vIHNldCBwcmV2aW91c2x5XG4gICAgICAgIENvb2tpZUZ1bmN0aW9ucy5yZXNldENvb2tpZXMoKVxuXG4gICAgICAgIHRoaXMuJGNvb2tpZUJhbm5lci5yZW1vdmVBdHRyaWJ1dGUoJ2hpZGRlbicpXG4gICAgfVxuXG4gICAgdGhpcy4kYWNjZXB0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5hY2NlcHRDb29raWVzLmJpbmQodGhpcykpXG4gICAgdGhpcy4kcmVqZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5yZWplY3RDb29raWVzLmJpbmQodGhpcykpXG5cbiAgICBub2RlTGlzdEZvckVhY2godGhpcy4kY29va2llQmFubmVySGlkZUJ1dHRvbnMsIGZ1bmN0aW9uICgkY29va2llQmFubmVySGlkZUJ1dHRvbikge1xuICAgICAgICAkY29va2llQmFubmVySGlkZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGlkZUJhbm5lci5iaW5kKHRoaXMpKVxuICAgIH0uYmluZCh0aGlzKSlcbn1cblxuQ29va2llQmFubmVyLnByb3RvdHlwZS5oaWRlQmFubmVyID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJGNvb2tpZUJhbm5lci5zZXRBdHRyaWJ1dGUoJ2hpZGRlbicsIHRydWUpXG59XG5cbkNvb2tpZUJhbm5lci5wcm90b3R5cGUuYWNjZXB0Q29va2llcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBEbyBhY3R1YWwgY29va2llIGNvbnNlbnQgYml0XG4gICAgQ29va2llRnVuY3Rpb25zLnNldENvbnNlbnRDb29raWUoeyBhbmFseXRpY3M6IHRydWUgfSk7XG5cbiAgICB1cGRhdGVBbmFseXRpY3NTdG9yYWdlQ29uc2VudCh0cnVlKTtcblxuICAgIHNlbmRBbmFseXRpY3NDdXN0b21FdmVudCh0cnVlLCAnYmFubmVyJyk7XG4gICAgc2VuZFBhZ2VWaWV3RXZlbnQoKTtcbiAgICBzZW5kRmlsdGVyUGFnZUN1c3RvbUV2ZW50KCk7XG5cbiAgICAvLyBIaWRlIGJhbm5lciBhbmQgc2hvdyBjb25maXJtYXRpb24gbWVzc2FnZVxuICAgIHRoaXMuJGNvb2tpZU1lc3NhZ2Uuc2V0QXR0cmlidXRlKCdoaWRkZW4nLCB0cnVlKVxuICAgIHRoaXMucmV2ZWFsQ29uZmlybWF0aW9uTWVzc2FnZSh0aGlzLiRjb29raWVDb25maXJtYXRpb25BY2NlcHQpXG59XG5cbkNvb2tpZUJhbm5lci5wcm90b3R5cGUucmVqZWN0Q29va2llcyA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHVwZGF0ZUFuYWx5dGljc1N0b3JhZ2VDb25zZW50KHRydWUpO1xuXG4gICAgc2VuZEFuYWx5dGljc0N1c3RvbUV2ZW50KGZhbHNlLCAnYmFubmVyJyk7XG5cbiAgICB1cGRhdGVBbmFseXRpY3NTdG9yYWdlQ29uc2VudChmYWxzZSk7XG5cbiAgICAvL3NldFRpbWVvdXQoQ29va2llRnVuY3Rpb25zLnNldENvbnNlbnRDb29raWUuYmluZCh7IGFuYWx5dGljczogZmFsc2UgfSksIDI1MCk7XG4gICAgQ29va2llRnVuY3Rpb25zLnNldENvbnNlbnRDb29raWUoeyBhbmFseXRpY3M6IGZhbHNlIH0pO1xuXG4gICAgLy8gSGlkZSBiYW5uZXIgYW5kIHNob3cgY29uZmlybWF0aW9uIG1lc3NhZ2VcbiAgICB0aGlzLiRjb29raWVNZXNzYWdlLnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgdHJ1ZSlcbiAgICB0aGlzLnJldmVhbENvbmZpcm1hdGlvbk1lc3NhZ2UodGhpcy4kY29va2llQ29uZmlybWF0aW9uUmVqZWN0KVxufVxuXG5Db29raWVCYW5uZXIucHJvdG90eXBlLnJldmVhbENvbmZpcm1hdGlvbk1lc3NhZ2UgPSBmdW5jdGlvbiAoY29uZmlybWF0aW9uTWVzc2FnZSkge1xuICAgIGNvbmZpcm1hdGlvbk1lc3NhZ2UucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKVxuXG4gICAgLy8gU2V0IHRhYmluZGV4IHRvIC0xIHRvIG1ha2UgdGhlIGNvbmZpcm1hdGlvbiBiYW5uZXIgZm9jdXNhYmxlIHdpdGggSmF2YVNjcmlwdFxuICAgIGlmICghY29uZmlybWF0aW9uTWVzc2FnZS5nZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JykpIHtcbiAgICAgICAgY29uZmlybWF0aW9uTWVzc2FnZS5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJylcblxuICAgICAgICBjb25maXJtYXRpb25NZXNzYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25maXJtYXRpb25NZXNzYWdlLnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbmZpcm1hdGlvbk1lc3NhZ2UuZm9jdXMoKVxufVxuXG5Db29raWVCYW5uZXIucHJvdG90eXBlLm9uQ29va2llc1BhZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PT0gJy9jb29raWVzLydcbn1cbiJdfQ==
