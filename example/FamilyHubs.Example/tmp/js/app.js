//todo: could do most of this from supplying an attribute to id the appropriate selects
// then we could remove all the hacks
function setupAutocompleteWhenAddAnother(element) {
    if (!(element instanceof HTMLElement)) {
        return;
    }
    const languageSelects = element.querySelectorAll("select[id^='language-']"); // [id$='\\d+']");
    languageSelects.forEach(function (select) {
        accessibleAutocomplete.enhanceSelectElement({
            name: 'languageName',
            defaultValue: '',
            selectElement: select
        });
        //work around accessible-autocomplete not handling errors
        // there's a discussion here about it...
        // https://github.com/alphagov/accessible-autocomplete/issues/428
        // but we've had to implement our own (hacky) solution by using MutationObserver
        // and adding extra classes (with custom css) to the input element
        //todo: package up this code into an exported function to ease reuse and maintanence
        const input = document.getElementById(select.id.replace('-select', ''));
        if (!input.classList.contains('govuk-input')) {
            input.classList.add('govuk-input');
        }
        if (select.classList.contains('govuk-select--error')) {
            console.log('adding error class to input');
            console.log(select.id.replace('-select', ''));
            //const input = document.getElementById(select.id.replace('-select', '')) as HTMLInputElement;
            //todo: fix aria-describedBy on the input too
            // see https://github.com/alphagov/accessible-autocomplete/issues/589
            const observer = new MutationObserver((mutationsList, observer) => {
                for (let mutation of mutationsList) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        console.log('The ' + mutation.attributeName + ' attribute was modified.');
                        console.log(input.className);
                        if (!input.classList.contains('govuk-input')) {
                            input.classList.add('govuk-input');
                        }
                        if (!input.classList.contains('govuk-input--error')) {
                            input.classList.add('govuk-input--error');
                            console.log('readding class');
                            console.log(input.className);
                        }
                    }
                }
            });
            observer.observe(input, { attributes: true });
            console.log(input.id);
            console.log(input.className);
            input.classList.add('govuk-input--error');
            console.log(input.className);
        }
    });
}
//todo: this is a hack - we want setupAutocompleteWhenAddAnother to be in the generated js file.
// if we export it, it includes the export keyword in the generated js file
// (but we use export in the other ts files, without the js containing export!)
// so as a workaround we call it where it no-ops
setupAutocompleteWhenAddAnother(null);
//});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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S0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzdCLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVELGdHQUFnRztBQUNoRywyRUFBMkU7QUFDM0UsK0VBQStFO0FBQy9FLGdEQUFnRDtBQUNoRCwrQkFBK0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QyxLQUFLIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImRlY2xhcmUgY29uc3QgYWNjZXNzaWJsZUF1dG9jb21wbGV0ZTogYW55O1xyXG5cclxuLy90b2RvOiBjb3VsZCBkbyBtb3N0IG9mIHRoaXMgZnJvbSBzdXBwbHlpbmcgYW4gYXR0cmlidXRlIHRvIGlkIHRoZSBhcHByb3ByaWF0ZSBzZWxlY3RzXHJcbi8vIHRoZW4gd2UgY291bGQgcmVtb3ZlIGFsbCB0aGUgaGFja3NcclxuZnVuY3Rpb24gc2V0dXBBdXRvY29tcGxldGVXaGVuQWRkQW5vdGhlcihlbGVtZW50OiBIVE1MRWxlbWVudCkge1xyXG5cclxuICAgIGlmICghKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbGFuZ3VhZ2VTZWxlY3RzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic2VsZWN0W2lkXj0nbGFuZ3VhZ2UtJ11cIikgYXMgTm9kZUxpc3RPZjxIVE1MU2VsZWN0RWxlbWVudD47IC8vIFtpZCQ9J1xcXFxkKyddXCIpO1xyXG5cclxuICAgIGxhbmd1YWdlU2VsZWN0cy5mb3JFYWNoKGZ1bmN0aW9uIChzZWxlY3QpIHtcclxuICAgICAgICBhY2Nlc3NpYmxlQXV0b2NvbXBsZXRlLmVuaGFuY2VTZWxlY3RFbGVtZW50KHtcclxuICAgICAgICAgICAgbmFtZTogJ2xhbmd1YWdlTmFtZScsXHJcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogJycsXHJcbiAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQ6IHNlbGVjdFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL3dvcmsgYXJvdW5kIGFjY2Vzc2libGUtYXV0b2NvbXBsZXRlIG5vdCBoYW5kbGluZyBlcnJvcnNcclxuICAgICAgICAvLyB0aGVyZSdzIGEgZGlzY3Vzc2lvbiBoZXJlIGFib3V0IGl0Li4uXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FscGhhZ292L2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2lzc3Vlcy80MjhcclxuICAgICAgICAvLyBidXQgd2UndmUgaGFkIHRvIGltcGxlbWVudCBvdXIgb3duIChoYWNreSkgc29sdXRpb24gYnkgdXNpbmcgTXV0YXRpb25PYnNlcnZlclxyXG4gICAgICAgIC8vIGFuZCBhZGRpbmcgZXh0cmEgY2xhc3NlcyAod2l0aCBjdXN0b20gY3NzKSB0byB0aGUgaW5wdXQgZWxlbWVudFxyXG5cclxuICAgICAgICAvL3RvZG86IHBhY2thZ2UgdXAgdGhpcyBjb2RlIGludG8gYW4gZXhwb3J0ZWQgZnVuY3Rpb24gdG8gZWFzZSByZXVzZSBhbmQgbWFpbnRhbmVuY2VcclxuXHJcbiAgICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxlY3QuaWQucmVwbGFjZSgnLXNlbGVjdCcsICcnKSkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICBpZiAoIWlucHV0LmNsYXNzTGlzdC5jb250YWlucygnZ292dWstaW5wdXQnKSkge1xyXG4gICAgICAgICAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKCdnb3Z1ay1pbnB1dCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNlbGVjdC5jbGFzc0xpc3QuY29udGFpbnMoJ2dvdnVrLXNlbGVjdC0tZXJyb3InKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYWRkaW5nIGVycm9yIGNsYXNzIHRvIGlucHV0Jyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlbGVjdC5pZC5yZXBsYWNlKCctc2VsZWN0JywgJycpKTtcclxuICAgICAgICAgICAgLy9jb25zdCBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGVjdC5pZC5yZXBsYWNlKCctc2VsZWN0JywgJycpKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICAgICAgICAgICAgLy90b2RvOiBmaXggYXJpYS1kZXNjcmliZWRCeSBvbiB0aGUgaW5wdXQgdG9vXHJcbiAgICAgICAgICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vYWxwaGFnb3YvYWNjZXNzaWJsZS1hdXRvY29tcGxldGUvaXNzdWVzLzU4OVxyXG5cclxuICAgICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zTGlzdCwgb2JzZXJ2ZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IG11dGF0aW9uIG9mIG11dGF0aW9uc0xpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobXV0YXRpb24udHlwZSA9PT0gJ2F0dHJpYnV0ZXMnICYmIG11dGF0aW9uLmF0dHJpYnV0ZU5hbWUgPT09ICdjbGFzcycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1RoZSAnICsgbXV0YXRpb24uYXR0cmlidXRlTmFtZSArICcgYXR0cmlidXRlIHdhcyBtb2RpZmllZC4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGlucHV0LmNsYXNzTmFtZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlucHV0LmNsYXNzTGlzdC5jb250YWlucygnZ292dWstaW5wdXQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuY2xhc3NMaXN0LmFkZCgnZ292dWstaW5wdXQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpbnB1dC5jbGFzc0xpc3QuY29udGFpbnMoJ2dvdnVrLWlucHV0LS1lcnJvcicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKCdnb3Z1ay1pbnB1dC0tZXJyb3InKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZWFkZGluZyBjbGFzcycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW5wdXQuY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGlucHV0LCB7IGF0dHJpYnV0ZXM6IHRydWUgfSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGlucHV0LmlkKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coaW5wdXQuY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgaW5wdXQuY2xhc3NMaXN0LmFkZCgnZ292dWstaW5wdXQtLWVycm9yJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGlucHV0LmNsYXNzTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vdG9kbzogdGhpcyBpcyBhIGhhY2sgLSB3ZSB3YW50IHNldHVwQXV0b2NvbXBsZXRlV2hlbkFkZEFub3RoZXIgdG8gYmUgaW4gdGhlIGdlbmVyYXRlZCBqcyBmaWxlLlxyXG4vLyBpZiB3ZSBleHBvcnQgaXQsIGl0IGluY2x1ZGVzIHRoZSBleHBvcnQga2V5d29yZCBpbiB0aGUgZ2VuZXJhdGVkIGpzIGZpbGVcclxuLy8gKGJ1dCB3ZSB1c2UgZXhwb3J0IGluIHRoZSBvdGhlciB0cyBmaWxlcywgd2l0aG91dCB0aGUganMgY29udGFpbmluZyBleHBvcnQhKVxyXG4vLyBzbyBhcyBhIHdvcmthcm91bmQgd2UgY2FsbCBpdCB3aGVyZSBpdCBuby1vcHNcclxuc2V0dXBBdXRvY29tcGxldGVXaGVuQWRkQW5vdGhlcihudWxsKTtcclxuLy99KTsiXX0=
