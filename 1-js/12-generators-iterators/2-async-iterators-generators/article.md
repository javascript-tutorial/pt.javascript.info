
# Async iteration and generators

<<<<<<< HEAD
Asynchronous iterators allow to iterate over data that comes asynchronously, on-demand.
=======
Asynchronous iteration allow us to iterate over data that comes asynchronously, on-demand. Like, for instance, when we download something chunk-by-chunk over a network. And asynchronous generators make it even more convenient.
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

For instance, when we download something chunk-by-chunk, or just expect events to come asynchronously and would like to iterate over them -- async iterators and generators may come in handy. Let's see a simple example first, to grasp the syntax, and then review a real-life use case.

## Recall iterables

<<<<<<< HEAD
Asynchronous iterators are totally similar to regular iterators, with a few syntactic differences.

"Regular" iterable object from the chapter <info:iterable> look like this:
=======
Let's recall the topic about iterables. 

The idea is that we have an object, such as `range` here:
```js
let range = {
  from: 1,
  to: 5
};
```

...And we'd like to use `for..of` loop on it, such as `for(value of range)`, to get values from `1` to `5`.

In other words, we want to add an *iteration ability* to the object.

That can be implemented using a special method with the name `Symbol.iterator`:

- This method is called in by the `for..of` construct when the loop is started, and it should return an object with the `next` method.
- For each iteration, the `next()` method is invoked for the next value.
- The `next()` should return a value in the form `{done: true/false, value:<loop value>}`, where `done:true` means the end of the loop.

Here's an implementation for the iterable `range`:
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

```js run
let range = {
  from: 1,
  to: 5,

*!*
  [Symbol.iterator]() { // called once, in the beginning of for..of
*/!*
<<<<<<< HEAD
    // ...it returns the iterator object:
    // onward, for..of works only with that object, asking it for next values
=======
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
    return {
      current: this.from,
      last: this.to,

*!*
      next() { // called every iteration, to get the next value
*/!*
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for(let value of range) {
  alert(value); // 1 then 2, then 3, then 4, then 5
}
```

If anything is unclear, please visit the chapter [](info:iterable), it gives all the details about regular iterables.

## Async iterables

Asynchronous iteration is needed when values come asynchronously: after `setTimeout` or another kind of delay. 

The most common case is that the object needs to make a network request to deliver the next value, we'll see a real-life example of it a bit later.

To make an object iterable asynchronously:

1. Use `Symbol.asyncIterator` instead of `Symbol.iterator`.
2. The `next()` method should return a promise (to be fulfilled with the next value).
    - The `async` keyword handles it, we can simply make `async next()`.
3. To iterate over such an object, we should use a `for await (let item of iterable)` loop.
    - Note the `await` word.

As a starting example, let's make an iterable `range` object, similar like the one before, but now it will return values asynchronously, one per second.

All we need to do is to perform a few replacements in the code above:

```js run
let range = {
  from: 1,
  to: 5,

*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
<<<<<<< HEAD
    // ...it returns the iterator object:
    // onward, for await..of works only with that object, asking it for next values
=======
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
    return {
      current: this.from,
      last: this.to,

*!*
      async next() { // (2)
*/!*

*!*
        // note: we can use "await" inside the async next:
        await new Promise(resolve => setTimeout(resolve, 1000)); // (3)
*/!*

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

(async () => {

*!*
  for await (let value of range) { // (4)
    alert(value); // 1,2,3,4,5
  }
*/!*

})()
```

As we can see, the components are similar to regular iterators:

1. To make an object asynchronously iterable, it must have a method `Symbol.asyncIterator` `(1)`.
<<<<<<< HEAD
2. It must return the object with `next()` method returning a promise `(2)`.
3. The `next()` method doesn't have to be `async`, it may be a regular method returning a promise, but `async` allows to use `await` inside. Here we just delay for a second `(3)`.
=======
2. This method must return the object with `next()` method returning a promise `(2)`.
3. The `next()` method doesn't have to be `async`, it may be a regular method returning a promise, but `async` allows us to use `await`, so that's convenient. Here we just delay for a second `(3)`.
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
4. To iterate, we use `for await(let value of range)` `(4)`, namely add "await" after "for". It calls `range[Symbol.asyncIterator]()` once, and then its `next()` for values.

Here's a small table with the differences:

