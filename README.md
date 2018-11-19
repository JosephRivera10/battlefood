# Welcome To Battlefood

Battlefood is a concept game to help understand Polymer 3 better. Feel free to clone it and work on adding features, optimizing the code, or just expanding the game. [Polymer 3](https://www.polymer-project.org/) and [lit-html](https://lit-html.polymer-project.org/) are new technologies and are under constant development. Some of the code in this project may not adhere to current best practices.

![alt text](https://github.com/straley/battlefood/blob/master/readme/gameplay.png?raw=true "Example Game")

You can preview the game at http://straley.net/battlefood.

This game is based on a slightly earlier version of the [PWA Starter Kit](https://pwa-starter-kit.polymer-project.org/). It also uses [lit-html](https://lit-html.polymer-project.org/). You should go through the Getting Started guides for both.

The current version of the game does not use any server-side operations -- so no storage of scores, no logging in, no sharing, etc. Also, it is not optimized for mobile and requires desktop screen resolution.

## Getting Started

In order to play with this code, start by cloning it to your local development environment:

```bash
$ git clone https://github.com/straley/battlefood.git
```

Then, change to the directory and build the node modules:

```bash
$ cd battlefood
$ npm install
```

If you haven't install the Polymer CLI tools yet, type:

```bash
$ npm install -g polymer-cli
```

Then, to start the game locally:

```bash
$ polymer serve
```

In your browser, go to http://localhost:8000/.

To build a release version, run:

```bash
$ npm run build
```

The code will then exist in the `docs` folder.

## File Layout

Except for `index.html`, all of the game logic is in the `src` folder -- and mostly in the `game-board.js` file. `game-foods.js` contains data on the parts used in the game. `game-icons.js` provides a set of icons to be used by `iron-icon` for the game. And, `game-tile.js` is the component used to display a single tile on the board.

The `docs` folder contains a build of the game used at the GitHub pages [http://straley.net/battlefood](http://straley.net/battlefood) page. The `readme` folder contains any assets used in this readme.

`node_modules` should exist locally in your development environment (after you're run `npm` and built the code). A `build` directory will exist briefly during the build process before the bundle is moved into the `docs` folder.

## Game Play

The gameplay is similar to Minesweeper or Battleship. You start out with a few coins and a blank board. Hiding behind the tiles on the board are food items. Each food item has a different shape, so it's important to pay attention to the shapes you're looking for. Some of the food items are those in your ingredients list -- some are not.

Click on the tiles on the board.

If the tile has nothing behind it, you'll lose 2 coins and the tile will flip revealing the blank background.

However, if there's an ingredient behind the tile, the tile will change to a serving dish with a red question mark. For every one of these you find, you'll get 1 coin.

Keep clicking until you uncover all of the ingrdients for your recipe. For each ingredient you uncover, you'll get a bonus based on the size of the food item. But, beware, uncovering a rogue ingredient will ruin your dish and you'll lose the game.

## Opportunities For Learning

Feel free to try one of the exercises below to learn more about Polymer by enhancing the game.

### Front-End Opportunities

1. The game looks horrible on mobile devices or smaller screens. Optimize the CSS with media queries. Also, add a nice title at the top of the screen, center the contents, and prevent scrolling.
2. Players like to see their names. Enhance the modal dialog to ask for the player's name. Then store that name and their scores using Local Storage. Display a high score modal when the game is not being played.
3. Make the game more interesting by adding some choices before the game starts. These should include choosing the board size, the maximum recipe size, the number of spoilers, etc.
4. If you've added more recipes or added the options above, then you may notice that the code can deadlock if it can't find a board configuration that will fit. Build in some protection against this. And, while you're at it, try adding some tests in [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/).
5. Add a timer to the game. Give them a set about of time to finish making the dish. And, increase the bonuses based upon how much time is on the close.
6. Spice things up with animations. Show the coins flying from the board each time they earn some. Show the cards flipping. Animate the modal dialog. Animate the foods in the recipe bar have been found.

### Back-End Opportunities

1. Have the game connect to Firebase (or some other online backend) and store the high scores there. Add a login so that users can return to their account.
2. Let players share their high scores and winning screen shots on their social media accounts.

### Advanced Back-End Opportunities

1. Make the game more secure by storing the map and board logic on the server. Be careful, people can inspect their DOM, so just hiding the ingredients behind the tiles isn't enough.
2. Let players pick an opponent and play against them side-by-side in realtime trying to make the recipe first.
