var prefixes = [
  ['WebkitTransition', '-webkit-transition', 'webkitTransitionEnd'],
  ['MozTransition', '-moz-transition', 'transitionEnd'],
  ['OTransition', '-o-transition', 'oTransitionEnd'],
  ['transition', 'transition', 'transitionend']
];

var prefix, cssPrefix, transitionEnd;
try {
  var style = document.documentElement.style;
  for (var pair, i = 0; (pair = prefixes[i++]); ) {
    if (style[pair[0]] != null) {
      prefix = pair[0];
      cssPrefix = pair[1];
      transitionEnd = pair[2];
      break;
    }
  }
} catch (e) {}

exports.transitionProperty = prefix && prefix + 'Property';
exports.transitionDuration = prefix && prefix + 'Duration';
exports.transitionTimingFunction = prefix && prefix + 'TimingFunction';
exports.transitionDelay = prefix && prefix + 'Delay';
exports.transition = prefix;
exports.css = {
  transitionProperty: cssPrefix && cssPrefix + '-property',
  transitionDuration: cssPrefix && cssPrefix + '-duration',
  transitionTimingFunction: cssPrefix && cssPrefix + '-timing-function',
  transitionDelay: cssPrefix && cssPrefix + '-delay',
  transition: cssPrefix
};
exports.transitionend = transitionEnd;
