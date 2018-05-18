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
          _extends({}, props, {
            __composedArgs: intermediateProps.__composedArgs
          }),
          function () {
            for (var _len = arguments.length, parentArgs = Array(_len), _key = 0; _key < _len; _key++) {
              parentArgs[_key] = arguments[_key];
            }

            return React.createElement(
              ComposedChildren,
              {
                __composedArgs: [].concat(toConsumableArray(parentArgs || []), toConsumableArray(intermediateProps.__composedArgs || []))
              },
              React.Children.map(intermediateProps.children, function (child) {
                return React.createElement(child.type, { __composedArgs: parentArgs });
              })
            );
          }
        );
      };
    }, function initial(_ref3) {
      var __composedArgs = _ref3.__composedArgs;

      return children([].concat(toConsumableArray(__composedArgs)));
    });

    return React.createElement(ComposedComponents, null);
  };
}

module.exports = compose;
