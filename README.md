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

## each
```js
dom.each(OBJECT, function(INDEX, ELEMENT){});
```
Iterate over a object, executing a function for each matched element.

* INDEX - integer
* ELEMENT - Object

### Example
```js
dom('li').each(function(index, element){
    console.log( index + ' : ' + dom(element).text());
});
```

## html
Read or write the HTML content of an element.

```html
<h1 id="h1-title">Hi foo</h1>
```

* Get the html
```js
var html = dom('#h1-title').html();
console.log(html);
```

* Set the html
```js
dom('#h1-title').html('Hello foo!');
```
The result look like this
```html
<h1 id="h1-title">Hello foo!</h1>
```

## text
Get the combined text contents of an element, including its descendants, or set the text content of the element.
```html
<h1 id="h1-title">Hi foo</h1>
```

* Get the text
```js
var html = dom('#h1-title').text();
console.log(html);
```
* Set the html

```js
dom('#h1-title').text('Hello foo!');
```
The result look like this
```html
<h1 id="h1-title">Hello foo!</h1>
```
## attr
Modify attributes, such as id, class, alt, title and more.
```html
<a href="#" title="click here">Hello foo!</a>
```
* Get the attribute
```js
var attr = dom('a').attr('title');
console.log(attr);
```

* Set the attribute
dom('a').attr('title', 'click me');
The result look like this
```html
<a href="#" title="click me">Hello foo!</a>
```
## data
Store arbitrary data associated with the matched elements or return the value at the named data store for the first element in the set of matched elements.
```html
<a href="#" title="click here" data-link="next page link">Hello foo!</a>
```
* Set data
```js
dom('a').data('msg', 'link message');
```
The result look like this
```html
<a href="#" title="click here" data-link="next page link" data-msg="link message">Hello foo!</a>
```
* Get the data
```js
var data = dom('a').data('msg');
console.log(data);
```
```js
var data = dom('a').data();
console.log(data);
```
## removeAttr
This method to erase an attribute from the element

```html
<a href="#" title="click here" data-link="next page link">Hello foo!</a>
```
```js
dom('a').removeAttr('title');
```
The result look like this
```html
<a href="#" data-link="next page link">Hello foo!</a>
```
## append
Insert a new element or an HTML structure to the end of another element's content.
```js
dom('#container').append('<h1>Appended</h1>');
```
```html
<div id="container">
    <span>content 1</span>
</div>
```
The result look like this
```html
<div id="container">
    <span>content 1</span>
    <h1>Appended</h1>
</div>
```

## prepend
Insert a new element or an HTML structure to the beginning of another element's content.
```js
dom('#container').prepend('<h1>Appended</h1>');
```
```html
<div id="container">
    <span>content 1</span>
</div>
```
The result look like this
```html
<div id="container">
    <h1>Appended</h1>
    <span>content 1</span>
</div>
```

## before
Insert an HTML structure before a given DOM tree element.
```js
dom('.sub-content').before('<h1>Appended</h1>');
```
```html
<div id="container">
    <span class="sub-content">content 1</span>
</div>
```
The result look like this
```html
<div id="container">
    <h1>Appended</h1>
    <span class="sub-content">content 1</span>
</div>
```

## after
Insert an HTML structure after a given DOM tree element.
```js
dom('.sub-content').after('<h1>Appended</h1>');
```
```html
<div id="container">
    <span class="sub-content">content 1</span>
</div>
```
The result look like this
```html
<div id="container">
    <span class="sub-content">content 1</span>
    <h1>Appended</h1>
</div>
```
## empty
Remove all child nodes of an element from the DOM
```js
dom('.sub-content').empty();
```
```html
<div id="container">
    <span class="sub-content">content 1</span>
</div>
```
The result look like this
```html
<div id="container">
    <span class="sub-content"></span>
</div>
```
## remove
Remove an element from the DOM tree.
```js
dom('.sub-content').remove();
```
```html
<div id="container">
    <span class="sub-content">content 1</span>
</div>
```
The result look like this
```html
<div id="container"></div>
```

## hasClass
Determine whether any of the matched elements are assigned the given class
```js
alert(dom('#container span').hasClass('sub-content'));
```

## addClass
Adds the specified class(es) to each element in the set of matched elements

```html
<div id="container">
    <span class="sub-content">content 1</span>
</div>
```

```js
dom('#container span').addClass('sub-class');
```
The result look like this
```html
<div id="container">
    <span class="sub-content sub-class">content 1</span>
</div>
```

## removeClass
Remove a single class, multiple classes, or all classes from each element in the set of matched elements.
```html
<div id="container">
    <span class="sub-content">content 1</span>
</div>
```

```js
dom('#container span').removeClass('sub-content');
```
The result look like this
```html
<div id="container">
    <span>content 1</span>
</div>
```
## toggleClass
Add or remove one or more classes from each element in the set of matched elements, depending on either the class's presence or the value of the state argument
```html
<div id="container">
    <span class="sub-content">content 1</span>
</div>
```

```js
dom('#container span').toggleClass('sub-content');
```
The result look like this
```html
<div id="container">
    <span>content 1</span>
</div>
```
The second time we applydom('#container span').toggleClass('sub-content'), the result look like this
```html
<div id="container">
    <span  class="sub-content">content 1</span>
</div>
```

## parent
Getting the parent DOM node of an element.

```js
dom('.sub-content').parent();
```
```html
<div id="container">
    <span  class="sub-content">content 1</span>
</div>
```

## parents
Getting all parents DOM node of an element.

```js
dom('.sub-content').parents();
```
```html
<div id="container">
    <span  class="sub-content">content 1</span>
</div>
```
## next
Get the next of an element or retrieve siblings.
```js
dom('#container').next();
```
```html
<div id="container">
    <span  class="sub-content">content 1</span>
</div>
```

## nextAll
Get all preceding siblings of an element, optionally filtered:
```js
dom('#container').nextAll('.sub-content');
```
```html
<div id="container">
    <span  class="sub-content">content 1</span>
</div>
```

## prev
Get the previous of an element or retrieve siblings.
```js
dom('.inner-content').prev();
```
```html
<div id="container">
    <span  class="sub-content">sub content</span>
    <span  class="inner-content">inner content</span>
</div>
```

## prev
Get all previous siblings of an element, optionally filtered
```js
dom('.inner-content').prevAll();
```
```html
<div id="container">
    <span  class="sub-content">sub content</span>
    <span  class="inner-content">inner content</span>
</div>
```

## siblings
Get the all siblings of an element or retrieve siblings that match a given selector.
```js
dom('#container').siblings();
```
```html
<div id="container">
    <span  class="sub-content">sub content</span>
    <span  class="inner-content">inner content</span>
</div>
```


## Reference

[jQuery source viewer](http://james.padolsey.com/jquery/)

[Plain JS](https://plainjs.com/javascript/)

[JQuery API](https://api.jquery.com/)


License
----

MIT

**Free Software, Santhosh Kumar Krishnan!**

