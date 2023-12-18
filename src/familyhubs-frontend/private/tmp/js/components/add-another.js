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
    var functionName = container.getAttribute('data-fh-add-another-callback');
    this.callback = null;
    document.addEventListener('DOMContentLoaded', function () {
        if (typeof window[functionName] === 'function') {
            this.callback = window[functionName];
            this.callback(container);
        }
    }.bind(this));
    //if (typeof window[functionName] === 'function') {
    //	(function () {
    //		this.callback = window[functionName];
    //		this.callback();
    //	}());
    //	document.addEventListener('DOMContentLoaded', function () {
    //		setupAutocompleteWhenAddAnother(null);
    //	});
    //} else {
    //	this.callback = null;
    //}
    if (this.container.data('fh-add-another-initialised')) {
        return;
    }
    this.container.data('fh-add-another-initialised', true);
    this.container.on('click', '.fh-add-another__remove-button', $.proxy(this, 'onRemoveButtonClick'));
    this.container.on('click', '.fh-add-another__add-button', $.proxy(this, 'onAddButtonClick'));
    this.container.find('.fh-add-another__add-button, fh-add-another__remove-button').prop('type', 'button');
};
//window.FamilyHubsFrontend.AddAnother.prototype.setCallback = function (callback: Callback) {
//	this.callback = callback;
//	var $addAnothers = document.querySelectorAll('[data-module="fh-add-another"]');
//	$addAnothers.forEach(function ($addAnother) {
//		if (typeof this.callback === 'function') {
//			this.callback($addAnother);
//		}
//	});
//};
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYWRkLWFub3RoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMkdBQTJHO0FBQzNHLDhEQUE4RDtBQUM5RCxzR0FBc0c7QUFDdEcsb0RBQW9EO0FBa0JwRCxNQUFNLENBQUMsa0JBQWtCLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixJQUFJLEVBQUUsQ0FBQztBQUU1RCxNQUFNLFVBQVUsb0JBQW9CO0lBQ2hDLG1DQUFtQztJQUNuQyxJQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztJQUVsRixZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsV0FBVztRQUN6QyxJQUFJLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDcEQsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsR0FBRyxVQUFVLFNBQVM7SUFDekQsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFOUIsSUFBSSxZQUFZLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBRTFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRTtRQUM3QyxJQUFJLE9BQU8sTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLFVBQVUsRUFBRSxDQUFDO1lBQ2hELElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUIsQ0FBQztJQUNGLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUdkLG1EQUFtRDtJQUNuRCxpQkFBaUI7SUFDakIseUNBQXlDO0lBQ3pDLG9CQUFvQjtJQUNwQixRQUFRO0lBRVIsOERBQThEO0lBQzlELDBDQUEwQztJQUMxQyxNQUFNO0lBQ04sVUFBVTtJQUNWLHdCQUF3QjtJQUN4QixHQUFHO0lBRUgsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxFQUFFLENBQUM7UUFDdkQsT0FBTTtJQUNQLENBQUM7SUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUV4RCxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUscUJBQXFCLENBQUMsQ0FBQyxDQUFDO0lBQ25HLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7SUFDN0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsNERBQTRELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzFHLENBQUMsQ0FBQztBQUVGLDhGQUE4RjtBQUM5Riw0QkFBNEI7QUFFNUIsa0ZBQWtGO0FBRWxGLGdEQUFnRDtBQUNoRCw4Q0FBOEM7QUFDOUMsZ0NBQWdDO0FBQ2hDLEtBQUs7QUFDTCxNQUFNO0FBQ04sSUFBSTtBQUVKLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLGdCQUFnQixHQUFHLFVBQVUsQ0FBQztJQUM1RSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUNELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ3RELENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLGVBQWUsR0FBRyxVQUFVLElBQUk7SUFDOUUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLENBQUMsTUFBTSxDQUFDO0FBQzNELENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRztJQUN6RCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFDckQsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHO0lBQ3hELGtDQUFrQztJQUNsQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDOUIsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQWdCLENBQUM7SUFFckQsbUdBQW1HO0lBQ25HLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFDN0Usb0JBQW9CLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ25DLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUN6QyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pELENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVOLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVwQixvQ0FBb0M7SUFDcEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFFM0Msb0ZBQW9GO0lBQ3BGLElBQUksT0FBTyxJQUFJLENBQUMsUUFBUSxLQUFLLFVBQVUsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVFLDZDQUE2QztJQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEdBQUcsVUFBVSxLQUFLLEVBQUUsSUFBSTtJQUN0RixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFO1FBQzVDLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUE7UUFFdEIsRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDNUQsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsSCxLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDdkIsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsR0FBRyxVQUFVLElBQUk7SUFDakYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxrSEFBa0gsQ0FBQyxDQUFDO0FBQ2pJLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxVQUFVLElBQUk7SUFDeEUsd0VBQXdFO0lBQ3hFLGlDQUFpQztJQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxFQUFFLEVBQUU7UUFDekQsSUFBSSxFQUFFLENBQUMsSUFBSSxJQUFJLFVBQVUsSUFBSSxFQUFFLENBQUMsSUFBSSxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQzlDLEVBQUUsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLENBQUM7YUFBTSxDQUFDO1lBQ0osRUFBRSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDbEIsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLEdBQUcsVUFBVSxDQUFDO0lBQy9FLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDN0QsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzVCLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUN4QixLQUFLLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDdkQsQ0FBQztJQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLEtBQUssRUFBRSxFQUFFO1FBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDckMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDVixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7QUFDckIsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHO0lBQzdELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDekQsQ0FBQyxDQUFDIiwiZmlsZSI6ImNvbXBvbmVudHMvYWRkLWFub3RoZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBIHZlcnNpb24gb2YgdGhlIE1PSidzIGFkZC1hbm90aGVyIGNvbXBvbmVudCB0aGF0IHBsYXlzIG5pY2Ugd2l0aCB0aGUgYWNjZXNzaWJsZSBhdXRvY29tcGxldGUgY29tcG9uZW50LlxyXG4vLyBJIGRpZCBjb25zaWRlciBzdWJjbGFzc2luZyB0aGUgTU9KJ3MgYWRkLWFub3RoZXIgY29tcG9uZW50LFxyXG4vLyBidXQgaXQgd291bGQgaGF2ZSBiZWVuIHNvIGNvdXBsZWQgdGhhdCBpdCB3b3VsZCd2ZSBwcm9iYWJseSBicm9rZW4gb24gYW4gdXBkYXRlIG9mIHRoZSBNT0ogbGlicmFyeS5cclxuLy8gU28gaW5zdGVhZCB3ZSBmb3JrZWQgaXQgYW5kIG1hZGUgb3VyIG93biB2ZXJzaW9uLlxyXG5cclxuLy90b2RvOiB0aGUgY3JlYXRlZCBhY2Nlc3NpYmxlICBpbnB1dCB3aGVuIGFkZGluZyBkb2Vzbid0IGhhdmUgdGhlIGlkL25hbWUgZGF0YSBhdHRycywgc28gd2UgZ2V0IGR1cGUgaWRzXHJcbi8vdG9kbzogdGhlcmUgc2VlbXMgdG8gYmUgYSBidWcgaW4gYWNjZXNzaWJsZS1hdXRvY29tcGxldGUgd2hlcmUgdGhlIGlucHV0IGl0IGNyZWF0ZXMgaGFzIHRoZSBzYW1lIGlkIGFzIHRoZSBzZWxlY3RcclxuLy90b2RvOiB3ZSBuZWVkIHRvIGluaXRpYWxpc2UgdGhlIGFjY2Vzc2libGUgYXV0b2NvbXBsZXRlIG9uIHRoZSBuZXcgaXRlbVxyXG4vL3RvZG86IHdoZW4gZW5oYW5jaW5nIHRoZSBzZWxlY3QgaW4gYWNjZXNzaWJsZS1hdXRvY29tcGxldGUsIGl0IHJldHVybnMgdGhlIG5hbWUgcmF0aGVyIHRoYW4gdGhlIHZhbHVlXHJcbi8vIHRoZXJlJ3MgYSB3b3JrYXJvdW5kLi4uXHJcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbHBoYWdvdi9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9pc3N1ZXMvMzg3XHJcbi8vIGJ1dCB3ZSBjb3VsZCB3ZSByb2xsIGl0IGludG8gb3VyIGFkZC1hbm90aGVyIGNvbXBvbmVudD9cclxuLy90b2RvOiB3aGVuIGFjY2Vzc2libGUtYXV0b2NvbXBsZXRlIGNyZWF0ZXMgdGhlIGlucHV0LCBpdCBkb2Vzbid0IGhhbmRsZSB0aGUgYXJpYS1kZXNjcmliZWRieSBjb3JyZWN0bHkuLi5cclxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2FscGhhZ292L2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2lzc3Vlcy81ODlcclxuXHJcbi8vdG9kbzogdXNlIHRoZSBpbmRleC5kLnRzIGZyb20gaGVyZS4uLlxyXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYWxwaGFnb3YvYWNjZXNzaWJsZS1hdXRvY29tcGxldGUvaXNzdWVzLzUzNVxyXG5kZWNsYXJlIGNvbnN0IGFjY2Vzc2libGVBdXRvY29tcGxldGU6IGFueTtcclxuXHJcbnR5cGUgQ2FsbGJhY2sgPSAoZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHZvaWQ7XHJcblxyXG53aW5kb3cuRmFtaWx5SHVic0Zyb250ZW5kID0gd2luZG93LkZhbWlseUh1YnNGcm9udGVuZCB8fCB7fTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplQWRkQW5vdGhlcigpOiB2b2lkIHtcclxuICAgIC8vdG9kbzogc3VwcG9ydCBvcHRpb25zIHdpdGggc2NvcGU/XHJcbiAgICB2YXIgJGFkZEFub3RoZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbW9kdWxlPVwiZmgtYWRkLWFub3RoZXJcIl0nKTtcclxuXHJcblx0JGFkZEFub3RoZXJzLmZvckVhY2goZnVuY3Rpb24gKCRhZGRBbm90aGVyKSB7XHJcblx0XHRuZXcgd2luZG93LkZhbWlseUh1YnNGcm9udGVuZC5BZGRBbm90aGVyKCRhZGRBbm90aGVyKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG53aW5kb3cuRmFtaWx5SHVic0Zyb250ZW5kLkFkZEFub3RoZXIgPSBmdW5jdGlvbiAoY29udGFpbmVyKSB7XHJcblx0dGhpcy5jb250YWluZXIgPSAkKGNvbnRhaW5lcik7XHJcblxyXG5cdHZhciBmdW5jdGlvbk5hbWUgPSBjb250YWluZXIuZ2V0QXR0cmlidXRlKCdkYXRhLWZoLWFkZC1hbm90aGVyLWNhbGxiYWNrJyk7XHJcblxyXG5cdHRoaXMuY2FsbGJhY2sgPSBudWxsO1xyXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAodHlwZW9mIHdpbmRvd1tmdW5jdGlvbk5hbWVdID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHRoaXMuY2FsbGJhY2sgPSB3aW5kb3dbZnVuY3Rpb25OYW1lXTtcclxuXHRcdFx0dGhpcy5jYWxsYmFjayhjb250YWluZXIpO1xyXG5cdFx0fVxyXG5cdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cclxuXHQvL2lmICh0eXBlb2Ygd2luZG93W2Z1bmN0aW9uTmFtZV0gPT09ICdmdW5jdGlvbicpIHtcclxuXHQvL1x0KGZ1bmN0aW9uICgpIHtcclxuXHQvL1x0XHR0aGlzLmNhbGxiYWNrID0gd2luZG93W2Z1bmN0aW9uTmFtZV07XHJcblx0Ly9cdFx0dGhpcy5jYWxsYmFjaygpO1xyXG5cdC8vXHR9KCkpO1xyXG5cclxuXHQvL1x0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcclxuXHQvL1x0XHRzZXR1cEF1dG9jb21wbGV0ZVdoZW5BZGRBbm90aGVyKG51bGwpO1xyXG5cdC8vXHR9KTtcclxuXHQvL30gZWxzZSB7XHJcblx0Ly9cdHRoaXMuY2FsbGJhY2sgPSBudWxsO1xyXG5cdC8vfVxyXG5cclxuXHRpZiAodGhpcy5jb250YWluZXIuZGF0YSgnZmgtYWRkLWFub3RoZXItaW5pdGlhbGlzZWQnKSkge1xyXG5cdFx0cmV0dXJuXHJcblx0fVxyXG5cclxuXHR0aGlzLmNvbnRhaW5lci5kYXRhKCdmaC1hZGQtYW5vdGhlci1pbml0aWFsaXNlZCcsIHRydWUpO1xyXG5cclxuXHR0aGlzLmNvbnRhaW5lci5vbignY2xpY2snLCAnLmZoLWFkZC1hbm90aGVyX19yZW1vdmUtYnV0dG9uJywgJC5wcm94eSh0aGlzLCAnb25SZW1vdmVCdXR0b25DbGljaycpKTtcclxuXHR0aGlzLmNvbnRhaW5lci5vbignY2xpY2snLCAnLmZoLWFkZC1hbm90aGVyX19hZGQtYnV0dG9uJywgJC5wcm94eSh0aGlzLCAnb25BZGRCdXR0b25DbGljaycpKTtcclxuXHR0aGlzLmNvbnRhaW5lci5maW5kKCcuZmgtYWRkLWFub3RoZXJfX2FkZC1idXR0b24sIGZoLWFkZC1hbm90aGVyX19yZW1vdmUtYnV0dG9uJykucHJvcCgndHlwZScsICdidXR0b24nKTtcclxufTtcclxuXHJcbi8vd2luZG93LkZhbWlseUh1YnNGcm9udGVuZC5BZGRBbm90aGVyLnByb3RvdHlwZS5zZXRDYWxsYmFjayA9IGZ1bmN0aW9uIChjYWxsYmFjazogQ2FsbGJhY2spIHtcclxuLy9cdHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuXHJcbi8vXHR2YXIgJGFkZEFub3RoZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbW9kdWxlPVwiZmgtYWRkLWFub3RoZXJcIl0nKTtcclxuXHJcbi8vXHQkYWRkQW5vdGhlcnMuZm9yRWFjaChmdW5jdGlvbiAoJGFkZEFub3RoZXIpIHtcclxuLy9cdFx0aWYgKHR5cGVvZiB0aGlzLmNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XHJcbi8vXHRcdFx0dGhpcy5jYWxsYmFjaygkYWRkQW5vdGhlcik7XHJcbi8vXHRcdH1cclxuLy9cdH0pO1xyXG4vL307XHJcblxyXG53aW5kb3cuRmFtaWx5SHVic0Zyb250ZW5kLkFkZEFub3RoZXIucHJvdG90eXBlLm9uQWRkQnV0dG9uQ2xpY2sgPSBmdW5jdGlvbiAoZSkge1xyXG5cdHZhciBpdGVtID0gdGhpcy5nZXROZXdJdGVtKCk7XHJcblx0dGhpcy5yZXNldEl0ZW0oaXRlbSk7XHJcblx0dmFyIGZpcnN0SXRlbSA9IHRoaXMuZ2V0SXRlbXMoKS5maXJzdCgpO1xyXG5cdGlmICghdGhpcy5oYXNSZW1vdmVCdXR0b24oZmlyc3RJdGVtKSkge1xyXG5cdFx0dGhpcy5jcmVhdGVSZW1vdmVCdXR0b24oZmlyc3RJdGVtKTtcclxuXHR9XHJcblx0dGhpcy5nZXRJdGVtcygpLmxhc3QoKS5hZnRlcihpdGVtKTtcclxuXHRpdGVtLmZpbmQoJ2lucHV0LCB0ZXh0YXJlYSwgc2VsZWN0JykuZmlyc3QoKS5mb2N1cygpO1xyXG59O1xyXG5cclxud2luZG93LkZhbWlseUh1YnNGcm9udGVuZC5BZGRBbm90aGVyLnByb3RvdHlwZS5oYXNSZW1vdmVCdXR0b24gPSBmdW5jdGlvbiAoaXRlbSkge1xyXG5cdHJldHVybiBpdGVtLmZpbmQoJy5maC1hZGQtYW5vdGhlcl9fcmVtb3ZlLWJ1dHRvbicpLmxlbmd0aDtcclxufTtcclxuXHJcbndpbmRvdy5GYW1pbHlIdWJzRnJvbnRlbmQuQWRkQW5vdGhlci5wcm90b3R5cGUuZ2V0SXRlbXMgPSBmdW5jdGlvbiAoKSB7XHJcblx0cmV0dXJuIHRoaXMuY29udGFpbmVyLmZpbmQoJy5maC1hZGQtYW5vdGhlcl9faXRlbScpO1xyXG59O1xyXG5cclxud2luZG93LkZhbWlseUh1YnNGcm9udGVuZC5BZGRBbm90aGVyLnByb3RvdHlwZS5nZXROZXdJdGVtID0gZnVuY3Rpb24gKCkgeyAvLzogSlF1ZXJ5PEhUTUxFbGVtZW50PiAvL0hUTUxFbGVtZW50IHtcclxuICAgIC8vIGdldCB0aGUgZmlyc3QgaXRlbSBhbmQgY2xvbmUgaXRcclxuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5nZXRJdGVtcygpO1xyXG4gICAgY29uc3QgaXRlbSA9IGl0ZW1zWzBdLmNsb25lTm9kZSh0cnVlKSBhcyBIVE1MRWxlbWVudDtcclxuXHJcbiAgICAvLyBmaW5kIHRoZSBhdXRvY29tcGxldGUgd3JhcHBlcnMgYW5kIHJlbW92ZSB0aGUgZWxlbWVudHMgdGhhdCBhcmUgYWRkZWQgYnkgYWNjZXNzaWJsZS1hdXRvY29tcGxldGVcclxuICAgIGNvbnN0IGF1dG9jb21wbGV0ZVdyYXBwZXJzID0gaXRlbS5xdWVyeVNlbGVjdG9yQWxsKCcuYXV0b2NvbXBsZXRlX193cmFwcGVyJyk7XHJcbiAgICBhdXRvY29tcGxldGVXcmFwcGVycy5mb3JFYWNoKHdyYXBwZXIgPT4ge1xyXG4gICAgICAgIGlmICh3cmFwcGVyLnBhcmVudE5vZGUucGFyZW50Tm9kZSkge1xyXG5cdFx0XHR3cmFwcGVyLnBhcmVudE5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh3cmFwcGVyLnBhcmVudE5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHR2YXIgJGl0ZW0gPSAkKGl0ZW0pO1xyXG5cclxuXHQvLyB1cGRhdGUgdGhlIGlkIGFuZCBuYW1lIGF0dHJpYnV0ZXNcclxuXHR0aGlzLnVwZGF0ZUF0dHJpYnV0ZXMoaXRlbXMubGVuZ3RoLCAkaXRlbSk7XHJcblxyXG5cdC8vIGNhbGwgdGhlIGNhbGxiYWNrIHdoaWNoIG5lZWRzIHRvIGFwcGx5IGFjY2Vzc2liaWxpdHkgZW5oYW5jZW1lbnRzIHRvIHRoZSBuZXcgaXRlbVxyXG5cdGlmICh0eXBlb2YgdGhpcy5jYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0dGhpcy5jYWxsYmFjayhpdGVtKTtcclxuXHR9XHJcblxyXG4gICAgLy8gQ3JlYXRlIGEgcmVtb3ZlIGJ1dHRvbiBpZiBpdCBkb2Vzbid0IGV4aXN0XHJcbiAgICBpZiAoIXRoaXMuaGFzUmVtb3ZlQnV0dG9uKCRpdGVtKSkge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlUmVtb3ZlQnV0dG9uKCRpdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gJGl0ZW07XHJcbn07XHJcblxyXG53aW5kb3cuRmFtaWx5SHVic0Zyb250ZW5kLkFkZEFub3RoZXIucHJvdG90eXBlLnVwZGF0ZUF0dHJpYnV0ZXMgPSBmdW5jdGlvbiAoaW5kZXgsIGl0ZW0pIHtcclxuXHRpdGVtLmZpbmQoJ1tkYXRhLW5hbWVdJykuZWFjaChmdW5jdGlvbiAoaSwgZWwpIHtcclxuXHRcdHZhciBvcmlnaW5hbElkID0gZWwuaWRcclxuXHJcblx0XHRlbC5uYW1lID0gJChlbCkuYXR0cignZGF0YS1uYW1lJykucmVwbGFjZSgvJWluZGV4JS8sIGluZGV4KTtcclxuXHRcdGVsLmlkID0gJChlbCkuYXR0cignZGF0YS1pZCcpLnJlcGxhY2UoLyVpbmRleCUvLCBpbmRleCk7XHJcblxyXG5cdFx0dmFyIGxhYmVsID0gJChlbCkuc2libGluZ3MoJ2xhYmVsJylbMF0gfHwgJChlbCkucGFyZW50cygnbGFiZWwnKVswXSB8fCBpdGVtLmZpbmQoJ1tmb3I9XCInICsgb3JpZ2luYWxJZCArICdcIl0nKVswXTtcclxuXHRcdGxhYmVsLmh0bWxGb3IgPSBlbC5pZDtcclxuXHR9KTtcclxufTtcclxuXHJcbndpbmRvdy5GYW1pbHlIdWJzRnJvbnRlbmQuQWRkQW5vdGhlci5wcm90b3R5cGUuY3JlYXRlUmVtb3ZlQnV0dG9uID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHRpdGVtLmFwcGVuZCgnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJnb3Z1ay1idXR0b24gZ292dWstYnV0dG9uLS1zZWNvbmRhcnkgZmgtYWRkLWFub3RoZXJfX3JlbW92ZS1idXR0b25cIj5SZW1vdmU8L2J1dHRvbj4nKTtcclxufTtcclxuXHJcbndpbmRvdy5GYW1pbHlIdWJzRnJvbnRlbmQuQWRkQW5vdGhlci5wcm90b3R5cGUucmVzZXRJdGVtID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHQvLyBhY2Nlc3NpYmlsZS1hdXRvY29tcGxldGUgYWRkcyBhbiBpbnB1dCAod2l0aG91dCBkYXRhLW5hbWUgb3IgZGF0YS1pZClcclxuXHQvLyBzbyB3ZSBibGFuayBhbGwgaW5wdXQgY29udHJvbHNcclxuICAgIGl0ZW0uZmluZCgnaW5wdXQsIHRleHRhcmVhLCBzZWxlY3QnKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWwpIHtcclxuICAgICAgICBpZiAoZWwudHlwZSA9PSAnY2hlY2tib3gnIHx8IGVsLnR5cGUgPT0gJ3JhZGlvJykge1xyXG4gICAgICAgICAgICBlbC5jaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZWwudmFsdWUgPSAnJztcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbndpbmRvdy5GYW1pbHlIdWJzRnJvbnRlbmQuQWRkQW5vdGhlci5wcm90b3R5cGUub25SZW1vdmVCdXR0b25DbGljayA9IGZ1bmN0aW9uIChlKSB7XHJcblx0JChlLmN1cnJlbnRUYXJnZXQpLnBhcmVudHMoJy5maC1hZGQtYW5vdGhlcl9faXRlbScpLnJlbW92ZSgpO1xyXG5cdHZhciBpdGVtcyA9IHRoaXMuZ2V0SXRlbXMoKTtcclxuXHRpZiAoaXRlbXMubGVuZ3RoID09PSAxKSB7XHJcblx0XHRpdGVtcy5maW5kKCcuZmgtYWRkLWFub3RoZXJfX3JlbW92ZS1idXR0b24nKS5yZW1vdmUoKTtcclxuXHR9XHJcblx0aXRlbXMuZWFjaCgkLnByb3h5KGZ1bmN0aW9uIChpbmRleCwgZWwpIHtcclxuXHRcdHRoaXMudXBkYXRlQXR0cmlidXRlcyhpbmRleCwgJChlbCkpO1xyXG5cdH0sIHRoaXMpKTtcclxuXHR0aGlzLmZvY3VzSGVhZGluZygpO1xyXG59O1xyXG5cclxud2luZG93LkZhbWlseUh1YnNGcm9udGVuZC5BZGRBbm90aGVyLnByb3RvdHlwZS5mb2N1c0hlYWRpbmcgPSBmdW5jdGlvbiAoKSB7XHJcblx0dGhpcy5jb250YWluZXIuZmluZCgnLmZoLWFkZC1hbm90aGVyX19oZWFkaW5nJykuZm9jdXMoKTtcclxufTtcclxuIl19