/* Users can (dis)allow different groups of cookies. */
const COOKIE_CATEGORIES = {
    analytics: ['_ga', '_ga_' + window.GA_CONTAINER_ID],
    /* Essential cookies
     *
     * Essential cookies cannot be deselected, but we want our cookie code to
     * only allow adding cookies that are documented in this object, so they need
     * to be added here.
     */
    essential: [window.GA_COOKIE_NAME]
};
/*
 * Default cookie preferences if user has no cookie preferences.
 *
 * Note that this doesn't include a key for essential cookies, essential
 * cookies cannot be disallowed. If the object contains { essential: false }
 * this will be ignored.
 */
const DEFAULT_COOKIE_CONSENT = {
    analytics: false,
    version: window.GDS_CONSENT_COOKIE_VERSION
};
/** Return the user's cookie preferences.
 *
 * If the consent cookie is malformed, or not present,
 * returns null.
 */
export function getConsentCookie() {
    const consentCookie = getCookie(window.GA_COOKIE_NAME);
    let consentCookieObj;
    if (consentCookie) {
        try {
            consentCookieObj = JSON.parse(consentCookie);
        }
        catch (err) {
            return null;
        }
    }
    else {
        return null;
    }
    return consentCookieObj;
}
/** Check the cookie preferences object.
 *
 * If the consent object is not present, malformed, or incorrect version,
 * returns false, otherwise returns true.
 */
export function isValidConsentCookie(options) {
    return (options && options.version >= window.GDS_CONSENT_COOKIE_VERSION);
}
/** Update the user's cookie preferences. */
export function setConsentCookie(options) {
    let cookieConsent = getConsentCookie();
    if (!cookieConsent) {
        cookieConsent = JSON.parse(JSON.stringify(DEFAULT_COOKIE_CONSENT));
    }
    // Merge current cookie preferences and new preferences
    for (var option in options) {
        cookieConsent[option] = options[option];
    }
    // Essential cookies cannot be deselected, ignore this cookie type
    delete cookieConsent.essential;
    cookieConsent.version = window.GDS_CONSENT_COOKIE_VERSION;
    // Set the consent cookie
    setCookie(window.GA_COOKIE_NAME, JSON.stringify(cookieConsent), { days: 365 });
    // Update the other cookies
    resetCookies();
}
/** Apply the user's cookie preferences
 *
 * Deletes any cookies the user has not consented to.
 */
