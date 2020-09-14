# Pointer events

<<<<<<< HEAD
Pointer events is a modern way to handle input from a variety of pointing devices, such as a mouse, a pen/stylus, a touchscreen and so on.
=======
Pointer events are a modern way to handle input from a variety of pointing devices, such as a mouse, a pen/stylus, a touchscreen, and so on.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

## The brief history

Let's make a small overview, so that you understand the general picture and the place of Pointer Events among other event types.

<<<<<<< HEAD
- Long ago, in the past, there existed only mouse events.

    Then touch devices appeared. For the old code to work, they also generate mouse events. For instance, tapping generates `mousedown`. But mouse events were not good enough, as touch devices are more powerful in many aspects. For example, it's possible to touch multiple points at once, and mouse events don't have any properties for that.

- So touch events were introduced, such as `touchstart`, `touchend`, `touchmove`, that have touch-specific properties (we don't cover them in details here, because pointer events are event better).

    Still, it wasn't enough, as there are many other devices, such as pens, that have their own features. Also, writing a code that listens both touch and mouse events was cumbersome. 

- To solve these issues, the new standard Pointer Events was introduced. It provides a single set of events for all kinds of pointing devices.

As of now, [Pointer Events Level 2](https://www.w3.org/TR/pointerevents2/) specification is supported in all major browsers, while the [Pointer Events Level 3](https://w3c.github.io/pointerevents/) is in the works. Unless you code for Internet Explorer 10 or Safari 12 and below, there's no point in using mouse or touch events any more. We can switch to pointer events.

That said, there are important peculiarities, one should know them to use them correctly and avoid extra surprises.  We'll pay attention to them in this article.

## Pointer event types

Pointer events are named similar to mouse events:

| Pointer Event | Mouse event |
=======
- Long ago, in the past, there were only mouse events.

    Then touch devices became widespread, phones and tablets in particular. For the existing scripts to work, they generated (and still generate) mouse events. For instance, tapping a touchscreen generates `mousedown`. So touch devices worked well with web pages.
    
    But touch devices have more capabilities than a mouse. For example, it's possible to touch multiple points at once ("multi-touch"). Although, mouse events don't have necessary properties to handle such multi-touches.

- So touch events were introduced, such as `touchstart`, `touchend`, `touchmove`, that have touch-specific properties (we don't cover them in detail here, because pointer events are even better).

    Still, it wasn't enough, as there are many other devices, such as pens, that have their own features. Also, writing code that listens for both touch and mouse events was cumbersome. 

- To solve these issues, the new standard Pointer Events was introduced. It provides a single set of events for all kinds of pointing devices.

As of now, [Pointer Events Level 2](https://www.w3.org/TR/pointerevents2/) specification is supported in all major browsers, while the newer [Pointer Events Level 3](https://w3c.github.io/pointerevents/) is in the works and is mostly compartible with Pointer Events level 2. 

Unless you develop for old browsers, such as Internet Explorer 10, or for Safari 12 or below, there's no point in using mouse or touch events any more -- we can switch to pointer events.

Then your code will work well with both touch and mouse devices.

That said, there are some important peculiarities that one should know in order to use Pointer Events correctly and avoid surprises. We'll make note of them in this article.

## Pointer event types

Pointer events are named similarly to mouse events:

| Pointer event | Similar mouse event |
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
|---------------|-------------|
| `pointerdown` | `mousedown` |
| `pointerup` | `mouseup` |
| `pointermove` | `mousemove` |
| `pointerover` | `mouseover` |
| `pointerout` | `mouseout` |
| `pointerenter` | `mouseenter` |
| `pointerleave` | `mouseleave` |
| `pointercancel` | - |
| `gotpointercapture` | - |
| `lostpointercapture` | - |

<<<<<<< HEAD
As we can see, for every `mouse<event>`, there's a `pointer<event>` that plays a similar role. Also there are 3 additional pointer events that don't have a corresponding `mouse...` counterpart, we'll soon explain about them. 
=======
As we can see, for every `mouse<event>`, there's a `pointer<event>` that plays a similar role. Also there are 3 additional pointer events that don't have a corresponding `mouse...` counterpart, we'll explain them soon. 
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```smart header="Replacing `mouse<event>` with `pointer<event>` in our code"
We can replace `mouse<event>` events with `pointer<event>` in our code and expect things to continue working fine with mouse.

<<<<<<< HEAD
The support for touch devices will also "magically" improve, but we'll probably need to add `touch-action: none` rule in CSS. See the details below in the section about `pointercancel`. 
=======
The support for touch devices will also "magically" improve. Although, we may need to add `touch-action: none` in some places in CSS. We'll cover it below in the section about `pointercancel`. 
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
```

## Pointer event properties

<<<<<<< HEAD
Pointer events have the same properties as mouse events, such as `clientX/Y`, `target` etc, plus some extra:

- `pointerId` - the unique identifier of the pointer causing the event.
    
    Allows to handle multiple pointers, such as a touchscreen with stylus and multi-touch (explained below).
- `pointerType` - the pointing device type, must be a string, one of: "mouse", "pen" or "touch". 

    We can use this property to react differently on various pointer types.
- `isPrimary` - `true` for the primary pointer (the first finger in multi-touch).

For pointers that measure a contact area and pressure, e.g. a finger on the touchscreen, the additional properties can be useful:

- `width` - the width of of the area where the pointer touches the device. Where unsupported, e.g. for mouse it's always `1`. 
- `height` - the height of of the area where the pointer touches the device. Where unsupported, always `1`.
=======
Pointer events have the same properties as mouse events, such as `clientX/Y`, `target`, etc., plus some others:

- `pointerId` - the unique identifier of the pointer causing the event.
    
    Browser-generated. Allows us to handle multiple pointers, such as a touchscreen with stylus and multi-touch (examples will follow).
- `pointerType` - the pointing device type. Must be a string, one of: "mouse", "pen" or "touch". 

    We can use this property to react differently on various pointer types.
- `isPrimary` - is `true` for the primary pointer (the first finger in multi-touch).

Some pointer devices measure contact area and pressure, e.g. for a finger on the touchscreen, there are additional properties for that:

- `width` - the width of the area where the pointer (e.g. a finger) touches the device. Where unsupported, e.g. for a mouse, it's always `1`. 
- `height` - the height of the area where the pointer touches the device. Where unsupported, it's always `1`.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
- `pressure` - the pressure of the pointer tip, in range from 0 to 1. For devices that don't support pressure must be either `0.5` (pressed) or `0`.
- `tangentialPressure` - the normalized tangential pressure.
- `tiltX`, `tiltY`, `twist` - pen-specific properties that describe how the pen is positioned relative the surface.

<<<<<<< HEAD
These properties aren't very well supported across devices, so they are rarely used. You can find the details in the [specification](https://w3c.github.io/pointerevents/#pointerevent-interface) if needed.

## Multi-touch

One of the things that mouse events totally don't support is multi-touch: a user can touch them in several places at once at their phone or tablet, perform special gestures.

Pointer Events allow to handle multi-touch with the help of `pointerId` and `isPrimary` properties.

Here's what happens when a user touches a screen at one place, and then puts another finger somewhere else on it:

1. At the first touch:
    - `pointerdown` with `isPrimary=true` and some `pointerId`.
2. For the second finger and further touches:
    - `pointerdown` with `isPrimary=false` and a different `pointerId` for every finger.

Please note: there `pointerId` is assigned not to the whole device, but for each touching finger. If we use 5 fingers to simultaneously touch the screen, we have 5 `pointerdown` events with respective coordinates and different `pointerId`.

The events associated with the first finger always have `isPrimary=true`.

We can track multiple touching fingers using their `pointerId`. When the user moves move and then detouches a finger, we get `pointermove` and `pointerup` events with the same `pointerId` as we had in `pointerdown`.
=======
These properties aren't supported by most devices, so they are rarely used. You can find the details about them in the [specification](https://w3c.github.io/pointerevents/#pointerevent-interface) if needed.

## Multi-touch

One of the things that mouse events totally don't support is multi-touch: a user can touch in several places at once on their phone or tablet, or perform special gestures.

Pointer Events allow handling multi-touch with the help of the `pointerId` and `isPrimary` properties.

Here's what happens when a user touches a touchscreen in one place, then puts another finger somewhere else on it:

1. At the first finger touch:
    - `pointerdown` with `isPrimary=true` and some `pointerId`.
2. For the second finger and more fingers (assuming the first one is still touching):
    - `pointerdown` with `isPrimary=false` and a different `pointerId` for every finger.

Please note: the `pointerId` is assigned not to the whole device, but for each touching finger. If we use 5 fingers to simultaneously touch the screen, we have 5 `pointerdown` events, each with their respective coordinates and a different `pointerId`.

The events associated with the first finger always have `isPrimary=true`.

We can track multiple touching fingers using their `pointerId`. When the user moves and then removes a finger, we get `pointermove` and `pointerup` events with the same `pointerId` as we had in `pointerdown`.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```online
Here's the demo that logs `pointerdown` and `pointerup` events:

[iframe src="multitouch" edit height=200]

<<<<<<< HEAD
Please note: you must be using a touchscreen device, such as a phone or a tablet to actually see the difference. For single-touch devices, such as a mouse, there'll be always same `pointerId` with `isPrimary=true`, for all pointer events.
=======
Please note: you must be using a touchscreen device, such as a phone or a tablet, to actually see the difference in `pointerId/isPrimary`. For single-touch devices, such as a mouse, there'll be always same `pointerId` with `isPrimary=true`, for all pointer events.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
```

## Event: pointercancel

<<<<<<< HEAD
We've mentioned the importance of `touch-action: none` before. Now let's explain why, as skipping this may cause our interfaces to malfunction.

The `pointercancel` event fires when there's an ongoing pointer interaction, and then something happens that causes it to be aborted, so that no more pointer events are generated. 

Such causes are: 
- The pointer device hardware was disabled.
=======
The `pointercancel` event fires when there's an ongoing pointer interaction, and then something happens that causes it to be aborted, so that no more pointer events are generated. 

Such causes are: 
- The pointer device hardware was physically disabled.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
- The device orientation changed (tablet rotated). 
- The browser decided to handle the interaction on its own, considering it a mouse gesture or zoom-and-pan action or something else.

We'll demonstrate `pointercancel` on a practical example to see how it affects us.

Let's say we're impelementing drag'n'drop for a ball, just as in the beginning of the article <info:mouse-drag-and-drop>.

<<<<<<< HEAD
Here are the flow of user actions and corresponding events:

1) The user presses the mouse button on an image, to start dragging
    - `pointerdown` event fires
2) Then they start dragging the image
    - `pointermove` fires, maybe several times
3) Surprise! The browser has native drag'n'drop support for images, that kicks in and takes over the drag'n'drop process, thus generating `pointercancel` event.
    - The browser now handles drag'n'drop of the image on its own. The user may even drag the ball image out of the browser, into their Mail program or a File Manager.
    - No more `pointermove` events for us.

So the issue is that the browser "hijacks" the interaction: `pointercancel` fires and no more `pointermove` events are generated.

```online
Here's the demo with pointer events (only `up/down`, `move` and `cancel`) logged in the textarea: 
=======
Here is the flow of user actions and the corresponding events:

1) The user presses on an image, to start dragging
    - `pointerdown` event fires
2) Then they start moving the pointer (thus dragging the image)
    - `pointermove` fires, maybe several times
3) And then the surprise happens! The browser has native drag'n'drop support for images, that kicks in and takes over the drag'n'drop process, thus generating `pointercancel` event.
    - The browser now handles drag'n'drop of the image on its own. The user may even drag the ball image out of the browser, into their Mail program or a File Manager.
    - No more `pointermove` events for us.

So the issue is that the browser "hijacks" the interaction: `pointercancel` fires in the beginning of the "drag-and-drop" process, and no more `pointermove` events are generated.

```online
Here's the drag'n'drop demo with loggin of pointer events (only `up/down`, `move` and `cancel`) in the `textarea`: 
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

[iframe src="ball" height=240 edit]
```

<<<<<<< HEAD
We'd like to implement our own drag'n'drop, so let's tell the browser not to take it over.

**Prevent default browser actions to avoid `pointercancel`.**
=======
We'd like to implement the drag'n'drop on our own, so let's tell the browser not to take it over.

**Prevent the default browser action to avoid `pointercancel`.**
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

We need to do two things:

1. Prevent native drag'n'drop from happening:
<<<<<<< HEAD
    - Can do it by setting `ball.ondragstart = () => false`, just as described in the article <info:mouse-drag-and-drop>.
    - That works well for mouse events.
2. For touch devices, there are also touch-related browser actions. We'll have problems with them too.
    - We can prevent them by setting `#ball { touch-action: none }` in CSS. 
    - Then our code will start working on touch devices.

After we do that, the events will work as intended, the browser won't hijack the process and emit no `pointercancel`.
=======
    - We can do this by setting `ball.ondragstart = () => false`, just as described in the article <info:mouse-drag-and-drop>.
    - That works well for mouse events.
2. For touch devices, there are other touch-related browser actions (besides drag'n'drop). To avoid problems with them too:
    - Prevent them by setting `#ball { touch-action: none }` in CSS. 
    - Then our code will start working on touch devices.

After we do that, the events will work as intended, the browser won't hijack the process and doesn't emit `pointercancel`.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```online
This demo adds these lines:

[iframe src="ball-2" height=240 edit]

As you can see, there's no `pointercancel` any more.
```

Now we can add the code to actually move the ball, and our drag'n'drop will work for mouse devices and touch devices.

## Pointer capturing

Pointer capturing is a special feature of pointer events.

<<<<<<< HEAD
The idea is that we can "bind" all events with a particular `pointerId` to a given element. Then all subsequent events with the same `pointerId` will be retargeted to the same element. That is: the browser sets that element as the target and trigger associated handlers, no matter where it actually happened.

The related methods are:
- `elem.setPointerCapture(pointerId)` - binds the given `pointerId` to `elem`.
- `elem.releasePointerCapture(pointerId)` - unbinds the given `pointerId` from `elem`.

Such binding doesn't hold long. It's automatically removed after `pointerup` or `pointercancel` events, or when the target `elem` is removed from the document. 

Now when do we need this?

**Pointer capturing is used to simplify drag'n'drop kind of interactions.**

Let's recall the problem we met while making a custom slider in the article <info:mouse-drag-and-drop>.

1) First, the user presses `pointerdown` on the slider thumb to start dragging it.
2) ...But then, as they move the pointer, it may leave the slider: go below or over it.

