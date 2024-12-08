## _Query.js (UnderQuery)
> jQuery + Underscore = UnderQuery [ _Q ]

A lightweight (~3KB minified) library that combines the power of jQuery-like DOM manipulation with Underscore-like collection handling.

## Installation

```bash
npm install underquery
```

## Core Usage
```javascript
_('.button')       // DOM selection
_([1, 2, 3])      // Array wrapping
_({a: 1, b: 2})   // Object wrapping



// Class manipulation with shorter names
_('.button')
    .ac('active', 'primary')    // Add classes
    .css('color', 'blue')       // Set style
    .on('click', () => {        // Add click handler
        _(this)
            .tc('clicked')      // Toggle class
            .rc('active');      // Remove class
    });
```



### Browser
```html

```

### ES6 Module
```javascript

// ES6 import
import _ from 'underquery';

// CommonJS require
const _ = require('underquery');

// Browser script tag
<script src="node_modules/underquery/dist/_query.min.js"></script>
```

## Quick Examples

### DOM Manipulation
```javascript
// Select and modify elements
_('.button')
    .ac('active', 'primary')    // Add classes
    .css('color', 'blue')       // Set style
    .on('click', function() {   // Add click handler
        _(this)
            .tc('clicked')      // Toggle class
            .rc('active');      // Remove class
    });

// Chain multiple operations
_('.container')
    .sel('.item')              // Select all items
    .each(el => {              // Iterate over each
        _(el)
            .ac('processed')
            .attr('data-ready', 'true');
    });
```

### Collection Handling
```javascript
// Array operations
_([1, 2, 3, 4, 5])
    .filt(n => n > 2)          // Filter numbers > 2
    .map(n => n * 2)           // Double each number
    .val();                    // Get final value: [6, 8, 10]

// Object operations
const users = [
    { id: 1, name: 'John', active: true },
    { id: 2, name: 'Jane', active: false },
    { id: 3, name: 'Bob', active: true }
];

_(users)
    .where({ active: true })   // Find active users
    .pluk('name')             // Get their names
    .val();                   // Result: ['John', 'Bob']

```

## DOM Methods
| Method | Description | Example |
|--------|-------------|---------|
| `html()` | Get/set HTML content | `_('div').html('content')` |
| `txt()` | Get/set text content | `_('p').txt('text')` |
| `attr()` | Get/set attributes | `_('img').attr('src', 'url')` |
| `ac()` | Add CSS class(es) | `_('.btn').ac('active')` |
| `rc()` | Remove CSS class(es) | `_('.btn').rc('active')` |
| `tc()` | Toggle CSS class | `_('.btn').tc('active')` |
| `css()` | Get/set CSS styles | `_('div').css('color', 'blue')` |
| `on()` | Add event listener | `_('button').on('click', fn)` |
| `off()` | Remove event listener | `_('button').off('click', fn)` |
| `sel()` | Select descendants | `_('div').sel('.item')` |
| `clos()` | Find closest ancestor | `_('span').clos('.container')` |
| `par()` | Get parent element | `_('li').par()` |
| `kids()` | Get child elements | `_('ul').kids()` |

## Collection Methods
| Method | Description | Example |
|--------|-------------|---------|
| `each()` | Iterate over items | `_([1,2,3]).each(console.log)` |
| `map()` | Transform items | `_([1,2,3]).map(x => x * 2)` |
| `find()` | Find single item | `_([1,2,3]).find(x => x > 2)` |
| `filt()` | Filter items | `_([1,2,3]).filt(x => x > 1)` |
| `where()` | Filter by properties | `_(users).where({active: true})` |
| `findW()` | Find by properties | `_(users).findW({id: 5})` |
| `rej()` | Reject items | `_([1,2,3]).rej(x => x < 2)` |
| `evry()` | Test all items | `_([2,4,6]).evry(x => x % 2 === 0)` |
| `some()` | Test any items | `_([1,2,3]).some(x => x > 2)` |
| `cont()` | Check containment | `_([1,2,3]).cont(2)` |
| `pluk()` | Extract property | `_(users).pluk('name')` |

## Array Methods
| Method | Description | Example |
|--------|-------------|---------|
| `frst()` | Get first element(s) | `_([1,2,3]).frst()` |
| `last()` | Get last element(s) | `_([1,2,3]).last()` |
| `init()` | Get all but last | `_([1,2,3]).init()` |
| `rest()` | Get all but first | `_([1,2,3]).rest()` |
| `comp()` | Remove falsy values | `_([0,1,false,2]).comp()` |
| `flat()` | Flatten array | `_([1,[2,[3]]]).flat()` |
| `val()` | Get raw value | `_([1,2,3]).map(x=>x*2).val()` |

## Static Methods
| Method | Description | Example |
|--------|-------------|---------|
| `_.range()` | Generate range | `_.range(5)` // [0,1,2,3,4] |
| `_.memo()` | Memoize function | `_.memo(expensiveFn)` |
