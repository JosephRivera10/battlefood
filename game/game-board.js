import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/iron-icons/iron-icons.js";
import "../src/game-icons.js";
import "../src/game-tile.js";

import { foodTiles, foods } from "../src/game-foods.js";

class GameBoard extends PolymerElement {
  static get template() {
    return html`
      <style>
        .food {
          display: block;
          position: absolute;
          --iron-icon-height: calc(var(--game-tile-size) * 8);
          --iron-icon-width: calc(var(--game-tile-size) * 8);
        }

        .board {
          display: block;
          position: relative;
        }
      </style>

      <game-icons></game-icons>
      <div class="board" style="width:[[boardWidth]]px; height:[[boardHeight]]px;">

        <template is="dom-repeat" items="[[placements]]" as="placement">
          <iron-icon
            icon="food:[[placement.food]]"
            role="img"
            class="food"
            style="top: [[placement.top]]px; left: [[placement.left]]px;"
          ></iron-icon>
        </template>

        <template is="dom-repeat" items="[[board]]" as="tile">
          <game-tile 
            x="[[tile.x]]" 
            y="[[tile.y]]" 
            food="[[tile.food]]" 
          />
        </template>
      </div>
    `;
  }

  constructor() {
    super();

    // set game attributes

    // set the size of things
    this.boardSize = 20;
    this.tileSize = 37.5;
    this.boardWidth = this.boardSize * this.tileSize;
    this.boardHeight = this.boardSize * this.tileSize;

    // store where large food svgs are placed
    this.placements = [];

    // store hit information
    this.hits = {};

    // store the foods on the board
    this.foods = {};

    // update the cssvar "--game-tile-size"
    this.updateStyles({ "--game-tile-size": `${this.tileSize}px` });

    // set constructor variables

    // get the game recipe
    const recipe = Object.keys(foods)
      .sort((a, b) => (Math.random() > 0.5 ? -1 : 1))
      .splice(0, 5);

    recipe.forEach(food => {
      const tileCount = foodTiles[food].reduce(
        (total, row) => total + row.reduce((total, value) => total + value, 0),
        0
      );
      this.foods[food] = {
        ...foods[food],
        tileCount,
        tiles: []
      };
    });

    const maxPlacement = this.boardSize - 8;

    // how many foods fit
    let foodFitted = 0;

    // the test board
    let candidate = undefined;

    // build board
    while (foodFitted < recipe.length) {
      // set an object for the foods
      const foods = {};
      // make a blank "candidate" board
      candidate = [...Array(this.boardSize).keys()].map(y =>
        [...Array(this.boardSize).keys()].map(x => 0)
      );

      // loop through the foods needed
      recipe.forEach(key => {
        const tiles = foodTiles[key];

        // start scanning at x, y
        const x = Math.floor(Math.random() * maxPlacement);
        const y = Math.floor(Math.random() * maxPlacement);

        // go through all the possibilities
        place: {
          for (let dx = 0; dx < maxPlacement; dx++) {
            for (let dy = 0; dy < maxPlacement; dy++) {
              // see if we've gone past the end of the board or not
              const px = x + dx >= maxPlacement ? x + dx - maxPlacement : x + dx;
              const py = y + dy >= maxPlacement ? y + dy - maxPlacement : y + dy;
              // assume things are a fit until otherwise
              let fit = true;

              // check for fit
              test: {
                for (let tx = 0; tx < 8; tx++) {
                  for (let ty = 0; ty < 8; ty++) {
                    if (tiles[ty][tx] && candidate[py + ty][px + tx]) {
                      fit = false;
                      // not fix, break out of loop
                      break test;
                    }
                  }
                }
              }

              // if the piece foodFitted, then map the tiles
              if (fit) {
                foodFitted++;
                this.placements.push({
                  food: key,
                  left: px * this.tileSize,
                  top: py * this.tileSize
                });
                for (let tx = 0; tx < 8; tx++) {
                  for (let ty = 0; ty < 8; ty++) {
                    if (tiles[ty][tx]) {
                      candidate[py + ty][px + tx] = recipe.indexOf(key) + 1;
                    }
                  }
                }
                break place;
              }
            }
          }
        }
      });
      if (foodFitted < recipe.length) {
        this.placements = [];
        foodFitted = 0;
      }
    }

    // set global game board
    this.board = [...Array(this.boardSize).keys()].reduce(
      (board, y) => [
        ...board,
        ...[...Array(this.boardSize).keys()].reduce(
          (row, x) => [...row, { x: x, y: y, food: recipe[candidate[x][y] - 1] }],
          []
        )
      ],
      []
    );
  }

  ready() {
    super.ready();
    this.addEventListener("hit", e => {
      const tile = e.detail && e.detail.tile;
      if (tile) {
        const food = this.foods[tile.food];
        food.tiles.push(tile);
        if (food.tiles.length === food.tileCount) {
          food.tiles.forEach(tile => {
            tile.flip();
          });
        }
        console.log(food);
      }
    });
  }
}
customElements.define("game-board", GameBoard);
