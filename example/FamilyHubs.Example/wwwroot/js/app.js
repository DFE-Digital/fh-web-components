function setupAutocompleteWhenAddAnother(e){if(!(e instanceof HTMLElement))return;e.querySelectorAll("select[id^='language-']").forEach((function(e){accessibleAutocomplete.enhanceSelectElement({name:"languageName",defaultValue:"",selectElement:e});const t=document.getElementById(e.id.replace("-select",""));if(t.classList.contains("govuk-input")||t.classList.add("govuk-input"),e.classList.contains("govuk-select--error")){console.log("adding error class to input"),console.log(e.id.replace("-select",""));new MutationObserver(((e,s)=>{for(let s of e)"attributes"===s.type&&"class"===s.attributeName&&(console.log("The "+s.attributeName+" attribute was modified."),console.log(t.className),t.classList.contains("govuk-input")||t.classList.add("govuk-input"),t.classList.contains("govuk-input--error")||(t.classList.add("govuk-input--error"),console.log("readding class"),console.log(t.className)))})).observe(t,{attributes:!0}),console.log(t.id),console.log(t.className),t.classList.add("govuk-input--error"),console.log(t.className)}}))}setupAutocompleteWhenAddAnother(null);
//# sourceMappingURL=app.js.map
