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
    <span class="sub-content">content 1</span>
</div>
```

## parent
Getting the parent DOM node of an element.

```js
dom('.sub-content').parent();
```
```html
<div id="container">
    <span class="sub-content">content 1</span>
</div>
```

## parents
Getting all parents DOM node of an element.

```js
dom('.sub-content').parents();
```
```html
<div id="container">
    <span class="sub-content">content 1</span>
</div>
```
## next
Get the next of an element or retrieve siblings.
```js
dom('#container').next();
```
```html
<div id="container">
    <span class="sub-content">content 1</span>
</div>
```

## nextAll
Get all preceding siblings of an element, optionally filtered:
```js
dom('#container').nextAll('.sub-content');
```
```html
<div id="container">
    <span class="sub-content">content 1</span>
</div>
```

## prev
Get the previous of an element or retrieve siblings.
```js
dom('.inner-content').prev();
```
```html
<div id="container">
    <span class="sub-content">sub content</span>
    <span class="inner-content">inner content</span>
</div>
```

## prevAll
Get all previous siblings of an element, optionally filtered
```js
dom('.inner-content').prevAll();
```
```html
<div id="container">
    <span class="sub-content">sub content</span>
    <span class="inner-content">inner content</span>
</div>
```

## siblings
Get the all siblings of an element or retrieve siblings that match a given selector.
```js
dom('.li-content').siblings();
```
```html
<ul id="container">
    <li class="list">List 1</span>
    <li class="list">List 2</span>
    <li class="list li-content">List 3</span>
    <li class="list">List 4</span>
</ul>
```

## children
Getting the children of a DOM element
```js
dom('#container').children();
```
```html
<ul id="container">
    <li class="list">List 1</span>
    <li class="list">List 2</span>
    <li class="list li-content">List 3</span>
    <li class="list">List 4</span>
</ul>
```

## closest
Get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree
```js
dom('#container').closest(.li-content);
```
```html
<ul id="container">
    <li class="list">List 1</span>
    <li class="list">List 2</span>
    <li class="list li-content">List 3</span>
    <li class="list">List 4</span>
</ul>
```

## focus
Bind an event handler to the 'focus' JavaScript event, or trigger that event on an element.
```js
dom('#input').focus();
```
or
```js
dom('#input').focus(function(){
    console.log('focus');
});
```

```html
<div id="container">
    <input id="input" placeholder="text here">
</div>
```

## focusIn
The focusin event is sent to an element when it, or any element inside of it, gains focus.
```js
dom('#input').focusIn();
```
or
```js
dom('#input').focusIn(function(){
    console.log('focusIn');
});
```

```html
<div id="container">
    <input id="input" placeholder="text here">
</div>
```
## focusOut
Bind an event handler to the 'focus' JavaScript event, or trigger that event on an element.
```js
dom('#input').focusOut();
```
```js
dom('#input').focusOut(function(){
    console.log('focus Out');
});
```

```html
<div id="container">
    <input id="input" placeholder="text here">
</div>
```
## first
Reduce the set of matched elements to the first in the set.
```js
dom('#container li').first();
```
```html
<ul id="container">
    <li class="list">List 1</span>
    <li class="list">List 2</span>
    <li class="list">List 3</span>
    <li class="list">List 4</span>
</ul>
```
The result look like this
```html
 <li class="list">List 1</span>
```

## last
Reduce the set of matched elements to the last in the set.
```js
dom('#container li').last();
```
```html
<ul id="container">
    <li class="list">List 1</span>
    <li class="list">List 2</span>
    <li class="list">List 3</span>
    <li class="list">List 4</span>
</ul>
```
The result look like this
```html
 <li class="list">List 4</span>
```

## eq
Reduce the set of matched elements to the one at the specified index.
```js
dom('#container li').eq(2);
```
```html
<ul id="container">
    <li class="list">List 1</span>
    <li class="list">List 2</span>
    <li class="list">List 3</span>
    <li class="list">List 4</span>
</ul>
```
The result look like this
```html
 <li class="list">List 3</span>
```

## get
Retrieve the DOM elements matched by the jQuery object.
```js
dom('#container li').get(); 
```
The result look like this
```html
  <li class="list">List 1</span>
  <li class="list">List 2</span>
  <li class="list">List 3</span>
  <li class="list">List 4</span>
```
or
```js
dom('#container li').get(2); 
```
```html
<ul id="container">
    <li class="list">List 1</span>
    <li class="list">List 2</span>
    <li class="list">List 3</span>
    <li class="list">List 4</span>
</ul>
```
The result look like this
```html
 <li class="list">List 3</span>
