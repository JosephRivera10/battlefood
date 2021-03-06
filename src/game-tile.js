import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/iron-icon/iron-icon.js";

// the individual clickable tiles for the game

class GameTile extends PolymerElement {
  static get properties() {
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

  static get template() {
    return html`
      <style>
        :host {
          display: block;
          position: absolute;
          width: var(--game-tile-size);
          height: var(--game-tile-size);
          --iron-icon-height: var(--game-tile-size);
          --iron-icon-width: var(--game-tile-size);
          cursor: pointer;
        }
        :host([state="flipped"]) {
          display: none;
        }
      </style>
      <iron-icon
        icon="game:[[icon]]"
        role="img"
        class="tile"
        style="top: calc([[x]] * var(--game-tile-size)); left: calc([[y]] * var(--game-tile-size));"
      ></iron-icon>
    `;
  }

  constructor() {
    super();
    // this.icon = "unflipped";
    this.addEventListener("click", () => this.click());
  }

  click() {
    if (this.food) {
      if (this.icon !== "unflipped") {
        return;
      }
      this.icon = "hit";
      this.state = "hit";
      this.dispatchEvent(
        new CustomEvent("hit", {
          bubbles: true,
          composed: true,
          detail: { tile: this }
        })
      );
      return;
    }

    this.dispatchEvent(
      new CustomEvent("nohit", {
        bubbles: true,
        composed: true,
        detail: { tile: this }
      })
    );
    this.state = "flipped";
  }

  flip() {
    this.state = "flipped";
  }
}

customElements.define("game-tile", GameTile);