But we continue tracking track `pointermove` events and move the thumb until `pointerup`, even though the pointer is not on the slider any more.

[Previously](info:mouse-drag-and-drop), to handle `pointermove` events that happen outside of the slider, we listened for `pointermove` events on the whole `document`. 

Pointer capturing provides an alternative solution: we can call `thumb.setPointerCapture(event.pointerId)` in `pointerdown` handler, and then all future pointer events until `pointerup` will be retarteted to `thumb`.

That is: events handlers on `thumb` will be called, and `event.target` will always be `thumb`, even if the user moves their pointer around the whole document. So we can listen at `thumb` for `pointermove`, no matter where it happens.
=======
The idea is very simple, but may seem quite odd at first, as nothing like that exists for any other event type.

The main method is:
- `elem.setPointerCapture(pointerId)` - binds events with the given `pointerId` to `elem`. After the call all pointer events with the same `pointerId` will have `elem` as the target (as if happened on `elem`), no matter where in document they really happened.

In other words, `elem.setPointerCapture(pointerId)` retargets all subsequent events with the given `pointerId` to `elem`.

The binding is removed:
- automatically when `pointerup` or `pointercancel` events occur,
- automatically when `elem` is removed from the document,
- when `elem.releasePointerCapture(pointerId)` is called.