```

## css
Get the computed style properties or set CSS properties for an element.
* Set css
```js
dom('#container li').css('color','red'); 
```
or
```js
dom('#container li').css({'color':'red', 'background':'red'}); 
```
```html
<ul id="container">
    <li class="list" style="color:green">List 1</span>
    <li class="list">List 2</span>
    <li class="list">List 3</span>
    <li class="list">List 4</span>
</ul>
```
The result look like this
```html
<ul id="container">
    <li class="list" style="color:red; background:red">List 1</span>
    <li class="list" style="color:red; background:red">List 2</span>
    <li class="list" style="color:red; background:red">List 3</span>
    <li class="list" style="color:red; background:red">List 4</span>
</ul>
```
* Get css 
```js
console.log(dom('#container li').css('color')); 
```

## hide
Hide the matched elements.
```js
dom('#container li').hide(); 
```
```html
<ul id="container">
    <li class="list" style="color:green">List 1</span>
    <li class="list">List 2</span>
    <li class="list">List 3</span>
    <li class="list">List 4</span>
</ul>
```
The result look like this
```html
<ul id="container">
    <li class="list" style="display:none;">List 1</span>
    <li class="list" style="display:none;">List 2</span>
    <li class="list" style="display:none;">List 3</span>
    <li class="list" style="display:none;">List 4</span>
</ul>
```

## show
Show the matched elements.
```js
dom('#container li').show(); 
```
```html
<ul id="container">
    <li class="list" style="display:none;">List 1</span>
    <li class="list" style="display:none;">List 2</span>
    <li class="list" style="display:none;">List 3</span>
    <li class="list" style="display:none;">List 4</span>
</ul>
```
The result look like this
```html
<ul id="container">
    <li class="list">List 1</span>
    <li class="list">List 2</span>
    <li class="list">List 3</span>
    <li class="list">List 4</span>
</ul>
```
## toggle
Toggle an element's display property for rendering it visible or invisible.
```js
dom('#container li').toggle(); 
```
```html
<ul id="container">
    <li class="list" style="display:none;">List 1</span>
    <li class="list">List 2</span>
    <li class="list" style="display:none;">List 3</span>
    <li class="list">List 4</span>
</ul>
```
The result look like this
```html
<ul id="container">
    <li class="list">List 1</span>
    <li class="list" style="display:none;">List 2</span>
    <li class="list">List 3</span>
    <li class="list" style="display:none;">List 4</span>
</ul>
```

## fadeIn
Display the matched elements by fading them to opaque
```js
dom('#container').fadeIn(500); 
```
```html
<ul id="container">
    <li class="list" style="display:none;">List 1</span>
    <li class="list">List 2</span>
    <li class="list" style="display:none;">List 3</span>
    <li class="list">List 4</span>
</ul>
```
The result look like this
```html
<ul id="container">
    <li class="list">List 1</span>
    <li class="list" style="display:none;">List 2</span>
    <li class="list">List 3</span>
    <li class="list" style="display:none;">List 4</span>
</ul>
```

## fadeOut
Hide the matched elements by fading them to opaque
```js
dom('#container').fadeOut(500); 
```
```html
<ul id="container">
    <li class="list" style="display:none;">List 1</span>
    <li class="list">List 2</span>
    <li class="list" style="display:none;">List 3</span>
    <li class="list">List 4</span>
</ul>
```
The result look like this
```html
<ul id="container"></ul>
```

## trim
Remove white-space characters from the beginning and end of a string.
```js
console.log(dom.trim('  foo '));
```
The result look like this
```html
foo
```
## parseJSON
Takes a well-formed JSON string and returns the resulting JavaScript value.
```js
dom.parseJSON('{"result":true,"count":1}');
```
The result look like this
```html
Object {result: true, count: 1}
```

## stringify
Convert JSON object to String
```js
dom.stringify({result: true, count: 1});
```
The result look like this
```json
'{"result":true,"count":1}'
```

## log
display the log for particular element
```js
dom('#container').log('ul :');
```

## extend
Extend or Merge a JavaScript object with the key/value pairs of another.
```js
dom.extend({'key':'value1'}, {'key':'value2'});
```
The result look like this
```log
Object {key1: "value1", key2: "value2"}
```

## isFunction
Determine whether its function or not
```js
dom.isFunction(function());
```
The result look like this
```log
true
```

## type
Determine what type of value
```js
dom.type(true);
```
The result look like this
```log
boolean
```

## isArray
Check whether it's array or not
```js
dom.isArray([1,2,3]);
```
The result look like this
```log
true
```

## merge
Merge two Array
```js
dom.merge([1,2,3],[2,4,5]);
```
The result look like this
```log
[1, 2, 3, 2, 4, 5]
```

## Reference

[jQuery source viewer](http://james.padolsey.com/jquery/)

[Plain JS](https://plainjs.com/javascript/)

[JQuery API](https://api.jquery.com/)


License
----

MIT

**Free Software, Santhosh Kumar Krishnan!**

