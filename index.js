const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(express.json());
app.use(morgan("short"));

let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
app.get("/", (request, response) => {
  response.send("<h1>Welcome to Phonebook</h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(phonebook);
});

app.get("/api/info", (request, response) => {
  response.send(
    `Phonebook has info for ${
      phonebook.length
    } people <br/><br/> ${new Date().toUTCString()}`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;

  const number = phonebook.find((number) => number.id == id);

  if (number) {
    response.json(number);
  } else {
    response.status(404).send("Not Found");
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;

  phonebook = phonebook.filter((num) => num.id !== Number(id));

  return response.json(phonebook);
});

app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;

  if (!name && !number)
    return res.json({
      error: "name or number is required",
    });

  const newNumber = {
    name,
    number,
    id: Math.floor(Math.random() * 1000000),
  };

  phonebook.push(newNumber);

  return response.json(phonebook);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
