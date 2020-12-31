const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

function validaId(req,res,next){
  const {id} = req.params;

  if (!isUuid(id)){
    return res.status(400).json({error:'Invalid Id'})
  }

  next();
}

app.use('/repositories/:id',validaId);

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const {title, url, techs} = request.body;
  const id = uuid();
  const likes = 0;

  const item = {
    id, title, url, techs, likes
  }

  repositories.push(item);

  return response.json(item);

});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const {title, url, techs} = request.body;
  const { id } = request.params;

  const idIndex = repositories.findIndex(repositories => repositories.id === id);

  if (idIndex < 0){
    return response.status(400).json({error: 'Repository Id not found'});
  }

  const newItem = {
    id,
    title, url, techs,
    likes: repositories[idIndex].likes
  }

  repositories[idIndex] = newItem;

  return response.json(newItem);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params;

  const itemIndex = repositories.findIndex(repositories => repositories.id === id);

  if (itemIndex < 0){
    return response.status(400).json({error: 'Repository Id not found'});
  }

  repositories.splice(itemIndex,1);

  response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const {id} = request.params;
  const item = repositories.find(repositories => repositories.id === id);

  item.likes += 1;

  return response.json(item);
});

module.exports = app;
