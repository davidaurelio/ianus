var ianus = require('./');
var tape = require('tape');

function testIf(condition, title, callback) {
  if (condition) {
    tape(title, function(t) {
      var element = document.body.appendChild(document.createElement('div'));
      callback(t, element, element.style, function tearDown() {
        document.body.removeChild(element);
      });
    });
  } else {
    tape(title, function(t) {
      t.skip();
      t.end();
    });
  }
}

testIf(ianus.transitionProperty, 'provides the correct transition property property name', function(t, element, style, tearDown) {
  style[ianus.transitionProperty] = 'height';
  t.equal(getComputedStyle(element)[ianus.transitionProperty], 'height');
  tearDown();
  t.end();
});

testIf(ianus.transitionProperty, 'provides the correct CSS transition property property name', function(t, element, style, tearDown) {
  style.cssText = ianus.css.transitionProperty + ':height';
  t.equal(getComputedStyle(element)[ianus.transitionProperty], 'height');
  tearDown();
  t.end();
});

testIf(ianus.transitionDuration, 'provides the correct transition duration property name', function(t, element, style, tearDown) {
  style[ianus.transitionDuration] = '2s';
  t.equal(getComputedStyle(element)[ianus.transitionDuration], '2s');
  tearDown();
  t.end();
});

testIf(ianus.transitionDuration, 'provides the correct CSS transition duration property name', function(t, element, style, tearDown) {
  style.cssText = ianus.css.transitionDuration + ':2s';
  t.equal(getComputedStyle(element)[ianus.transitionDuration], '2s');
  tearDown();
  t.end();
});

testIf(ianus.transitionTimingFunction, 'provides the correct transition timing function property name', function(t, element, style, tearDown) {
  style[ianus.transitionTimingFunction] = 'cubic-bezier(1, 0, 1, 0)';
  t.equal(getComputedStyle(element)[ianus.transitionTimingFunction], 'cubic-bezier(1, 0, 1, 0)');
  tearDown();
  t.end();
});

testIf(ianus.transitionTimingFunction, 'provides the correct CSS transition timing function property name', function(t, element, style, tearDown) {
  style.cssText = ianus.css.transitionTimingFunction + ':cubic-bezier(1, 0, 1, 0)';
  t.equal(getComputedStyle(element)[ianus.transitionTimingFunction], 'cubic-bezier(1, 0, 1, 0)');
  tearDown();
  t.end();
});

testIf(ianus.transitionDelay, 'provides the correct transition delay property name', function(t, element, style, tearDown) {
  style[ianus.transitionDelay] = '1s';
  t.equal(getComputedStyle(element)[ianus.transitionDelay], '1s');
  tearDown();
  t.end();
});

testIf(ianus.transitionDelay, 'provides the correct CSS transition delay property name', function(t, element, style, tearDown) {
  style.cssText = ianus.css.transitionDelay + ':1s';
  t.equal(getComputedStyle(element)[ianus.transitionDelay], '1s');
  tearDown();
  t.end();
});

testIf(ianus.transition, 'provides the correct transition shorthand property name', function(t, element, style, tearDown) {
  style[ianus.transition] = 'width cubic-bezier(0, 1, 0, 1) 1s 2s';
  t.equal(getComputedStyle(element)[ianus.transitionProperty], 'width');
  t.equal(getComputedStyle(element)[ianus.transitionDuration], '1s');
  t.equal(getComputedStyle(element)[ianus.transitionTimingFunction], 'cubic-bezier(0, 1, 0, 1)');
  t.equal(getComputedStyle(element)[ianus.transitionDelay], '2s');
  tearDown();
  t.end();
});

testIf(ianus.transition, 'provides the correct CSS transition shorthand property name', function(t, element, style, tearDown) {
  style.cssText = ianus.css.transition + ':width 1s cubic-bezier(0, 1, 0, 1) 2s';
  t.equal(getComputedStyle(element)[ianus.transitionProperty], 'width');
  t.equal(getComputedStyle(element)[ianus.transitionDuration], '1s');
  t.equal(getComputedStyle(element)[ianus.transitionTimingFunction], 'cubic-bezier(0, 1, 0, 1)');
  t.equal(getComputedStyle(element)[ianus.transitionDelay], '2s');
  tearDown();
  t.end();
});

testIf(ianus.transitionend, 'provides the correct transition end event name', function(t, element, style, tearDown) {
  var listener = function() {
    listener.wasCalled = true;
    listener.context = this;
  };
  style.height = '100px';
  style[ianus.transition] = 'height linear 50ms';
  element.addEventListener(ianus.transitionend, listener, false);
  forceRedraw(element);

  style.height = '200px';
  setTimeout(function() {
    t.ok(listener.wasCalled, 'listener was called');
    t.equal(listener.context, element);
    tearDown();
    t.end();
  }, 100);
});

testIf(ianus.transitionend, 'can remove an added transition end listener', function(t, element, style, tearDown) {
  var listener = function() { listener.wasCalled = true; };
  style.height = '100px';
  style[ianus.transition] = 'height linear 50ms';
  element.addEventListener(ianus.transitionend, listener, false);
  forceRedraw(element);

  style.height = '200px';
  element.removeEventListener(ianus.transitionend, listener, false);
  setTimeout(function() {
    t.notOk(listener.wasCalled, 'listener was not called');
    t.end();
  }, 100);
});

function forceRedraw(element) {
  return element.offsetHeight;
}
