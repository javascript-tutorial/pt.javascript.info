# Find bbtag pairs

A "bb-tag" looks like `[tag]...[/tag]`, where `tag` is one of: `b`, `url` or `quote`.

For instance:
```
[b]text[/b]
[url]http://google.com[/url]
```

BB-tags can be nested. But a tag can't be nested into itself, for instance:

```
Normal:
[url] [b]http://google.com[/b] [/url]
[quote] [b]text[/b] [/quote]

Can't happen:
[b][b]text[/b][/b]
```

Tags can contain line breaks, that's normal:

```
[quote]
  [b]text[/b]
[/quote]
```

Create a regexp to find all BB-tags with their contents.

For instance:

```js
<<<<<<< HEAD:9-regular-expressions/11-regexp-alternation/02-find-matching-bbtags/task.md
let reg = /your regexp/g;
=======
let regexp = /your regexp/flags;
>>>>>>> 9acc1302a14a3bbabbc9bf95d04581094bd0f1a8:9-regular-expressions/13-regexp-alternation/02-find-matching-bbtags/task.md

let str = "..[url]http://google.com[/url]..";
alert( str.match(regexp) ); // [url]http://google.com[/url]
```

If tags are nested, then we need the outer tag (if we want we can continue the search in its content):

```js
<<<<<<< HEAD:9-regular-expressions/11-regexp-alternation/02-find-matching-bbtags/task.md
let reg = /your regexp/g;
=======
let regexp = /your regexp/flags;
>>>>>>> 9acc1302a14a3bbabbc9bf95d04581094bd0f1a8:9-regular-expressions/13-regexp-alternation/02-find-matching-bbtags/task.md

let str = "..[url][b]http://google.com[/b][/url]..";
alert( str.match(regexp) ); // [url][b]http://google.com[/b][/url]
```
