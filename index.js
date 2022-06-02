const express = require("express");
const req = require("express/lib/request");
const app = express();
const path = require("path");
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const pokedex = [
  {
    id: 1,
    nome: "Bulbasaur",
    tipo: "Grass",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
    descricao: "Há uma semente de planta nas costas desde o dia em que este Pokémon nasce. A semente cresce lentamente.",
    altura: "0.7 m",
    peso: "6.9 kg",
    categoria: "Seed",
    habilidade: "Overgrow"
  },

  {
    id: 1,
    nome: "Caterpie",
    tipo: "Bug",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/010.png",
    descricao: "Para proteção, ele libera um cheiro horrível da antena em sua cabeça para afastar os inimigos.",
    altura: "0.3 m",
    peso: "2.9 kg",
    categoria: "Worm",
    habilidade: "Shield Dust"
  },

  {
    id: 3,
    nome: "Charmander",
    tipo: "Fire",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
    descricao: "Tem preferência por coisas quentes. Quando chove, diz-se que o vapor jorra da ponta de sua cauda.",
    altura: "0.6 m",
    peso: "8.5 kg",
    categoria: "Lizard",
    habilidade: "Blaze"
  },
];

let pokemon = undefined;

app.get("/index", (req, res) => {

  res.render("index", { pokedex, pokemon });
});

app.post("/create", (req, res) => {
  const pokemon = req.body;
  pokemon.id = pokedex.length + 1;
  pokedex.push(pokemon)
  res.redirect("/index");
});

app.get("/detalhes/:id", (req, res) => {
  const id = +req.params.id;
  pokemon = pokedex.find((pokemon) => pokemon.id === id);
  res.redirect("/index");
});

app.post("/update/:id", (req, res) => {
  const id = +req.params.id - 1;
  pokemon = pokedex.find((pokemon) => pokemon.id === id);
  const newPokemon = req.body;
  newPokemon.id = id + 1;
  pokedex[id] = newPokemon;
  pokemon = undefined;
  res.redirect("/index")
})

app.get("/delete/:id", (req, res) => {
  const id = +req.params.id - 1;

  delete pokedex[id]

  res.redirect("/index")
})



app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));