const languageSelects = document.querySelectorAll("[id^='language-']"); // [id$='\\d+']");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLENBQWtDLENBQUMsQ0FBQyxrQkFBa0I7QUFFM0gsZUFBZSxDQUFDLE9BQU8sQ0FBQyxVQUFVLE1BQU07SUFDcEMsc0JBQXNCLENBQUMsb0JBQW9CLENBQUM7UUFDeEMsNkJBQTZCO1FBQzdCLHdDQUF3QztRQUN4QyxvQkFBb0I7UUFDcEIsSUFBSSxFQUFFLGNBQWM7UUFDcEIsWUFBWSxFQUFFLEVBQUU7UUFDaEIsYUFBYSxFQUFFLE1BQU07S0FDeEIsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZGVjbGFyZSBjb25zdCBhY2Nlc3NpYmxlQXV0b2NvbXBsZXRlOiBhbnk7XHJcblxyXG5jb25zdCBsYW5ndWFnZVNlbGVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2lkXj0nbGFuZ3VhZ2UtJ11cIikgYXMgTm9kZUxpc3RPZjxIVE1MU2VsZWN0RWxlbWVudD47IC8vIFtpZCQ9J1xcXFxkKyddXCIpO1xyXG5cclxubGFuZ3VhZ2VTZWxlY3RzLmZvckVhY2goZnVuY3Rpb24gKHNlbGVjdCkge1xyXG4gICAgYWNjZXNzaWJsZUF1dG9jb21wbGV0ZS5lbmhhbmNlU2VsZWN0RWxlbWVudCh7XHJcbiAgICAgICAgLy9kZWZhdWx0VmFsdWU6IHNlbGVjdC52YWx1ZSxcclxuICAgICAgICAvL3RvZG86IGRvZXMgaXQgZGVmYXVsdCB0byBuYW1lIGluIGh0bWw/XHJcbiAgICAgICAgLy9uYW1lOiBzZWxlY3QubmFtZSxcclxuICAgICAgICBuYW1lOiAnbGFuZ3VhZ2VOYW1lJyxcclxuICAgICAgICBkZWZhdWx0VmFsdWU6ICcnLFxyXG4gICAgICAgIHNlbGVjdEVsZW1lbnQ6IHNlbGVjdFxyXG4gICAgfSlcclxufSk7XHJcbiJdfQ==