export function resetCookies() {
    var options = getConsentCookie();
    // If no preferences or old version use the default
    if (!isValidConsentCookie(options)) {
        options = JSON.parse(JSON.stringify(DEFAULT_COOKIE_CONSENT));
    }
    for (var cookieType in options) {
        if (cookieType === 'version') {
            continue;
        }
        // Essential cookies cannot be deselected, ignore this cookie type
        if (cookieType === 'essential') {
            continue;
        }
        if (!options[cookieType]) {
            // Fetch the cookies in that category
            var cookiesInCategory = COOKIE_CATEGORIES[cookieType];
            cookiesInCategory.forEach(function (cookie) {
                deleteCookie(cookie);
            });
        }
    }
}
function userAllowsCookieCategory(cookieCategory, cookiePreferences) {
    // Essential cookies are always allowed
    if (cookieCategory === 'essential') {
        return true;
    }
    // Sometimes cookiePreferences is malformed in some of the tests, so we need to handle these
    try {
        return cookiePreferences[cookieCategory];
    }
    catch (e) {
        console.error(e);
        return false;
    }
}
function userAllowsCookie(cookieName) {
    // Always allow setting the consent cookie
    if (cookieName === window.GA_COOKIE_NAME) {
        return true;
    }
    // Get the current cookie preferences
    var cookiePreferences = getConsentCookie();
    // If no preferences or old version use the default
    if (!isValidConsentCookie(cookiePreferences)) {
        cookiePreferences = DEFAULT_COOKIE_CONSENT;
    }
    for (var category in COOKIE_CATEGORIES) {
        var cookiesInCategory = COOKIE_CATEGORIES[category];
        if (cookiesInCategory.indexOf(cookieName) !== '-1') {
            return userAllowsCookieCategory(category, cookiePreferences);
        }
    }
    // Deny the cookie if it is not known to us
    return false;
}
function getCookie(name) {
    var nameEQ = name + '=';
    var cookies = document.cookie.split(';');
    for (var i = 0, len = cookies.length; i < len; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return decodeURIComponent(cookie.substring(nameEQ.length));
        }
    }
    return null;
}
// do we need to set the domain?
function setCookie(name, value, options) {
    if (userAllowsCookie(name)) {
        if (typeof options === 'undefined') {
            options = {};
        }
        var cookieString = name + '=' + value + '; path=/; SameSite=Strict';
        if (options.days) {
            var date = new Date();
            date.setTime(date.getTime() + (options.days * 24 * 60 * 60 * 1000));
            cookieString = cookieString + '; expires=' + date.toUTCString();
        }
        if (document.location.protocol === 'https:') {
            cookieString = cookieString + '; Secure';
        }
        document.cookie = cookieString;
    }
}
function deleteCookie(name) {
    if (getCookie(name)) {
        // Cookies need to be deleted in the same level of specificity in which they were set
        // If a cookie was set with a specified domain, it needs to be specified when deleted
        // If a cookie wasn't set with the domain attribute, it shouldn't be there when deleted
        // You can't tell if a cookie was set with a domain attribute or not, so try both options
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=' + window.location.hostname + ';path=/';
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=.' + window.location.hostname + ';path=/';
    }
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY29va2llLWZ1bmN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpQkEsdURBQXVEO0FBQ3ZELE1BQU0saUJBQWlCLEdBQXFCO0lBQ3hDLFNBQVMsRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQztJQUNuRDs7Ozs7T0FLRztJQUNILFNBQVMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUM7Q0FDckMsQ0FBQTtBQUVEOzs7Ozs7R0FNRztBQUNILE1BQU0sc0JBQXNCLEdBQWtCO0lBQzFDLFNBQVMsRUFBRSxLQUFLO0lBQ2hCLE9BQU8sRUFBRSxNQUFNLENBQUMsMEJBQTBCO0NBQzdDLENBQUE7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGdCQUFnQjtJQUM1QixNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3ZELElBQUksZ0JBQXNDLENBQUM7SUFFM0MsSUFBSSxhQUFhLEVBQUU7UUFDZixJQUFJO1lBQ0EsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNoRDtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1YsT0FBTyxJQUFJLENBQUM7U0FDZjtLQUNKO1NBQU07UUFDSCxPQUFPLElBQUksQ0FBQztLQUNmO0lBRUQsT0FBTyxnQkFBZ0IsQ0FBQztBQUM1QixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxPQUFzQjtJQUN2RCxPQUFPLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFDN0UsQ0FBQztBQUVELDRDQUE0QztBQUM1QyxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsT0FBc0I7SUFDbkQsSUFBSSxhQUFhLEdBQUcsZ0JBQWdCLEVBQUUsQ0FBQztJQUV2QyxJQUFJLENBQUMsYUFBYSxF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QUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDcEUsWUFBWSxHQUFHLFlBQVksR0FBRyxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ25FO1FBQ0QsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDekMsWUFBWSxHQUFHLFlBQVksR0FBRyxVQUFVLENBQUM7U0FDNUM7UUFDRCxRQUFRLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQztLQUNsQztBQUNMLENBQUM7QUFFRCxTQUFTLFlBQVksQ0FBQyxJQUFZO0lBQzlCLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ2pCLHFGQUFxRjtRQUNyRixxRkFBcUY7UUFDckYsdUZBQXVGO1FBQ3ZGLHlGQUF5RjtRQUN6RixRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxnREFBZ0QsQ0FBQztRQUMxRSxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxpREFBaUQsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7UUFDbEgsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsa0RBQWtELEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO0tBQ3RIO0FBQ0wsQ0FBQyIsImZpbGUiOiJjb21wb25lbnRzL2Nvb2tpZS1mdW5jdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZXhwb3J0IGludGVyZmFjZSBDb25zZW50Q29va2llIHtcclxuICAgIC8vdG9kbzoganVzdCByZW1vdmUgZXNzZW50aWFsP1xyXG4gICAgZXNzZW50aWFsPzogYm9vbGVhbjtcclxuICAgIGFuYWx5dGljcz86IGJvb2xlYW47XHJcbiAgICB2ZXJzaW9uPzogbnVtYmVyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgQ29va2llQ2F0ZWdvcmllcyB7XHJcbiAgICBhbmFseXRpY3M6IHN0cmluZ1tdO1xyXG4gICAgZXNzZW50aWFsOiBzdHJpbmdbXTtcclxufVxyXG5cclxuaW50ZXJmYWNlIENvb2tpZU9wdGlvbnMge1xyXG4gICAgZGF5cz86IG51bWJlcjtcclxufVxyXG5cclxuLyogVXNlcnMgY2FuIChkaXMpYWxsb3cgZGlmZmVyZW50IGdyb3VwcyBvZiBjb29raWVzLiAqL1xyXG5jb25zdCBDT09LSUVfQ0FURUdPUklFUzogQ29va2llQ2F0ZWdvcmllcyA9IHtcclxuICAgIGFuYWx5dGljczogWydfZ2EnLCAnX2dhXycgKyB3aW5kb3cuR0FfQ09OVEFJTkVSX0lEXSxcclxuICAgIC8qIEVzc2VudGlhbCBjb29raWVzXHJcbiAgICAgKlxyXG4gICAgICogRXNzZW50aWFsIGNvb2tpZXMgY2Fubm90IGJlIGRlc2VsZWN0ZWQsIGJ1dCB3ZSB3YW50IG91ciBjb29raWUgY29kZSB0b1xyXG4gICAgICogb25seSBhbGxvdyBhZGRpbmcgY29va2llcyB0aGF0IGFyZSBkb2N1bWVudGVkIGluIHRoaXMgb2JqZWN0LCBzbyB0aGV5IG5lZWRcclxuICAgICAqIHRvIGJlIGFkZGVkIGhlcmUuXHJcbiAgICAgKi9cclxuICAgIGVzc2VudGlhbDogW3dpbmRvdy5HQV9DT09LSUVfTkFNRV1cclxufVxyXG5cclxuLypcclxuICogRGVmYXVsdCBjb29raWUgcHJlZmVyZW5jZXMgaWYgdXNlciBoYXMgbm8gY29va2llIHByZWZlcmVuY2VzLlxyXG4gKlxyXG4gKiBOb3RlIHRoYXQgdGhpcyBkb2Vzbid0IGluY2x1ZGUgYSBrZXkgZm9yIGVzc2VudGlhbCBjb29raWVzLCBlc3NlbnRpYWxcclxuICogY29va2llcyBjYW5ub3QgYmUgZGlzYWxsb3dlZC4gSWYgdGhlIG9iamVjdCBjb250YWlucyB7IGVzc2VudGlhbDogZmFsc2UgfVxyXG4gKiB0aGlzIHdpbGwgYmUgaWdub3JlZC5cclxuICovXHJcbmNvbnN0IERFRkFVTFRfQ09PS0lFX0NPTlNFTlQ6IENvbnNlbnRDb29raWUgPSB7XHJcbiAgICBhbmFseXRpY3M6IGZhbHNlLFxyXG4gICAgdmVyc2lvbjogd2luZG93LkdEU19DT05TRU5UX0NPT0tJRV9WRVJTSU9OXHJcbn1cclxuXHJcbi8qKiBSZXR1cm4gdGhlIHVzZXIncyBjb29raWUgcHJlZmVyZW5jZXMuXHJcbiAqXHJcbiAqIElmIHRoZSBjb25zZW50IGNvb2tpZSBpcyBtYWxmb3JtZWQsIG9yIG5vdCBwcmVzZW50LFxyXG4gKiByZXR1cm5zIG51bGwuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29uc2VudENvb2tpZSgpOiBDb25zZW50Q29va2llIHwgbnVsbCB7XHJcbiAgICBjb25zdCBjb25zZW50Q29va2llID0gZ2V0Q29va2llKHdpbmRvdy5HQV9DT09LSUVfTkFNRSk7XHJcbiAgICBsZXQgY29uc2VudENvb2tpZU9iajogQ29uc2VudENvb2tpZSB8IG51bGw7XHJcblxyXG4gICAgaWYgKGNvbnNlbnRDb29raWUpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zZW50Q29va2llT2JqID0gSlNPTi5wYXJzZShjb25zZW50Q29va2llKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY29uc2VudENvb2tpZU9iajtcclxufVxyXG5cclxuLyoqIENoZWNrIHRoZSBjb29raWUgcHJlZmVyZW5jZXMgb2JqZWN0LlxyXG4gKlxyXG4gKiBJZiB0aGUgY29uc2VudCBvYmplY3QgaXMgbm90IHByZXNlbnQsIG1hbGZvcm1lZCwgb3IgaW5jb3JyZWN0IHZlcnNpb24sXHJcbiAqIHJldHVybnMgZmFsc2UsIG90aGVyd2lzZSByZXR1cm5zIHRydWUuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZENvbnNlbnRDb29raWUob3B0aW9uczogQ29uc2VudENvb2tpZSkge1xyXG4gICAgcmV0dXJuIChvcHRpb25zICYmIG9wdGlvbnMudmVyc2lvbiA+PSB3aW5kb3cuR0RTX0NPTlNFTlRfQ09PS0lFX1ZFUlNJT04pO1xyXG59XHJcblxyXG4vKiogVXBkYXRlIHRoZSB1c2VyJ3MgY29va2llIHByZWZlcmVuY2VzLiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0Q29uc2VudENvb2tpZShvcHRpb25zOiBDb25zZW50Q29va2llKSB7XHJcbiAgICBsZXQgY29va2llQ29uc2VudCA9IGdldENvbnNlbnRDb29raWUoKTtcclxuXHJcbiAgICBpZiAoIWNvb2tpZUNvbnNlbnQpIHtcclxuICAgICAgICBjb29raWVDb25zZW50ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShERUZBVUxUX0NPT0tJRV9DT05TRU5UKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTWVyZ2UgY3VycmVudCBjb29raWUgcHJlZmVyZW5jZXMgYW5kIG5ldyBwcmVmZXJlbmNlc1xyXG4gICAgZm9yICh2YXIgb3B0aW9uIGluIG9wdGlvbnMpIHtcclxuICAgICAgICBjb29raWVDb25zZW50W29wdGlvbl0gPSBvcHRpb25zW29wdGlvbl07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRXNzZW50aWFsIGNvb2tpZXMgY2Fubm90IGJlIGRlc2VsZWN0ZWQsIGlnbm9yZSB0aGlzIGNvb2tpZSB0eXBlXHJcbiAgICBkZWxldGUgY29va2llQ29uc2VudC5lc3NlbnRpYWw7XHJcblxyXG4gICAgY29va2llQ29uc2VudC52ZXJzaW9uID0gd2luZG93LkdEU19DT05TRU5UX0NPT0tJRV9WRVJTSU9OO1xyXG5cclxuICAgIC8vIFNldCB0aGUgY29uc2VudCBjb29raWVcclxuICAgIHNldENvb2tpZSh3aW5kb3cuR0FfQ09PS0lFX05BTUUsIEpTT04uc3RyaW5naWZ5KGNvb2tpZUNvbnNlbnQpLCB7IGRheXM6IDM2NSB9KTtcclxuXHJcbiAgICAvLyBVcGRhdGUgdGhlIG90aGVyIGNvb2tpZXNcclxuICAgIHJlc2V0Q29va2llcygpO1xyXG59XHJcblxyXG4vKiogQXBwbHkgdGhlIHVzZXIncyBjb29raWUgcHJlZmVyZW5jZXNcclxuICpcclxuICogRGVsZXRlcyBhbnkgY29va2llcyB0aGUgdXNlciBoYXMgbm90IGNvbnNlbnRlZCB0by5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZXNldENvb2tpZXMoKSB7XHJcbiAgICB2YXIgb3B0aW9ucyA9IGdldENvbnNlbnRDb29raWUoKTtcclxuXHJcbiAgICAvLyBJZiBubyBwcmVmZXJlbmNlcyBvciBvbGQgdmVyc2lvbiB1c2UgdGhlIGRlZmF1bHRcclxuICAgIGlmICghaXNWYWxpZENvbnNlbnRDb29raWUob3B0aW9ucykpIHtcclxuICAgICAgICBvcHRpb25zID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShERUZBVUxUX0NPT0tJRV9DT05TRU5UKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgY29va2llVHlwZSBpbiBvcHRpb25zKSB7XHJcbiAgICAgICAgaWYgKGNvb2tpZVR5cGUgPT09ICd2ZXJzaW9uJykge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEVzc2VudGlhbCBjb29raWVzIGNhbm5vdCBiZSBkZXNlbGVjdGVkLCBpZ25vcmUgdGhpcyBjb29raWUgdHlwZVxyXG4gICAgICAgIGlmIChjb29raWVUeXBlID09PSAnZXNzZW50aWFsJykge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghb3B0aW9uc1tjb29raWVUeXBlXSkge1xyXG4gICAgICAgICAgICAvLyBGZXRjaCB0aGUgY29va2llcyBpbiB0aGF0IGNhdGVnb3J5XHJcbiAgICAgICAgICAgIHZhciBjb29raWVzSW5DYXRlZ29yeSA9IENPT0tJRV9DQVRFR09SSUVTW2Nvb2tpZVR5cGVdXHJcblxyXG4gICAgICAgICAgICBjb29raWVzSW5DYXRlZ29yeS5mb3JFYWNoKGZ1bmN0aW9uIChjb29raWUpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZUNvb2tpZShjb29raWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVzZXJBbGxvd3NDb29raWVDYXRlZ29yeShjb29raWVDYXRlZ29yeSwgY29va2llUHJlZmVyZW5jZXMpIHtcclxuICAgIC8vIEVzc2VudGlhbCBjb29raWVzIGFyZSBhbHdheXMgYWxsb3dlZFxyXG4gICAgaWYgKGNvb2tpZUNhdGVnb3J5ID09PSAnZXNzZW50aWFsJykge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNvbWV0aW1lcyBjb29raWVQcmVmZXJlbmNlcyBpcyBtYWxmb3JtZWQgaW4gc29tZSBvZiB0aGUgdGVzdHMsIHNvIHdlIG5lZWQgdG8gaGFuZGxlIHRoZXNlXHJcbiAgICB0cnkge1xyXG4gICAgICAgIHJldHVybiBjb29raWVQcmVmZXJlbmNlc1tjb29raWVDYXRlZ29yeV07XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVzZXJBbGxvd3NDb29raWUoY29va2llTmFtZTogc3RyaW5nKSB7XHJcbiAgICAvLyBBbHdheXMgYWxsb3cgc2V0dGluZyB0aGUgY29uc2VudCBjb29raWVcclxuICAgIGlmIChjb29raWVOYW1lID09PSB3aW5kb3cuR0FfQ09PS0lFX05BTUUpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBHZXQgdGhlIGN1cnJlbnQgY29va2llIHByZWZlcmVuY2VzXHJcbiAgICB2YXIgY29va2llUHJlZmVyZW5jZXMgPSBnZXRDb25zZW50Q29va2llKCk7XHJcblxyXG4gICAgLy8gSWYgbm8gcHJlZmVyZW5jZXMgb3Igb2xkIHZlcnNpb24gdXNlIHRoZSBkZWZhdWx0XHJcbiAgICBpZiAoIWlzVmFsaWRDb25zZW50Q29va2llKGNvb2tpZVByZWZlcmVuY2VzKSkge1xyXG4gICAgICAgIGNvb2tpZVByZWZlcmVuY2VzID0gREVGQVVMVF9DT09LSUVfQ09OU0VOVDtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKHZhciBjYXRlZ29yeSBpbiBDT09LSUVfQ0FURUdPUklFUykge1xyXG4gICAgICAgIHZhciBjb29raWVzSW5DYXRlZ29yeSA9IENPT0tJRV9DQVRFR09SSUVTW2NhdGVnb3J5XTtcclxuXHJcbiAgICAgICAgaWYgKGNvb2tpZXNJbkNhdGVnb3J5LmluZGV4T2YoY29va2llTmFtZSkgIT09ICctMScpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVzZXJBbGxvd3NDb29raWVDYXRlZ29yeShjYXRlZ29yeSwgY29va2llUHJlZmVyZW5jZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBEZW55IHRoZSBjb29raWUgaWYgaXQgaXMgbm90IGtub3duIHRvIHVzXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldENvb2tpZShuYW1lOiBzdHJpbmcpIHtcclxuICAgIHZhciBuYW1lRVEgPSBuYW1lICsgJz0nO1xyXG4gICAgdmFyIGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKTtcclxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjb29raWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGNvb2tpZSA9IGNvb2tpZXNbaV07XHJcbiAgICAgICAgd2hpbGUgKGNvb2tpZS5jaGFyQXQoMCkgPT09ICcgJykge1xyXG4gICAgICAgICAgICBjb29raWUgPSBjb29raWUuc3Vic3RyaW5nKDEsIGNvb2tpZS5sZW5ndGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29va2llLmluZGV4T2YobmFtZUVRKSA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGNvb2tpZS5zdWJzdHJpbmcobmFtZUVRLmxlbmd0aCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcblxyXG4vLyBkbyB3ZSBuZWVkIHRvIHNldCB0aGUgZG9tYWluP1xyXG5mdW5jdGlvbiBzZXRDb29raWUobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBvcHRpb25zPzogQ29va2llT3B0aW9ucykge1xyXG4gICAgaWYgKHVzZXJBbGxvd3NDb29raWUobmFtZSkpIHtcclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7fVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY29va2llU3RyaW5nID0gbmFtZSArICc9JyArIHZhbHVlICsgJzsgcGF0aD0vOyBTYW1lU2l0ZT1TdHJpY3QnO1xyXG4gICAgICAgIGlmIChvcHRpb25zLmRheXMpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkgKyAob3B0aW9ucy5kYXlzICogMjQgKiA2MCAqIDYwICogMTAwMCkpO1xyXG4gICAgICAgICAgICBjb29raWVTdHJpbmcgPSBjb29raWVTdHJpbmcgKyAnOyBleHBpcmVzPScgKyBkYXRlLnRvVVRDU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCA9PT0gJ2h0dHBzOicpIHtcclxuICAgICAgICAgICAgY29va2llU3RyaW5nID0gY29va2llU3RyaW5nICsgJzsgU2VjdXJlJztcclxuICAgICAgICB9XHJcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llU3RyaW5nO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVDb29raWUobmFtZTogc3RyaW5nKSB7XHJcbiAgICBpZiAoZ2V0Q29va2llKG5hbWUpKSB7XHJcbiAgICAgICAgLy8gQ29va2llcyBuZWVkIHRvIGJlIGRlbGV0ZWQgaW4gdGhlIHNhbWUgbGV2ZWwgb2Ygc3BlY2lmaWNpdHkgaW4gd2hpY2ggdGhleSB3ZXJlIHNldFxyXG4gICAgICAgIC8vIElmIGEgY29va2llIHdhcyBzZXQgd2l0aCBhIHNwZWNpZmllZCBkb21haW4sIGl0IG5lZWRzIHRvIGJlIHNwZWNpZmllZCB3aGVuIGRlbGV0ZWRcclxuICAgICAgICAvLyBJZiBhIGNvb2tpZSB3YXNuJ3Qgc2V0IHdpdGggdGhlIGRvbWFpbiBhdHRyaWJ1dGUsIGl0IHNob3VsZG4ndCBiZSB0aGVyZSB3aGVuIGRlbGV0ZWRcclxuICAgICAgICAvLyBZb3UgY2FuJ3QgdGVsbCBpZiBhIGNvb2tpZSB3YXMgc2V0IHdpdGggYSBkb21haW4gYXR0cmlidXRlIG9yIG5vdCwgc28gdHJ5IGJvdGggb3B0aW9uc1xyXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IG5hbWUgKyAnPTtleHBpcmVzPVRodSwgMDEgSmFuIDE5NzAgMDA6MDA6MDAgR01UO3BhdGg9Lyc7XHJcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gbmFtZSArICc9O2V4cGlyZXM9VGh1LCAwMSBKYW4gMTk3MCAwMDowMDowMCBHTVQ7ZG9tYWluPScgKyB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgKyAnO3BhdGg9Lyc7XHJcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gbmFtZSArICc9O2V4cGlyZXM9VGh1LCAwMSBKYW4gMTk3MCAwMDowMDowMCBHTVQ7ZG9tYWluPS4nICsgd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lICsgJztwYXRoPS8nO1xyXG4gICAgfVxyXG59Il19
