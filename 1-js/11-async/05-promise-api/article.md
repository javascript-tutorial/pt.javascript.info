# Promise API

There are 4 static methods in the `Promise` class. We'll quickly cover their use cases here.

## Promise.resolve

The syntax:

```js
let promise = Promise.resolve(value);
```

Returns a resolved promise with the given `value`.

Same as:

```js
let promise = new Promise(resolve => resolve(value));
```

The method is used when we already have a value, but would like to have it "wrapped" into a promise.

For instance, the `loadCached` function below fetches the `url` and remembers the result, so that future calls on the same URL return it immediately:

```js
function loadCached(url) {
  let cache = loadCached.cache || (loadCached.cache = new Map());

  if (cache.has(url)) {
*!*
    return Promise.resolve(cache.get(url)); // (*)
*/!*
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache.set(url,text);
      return text;
    });
}
```

We can use `loadCached(url).then(…)`, because the function is guaranteed to return a promise. That's the purpose `Promise.resolve` serves in the line `(*)`: it makes sure the interface is unified. We can always use `.then` after `loadCached`.

## Promise.reject

The syntax:

```js
let promise = Promise.reject(error);
```

Create a rejected promise with the `error`.

Same as:

```js
let promise = new Promise((resolve, reject) => reject(error));
```

We cover it here for completeness, rarely used in real code.

## Promise.all

Let's say we want to run many promises to execute in parallel, and wait until all of them are ready.

For instance, download several URLs in parallel and process the content when all are done.

That's what `Promise.all` is for.

The syntax is:

```js
let promise = Promise.all([...promises...]);
```

<<<<<<< HEAD
It takes an array of promises (technically can be any iterable, but usually an array) and returns a new promise.
=======
`Promise.all` takes an array of promises (it technically can be any iterable, but is usually an array) and returns a new promise.
>>>>>>> 79417c6e73645d37f184f0cc7e4bc3353e85224f

The new promise resolves when all listed promises are settled and has an array of their results.

For instance, the `Promise.all` below settles after 3 seconds, and then its result is an array `[1, 2, 3]`:

```js run
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // 1,2,3 when promises are ready: each promise contributes an array member
```

<<<<<<< HEAD
Please note that the relative order is the same. Even though the first promise takes the longest time to resolve, it is still first in the array of results.
=======
Please note that the order of the resulting array members is the same as in its source promises. Even though the first promise takes the longest time to resolve, it's still first in the array of results.
>>>>>>> 79417c6e73645d37f184f0cc7e4bc3353e85224f

A common trick is to map an array of job data into an array of promises, and then wrap that into `Promise.all`.

For instance, if we have an array of URLs, we can fetch them all like this:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// map every url to the promise fetch(github url)
let requests = urls.map(url => fetch(url));

// Promise.all waits until all jobs are resolved
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));
```

<<<<<<< HEAD
A more real-life example with fetching user information for an array of github users by their names (or we could fetch an array of goods by their ids, the logic is same):
=======
A bigger example with fetching user information for an array of GitHub users by their names (we could fetch an array of goods by their ids, the logic is identical):
>>>>>>> 79417c6e73645d37f184f0cc7e4bc3353e85224f

```js run
let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
    // all responses are ready, we can show HTTP status codes
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // shows 200 for every url
    }

    return responses;
  })
  // map array of responses into an array of response.json() to read their content
  .then(responses => Promise.all(responses.map(r => r.json())))
  // all JSON answers are parsed: "users" is the array of them
  .then(users => users.forEach(user => alert(user.name)));
```

If any of the promises is rejected, `Promise.all` immediately rejects with that error.

For instance:

```js run
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
*!*
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
*/!*
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(alert); // Error: Whoops!
```

Here the second promise rejects in two seconds. That leads to an immediate rejection of `Promise.all`, so `.catch` executes: the rejection error becomes the outcome of the whole `Promise.all`.

The important detail is that promises provide no way to "cancel" or "abort" their execution. So other promises continue to execute, and then eventually settle, but all their results are ignored.

<<<<<<< HEAD
There are ways to avoid this: we can either write additional code to `clearTimeout` (or otherwise cancel) the promises in case of an error, or we can make errors show up as members in the resulting array (see the task below this chapter about it).
=======
For example, if there are multiple `fetch` calls, like in the example above, and one fails, other ones will still continue to execute, but `Promise.all` won't watch them anymore. They will probably settle, but the result will be ignored.
>>>>>>> 79417c6e73645d37f184f0cc7e4bc3353e85224f

````smart header="`Promise.all(...)` allows non-promise items in `iterable`"
Normally, `Promise.all(...)` accepts an iterable (in most cases an array) of promises. But if any of those objects is not a promise, it's wrapped in `Promise.resolve`.

For instance, here the results are `[1, 2, 3]`:

```js run
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
  2, // treated as Promise.resolve(2)
  3  // treated as Promise.resolve(3)
]).then(alert); // 1, 2, 3
```

So we are able to pass non-promise values to `Promise.all` where convenient.

<<<<<<< HEAD
````
=======
`Promise.all` rejects as a whole if any promise rejects. That's good for "all or nothing" cases, when we need *all* results to go on:

```js
Promise.all([
  fetch('/template.html'),
  fetch('/style.css'),
  fetch('/data.json')
]).then(render); // render method needs results of all fetches
```

`Promise.allSettled` waits for all promises to settle. The resulting array has:

- `{status:"fulfilled", value:result}` for successful responses,
- `{status:"rejected", reason:error}` for errors.

For example, we'd like to fetch the information about multiple users. Even if one request fails, we're still interested in the others.

Let's use `Promise.allSettled`:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
  .then(results => { // (*)
    results.forEach((result, num) => {
      if (result.status == "fulfilled") {
        alert(`${urls[num]}: ${result.value.status}`);
      }
      if (result.status == "rejected") {
        alert(`${urls[num]}: ${result.reason}`);
      }
    });
  });
```

