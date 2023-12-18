//todo: first time
//could use call(), but would have to squirrel the objects away
//(window as any).FamilyHubsFrontend.AddAnother.setCallback(function (element: HTMLElement) {
function setupAutocompleteWhenAddAnother(element) {
    if (!(element instanceof HTMLElement)) {
        return;
    }
    const languageSelects = element.querySelectorAll("[id^='language-']"); // [id$='\\d+']");
    languageSelects.forEach(function (select) {
        accessibleAutocomplete.enhanceSelectElement({
            //defaultValue: select.value,
            //todo: does it default to name in html?
            //name: select.name,
            name: 'languageName',
            defaultValue: '',
            selectElement: select
        });
    });
}
//todo: this is a hack - we want setupAutocompleteWhenAddAnother to be in the generated js file.
// if we export it, it includes the export keyword in the generated js file
// (but we use export in the other ts files, without the js containing export!)
// so as a workaround we call it where it no-ops
setupAutocompleteWhenAddAnother(null);
//});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxrQkFBa0I7QUFDbEIsK0RBQStEO0FBQy9ELDZGQUE2RjtBQUU3RixTQUFTLCtCQUErQixDQUFDLE9BQW9CO0lBRXpELElBQUksQ0FBQyxDQUFDLE9BQU8sWUFBWSxXQUFXLENBQUMsRUFBRSxDQUFDO1FBQ3BDLE9BQU87SUFDWCxDQUFDO0lBRUQsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixDQUFrQyxDQUFDLENBQUMsa0JBQWtCO0lBRTFILGVBQWUsQ0FBQyxPQUFPLENBQUMsVUFBVSxNQUFNO1FBQ3BDLHNCQUFzQixDQUFDLG9CQUFvQixDQUFDO1lBQ3hDLDZCQUE2QjtZQUM3Qix3Q0FBd0M7WUFDeEMsb0JBQW9CO1lBQ3BCLElBQUksRUFBRSxjQUFjO1lBQ3BCLFlBQVksRUFBRSxFQUFFO1lBQ2hCLGFBQWEsRUFBRSxNQUFNO1NBQ3hCLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVELGdHQUFnRztBQUNoRywyRUFBMkU7QUFDM0UsK0VBQStFO0FBQy9FLGdEQUFnRDtBQUNoRCwrQkFBK0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QyxLQUFLIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImRlY2xhcmUgY29uc3QgYWNjZXNzaWJsZUF1dG9jb21wbGV0ZTogYW55O1xyXG5cclxuLy90b2RvOiBmaXJzdCB0aW1lXHJcbi8vY291bGQgdXNlIGNhbGwoKSwgYnV0IHdvdWxkIGhhdmUgdG8gc3F1aXJyZWwgdGhlIG9iamVjdHMgYXdheVxyXG4vLyh3aW5kb3cgYXMgYW55KS5GYW1pbHlIdWJzRnJvbnRlbmQuQWRkQW5vdGhlci5zZXRDYWxsYmFjayhmdW5jdGlvbiAoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcclxuXHJcbmZ1bmN0aW9uIHNldHVwQXV0b2NvbXBsZXRlV2hlbkFkZEFub3RoZXIoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcclxuXHJcbiAgICBpZiAoIShlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGxhbmd1YWdlU2VsZWN0cyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltpZF49J2xhbmd1YWdlLSddXCIpIGFzIE5vZGVMaXN0T2Y8SFRNTFNlbGVjdEVsZW1lbnQ+OyAvLyBbaWQkPSdcXFxcZCsnXVwiKTtcclxuXHJcbiAgICBsYW5ndWFnZVNlbGVjdHMuZm9yRWFjaChmdW5jdGlvbiAoc2VsZWN0KSB7XHJcbiAgICAgICAgYWNjZXNzaWJsZUF1dG9jb21wbGV0ZS5lbmhhbmNlU2VsZWN0RWxlbWVudCh7XHJcbiAgICAgICAgICAgIC8vZGVmYXVsdFZhbHVlOiBzZWxlY3QudmFsdWUsXHJcbiAgICAgICAgICAgIC8vdG9kbzogZG9lcyBpdCBkZWZhdWx0IHRvIG5hbWUgaW4gaHRtbD9cclxuICAgICAgICAgICAgLy9uYW1lOiBzZWxlY3QubmFtZSxcclxuICAgICAgICAgICAgbmFtZTogJ2xhbmd1YWdlTmFtZScsXHJcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogJycsXHJcbiAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQ6IHNlbGVjdFxyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxufVxyXG5cclxuLy90b2RvOiB0aGlzIGlzIGEgaGFjayAtIHdlIHdhbnQgc2V0dXBBdXRvY29tcGxldGVXaGVuQWRkQW5vdGhlciB0byBiZSBpbiB0aGUgZ2VuZXJhdGVkIGpzIGZpbGUuXHJcbi8vIGlmIHdlIGV4cG9ydCBpdCwgaXQgaW5jbHVkZXMgdGhlIGV4cG9ydCBrZXl3b3JkIGluIHRoZSBnZW5lcmF0ZWQganMgZmlsZVxyXG4vLyAoYnV0IHdlIHVzZSBleHBvcnQgaW4gdGhlIG90aGVyIHRzIGZpbGVzLCB3aXRob3V0IHRoZSBqcyBjb250YWluaW5nIGV4cG9ydCEpXHJcbi8vIHNvIGFzIGEgd29ya2Fyb3VuZCB3ZSBjYWxsIGl0IHdoZXJlIGl0IG5vLW9wc1xyXG5zZXR1cEF1dG9jb21wbGV0ZVdoZW5BZGRBbm90aGVyKG51bGwpO1xyXG4vL30pOyJdfQ==