|       | Iterators | Async iterators |
|-------|-----------|-----------------|
| Object method to provide iteraterable | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` return value is              | any value         | `Promise`  |
| to loop, use                          | `for..of`         | `for await..of` |

<<<<<<< HEAD

````warn header="The spread operator doesn't work asynchronously"
=======
````warn header="The spread syntax `...` doesn't work asynchronously"
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
Features that require regular, synchronous iterators, don't work with asynchronous ones.

For instance, a spread syntax won't work:
```js
alert( [...range] ); // Error, no Symbol.iterator
```

<<<<<<< HEAD
That's natural, as it expects to find `Symbol.iterator`, same as `for..of` without `await`.
=======
That's natural, as it expects to find `Symbol.iterator`, not `Symbol.asyncIterator`.

It's also the case for `for..of`: the syntax without `await` needs `Symbol.iterator`.
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
````

## Recall generators

<<<<<<< HEAD
JavaScript also provides generators, that are also iterable.

Let's recall a sequence generator from the chapter [](info:generators). It generates a sequence of values from `start` to `end` (could be anything else):
=======
Now let's recall generators, as they allow to make iteration code much shorter. Most of the time, when we'd like to make an iterable, we'll use generators.

For sheer simplicity, omitting some important stuff, they are "functions that generate (yield) values". They are explained in detail in the chapter [](info:generators).

Generators are labelled with `function*` (note the star) and use `yield` to generate a value, then we can use `for..of` to loop over them.

This example generates a sequence of values from `start` to `end`:
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for(let value of generateSequence(1, 5)) {
  alert(value); // 1, then 2, then 3, then 4, then 5
}
```

<<<<<<< HEAD

Normally, we can't use `await` in generators. All values must come synchronously: there's no place for delay in `for..of`.
=======
As we already know, to make an object iterable, we should add `Symbol.iterator` to it.

```js
let range = {
  from: 1,
  to: 5,
*!*
  [Symbol.iterator]() {
    return <object with next to make range iterable>
  }
*/!*
}
```

A common practice for `Symbol.iterator` is to return a generator, it makes the code shorter, as you can see:

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // a shorthand for [Symbol.iterator]: function*()
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

for(let value of range) {
  alert(value); // 1, then 2, then 3, then 4, then 5
}
```

Please see the chapter [](info:generators) if you'd like more details.
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

In regular generators we can't use `await`. All values must come synchronously, as required by the `for..of` construct.

What if we'd like to generate values asynchronously? From network requests, for instance. 

Let's switch to asynchronous generators to make it possible.

## Async generators (finally)

For most practical applications, when we'd like to make an object that asynchronously generates a sequence of values, we can use an asynchronous generator.

The syntax is simple: prepend `function*` with `async`. That makes the generator asynchronous.

And then use `for await (...)` to iterate over it, like this:

```js run
*!*async*/!* function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

*!*
    // Wow, can use await!
    await new Promise(resolve => setTimeout(resolve, 1000));
*/!*

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for *!*await*/!* (let value of generator) {
    alert(value); // 1, then 2, then 3, then 4, then 5 (with delay between)
  }

})();
```

<<<<<<< HEAD
Now we have an the async generator, iteratable with `for await...of`.
=======
As the generator is asynchronous, we can use `await` inside it, rely on promises, perform network requests and so on.
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

````smart header="Under-the-hood difference"
Technically, if you're an advanced reader who remembers the details about generators, there's an internal difference.

For async generators, the `generator.next()` method is asynchronous, it returns promises.

Instead of `result = generator.next()` for a regular, non-async generator, values can be obtained like this:

```js
result = await generator.next(); // result = {value: ..., done: true/false}
```
That's why async generators work with `for await...of`.
````

<<<<<<< HEAD
## Iterables via async generators

When we'd like to make an object iterable, we should add `Symbol.iterator` to it.

```js
let range = {
  from: 1,
  to: 5,
*!*
  [Symbol.iterator]() { ...return object with next to make range iterable...  }
*/!*
}
```

A common practice for `Symbol.iterator` is to return a generator, rather than a plain object with `next` as in the example before.

Let's recall an example from the chapter [](info:generators):

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // a shorthand for [Symbol.iterator]: function*()
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};
=======
### Async iterable range
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

Regular generators can be used as `Symbol.iterator` to make the iteration code shorter.

Similar to that, async generators can be used as `Symbol.asyncIterator` to implement the asynchronous iteration.

For instance, we can make the `range` object generate values asynchronously, once per second, by replacing synchronous `Symbol.iterator` with asynchronous `Symbol.asyncIterator`:

```js run
let range = {
  from: 1,
  to: 5,

  // this line is same as [Symbol.asyncIterator]: async function*() {
*!*
  async *[Symbol.asyncIterator]() {
*/!*
    for(let value = this.from; value <= this.to; value++) {

      // make a pause between values, wait for something  
      await new Promise(resolve => setTimeout(resolve, 1000));

      yield value;
    }
  }
};

(async () => {

  for *!*await*/!* (let value of range) {
    alert(value); // 1, then 2, then 3, then 4, then 5
  }

})();
```

Now values come with a delay of 1 second between them.

```smart
Technically, we can add both `Symbol.iterator` and `Symbol.asyncIterator` to the object, so it's both synchronously (`for..of`) and asynchronously (`for await..of`) iterable.

In practice though, that would be an weird thing to do.
```

## Real-life example: paginated data

<<<<<<< HEAD
There are many online APIs that deliver paginated data. For instance, when we need a list of users, then we can fetch it page-by-page: a request returns a pre-defined count (e.g. 100 users), and provides an URL to the next page.
=======
So far we've seen basic examples, to gain understanding. Now let's review a real-life use case.
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

There are many online services that deliver paginated data. For instance, when we need a list of users, a request returns a pre-defined count (e.g. 100 users) - "one page", and provides a URL to the next page.

This pattern is very common. It's not about users, but just about anything. 

For instance, GitHub allows us to retrieve commits in the same, paginated fashion:

- We should make a request to `fetch` in the form `https://api.github.com/repos/<repo>/commits`.
- It responds with a JSON of 30 commits, and also provides a link to the next page in the `Link` header.
- Then we can use that link for the next request, to get more commits, and so on.

