// A version of the MOJ's add-another component that plays nice with the accessible autocomplete component.
// I did consider subclassing the MOJ's add-another component,
// but it would have been so coupled that it would've probably broken on an update of the MOJ library.
// So instead we forked it and made our own version.

//todo: when add a couple of times, then remove the middle, the id of the input and labels get out of whack
//todo: when accessible-autocomplete creates the input, it doesn't handle the aria-describedby correctly...
// https://github.com/alphagov/accessible-autocomplete/issues/589

//todo: use the index.d.ts from here...
// https://github.com/alphagov/accessible-autocomplete/issues/535
declare const accessibleAutocomplete: any;

type Callback = (element: HTMLElement) => void;

window.FamilyHubsFrontend = window.FamilyHubsFrontend || {};

export function initializeAddAnother(): void {
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
		return
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

window.FamilyHubsFrontend.AddAnother.prototype.getNewItem = function () { //: JQuery<HTMLElement> //HTMLElement {
    // get the first item and clone it
    const items = this.getItems();
    const item = items[0].cloneNode(true) as HTMLElement;

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
		var originalId = el.id

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
        } else {
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
