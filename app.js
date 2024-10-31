const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  antialias: true,
  transparent: false,
  resolution: 1,
});

document.body.appendChild(app.view);

// Load the background image
const backgroundTexture = PIXI.Texture.from("./images/startGameBg.png");


const background = new PIXI.Sprite(backgroundTexture);
background.width = app.screen.width;
background.height = app.screen.height;
app.stage.addChild(background);


const displacementTexture = PIXI.Texture.from("./images/displacement-map.jpg");


const displacementSprite = new PIXI.Sprite(displacementTexture);
const displacementFilter = new PIXI.filters.DisplacementFilter(
  displacementSprite
);
background.addChild(displacementSprite);
background.filters = [displacementFilter];

displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
displacementSprite.scale.set(0.1);

app.ticker.add(function () {
  displacementSprite.x++;
});


const title = PIXI.Texture.from("./images/BLACKJACK.png");
const BJTitle = new PIXI.Sprite(title);

BJTitle.x = 300;
BJTitle.y = 100;

app.stage.addChild(BJTitle);

const sub = PIXI.Texture.from("./images/Summer Edition.png");
const subTitle = new PIXI.Sprite(sub);

subTitle.x = 550;
subTitle.y = 240;

app.stage.addChild(subTitle);

const centerX = app.screen.width / 2;
const centerY = app.screen.height / 2;

const buttonContainer = new PIXI.Container();
buttonContainer.eventMode = "dynamic";
buttonContainer.buttonMode = true;

const buttonBackground = new PIXI.Graphics();
buttonBackground.beginFill(0xff6060); 
buttonBackground.drawRoundedRect(0, 0, 294, 83, 59); 
buttonBackground.endFill();

buttonContainer.addChild(buttonBackground);

buttonContainer.position.set(centerX - buttonContainer.width / 2, 450);

const buttonSound = new Howl({
  src: ['./sounds/ClickBtn.mp3'],
  preload: true,
  volume: 2.0, 
});

const playButton = new PIXI.Text("Play Game", {
  fill: 0xffffff,
  fontFamily: "Slackey",
  fontSize: 30,
});

playButton.anchor.set(0.5); // Center the text within the button
playButton.position.set(
  buttonBackground.width / 2,
  buttonBackground.height / 2
);
playButton.eventMode = "dynamic";
playButton.buttonMode = true;
buttonContainer.on("pointerover", () => {
  app.renderer.view.style.cursor = "pointer";
});
buttonContainer.on("pointerout", () => {
  app.renderer.view.style.cursor = "auto";
});

buttonContainer.on("pointerdown", () => {
  buttonSound.play(),
  startGame()
});
buttonContainer.addChild(playButton);

app.stage.addChild(buttonContainer);


const sound = new Howl({
  src: ["./sounds/kirby.mp3"],
  volume: 1.0,
  loop: true,
})

function decreaseVolume() {
  sound.volume(sound.volume() - 0.9); 
}

sound.play()


function startGame() {

  app.stage.removeChild(playButton);
  app.stage.removeChild(buttonContainer);


  app.stage.removeChild(background);

  app.stage.removeChild(BJTitle);

  decreaseVolume()

  initializeNextPage();
}

let betsTitle;
let purchaseAmount = 0;
let totalMoney = 1000;

function createChip(texture, x, y) {
  const chip = new PIXI.Sprite(texture);
  chip.x = x;
  chip.y = y;
  chip.eventMode = "dynamic";
  chip.buttonMode = true;
  return chip;
}

const chip10Texture = PIXI.Texture.from("./images/chip10.png");
const chip100Texture = PIXI.Texture.from("./images/chip100.png");
const chip500Texture = PIXI.Texture.from("./images/chip500.png");

const chip10 = createChip(chip10Texture, 100, 600);
const chip100 = createChip(chip100Texture, 250, 600);
const chip500 = createChip(chip500Texture, 400, 600);

let purchaseText = new PIXI.Text(`Purchase: ${purchaseAmount}$`, {
  fill: 0xffffff,
  fontSize: 24,
  fontFamily: "Slackey",
});