<<<<<<< HEAD
What we'd like to have is an iterable source of commits, so that we could use it like this:
=======
For our code, we'd like to have a simpler way to get commits.
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

Let's make a function `fetchCommits(repo)` that gets commits for us, making requests whenever needed. And let it care about all pagination stuff. For us it'll be a simple async iteration `for await..of`.

So the usage will be like this:

```js
for await (let commit of fetchCommits("username/repository")) {
  // process commit
}
```

<<<<<<< HEAD
<<<<<<< HEAD
We'd like `fetchCommits` to get commits for us, making requests whenever needed. And let it care about all pagination stuff, for us it'll be a simple `for await..of`.
=======
We'd like to make a function `fetchCommits(repo)` that gets commits for us, making requests whenever needed. And let it care about all pagination stuff, for us it'll be a simple `for await..of`.
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

With async generators that's pretty easy to implement:
=======
Here's such function, implemented as async generator:
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

```js
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, { // (1)
      headers: {'User-Agent': 'Our script'}, // github needs any user-agent header
    });

    const body = await response.json(); // (2) parses response as JSON (array of commits)

    // (3) the URL of the next page is in the headers, extract it
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage?.[1];

    url = nextPage;

    for(let commit of body) { // (4) yield commits one by one, until the page ends
      yield commit;
    }
  }
}
```

<<<<<<< HEAD
1. We use the browser `fetch` method to download from a remote URL. It allows to supply authorization and other headers if needed, here GitHub requires `User-Agent`.
2. The fetch result is parsed as JSON, that's again a `fetch`-specific method.
3. We can get the next page URL from the `Link` header of the response. It has a special format, so we use a regexp for that. The next page URL may look like this: `https://api.github.com/repositories/93253246/commits?page=2`, it's generatd by GitHub itself.
4. Then we yield all commits received, and when they finish -- the next `while(url)` iteration will trigger, making one more request.
=======
More explanations about how it works:

1. We use the browser [fetch](info:fetch) method to download the commits.

    - The initial URL is `https://api.github.com/repos/<repo>/commits`, and the next page will be in the `Link` header of the response.
    - The `fetch` method allows us to supply authorization and other headers if needed -- here GitHub requires `User-Agent`.
2. The commits are returned in JSON format.
3. We should get the next page URL from the `Link` header of the response. It has a special format, so we use a regular expression for that.
    - The next page URL may look like `https://api.github.com/repositories/93253246/commits?page=2`. It's generated by GitHub itself.
4. Then we yield the received commits one by one, and when they finish, the next `while(url)` iteration will trigger, making one more request.
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

An example of use (shows commit authors in console):

```js run
(async () => {

  let count = 0;

  for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {

    console.log(commit.author.login);

    if (++count == 100) { // let's stop at 100 commits
      break;
    }
  }

})();
```

<<<<<<< HEAD
That's just what we wanted. The internal pagination mechanics is invisible from the outside. For us it's just an async generator that returns commits.
=======
That's just what we wanted. 

The internal mechanics of paginated requests is invisible from the outside. For us it's just an async generator that returns commits.
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

## Summary

Regular iterators and generators work fine with the data that doesn't take time to generate.

When we expect the data to come asynchronously, with delays, their async counterparts can be used, and `for await..of` instead of `for..of`.

Syntax differences between async and regular iterators:

|       | Iterable | Async Iterable |
|-------|-----------|-----------------|
<<<<<<< HEAD
| Object method to provide iteraterable | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` return value is              | any value         | `Promise`  |
=======
| Method to provide iterator | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` return value is          | `{value:…, done: true/false}`         | `Promise` that resolves to `{value:…, done: true/false}`  |
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

Syntax differences between async and regular generators:

|       | Generators | Async generators |
|-------|-----------|-----------------|
| Declaration | `function*` | `async function*` |
| `next()` return value is          | `{value:…, done: true/false}`         | `Promise` that resolves to `{value:…, done: true/false}`  |

In web-development we often meet streams of data, when it flows chunk-by-chunk. For instance, downloading or uploading a big file.

<<<<<<< HEAD
We could use async generators to process such data, but there's also another API called Streams, that may be more convenient, as it provides special interfaces to transform the data and to pass it from one stream to another (e.g. download from one place and immediately send elsewhere). But they are also more complex.

<<<<<<< HEAD
Streams API not a part of JavaScript language standard. Streams and async generators complement each other, both are great ways to handle async data flows.
=======
Streams API is not a part of JavaScript language standard.
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923
=======
We can use async generators to process such data. It's also noteworthy that in some environments, like in browsers, there's also another API called Streams, that provides special interfaces to work with such streams, to transform the data and to pass it from one stream to another (e.g. download from one place and immediately send elsewhere).
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