**Pointer capturing can be used to simplify drag'n'drop kind of interactions.**

As an example, let's recall how one can implement a custom slider, described in the <info:mouse-drag-and-drop>.

We make a slider element with the strip and the "runner" (`thumb`) inside it.

Then it works like this:

1. The user presses on the slider `thumb` - `pointerdown` triggers.
2. Then they move the pointer - `pointermove` triggers, and we move the `thumb` along.
    - ...As the pointer moves, it may leave the slider `thumb`: go above or below it. The `thumb` should move strictly horizontally, remaining aligned with the pointer.

So, to track all pointer movements, including when it goes above/below the `thumb`, we had to assign `pointermove` event handler on the whole `document`.

That solution looks a bit "dirty". One of the problems is that pointer movements around the document may cause side effects, trigger other event handlers, totally not related to the slider.

Pointer capturing provides a means to bind `pointermove` to `thumb` and avoid any such problems:

- We can call `thumb.setPointerCapture(event.pointerId)` in `pointerdown` handler,
- Then future pointer events until `pointerup/cancel` will be retargeted to `thumb`. 
- When `pointerup` happens (dragging complete), the binding is removed automatically, we don't need to care about it.

So, even if the user moves the pointer around the whole document, events handlers will be called on `thumb`. Besides, coordinate properties of the event objects, such as `clientX/clientY` will still be correct - the capturing only affects `target/currentTarget`.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Here's the essential code:

