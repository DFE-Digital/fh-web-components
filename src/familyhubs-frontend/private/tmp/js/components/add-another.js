// A version of the MOJ's add-another component that plays nice with the accessible autocomplete component.
// I did consider subclassing the MOJ's add-another component,
// but it would have been so coupled that it would've probably broken on an update of the MOJ library.
// So instead we forked it and made our own version.
window.FamilyHubsFrontend = window.FamilyHubsFrontend || {};
export function initializeAddAnother() {
    //todo: support options with scope?
    var $addAnothers = document.querySelectorAll('[data-module="fh-add-another"]');
    $addAnothers.forEach(function ($addAnother) {
        new window.FamilyHubsFrontend.AddAnother($addAnother);
    });
}
window.FamilyHubsFrontend.AddAnother = function (container) {
    this.container = $(container);
    //todo: this is a bit hacky - find a better way to do this
    var functionName = container.getAttribute('data-fh-add-another-callback');
    this.callback = null;
    document.addEventListener('DOMContentLoaded', function () {
        if (typeof window[functionName] === 'function') {
            this.callback = window[functionName];
            this.callback(container);
        }
    }.bind(this));
    if (this.container.data('fh-add-another-initialised')) {
        return;
    }
    this.container.data('fh-add-another-initialised', true);
    this.container.on('click', '.fh-add-another__remove-button', $.proxy(this, 'onRemoveButtonClick'));
    this.container.on('click', '.fh-add-another__add-button', $.proxy(this, 'onAddButtonClick'));
    this.container.find('.fh-add-another__add-button, fh-add-another__remove-button').prop('type', 'button');
};
window.FamilyHubsFrontend.AddAnother.prototype.onAddButtonClick = function (e) {
    var item = this.getNewItem();
    this.resetItem(item);
    var firstItem = this.getItems().first();
    if (!this.hasRemoveButton(firstItem)) {
        this.createRemoveButton(firstItem);
    }
    this.getItems().last().after(item);
    item.find('input, textarea, select').first().focus();
};
window.FamilyHubsFrontend.AddAnother.prototype.hasRemoveButton = function (item) {
    return item.find('.fh-add-another__remove-button').length;
};
window.FamilyHubsFrontend.AddAnother.prototype.getItems = function () {
    return this.container.find('.fh-add-another__item');
};
window.FamilyHubsFrontend.AddAnother.prototype.getNewItem = function () {
    // get the first item and clone it
    const items = this.getItems();
    const item = items[0].cloneNode(true);
    // find the autocomplete wrappers and remove the elements that are added by accessible-autocomplete
    const autocompleteWrappers = item.querySelectorAll('.autocomplete__wrapper');
    autocompleteWrappers.forEach(wrapper => {
        if (wrapper.parentNode.parentNode) {
            wrapper.parentNode.parentNode.removeChild(wrapper.parentNode);
        }
    });
    var $item = $(item);
    // update the id and name attributes
    this.updateAttributes(items.length, $item);
    // call the callback which needs to apply accessibility enhancements to the new item
    if (typeof this.callback === 'function') {
        this.callback(item);
    }
    // Create a remove button if it doesn't exist
    if (!this.hasRemoveButton($item)) {
        this.createRemoveButton($item);
    }
    return $item;
};
window.FamilyHubsFrontend.AddAnother.prototype.updateAttributes = function (index, item) {
    item.find('[data-name]').each(function (i, el) {
        var originalId = el.id;
        el.name = $(el).attr('data-name').replace(/%index%/, index);
        el.id = $(el).attr('data-id').replace(/%index%/, index);
        var label = $(el).siblings('label')[0] || $(el).parents('label')[0] || item.find('[for="' + originalId + '"]')[0];
        label.htmlFor = el.id;
    });
};
window.FamilyHubsFrontend.AddAnother.prototype.createRemoveButton = function (item) {
    item.append('<button type="button" class="govuk-button govuk-button--secondary fh-add-another__remove-button">Remove</button>');
};
window.FamilyHubsFrontend.AddAnother.prototype.resetItem = function (item) {
    // accessibile-autocomplete adds an input (without data-name or data-id)
    // so we blank all input controls
    item.find('input, textarea, select').each(function (index, el) {
        if (el.type == 'checkbox' || el.type == 'radio') {
            el.checked = false;
        }
        else {
            el.value = '';
        }
    });
};
window.FamilyHubsFrontend.AddAnother.prototype.onRemoveButtonClick = function (e) {
    $(e.currentTarget).parents('.fh-add-another__item').remove();
    var items = this.getItems();
    if (items.length === 1) {
        items.find('.fh-add-another__remove-button').remove();
    }
    items.each($.proxy(function (index, el) {
        this.updateAttributes(index, $(el));
    }, this));
    this.focusHeading();
};
window.FamilyHubsFrontend.AddAnother.prototype.focusHeading = function () {
    this.container.find('.fh-add-another__heading').focus();
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYWRkLWFub3RoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMkdBQTJHO0FBQzNHLDhEQUE4RDtBQUM5RCxzR0FBc0c7QUFDdEcsb0RBQW9EO0FBWXBELE1BQU0sQ0FBQyxrQkFBa0IsR0FBRyxNQUFNLENBQUMsa0JBQWtCLElBQUksRUFBRSxDQUFDO0FBRTVELE1BQU0sVUFBVSxvQkFBb0I7SUFDaEMsbUNBQW1DO0lBQ25DLElBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0lBRWxGLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxXQUFXO1FBQ3pDLElBQUksTUFBTSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNwRCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRCxNQUFNLENBQUMsa0JBQWtCLENBQUMsVUFBVSxHQUFHLFVBQVUsU0FBUztJQUN6RCxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUU5QiwwREFBMEQ7SUFDMUQsSUFBSSxZQUFZLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBRTFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRTtRQUM3QyxJQUFJLE9BQU8sTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLFVBQVUsRUFBRSxDQUFDO1lBQ2hELElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUIsQ0FBQztJQUNGLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUVkLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsNEJB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Q0FBQyxLQUFLLENBQUMsVUFBVSxLQUFLLEVBQUUsRUFBRTtRQUNyQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ1YsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0FBQ3JCLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRztJQUM3RCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ3pELENBQUMsQ0FBQyIsImZpbGUiOiJjb21wb25lbnRzL2FkZC1hbm90aGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQSB2ZXJzaW9uIG9mIHRoZSBNT0oncyBhZGQtYW5vdGhlciBjb21wb25lbnQgdGhhdCBwbGF5cyBuaWNlIHdpdGggdGhlIGFjY2Vzc2libGUgYXV0b2NvbXBsZXRlIGNvbXBvbmVudC5cclxuLy8gSSBkaWQgY29uc2lkZXIgc3ViY2xhc3NpbmcgdGhlIE1PSidzIGFkZC1hbm90aGVyIGNvbXBvbmVudCxcclxuLy8gYnV0IGl0IHdvdWxkIGhhdmUgYmVlbiBzbyBjb3VwbGVkIHRoYXQgaXQgd291bGQndmUgcHJvYmFibHkgYnJva2VuIG9uIGFuIHVwZGF0ZSBvZiB0aGUgTU9KIGxpYnJhcnkuXHJcbi8vIFNvIGluc3RlYWQgd2UgZm9ya2VkIGl0IGFuZCBtYWRlIG91ciBvd24gdmVyc2lvbi5cclxuXHJcbi8vdG9kbzogd2hlbiBhZGQgYSBjb3VwbGUgb2YgdGltZXMsIHRoZW4gcmVtb3ZlIHRoZSBtaWRkbGUsIHRoZSBpZCBvZiB0aGUgaW5wdXQgYW5kIGxhYmVscyBnZXQgb3V0IG9mIHdoYWNrXHJcbi8vdG9kbzogd2hlbiBhY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZSBjcmVhdGVzIHRoZSBpbnB1dCwgaXQgZG9lc24ndCBoYW5kbGUgdGhlIGFyaWEtZGVzY3JpYmVkYnkgY29ycmVjdGx5Li4uXHJcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbHBoYWdvdi9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9pc3N1ZXMvNTg5XHJcblxyXG4vL3RvZG86IHVzZSB0aGUgaW5kZXguZC50cyBmcm9tIGhlcmUuLi5cclxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2FscGhhZ292L2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2lzc3Vlcy81MzVcclxuZGVjbGFyZSBjb25zdCBhY2Nlc3NpYmxlQXV0b2NvbXBsZXRlOiBhbnk7XHJcblxyXG50eXBlIENhbGxiYWNrID0gKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA9PiB2b2lkO1xyXG5cclxud2luZG93LkZhbWlseUh1YnNGcm9udGVuZCA9IHdpbmRvdy5GYW1pbHlIdWJzRnJvbnRlbmQgfHwge307XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZUFkZEFub3RoZXIoKTogdm9pZCB7XHJcbiAgICAvL3RvZG86IHN1cHBvcnQgb3B0aW9ucyB3aXRoIHNjb3BlP1xyXG4gICAgdmFyICRhZGRBbm90aGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW1vZHVsZT1cImZoLWFkZC1hbm90aGVyXCJdJyk7XHJcblxyXG5cdCRhZGRBbm90aGVycy5mb3JFYWNoKGZ1bmN0aW9uICgkYWRkQW5vdGhlcikge1xyXG5cdFx0bmV3IHdpbmRvdy5GYW1pbHlIdWJzRnJvbnRlbmQuQWRkQW5vdGhlcigkYWRkQW5vdGhlcik7XHJcbiAgICB9KTtcclxufVxyXG5cclxud2luZG93LkZhbWlseUh1YnNGcm9udGVuZC5BZGRBbm90aGVyID0gZnVuY3Rpb24gKGNvbnRhaW5lcikge1xyXG5cdHRoaXMuY29udGFpbmVyID0gJChjb250YWluZXIpO1xyXG5cclxuXHQvL3RvZG86IHRoaXMgaXMgYSBiaXQgaGFja3kgLSBmaW5kIGEgYmV0dGVyIHdheSB0byBkbyB0aGlzXHJcblx0dmFyIGZ1bmN0aW9uTmFtZSA9IGNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmgtYWRkLWFub3RoZXItY2FsbGJhY2snKTtcclxuXHJcblx0dGhpcy5jYWxsYmFjayA9IG51bGw7XHJcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh0eXBlb2Ygd2luZG93W2Z1bmN0aW9uTmFtZV0gPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0dGhpcy5jYWxsYmFjayA9IHdpbmRvd1tmdW5jdGlvbk5hbWVdO1xyXG5cdFx0XHR0aGlzLmNhbGxiYWNrKGNvbnRhaW5lcik7XHJcblx0XHR9XHJcblx0fS5iaW5kKHRoaXMpKTtcclxuXHJcblx0aWYgKHRoaXMuY29udGFpbmVyLmRhdGEoJ2ZoLWFkZC1hbm90aGVyLWluaXRpYWxpc2VkJykpIHtcclxuXHRcdHJldHVyblxyXG5cdH1cclxuXHJcblx0dGhpcy5jb250YWluZXIuZGF0YSgnZmgtYWRkLWFub3RoZXItaW5pdGlhbGlzZWQnLCB0cnVlKTtcclxuXHJcblx0dGhpcy5jb250YWluZXIub24oJ2NsaWNrJywgJy5maC1hZGQtYW5vdGhlcl9fcmVtb3ZlLWJ1dHRvbicsICQucHJveHkodGhpcywgJ29uUmVtb3ZlQnV0dG9uQ2xpY2snKSk7XHJcblx0dGhpcy5jb250YWluZXIub24oJ2NsaWNrJywgJy5maC1hZGQtYW5vdGhlcl9fYWRkLWJ1dHRvbicsICQucHJveHkodGhpcywgJ29uQWRkQnV0dG9uQ2xpY2snKSk7XHJcblx0dGhpcy5jb250YWluZXIuZmluZCgnLmZoLWFkZC1hbm90aGVyX19hZGQtYnV0dG9uLCBmaC1hZGQtYW5vdGhlcl9fcmVtb3ZlLWJ1dHRvbicpLnByb3AoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbn07XHJcblxyXG53aW5kb3cuRmFtaWx5SHVic0Zyb250ZW5kLkFkZEFub3RoZXIucHJvdG90eXBlLm9uQWRkQnV0dG9uQ2xpY2sgPSBmdW5jdGlvbiAoZSkge1xyXG5cdHZhciBpdGVtID0gdGhpcy5nZXROZXdJdGVtKCk7XHJcblx0dGhpcy5yZXNldEl0ZW0oaXRlbSk7XHJcblx0dmFyIGZpcnN0SXRlbSA9IHRoaXMuZ2V0SXRlbXMoKS5maXJzdCgpO1xyXG5cdGlmICghdGhpcy5oYXNSZW1vdmVCdXR0b24oZmlyc3RJdGVtKSkge1xyXG5cdFx0dGhpcy5jcmVhdGVSZW1vdmVCdXR0b24oZmlyc3RJdGVtKTtcclxuXHR9XHJcblx0dGhpcy5nZXRJdGVtcygpLmxhc3QoKS5hZnRlcihpdGVtKTtcclxuXHRpdGVtLmZpbmQoJ2lucHV0LCB0ZXh0YXJlYSwgc2VsZWN0JykuZmlyc3QoKS5mb2N1cygpO1xyXG59O1xyXG5cclxud2luZG93LkZhbWlseUh1YnNGcm9udGVuZC5BZGRBbm90aGVyLnByb3RvdHlwZS5oYXNSZW1vdmVCdXR0b24gPSBmdW5jdGlvbiAoaXRlbSkge1xyXG5cdHJldHVybiBpdGVtLmZpbmQoJy5maC1hZGQtYW5vdGhlcl9fcmVtb3ZlLWJ1dHRvbicpLmxlbmd0aDtcclxufTtcclxuXHJcbndpbmRvdy5GYW1pbHlIdWJzRnJvbnRlbmQuQWRkQW5vdGhlci5wcm90b3R5cGUuZ2V0SXRlbXMgPSBmdW5jdGlvbiAoKSB7XHJcblx0cmV0dXJuIHRoaXMuY29udGFpbmVyLmZpbmQoJy5maC1hZGQtYW5vdGhlcl9faXRlbScpO1xyXG59O1xyXG5cclxud2luZG93LkZhbWlseUh1YnNGcm9udGVuZC5BZGRBbm90aGVyLnByb3RvdHlwZS5nZXROZXdJdGVtID0gZnVuY3Rpb24gKCkgeyAvLzogSlF1ZXJ5PEhUTUxFbGVtZW50PiAvL0hUTUxFbGVtZW50IHtcclxuICAgIC8vIGdldCB0aGUgZmlyc3QgaXRlbSBhbmQgY2xvbmUgaXRcclxuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5nZXRJdGVtcygpO1xyXG4gICAgY29uc3QgaXRlbSA9IGl0ZW1zWzBdLmNsb25lTm9kZSh0cnVlKSBhcyBIVE1MRWxlbWVudDtcclxuXHJcbiAgICAvLyBmaW5kIHRoZSBhdXRvY29tcGxldGUgd3JhcHBlcnMgYW5kIHJlbW92ZSB0aGUgZWxlbWVudHMgdGhhdCBhcmUgYWRkZWQgYnkgYWNjZXNzaWJsZS1hdXRvY29tcGxldGVcclxuICAgIGNvbnN0IGF1dG9jb21wbGV0ZVdyYXBwZXJzID0gaXRlbS5xdWVyeVNlbGVjdG9yQWxsKCcuYXV0b2NvbXBsZXRlX193cmFwcGVyJyk7XHJcbiAgICBhdXRvY29tcGxldGVXcmFwcGVycy5mb3JFYWNoKHdyYXBwZXIgPT4ge1xyXG4gICAgICAgIGlmICh3cmFwcGVyLnBhcmVudE5vZGUucGFyZW50Tm9kZSkge1xyXG5cdFx0XHR3cmFwcGVyLnBhcmVudE5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh3cmFwcGVyLnBhcmVudE5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHR2YXIgJGl0ZW0gPSAkKGl0ZW0pO1xyXG5cclxuXHQvLyB1cGRhdGUgdGhlIGlkIGFuZCBuYW1lIGF0dHJpYnV0ZXNcclxuXHR0aGlzLnVwZGF0ZUF0dHJpYnV0ZXMoaXRlbXMubGVuZ3RoLCAkaXRlbSk7XHJcblxyXG5cdC8vIGNhbGwgdGhlIGNhbGxiYWNrIHdoaWNoIG5lZWRzIHRvIGFwcGx5IGFjY2Vzc2liaWxpdHkgZW5oYW5jZW1lbnRzIHRvIHRoZSBuZXcgaXRlbVxyXG5cdGlmICh0eXBlb2YgdGhpcy5jYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0dGhpcy5jYWxsYmFjayhpdGVtKTtcclxuXHR9XHJcblxyXG4gICAgLy8gQ3JlYXRlIGEgcmVtb3ZlIGJ1dHRvbiBpZiBpdCBkb2Vzbid0IGV4aXN0XHJcbiAgICBpZiAoIXRoaXMuaGFzUmVtb3ZlQnV0dG9uKCRpdGVtKSkge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlUmVtb3ZlQnV0dG9uKCRpdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gJGl0ZW07XHJcbn07XHJcblxyXG53aW5kb3cuRmFtaWx5SHVic0Zyb250ZW5kLkFkZEFub3RoZXIucHJvdG90eXBlLnVwZGF0ZUF0dHJpYnV0ZXMgPSBmdW5jdGlvbiAoaW5kZXgsIGl0ZW0pIHtcclxuXHRpdGVtLmZpbmQoJ1tkYXRhLW5hbWVdJykuZWFjaChmdW5jdGlvbiAoaSwgZWwpIHtcclxuXHRcdHZhciBvcmlnaW5hbElkID0gZWwuaWRcclxuXHJcblx0XHRlbC5uYW1lID0gJChlbCkuYXR0cignZGF0YS1uYW1lJykucmVwbGFjZSgvJWluZGV4JS8sIGluZGV4KTtcclxuXHRcdGVsLmlkID0gJChlbCkuYXR0cignZGF0YS1pZCcpLnJlcGxhY2UoLyVpbmRleCUvLCBpbmRleCk7XHJcblxyXG5cdFx0dmFyIGxhYmVsID0gJChlbCkuc2libGluZ3MoJ2xhYmVsJylbMF0gfHwgJChlbCkucGFyZW50cygnbGFiZWwnKVswXSB8fCBpdGVtLmZpbmQoJ1tmb3I9XCInICsgb3JpZ2luYWxJZCArICdcIl0nKVswXTtcclxuXHRcdGxhYmVsLmh0bWxGb3IgPSBlbC5pZDtcclxuXHR9KTtcclxufTtcclxuXHJcbndpbmRvdy5GYW1pbHlIdWJzRnJvbnRlbmQuQWRkQW5vdGhlci5wcm90b3R5cGUuY3JlYXRlUmVtb3ZlQnV0dG9uID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHRpdGVtLmFwcGVuZCgnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJnb3Z1ay1idXR0b24gZ292dWstYnV0dG9uLS1zZWNvbmRhcnkgZmgtYWRkLWFub3RoZXJfX3JlbW92ZS1idXR0b25cIj5SZW1vdmU8L2J1dHRvbj4nKTtcclxufTtcclxuXHJcbndpbmRvdy5GYW1pbHlIdWJzRnJvbnRlbmQuQWRkQW5vdGhlci5wcm90b3R5cGUucmVzZXRJdGVtID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHQvLyBhY2Nlc3NpYmlsZS1hdXRvY29tcGxldGUgYWRkcyBhbiBpbnB1dCAod2l0aG91dCBkYXRhLW5hbWUgb3IgZGF0YS1pZClcclxuXHQvLyBzbyB3ZSBibGFuayBhbGwgaW5wdXQgY29udHJvbHNcclxuICAgIGl0ZW0uZmluZCgnaW5wdXQsIHRleHRhcmVhLCBzZWxlY3QnKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWwpIHtcclxuICAgICAgICBpZiAoZWwudHlwZSA9PSAnY2hlY2tib3gnIHx8IGVsLnR5cGUgPT0gJ3JhZGlvJykge1xyXG4gICAgICAgICAgICBlbC5jaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZWwudmFsdWUgPSAnJztcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbndpbmRvdy5GYW1pbHlIdWJzRnJvbnRlbmQuQWRkQW5vdGhlci5wcm90b3R5cGUub25SZW1vdmVCdXR0b25DbGljayA9IGZ1bmN0aW9uIChlKSB7XHJcblx0JChlLmN1cnJlbnRUYXJnZXQpLnBhcmVudHMoJy5maC1hZGQtYW5vdGhlcl9faXRlbScpLnJlbW92ZSgpO1xyXG5cdHZhciBpdGVtcyA9IHRoaXMuZ2V0SXRlbXMoKTtcclxuXHRpZiAoaXRlbXMubGVuZ3RoID09PSAxKSB7XHJcblx0XHRpdGVtcy5maW5kKCcuZmgtYWRkLWFub3RoZXJfX3JlbW92ZS1idXR0b24nKS5yZW1vdmUoKTtcclxuXHR9XHJcblx0aXRlbXMuZWFjaCgkLnByb3h5KGZ1bmN0aW9uIChpbmRleCwgZWwpIHtcclxuXHRcdHRoaXMudXBkYXRlQXR0cmlidXRlcyhpbmRleCwgJChlbCkpO1xyXG5cdH0sIHRoaXMpKTtcclxuXHR0aGlzLmZvY3VzSGVhZGluZygpO1xyXG59O1xyXG5cclxud2luZG93LkZhbWlseUh1YnNGcm9udGVuZC5BZGRBbm90aGVyLnByb3RvdHlwZS5mb2N1c0hlYWRpbmcgPSBmdW5jdGlvbiAoKSB7XHJcblx0dGhpcy5jb250YWluZXIuZmluZCgnLmZoLWFkZC1hbm90aGVyX19oZWFkaW5nJykuZm9jdXMoKTtcclxufTtcclxuIl19
