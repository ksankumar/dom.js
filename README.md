# DOM.JS

Simple, faster and pure javascript library for DOM manipulation.

  - Event handling
  - DOM manipulation
  - Validations
  - ...more

DOM-JS is a lightweight Javascript library for perform DOM manipulations


### Version
0.0.1

### Installation
You need Gulp installed globally:
```sh
$ npm i -g gulp
```
```sh
$ git clone https://github.com/ksankumar/dom.js
```
```html
<script type="text/javascript" src="lib/dom.min.js"></script>
```
# Tech
We can access the DOM.JS's APIs with help of **dom** or **$** namespace

# DOM.JS APIs

## ready

```js
dom.ready(function() {
    console.log('dom is ready');
});
```
dom.ready() will only run once the page Document Object Model (DOM) is ready for JavaScript code to execute.

## on
```js
dom(SELECTOR).on(EVENT, HANDLER);
```
Attach an event handler function for one or more events to the selected elements
* SELECTOR - string

        A selector string to filter the selected elements - SELECTOR should be id(#SELECTOR), class(.SELECTOR) or tag name(div, p, button, etc), should not be a null.
* EVENT - string

        Type of the event such as click, hover.etc
* HANDLER - function

        A function to execute when the event is triggered

## off
```js
dom(SELECTOR).off(EVENT, HANDLER);
```
Remove an event handler.
* SELECTOR - string

        A selector which should match the one originally passed to .on() when attaching event handlers.
* EVENT - string

        Type of the event such as click, hover.etc
* HANDLER - function

       A handler function previously attached for the event(s) with .on()


## Reference

[jQuery source viewer](http://james.padolsey.com/jquery/)

[Plain JS](https://plainjs.com/javascript/)

[JQuery API](https://api.jquery.com/)


License
----

MIT

**Free Software, Santhosh Kumar Krishnan!**

