// js components were originally snaffled from https://github.com/alphagov/govuk-design-system/blob/main/src/javascripts/components/
import CookieBanner from './components/cookie-banner';
import CookiesPage from './components/cookies-page';
import initAnalytics from './components/analytics';
import initClarity from './components/clarity';
import { initializeAddAnother } from './components/add-another';
import { initializeBackButtons } from './components/back-links';
import { initializeVisibilityToggles } from './components/visibility-toggle';
import { OpenCloseButton } from './components/open-close-button';
//todo: consistency in module/proto/class style
window.FamilyHubsFrontend = window.FamilyHubsFrontend || {};
window.FamilyHubsFrontend.initAll = () => {
    // Initialise cookie banner
    const $cookieBanner = document.querySelector('[data-module="govuk-cookie-banner"]');
    new CookieBanner($cookieBanner).init();
    initAnalytics(window.GA_MEASUREMENT_ID);
    initClarity(window.CLARITY_ID);
    //todo: move this into scripts section on cookie page
    // Initialise cookie page
    var $cookiesPage = document.querySelector('[data-module="fh-cookies-page"]');
    new CookiesPage($cookiesPage).init();
    initializeBackButtons();
    initializeVisibilityToggles();
    initializeAddAnother();
    // initialise open close buttons
    let openCloseButtons = document.querySelectorAll('button[data-open-close-mobile]');
    openCloseButtons === null || openCloseButtons === void 0 ? void 0 : openCloseButtons.forEach((openCloseButton) => {
        new OpenCloseButton(openCloseButton);
    });
};
//todo: do we want to do this...
//document.addEventListener("DOMContentLoaded", function () {
window.GOVUKFrontend.initAll();
window.MOJFrontend.initAll();
window.FamilyHubsFrontend.initAll();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZhbWlseWh1YnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0lBQW9JO0FBc0JwSSxPQUFPLFlBQVksTUFBTSw0QkFBNEIsQ0FBQTtBQUNyRCxPQUFPLFdBQVcsTUFBTSwyQkFBMkIsQ0FBQTtBQUNuRCxPQUFPLGFBQWEsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLFdBQVcsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFakUsK0NBQStDO0FBRS9DLE1BQU0sQ0FBQyxrQkFBa0IsR0FBRyxNQUFNLENBQUMsa0JBQWtCLElBQUksRUFBRSxDQUFDO0FBQzVELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFO0lBRXJDLDJCQUEyQjtJQUMzQixNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHFDQUFxQyxDQUF1QixDQUFDO0lBQzFHLElBQUksWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBRXZDLGFBQWEsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN4QyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRS9CLHFEQUFxRDtJQUNyRCx5QkFBeUI7SUFDekIsSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0lBQzdFLElBQUksV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBRXJDLHFCQUFxQixFQUFFLENBQUM7SUFDeEIsMkJBQTJCLEVBQUUsQ0FBQztJQUM5QixvQkFBb0IsRUFBRSxDQUFDO0lBRXZCLGdDQUFnQztJQUNoQyxJQUFJLGdCQUFnQixHQUFrQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztJQUNsSCxnQkFBZ0IsYUFBaEIsZ0JBQWdCLHVCQUFoQixnQkFBZ0IsQ0FBRSxPQUFPLENBQUMsQ0FBQyxlQUFlLEVBQUUsRUFBRTtRQUMxQyxJQUFJLGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQztBQUVGLGdDQUFnQztBQUNoQyw2REFBNkQ7QUFFN0QsTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUMvQixNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQzdCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyIsImZpbGUiOiJmYW1pbHlodWJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8ganMgY29tcG9uZW50cyB3ZXJlIG9yaWdpbmFsbHkgc25hZmZsZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vYWxwaGFnb3YvZ292dWstZGVzaWduLXN5c3RlbS9ibG9iL21haW4vc3JjL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvXG5cbi8vdG9kbzogc3dhcCB0byBhIGNvbXBvbmVudHMgZm9sZGVyP1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gICAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgICAgIEdEU19DT05TRU5UX0NPT0tJRV9WRVJTSU9OOiBudW1iZXI7XG4gICAgICAgIEdBX01FQVNVUkVNRU5UX0lEOiBzdHJpbmc7XG4gICAgICAgIEdBX0NPTlRBSU5FUl9JRDogc3RyaW5nO1xuICAgICAgICBHQV9DT09LSUVfTkFNRTogc3RyaW5nO1xuICAgICAgICBDTEFSSVRZX0lEOiBzdHJpbmc7XG4gICAgICAgIGRhdGFMYXllcjogYW55W107XG4gICAgICAgIEZhbWlseUh1YnNGcm9udGVuZDogYW55O1xuICAgICAgICBHT1ZVS0Zyb250ZW5kOiB7XG4gICAgICAgICAgICBpbml0QWxsOiAoKSA9PiB2b2lkO1xuICAgICAgICB9XG4gICAgICAgIE1PSkZyb250ZW5kOiB7XG4gICAgICAgICAgICBpbml0QWxsOiAoKSA9PiB2b2lkO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5pbXBvcnQgQ29va2llQmFubmVyIGZyb20gJy4vY29tcG9uZW50cy9jb29raWUtYmFubmVyJ1xuaW1wb3J0IENvb2tpZXNQYWdlIGZyb20gJy4vY29tcG9uZW50cy9jb29raWVzLXBhZ2UnXG5pbXBvcnQgaW5pdEFuYWx5dGljcyBmcm9tICcuL2NvbXBvbmVudHMvYW5hbHl0aWNzJztcbmltcG9ydCBpbml0Q2xhcml0eSBmcm9tICcuL2NvbXBvbmVudHMvY2xhcml0eSc7XG5pbXBvcnQgeyBpbml0aWFsaXplQWRkQW5vdGhlciB9IGZyb20gJy4vY29tcG9uZW50cy9hZGQtYW5vdGhlcic7XG5pbXBvcnQgeyBpbml0aWFsaXplQmFja0J1dHRvbnMgfSBmcm9tICcuL2NvbXBvbmVudHMvYmFjay1saW5rcyc7XG5pbXBvcnQgeyBpbml0aWFsaXplVmlzaWJpbGl0eVRvZ2dsZXMgfSBmcm9tICcuL2NvbXBvbmVudHMvdmlzaWJpbGl0eS10b2dnbGUnO1xuaW1wb3J0IHsgT3BlbkNsb3NlQnV0dG9uIH0gZnJvbSAnLi9jb21wb25lbnRzL29wZW4tY2xvc2UtYnV0dG9uJztcblxuLy90b2RvOiBjb25zaXN0ZW5jeSBpbiBtb2R1bGUvcHJvdG8vY2xhc3Mgc3R5bGVcblxud2luZG93LkZhbWlseUh1YnNGcm9udGVuZCA9IHdpbmRvdy5GYW1pbHlIdWJzRnJvbnRlbmQgfHwge307XG53aW5kb3cuRmFtaWx5SHVic0Zyb250ZW5kLmluaXRBbGwgPSAoKSA9PiB7XG5cbiAgICAvLyBJbml0aWFsaXNlIGNvb2tpZSBiYW5uZXJcbiAgICBjb25zdCAkY29va2llQmFubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtbW9kdWxlPVwiZ292dWstY29va2llLWJhbm5lclwiXScpIGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgICBuZXcgQ29va2llQmFubmVyKCRjb29raWVCYW5uZXIpLmluaXQoKTtcblxuICAgIGluaXRBbmFseXRpY3Mod2luZG93LkdBX01FQVNVUkVNRU5UX0lEKTtcbiAgICBpbml0Q2xhcml0eSh3aW5kb3cuQ0xBUklUWV9JRCk7XG5cbiAgICAvL3RvZG86IG1vdmUgdGhpcyBpbnRvIHNjcmlwdHMgc2VjdGlvbiBvbiBjb29raWUgcGFnZVxuICAgIC8vIEluaXRpYWxpc2UgY29va2llIHBhZ2VcbiAgICB2YXIgJGNvb2tpZXNQYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtbW9kdWxlPVwiZmgtY29va2llcy1wYWdlXCJdJyk7XG4gICAgbmV3IENvb2tpZXNQYWdlKCRjb29raWVzUGFnZSkuaW5pdCgpO1xuXG4gICAgaW5pdGlhbGl6ZUJhY2tCdXR0b25zKCk7XG4gICAgaW5pdGlhbGl6ZVZpc2liaWxpdHlUb2dnbGVzKCk7XG4gICAgaW5pdGlhbGl6ZUFkZEFub3RoZXIoKTtcblxuICAgIC8vIGluaXRpYWxpc2Ugb3BlbiBjbG9zZSBidXR0b25zXG4gICAgbGV0IG9wZW5DbG9zZUJ1dHRvbnM6IE5vZGVMaXN0T2Y8SFRNTEJ1dHRvbkVsZW1lbnQ+ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uW2RhdGEtb3Blbi1jbG9zZS1tb2JpbGVdJyk7XG4gICAgb3BlbkNsb3NlQnV0dG9ucz8uZm9yRWFjaCgob3BlbkNsb3NlQnV0dG9uKSA9PiB7XG4gICAgICAgIG5ldyBPcGVuQ2xvc2VCdXR0b24ob3BlbkNsb3NlQnV0dG9uKTtcbiAgICB9KTtcbn07XG5cbi8vdG9kbzogZG8gd2Ugd2FudCB0byBkbyB0aGlzLi4uXG4vL2RvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcblxud2luZG93LkdPVlVLRnJvbnRlbmQuaW5pdEFsbCgpO1xud2luZG93Lk1PSkZyb250ZW5kLmluaXRBbGwoKTtcbndpbmRvdy5GYW1pbHlIdWJzRnJvbnRlbmQuaW5pdEFsbCgpO1xuIl19