let totalMoneyText = new PIXI.Text(`Total Money: ${totalMoney}$`, {
  fill: 0xffffff,
  fontSize: 24,
  fontFamily: "Slackey",
});

const dealBtnCtn = new PIXI.Container()
const dealBg = new PIXI.Graphics()

dealBtnCtn.eventMode = 'dynamic';
dealBtnCtn.buttonMode = true;

dealBg.beginFill(0xff6060); 
dealBg.drawRoundedRect(0, 0, 107, 61, 59); 
dealBg.endFill();

dealBtnCtn.addChild(dealBg)
dealBtnCtn.position.set(377, 279)
// Add Hit and Stand buttons
const dealButton = new PIXI.Text('Deal', { fill: 0xffffff, fontFamily: "Slackey", fontSize: 24 });
dealButton.anchor.set(0.5)

dealButton.position.set(
  dealBg.width / 2,
  dealBg.height / 2
)


function initializeNextPage() {
  decreaseVolume()


  const additionalSprite = new PIXI.Sprite(
    PIXI.Texture.from("./images/startGameBg.png")
  );
  additionalSprite.width = app.screen.width;
  additionalSprite.height = app.screen.height;
  app.stage.addChild(additionalSprite);

  const bgLayer = new PIXI.Sprite(
    PIXI.Texture.from("./images/bgOpacityLayer.png")
  );

  bgLayer.width = app.screen.width;
  bgLayer.height = app.screen.height;

  app.stage.addChild(bgLayer);

  const placeBets = PIXI.Texture.from("./images/Placeyourbets.png");
  betsTitle = new PIXI.Sprite(placeBets);

  betsTitle.x = 100;
  betsTitle.y = 50;

  app.stage.addChild(betsTitle);

 
dealButton.eventMode = "dynamic"
dealButton.buttonMode = true

dealBtnCtn.on("pointerdown", () => {
  buttonSound.play(),
  transitionToGame()
})
dealBtnCtn.addChild(dealButton)


app.stage.addChild(dealBtnCtn);

  purchaseText.x = 100;
  purchaseText.y = 300;
  totalMoneyText.x = 650;
  totalMoneyText.y = 680;

  chip10.eventMode = "dynamic";

  chip10.on("pointerdown", () => {
    purchaseAmount += 10;
    totalMoney -= 10;
    updateText();
  });

  chip100.on("pointerdown", () => {
    purchaseAmount += 100;
    totalMoney -= 100;
    updateText();
  });

  chip500.on("pointerdown", () => {
    purchaseAmount += 500;
    totalMoney -= 500;
    updateText();
  });

  function updateText() {
    purchaseText.text = `Purchase: ${purchaseAmount}$`;
    totalMoneyText.text = `Total Money: ${totalMoney}$`;
  }

  app.stage.addChild(chip10, chip100, chip500, purchaseText, totalMoneyText);
}


function displayRandomCards() {
  
  const cardTextures = {};
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const suits = ['C', 'D', 'H', 'S'];
  for (const rank of ranks) {
    for (const suit of suits) {
      const texture = PIXI.Texture.from(`images/cards/${rank}-${suit}.png`);
      cardTextures[`${rank}-${suit}`] = texture;
    }
  }

  const deck = Object.keys(cardTextures);

  
  const playerHand = [];
const dealerHand = [];
let playerSum = 0;
let dealerSum = 0;
let dealerAceCount = 0;
let yourAceCount = 0; 
let hidden;
let canHit = true


// Shuffle the deck
function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}


function dealInitialCards() {
  playerHand.push(deck.pop());
  playerHand.push(deck.pop());

  
  hidden = deck.pop()
  dealerHand.push(hidden)
  dealerSum += getCardValue(extractCardRank(hidden));

  while(dealerSum < 17){
    dealerHand.push(deck.pop());
      dealerSum += getHandValue(dealerHand);
    }
  }