The `results` in the line `(*)` above will be:
```js
[
  {status: 'fulfilled', value: ...response...},
  {status: 'fulfilled', value: ...response...},
  {status: 'rejected', reason: ...error object...}
]
```

So, for each promise we get its status and `value/error`.

### Polyfill

If the browser doesn't support `Promise.allSettled`, it's easy to polyfill:

```js
if(!Promise.allSettled) {
  Promise.allSettled = function(promises) {
    return Promise.all(promises.map(p => Promise.resolve(p).then(value => ({
      state: 'fulfilled',
      value
    }), reason => ({
      state: 'rejected',
      reason
    }))));
  };
}
```

In this code, `promises.map` takes input values, turns them into promises (just in case a non-promise was passed) with `p => Promise.resolve(p)`, and then adds `.then` handler to every one.

That handler turns a successful result `v` into `{state:'fulfilled', value:v}`, and an error `r` into `{state:'rejected', reason:r}`. That's exactly the format of `Promise.allSettled`.

Now we can use `Promise.allSettled` to get the results of *all* given promises, even if some of them reject.
>>>>>>> 79417c6e73645d37f184f0cc7e4bc3353e85224f

## Promise.race

Similar to `Promise.all`, it takes an iterable of promises, but instead of waiting for all of them to finish, it waits for the first result (or error), and goes on with it.

The syntax is:

```js
let promise = Promise.race(iterable);
```

For instance, here the result will be `1`:

```js run
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

<<<<<<< HEAD
So, the first result/error becomes the result of the whole `Promise.race`. After the first settled promise "wins the race", all further results/errors are ignored.
=======
The first promise here was fastest, so it became the result. After the first settled promise "wins the race", all further results/errors are ignored.


## Promise.resolve/reject

Methods `Promise.resolve` and `Promise.reject` are rarely needed in modern code, because `async/await` syntax (we'll cover it [a bit later](info:async-await)) makes them somewhat obsolete.

We cover them here for completeness, and for those who can't use `async/await` for some reason.

- `Promise.resolve(value)` creates a resolved promise with the result `value`.

Same as:

```js
let promise = new Promise(resolve => resolve(value));
```

The method is used for compatibility, when a function is expected to return a promise.

For example, `loadCached` function below fetches a URL and remembers (caches) its content. For future calls with the same URL it immediately gets the previous content from cache, but uses `Promise.resolve` to make a promise of it, so that the returned value is always a promise:

```js
let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
*!*
    return Promise.resolve(cache.get(url)); // (*)
*/!*
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache.set(url,text);
      return text;
    });
}
```

We can write `loadCached(url).then(…)`, because the function is guaranteed to return a promise. We can always use `.then` after `loadCached`. That's the purpose of `Promise.resolve` in the line `(*)`.

### Promise.reject

- `Promise.reject(error)` creates a rejected promise with `error`.

Same as:

```js
let promise = new Promise((resolve, reject) => reject(error));
```

In practice, this method is almost never used.
>>>>>>> 79417c6e73645d37f184f0cc7e4bc3353e85224f

## Summary

There are 4 static methods of `Promise` class:

<<<<<<< HEAD
1. `Promise.resolve(value)` -- makes a resolved promise with the given value.
2. `Promise.reject(error)` -- makes a rejected promise with the given error.
3. `Promise.all(promises)` -- waits for all promises to resolve and returns an array of their results. If any of the given promises rejects, then it becomes the error of `Promise.all`, and all other results are ignored.
4. `Promise.race(promises)` -- waits for the first promise to settle, and its result/error becomes the outcome.
=======
1. `Promise.all(promises)` -- waits for all promises to resolve and returns an array of their results. If any of the given promises rejects, it becomes the error of `Promise.all`, and all other results are ignored.
2. `Promise.allSettled(promises)` (recently added method) -- waits for all promises to settle and returns their results as an array of objects with:
    - `state`: `"fulfilled"` or `"rejected"`
    - `value` (if fulfilled) or `reason` (if rejected).
3. `Promise.race(promises)` -- waits for the first promise to settle, and its result/error becomes the outcome.
4. `Promise.resolve(value)` -- makes a resolved promise with the given value.
5. `Promise.reject(error)` -- makes a rejected promise with the given error.
>>>>>>> 79417c6e73645d37f184f0cc7e4bc3353e85224f

Of these four, `Promise.all` is the most common in practice.
