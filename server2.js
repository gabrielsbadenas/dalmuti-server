const express = require('express');
const app = express();
const port = 3000;

// Initialize the deck of cards and shuffle them
let deck = [];
for (let i = 0; i < 12; i++) {
  deck.push(i + 1);
}
let topCard = deck[deck.length - 1];
for (let i = deck.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [deck[i], deck[j]] = [deck[j], deck[i]];
}

// Initialize the players and deal them their starting cards
const players = [
  { id: 0, name: 'Player 1', cards: deck.slice(0, 5) },
  { id: 1, name: 'Player 2', cards: deck.slice(5, 8) },
  { id: 2, name: 'Player 3', cards: deck.slice(8, 10) },
  { id: 3, name: 'Player 4', cards: deck.slice(10, 12) }
];

// Middleware to parse incoming JSON data
app.use(express.json());

// Route to handle a player throwing a card
app.post('/', (req, res) => {
  const playerId = req.body.playerId;
  const card = req.body.card;
  
  // Find the player and card in the array of players
  const player = players.find(p => p.id === playerId);
  const cardIndex = player.cards.indexOf(card);
  
  // If the player has the card, remove it and set it as the new top card
  if (cardIndex !== -1) {
    player.cards.splice(cardIndex, 1);
    topCard = card;
    res.json({ success: true });
  } else {
    res.json({ success: false, error: 'Invalid card.' });
  }
});

// Route to get the game state
app.get('/', (req, res) => {
  const playerId = req.query.playerId;
  
  // Find the player and opponents in the array of players
  const player = players.find(p => p.id === playerId);
  const opponents = players.filter(p => p.id !== playerId);
  
  // Send the game state as a JSON object
  res.json({
    playerCards: player.cards,
    topCard: topCard,
    opponentCards: opponents.map(p => ({ name: p.name, count: p.cards.length }))
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Dalmuti game server listening at http://localhost:${port}`);
});