function countFirstCardsSum(player) {
  let playerSumm = 0;

  if (player.length >= 2) {
    const card1 = player[0];
    const card2 = player[1];
    const rank1 = extractCardRank(card1);
    const rank2 = extractCardRank(card2);
    playerSumm = getCardValue(rank1) + getCardValue(rank2);
  }

  return playerSumm;
}


function revealHiddenCard() {
  const hiddenCardTexture = cardTextures[dealerHand[0]];
  const hiddenCardSprite = createCardSprite(hiddenCardTexture, 1000, 350);
  hiddenCardSprite.rotation = -0.5
}

// Create card sprite
function createCardSprite(texture, x, y) {
  const sprite = new PIXI.Sprite(texture);
  sprite.x = x;
  sprite.y = y;
  app.stage.addChild(sprite);
  return sprite;
}

let BackCard = PIXI.Texture.from("./images/cards/BACK.png")


function displayCards() {
  const cardSpacing = 100;
  const dealerCardX = 200;
  const visibleCardX = 200 + cardSpacing;

  for (let i = 0; i < playerHand.length; i++) {
    const playerCardX = 486 + i * cardSpacing;
    gsap.fromTo(createCardSprite(cardTextures[playerHand[0]]), {x: 800, y: -400}, {x: 400, y: 350, duration: 1,  rotation: -0.5})
    gsap.fromTo(createCardSprite(cardTextures[playerHand[1]]), {x: 800, y: -400}, {x: 470, y: 290, duration: 1,  rotation: -0.2, delay: 1})
  }


  for (let i = 0; i < dealerHand.length; i++) {
    const dealerCardX = 1000 + i * cardSpacing;
    gsap.fromTo(createCardSprite(BackCard), {x: 800, y: -400}, {x: 1000, y: 350, duration: 1,  rotation: -0.5, delay: 0.5})
    gsap.fromTo(createCardSprite(cardTextures[dealerHand[1]]), {x: 800, y: -400}, {x: 1070, y: 290, duration: 1,  rotation: -0.2, delay: 1.5})

    if(dealerHand[2] || dealerHand[3]){
      gsap.fromTo(createCardSprite(cardTextures[dealerHand[2]]), {x: 800, y: -400}, {x: 1170, y: 250, duration: 1, rotation: 0.2, delay: 2})
      gsap.fromTo(createCardSprite(cardTextures[dealerHand[3]]), {x: 800, y: -400}, {x: 1270, y: 260, duration: 1, rotation: 0.5, delay: 2.5})

    }
  }
}

let playerTextSum = new PIXI.Text(`${playerSum}`, {
  fill: 0xffffff,
  fontSize: 34,
  fontFamily: "Slackey",
});
playerTextSum.x = 650
playerTextSum.y = 100

let dealerTextSum = new PIXI.Text(`${dealerSum}`, {
  fill: 0xffffff,
  fontSize: 34,
  fontFamily: "Slackey",
});
dealerTextSum.x = 1125
dealerTextSum.y = 100

function updateSum(){
  playerTextSum.text = `${playerSum}`
}

function updateDealerSum(){
  dealerTextSum.text = `${dealerSum}`
}

function displayCardSum(sum, x, y) {
  const sumText = new PIXI.Text(`${sum}`, {
    fill: 0xffffff,
    fontSize: 34,
    fontFamily: "Slackey",
  });
  sumText.x = x;
  sumText.y = y;
  app.stage.addChild(sumText);
}


function getCardValue(rank) {
  if (rank === 'A') {
    return 11;
  } else if (['K', 'Q', 'J'].includes(rank)) {
    return 10;
  } else {
    return parseInt(rank);
  }
}

function getHandValue(hand) {
  let value = 0;
  // let numAces = 0;

  for (let i = 0; i < hand.length; i++) {
    const card = hand[i]
    if(i === 0){
      continue;
    }
    const rank = extractCardRank(card);
    if (rank === 'A') {
      value += 11;
      // numAces++;
    } else {
      value += parseInt(rank);
    }
  }
  // while (value > 21 && numAces > 0) {
  //   value -= 10;
  //   numAces--;
  // }
  return value;
}

