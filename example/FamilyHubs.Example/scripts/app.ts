declare const accessibleAutocomplete: any;

const languageSelects = document.querySelectorAll("[id^='language-']") as NodeListOf<HTMLSelectElement>; // [id$='\\d+']");

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
