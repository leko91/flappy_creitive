var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
  window.setTimeout(callback, 1000/60);
};

var worldWidth = 600;
var worldHeight = 400;

var canvas = document.createElement('canvas');
canvas.width = worldWidth;
canvas.height = worldHeight;
var context = canvas.getContext('2d');

var pipes = [];
var start = null;
var progress = 0;
var pipeCounter = 0;
var hasCrashed = false;

var SPEED = 2.4;

var GRAVITY = 0.75;
var FALL_SPEED = 0;

var GAP = 110;

var jumpSound = 0;
var mute = true;

var randomRGBColor1 = "rgb(" + Math.round(Math.random() * 256) + ", " + Math.round(Math.random() * 256) + ", " + Math.round(Math.random() * 256) + ")";
var randomRGBColor2 = "rgb(" + Math.round(Math.random() * 256) + ", " + Math.round(Math.random() * 256) + ", " + Math.round(Math.random() * 256) + ")";
var randomRGBColor3 = "rgb(" + Math.round(Math.random() * 256) + ", " + Math.round(Math.random() * 256) + ", " + Math.round(Math.random() * 256) + ")";

var score = 0;
var realScore;

var stop = false;

var scoreArray = [
  'pittiful',
  'solid',
  'phenomenal'
];

var scoreText;

var reset = function () {
  pipes = [];
  start = null;
  progress = 0;
  pipeCounter = 0;
  hasCrashed = false;

  jumpSound = 0;

  score = 0;
  realScore = 0;
  document.getElementsByClassName('js-score')[0].innerHTML = 0;

  stop = false;

  birdie.x = 60;
  birdie.y = worldHeight / 2 - birdie.height;

  document.getElementsByClassName('js-ripScreen')[0].classList.add('is-hidden');

  animate(step);
};

var update = function() {
  for (var i = 0; i < pipes.length; i++) {
    if (birdie.crash(pipes[i])) {
      realScore = Math.floor(score / 2);

      document.getElementsByClassName('js-ripScreen')[0].classList.remove('is-hidden'); 

      if (realScore < 5) {
        scoreText = scoreArray[0] + " " + realScore;
      } else if (realScore >= 15) {
        scoreText = scoreArray[2] + " " + realScore;
      } else {
        scoreText = scoreArray[1] + " " + realScore;
      }

      document.getElementsByClassName('js-ripScreenScore')[0].innerText = 'Your score was a ' + scoreText;

      stop = true;

      return;
    }

    pipes[i].x -= SPEED;

    if (birdie.score(pipes[i])) {
      realScore = Math.floor(score / 2);

      document.getElementsByClassName('js-score')[0].innerHTML = realScore;
    }
  }

  birdie.update();
  worldie.update();
};

var render = function() {
  context.fillStyle = randomRGBColor1;
  context.fillRect(0, 0, worldWidth, worldHeight);
  birdie.render();

  for (var i = 0; i < pipes.length; i++) {
    pipes[i].render();
  }
};

var step = function(timestamp) {
  update();
  render();

  progress++;

  if (!stop) {
    animate(step);
  }
};

var Bird = function (x, y, width, height) {
  this.x = x;
  this.y = worldHeight / 2 - height;
  this.width = width;
  this.height = height;
};

Bird.prototype.render = function () {
  var image = document.getElementsByClassName('js-image')[0];

  context.rect(this.x, this.y, this.width, this.height);
  context.drawImage(image, this.x, this.y);
};

Bird.prototype.update = function () {
  FALL_SPEED += GRAVITY;
  FALL_SPEED *= 0.9;
  this.y += FALL_SPEED;
};

Bird.prototype.jump = function (jumpAmmount) {
  FALL_SPEED += jumpAmmount;

  if (this.y < -60) {
    this.y = -60;
  }
};

Bird.prototype.hitBottom = function () {
  if (this.y > worldHeight - this.height) {
    return true;
  }
};

Bird.prototype.crash = function (pipe) {
  var birdLeft = this.x;
  var birdRight = this.x + this.width;
  var birdTop = this.y;
  var birdBottom = this.y + this.height;

  var pipeLeft = pipe.x;
  var pipeRight = pipe.x + pipe.width;
  var pipeTop = pipe.y;
  var pipeBottom = pipe.y + pipe.height;
 
  if ((birdBottom - 5 < pipeTop) || (birdTop + 5 > pipeBottom) || (birdRight - 5 < pipeLeft) || (birdLeft + 5 > pipeRight)) {
    hasCrashed = false;
  } else {
    hasCrashed = true;
  }

  if (this.hitBottom()) {
    hasCrashed = true;
  }

  return hasCrashed;
};

Bird.prototype.score = function (pipe) {
  var birdLeft = this.x;
  var pipeLeft = pipe.x;

  if (Math.round(pipeLeft) === birdLeft - Math.round(birdie.width / 4)) {
    score++;

    return true;
  }

  return false;
};

var World = function (gravity) {
  this.gravity = gravity;
};

World.prototype.update = function () {
  if (progress % Math.round(175 * 1 / SPEED) === 0) {
    this.createPipe();
  }
};

World.prototype.createPipe = function () {
  topPipeHeight = Math.random() * (worldHeight - GAP) + 10;

  pipes.push(new Pipe(worldWidth + 40, -60, 40, topPipeHeight + 60));
  pipes.push(new Pipe(worldWidth + 40, topPipeHeight + GAP, 40, worldHeight - topPipeHeight - GAP));
};

var Pipe = function (x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
};

Pipe.prototype.render = function () {
  context.beginPath();
  context.fillStyle = randomRGBColor3;
  context.fillRect(this.x, this.y, this.width, this.height);
  context.fill();
};

var birdie = new Bird(60, 10, 30, 30);
var worldie = new World(0.3);

$(window).on('keypress', function (event) {
  var key = event.which || event.keyCode || 0;

  if (key === 32 && !hasCrashed) {
    birdie.jump(-15);

    document.getElementsByClassName('js-help')[0].classList.add('is-hidden');

    if (!mute) {
      document.getElementsByClassName('js-jumpSound')[jumpSound].play();
    }

    jumpSound++;

    if (jumpSound === 4) {
      jumpSound = 0;
    }
  }
});

$(window).on('touchstart', function (event) {
  if (!hasCrashed) {
    birdie.jump(-15);

    document.getElementsByClassName('js-help')[0].classList.add('is-hidden');

    if (!mute) {
      document.getElementsByClassName('js-jumpSound')[jumpSound].play();
    }

    jumpSound++;

    if (jumpSound === 4) {
      jumpSound = 0;
    }
  }
});

$(window).on('keydown', function (event) {
  var key = event.which || event.keyCode || 0;

  if (key === 82 && hasCrashed) {
    reset();
  }
});

document.getElementsByClassName('js-mute')[0].addEventListener('click', function () {
  if (!mute) {
    this.innerHTML = 'unmute <i class="fa fa-volume-off"></i>';

    mute = true;
  } else {
    this.innerHTML = 'mute <i class="fa fa-volume-up"></i>';

    mute = false;
  }
});

var displayScore = function () {
  document.getElementsByClassName('js-ripScreenScore')[0].append(score);
};

document.getElementsByClassName('js-tryAgain')[0].addEventListener('click', function () {
  reset();
});

document.body.appendChild(canvas);
animate(step);