// Extract card rank from card name
function extractCardRank(card) {
  const rank = card.substring(0, card.indexOf('-'));
  return rank
}

function sumDealerCards() {
  let sum = 0;
  for (let i = 1; i < dealerHand.length; i++) {
    const card = dealerHand[i];
    const rank = extractCardRank(card);
    sum += getCardValue(rank);
  }
  return sum;
}

function sumAllDealerCards() {
  let sum = 0;
  for (let i = 0; i < dealerHand.length; i++) {
    const card = dealerHand[i];
    const rank = extractCardRank(card);
    sum += getCardValue(rank);
  }
  return sum;
}

// Shuffle the deck and deal initial cards
shuffleDeck();
console.log(deck)
console.log(deck.pop());
dealInitialCards();

console.log(dealerHand);

displayCards()

setTimeout(() => {
  playerSum = countFirstCardsSum(playerHand)
  dealerSum = sumDealerCards()
  app.stage.addChild(playerTextSum)
  app.stage.addChild(dealerTextSum)

  updateSum()
  updateDealerSum()

  console.log(playerSum);
  console.log(dealerSum);

}, 2000)



function hit() {

  if(!canHit){
    return
  }

  playerHand.push(deck.pop());

  const cardSpacing2 = 100
  // let hitCardX = 470;
  let hitCardX = 470 + (playerHand.length - 2) * 100;
    gsap.fromTo(createCardSprite(cardTextures[playerHand[playerHand.length - 1]]), {x: 800, y: -400}, {x: hitCardX, y: 250, duration: 1,  rotation: 0.2})

    playerSum += getCardValue(extractCardRank(playerHand[2]))
    // displayCardSum(playerSum, 650, 120);
    updateSum()

    console.log('player sum hit:', playerSum);

    if (playerSum > 21) {
        canHit = false
    }
}

let canStand = true

function stand() {

  if(!canStand){
    return
  }

  canStand = false
  canHit = false

  hidden = getCardValue(extractCardRank(dealerHand[0]));

  revealHiddenCard();

  dealerSum += hidden;

  sumAllDealerCards()

  updateDealerSum()

  console.log(dealerSum);

  let message = ""
  // let ChooseWL = new PIXI.Container()
  const rectangle = new PIXI.Graphics();
  rectangle.beginFill(0x000000);
  rectangle.drawRoundedRect(0, 0, 448, 246, 35);
  rectangle.endFill();
  rectangle.x = (app.screen.width - rectangle.width) / 2;
  rectangle.y = (app.screen.height - rectangle.height) / 2;
  app.stage.addChild(rectangle);

  if(playerSum > 21){
    message = "You lost"
  } 
  else if(dealerSum > 21){
    message = "You won"
  }
  else if(playerSum == dealerSum){
    message = "Tie"
  }
  else if(playerSum > dealerSum){
    message = "You won"
  }
  else if(playerSum < dealerSum){
    message = "You lost"
  }

  let chooseWiner = new PIXI.Text(`${message}`, {
     fill: 0xFF7272,
    fontSize: 60,
    fontFamily: "Minnie",
  })

  chooseWiner.anchor.set(0.5)
  chooseWiner.position.set(rectangle.width / 2, rectangle.height / 2 - 50);
  rectangle.addChild(chooseWiner)

  // const backButton = new PIXI.Text("Back Home", {
  //   fill: 0xffffff,
  //   fontSize: 24,
  //   fontFamily: "Slackey",
  // });

  // backButton.anchor.set(0.5);
  // backButton.x = rectangle.width / 2;
  // backButton.y = rectangle.height / 2 + 20;
  // backButton.eventMode = "dynamic";
  // backButton.buttonMode = true;
  // backButton.on("pointerdown", startGame);
  // rectangle.addChild(backButton);

  app.stage.addChildAt(rectangle, app.stage.children.length - 1);
}


