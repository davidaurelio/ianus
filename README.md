Ianus
=====

> In ancient Roman religion and myth, Janus (Latin: **Ianus,** pronounced [ˈjaː.nus]) is the god of beginnings and **transitions,** and thereby of gates, doors, doorways, passages and endings. (from [Wikipedia](http://en.wikipedia.org/wiki/Janus))

Ianus provides names of CSS3 animation and transition properties to make
cross-browser development easier.

In environments that don’t support animations,
transitions or even a DOM, properties are simply `undefined`.

The provided names are:

- `transitionProperty`
- `transitionDuration`
- `transitionTimingFunction`
- `transitionDelay`
- `transition`
- `transitionend` – the name of the `'transitionend'` event
- `css.transitionProperty` – the CSS property name
- `css.transitionDuration`
- `css.transitionTimingFunction`
- `css.transitionDelay`
- `css.transition`

[![Build Status](https://travis-ci.org/davidaurelio/ianus.svg?branch=master)](https://travis-ci.org/davidaurelio/ianus)

Cross-browser testing is kindly provided by **[BrowserStack][].**

[BrowserStack]: http://www.browserstack.com

But this has been written before!
-----

Indeed, but unfortunately I could not find one version that would run under
node.js without throwing. Since I want to share view code between browser and
server, I had to come up with my own solution.
