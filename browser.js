!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.byestyle=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Focm2+":[function(_dereq_,module,exports){
'use strict';

var byestyle = module.exports = {
  calculate: function () {
    function getDisplayName(el) {
      return el.tagName.toLowerCase() + (el.className ? '.' : '') + el.className;
    }

    function logElHeading(el) {
      console.info('%cElement: (right-click to inspect)\n ', 'font-style: italic;', el);
    }

    if (++byestyle.calculatedCount === 1) {
      console.groupCollapsed('Consider moving these to classes...');

      byestyle.els.
        forEach(function (elObject) {
          var lastStyle = elObject.properties.styleLog[elObject.properties.styleLog.length - 1];
          console.groupCollapsed(getDisplayName(elObject.el));
          logElHeading(elObject.el);
          console.info('%cStyles at page load:', 'font-style: italic;');
          console.log(byestyle.format(lastStyle));
          console.groupEnd();
        });

      console.groupEnd();
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
      console.groupCollapsed('Elements that have been modified by JavaScript...');

      els.
        forEach(function (elObject) {
          var style = elObject.el.getAttribute('style'),
              styleLog = elObject.properties.styleLog;

          console.groupCollapsed(getDisplayName(elObject.el));

          logElHeading(elObject.el);

          if (styleLog.length > 1 && styleLog[styleLog.length - 2] !== styleLog[styleLog.length - 1]) {
            console.info('%cStyle log:', 'font-style: italic;');
            console.dir(styleLog);
            console.info('%cPrevious style:', 'font-style: italic;');
            console.log(byestyle.format(styleLog[styleLog.length - 2]));
          }

          console.info('%cCurrent style:', 'font-style: italic;');
          console.log(byestyle.format(style));

          console.groupEnd();
        });

      console.groupEnd();
    }
  },

  calculatedCount: 0,

  els: [],

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
    console.log('%cbyestyle.', 'font-size: 18px; color: #B75AD6;');
    console.log([
      'Help this tool improve:',
      'https://github.com/stephenplusplus/byestyle'
    ].join('\n'));
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
  }
};

byestyle.help();
byestyle.inventory();
byestyle.calculate();

},{}],"byestyle":[function(_dereq_,module,exports){
module.exports=_dereq_('Focm2+');
},{}]},{},["Focm2+"])
("Focm2+")
});