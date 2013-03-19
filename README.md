# Synopsis

This is a small-ish (~1.8kB minified, <1kB gzipped) modal plugin for jQuery.
While most modal plugins try to handle all interactions themselves,
jQuery.modal only provides the modal dialog and overlay.

# Basic usage example

```js
var $modal = $('<div/>')
  .text('Hello World')
  .css({color: red})
  .modal()
  .modal('open')
  .on('click', function() {
    $modal.modal('close');
  });
```

# More realistic example

## HTML
```html
<a class="open-btn">Open</a>
<div class="my-dialog">
  <h1>Hello World!</h1>
  <a class="close-btn">Close</a>
</div>
```

## CSS
```css
.my-dialog {
  border: 2px solid black;
  background-color: papayawhip;
  color: red;
  padding: 5px;
}
```

## JavaScript
```js
var $dialog = $('.my-dialog').modal();
$dialog.on('click', '.close-btn', function(e) {
  e.preventDefault();
  $dialog.modal('close');
});
$('.open-btn').on('click', function(e) {
  e.preventDefault();
  $dialog.modal('open');
})
```

# API

## modal([options])

Wraps the matched content in a modal dialog intialized with the given options.

**NOTE:** The matched content will be removed from the page if necessary.

## modal('open')

Reveals the overlay and modal dialog.

## modal('close')

Hides the modal dialog and overlay.

## modal('option', name)

Returns the current value of the option `name` for this modal dialog.

## modal('option', name, value)

Sets the value of the option `name` for this modal dialog to the given `value`.
Returns the new value.

## modal.defaults

The default options used by new modal dialogs.

**NOTE:** Changes will be reflected by existing modal dialogs
unless the option was set explicitly on initialization or with `modal('option', name value)`.
This is intentional.

### showDuration (default: 200)

Duration (in milliseconds) for the fade-in animation of the dialog.

### hideDuration (default: 200)

Duration (in milliseconds) for the fade-out animation of the dialog.

## modal.overlay

Options used by the overlay. Most options will only take effect the next time the overlay is shown.

### showDuration (default: 200)

Duration (in milliseconds) for the fade-in animation of the overlay.

### hideDuration (default: 1)

Duration (in milliseconds) for the fade-out animation of the overlay.

### opacity (default: 0.5)

Opacity of the overlay when fully faded in (minimum: 0.0, maximum: 1.0).

### background (default: 'black')

Background styling of the overlay.
Any expression recognized by `css('background', value)` can be used.

# Acknowledgements

Inspired by [edwardhotchkiss' jQuery.leanerModal](https://github.com/edwardhotchkiss/jquery.leanerModal.js), which is in turn based on [finelysliced's jQuery.leanModal](https://github.com/FinelySliced/leanModal.js).

# License

The MIT/Expat license.
