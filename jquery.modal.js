//! Copyright (c) 2013 Alan Plum. MIT License
(function($) {
  function _once(init, fn) {
    var result = null;
    return function() {
      if (!result) {
        result = init.apply(this, arguments);
        init = $.noop;
      }
      return fn ? fn.apply(this, arguments) : result;
    };
  }
  function _getApiMethod(cls, name, length) {
    var i, method, fn;
    length = length || 0;
    for (i = 0; i < cls.api.length; i++) {
      method = cls.api[i];
      if (method[0] !== name) {
        continue;
      }
      fn = (method[1] || cls.prototype[name]);
      if (fn.length === length) {
        return fn;
      }
    }
    return null;
  }
  var _arraySlice = Array.prototype.slice;

  var plugin = $.extend(
    function(options) {
      var args = _arraySlice.call(arguments, 1);
      var method = _getApiMethod(Modal, options, args.length);
      var result;
      if (method) {
        result = method.apply(this.data('modal'), args);
        if (result !== undefined) {
          return result;
        }
      } else {
        this.each(function() {
          var $this = $(this);
          if (!$this.data('modal')) {
            $this.data('modal', new Modal(this, options));
          }
        });
      }
      return this;
    }, {
    overlay: {
      background: 'black',
      opacity: 0.5,
      showDuration: 200,
      hideDuration: 1
    },
    defaults: {
      hideDuration: 200,
      showDuration: 200 
    },
    _overlay: overlay,
    _Modal: Modal
  });
  
  var overlay = {
    $el: $('<div/>').css({
      position: 'fixed',
      zIndex: 10000,
      left: 0,
      top: 0,
      width: '100%',
      height: '100%'
    }).hide(),
    open: _once(function() {
      this.$el.appendTo('body');
    }, function(callback) {
      var opts = plugin.overlay;
      var $el = this.$el;
      $el.css('background', opts.background);
      $el.fadeTo(opts.showDuration, opts.opacity, callback);
    }),
    close: function(callback) {
      var opts = plugin.overlay;
      var $el = this.$el;
      $el.fadeOut(opts.hideDuration, callback);
    }
  };
  
  function Modal(content, options) {
    this._options = $.extend({}, options);
    this.$el = $('<div/>').css({
      position: 'fixed',
      zIndex: 11000,
      left: '50%',
      top: 0,
      marginLeft: 0
    }).hide();
    if (typeof content === 'string') {
      this.$el.text(content);
    } else {
      $(content).detach().appendTo(this.$el);
    }
  }
  
  Modal.api = [
    ['open'],
    ['close'],
    ['option', function(name) {
      return this.getOption(name);
    }],
    ['option', function(name, value) {
      this._options[name] = value;
      return value;
    }]
  ];
  
  $.extend(Modal.prototype, {
    getOption: function(name) {
      return this._options.hasOwnProperty(name)
        ? this._options[name]
        : plugin.defaults[name];
    },
    open: function() {
      var showDuration = this.getOption('showDuration');
      var $el = this.$el;
      overlay.open(function() {
        $el.appendTo('body').css({
          marginLeft: -($el.width() / 2) + 'px',
          top: (($(window).height() / 2) - ($el.height() / 2)) + 'px'
        }).fadeIn(showDuration);
      });
    },
    close: function() {
      var $el = this.$el;
      $el.fadeOut(this.getOption('hideDuration'), function() {
        $el.detach();
        overlay.close();
      });
    }
  });

  $.fn.modal = plugin;

})(jQuery);
