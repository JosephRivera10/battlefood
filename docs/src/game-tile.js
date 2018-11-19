define(["../node_modules/@polymer/polymer/polymer-element.js", "../node_modules/@polymer/iron-icon/iron-icon.js"], function (_polymerElement, _ironIcon) {
  "use strict";

  function _templateObject_d7745e40ec1b11e88b167d747c0bbd28() {
    var data = babelHelpers.taggedTemplateLiteral(["\n      <style>\n        :host {\n          display: block;\n          position: absolute;\n          width: var(--game-tile-size);\n          height: var(--game-tile-size);\n          --iron-icon-height: var(--game-tile-size);\n          --iron-icon-width: var(--game-tile-size);\n          cursor: pointer;\n        }\n        :host([state=\"flipped\"]) {\n          display: none;\n        }\n      </style>\n      <iron-icon\n        icon=\"game:[[icon]]\"\n        role=\"img\"\n        class=\"tile\"\n        style=\"top: calc([[x]] * var(--game-tile-size)); left: calc([[y]] * var(--game-tile-size));\"\n      ></iron-icon>\n    "]);

    _templateObject_d7745e40ec1b11e88b167d747c0bbd28 = function _templateObject_d7745e40ec1b11e88b167d747c0bbd28() {
      return data;
    };

    return data;
  }

  // the individual clickable tiles for the game
  var GameTile =
  /*#__PURE__*/
  function (_PolymerElement) {
    babelHelpers.inherits(GameTile, _PolymerElement);
    babelHelpers.createClass(GameTile, null, [{
      key: "properties",
      get: function get() {
        return {
          board: Object,
          x: Number,
          y: Number,
          state: {
            type: String,
            reflectToAttribute: true
          },
          icon: String,
          food: String,
          onhit: Function
        };
      }
    }, {
      key: "template",
      get: function get() {
        return (0, _polymerElement.html)(_templateObject_d7745e40ec1b11e88b167d747c0bbd28());
      }
    }]);

    function GameTile() {
      var _this;

      babelHelpers.classCallCheck(this, GameTile);
      _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(GameTile).call(this)); // this.icon = "unflipped";

      _this.addEventListener("click", function () {
        return _this.click();
      });

      return _this;
    }

    babelHelpers.createClass(GameTile, [{
      key: "click",
      value: function click() {
        if (this.food) {
          if (this.icon !== "unflipped") {
            return;
          }

          this.icon = "hit";
          this.state = "hit";
          this.dispatchEvent(new CustomEvent("hit", {
            bubbles: true,
            composed: true,
            detail: {
              tile: this
            }
          }));
          return;
        }

        this.dispatchEvent(new CustomEvent("nohit", {
          bubbles: true,
          composed: true,
          detail: {
            tile: this
          }
        }));
        this.state = "flipped";
      }
    }, {
      key: "flip",
      value: function flip() {
        this.state = "flipped";
      }
    }]);
    return GameTile;
  }(_polymerElement.PolymerElement);

  customElements.define("game-tile", GameTile);
});