const express = require("express");
let deck = [
  13, 13, 1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 7, 7,
  7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10,
  10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12,
  12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
];
let currentCard = {
  thrownBy:'',
  number:'',
  amount:''
}
const playerAmount = 4;
let hands;
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function distribute(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}
function throwCard(array, num, amount) {
  let count = 0;
  return array.filter((n) => {
    if (n === num && count < amount) {
      count++;
      return false;
    }
    return array;
  });
}

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/shuffle", (req, res) => {
  deck = shuffle(deck);
  //console.log(deck);
  res.send('the cards have been shuffled')//{ deck });
});

app.get("/distribute", (req, res) => {
  hands = distribute(deck, deck.length / playerAmount);
  //console.log(hands);
  //res.send({ hands });
  res.send('the cards have been dealt')
});
//get the cards in your hand
app.post("/hand", (req, res) => {
  res.send(hands[req.body.id]);
});

app.get('/',(req,res)=>{
  res.send(currentCard)
})

app.post("/", async (req, res) => {
  hands[req.body.id] = throwCard(hands[req.body.id], req.body.number, 1);
  res.send({ thrown: req.body, newHand: hands[req.body.id] });
});

app.listen(port, "localhost", () => {
  console.log(`Example app listening on port ${port}`);
});
