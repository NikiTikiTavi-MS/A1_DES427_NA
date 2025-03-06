let clickCount = 0;
var encounter = false;
let fishOn = 100;
let catchWindow = 500;
let shinyColor = 0;
let shinyOdds = 0;
var isShiny = false;
let fishBait = 0;
let randomBite = 0;
let state = "splashscreen";
let shinyCount = 0;

//preload images
function preload() {
  sprite129 = loadImage('/assets/Magikarp.png');
  sprite129S = loadImage('/assets/Magikarp_Shiny.png');
  sprite147 = loadImage('/assets/Dratini.png');
  sprite147S = loadImage('/assets/Dratini_Shiny.png');
  sprite072 = loadImage('/assets/Tentacool.png');
  sprite072S = loadImage('/assets/Tentacool_Shiny.png');
  oldRod = loadImage('/assets/Old_Rod.png');
  goodRod = loadImage('/assets/Good_Rod.png');
  superRod = loadImage('/assets/Super_Rod.png');
  lureBox = loadImage('/assets/Fishing_Box_Display.png');
  lureBoxR = loadImage('/assets/Fishing_Box_Right.png');
  lureBoxL = loadImage('/assets/Fishing_Box_Left.png');
  pondBG = loadImage('/assets/Pond_Background.png');
  textBox = loadImage('/assets/Text_Box.png');
  bobber = loadImage('/assets/Fishing_Bobber.png');
  splash = loadImage('/assets/Water_Splash.png');
  shinySparkle = loadImage('/assets/Gen_2_Shiny_Sparkles.gif');
} //close preload function

//create magikarp object
let magikarp = {
  display: function () {
    textAlign(CENTER);

    image(textBox, 50, 15, 300, 50);
    text("A wild Magikarp appeared!", 200, 50);

    //check for shiny
    if (isShiny === false) {
      image(sprite129, 100, 50);
    } else {
      image(sprite129S, 100, 50);
      image(shinySparkle, 100, 50);
    }
  },
}; //close magikarp object

//create dratini object
let dratini = {
  display: function () {
    textAlign(CENTER);

    image(textBox, 50, 15, 300, 50);
    text("A wild Dratini appeared!", 200, 50);

    //check for shiny
    if (isShiny === false) {
      image(sprite147, 100, 50);
    } else {
      image(sprite147S, 100, 50);
      image(shinySparkle, 100, 50);
    }
  },
}; //close dratini object

//create tentacool object
let tentacool = {
  display: function () {
    textAlign(CENTER);

    image(textBox, 50, 15, 300, 50);
    text("A wild Tentacool appeared!", 200, 50);

    //check for shiny
    if (isShiny === false) {
      image(sprite072, 100, 50);
    } else {
      image(sprite072S, 100, 50);
      image(shinySparkle, 100, 50);
    }
  },
}; // close tentacool object

//create fishing rod object
let fishingRod = {
  toggleR: 225,
  toggleL: 125,

  display: function () {
    fill(0);
    textSize(20);
    if (clickCount == 0) {
      if (keyIsDown(RIGHT_ARROW)) {
        this.toggleR = 240;
      } else {
        this.toggleR = 225;
      }
      if (keyIsDown(LEFT_ARROW)) {
        this.toggleL = 110;
      } else {
        this.toggleL = 125;
      }
    }
    image(lureBox, 175, 300);
    image(lureBoxR, this.toggleR, 300);
    image(lureBoxL, this.toggleL, 300);

    if (fishBait == 0) {
      image(oldRod, 175, 300);
      text("Old Rod", 200, 375);
    } else if (fishBait == 1) {
      image(goodRod, 175, 300);
      text("Good Rod", 200, 375);
    } else {
      image(superRod, 175, 300);
      text("Super Rod", 200, 375);
    }
  },
}; //close fishingRod object

//display debug/troubleshooting values
let debugScreen = {
  colorDebug: 255,
  toggleDebug: false,

  display: function () {
    if (this.toggleDebug === true) {
      //debug text
      fill(0);
      textSize(20);
      text("debug screen on", 200, 50);
      text(state, 200, 75);
      text(clickCount, 50, 50);
      text(catchWindow, 350, 50);
      text(fishOn, 50, 350);
      text(shinyOdds, 350, 350);
      text(fishBait, 200, 350);
    }
  },
}; //close debug object

//display start screen instructions
let instructionPage = {
  display: function () {
    image(textBox, 50, 120, 300, 50);
    textSize(20);
    text("Welcome to the Safari Zone!", 200, 150);
    image(textBox, 12.5, 170, 375, 75);
    textSize(15);
    text("You may fish for as long as you like!", 200, 200);
    text("If you're lucky, you might encounter something special!", 200, 225);
    image(textBox, 150, 300, 100, 50);
    text("OK", 200, 330);
  },
}; //close instructions object

//create splash screen
let splashScreen = {
  display: function () {
    background(100);
    image(pondBG, 0, 0);
    image(textBox, 25, 50, 350, 50);
    fill(0);
    text("Safari Zone Fishing", 200, 85);
    image(textBox, 75, 150, 250, 50);
    text("Catch and Release", 200, 183);
  },
}; //close splash screen object

//create start button
let startButton = {
  x: 200,
  y: 275,
  diameter: 100,
  radius: 50,
  display: function () {
    fill(50, 250, 50);
    circle(this.x, this.y, this.diameter);
    fill(0);
    textSize(20);
    text("Start", 200, 280);
  },
}; //close start button object

