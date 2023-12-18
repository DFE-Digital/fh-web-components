declare const accessibleAutocomplete: any;

//todo: first time
//could use call(), but would have to squirrel the objects away
//(window as any).FamilyHubsFrontend.AddAnother.setCallback(function (element: HTMLElement) {

function setupAutocompleteWhenAddAnother(element: HTMLElement) {

    if (!(element instanceof HTMLElement)) {
        return;
    }

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
}

//todo: this is a hack - we want setupAutocompleteWhenAddAnother to be in the generated js file.
// if we export it, it includes the export keyword in the generated js file
// (but we use export in the other ts files, without the js containing export!)
// so as a workaround we call it where it no-ops
setupAutocompleteWhenAddAnother(null);
//});