```js
thumb.onpointerdown = function(event) {
<<<<<<< HEAD
  // retarget all pointer events (until pointerup) to me
=======
  // retarget all pointer events (until pointerup) to thumb
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
  thumb.setPointerCapture(event.pointerId);
};

thumb.onpointermove = function(event) {
<<<<<<< HEAD
  // move the slider: listen at thumb, as all events are retargeted to it
=======
  // moving the slider: listen on the thumb, as all pointer events are retargeted to it
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
  let newLeft = event.clientX - slider.getBoundingClientRect().left;
  thumb.style.left = newLeft + 'px';
};

// note: no need to call thumb.releasePointerCapture, 
// it happens on pointerup automatically
```

```online
The full demo:

[iframe src="slider" height=100 edit]
```

<<<<<<< HEAD
**As a summary: the code becomes cleaner as we don't need to add/remove handlers on the whole `document` any more. That's what pointer capturing does.**
=======
At the end, pointer capturing gives us two benefits:
1. The code becomes cleaner as we don't need to add/remove handlers on the whole `document` any more. The binding is released automatically.
2. If there are any `pointermove` handlers in the document, they won't be accidentally triggered by the pointer while the user is dragging the slider.

### Pointer capturing events
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

There are two associated pointer events:

- `gotpointercapture` fires when an element uses `setPointerCapture` to enable capturing.
- `lostpointercapture` fires when the capture is released: either explicitly with `releasePointerCapture` call, or automatically on `pointerup`/`pointercancel`.

