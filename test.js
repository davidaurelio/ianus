var assert= require('assert');
var ianus = require('./');

var HAS_TRANSFORM_SUPPORT = false;
try {
  var style = document.documentElement.style;
  HAS_TRANSFORM_SUPPORT =
    'WebkitTransition' in style ||
    'MozTransition' in style ||
    'OTransition' in style ||
    'transition' in style;
} catch (e) {}

describe('transforms:', HAS_TRANSFORM_SUPPORT ?
  testPlatformWithTransforms : testPlatformWithOutTransforms);

function testPlatformWithTransforms() {
  var element, style;
  beforeEach(function() {
    element = document.body.appendChild(document.createElement('div'));
    style = element.style;
  });
  afterEach(function() {
    document.body.removeChild(element);
    element = style = null;
  });

  it('provides the correct "transition property" property name', function() {
    style[ianus.transitionProperty] = 'height';
    assert.equal(getComputedStyle(element)[ianus.transitionProperty], 'height');
  });

  it('provides the correct "transition property" CSS property name', function() {
    style.cssText = ianus.css.transitionProperty + ':height';
    assert.equal(getComputedStyle(element)[ianus.transitionProperty], 'height');
  });

  it('provides the correct "transition duration" property name', function() {
    style[ianus.transitionDuration] = '2s';
    assert.equal(getComputedStyle(element)[ianus.transitionDuration], '2s');
  });

  it('provides the correct "transition duration" CSS property name', function() {
    style.cssText = ianus.css.transitionDuration + ':2s';
    assert.equal(getComputedStyle(element)[ianus.transitionDuration], '2s');
  });

  it('provides the correct "transition timing function" property name', function() {
    style[ianus.transitionTimingFunction] = 'cubic-bezier(1, 0, 1, 0)';
    assert.equal(getComputedStyle(element)[ianus.transitionTimingFunction], 'cubic-bezier(1, 0, 1, 0)');
  });

  it('provides the correct "transition timing function" CSS property name', function() {
    style.cssText = ianus.css.transitionTimingFunction + ':cubic-bezier(1, 0, 1, 0)';
    assert.equal(getComputedStyle(element)[ianus.transitionTimingFunction], 'cubic-bezier(1, 0, 1, 0)');
  });

  it('provides the correct "transition delay" property name', function() {
    style[ianus.transitionDelay] = '1s';
    assert.equal(getComputedStyle(element)[ianus.transitionDelay], '1s');
  });

  it('provides the correct "transition delay" CSS property name', function() {
    style.cssText = ianus.css.transitionDelay + ':1s';
    assert.equal(getComputedStyle(element)[ianus.transitionDelay], '1s');
  });

  it('provides the correct transition shorthand property name', function() {
    style[ianus.transition] = 'width cubic-bezier(0, 1, 0, 1) 1s 2s';
    assert.equal(getComputedStyle(element)[ianus.transitionProperty], 'width');
    assert.equal(getComputedStyle(element)[ianus.transitionDuration], '1s');
    assert.equal(getComputedStyle(element)[ianus.transitionTimingFunction], 'cubic-bezier(0, 1, 0, 1)');
    assert.equal(getComputedStyle(element)[ianus.transitionDelay], '2s');
  });

  it('provides the correct "transition" shorthand CSS property name', function() {
    style.cssText = ianus.css.transition + ':width 1s cubic-bezier(0, 1, 0, 1) 2s';
    assert.equal(getComputedStyle(element)[ianus.transitionProperty], 'width');
    assert.equal(getComputedStyle(element)[ianus.transitionDuration], '1s');
    assert.equal(getComputedStyle(element)[ianus.transitionTimingFunction], 'cubic-bezier(0, 1, 0, 1)');
    assert.equal(getComputedStyle(element)[ianus.transitionDelay], '2s');
  });

  it('provides the correct "transition end" event name', function(done) {
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
      assert(listener.wasCalled, 'listener was called');
      assert.equal(listener.context, element);
      done();
    }, 200);
  });
}

function testPlatformWithOutTransforms() {
  it('does not expose a "transition property" property name', function() {
    assert.equal(ianus.transitionProperty, undefined);
  });

  it('does not expose a "transition property" CSS property name', function() {
    assert.equal(ianus.transitionProperty, undefined);
  });

  it('does not expose a "transition duration" property name', function() {
    assert.equal(ianus.transitionDuration, undefined);
  });

  it('does not expose a "transition duration" CSS property name', function() {
    assert.equal(ianus.transitionDuration, undefined);
  });

  it('does not expose a "transition timing function" property name', function() {
    assert.equal(ianus.transitionTimingFunction, undefined);
  });

  it('does not expose a "transition timing function" CSS property name', function() {
    assert.equal(ianus.transitionTimingFunction, undefined);
  });

  it('does not expose a "transition delay" property name', function() {
    assert.equal(ianus.transitionDelay, undefined);
  });

  it('does not expose a "transition delay" CSS property name', function() {
    assert.equal(ianus.transitionDelay, undefined);
  });

  it('does not expose a transition shorthand property name', function() {
    assert.equal(ianus.transition, undefined);
  });

  it('does not expose a "transition" shorthand CSS property name', function() {
    assert.equal(ianus.css.transition, undefined);
  });

  it('does not expose a "transition end" event name', function() {
    assert.equal(ianus.css.transitionend, undefined);
  });
}

function forceRedraw(element) {
  return element.offsetHeight;
}
