//const express = require("express");
import express from 'express'
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
function changeCurrentCard(thrownBy,number,amount){
  //si es el primero en tirar tendria que tirar la amount que quiera
  //si no es el primero deberia fijarse si la amount es suficiente y si el numero es menor
  //se tiene que cambiar el thrownBy y el number, el amount solo cambia si es el primero o si se reinicia la ronda porque
  //el thrownBy es igual
  //tendria que ver si tirar todas por defecto en godot o dar la opcion para tirar menos
  //en la mayoria de los casos se tiran todas
  let thrownBy,number,amount
  currentCard = {thrownBy,number,amount}
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
  //tiene que ser un array de numeros el req.body.number
  //sino se tiene que fijar el amount de cartas en la ultima tirada y restar ese numero de cartas de la hand
  hands[req.body.id] = throwCard(hands[req.body.id], req.body.number, 1);
  res.send({ thrown: req.body, newHand: hands[req.body.id] });
});

app.listen(port, "localhost", () => {
  console.log(`Example app listening on port ${port}`);
});
