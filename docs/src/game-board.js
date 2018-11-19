define(["../node_modules/@polymer/polymer/polymer-element.js", "../node_modules/@polymer/iron-icons/iron-icons.js", "./game-icons.js", "./game-tile.js", "./game-foods.js"], function (_polymerElement, _ironIcons, _gameIcons, _gameTile, _gameFoods) {
  "use strict";

  function _templateObject_28d364a0ebc411e8b9362987a151f41b() {
    var data = babelHelpers.taggedTemplateLiteral(["\n      <style>\n        #game {\n          display: block;\n          width: 100%;\n          position: relative;\n        }\n\n        .food {\n          display: block;\n          position: absolute;\n          --iron-icon-height: calc(var(--game-tile-size) * 8);\n          --iron-icon-width: calc(var(--game-tile-size) * 8);\n        }\n\n        #sidebar {\n          display: inline-block;\n          position: relative;\n          width: 140px;\n          vertical-align: top;\n        }\n\n        .panel {\n          width: 100%;\n          text-align: center;\n          background-color: #f8f8f8;\n          border-radius: 5px;\n          padding: 0 0 10px 0;\n          margin: 0 0 5px 0;\n        }\n\n        .header {\n          display: inline-block;\n          width: 100%;\n          height: 40px;\n          margin: 5px 0 5px 0;\n        }\n\n        .header h2 {\n          font-family: Arial, Helvetica, sans-serif;\n          font-size: 14px;\n          line-height: 16px;\n          margin: 0;\n          padding: 0;\n        }\n\n        .header h3 {\n          font-family: Arial, Helvetica, sans-serif;\n          font-size: 12px;\n          line-height: 14px;\n          margin: 0;\n          padding: 0;\n        }\n\n        .ingredient {\n          margin-left: 40px;\n          display: block;\n          position: relative;\n          --iron-icon-height: 60px;\n          --iron-icon-width: 60px;\n        }\n\n        .coins {\n          margin-left: 50px;\n          display: block;\n          position: relative;\n          --iron-icon-height: 40px;\n          --iron-icon-width: 40px;\n        }\n\n        .board {\n          display: inline-block;\n          position: relative;\n        }\n\n        #modal {\n          position: fixed;\n          z-index: 1;\n          left: 0;\n          top: 0;\n          width: 100%; \n          height: 100%;\n          overflow: auto;\n          background-color: rgb(0,0,0); \n          background-color: rgba(0,0,0,0.4); \n        }\n\n        #modal .content {\n          border-radius: 5px;\n          background-color: #fefefe;\n          margin: 15% auto;\n          padding: 20px;\n          border: 1px solid #888;\n          width: 300px; \n          text-align: center;\n        }\n\n        #modal .content iron-icon {\n          display: inline-block;\n          position: relative;\n          --iron-icon-height: 50px;\n          --iron-icon-width: 50px;\n          vertical-align: middle;\n        }\n\n        #modal .content div {\n          font-family: Arial, Helvetica, sans-serif;\n          display: inline-block;\n          position: relative;\n          width: 220px;\n          vertical-align: middle;\n          margin: 0 0 0 20px;\n          text-align: left;\n          font-size: 18px;\n        }\n\n        #modal .content button {\n          font-family: Arial, Helvetica, sans-serif;\n          border-radius: 5px;\n          background-color: #f4df89;\n          border: 0;\n          shadow: 0;\n          font-size: 16px;\n          margin: 10px 0 5px 0;\n          padding: 10px;\n          outline: 0;\n          cursor: pointer;\n        }\n\n        #modal .content button:hover {\n          background-color: #f8efb0;\n        }\n\n\n      </style>\n\n      <game-icons></game-icons>\n      <div id=\"game\">\n        <div class=\"board\" style=\"width:[[boardWidth]]px; height:[[boardHeight]]px;\">\n\n          <template is=\"dom-repeat\" items=\"[[placements]]\" as=\"placement\">\n            <iron-icon\n              icon=\"food:[[placement.food]]\"\n              role=\"img\"\n              class=\"food\"\n              style=\"top: [[placement.top]]px; left: [[placement.left]]px;\"\n            ></iron-icon>\n          </template>\n\n          <template is=\"dom-repeat\" items=\"[[board]]\" as=\"tile\">\n            <game-tile \n              x=\"[[tile.x]]\" \n              y=\"[[tile.y]]\" \n              food=\"[[tile.food]]\" \n              state=\"[[tile.state]]\"\n              icon=\"[[tile.icon]]\"\n            />\n          </template>\n\n        </div>\n        <div id=\"sidebar\">\n          <div class=\"panel\">\n            <div class=\"header\">\n              <iron-icon\n                  icon=\"game:coins\"\n                  role=\"img\"\n                  class=\"coins\"\n                ></iron-icon>            \n              \n              <h3>[[coins]]</h3>\n            </div>\n          </div>\n          <div class=\"panel\">\n            <div class=\"header\">\n              <h2>Ingredients</h2>\n              <h3>[[recipe.name]]</h3>\n            </div>\n            <template is=\"dom-repeat\" items=\"[[recipe.ingredients]]\" as=\"ingredient\">\n              <iron-icon\n                icon=\"food:[[ingredient]]\"\n                role=\"img\"\n                class=\"ingredient\"\n              ></iron-icon>            \n            </template>\n          </div>\n        </div>\n      </div>\n      <div id=\"modal\" hidden$=\"[[!modalVisible]]\">\n        <div class=\"content\">\n          <iron-icon\n            icon=\"[[modalIcon]]\"\n            role=\"img\"\n            class=\"modal-icon\"\n          ></iron-icon>            \n          <div>[[modalMessage]]</div>\n          <button id=\"modal-button\" type=\"button\" on-click=\"handleModalClick\">[[modalButton]]</button>\n        </div>\n      </div>\n    "]);

    _templateObject_28d364a0ebc411e8b9362987a151f41b = function _templateObject_28d364a0ebc411e8b9362987a151f41b() {
      return data;
    };

    return data;
  }

  var GameBoard =
  /*#__PURE__*/
  function (_PolymerElement) {
    babelHelpers.inherits(GameBoard, _PolymerElement);
    babelHelpers.createClass(GameBoard, null, [{
      key: "properties",
      get: function get() {
        return {
          boardSize: Number,
          tileSize: Number,
          boardWidth: Number,
          boardHeight: Number,
          placements: Object,
          placed: Object,
          foods: Object,
          found: Number,
          recipe: Object,
          coins: Number,
          modalIcon: String,
          modalMessage: String,
          modalButton: String,
          modalVisible: Boolean,
          modalClick: Function
        };
      }
    }, {
      key: "template",
      get: function get() {
        return (0, _polymerElement.html)(_templateObject_28d364a0ebc411e8b9362987a151f41b());
      }
    }]);

    function GameBoard() {
      var _this;

      babelHelpers.classCallCheck(this, GameBoard);
      _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(GameBoard).call(this)); // set game attributes
      // set the size of things

      _this.boardSize = 20;
      _this.tileSize = 32;
      _this.boardWidth = _this.boardSize * _this.tileSize;
      _this.boardHeight = _this.boardSize * _this.tileSize;
      _this.numberOfFoodsToPlace = 8; // update the cssvar "--game-tile-size"

      _this.updateStyles({
        "--game-tile-size": "".concat(_this.tileSize, "px")
      });

      _this.updateStyles({
        "--game-board-size": _this.boardSize
      }); // play game


      _this.resetGame();

      return _this;
    }

    babelHelpers.createClass(GameBoard, [{
      key: "resetGame",
      value: function resetGame() {
        var _this2 = this;

        this.found = 0;
        this.coins = 20;
        this.gameState = "initializing";
        this.placed = [];
        this.foodsPlaced = [];
        this.recipe = "";
        this.spoilers = [];
        this.pickRecipe();
        this.randomizeBoard();
        this.showModal("game:coins", "Here's ".concat(this.coins, " Coins To Start Your ").concat(this.recipe.name), "I'm Ready!", function () {
          _this2.gameState = "playing";
        });
      }
    }, {
      key: "pickRecipe",
      value: function pickRecipe() {
        var _this3 = this;

        // store where large food svgs are placed
        this.placements = []; // store the foods on the board

        this.foodsPlaced = {}; // get the game recipe

        this.recipe = _gameFoods.recipes[Math.floor(Math.random() * _gameFoods.recipes.length)]; // add some ingredients that are not needed (up to numberOfFoodsToPlace)

        this.spoilers = Object.keys(_gameFoods.foods).filter(function (food) {
          return !_this3.recipe.ingredients.includes(food);
        }).sort(function (a, b) {
          return Math.random() > 0.5 ? -1 : 1;
        }).splice(0, this.numberOfFoodsToPlace - this.recipe.ingredients.length); // and put all this in a placed array

        this.placed = babelHelpers.toConsumableArray(this.recipe.ingredients).concat(babelHelpers.toConsumableArray(this.spoilers));
        this.placed.forEach(function (food) {
          var tileCount = _gameFoods.foodTiles[food].reduce(function (total, row) {
            return total + row.reduce(function (total, value) {
              return total + value;
            }, 0);
          }, 0);

          _this3.foodsPlaced[food] = babelHelpers.objectSpread({}, _gameFoods.foods[food], {
            tileCount: tileCount,
            tiles: []
          });
        });
      }
    }, {
      key: "randomizeBoard",
      value: function randomizeBoard() {
        var _this4 = this;

        // how many foods have been fitted to the board
        var foodFitted = 0; // the test board

        var candidate; // build board

        while (foodFitted < this.placed.length) {
          // make a blank "candidate" board
          candidate = babelHelpers.toConsumableArray(Array(this.boardSize).keys()).map(function (y) {
            return babelHelpers.toConsumableArray(Array(_this4.boardSize).keys()).map(function (x) {
              return "";
            });
          }); // loop through the foods needed

          this.placed.forEach(function (key) {
            var tiles = _gameFoods.foodTiles[key]; // start scanning at x, y

            var x = Math.floor(Math.random() * (_this4.boardSize - 8));
            var y = Math.floor(Math.random() * (_this4.boardSize - 8)); // go through all the possibilities

            place: {
              for (var dx = 0; dx < _this4.boardSize - 8; dx++) {
                for (var dy = 0; dy < _this4.boardSize - 8; dy++) {
                  // see if we've gone past the end of the board or not
                  var px = x + dx >= _this4.boardSize - 8 ? x + dx - (_this4.boardSize - 8) : x + dx;
                  var py = y + dy >= _this4.boardSize - 8 ? y + dy - (_this4.boardSize - 8) : y + dy; // assume things are a fit until otherwise

                  var fit = true; // check for fit

                  test: {
                    for (var tx = 0; tx < 8; tx++) {
                      for (var ty = 0; ty < 8; ty++) {
                        if (tiles[ty][tx] && candidate[py + ty][px + tx] !== "") {
                          fit = false; // not fix, break out of loop

                          break test;
                        }
                      }
                    }
                  } // if the piece foodFitted, then map the tiles


                  if (fit) {
                    foodFitted++;

                    _this4.placements.push({
                      food: key,
                      left: px * _this4.tileSize,
                      top: py * _this4.tileSize
                    });

                    for (var _tx = 0; _tx < 8; _tx++) {
                      for (var _ty = 0; _ty < 8; _ty++) {
                        if (tiles[_ty][_tx]) {
                          candidate[py + _ty][px + _tx] = key;
                        }
                      }
                    }

                    break place;
                  }
                }
              }
            }
          });

          if (foodFitted < this.placed.length) {
            this.placements = [];
            foodFitted = 0;
          }
        } // set global game board


        this.board = babelHelpers.toConsumableArray(Array(this.boardSize).keys()).reduce(function (board, y) {
          return babelHelpers.toConsumableArray(board).concat(babelHelpers.toConsumableArray(babelHelpers.toConsumableArray(Array(_this4.boardSize).keys()).reduce(function (row, x) {
            return babelHelpers.toConsumableArray(row).concat([{
              x: x,
              y: y,
              food: candidate[x][y],
              state: "unflipped",
              icon: "unflipped"
            }]);
          }, [])));
        }, []);
      }
    }, {
      key: "tileHit",
      value: function tileHit(e) {
        var tile = e.detail && e.detail.tile;

        if (tile) {
          this.coins += 1;
          var food = this.foodsPlaced[tile.food];
          food.tiles.push(tile);

          if (food.tiles.length === food.tileCount) {
            food.tiles.forEach(function (tile) {
              tile.flip();
            });

            if (!this.recipe.ingredients.includes(tile.food)) {
              this.gameState = "lose";
              this.gameLoseReason = "".concat(_gameFoods.foods[tile.food].name, " is not in your recipe.");
              this.coins = 0;
              this.nextTurn();
              return;
            }

            this.found++;
            this.coins += food.tileCount;

            if (this.found === this.recipe.ingredients.length) {
              this.gameState = "win";
              this.nextTurn();
              return;
            }

            var numLeft = this.recipe.ingredients.length - this.found;
            this.showModal("food:".concat(tile.food), "You found ".concat(_gameFoods.foods[tile.food].name, "!  Just ").concat(numLeft, " ").concat(numLeft > 1 ? "ingredients" : "ingredient", " left."), "Yay!");
          }
        }

        this.nextTurn();
      }
    }, {
      key: "tileNoHit",
      value: function tileNoHit(e) {
        this.coins -= 2;

        if (this.coins <= 0) {
          this.gameState = "lose";
          this.gameLoseReason = "You've run out of money looking for ingredients.";
          this.coins = 0;
          this.nextTurn();
          return;
        }

        if (this.coins > 0 && this.coins < 3) {
          this.showModal("game:coins", "Warning You're Almost Out Of Money", "Got It!");
        }

        if (this.coins > 4 && this.coins < 7) {
          this.showModal("game:coins", "Warning You're Running Low On Money", "Got It!");
        }

        this.nextTurn();
      }
    }, {
      key: "nextTurn",
      value: function nextTurn() {
        var _this5 = this;

        if (this.gameState === "lose") {
          this.showModal("game:lose", this.gameLoseReason, "Play Again?", function () {
            _this5.resetGame();
          });
          return;
        }

        if (this.gameState === "win") {
          this.showModal("game:coins", "Congratulations!  You Won with ".concat(this.coins, " coins!"), "Play Again?", function () {
            _this5.resetGame();
          });
          return;
        }
      }
    }, {
      key: "showModal",
      value: function showModal(icon, message, button, onclose) {
        this.modalIcon = icon;
        this.modalMessage = message;
        this.modalButton = button;
        this.modalClick = onclose;
        this.modalVisible = true;
      }
    }, {
      key: "handleModalClick",
      value: function handleModalClick(e) {
        if (typeof this.modalClick === "function") {
          this.modalClick();
        }

        this.modalVisible = false;
      }
    }, {
      key: "ready",
      value: function ready() {
        babelHelpers.get(babelHelpers.getPrototypeOf(GameBoard.prototype), "ready", this).call(this);
        this.addEventListener("hit", this.tileHit);
        this.addEventListener("nohit", this.tileNoHit);
      }
    }]);
    return GameBoard;
  }(_polymerElement.PolymerElement);

  customElements.define("game-board", GameBoard);
});