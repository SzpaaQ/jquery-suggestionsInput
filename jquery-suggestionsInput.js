/**
 * Description: jQuery plugin to provide suggestions based on input and add selected items to a target container.
 * Name: suggestionsInput
 * Usage: $('#inputField').suggestionsInput({ url: 'data.json', selector: '#inputField', target: '#selectedContainer', params: { additionalParam1: 'value1', additionalParam2: 'value2' }, inputName: 'selected_product', multiple: false });
 * Author: Artlis Code Department - SzpaQ
 * License: GNU Public
 */

(function($) {
    $.fn.suggestionsInput = function(options) {
        // Validate the options object
        if (typeof options !== 'object' || !options.url || !options.selector || !options.target) {
            console.error('Invalid options provided to suggestionsInput');
            return this;
        }

        const url = options.url;
        const params = options.params || {};
        const selector = options.selector;
        const target = options.target;
        const inputName = options.inputName || 'suggested_id';
        const multiple = options.multiple !== undefined ? options.multiple : true;

        const inputField = $(selector);
        const suggestionContainer = $('<div class="suggestion-list"></div>').appendTo('body');

        // Position suggestion container below the input field
        function positionSuggestionContainer() {
            const inputOffset = inputField.offset();
            suggestionContainer.css({
                top: inputOffset.top + inputField.outerHeight(),
                left: inputOffset.left,
                width: inputField.outerWidth()
            });
        }

        // Function to add selected item to the target container
        function addSelectedItem(name, id) {
            if (!multiple) {
                $(target).empty();
            }

            const itemContainer = $('<div class="selected-item"></div>');

            const nameElement = $('<span></span>').text(name);

            let inputFieldName = inputName;
            if (multiple && !inputFieldName.endsWith('[]')) {
                inputFieldName += '[]';
            }

            const hiddenInput = $('<input type="hidden">')
                .attr('name', inputFieldName)
                .val(id);

            const deleteSpan = $('<span class="delete-span">X</span>').on('click', function() {
                itemContainer.remove();
            });

            itemContainer.append(nameElement, hiddenInput, deleteSpan);
            $(target).append(itemContainer);
        }

        // Initialize existing items in the target container
        $(target).find('.selected-item').each(function() {
            const itemContainer = $(this);
            itemContainer.find('.delete-span').on('click', function() {
                itemContainer.remove();
            });
        });

        // Event listener for input field
        inputField.on('input', function(event) {
            const query = event.target.value;
            if (query.trim() === '') {
                suggestionContainer.empty();
                return;
            }

            // Merge query with additional params
            const postData = $.extend({ query: query }, params);

            // Use jQuery.post to fetch suggestions
            $.post(url, postData, function(data) {
                // Clear previous suggestions
                suggestionContainer.empty();

                // Add new suggestions
                data.forEach(item => {
                    const suggestionItem = $('<div class="suggestion-item"></div>')
                        .text(item.name)
                        .data('id', item.id)
                        .on('click', function() {
                            addSelectedItem(item.name, item.id);
                            suggestionContainer.empty();
                            inputField.val('');
                        });

                    suggestionContainer.append(suggestionItem);
                });
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.error('Error fetching data:', textStatus, errorThrown);
            });
        });

        // Reposition the suggestion container when the window is resized
        $(window).on('resize', positionSuggestionContainer);

        // Reposition the suggestion container when the input field gains focus
        inputField.on('focus', positionSuggestionContainer);

        return this;
    };
})(jQuery);
