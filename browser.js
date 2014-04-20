!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.byestyle=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Focm2+":[function(_dereq_,module,exports){
var byestyle = module.exports = {
  calculate: function () {
    if (++byestyle.calculatedCount === 1) {
      console.log(byestyle.spacer);
      console.error('Consider moving these to classes...');

      byestyle.els.
        forEach(function (elObject) {
          var lastStyle = elObject.properties.styleLog[elObject.properties.styleLog.length - 1];
          console.info(elObject.el);
          console.log([
            'Styles at page load:',
            byestyle.format(lastStyle),
            byestyle.separator].join('\n'));
        });

      return;
    }

    var els = byestyle.els.
      filter(function (elObject) {
        var styleLog = elObject.properties.styleLog;
        return styleLog.length === 1 ||
            styleLog[styleLog.length - 2] !== styleLog[styleLog.length - 1];
      }).
      reduce(function (acc, elObject) {
        var similarElAlreadyInAcc = acc.some(function (elObjectB) {
          return elObject.el.tagName === elObjectB.el.tagName &&
              elObject.el.getAttribute('style') === elObjectB.el.getAttribute('style');
        });

        if (!similarElAlreadyInAcc) {
          acc.push(elObject);
        }

        return acc;
      }, []);

    if (els.length) {
      console.log(byestyle.spacer);
      console.warn('Elements that have been modified by JavaScript...');
      console.log(byestyle.separator);

      els.
        forEach(function (elObject) {
          var style = elObject.el.getAttribute('style'),
              styleLog = elObject.properties.styleLog;

          console.info(elObject.el);

          if (styleLog.length > 1 && styleLog[styleLog.length - 2] !== styleLog[styleLog.length - 1]) {
            console.log('Style log:');
            console.dir(styleLog);
            console.log([
              'Previous style:',
              byestyle.format(styleLog[styleLog.length - 2])].join('\n'));
          }

          console.log([
            'Current style:',
            byestyle.format(style),
            byestyle.separator].join('\n'));
        });
    }
  },

  calculatedCount: 0,

  els: [],

  fade: function (direction) {
    console.log([
      '--',
      '------',
      '-----------------------',
      '-------------------------------------'
    ][direction === 'in' ? 'sort' : 'reverse']().join('\n'));
  },

  find: function (el) {
    return byestyle.els.filter(function (elObject) {
      return el === elObject.el;
    })[0] || {};
  },

  format: function (elString) {
    return '  ' + elString.split(/[\n;]\s*/g).filter(function (item) {
      return item;
    }).sort().join(';\n  ') + ';';
  },

  getStyles: function () {
    return [].slice.call(document.querySelectorAll('[style]'));
  },

  help: function () {
    byestyle.fade('in');
    console.log([
      '',
      'H O W  . B Y E S T Y L E .  W O R K S',
      ''].join('\n'));
    console.error(
      'console.error = styles are on an element before any JS has executed.');
    console.warn(
      'console.warn = styles are on an element after JS has executed.');
    console.info(
      'console.info = the element being analyzed.');
    console.log([
      '',
      'Help this tool improve:',
      'https://github.com/stephenplusplus/byestyle'].join('\n'));
    byestyle.fade('out');
  },

  inventory: function () {
    byestyle.els = byestyle.getStyles().map(function (el) {
      var elObject = {
        el: el,
        properties: byestyle.find(el).properties || {
          styleLog: []
        }
      };

      elObject.properties.styleLog.push(el.getAttribute('style'));

      return elObject;
    });
  },

  separator: '-------------------------------------',

  spacer: ['', ''].join('\n')
};

byestyle.help();
byestyle.inventory();
byestyle.calculate();

},{}],"byestyle":[function(_dereq_,module,exports){
module.exports=_dereq_('Focm2+');
},{}]},{},["Focm2+"])
("Focm2+")
});