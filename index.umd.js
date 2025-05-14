(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.CursorComponents = {}, global.React));
})(this, (function (exports, React) { 'use strict';

  var Button = function (_a) {
      var children = _a.children, onClick = _a.onClick;
      return (React.createElement("button", { onClick: onClick }, children));
  };

  exports.Button = Button;

}));
//# sourceMappingURL=index.umd.js.map