const hitBtnCtn = new PIXI.Container()
const hitBg = new PIXI.Graphics()

hitBtnCtn.eventMode = 'dynamic';
hitBtnCtn.buttonMode = true;

hitBg.beginFill(0xff6060); 
hitBg.drawRoundedRect(0, 0, 107, 61, 59); 
hitBg.endFill();

hitBtnCtn.addChild(hitBg)
hitBtnCtn.position.set(694, 603)

// Add Hit and Stand buttons
const hitButton = new PIXI.Text('Hit', { fill: 0xffffff, fontFamily: "Slackey", fontSize: 24 });
hitButton.anchor.set(0.5)
hitButton.position.set(
  hitBg.width / 2,
  hitBg.height / 2
)
hitButton.eventMode = "dynamic"
hitButton.buttonMode = true

const cardFlick = new Howl({
  src: ["./sounds/cardFlick.mp3"],
  volume: 2.0
})


hitBtnCtn.on("pointerdown", () => {
  // buttonSound.play(),
  hit()
  cardFlick.play()
})
hitBtnCtn.addChild(hitButton)


app.stage.addChild(hitBtnCtn);

const standBtnCtn = new PIXI.Container()
const standBg = new PIXI.Graphics()

standBtnCtn.eventMode = 'dynamic';
standBtnCtn.buttonMode = true;

standBg.beginFill(0xff6060); 
standBg.drawRoundedRect(0, 0, 129, 61, 59); 
standBg.endFill();

standBtnCtn.addChild(standBg)
standBtnCtn.position.set(874, 603)
// Add Hit and Stand buttons
const standButton = new PIXI.Text('Stand', { fill: 0xffffff, fontFamily: "Slackey", fontSize: 24 });
standButton.anchor.set(0.5)

standButton.position.set(
  standBg.width / 2,
  standBg.height / 2
)
standButton.eventMode = "dynamic"
standButton.buttonMode = true

standBtnCtn.on("pointerdown", () => {
  // buttonSound.play(),
  stand(),
  cardFlick.play()
})
standBtnCtn.addChild(standButton)


app.stage.addChild(standBtnCtn);


  const YouText = new PIXI.Text("You", {
    fill: 0xff7272,
    fontSize: 40,
    fontFamily: "Minnie",
  });

  YouText.x = 621;
  YouText.y = 50;
  app.stage.addChild(YouText);

  const DealerText = new PIXI.Text("Dealer", {
    fill: 0xff7272,
    fontSize: 40,
    fontFamily: "Minnie",
  });

  DealerText.x = 1069;
  DealerText.y = 50;
  app.stage.addChild(DealerText);
}


function transitionToGame() {

  app.stage.removeChild(betsTitle);

  app.stage.removeChild(chip10);
  app.stage.removeChild(chip100);
  app.stage.removeChild(chip500);
  app.stage.removeChild(dealBtnCtn);

  purchaseText.x = 100;
  purchaseText.y = 50;
  totalMoneyText.x = 100;
  totalMoneyText.y = 680;

  app.stage.addChild(purchaseText, totalMoneyText);

  const shufflingText = new PIXI.Text("Shuffling...", {
    fill: 0xffffff,
    fontSize: 34,
    fontFamily: "Slackey",
  });
  shufflingText.x = 700;
  shufflingText.y = -40;
  app.stage.addChild(shufflingText);

  // gsap.to(shufflingText, {x: 100, y: 200, repeat: 3, yoyo: true})
  const timeline = gsap.timeline();

timeline.to(shufflingText, { x: 700, y: 100, repeat: 2, yoyo: true })
  .to(shufflingText, { alpha: 0, duration: 1 });

  const shuffleSound = new Howl({
    src: ["./sounds/CardShuffle.mp3"],
    volume: 2.0
  })

  // Delay the removal of the shuffling indication text
  setTimeout(() => {
    app.stage.removeChild(shufflingText);

  shuffleSound.play()

    displayRandomCards();
  }, 2300);

  // initializeGame();
}
