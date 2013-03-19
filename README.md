# Synopsis

This is a small-ish (1.9kB minified, 0.9kB gzipped) modal plugin for jQuery.
While most modal plugins try to handle all interactions themselves,
jQuery.modal only provides the modal dialog and overlay.

# Basic usage example

Try it on [jsfiddle](http://jsfiddle.net/uwCLH/).

```js
var $modal = $('<div/>')
  .text('Hello World! Click to dismiss.')
  .css({color: 'red', background: 'white', cursor: 'pointer'})
  .modal()
  .modal('open')
  .on('click', function() {
    $modal.modal('close');
  });
```

# More realistic example

Try it on [jsfiddle](http://jsfiddle.net/HQRDE/).

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
.open-btn, .close-btn {
    border: 1px solid black;
    cursor: pointer;
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
});
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

### showFn(callback)

Function to be called in order to reveal the dialog.
Must call the passed callback when the animation is complete.

Default:
```js
function(callback) {
  this.fadeIn(200, callback);
}
```

### hideFn(callback)

Function to be called in order to hide the dialog.
Must call the passed callback when the animation is complete.

Default:
```js
function(callback) {
  this.fadeOut(200, callback);
}
```

## modal.overlay

Options used by the overlay.

### showFn(callback)

Function to be called in order to reveal the overlay.
Must call the passed callback when the animation is complete.

Default:
```js
function(callback) {
  this.fadeTo(200, 0.5, callback);
}
```

### hideFn(callback)

Function to be called in order to hide the overlay.
Must call the passed callback when the animation is complete.

Default:
```js
function(callback) {
  this.fadeOut(1, callback);
}
```

# Acknowledgements

Inspired by [edwardhotchkiss' jQuery.leanerModal](https://github.com/edwardhotchkiss/jquery.leanerModal.js), which is in turn based on [finelysliced's jQuery.leanModal](https://github.com/FinelySliced/leanModal.js).

# License

The MIT/Expat license.