## Summary

<<<<<<< HEAD
Pointer events allow to handle mouse, touch and pen events simultaneously.

Pointer events extend mouse events. We can replace `mouse` with `pointer` in event names and expect our code to continue working for mouse, with better support for other device types.

Remember to set `touch-events: none` in CSS for elements that we engage, otherwise the browser hijacks many types of touch interactions and pointer events won't be generated.

Additional abilities of Pointer events are:

- Multi-touch support using `pointerId` and `isPrimary`.
- Device-specific properties, such as `pressure`, `width/height` and others.
- Pointer capturing: we can retarget all pointer events to a specific element until `pointerup`/`pointercancel`.

As of now, pointer events are supported in all major browsers, so we can safely switch to them, if IE10- and Safari 12- are not needed. And even with those browsers, there are polyfills that enable the support of pointer events.
=======
Pointer events allow handling mouse, touch and pen events simultaneously, with a single piece of code.

Pointer events extend mouse events. We can replace `mouse` with `pointer` in event names and expect our code to continue working for mouse, with better support for other device types.

For drag'n'drops and complex touch interactions that the browser may decide to hijack and handle on its own - remember to cancel the default action on events and set `touch-events: none` in CSS for elements that we engage.

Additional abilities of pointer events are:

- Multi-touch support using `pointerId` and `isPrimary`.
- Device-specific properties, such as `pressure`, `width/height`, and others.
- Pointer capturing: we can retarget all pointer events to a specific element until `pointerup`/`pointercancel`.

As of now, pointer events are supported in all major browsers, so we can safely switch to them, especially if IE10- and Safari 12- are not needed. And even with those browsers, there are polyfills that enable the support of pointer events.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
