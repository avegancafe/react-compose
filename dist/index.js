'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function compose(componentOptions) {
  return function (_ref) {
    var children = _ref.children;

    var ComposedComponents = componentOptions.reduceRight(function (ComposedChildren, _ref2) {
      var ParentComponent = _ref2.component,
          props = _ref2.props;
      return function ComposedWrapper(intermediateProps) {
        return React.createElement(
          ParentComponent,
          { __composedArgs: intermediateProps.__composedArgs },
          function () {
            for (var _len = arguments.length, parentArgs = Array(_len), _key = 0; _key < _len; _key++) {
              parentArgs[_key] = arguments[_key];
            }

            return React.createElement(
              ComposedChildren,
              _extends({}, _extends({}, props, intermediateProps), {
                __composedArgs: [].concat(toConsumableArray(parentArgs || []), toConsumableArray(intermediateProps.__composedArgs || []))
              }),
              React.Children.map(intermediateProps.children, function (child) {
                return React.createElement(child.type, _extends({}, child.props, {
                  __composedArgs: parentArgs
                }));
              })
            );
          }
        );
      };
    }, function initial() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return children(args);
    });

    return React.createElement(ComposedComponents, null);
  };
}

module.exports = compose;
