declare const accessibleAutocomplete: any;

window.FamilyHubsFrontend.AddAnother.setCallback(function (element: HTMLElement) {

    const languageSelects = element.querySelectorAll("[id^='language-']") as NodeListOf<HTMLSelectElement>; // [id$='\\d+']");

    languageSelects.forEach(function (select) {
        accessibleAutocomplete.enhanceSelectElement({
            //defaultValue: select.value,
            //todo: does it default to name in html?
            //name: select.name,
            name: 'languageName',
            defaultValue: '',
            selectElement: select
        })
    });
});