### README.md

```markdown
# suggestionsInput

## Description

`suggestionsInput` is a jQuery plugin that provides suggestions based on input and adds selected items to a target container. This plugin is useful for creating dynamic input fields with autocomplete functionality.

## Author

Artlis Code Department - SzpaQ

## License

GNU Public License

## Usage

```javascript
$('#inputField').suggestionsInput({
    url: 'data.json',
    selector: '#inputField',
    target: '#selectedContainer',
    params: { additionalParam1: 'value1', additionalParam2: 'value2' },
    inputName: 'selected_product',
    multiple: false
});
```

## Options

- **url** (required): The URL to which the input query will be posted.
- **params** (optional): Additional parameters to be sent with the POST request.
- **selector** (required): The jQuery selector for the input field.
- **target** (required): The jQuery selector for the container where selected items will be added.
- **inputName** (optional): The name attribute for the hidden input fields containing the selected item IDs. Default is `suggested_id`.
- **multiple** (optional): A boolean value indicating whether multiple items can be selected. Default is `true`.

## Response Format

The expected response from the server should be a JSON array of objects. Each object should have the following structure:

```json
[
    {
        "name": "Product A",
        "id": "1"
    },
    {
        "name": "Product B",
        "id": "2"
    },
    {
        "name": "Product C",
        "id": "3"
    }
]
```

- **name**: The name of the item to be displayed in the suggestions list.
- **id**: The unique identifier for the item, which will be stored in the hidden input field.

## Detailed Parameters

### url

- **Type**: `String`
- **Required**: Yes
- **Description**: The URL to which the input query will be posted. This URL should handle the request and return a JSON response with the suggestions.

### params

- **Type**: `Object`
- **Required**: No
- **Description**: Additional parameters to be sent with the POST request. These parameters will be merged with the query parameter.

### selector

- **Type**: `String`
- **Required**: Yes
- **Description**: The jQuery selector for the input field that will trigger the suggestions. This is the element where the user will type the input.

### target

- **Type**: `String`
- **Required**: Yes
- **Description**: The jQuery selector for the container where the selected items will be added. This container will hold the selected items, each with a name and a hidden input field.

### inputName

- **Type**: `String`
- **Required**: No
- **Description**: The name attribute for the hidden input fields containing the selected item IDs. If not specified, the default value will be `suggested_id`.

### multiple

- **Type**: `Boolean`
- **Required**: No
- **Description**: A boolean value indicating whether multiple items can be selected. Default is `true`. If set to `false`, only one item can be selected at a time.

## Notes

- Ensure the `url` provided returns a JSON response in the specified format.
- Adjust the CSS styles as needed to fit your design requirements.
- The plugin dynamically adds a suggestions container and positions it relative to the input field.
- Selected items are appended to the target container with a hidden input field containing the item ID and a delete button to remove the item.
- When `multiple` is set to `false`, only one selected item will be displayed at a time.
```
