declare const accessibleAutocomplete: any;

//todo: could do most of this from supplying an attribute to id the appropriate selects
// then we could remove all the hacks
function setupAutocompleteWhenAddAnother(element: HTMLElement) {

    if (!(element instanceof HTMLElement)) {
        return;
    }

    const languageSelects = element.querySelectorAll("select[id^='language-']") as NodeListOf<HTMLSelectElement>; // [id$='\\d+']");

    languageSelects.forEach(function (select) {
        accessibleAutocomplete.enhanceSelectElement({
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