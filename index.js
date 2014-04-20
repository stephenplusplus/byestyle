var byestyles = module.exports = {
  calculate: function () {
    if (++byestyles.calculatedCount === 1) {
      console.log(byestyles.spacer);
      console.error('Consider moving these to classes...');

      byestyles.els.
        forEach(function (elObject) {
          var lastStyle = elObject.properties.styleLog[elObject.properties.styleLog.length - 1];
          console.info(elObject.el);
          console.log([
            'Styles at page load:',
            byestyles.format(lastStyle),
            byestyles.separator].join('\n'));
        });

      return;
    }

    var els = byestyles.els.
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
      console.log(byestyles.spacer);
      console.warn('Elements that have been modified by JavaScript...');
      console.log(byestyles.separator);

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
              byestyles.format(styleLog[styleLog.length - 2])].join('\n'));
          }

          console.log([
            'Current style:',
            byestyles.format(style),
            byestyles.separator].join('\n'));
        });
    }
  },

  calculatedCount: 0,

  els: [],

  fade: function (direction) {
    console.log([
      '--',
      '------',
      '------------------------',
      '---------------------------------------'
    ][direction === 'in' ? 'sort' : 'reverse']().join('\n'));
  },

  find: function (el) {
    return byestyles.els.filter(function (elObject) {
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
    byestyles.fade('in');
    console.log([
      '',
      'H O W  . B Y E S T Y L E S .  W O R K S',
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
      'https://github.com/stephenplusplus/byestyles'].join('\n'));
    byestyles.fade('out');
  },

  inventory: function () {
    byestyles.els = byestyles.getStyles().map(function (el) {
      var elObject = {
        el: el,
        properties: byestyles.find(el).properties || {
          styleLog: []
        }
      };

      elObject.properties.styleLog.push(el.getAttribute('style'));

      return elObject;
    });
  },

  separator: '---------------------------------------',

  spacer: ['', ''].join('\n')
};

byestyles.help();
byestyles.inventory();
byestyles.calculate();