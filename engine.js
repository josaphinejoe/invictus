

var Engine = (function(global) {

  var doc = global.document,
    win = global.window,
    canvas = doc.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    lastTime;

  var life;
  var points;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  doc.body.appendChild(canvas);

  // Code to play the background music, uses Howler.js for playing sound
  var backMusic = new Howl({
    src: ['musics/headinthesand.ogg', 'musics/headinthesand.mp3'],
    autoplay: false,
    loop: true,
    volume: 0.5,
  });

  // This defines the sound played when collecting gems
  var collectibleMusic = new Howl({
    src: ['musics/FX216.mp3'],
    autoplay: false,
    loop: false,
    volume: 1,
  });

  // Start the background music
  backMusic.play();

  
  function main() {

    var now = Date.now(),
      dt = (now - lastTime) / 1000.0;



    update(dt);
    render();



    lastTime = now;


    win.requestAnimationFrame(main);
  }


  function init() {
    life = 5;
    points = 0;
    reset();
    lastTime = Date.now();
    main();
  }


  function update(dt) {
    updateEntities(dt);

    checkPoints();
  }


  function checkPoints() {

    // If player has reached the water than credit points and reset player
    if (player.y < 20) {
      points += 200;
      resetPlayer();
    }

    // Check all gems if player is within collision distance
    entireCollectibles.forEach(function(collectible, index, array) {
      if (collisionNum(collectible, player)) {
        // player is within collision distance of collectible
        console.log("Collected");
        collectibleMusic.play();
        points += collectible.point;

        // Player has collected this gem, so remove it from array
        array.splice(index, 1);
      }
    });
  }

  /* This is called by the update function and loops through all of the
   * objects within your allEnemies array as defined in app.js and calls
   * their update() methods. It will then call the update function for your
   * player object. These update methods should focus purely on updating
   * the data/properties related to the object. Do your drawing in your
   * render methods.
   */
  function updateEntities(dt) {

    player.update();
    entireCollectibles.forEach(function(collectible) {
      collectible.update(dt);
    });
  }

  function render() {
    /* This array holds the relative URL to the image used
     * for that particular row of the game level.
     */
    var rowImages = [
        'images/water-block.png', // Top row is water
        'images/stone-block.png', // Row 1 of 8 of stone
        'images/stone-block.png', // Row 2 of 8 of stone
        'images/stone-block.png', // Row 3 of 8 of stone
        'images/stone-block.png', // Row 4 of 8 of stone
        'images/stone-block.png', // Row 5 of 8 of stone
        'images/stone-block.png', // Row 6 of 8 of stone
        'images/stone-block.png', // Row 7 of 8 of stone
        'images/stone-block.png', // Row 8 of 8 of stone
        'images/grass-block.png', // Row 1 of 2 of grass
        'images/grass-block.png' // Row 2 of 2 of grass
      ],
      numRows = 11,
      numCols = numOfColumns,
      row, col;


    for (row = 0; row < numRows; row++) {
      for (col = 0; col < numCols; col++) {

        ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
      }
    }

    renderCollectibles();
    renderEntities();
    givenLives();
    renderPoints();

  }

//Function to render points scored by the player.
  function renderPoints() {
    var pointsSprite = "images/star-small.png";
    var x = 1100;
    var y = 70;
    ctx.drawImage(Resources.get(pointsSprite), x, y);
    ctx.font = "32px Comic Sans MS";
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#dbdbdbd";
    ctx.strokeText(points, 1140, 95);
    ctx.fillText(points, 1140, 95);
  }


// Function to render lives remaining of the player
  function givenLives() {
    var lifeSprite = "images/heart-small.png";
    var x = 1000;
    var y = 60;
    ctx.drawImage(Resources.get(lifeSprite), x, y);
    ctx.font = "32px Comic Sans MS";
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#dbdbdbd";
    ctx.strokeText(life, 1040, 92);
    ctx.fillText(life, 1040, 92);
  }

  function renderEntities() {


    player.render();
  }

// Function to render all the gems
  function renderCollectibles() {
    entireCollectibles.forEach(function(collectible) {
      collectible.render();
    });
  }

// Function to reset player position and collectibles, doesn't reset points scored.
  function resetPlayer() {
    player = new Player();
    resetCollectibles();
  }

// function to reset collectibles
  function resetCollectibles() {
    collectiblesNumber = Math.max(Math.floor(Math.random() * 10), 5);
    entireCollectibles = [];
    for (var i = 0; i < collectiblesNumber; i++) {
      var collectibleType = Math.floor((Math.random() * 3));
      entireCollectibles.push(new Collectible(collectibleType));
    }
  }

  /* This function resets the game. It resets player, collectibles and enemies.
   * Doesn't reset the points and lives remaining. It's only called once by the init() method.
   */
  function reset() {
    resetPlayer();

  }

  /* Go ahead and load all of the images we know we're going to need to
   * draw our game level. Then set init as the callback method, so that when
   * all of these images are properly loaded our game will start.
   */
  Resources.load([
    'images/stone-block.png',
    'images/water-block.png',
    'images/grass-block.png',
    'images/bug.png',
    'images/char-boy.png',
    'images/heart-small.png',
    'images/star-small.png',

  ]);
  Resources.onReady(init);

  /* Assign the canvas' context object to the global variable (the window
   * object when run in a browser) so that developers can use it more easily
   * from within their app.js files.
   */
  global.ctx = ctx;
})(this);
