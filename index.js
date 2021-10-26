const express = require('express');

const app = express();

app.use(cors);

// for use of diff data
app.use(express.json()); // json payloads
app.use(express.urlencoded({ extended: false})); // form data

// test data // why not const
let tasks = [
  { id: 1, description: 'homework', done: 'not'},
  { id: 2, description: 'housework', done: 'not'},
  { id: 3, description: 'work', done: 'not'}
];

// application.method(path, route handler(callback))
app.get('/', (req, res) => {
  res.status(200).send('Welcome to todo list!');
});

app.get('/tasks', (req, res) => {
  res.status(200).send(tasks);
});

app.post('/tasks', (req, res) => {
  const task = req.body;
  tasks.push(task);
  res.status(201).send('add tasks');
})

app.get('/tasks/:id', (req, res) => {
  let singleTask = req.body; // why not const
  singleTask = tasks.filter((task) => task.id == req.params.id); // == or ===
  res.status(200).send(singleTask);
});

app.put('/tasks/:id', (req, res) => {
  const putId = parseInt(req.params.id);
  for (let task of tasks) {
    if (task.id === putId) {
      task.description = req.body.description || null;
      task.done = req.body.done || null;
    }
  }
  res.status(204).send('put');
});


app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter((task) => task.id != req.params.id);
  res.status(202).send('deleted');
});

app.listen(3000, () => {
  console.log('sever is listening on port 3000')
});

function cors(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  next();
}