//create bobber object
let fishBobber = {
  x: 175,
  y: 175,

  display: function () {
    if (state === "fishing" && catchWindow < 150 && catchWindow > 100) {
      this.y = random(this.y - 3, this.y + 3);
    } else {
      this.y = 175;
    }
    image(bobber, this.x, this.y);
  },
}; //close bobber object


function setup() {
  createCanvas(400, 400);
  textAlign(CENTER);
} //close setup function

function draw() {
  background(220);

  image(pondBG, 0, 0);
  shinyFactor();

  //display splash screen
  if (state === "splashscreen") {
    splashScreen.display();
    startButton.display();
  } else if (state === "instructions") {
    instructionPage.display();
  } else {
    //display and run everything else after splash screen closes
    debugScreen.display();
    fishingRod.display();

    if (state === "fishing") {
      fishBobber.display();
    }

    // Game instructions display
    fill(0);

    // catch window countdown
    if (clickCount == 0) {
      catchWindow = 500;
      state = "start";
      image(textBox, 50, 225, 300, 50);
      textSize(20);
      text("Click to anywhere to cast a lure", 200, 255);
      image(textBox, 300, 350, 100, 50);
      textSize(10);
      text("< or > to switch rods", 350, 375);
    }

    if (clickCount == 1) {
      state = "fishing";
      //start internal countdown for waiting for fish bite
      catchWindow--;

      if (catchWindow > 150) {
        image(textBox, 125, 225, 150, 50);

        //display '...' until fish bites
        if (catchWindow < 450) {
          circle(180, 250, 5);
        }

        if (catchWindow < 400) {
          circle(200, 250, 5);
        }

        if (catchWindow < 350) {
          circle(220, 250, 5);
        }
      } else if (catchWindow > 100) {
        //display the moment of fish on
        image(lureBox, 150, 50, 100, 100);
        textSize(90);
        text("!!", 200, 130);
      } else if (catchWindow < 50) {
        state = "reel";
        clickCount = 2;
      }
    }

    //Wait for fish to bite
    if (clickCount == 2) {
      catchWindow = catchWindow;

      //missed catch window, too fast
      if (catchWindow > 150) {
        state = "reel";
        textSize(20);

        image(textBox, 100, 75, 200, 50);
        text("You reeled too fast!", 200, 110);

        image(textBox, 100, 225, 200, 50);
        text("Click to reset", 200, 255);
        image(splash, 150, 125);
      }

      //missed the catch window, too slow
      if (catchWindow < 100) {
        state = "reel";
        textSize(20);

        image(textBox, 90, 75, 220, 50);
        text("It got away...", 200, 110);

        image(textBox, 100, 225, 200, 50);
        text("Click to reset", 200, 255);
        image(splash, 150, 125);
      }

      //catching the fish
      if (catchWindow > 100 && catchWindow < 150) {
        encounter = true;
        state = "catch";
      }
    } else {
      encounter = false;
    }

    //brief pause before encounter and reset prompt
    if (encounter === true) {
      //start countdown for encounter duration
      fishOn--;

      if (fishOn > 0) {
        image(textBox, 100, 225, 200, 50);
        textSize(20);
        text("Oh, a bite!", 200, 255);
        image(splash, 150, 125);
      }

      if (fishOn < 0) {
        //determine encounter based on rod used
        if (fishBait == 0) {
          magikarp.display();
        }
        if (fishBait == 1) {
          tentacool.display();
        }
        if (fishBait == 2) {
          dratini.display();
        }
      }

      //stop loop and display try again prompt
      if (fishOn == -100) {
        state = "catch end";
        image(textBox, 100, 225, 200, 50);
        fill(0);
        text("Click to try again", 200, 255);
        noLoop();
      }
    } else {
      //reset encounter countdown
      fishOn = 100;
    }
  }
} //close draw function

function mousePressed() {
  if (state === "splashscreen") {
    if (
      dist(mouseX, mouseY, startButton.x, startButton.y) < startButton.radius
    ) {
      state = "instructions";
    }
  } else if (mouseX > 150 && mouseX < 250 && mouseY < 350 && mouseY > 300) {
    if (state === "instructions") {
      state = "start";
    }
  }

  //Start fishing
  else if (state !== "catch" && state !== "instructions" && state !== "splashscreen") {
    if (clickCount > 1) {
      clickCount = 0;
      loop();
    } else {
      clickCount = clickCount + 1;
    }
  }
} //close mousepressed function

function shinyFactor() {
  // generate random number for shiny chance
  if (encounter === false) {
    // shiny odds 1 in 10
    shinyOdds = int(random(0, 10));
    //reset shiny animation
    shinySparkle.setFrame(0);
    shinySparkle.play();
  } else {
    //toggle shiny sprite
    if (shinyOdds == 0) {
      isShiny = true;
    } else {
      isShiny = false;
    }
  }
} //close shinyfactor function

function keyPressed() {
  // toggle between different fishing rods for different encounters
  if (clickCount == 0) {
    if (keyCode === RIGHT_ARROW) {
      fishBait++;
      if (fishBait > 2) {
        fishBait = 0;
      }
    }

    if (keyCode === LEFT_ARROW) {
      fishBait--;
      if (fishBait < 0) {
        fishBait = 2;
      }
    }
  }

  //toggle display debug values with "Up arrow + D"
  if (keyIsDown(UP_ARROW) === true && key === "d") {
    if (debugScreen.toggleDebug === false) {
      debugScreen.toggleDebug = true;
    } else {
      debugScreen.toggleDebug = false;
    }
  }
} //close keypressed function
