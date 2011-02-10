(function() {
  var compiledCounter;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  window.LDB = {
    Views: {},
    ViewRenderers: {},
    _compiledHandlebars: {}
  };
  LDB.registerView = function(name, klass) {
    klass.prototype.view_path = name;
    return LDB.Views[name] = klass;
  };
  LDB.view = function(name) {
    return LDB.Views[name];
  };
  compiledCounter = -1;
  LDB.renderTemplate = function(templateString) {
    var i;
    i = compiledCounter++;
    return function(data, fallback) {
      var _base, _ref;
      (_ref = (_base = LDB._compiledHandlebars)[i]) != null ? _ref : _base[i] = Handlebars.compile(templateString);
      return LDB._compiledHandlebars[i](data, fallback);
    };
  };
  LDB.View = (function() {
    function View() {
      View.__super__.constructor.apply(this, arguments);
    }
    __extends(View, Backbone.View);
    View.prototype.renderable = function() {
      if (this.model != null) {
        return this.model.toJSON();
      } else {
        return {};
      }
    };
    View.prototype.render = function() {
      var cb, renderable, _i, _len, _ref;
      renderable = this.renderable();
      $(this.el).html(LDB.ViewRenderers[this.view_path](renderable));
      if (renderable._afterCallbacks != null) {
        _ref = renderable._afterCallbacks;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cb = _ref[_i];
          cb();
        }
      }
      return this;
    };
    return View;
  })();
  LDB.notify = function(textOrOptions) {
    var options;
    if (_.isString(textOrOptions)) {
      options = {
        timeout: 0,
        icon: 'ui-icon-info',
        message: textOrOptions
      };
    } else {
      options = textOrOptions;
    }
    return $.achtung(options);
  };
}).call(this);
